"use client";

import React, { useState } from 'react';
import { MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
  desc: string;
  bgGradient: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Alumínium redőny beépítés",
    category: "aluminiu",
    categoryLabel: "Alumínium redőny",
    location: "Jánoshalma",
    desc: "Hőszigetelt alumínium lamellák rejtett tokos kivitelben.",
    bgGradient: "from-[#061A40] to-[#0F2B5B]",
  },
  {
    id: 2,
    title: "Műanyag redőny beszerelés",
    category: "muanyag",
    categoryLabel: "Műanyag redőny",
    location: "Baja",
    desc: "UV-álló műanyag redőnypalást zajmentes lefutókkal.",
    bgGradient: "from-slate-800 to-slate-950",
  },
  {
    id: 3,
    title: "Motoros redőny és okosvezérlés",
    category: "motoros",
    categoryLabel: "Motoros redőny",
    location: "Kiskunhalas",
    desc: "Távirányítós, akadályérzékelős elektromos redőnymotorok.",
    bgGradient: "from-[#0B2545] to-[#134074]",
  },
  {
    id: 4,
    title: "Redőny javítás és szerviz",
    category: "muanyag",
    categoryLabel: "Redőny javítás",
    location: "Kiskőrös",
    desc: "Sérült redőnypalást, lefordult lamellák és alkatrészek szakszerű cseréje.",
    bgGradient: "from-slate-900 to-[#061A40]",
  },
  {
    id: 5,
    title: "Pliszé és rolós szúnyogháló",
    category: "szunyoghalo",
    categoryLabel: "Szúnyogháló",
    location: "Kecskemét",
    desc: "Teraszajtóra szerelt nagyméretű harmonika pliszé szúnyogháló.",
    bgGradient: "from-blue-900 to-slate-900",
  },
  {
    id: 6,
    title: "Kombinált redőny és szúnyogháló",
    category: "szunyoghalo",
    categoryLabel: "Szúnyogháló",
    location: "Kiskunmajsa",
    desc: "Egybeépített vakolható tokos kombi redőny és rolós háló.",
    bgGradient: "from-slate-900 to-indigo-950",
  },
];

const categories = [
  { key: "all", label: "Összes munka" },
  { key: "aluminiu", label: "Alumínium redőny" },
  { key: "muanyag", label: "Műanyag redőny" },
  { key: "motoros", label: "Motoros redőny" },
  { key: "szunyoghalo", label: "Szúnyogháló" },
];

export default function GalleryFilter({ onOpenContact }: { onOpenContact: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#061A40] text-white shadow-md scale-105"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-[#061A40] text-white flex flex-col justify-between p-6 min-h-[260px] transform hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Background Pattern Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-95 group-hover:opacity-100 transition-opacity`}></div>

            {/* Top Badge & Location */}
            <div className="relative z-10 flex justify-between items-start gap-2">
              <span className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {item.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-300 bg-black/30 px-2.5 py-1 rounded-full">
                <MapPin size={12} className="text-[#60A5FA]" />
                {item.location}
              </span>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 my-4 space-y-2">
              <h3 className="text-xl font-bold leading-tight group-hover:text-[#60A5FA] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            {/* Bottom Action */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 size={14} />
                Garanciával átadva
              </span>
              <button
                onClick={onOpenContact}
                className="text-[#60A5FA] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Hasonlót kérek &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Callout underneath */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-3 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-[#061A40] font-bold text-base">
          <Sparkles className="text-[#1D4ED8]" size={20} />
          <span>Egyedi méretre gyártás és felmérés</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Minden épület és ablak más. Kérjen ingyenes helyszíni felmérést Jánoshalmán és környékén!
        </p>
        <button
          onClick={onOpenContact}
          className="inline-block bg-[#061A40] hover:bg-[#030F28] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition cursor-pointer shadow-sm"
        >
          Kapcsolatfelvétel & hívás
        </button>
      </div>
    </div>
  );
}


