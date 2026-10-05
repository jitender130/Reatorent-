import React from 'react';
import { X, CheckCircle2, TrendingUp, DollarSign, Smartphone, QrCode } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface WhyBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantPreset;
}

export const WhyBuyModal: React.FC<WhyBuyModalProps> = ({
  isOpen,
  onClose,
  restaurant
}) => {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-700" />,
      title: 'Save 25%–30% Third-Party Commissions',
      desc: 'Aggregators cut up to 30% on every order. With direct website & WhatsApp ordering, you keep 100% of your revenue and build your own loyal customer database.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-amber-700" />,
      title: 'Direct WhatsApp Table & Food Orders',
      desc: 'No confusing dashboards or apps. Customers click once and their reservation or food order lands directly in your WhatsApp with formatted billing details.'
    },
    {
      icon: <QrCode className="w-5 h-5 text-purple-700" />,
      title: 'Permanent Table QR Code Menus',
      desc: 'No re-printing costs whenever dish prices change. Update your digital menu in seconds and customers scan the table QR stand with any smartphone.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-700" />,
      title: 'Google Search & Maps Domination',
      desc: 'Rank on top when local food lovers search "best fine dining near me" or "romantic dinner in your city" on Google Maps and Google Search.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-base font-bold text-stone-900 font-serif">
                Why Every Restaurant Needs This Website (Sales Pitch Kit)
              </h2>
              <p className="text-[11px] text-stone-500">
                Key arguments and ROI breakdown that convince restaurant owners to buy immediately!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* ROI Calculator Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block mb-1">
              Estimated Return on Investment
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  Save ₹35,000 to ₹90,000+ Every Month
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  On just ₹2,00,000 monthly direct orders, you save ₹50,000 in lost aggregator commissions.
                </p>
              </div>
              <div className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center shrink-0 shadow-xs">
                100% Direct Profit
              </div>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                    {b.icon}
                  </div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {b.title}
                  </h4>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* What’s Included in Delivery */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Everything Included for the Restaurant:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom Domain & SSL Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp Table Booking Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Digital QR Menu for Dining Tables</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast mobile-friendly loading speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Google Maps & SEO business setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24-Hour Express Launch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Show this screen to any restaurant owner to close the deal!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Ready to Pitch
          </button>
        </div>
      </div>
    </div>
  );
};
