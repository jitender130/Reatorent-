import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DishModal } from './components/DishModal';
import { QRCodeModal } from './components/QRCodeModal';
import { DemoCustomizerModal } from './components/DemoCustomizerModal';
import { WhyBuyModal } from './components/WhyBuyModal';
import { SalesBar } from './components/SalesBar';
import { RESTAURANT_PRESETS } from './data/restaurants';
import { MenuItem, CartItem, RestaurantPreset } from './types';
import { Check, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentRestaurant, setCurrentRestaurant] = useState<RestaurantPreset>(RESTAURANT_PRESETS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isWhyBuyOpen, setIsWhyBuyOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cartItems.forEach((item) => {
      counts[item.menuItem.id] = item.quantity;
    });
    return counts;
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { menuItem: dish, quantity: 1 }];
    });
    showToast(`Added "${dish.name}" to tray`);
  };

  const handleAddToCartWithQuantity = (dish: MenuItem, quantity: number, notes?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === dish.id
            ? { ...i, quantity: i.quantity + quantity, specialInstructions: notes || i.specialInstructions }
            : i
        );
      }
      return [...prev, { menuItem: dish, quantity, specialInstructions: notes }];
    });
    showToast(`Added ${quantity}x "${dish.name}" to tray`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((i) => i.menuItem.id !== itemId);
      }
      return prev.map((i) => (i.menuItem.id === itemId ? { ...i, quantity: newQty } : i));
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectPreset = (preset: RestaurantPreset) => {
    setCurrentRestaurant(preset);
    setCartItems([]);
    showToast(`Switched theme to ${preset.name}`);
  };

  const handleApplyCustomization = (updated: RestaurantPreset) => {
    setCurrentRestaurant(updated);
    showToast(`Customized live for "${updated.name}"!`);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Sales Demonstration & Theme Switcher Bar for Salesperson */}
      <SalesBar
        currentPreset={currentRestaurant}
        onSelectPreset={handleSelectPreset}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        onOpenWhyBuy={() => setIsWhyBuyOpen(true)}
      />

      {/* Main Luxury Navigation Bar */}
      <Navbar
        restaurant={currentRestaurant}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={scrollToReservation}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          restaurant={currentRestaurant}
          onOpenReserve={scrollToReservation}
          onScrollToMenu={scrollToMenu}
        />

        {/* Handcrafted Culinary Menu */}
        <MenuSection
          restaurant={currentRestaurant}
          onAddToCart={handleAddToCart}
          onViewDish={(dish) => setSelectedDish(dish)}
          cartItemCounts={cartItemCounts}
        />

        {/* Culinary Heritage & Ambiance Experience */}
        <ExperienceSection
          restaurant={currentRestaurant}
          onOpenReserve={scrollToReservation}
        />

        {/* Online Table Reservation Engine */}
        <ReservationSection restaurant={currentRestaurant} />

        {/* Guest Reviews & 4.9★ Social Proof */}
        <ReviewsSection restaurant={currentRestaurant} />

        {/* Hours & Location Directions */}
        <LocationSection restaurant={currentRestaurant} />
      </main>

      {/* Editorial Luxury Footer */}
      <Footer
        restaurant={currentRestaurant}
        onOpenReserve={scrollToReservation}
        onOpenQR={() => setIsQROpen(true)}
      />

      {/* Cart & Table/Takeaway Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        restaurant={currentRestaurant}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Dish Detailed Ingredients & Nutrition Modal */}
      <DishModal
        dish={selectedDish}
        restaurant={currentRestaurant}
        onClose={() => setSelectedDish(null)}
        onAddToCartWithQuantity={handleAddToCartWithQuantity}
      />

      {/* Table QR Tent Card Modal */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        restaurant={currentRestaurant}
      />

      {/* Salesperson Live Customizer Modal */}
      <DemoCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentPreset={currentRestaurant}
        onApplyCustomization={handleApplyCustomization}
        onSelectPreset={handleSelectPreset}
      />

      {/* Why Restaurant Owners Buy / Commission ROI Modal */}
      <WhyBuyModal
        isOpen={isWhyBuyOpen}
        onClose={() => setIsWhyBuyOpen(false)}
        restaurant={currentRestaurant}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-white border border-stone-200 text-stone-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-stone-800">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs text-amber-700 hover:text-amber-800 underline font-bold ml-1 cursor-pointer"
          >
            View Tray
          </button>
        </div>
      )}

      {/* Quick Scroll to Top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 left-4 z-30 p-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-md transition-all hidden md:flex items-center justify-center cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
}
