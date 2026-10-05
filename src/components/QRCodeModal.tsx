import React, { useState } from 'react';
import { X, QrCode, Printer, Download, Sparkles, Check, Smartphone } from 'lucide-react';
import { RestaurantPreset } from '../types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantPreset;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  restaurant
}) => {
  const [tableNumber, setTableNumber] = useState<string>('04');
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Digital Table QR Standee Preview
            </h2>
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
          <div className="text-center">
            <p className="text-xs text-stone-600 leading-relaxed">
              Place these stands on your dining tables. Guests simply open their smartphone camera to browse your full live menu and place orders instantly.
            </p>
          </div>

          {/* Printable Table Stand Preview */}
          <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FBF7ED] border-2 border-amber-600/60 rounded-3xl p-6 text-center shadow-md relative overflow-hidden max-w-xs mx-auto">
            {/* Top gold banner */}
            <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-800 mb-1">
              Table Standee Preview
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-950 uppercase tracking-tight mb-1">
              {restaurant.name}
            </h3>
            <p className="text-[11px] text-stone-500 mb-4 font-medium">
              {restaurant.cuisine.split('·')[0]}
            </p>

            {/* Stylized high-res QR code display */}
            <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-3.5 shadow-sm border border-stone-200 flex flex-col items-center justify-center relative">
              {/* QR Pattern visual */}
              <div className="w-full h-full border-4 border-stone-900 flex flex-col justify-between p-1.5 rounded-lg">
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-4 border-stone-900 p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900" />
                  </div>
                  <div className="w-10 h-10 border-4 border-stone-900 p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900" />
                  </div>
                </div>

                {/* Center Logo Crest */}
                <div className="flex items-center justify-center my-auto">
                  <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold font-serif shadow-xs">
                    {restaurant.name.charAt(0)}
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="w-10 h-10 border-4 border-stone-900 p-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-stone-900" />
                  </div>
                  <div className="text-[9px] font-mono text-stone-900 font-bold tracking-tighter">
                    SCAN MENU
                  </div>
                </div>
              </div>
            </div>

            {/* Table Number Callout */}
            <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">Assigned Table:</span>
              <span className="font-mono font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-300">
                Table #{tableNumber}
              </span>
            </div>

            <div className="mt-2 text-[10px] text-stone-500 flex items-center justify-center gap-1 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>No App Download Required</span>
            </div>
          </div>

          {/* Table number selector for bulk printing */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-stone-700 font-bold">Set Table Number:</span>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-16 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-center text-amber-900 font-mono font-bold focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Value Prop for Restaurant Owner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-stone-700 flex items-start gap-2.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 block mb-0.5 font-bold">Zero Recurring QR Subscriptions</strong>
              <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                Other software platforms charge ₹500–₹1,500/month for QR menus. With this website, your QR code points directly to your own custom domain forever!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold border border-stone-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Stand PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee</span>
          </button>
        </div>
      </div>
    </div>
  );
};
