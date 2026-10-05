import React from 'react';
import { Calendar, Utensils, Star, Award, ShieldCheck, Clock, ArrowRight, MapPin } from 'lucide-react';
import { RestaurantPreset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  restaurant: RestaurantPreset;
  onOpenReserve: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  restaurant,
  onOpenReserve,
  onScrollToMenu
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#FAF8F5] via-white to-white border-b border-stone-200/80 pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Operational Status Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-600 mb-8 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Kitchen Open Today
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="inline-flex items-center gap-1 text-stone-600">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            {restaurant.timings.split('|')[0] || '12:30 PM - 11:30 PM'}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="inline-flex items-center gap-1 text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            {restaurant.city}
          </span>
        </div>

        {/* Hero Grid: Left Content, Right Real Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-800 mb-3">
              {restaurant.cuisine}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.14] mb-6 text-balance">
              {restaurant.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl font-normal text-balance">
              {restaurant.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenReserve}
                className="px-7 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={onScrollToMenu}
                className="px-6 py-3.5 bg-stone-50 hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold tracking-wider text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-amber-700" />
                <span>Explore Live Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>

            {/* Proof Badges */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="flex items-center gap-1 text-amber-700 font-bold text-lg font-serif">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{restaurant.rating} / 5.0</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {restaurant.reviewsCount.toLocaleString()}+ Google Reviews
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-stone-800 font-bold text-lg font-serif">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Times Food</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Best Dining Winner
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-stone-800 font-bold text-lg font-serif">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Fresh</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Pure Desi Ghee & Farm Dairy
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Real Photographic Ambiance & Featured Dish */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-[4/3] group">
              <ImageWithFallback
                src={restaurant.heroImageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'}
                alt={`${restaurant.name} Dining Ambiance`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackEmoji="🏛️"
                fallbackGradient="from-stone-100 to-amber-50"
              />

              {/* Gradient scrim for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300 mb-1">
                  Ambiance & Atmosphere
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {restaurant.name} Dining Sanctuary
                </h3>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2 max-w-md">
                  Sunlit daylight by afternoon, warm amber chandeliers and candlelit intimate corners by night.
                </p>
              </div>

              {/* Floating verified badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-stone-200 text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.9★ Rated Diner Choice</span>
              </div>
            </div>

            {/* Overlapping Quick Special Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-stone-200 rounded-2xl p-4 shadow-xl max-w-xs flex items-center gap-3 hidden sm:flex">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                <ImageWithFallback
                  src={restaurant.menuItems[0]?.imageUrl}
                  alt={restaurant.menuItems[0]?.name || 'Signature Dish'}
                  className="w-full h-full object-cover"
                  fallbackEmoji={restaurant.menuItems[0]?.visualAccent.dishEmoji || '🍲'}
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Today's Chef Pick
                </span>
                <h4 className="text-xs font-bold text-stone-900 truncate max-w-[150px]">
                  {restaurant.menuItems[0]?.name}
                </h4>
                <span className="text-xs font-bold text-amber-800">
                  {restaurant.currency}{restaurant.menuItems[0]?.price}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
