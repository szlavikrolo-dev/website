"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  CheckCircle2, MapPin, Home as HomeIcon, Wrench, Phone, 
  ShieldCheck, ChevronDown, ChevronUp, Facebook, Star, Clock, 
  Sparkles, Mail, Award, Zap, ThumbsUp, Layers, CheckSquare
} from 'lucide-react';
import Header from './components/Header';
import QuickContactModal from './components/QuickContactModal';

const services = [
  { 
    icon: Layers, 
    title: "Redőny beszerelés", 
    desc: "Műanyag és alumínium redőnyök gyártása és beépítése egyedi méretre, vakolható vagy külső tokos kivitelben.",
    badge: "Népszerű"
  },
  { 
    icon: Wrench, 
    title: "Redőny javítás és szerviz", 
    desc: "Sérült redőnypalástok, lefordult lamellák és elhasználódott automaták szakszerű szervizelése és cseréje.",
    badge: "Gyors szerviz"
  },
  { 
    icon: Zap, 
    title: "Motoros redőny telepítés", 
    desc: "Elektromos fali kapcsolós, távirányítós és okosotthonhoz / WiFi-hez kapcsolható motorok beépítése.",
    badge: "Kényelmi opció"
  },
  { 
    icon: HomeIcon, 
    title: "Régi redőny felújítás", 
    desc: "Meglévő redőnyök komplett palástcseréje és karbantartása.",
    badge: "Költséghatékony"
  },
  { 
    icon: ShieldCheck, 
    title: "Szúnyogháló készítés", 
    desc: "Fix keretes, rolós (lehúzható) és harmonika pliszé szúnyoghálók gyártása és szerelése rovarmentes otthonért.",
    badge: "Egyedi méret"
  },
  { 
    icon: CheckSquare, 
    title: "Szúnyogháló javítás", 
    desc: "Kiszakadt hálók cseréje, keretek és zsanérok felújítása vagy cseréje helyszíni felméréssel.",
    badge: "Szerviz"
  },
  { 
    icon: Layers, 
    title: "Műanyag ablakpárkány beépítés", 
    desc: "Kültéri és beltéri műanyag ablakpárkányok, könyöklők méretre vágása, beépítése és cseréje időjárásálló kivitelben.",
    badge: "Új kínálat"
  },
];

const benefits = [
  { icon: HomeIcon, title: "Helyi családi vállalkozás", desc: "Ismerjük a környéket és a helyi igényeket. Személyes kapcsolat, közvetlen megbeszélés call center nélkül." },
  { icon: Zap, title: "Gyors reagálás és felmérés", desc: "Telefonhívás után 2 órán belül visszahívjuk. Sürgős meghibásodás esetén gyors kiszállást biztosítunk." },
  { icon: Award, title: "Garancia minden munkára", desc: "Minden beépített redőnyre, szúnyoghálóra, párkányra és javításra teljes körű garanciát vállalunk." },
  { icon: ThumbsUp, title: "Korrekt, egyedi árajánlat", desc: "Nincsenek rejtett költségek. Jánoshalma 50 km-es körzetében a kiszállás ingyenes, az árajánlat átlátható és személyre szabott." },
  { icon: Wrench, title: "Saját egyedi gyártás", desc: "Egyedi méretre készítjük el a redőnyöket, szúnyoghálókat és párkányokat, így tökéletesen passzol minden ablakra." },
  { icon: Clock, title: "Hétvégén is elérhetők", desc: "Hétfőtől szombatig elérhetők vagyunk, igazodva az Ön szabadidejéhez." },
];

const processSteps = [
  { icon: Phone, title: "1. Kapcsolatfelvétel", desc: "Hívjon minket a +36 30 782 6402 mobilszámon vagy kattintson a kapcsolatfelvételre." },
  { icon: MapPin, title: "2. Ingyenes felmérés", desc: "Kijövünk a helyszínre Jánoshalmán és környékén, pontosan felmérjük a méreteket. Kötelezettségmentes." },
  { icon: Mail, title: "3. Árajánlat adása", desc: "A felmérés alapján azonnal, vagy 24 órán belül személyre szabott árajánlatot adunk." },
  { icon: CheckCircle2, title: "4. Gyártás és beépítés", desc: "Egyeztetett időpontban megérkezünk, tisztán és garanciával beépítjük a redőnyöket, párkányokat." },
];

const galleryImages = [
  { src: "/redony-1.webp", alt: "Szlávik Roló redőny 1" },
  { src: "/redony-2.webp", alt: "Szlávik Roló redőny 2" },
  { src: "/redony-4.webp", alt: "Szlávik Roló redőny 4" },
];

