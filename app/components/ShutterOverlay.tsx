'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ShutterOverlay() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isRetracting, setIsRetracting] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Check if user has already seen the shutter in this session
    try {
      localStorage.removeItem('szlavik_shutter_seen');
      const shutterSeen = sessionStorage.getItem('szlavik_shutter_seen');
      if (shutterSeen) {
        setIsDismissed(true);
        return;
      }
    } catch (e) {}

    // Sequence 1: 1 second after shutter appears -> Smoothly fade in logo
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    // Sequence 2: 2 seconds after logo appears (Total 3 seconds) -> Auto retract shutter
    const retractTimer = setTimeout(() => {
      setIsRetracting(true);
      try {
        sessionStorage.setItem('szlavik_shutter_seen', 'true');
      } catch (e) {}
    }, 3000);

    // Dev helper: Shift + R shortcut to re-trigger shutter animation sequence anytime
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        try {
          sessionStorage.removeItem('szlavik_shutter_seen');
        } catch (err) {}
        setShowLogo(false);
        setIsRetracting(false);
        setIsDismissed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(retractTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Only unmount when the main root container's translateY transform animation finishes
  const handleAnimationEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target && e.propertyName === 'transform' && isRetracting) {
      setIsDismissed(true);
    }
  };

  // Fallback cleanup timer (2.7s after retract starts = 5.7s total) to guarantee unmount
  useEffect(() => {
    if (isRetracting) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [isRetracting]);

  // If already seen / dismissed, remove from DOM completely
  if (isDismissed) {
    return null;
  }

  return (
    <div
      onTransitionEnd={handleAnimationEnd}
      aria-label="Kezdő Redőny Overlay"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 w-screen h-screen z-[99999] flex flex-col justify-between overflow-hidden select-none pointer-events-auto transition-transform duration-[2500ms] cubic-bezier(0.4, 0, 0.2, 1) ${
        isRetracting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Redőnytok (Roll box header) */}
      <div className="w-full h-12 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 border-b-2 border-slate-400 shadow-md relative z-20 flex items-center justify-between px-8">
        <span className="text-xs uppercase tracking-widest font-extrabold text-slate-700">
          SZLÁVIK ROLÓ
        </span>
        <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
          ÁRNYÉKOLÁSTECHNIKA
        </span>
      </div>

      {/* Main Fehér Redőnylamellák Surface */}
      <div className="relative flex-1 w-full shutter-slats-bg flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Left Side Rail (Lefutó) */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 border-r-2 border-slate-400 z-10 shadow-md" />

        {/* Right Side Rail (Lefutó) */}
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-slate-300 via-slate-200 to-slate-300 border-l-2 border-slate-400 z-10 shadow-md" />

        {/* Horizontal Redőnylamellák (Slat lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-90 flex flex-col justify-between">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-full h-4 shutter-slat-row" />
          ))}
        </div>

        {/* Center Content: Logo (Fades in after 1.0s, auto-retracts after 2.0s more) */}
        <div className={`relative z-20 flex flex-col items-center gap-4 max-w-xl w-full px-4 text-center transition-all duration-1000 transform ${
          showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        } ${isRetracting ? 'opacity-40' : ''}`}>
          
          {/* Logo Presentation */}
          <div className="relative w-80 sm:w-96 h-28 sm:h-36 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl flex items-center justify-center">
            <Image
              src="/logo.webp"
              alt="Szlávik Roló Logó"
              fill
              className="object-contain p-3 drop-shadow"
              priority
            />
          </div>

          <span className="text-xs sm:text-sm font-bold text-slate-600 tracking-wider uppercase bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
            Árnyékolástechnika & Nyílászáró kiegészítők
          </span>
        </div>
      </div>

      {/* Bottom Záróléc (Slat bottom bar with rubber stoppers) */}
      <div className="w-full h-9 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t-2 border-slate-400 shadow-lg relative flex items-center justify-between px-10 z-20">
        <div className="w-5 h-4 bg-slate-600 rounded-sm border border-slate-700 shadow-inner" />
        <div className="h-1.5 w-36 sm:w-64 bg-slate-500/80 rounded-full" />
        <div className="w-5 h-4 bg-slate-600 rounded-sm border border-slate-700 shadow-inner" />
      </div>
    </div>
  );
}
