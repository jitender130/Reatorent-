import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface NavbarProps {
  restaurant: RestaurantPreset;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  restaurant,
  cartCount,
  onOpenCart,
  onOpenReserve
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3.5'
          : 'bg-white/80 backdrop-blur-xs py-4 sm:py-5 border-b border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="flex flex-col text-left group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
              {restaurant.name}
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-amber-800">
              {restaurant.cuisine.split('·')[0]}
            </span>
          </a>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-stone-600">
            <a href="#menu" className="hover:text-amber-700 transition-colors">
              Digital Menu
            </a>
            <a href="#reservation" className="hover:text-amber-700 transition-colors">
              Table Reservation
            </a>
            <a href="#experience" className="hover:text-amber-700 transition-colors">
              Chef & Story
            </a>
            <a href="#reviews" className="hover:text-amber-700 transition-colors">
              Guest Reviews
            </a>
            <a href="#location" className="hover:text-amber-700 transition-colors">
              Hours & Location
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-amber-700 transition-colors"
              title="Call Restaurant Directly"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="tabular-nums font-mono text-xs">{restaurant.phone}</span>
            </a>

            <button
              onClick={onOpenReserve}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-800 hover:text-amber-700 rounded-lg border border-stone-200 transition-colors cursor-pointer"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2 pb-3 bg-white rounded-xl shadow-lg p-3">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Digital Menu
            </a>
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Table Reservation
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Chef & Story
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Guest Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Location & Hours
            </a>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-3">
              <span className="text-xs text-stone-500">Direct Contact:</span>
              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                className="text-xs font-mono text-amber-700 font-bold"
              >
                {restaurant.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
