import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, CheckCircle2, MessageSquare, ChevronRight } from 'lucide-react';
import { RestaurantPreset, ReservationDetails } from '../types';

interface ReservationSectionProps {
  restaurant: RestaurantPreset;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ restaurant }) => {
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('Today, Oct 5');
  const [selectedSlot, setSelectedSlot] = useState<string>('08:00 PM');
  const [seatingArea, setSeatingArea] = useState<'indoor_ac' | 'terrace' | 'private_booth' | 'romantic_corner'>('romantic_corner');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationDetails | null>(null);

  const dates = [
    { label: 'Today', value: 'Today, Oct 5' },
    { label: 'Tomorrow', value: 'Tomorrow, Oct 6' },
    { label: 'Wednesday', value: 'Wed, Oct 7' },
    { label: 'Thursday', value: 'Thu, Oct 8' },
    { label: 'Friday', value: 'Fri, Oct 9' },
    { label: 'Saturday', value: 'Sat, Oct 10' }
  ];

  const slots = [
    { time: '12:30 PM', meal: 'Lunch', popular: false },
    { time: '01:30 PM', meal: 'Lunch', popular: false },
    { time: '02:30 PM', meal: 'Lunch', popular: false },
    { time: '07:00 PM', meal: 'Dinner', popular: false },
    { time: '08:00 PM', meal: 'Dinner', popular: true, note: 'Peak Dining' },
    { time: '08:45 PM', meal: 'Dinner', popular: true, note: '2 Tables Left' },
    { time: '09:30 PM', meal: 'Dinner', popular: false },
    { time: '10:15 PM', meal: 'Dinner', popular: false }
  ];

  const seatingOptions = [
    { id: 'romantic_corner', title: 'Romantic Candlelit Corner', desc: 'Soft lighting, intimate ambience & floral touch' },
    { id: 'indoor_ac', title: 'Grand Dining Hall (AC)', desc: 'Royal chandeliers, plush velvet seating & soft background raga' },
    { id: 'private_booth', title: 'Private Family Dining', desc: 'Quiet secluded booth suitable for 4 to 10 guests' },
    { id: 'terrace', title: 'Open-Air Veranda / Terrace', desc: 'Under starlight with gentle evening breeze' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const bookingId = `${restaurant.name.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const details: ReservationDetails = {
      bookingId,
      guestName,
      phone: guestPhone,
      email: guestEmail,
      guestsCount,
      date: selectedDate,
      timeSlot: selectedSlot,
      seatingArea,
      occasion,
      specialRequests
    };
    setConfirmedBooking(details);
  };

  const getWhatsAppBookingLink = (booking: ReservationDetails) => {
    const text = encodeURIComponent(
      `Hello ${restaurant.name}! 🍷\n\nI have requested a table reservation on your website:\n• Booking ID: #${booking.bookingId}\n• Name: ${booking.guestName}\n• Guests: ${booking.guestsCount} Persons\n• Date: ${booking.date}\n• Time: ${booking.timeSlot}\n• Seating: ${booking.seatingArea.replace('_', ' ')}\n• Occasion: ${booking.occasion}\n${booking.specialRequests ? `• Special Request: ${booking.specialRequests}\n` : ''}\nPlease confirm my reservation. Thank you!`
    );
    const cleanPhone = restaurant.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <section id="reservation" className="py-20 bg-white border-b border-stone-200/80 scroll-mt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-800 mb-2 block">
            Priority Seating
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3 text-balance">
            Reserve Your Dining Experience
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-balance">
            Enjoy guaranteed priority seating without waiting. Instant confirmation delivered directly to your WhatsApp with your booking reference.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State Card */
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl text-center max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-wider text-amber-800 font-bold">
              Reservation Confirmed
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1 mb-2">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Your table at <strong className="text-stone-900">{restaurant.name}</strong> is reserved with reference:
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 text-left space-y-2.5 mb-6 text-xs text-stone-700 shadow-xs">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Booking Reference</span>
                <span className="font-mono font-bold text-amber-800 text-sm">#{confirmedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guest Name</span>
                <span className="font-bold text-stone-900">{confirmedBooking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Guests</span>
                <span className="text-stone-900 font-medium">{confirmedBooking.guestsCount} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Slot</span>
                <span className="text-amber-800 font-bold">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Seating Preference</span>
                <span className="capitalize text-stone-900 font-medium">{confirmedBooking.seatingArea.replace('_', ' ')}</span>
              </div>
              {confirmedBooking.specialRequests && (
                <div className="flex justify-between border-t border-stone-100 pt-2 text-[11px]">
                  <span className="text-stone-500">Special Note:</span>
                  <span className="italic text-stone-800">{confirmedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsAppBookingLink(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Save on WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold transition-colors"
              >
                <span>Make Another Booking</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form in Light Theme */
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg"
          >
            {/* Step 1: Guests Count */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                <Users className="w-4 h-4 text-amber-700" />
                <span>1. Number of Guests</span>
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestsCount(num)}
                    className={`h-11 min-w-[50px] px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      guestsCount === num
                        ? 'bg-amber-600 text-white shadow-sm scale-105'
                        : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  <CalendarIcon className="w-4 h-4 text-amber-700" />
                  <span>2. Select Dining Date</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                        selectedDate === d.value
                          ? 'bg-amber-50 border-amber-600 text-amber-900 font-bold shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block font-bold">{d.label}</span>
                      <span className="text-[10px] text-stone-500 block truncate">{d.value.split(',')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>3. Dining Time Slot</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      onClick={() => setSelectedSlot(s.time)}
                      className={`p-2.5 rounded-xl text-center text-xs transition-all border cursor-pointer ${
                        selectedSlot === s.time
                          ? 'bg-amber-600 text-white font-bold border-amber-700 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block font-bold tabular-nums">{s.time}</span>
                      <span className={`text-[10px] block ${selectedSlot === s.time ? 'text-amber-100' : 'text-stone-400'}`}>
                        {s.note || s.meal}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Seating Preference */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>4. Seating Preference & Ambiance</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSeatingArea(opt.id as any)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      seatingArea === opt.id
                        ? 'bg-amber-50/60 border-amber-600 shadow-xs'
                        : 'bg-stone-50/80 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      seatingArea === opt.id ? 'border-amber-600 bg-amber-600' : 'border-stone-400'
                    }`}>
                      {seatingArea === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${seatingArea === opt.id ? 'text-amber-900' : 'text-stone-900'}`}>
                        {opt.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Contact details & occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Arjun Kapoor"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Occasion (Optional)
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                >
                  <option value="Casual Dining">Casual Dining</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Business Dinner">Business Dinner</option>
                  <option value="Family Gathering">Family Gathering</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                Special Requests or Dietary Requirements
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. High chair needed, cake arrangement, non-spicy preparation..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>

            {/* Submission button */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <span>Free cancellation · No advance deposit required</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Priority Reservation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
