import React, { useState } from 'react';
import { X, Flame, Star, Clock, Utensils, AlertTriangle, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, RestaurantPreset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface DishModalProps {
  dish: MenuItem | null;
  restaurant: RestaurantPreset;
  onClose: () => void;
  onAddToCartWithQuantity: (dish: MenuItem, quantity: number, notes?: string) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  restaurant,
  onClose,
  onAddToCartWithQuantity
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCartWithQuantity(dish, quantity, notes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Bar with Real Photography */}
        <div className="h-56 relative overflow-hidden bg-stone-100">
          <ImageWithFallback
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover"
            fallbackEmoji={dish.visualAccent.dishEmoji}
            fallbackGradient={dish.visualAccent.bgGradient}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 rounded-full border border-stone-200 transition-colors z-10 shadow-md"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Veg badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-1.5 rounded-md border border-stone-200 shadow-sm">
            <div className={`w-3.5 h-3.5 rounded border ${dish.isVeg ? 'border-emerald-600' : 'border-red-600'} flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                {dish.name}
              </h2>
              <span className="text-xl font-bold text-amber-800 tabular-nums">
                {restaurant.currency}{dish.price}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Culinary specs grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-bold">Prep Time</span>
              <span className="text-xs font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                {dish.prepTimeMinutes || 15} mins
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-bold">Portion</span>
              <span className="text-xs font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                <Utensils className="w-3.5 h-3.5 text-amber-700" />
                {dish.portionSize || 'Generous'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-bold">Calories</span>
              <span className="text-xs font-bold text-stone-800 block mt-0.5 tabular-nums">
                {dish.calories || 350} kcal
              </span>
            </div>
          </div>

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Curated Ingredients
              </h3>
              <div className="flex flex-wrap gap-1.5 text-xs text-stone-700">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="bg-stone-100 px-3 py-1 rounded-lg border border-stone-200 text-[11px] font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens Notice */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Allergen Information:</span>
                <span>Contains {dish.allergens.join(', ')}. Please inform our team of severe allergies.</span>
              </div>
            </div>
          )}

          {/* Special Cooking Note for Kitchen */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Less spicy, extra lemon on the side, no onions..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          {/* Stepper */}
          <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-3 py-1.5 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-stone-500 hover:text-stone-900 rounded"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-stone-900 w-5 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-stone-500 hover:text-stone-900 rounded"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Tray!</span>
              </>
            ) : (
              <span>Add to Tray • {restaurant.currency}{dish.price * quantity}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
