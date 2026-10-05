import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Navigation, ShieldCheck } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface LocationSectionProps {
  restaurant: RestaurantPreset;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ restaurant }) => {
  return (
    <section id="location" className="py-20 bg-stone-50/60 border-b border-stone-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-800 mb-2 block">
            Visit & Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3 text-balance">
            Hours & Location
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-balance">
            Conveniently situated in prime heritage surroundings with complimentary valet parking and private elevator access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Dining Location</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {restaurant.address}
                  </p>
                  <p className="text-xs text-amber-900 font-medium mt-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-700" />
                    Complimentary Valet Parking Available at Entrance
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Dining Hours</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {restaurant.timings}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    Open All 7 Days · Kitchen closes 30 mins before closing
                  </p>
                </div>
              </div>

              {/* Direct Inquiries */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Direct Table & Event Hotline</h4>
                  <div className="space-y-1">
                    <a
                      href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-mono font-bold text-amber-800 hover:underline block"
                    >
                      {restaurant.phone}
                    </a>
                    <a
                      href={`mailto:${restaurant.email}`}
                      className="text-xs text-stone-500 hover:text-stone-800 block"
                    >
                      {restaurant.email}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Safety & Hygiene Badge */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between text-xs text-stone-600 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Food Safety FSSAI Lic. <strong className="font-mono text-stone-900">{restaurant.fssaiNumber}</strong></span>
              </div>
              <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">100% Certified</span>
            </div>
          </div>

          {/* Interactive Map Presentation Card */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            {/* Visual Map Representation */}
            <div className="h-64 sm:h-72 w-full rounded-2xl bg-stone-100 border border-stone-200 relative overflow-hidden flex items-center justify-center p-6 text-center">
              {/* Stylized light map grid lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C25E00_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-stone-300" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-300" />
              <div className="absolute top-1/4 left-1/4 right-1/4 h-28 border border-amber-300 rounded-xl pointer-events-none" />

              {/* Pin indicator */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/30">
                  <MapPin className="w-6 h-6 fill-white" />
                </div>
                <div className="mt-2 bg-white text-stone-900 border border-stone-200 px-3 py-1 rounded-xl text-xs font-bold shadow-md">
                  {restaurant.name}
                </div>
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.address}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                className="py-3 px-5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Call Restaurant</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
