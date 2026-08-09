"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, Menu, X, Clock, MapPin, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 shadow-sm transition-all duration-300">
      {/* Top Bar for Desktop */}
      <div className="hidden lg:block bg-[#061A40] text-xs text-gray-200 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-[#60A5FA]">
              <MapPin size={13} className="text-[#60A5FA]" />
              <span>Jánoshalma 50 km-es körzetében a kiszállás ingyenes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#60A5FA]" />
              <span>H–P: 7:00–20:00 | Szo: 8:00–16:00</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:szlavikrolo@gmail.com" 
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Mail size={13} className="text-[#60A5FA]" />
              <span>szlavikrolo@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative h-14 sm:h-16 w-56 sm:w-64 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.webp"
              alt="Szlávik Roló"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a href="#szolgaltatasok" className="hover:text-[#1D4ED8] transition duration-200">Szolgáltatások</a>
          <a href="#kepek" className="hover:text-[#1D4ED8] transition duration-200">Galéria</a>
          <a href="#miert" className="hover:text-[#1D4ED8] transition duration-200">Miért minket?</a>
          <a href="#rolunk" className="hover:text-[#1D4ED8] transition duration-200">Rólunk</a>
          <a href="#gyik" className="hover:text-[#1D4ED8] transition duration-200">Gyakori kérdések</a>
        </nav>

        {/* Desktop Call & CTA Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Közvetlen hívás</span>
            <div className="flex items-center gap-2">
              <a href="tel:+36307826402" className="text-sm font-extrabold text-[#061A40] hover:text-[#1D4ED8] transition flex items-center gap-1">
                <Phone size={14} className="text-[#10B981]" />
                +36 30 782 6402
              </a>
              <span className="text-slate-300">|</span>
              <a href="tel:+36704224803" className="text-sm font-extrabold text-[#061A40] hover:text-[#1D4ED8] transition">
                +36 70 422 4803
              </a>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Kapcsolat / árajánlat</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <a 
            href="tel:+36307826402" 
            className="bg-[#10B981] active:bg-[#059669] text-white p-2.5 rounded-lg flex items-center justify-center shadow-sm"
            aria-label="Telefonhívás"
          >
            <Phone size={20} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#061A40] hover:bg-slate-100 transition"
            aria-label="Menü megnyitása"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-700 text-base">
            <a 
              href="#szolgaltatasok" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-[#1D4ED8]"
            >
              Szolgáltatások
            </a>
            <a 
              href="#kepek" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-[#1D4ED8]"
            >
              Galéria
            </a>
            <a 
              href="#miert" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-[#1D4ED8]"
            >
              Miért minket?
            </a>
            <a 
              href="#rolunk" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-[#1D4ED8]"
            >
              Rólunk
            </a>
            <a 
              href="#gyik" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-[#1D4ED8]"
            >
              Gyakori kérdések
            </a>
          </nav>

          <div className="pt-2 space-y-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase block">Hívjon minket most:</span>
              <a href="tel:+36307826402" className="flex items-center gap-2 text-[#061A40] font-extrabold text-lg hover:text-[#10B981]">
                <Phone size={18} className="text-[#10B981]" />
                +36 30 782 6402
              </a>
              <a href="tel:+36704224803" className="flex items-center gap-2 text-[#061A40] font-extrabold text-lg hover:text-[#10B981]">
                <Phone size={18} className="text-[#10B981]" />
                +36 70 422 4803
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-bold text-center py-3.5 rounded-xl text-base shadow-md flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Kapcsolatfelvétel & árajánlat
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


