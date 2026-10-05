import React, { useState } from 'react';
import { X, Sparkles, Wand2, Check } from 'lucide-react';
import { RestaurantPreset } from '../types';
import { RESTAURANT_PRESETS } from '../data/restaurants';

interface DemoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreset: RestaurantPreset;
  onApplyCustomization: (updated: RestaurantPreset) => void;
  onSelectPreset: (preset: RestaurantPreset) => void;
}

export const DemoCustomizerModal: React.FC<DemoCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentPreset,
  onApplyCustomization,
  onSelectPreset
}) => {
  const [name, setName] = useState(currentPreset.name);
  const [tagline, setTagline] = useState(currentPreset.tagline);
  const [cuisine, setCuisine] = useState(currentPreset.cuisine);
  const [phone, setPhone] = useState(currentPreset.phone);
  const [whatsapp, setWhatsapp] = useState(currentPreset.whatsapp);
  const [city, setCity] = useState(currentPreset.city);
  const [address, setAddress] = useState(currentPreset.address);
  const [heroHeadline, setHeroHeadline] = useState(currentPreset.heroHeadline);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: RestaurantPreset = {
      ...currentPreset,
      name,
      tagline,
      cuisine,
      phone,
      whatsapp: whatsapp || phone.replace(/[^0-9]/g, ''),
      city,
      address,
      heroHeadline
    };
    onApplyCustomization(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };

  const handleQuickPreset = (preset: RestaurantPreset) => {
    onSelectPreset(preset);
    setName(preset.name);
    setTagline(preset.tagline);
    setCuisine(preset.cuisine);
    setPhone(preset.phone);
    setWhatsapp(preset.whatsapp);
    setCity(preset.city);
    setAddress(preset.address);
    setHeroHeadline(preset.heroHeadline);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                Instant Client Rebrand & Demo Customizer
              </h2>
              <p className="text-[11px] text-stone-500">
                Type your prospect's details and transform the website live in 5 seconds!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleApply} className="p-6 overflow-y-auto space-y-5">
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              1. Choose a Curated Cuisine Theme:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {RESTAURANT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickPreset(p)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    currentPreset.id === p.id
                      ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xs font-bold text-stone-900 block truncate">{p.name}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{p.cuisine.split('·')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-3">
              2. Or Personalize for Client:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Client Restaurant Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Peshawari Courtyard"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-bold focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Cuisine Specialty *
                </label>
                <input
                  type="text"
                  required
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  placeholder="e.g. North Indian · Tandoor & Biryani"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Client Phone / WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setWhatsapp(e.target.value);
                  }}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono font-bold focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Orders and table bookings will link directly to this phone!
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  City & Locality
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Connaught Place, New Delhi"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
                />
              </div>
            </div>

            <div className="mb-3.5">
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Shop 14, Inner Circle, Connaught Place, New Delhi"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                Hero Banner Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="e.g. Experience The Finest Awadhi Flavors"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white shadow-xs"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 py-2.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                saved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Website Transformed!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Transform Website Instantly</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
