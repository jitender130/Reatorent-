import React from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Wine, Flame } from 'lucide-react';
import { RestaurantPreset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ExperienceSectionProps {
  restaurant: RestaurantPreset;
  onOpenReserve: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ restaurant, onOpenReserve }) => {
  const ambiances = [
    {
      title: 'The Grand Dining Hall',
      subtitle: 'Atmospheric Opulence',
      description: 'Hand-cut crystal chandeliers, warm teak woodwork, and plush booths accompanied by gentle instrumental classical melodies.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
      icon: <Sparkles className="w-4 h-4 text-amber-700" />,
      tag: 'Main Hall · 80 Seats'
    },
    {
      title: 'Sunlit Veranda & Terrace',
      subtitle: 'Al-Fresco Dining',
      description: 'Dine under gentle natural daylight and fresh greenery, perfect for relaxed afternoon lunches and intimate couple evenings.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      icon: <Wine className="w-4 h-4 text-amber-700" />,
      tag: 'Open-Air · 30 Seats'
    },
    {
      title: 'Private Banquet Chambers',
      subtitle: 'Exclusive Celebrations',
      description: 'Dedicated secluded suites with private waitstaff, personalized customized menus, and bespoke banquet setup for up to 35 guests.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
      icon: <HeartHandshake className="w-4 h-4 text-amber-700" />,
      tag: 'Private Suites'
    },
    {
      title: 'Open Charcoal Exhibition Kitchen',
      subtitle: 'Culinary Theatrics',
      description: 'Watch our master ustads stretch airy breads, toss claypot biryanis, and flame-sear succulent skewers over glowing coal pits.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
      icon: <Flame className="w-4 h-4 text-amber-700" />,
      tag: 'Live Counter'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-stone-50/60 border-b border-stone-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-800 mb-2 block">
            The Ambiance & Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4 text-balance">
            Crafted for Unforgettable Dining
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-balance">
            Hospitality is an art form. From our kitchen philosophy to the acoustics of our dining hall, every detail is engineered to delight your senses.
          </p>
        </div>

        {/* Master Chef Spotlight Card with Real Chef Photo */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 mb-16 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Chef Visual Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg border-4 border-stone-100 mb-4 bg-stone-100">
                <ImageWithFallback
                  src={restaurant.chefImageUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'}
                  alt={restaurant.chefName}
                  className="w-full h-full object-cover"
                  fallbackEmoji="👨‍🍳"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {restaurant.chefName}
              </h3>
              <p className="text-xs text-amber-800 font-bold mt-0.5">
                {restaurant.chefTitle}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>24+ Years Culinary Mastery</span>
              </div>
            </div>

            {/* Chef Story & Philosophy */}
            <div className="lg:col-span-8 space-y-4">
              <blockquote className="border-l-4 border-amber-600 pl-4 py-1 italic text-stone-800 font-serif text-base sm:text-lg leading-relaxed">
                "{restaurant.chefQuote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {restaurant.chefBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-medium text-stone-700">FSSAI 5-Star Hygiene Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-medium text-stone-700">Zero Chemical Preservatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-medium text-stone-700">100% Traditional Slow Fire Cooking</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Ambiance Cards with Real Interior Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ambiances.map((amb, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="h-40 w-full overflow-hidden bg-stone-100 relative">
                  <ImageWithFallback
                    src={amb.image}
                    alt={amb.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackEmoji="🏛️"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-stone-800 shadow-xs">
                    {amb.tag}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800 block mb-1">
                    {amb.subtitle}
                  </span>
                  <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                    {amb.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {amb.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={onOpenReserve}
                  className="w-full py-2 bg-stone-50 hover:bg-amber-600 hover:text-white text-stone-700 text-xs font-bold rounded-xl border border-stone-200 hover:border-amber-600 transition-colors"
                >
                  Reserve This Area →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
