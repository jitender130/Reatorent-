import React from 'react';
import { Sparkles, SlidersHorizontal, QrCode, CheckCircle2 } from 'lucide-react';
import { RestaurantPreset } from '../types';
import { RESTAURANT_PRESETS } from '../data/restaurants';

interface SalesBarProps {
  currentPreset: RestaurantPreset;
  onSelectPreset: (preset: RestaurantPreset) => void;
  onOpenCustomizer: () => void;
  onOpenQR: () => void;
  onOpenWhyBuy: () => void;
}

export const SalesBar: React.FC<SalesBarProps> = ({
  currentPreset,
  onSelectPreset,
  onOpenCustomizer,
  onOpenQR,
  onOpenWhyBuy
}) => {
  return (
    <div className="bg-amber-50/90 border-b border-amber-200/90 text-xs text-stone-800 px-4 py-2 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Sales Pitch Helper */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Live Client Demo Toolbar:
          </span>
          <span className="text-stone-600 hidden sm:inline">
            Pitching to a restaurant owner? Switch themes or type their restaurant name live!
          </span>
        </div>

        {/* Quick Switcher & Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-xs">
            {RESTAURANT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  currentPreset.id === preset.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {preset.name.replace('The ', '').split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            title="Type the restaurant owner's name and see this site transform instantly"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Customize for Client</span>
          </button>

          <button
            onClick={onOpenQR}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-stone-50 text-stone-700 rounded-lg text-[11px] border border-stone-300 transition-colors whitespace-nowrap font-medium"
          >
            <QrCode className="w-3 h-3 text-amber-700" />
            <span>Table QR Menu</span>
          </button>

          <button
            onClick={onOpenWhyBuy}
            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-900 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Sales Pitch Kit (Save 30% Cut)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
