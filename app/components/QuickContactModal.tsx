"use client";

import React, { useState } from 'react';
import { Phone, Mail, X, CheckCircle2, Clock, MapPin, ShieldCheck, Copy, Check } from 'lucide-react';

interface QuickContactModalProps {
  isOpen: boolean;
}

export default function QuickContactModal({ isOpen, onClose }: QuickContactModalProps & { onClose: () => void }) {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(key);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '4b8f2f7a-c9a2-4681-9503-f9f2b085fc12',
          subject: `Új visszahívási kérés - ${name}`,
          from_name: 'Szlávik Roló Weboldal',
          name: name,
          phone: phone,
          message: message || 'Nem adott meg külön üzenetet.',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError('Sajnos hiba történt a beküldés során. Kérjük, hívjon minket közvetlenül telefonon!');
      }
    } catch (err) {
      setSubmitError('Hálózati hiba történt. Kérjük, hívjon minket közvetlenül telefonon!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#061A40] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Bezárás"
          >
            <X size={22} />
          </button>
          
          <div className="flex items-center gap-2 mb-2 text-[#60A5FA] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Ingyenes & kötelezettségmentes</span>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight">
            Kapcsolatfelvétel és árajánlat
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            Hívjon minket bizalommal vagy küldjön üzenetet — 2 órán belül visszahívjuk!
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">

          {/* Instant Call Section */}
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">
              1. Azonnali telefonhívás
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone 1 */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col justify-between hover:bg-emerald-100/80 transition">
                <span className="text-xs text-emerald-800 font-semibold mb-1">Mobil I.</span>
                <a
                  href="tel:+36307826402"
                  className="text-emerald-900 font-extrabold text-lg flex items-center gap-2 hover:underline"
                >
                  <Phone size={18} className="text-[#10B981] animate-pulse" />
                  +36 30 782 6402
                </a>
                <button
                  onClick={() => copyToClipboard('+36307826402', 'p1')}
                  className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1 hover:text-emerald-900 self-start cursor-pointer"
                >
                  {copiedPhone === 'p1' ? (
                    <>
                      <Check size={12} className="text-emerald-600" /> Másolva!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Szám másolása
                    </>
                  )}
                </button>
              </div>

              {/* Phone 2 */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col justify-between hover:bg-emerald-100/80 transition">
                <span className="text-xs text-emerald-800 font-semibold mb-1">Mobil II.</span>
                <a
                  href="tel:+36704224803"
                  className="text-emerald-900 font-extrabold text-lg flex items-center gap-2 hover:underline"
                >
                  <Phone size={18} className="text-[#10B981] animate-pulse" />
                  +36 70 422 4803
                </a>
                <button
                  onClick={() => copyToClipboard('+36704224803', 'p2')}
                  className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1 hover:text-emerald-900 self-start cursor-pointer"
                >
                  {copiedPhone === 'p2' ? (
                    <>
                      <Check size={12} className="text-emerald-600" /> Másolva!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Szám másolása
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Direct Email Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#061A40] text-white flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">Email cím</span>
                <a href="mailto:szlavikrolo@gmail.com" className="text-sm font-bold text-[#061A40] hover:text-[#1D4ED8] transition">
                  szlavikrolo@gmail.com
                </a>
              </div>
            </div>
            <a
              href="mailto:szlavikrolo@gmail.com"
              className="bg-[#061A40] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#030F28] transition"
            >
              Levél írása
            </a>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase">vagy küldjön visszahívási kérést</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Quick Callback Form */}
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold text-green-900">Köszönjük a megkeresést!</h4>
              <p className="text-sm text-green-700">
                Hamarosan visszahívjuk a megadott telefonszámon!
              </p>
              <button
                onClick={onClose}
                className="mt-3 bg-green-700 text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-green-800 transition cursor-pointer"
              >
                Rendben
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Név *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kovács István"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Telefonszám *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 30 782 6402"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rövid üzenet / miben segíthetünk? (Opcionális)</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Pl.: 3 ablakra szeretnék alumínium redőnyt és szúnyoghálót Jánoshalmán."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-lg">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:bg-slate-400 text-white font-bold text-base py-3 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Küldés folyamatban...</span>
                  </>
                ) : (
                  <span>Visszahívást kérek</span>
                )}
              </button>
            </form>
          )}

          {/* Guarantee Footer info */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin size={13} className="text-[#1D4ED8]" />
              Jánoshalma 50 km-es körzetében a kiszállás ingyenes
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-gray-400" />
              Gyors reakcióidő
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}


