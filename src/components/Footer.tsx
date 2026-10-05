import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface FooterProps {
  restaurant: RestaurantPreset;
  onOpenReserve: () => void;
  onOpenQR: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  restaurant,
  onOpenReserve,
  onOpenQR
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] text-stone-600 border-t border-stone-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
              {restaurant.name}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {restaurant.subtagline}
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>FSSAI License: <strong className="font-mono text-stone-900">{restaurant.fssaiNumber}</strong></span>
              </div>
              <div className="text-[11px] text-stone-500">
                100% Food Safety & Hygiene Certified
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#menu" className="hover:text-amber-700 transition-colors">
                  Digital Food Menu
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-amber-700 transition-colors">
                  Reserve a Dining Table
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-700 transition-colors">
                  Chef & Heritage Story
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-700 transition-colors">
                  Verified Guest Reviews
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQR}
                  className="text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Table QR Menu Preview</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-serif">
              Dining Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <div>
                <span className="block font-bold text-stone-900">Open Daily</span>
                <span>{restaurant.timings}</span>
              </div>
              <p className="text-[11px] text-amber-800 font-medium pt-1">
                Advance priority reservations recommended for weekend dinners and private booths.
              </p>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-serif">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-stone-800 hover:text-amber-700 transition-colors font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{restaurant.phone}</span>
              </a>
              <a
                href={`mailto:${restaurant.email}`}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{restaurant.email}</span>
              </a>
              <div className="flex items-start gap-2 text-stone-600 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-[11px]">{restaurant.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {restaurant.name}. All culinary rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-600 hover:text-amber-800 font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
