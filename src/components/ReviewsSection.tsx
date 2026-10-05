import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface ReviewsSectionProps {
  restaurant: RestaurantPreset;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ restaurant }) => {
  const reviews = [
    {
      name: 'Dr. Siddharth Malvankar',
      date: 'Visited last weekend · Table of 4',
      rating: 5,
      reviewText: 'Hands down the most royal dining experience in the city. The Galouti Kebabs genuinely melt on your tongue without chewing, and the Shahi Dum Biryani aroma filled the entire room. Outstanding service by staff.',
      favoriteDish: 'Galouti Kebab Nawabi & Dum Biryani',
      initials: 'SM'
    },
    {
      name: 'Ananya & Rohan Deshmukh',
      date: 'Anniversary Dinner · Veranda Seating',
      rating: 5,
      reviewText: 'We celebrated our 5th wedding anniversary here and the team arranged a table with fresh flowers and candlelight. The live charcoal fragrance and peaceful acoustics made our evening magical.',
      favoriteDish: 'Dal Zaika & Truffle Garlic Naan',
      initials: 'AD'
    },
    {
      name: 'Vikramaditya Sengupta',
      date: 'Family Gathering · 8 Guests',
      rating: 5,
      reviewText: 'Took my elderly parents who are very particular about pure ghee preparations. They were ecstatic! Clean, hygienic, zero heavy feeling after eating. Ordering online through their website was effortless.',
      favoriteDish: 'Butter Chicken & Shahi Tukda Brioche',
      initials: 'VS'
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-white border-b border-stone-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-800 mb-2 block">
              Guest Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Loved by Over {restaurant.reviewsCount.toLocaleString()}+ Connoisseurs
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3.5 shrink-0 shadow-xs">
            <div className="text-3xl font-serif font-bold text-amber-800 tabular-nums">
              {restaurant.rating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <div className="text-xs font-medium text-stone-500">
                Google Verified Dining Rating
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-300 hover:shadow-lg transition-all shadow-xs relative"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-200">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        {rev.name}
                        <span title="Verified Diner">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      </h4>
                      <span className="text-[11px] text-stone-400 font-medium">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-5">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Recommended dish */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <ThumbsUp className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Loved: <strong className="text-stone-800 font-semibold">{rev.favoriteDish}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
