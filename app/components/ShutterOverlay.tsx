'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronUp, MousePointerClick } from 'lucide-react';

export default function ShutterOverlay() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isRetracting, setIsRetracting] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    try {
      localStorage.removeItem('szlavik_shutter_seen');
      const shutterSeen = sessionStorage.getItem('szlavik_shutter_seen');
      if (!shutterSeen) {
        setIsVisible(true);
      }
    } catch (e) {
      setIsVisible(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        try {
          sessionStorage.removeItem('szlavik_shutter_seen');
        } catch (err) {}
        setIsRetracting(false);
        setIsVisible(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenShutter = () => {
    if (isRetracting) return;
    setIsRetracting(true);
    try {
      sessionStorage.setItem('szlavik_shutter_seen', 'true');
    } catch (e) {
      console.error('Could not save to sessionStorage:', e);
    }
  };

  // Only unmount when the main root container's translateY transform animation finishes
  const handleAnimationEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target && e.propertyName === 'transform' && isRetracting) {
      setIsVisible(false);
    }
  };

  // Fallback cleanup timer (2.7s) to guarantee unmount even if event listener fails
  useEffect(() => {
    if (isRetracting) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [isRetracting]);

  if (!hasMounted || !isVisible) {
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

      {/* Main Redőnylamellák Surface */}
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

        {/* Center Content: Direct Logo & CTA Button */}
        <div className={`relative z-20 flex flex-col items-center gap-8 max-w-xl w-full px-4 text-center transition-opacity duration-700 ${
          isRetracting ? 'opacity-30' : 'opacity-100'
        }`}>
          
          {/* Logo Presentation in natural aspect ratio */}
          <div className="relative w-80 sm:w-96 h-28 sm:h-36 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.webp"
              alt="Szlávik Roló Logó"
              fill
              className="object-contain p-3 drop-shadow"
              priority
            />
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleOpenShutter}
            disabled={isRetracting}
            type="button"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#061A40] via-[#1D4ED8] to-[#061A40] hover:from-[#030F28] hover:to-[#1E40AF] text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-blue-600/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden pulse-glow"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000" />
            
            <ChevronUp className="w-7 h-7 animate-bounce text-blue-200 group-hover:-translate-y-1 transition-transform" />
            <span>Kattints a folytatáshoz!</span>
            <MousePointerClick className="w-6 h-6 text-blue-200 opacity-90 group-hover:opacity-100" />
          </button>
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