const faqs = [
  { q: "Mennyibe kerül egy redőny, szúnyogháló vagy műanyag párkány beépítése?", a: "Minden nyílászáró mérete és típusa egyedi, ezért a pontos árat a helyszíni felmérés során tudjuk megadni. A felmérés ingyenes és kötelezettségmentes, 24 órán belül megkapja a pontos árajánlatot." },
  { q: "Mennyi idő alatt készül el a redőny vagy párkány a megrendeléstől számítva?", a: "A felméréstől és megrendeléstől számítva általában 1-2 héten belül legyártjuk és beépítjük a redőnyöket, szúnyoghálókat és ablakpárkányokat. Sürgős javítást és szervizelést akár azonnal is vállalunk." },
  { q: "Milyen garanciát adnak a munkára?", a: "Minden általunk beépített redőnyre, szúnyoghálóra, műanyag ablakpárkányra és elvégzett szerelésre garanciát vállalunk. A garanciális feltételeket a felméréskor átláthatóan megbeszéljük." },
  { q: "Hétvégén is elérhetők és vállalnak munkát?", a: "Igen, szombaton is dolgozunk 8:00 és 16:00 között, mivel tudjuk, hogy sok ügyfelünknek a hétköznap elfoglalt." },
  { q: "Milyen árnyékolástechnikai és nyílászáró kiegészítőket kínálnak?", a: "Kínálatunkban megtalálhatók a prémium alumínium redőnyök, UV-álló műanyag redőnyök, vakolható tokos rendszerek, kézi és motoros megoldások, fix és rolós szúnyoghálók, valamint beltéri és kültéri műanyag ablakpárkányok / könyöklők." },
  { q: "Tényleg ingyenes a kiszállás?", a: "Igen! Jánoshalma 50 km-es körzetében a kiszállás és felmérés teljesen ingyenes, és nem kötelezi Önt vásárlásra." },
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const openContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800">

      {/* 1. STICKY FEJLÉC */}
      <Header onOpenContact={openContact} />

      {/* Quick Contact Modal */}
      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <main className="flex-grow pt-20">

        {/* 2. HERO SZEKCIÓ (Tiszta fehér háttér, kártya nélkül, logó közvetlenül a háttéren) */}
        <section id="hero" className="relative bg-white text-slate-900 pt-12 md:pt-16 pb-20 overflow-hidden border-b border-slate-200">
          {/* Subtle Smooth Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#061A40]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">

            {/* 1. Directly placed Logo image on the white Hero background */}
            <div className="flex flex-col items-center justify-center space-y-3 pb-2">
              <div className="relative h-32 sm:h-48 md:h-60 w-[340px] sm:w-[580px] md:w-[740px] max-w-full drop-shadow-sm">
                <Image
                  src="/logo.webp"
                  alt="Szlávik Roló"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase">SZ+H Univerzál 2015 Kft.</span>
            </div>

            {/* 2. Centered Badge */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 text-xs sm:text-sm font-bold text-[#1D4ED8] shadow-sm">
                <Sparkles size={16} />
                <span>Jánoshalma és környékének megbízható redőnyöse</span>
              </div>
            </div>

            {/* 3. Centered Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#061A40] max-w-3xl mx-auto">
              Redőnyözés és szúnyoghálózás <span className="text-[#1D4ED8]">garanciával</span>
            </h1>

            {/* 4. Centered Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Prémium műanyag és alumínium redőnyök gyártása, beszerelése, javítása, szúnyoghálók készítése és műanyag ablakpárkányok beépítése egyedi méretre — közvetlenül a helyi szakembertől!
            </p>

            {/* 5. Centered Action Buttons & Direct Call Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openContact}
                className="w-full sm:w-auto bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer pulse-glow"
              >
                <Mail size={20} />
                <span>Kapcsolatfelvétel és ajánlat</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="tel:+36307826402"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 border border-slate-300 text-[#061A40] font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Phone size={18} className="text-[#10B981]" />
                  <span>+36 30 782 6402</span>
                </a>
                <a
                  href="tel:+36704224803"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 border border-slate-300 text-[#061A40] font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Phone size={18} className="text-[#10B981]" />
                  <span>+36 70 422 4803</span>
                </a>
              </div>
            </div>

            {/* 6. Centered Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-slate-600 border-t border-slate-200">
              <span className="flex items-center gap-2 font-semibold text-slate-700">
                <ShieldCheck size={18} className="text-[#10B981]" />
                Jánoshalma 50 km-es körzetében a kiszállás ingyenes
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-700">
                <Clock size={18} className="text-[#1D4ED8]" />
                2 órán belüli visszahívás
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-700">
                <Award size={18} className="text-[#10B981]" />
                100% Garancia
              </span>
            </div>

          </div>
        </section>

        {/* 3. BIZALOM ÉS STATISZTIKA SZEKCIÓ */}
        <section id="trust" className="bg-slate-50 py-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#061A40]">100%</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">Ingyenes kiszállás (50 km)</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#061A40]">2 órán belül</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">Visszahívási garancia</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#061A40]">Jánoshalma</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">és 100 km-es körzete</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#061A40]">Hétvégén is</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">Nyitva szombaton is</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5. TERMÉKFOTÓK ÉS GALÉRIA SZEKCIÓ (Tiszta Képgaléria) */}
        <section id="kepek" className="py-16 bg-[#FAFCFF] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block border border-blue-200">
                Fotógaléria
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061A40] tracking-tight">
                Munkáink képekben
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={openContact}
                  className="group relative rounded-3xl overflow-hidden bg-slate-200 border border-slate-300/80 shadow-lg hover:shadow-2xl transition-all duration-300 h-[300px] sm:h-[360px] md:h-[400px] cursor-pointer transform hover:-translate-y-1"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#061A40]/0 group-hover:bg-[#061A40]/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-[#1D4ED8] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Ajánlatkérés &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. SZOLGÁLTATÁSOK SZEKCIÓ (Fehér háttér, rendezett redőny majd szúnyogháló sorrend) */}
        <section id="szolgaltatasok" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block border border-blue-200">
                Professzionális kivitelezés
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061A40] tracking-tight">
                Szolgáltatásaink redőny és szúnyogháló témakörben
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-light">
                Elsőként az összes redőnnyel kapcsolatos szolgáltatásunkat, majd ezt követően a szúnyoghálós megoldásainkat mutatjuk be.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={idx}
                    className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-[#061A40]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#061A40] text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent size={28} className="text-[#60A5FA]" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#061A40] group-hover:text-[#1D4ED8] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={openContact}
                        className="text-xs font-bold text-[#061A40] group-hover:text-[#1D4ED8] transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ajánlatkérés ehhez</span>
                        <ChevronDown size={14} className="rotate-[-90deg]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. MIÉRT MINKET? (Sötétkék kontrasztos szekció) */}
        <section id="miert" className="py-20 bg-[#061A40] text-white">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/10">
                Bizalom és garancia
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Miért válassza a Szlávik Roló-t?
              </h2>
              <p className="text-base text-gray-300 font-light">
                Tudjuk, hogy az otthon biztonsága és árnyékolása hosszútávú befektetés. Nálunk a minőség garantált.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/30 transition">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shrink-0">
                        <IconComp size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 6. RÓLUNK SZEKCIÓ (Fehér háttér) */}
        <section id="rolunk" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 bg-slate-100 text-[#061A40] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <HomeIcon size={14} className="text-[#1D4ED8]" />
                  <span>Jánoshalmi helyi szakember</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061A40] leading-tight">
                  Több mint csak redőnyszerelés — helyi személyes felelősségvállalás
                </h2>

                <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                  <p>
                    A <strong className="text-[#061A40]">Szlávik Roló</strong> (SZ+H Univerzál 2015 Kft.) Jánoshalmán működő helyi vállalkozás. Évtizedek óta foglalkozunk műanyag és alumínium redőnyök gyártásával, motorizálásával és szúnyoghálók kivitelezésével.
                  </p>
                  <p>
                    Célunk egyszerű: a környékbeli lakosoknak olyan megbízható, közvetlenül elérhető szakembert biztosítani, aki nem tűnik el a munka végeztével, hanem helyben van és vállalja a felelősséget.
                  </p>
                </div>

                <div className="bg-slate-50 border-l-4 border-[#1D4ED8] p-5 rounded-r-2xl text-sm sm:text-base font-medium text-[#061A40] space-y-2">
                  <p className="italic">
                    &quot;Minden ügyfelünket úgy kezeljük, mintha a szomszédunk lenne — mert a legtöbbször az is. Nálunk nincs automatizált call center: közvetlenül velünk beszél, és mi is megyünk felmérni.&quot;
                  </p>
                  <span className="block font-bold text-xs text-[#1D4ED8] uppercase tracking-wider">— Szlávik Csapat</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openContact}
                    className="bg-[#061A40] hover:bg-[#030F28] text-white font-bold px-6 py-3.5 rounded-xl transition cursor-pointer text-sm"
                  >
                    Közvetlen kapcsolatfelvétel
                  </button>
                </div>
              </div>

              {/* Right Side Visual Highlight */}
              <div className="lg:col-span-6">
                <div className="bg-[#061A40] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/10 rounded-full blur-2xl pointer-events-none"></div>

                  {/* Photo Banner */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 shadow-md">
                    <Image
                      src="/redony-3.webp"
                      alt="Szlávik Roló redőny beépítés"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A40]/90 via-[#061A40]/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-[#1D4ED8] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Garanciális beépítés
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-[#60A5FA] font-bold uppercase tracking-wider">Szolgáltatási területünk</span>
                    <h3 className="text-2xl font-bold">Jánoshalma és 100 km-es körzete</h3>
                    <p className="text-sm text-gray-300">
                      Rendszeresen dolgozunk Bács-Kiskun megyében és a környékbeli településeken:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold">
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Jánoshalma
                    </div>
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Kecskemét
                    </div>
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Baja
                    </div>
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Kiskunhalas
                    </div>
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Kiskőrös
                    </div>
                    <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#60A5FA]" /> Kiskunmajsa
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-300 font-semibold">
                      Jánoshalma 50 km-es körzetében a kiszállás ingyenes.
                    </div>
                    <a
                      href="tel:+36307826402"
                      className="bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition"
                    >
                      Hívás: +36 30 782 6402
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. ÜGYFÉLVÉLEMÉNYEK (Fehér háttér) */}
        <section id="ertekelesek" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 space-y-12 text-center">
            
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#061A40] bg-slate-100 px-3.5 py-1.5 rounded-full inline-block">
                Ügyfél elégedettség
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061A40]">
                Ügyfeleink véleménye
              </h2>
              <p className="text-base text-slate-600">
                Pontos munkavégzés, tiszta átadás és garancia minden feladatra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FBBF24" />)}
                </div>
                <p className="text-sm text-slate-600 italic">
                  &quot;Gyors és nagyon precíz munkát végeztek Jánoshalmán. A motoros redőny beépítése tökéletes lett, a szúnyogháló is nagyon jó minőségű.&quot;
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs font-bold text-[#061A40]">
                  Péter — Jánoshalma
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FBBF24" />)}
                </div>
                <p className="text-sm text-slate-600 italic">
                  &quot;Tönkrement a régi redőnyünk automatája, még aznap kijöttek és kicserélték. Korrekt áron dolgoznak, ajánlom mindenkinek!&quot;
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs font-bold text-[#061A40]">
                  Katalin — Kiskunhalas
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FBBF24" />)}
                </div>
                <p className="text-sm text-slate-600 italic">
                  &quot;Teraszajtóra kértünk pliszé szúnyoghálót és alumínium redőnyt Baján. Pontosan a megbeszélt időben érkeztek, nagyon elégedettek vagyunk.&quot;
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs font-bold text-[#061A40]">
                  Gábor — Baja
                </div>
              </div>
            </div>

            <div>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-sm py-3.5 px-7 rounded-xl shadow-md transition"
              >
                <Facebook size={20} />
                Látogasson el a Szlávik Roló Facebook oldalára
              </a>
            </div>

          </div>
        </section>

        {/* 9. FOLYAMAT SZEKCIÓ (Sötétkék kontrasztos szekció) */}
        <section id="folyamat" className="py-20 bg-[#061A40] text-white">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/10">
                Egyszerű és átlátható
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Hogyan zajlik a megrendelés?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center font-bold">
                      <StepIcon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 10. GYIK SZEKCIÓ (Fehér háttér) */}
        <section id="gyik" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 space-y-10">
            
            <div className="text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#061A40] bg-slate-100 px-3.5 py-1.5 rounded-full inline-block">
                Válaszok a kérdéseire
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061A40]">
                Gyakran ismételt kérdések
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex justify-between items-center focus:outline-none hover:bg-slate-100 transition cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#061A40] pr-6">{faq.q}</span>
                    <span className="text-[#1D4ED8] shrink-0">
                      {openFaqIndex === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </span>
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 11. KAPCSOLAT & CTA SZEKCIÓ (Mélykék szekció) */}
        <section id="kapcsolat" className="py-20 bg-[#061A40] text-white relative">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-10 relative z-10">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/10">
                Kérjen ingyenes felmérést még ma!
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Vegye fel velünk a kapcsolatot közvetlenül!
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Hívjon minket a megadott telefonszámokon, vagy küldjön e-mailt! 2 órán belül visszahívjuk.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-3">
                <span className="text-xs text-gray-400 font-semibold uppercase block">Mobil I.</span>
                <a href="tel:+36307826402" className="text-xl font-black text-white hover:text-[#60A5FA] transition flex items-center gap-2">
                  <Phone size={20} className="text-[#10B981]" />
                  +36 30 782 6402
                </a>
                <p className="text-xs text-gray-300">Közvetlenül hívható szakképzett szerelőnk.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-3">
                <span className="text-xs text-gray-400 font-semibold uppercase block">Mobil II.</span>
                <a href="tel:+36704224803" className="text-xl font-black text-white hover:text-[#60A5FA] transition flex items-center gap-2">
                  <Phone size={20} className="text-[#10B981]" />
                  +36 70 422 4803
                </a>
                <p className="text-xs text-gray-300">Másodlagos telefonszámunk.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-3">
                <span className="text-xs text-gray-400 font-semibold uppercase block">Email cím</span>
                <a href="mailto:szlavikrolo@gmail.com" className="text-base font-bold text-white hover:text-[#60A5FA] transition flex items-center gap-2 break-all">
                  <Mail size={18} className="text-[#60A5FA] shrink-0" />
                  szlavikrolo@gmail.com
                </a>
                <p className="text-xs text-gray-300">Árajánlatkérés e-mailben.</p>
              </div>

            </div>

            <div>
              <button
                onClick={openContact}
                className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-lg px-9 py-4 rounded-xl shadow-2xl transition transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
              >
                <Mail size={20} />
                <span>Ajánlatkérő ablak megnyitása</span>
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* 12. MOBIL ALSÓ STICKY DOCK */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 shadow-[0_-4px_16px_rgba(0,0,0,0.2)] border-t border-white/20">
        <a 
          href="tel:+36307826402" 
          className="bg-[#10B981] active:bg-emerald-700 text-white flex items-center justify-center gap-2 py-3.5 font-extrabold text-base transition"
        >
          <Phone size={20} />
          <span>Hívás</span>
        </a>
        <button
          onClick={openContact}
          className="bg-[#1D4ED8] active:bg-[#1E40AF] text-white flex items-center justify-center gap-2 py-3.5 font-extrabold text-base transition cursor-pointer"
        >
          <Mail size={20} />
          <span>Kapcsolat</span>
        </button>
      </div>

      {/* 13. LÁBLÉC */}
      <footer className="bg-[#030F28] text-gray-300 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Col 1: Brand info with WebP Logo */}
            <div className="space-y-4">
              <div className="relative h-14 w-52">
                <Image
                  src="/logo.webp"
                  alt="Szlávik Roló Logó"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-gray-400">SZ+H Univerzál 2015 Kft.</p>
              
              <div className="space-y-2 text-xs sm:text-sm text-gray-300 pt-2">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#60A5FA] shrink-0 mt-0.5" />
                  <span>6440 Jánoshalma, Akác u. 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#10B981] shrink-0" />
                  <a href="tel:+36307826402" className="hover:text-white transition">+36 30 782 6402</a> / 
                  <a href="tel:+36704224803" className="hover:text-white transition">+36 70 422 4803</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#60A5FA] shrink-0" />
                  <a href="mailto:szlavikrolo@gmail.com" className="hover:text-white transition">szlavikrolo@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Col 2: Services links */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wider">Szolgáltatások</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Redőny beszerelés (műanyag & alumínium)</a></li>
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Redőny javítás és szerviz</a></li>
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Motoros redőny telepítés</a></li>
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Régi redőnyök felújítása</a></li>
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Szúnyogháló készítés (fix, rolós, pliszé)</a></li>
                <li><a href="#szolgaltatasok" className="hover:text-white transition">&rarr; Szúnyogháló javítás</a></li>
              </ul>
            </div>

            {/* Col 3: Opening hours */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wider">Nyitvatartás & terület</h4>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Hétfő – Péntek:</span>
                  <span className="font-bold text-white">7:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Szombat:</span>
                  <span className="font-bold text-white">8:00 – 16:00</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Vasárnap:</span>
                  <span>Zárva</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                <strong>Szolgáltatási terület:</strong> Jánoshalma, Kecskemét, Baja, Kiskunhalas, Kiskőrös, Kiskunmajsa és vonzáskörzetük.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p>&copy; 2026 Szlávik Roló (SZ+H Univerzál 2015 Kft.) — Minden jog fenntartva.</p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition">Adatvédelmi tájékoztató</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Impresszum</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}


