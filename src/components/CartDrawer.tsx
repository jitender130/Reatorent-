import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, Utensils } from 'lucide-react';
import { CartItem, RestaurantPreset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  restaurant: RestaurantPreset;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  restaurant,
  onUpdateQuantity,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('Table 4');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const finalTotal = Math.max(0, subtotal + gst - discountAmount);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ROYAL10' || couponCode.trim().toUpperCase() === 'WELCOME10') {
      setAppliedDiscount(10);
      setCouponMsg('10% VIP Discount Applied!');
    } else {
      setCouponMsg('Invalid promo code. Try: ROYAL10');
    }
  };

  const generateWhatsAppOrderLink = () => {
    let message = `🍽️ *NEW ORDER - ${restaurant.name.toUpperCase()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Type: *${orderType === 'dine_in' ? `Dine-In (${tableNumber})` : 'Takeaway / Delivery'}*\n`;
    if (customerName) message += `Customer: ${customerName} (${customerPhone || 'Direct'})\n`;
    if (orderType === 'takeaway' && deliveryAddress) message += `Address: ${deliveryAddress}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*ORDER ITEMS:*\n`;

    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.menuItem.name} x${item.quantity} = ${restaurant.currency}${item.menuItem.price * item.quantity}\n`;
      if (item.specialInstructions) {
        message += `   _Note: ${item.specialInstructions}_\n`;
      }
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Subtotal: ${restaurant.currency}${subtotal}\n`;
    message += `GST (5%): ${restaurant.currency}${gst}\n`;
    if (discountAmount > 0) message += `Discount (10%): -${restaurant.currency}${discountAmount}\n`;
    message += `*GRAND TOTAL: ${restaurant.currency}${finalTotal}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please confirm my order. Thank you!`;

    const cleanPhone = restaurant.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white border-l border-stone-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Your Order Tray
            </h2>
            <span className="text-xs bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded-full font-bold">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="p-4 bg-stone-50/70 border-b border-stone-200">
          <div className="grid grid-cols-2 gap-2 bg-stone-200/80 p-1 rounded-xl">
            <button
              onClick={() => setOrderType('dine_in')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                orderType === 'dine_in'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🍽️ Table Dine-In
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                orderType === 'takeaway'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🥡 Takeaway / Delivery
            </button>
          </div>

          {orderType === 'dine_in' ? (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-stone-600 font-medium">Ordering from Table:</span>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. Table 4"
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-900 font-bold focus:outline-none focus:border-amber-600 w-36 shadow-xs"
              />
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your Name..."
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600 shadow-xs"
              />
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Delivery address / Flat no..."
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600 shadow-xs"
              />
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                <Utensils className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-stone-800 mb-1">Your tray is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Explore our digital menu and tap "Add" on mouth-watering appetizers, chef specials, and biryanis.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.menuItem.id}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                    <ImageWithFallback
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="w-full h-full object-cover"
                      fallbackEmoji={item.menuItem.visualAccent.dishEmoji}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.menuItem.name}
                    </h4>
                    <span className="text-xs text-amber-800 font-bold tabular-nums">
                      {restaurant.currency}{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-2 py-1 shadow-xs shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 rounded"
                  >
                    {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-xs font-bold text-stone-900 w-4 text-center tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 rounded"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Summary & WhatsApp Action */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo Code (Try ROYAL10)"
                className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 uppercase focus:outline-none focus:border-amber-600 shadow-xs"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-[11px] font-bold ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {couponMsg}
              </p>
            )}

            {/* Bill Math */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-2 font-medium">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-stone-900 tabular-nums font-bold">{restaurant.currency}{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span className="text-stone-900 tabular-nums font-bold">{restaurant.currency}{gst}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>VIP Discount (10%)</span>
                  <span className="tabular-nums">-{restaurant.currency}{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                <span>Total Amount</span>
                <span className="text-amber-800 tabular-nums text-base">{restaurant.currency}{finalTotal}</span>
              </div>
            </div>

            {/* WhatsApp Direct Order CTA */}
            <a
              href={generateWhatsAppOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Order to Kitchen via WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>⚡ 0% Commission Direct Restaurant Dispatch</span>
              <button
                onClick={onClearCart}
                className="text-stone-500 hover:text-red-600 font-medium"
              >
                Clear Tray
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
