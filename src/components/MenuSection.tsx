import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Flame, Star, Sparkles, Info } from 'lucide-react';
import { MenuItem, RestaurantPreset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuSectionProps {
  restaurant: RestaurantPreset;
  onAddToCart: (item: MenuItem) => void;
  onViewDish: (item: MenuItem) => void;
  cartItemCounts: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  restaurant,
  onAddToCart,
  onViewDish,
  cartItemCounts
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Starters & Grills' },
    { id: 'signatures', label: "Chef's Signatures" },
    { id: 'mains', label: 'Main Courses' },
    { id: 'breads_rice', label: 'Breads & Rice' },
    { id: 'desserts_drinks', label: 'Desserts & Beverages' }
  ];

  const filteredItems = useMemo(() => {
    return restaurant.menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [restaurant.menuItems, activeCategory, vegOnly, searchQuery]);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 600);
  };

  return (
    <section id="menu" className="py-20 bg-stone-50/50 border-b border-stone-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-800 mb-2 block">
            Artisanal Culinary Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3 text-balance">
            Our Handcrafted Digital Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Each creation is prepared fresh to order with heirloom recipes, pure ghee, stone-ground spices, and organic farm vegetables.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Veg toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Pure Veg Switch */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                vegOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded border border-emerald-600 flex items-center justify-center p-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </span>
              <span>Pure Veg Only</span>
            </button>

            {/* Search input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-xs pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-colors placeholder:text-stone-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 max-w-md mx-auto shadow-xs">
            <div className="text-3xl mb-3">🍲</div>
            <h3 className="text-base font-bold text-stone-800 mb-1">No dishes matched your filter</h3>
            <p className="text-xs text-stone-500 mb-4">Try clearing your search query or toggling off the pure veg filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setVegOnly(false);
                setSearchQuery('');
              }}
              className="text-xs text-amber-700 hover:underline font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const currentCount = cartItemCounts[item.id] || 0;
              const isJustAdded = addedAnimationId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onViewDish(item)}
                  className="group relative bg-white hover:bg-white rounded-2xl border border-stone-200/90 transition-all duration-300 hover:border-amber-400 hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs"
                >
                  {/* Top Real Food Photography Banner */}
                  <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-stone-100">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackEmoji={item.visualAccent.dishEmoji}
                      fallbackGradient={item.visualAccent.bgGradient}
                    />

                    {/* Gradient scrim at bottom of image for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-md border border-stone-200 shadow-sm">
                      <div
                        className={`w-3.5 h-3.5 rounded border ${
                          item.isVeg ? 'border-emerald-600' : 'border-red-600'
                        } flex items-center justify-center`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Chef Special or Bestseller Tag */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {item.isChefSpecial && (
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-50/95 px-2.5 py-1 rounded-md border border-amber-300 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          Chef's Special
                        </span>
                      )}
                      {item.isBestseller && !item.isChefSpecial && (
                        <span className="text-[11px] font-bold text-stone-800 bg-white/95 px-2.5 py-1 rounded-md border border-stone-200 shadow-sm">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Quick view hover pill */}
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-stone-800 bg-white/95 px-2.5 py-1 rounded-md border border-stone-200 shadow-sm flex items-center gap-1">
                      <Info className="w-3 h-3 text-amber-700" />
                      <span>Details & Ingredients</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Spice metadata row */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="tabular-nums">{item.rating.toFixed(1)}</span>
                          <span className="text-stone-400 text-[11px]">({item.reviewCount})</span>
                        </div>

                        {item.spiceLevel > 0 && (
                          <div className="flex items-center gap-0.5 text-orange-600 text-[11px] font-bold" title={`Spice Level: ${item.spiceLevel}/3`}>
                            {Array.from({ length: item.spiceLevel }).map((_, idx) => (
                              <Flame key={idx} className="w-3 h-3 fill-orange-500 text-orange-500" />
                            ))}
                            <span className="ml-1 text-stone-500 font-normal">
                              {item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Spicy'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Dish Title */}
                      <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-2 line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4 font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Pricing & Action Row */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-stone-900 tabular-nums">
                          {restaurant.currency}{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-400 line-through tabular-nums">
                            {restaurant.currency}{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add button with clean light styling */}
                      <button
                        onClick={(e) => handleAdd(item, e)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white scale-105 shadow-sm'
                            : currentCount > 0
                            ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                            : 'bg-stone-900 hover:bg-amber-700 text-white shadow-xs'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : currentCount > 0 ? (
                          <>
                            <Check className="w-3 h-3 text-amber-700" />
                            <span>In Tray ({currentCount})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
