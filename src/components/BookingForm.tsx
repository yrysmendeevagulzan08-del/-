import { useState, useEffect } from 'react';
import { Room, Booking } from '../types';
import { X, Calendar, User, Phone, Mail, CreditCard, Sparkles, Check, Info } from 'lucide-react';

interface BookingFormProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
  lang: 'ky' | 'en';
}

export default function BookingForm({ room, isOpen, onClose, onConfirmBooking, lang }: BookingFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestsCount, setGuestsCount] = useState(1);
  const [spaService, setSpaService] = useState(false);
  const [breakfastService, setBreakfastService] = useState(false);
  const [transferService, setTransferService] = useState(false);

  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Synchronize base values when room changes
  useEffect(() => {
    if (room) {
      setGuestsCount(1);
    }
  }, [room]);

  // Recalculate nights and prices
  useEffect(() => {
    if (!checkIn || !checkOut || !room) return;

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    setNights(calculatedNights);

    let baseCost = room.pricePerNight * calculatedNights;
    
    // Add breakfast (1000 som per guest per night)
    if (breakfastService) {
      baseCost += (1000 * guestsCount * calculatedNights);
    }
    // Add sauna flat fee (3000 som)
    if (spaService) {
      baseCost += 3000;
    }
    // Add airport transfer flat fee (2000 som)
    if (transferService) {
      baseCost += 2000;
    }

    setTotalPrice(baseCost);
  }, [checkIn, checkOut, room, guestsCount, spaService, breakfastService, transferService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;

    const newBooking: Booking = {
      id: 'ATG-' + Math.floor(100000 + Math.random() * 900000), // Random Hotel ticket format
      roomId: room.id,
      roomName: room.name,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      totalPrice,
      additionalServices: {
        spa: spaService,
        breakfast: breakfastService,
        transfer: transferService
      },
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };

    onConfirmBooking(newBooking);

    // Reset fields
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpaService(false);
    setBreakfastService(false);
    setTransferService(false);
    onClose();
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/75 backdrop-blur-xs transition-opacity" 
      />

      {/* Main Reservation Form container */}
      <div className="relative bg-[#FAF9F6] border border-stone-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Title Banner */}
        <div className="bg-[#FAF9F6] border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-amber-850 uppercase font-black tracking-widest block">
              {lang === 'ky' ? 'БӨЛМӨНҮ БРОНДОО СУРАМЖЫ' : 'ROOM BOOKING REQUEST'}
            </span>
            <h2 className="text-lg font-bold text-stone-950 font-heading">
              {lang === 'ky' ? room.name : room.nameEn}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Section - Grid Split between Form inputs & Price Breakdown panel */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Left inputs */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider pb-1.5 border-b border-stone-200/50">
              {lang === 'ky' ? 'Коноктун маалыматтары' : 'Guest Information'}
            </h3>

            {/* Guest Name input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                {lang === 'ky' ? 'Аты-жөнүңүз (толук)' : 'Your Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'ky' ? 'Адилет Султанов' : 'John Doe'}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 focus:ring-1 focus:ring-amber-800/10 transition-all font-light"
                />
              </div>
            </div>

            {/* Email & Phone fields split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                  {lang === 'ky' ? 'Электрондук почтасы' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                  <input
                    type="email"
                    required
                    placeholder="adilet@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 focus:ring-1 focus:ring-amber-800/10 transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                  {lang === 'ky' ? 'Телефон номери' : 'Phone Number'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                  <input
                    type="tel"
                    required
                    placeholder="+996 (770) 12-34-56"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 focus:ring-1 focus:ring-amber-800/10 transition-all font-light"
                  />
                </div>
              </div>
            </div>

            {/* Dates Selection & Guests Split */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-100 p-4 border border-stone-200/50 rounded-xl">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wide mb-1">
                  {lang === 'ky' ? 'Келүү' : 'In'}
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                      setCheckOut(nextDay);
                    }
                  }}
                  className="w-full bg-white border border-stone-200 content-center hover:border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-amber-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wide mb-1">
                  {lang === 'ky' ? 'Кетүү' : 'Out'}
                </label>
                <input
                  type="date"
                  min={checkIn || tomorrow}
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white border border-stone-200 content-center hover:border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-amber-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wide mb-1">
                  {lang === 'ky' ? 'Коноктор' : 'Guests Count'}
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-amber-800"
                >
                  {Array.from({ length: room.maxGuests }, (_, k) => (
                    <option key={k+1} value={k+1}>
                      {k+1} {lang === 'ky' ? 'атайын адам' : `Person(s)`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Extra Premium Services Selection */}
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider pb-1.5 border-b border-stone-200/50">
                {lang === 'ky' ? 'Кошумча люкс шарттары' : 'Additional Luxury Perks'}
              </h3>
              
              <div className="space-y-3.5">
                {/* Buffet Breakfast selection */}
                <label className="flex items-start space-x-3.5 p-3 rounded-xl border border-stone-250 hover:border-stone-400 bg-white transition-all cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={breakfastService}
                    onChange={(e) => setBreakfastService(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 rounded-sm AccentColor border-stone-300 accent-amber-800"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-850 uppercase tracking-wide">
                        {lang === 'ky' ? 'Эртең мененки тамак (Швед стол)' : 'Daily Buffet Breakfast'}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-900">+1 000 сом / адам / түн</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block font-light mt-0.5">
                      {lang === 'ky' ? 'Ысык жана улуттук сонун суусундуктар, жемиштер менен кооздолгон таңкы меню.' : 'Gourmet selections of cold/hot tea, fresh pastries, traditional delicacies, and fresh juice.'}
                    </span>
                  </div>
                </label>

                {/* VIP SPA selection */}
                <label className="flex items-start space-x-3.5 p-3 rounded-xl border border-stone-250 hover:border-stone-400 bg-white transition-all cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={spaService}
                    onChange={(e) => setSpaService(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 rounded-sm border-stone-300 accent-amber-800"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-850 uppercase tracking-wide">
                        {lang === 'ky' ? 'СПА жана Термалдык бассейнге чексиз жолума' : 'Unlimited Thermal SPA Access'}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-900">+3 000 сом / жалпы</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block font-light mt-0.5">
                      {lang === 'ky' ? 'Ысык фин саунасы, хамам жана минералдык термал суусу бар бассейн чектелбейт.' : 'Includes premium Finnish sauna, Moroccan Hammam bath, and unlimited thermal outdoor/indoor pool entry.'}
                    </span>
                  </div>
                </label>

                {/* Airport transfer selection */}
                <label className="flex items-start space-x-3.5 p-3 rounded-xl border border-stone-250 hover:border-stone-400 bg-white transition-all cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={transferService}
                    onChange={(e) => setTransferService(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 rounded-sm border-stone-300 accent-amber-800"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-850 uppercase tracking-wide">
                        {lang === 'ky' ? 'Тамчы / Бишкек аэропортунан трансфер аткаруу' : 'Premium Airport Shuttle Service'}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-900">+2 000 сом / унаа</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block font-light mt-0.5">
                      {lang === 'ky' ? 'Аэропорттон тосуп алып, багаж менен отел мейманканасына чейин жайлуу седандык унаа.' : 'Guaranteed private luxury sedan waiting directly outside arrivals to drive you directly to the resort.'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Calculations Summary panel */}
          <div className="md:col-span-2 space-y-5 bg-stone-100 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between h-fit">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest pb-1 border-b border-stone-200">
                {lang === 'ky' ? 'Эсептоо маалыматы' : 'Invoice Statement'}
              </h3>

              {/* Nights count display */}
              <div className="flex justify-between text-xs text-stone-600">
                <span>{lang === 'ky' ? 'Түн саны:' : 'Duration Nights:'}</span>
                <span className="font-mono font-semibold text-stone-900">{nights} {lang === 'ky' ? 'түн' : 'night(s)'}</span>
              </div>

              {/* Room base cost breakdown */}
              <div className="flex justify-between text-xs text-stone-600">
                <span>{lang === 'ky' ? 'Базалык бөлмө баасы:' : 'Room Rate base:'}</span>
                <span className="font-mono text-stone-900">{room.pricePerNight.toLocaleString()} сом / түн</span>
              </div>
              <div className="flex justify-between text-xs text-stone-800 font-medium pl-2">
                <span>└ {lang === 'ky' ? 'Жалпы бөлмө акысы:' : 'Base Room subtotal:'}</span>
                <span className="font-mono text-stone-950">{(room.pricePerNight * nights).toLocaleString()} сом</span>
              </div>

              {/* Extra services details logic listing */}
              {(breakfastService || spaService || transferService) && (
                <div className="border-t border-stone-200/60 pt-3 space-y-1 text-xs">
                  <span className="font-bold text-stone-700 block uppercase text-[10px] tracking-wider">{lang === 'ky' ? 'Тандалган кызматтар:' : 'Extras Chosen:'}</span>
                  {breakfastService && (
                    <div className="flex justify-between pl-2 text-stone-600">
                      <span>• {lang === 'ky' ? 'Эртең менки тамак' : 'Breakfast buffet'}</span>
                      <span className="font-mono">{(1000 * guestsCount * nights).toLocaleString()} сом</span>
                    </div>
                  )}
                  {spaService && (
                    <div className="flex justify-between pl-2 text-stone-600">
                      <span>• {lang === 'ky' ? 'Чексиз СПА' : 'Thermal sauna ticket'}</span>
                      <span className="font-mono">3,000 сом</span>
                    </div>
                  )}
                  {transferService && (
                    <div className="flex justify-between pl-2 text-stone-600">
                      <span>• {lang === 'ky' ? 'Аэропорт унаасы' : 'Luxury sedan transfer'}</span>
                      <span className="font-mono">2,000 сом</span>
                    </div>
                  )}
                </div>
              )}

              {/* Information disclaimer box */}
              <div className="bg-amber-100/50 rounded-lg p-3 border border-amber-200/50 flex items-start space-x-2 text-[10px] text-amber-900">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="font-light leading-relaxed">
                  {lang === 'ky' ? 'Отелде акы төлөө келген учурда накталай же К-Карт аркылуу аткарылат. Алдын ала эч кандай комиссия алынбайт.' : 'Payment is processed in person upon arrival via cash or card. No booking fees or reservation commissions apply.'}
                </p>
              </div>
            </div>

            {/* Large Total Price display and CTA button */}
            <div className="border-t border-stone-200 pt-4 mt-4 space-y-4">
              <div className="flex justify-between items-center bg-[#FAF9F6] p-3 rounded-xl border border-stone-200/80">
                <span className="text-xs font-bold text-stone-700 uppercase">{lang === 'ky' ? 'Жыйынтык баа:' : 'TOTAL AMOUNT:'}</span>
                <span className="text-xl font-black text-amber-900 font-mono">{totalPrice.toLocaleString()} сом</span>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-700 text-stone-100 font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 transform active:scale-95 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{lang === 'ky' ? 'Брондоону Тастыктоо' : 'Confirm & Reserve'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-transparent hover:bg-stone-200/50 text-stone-600 font-semibold py-2 rounded-lg text-xs uppercase tracking-wider transition-all"
                >
                  {lang === 'ky' ? 'Артка кайтуу' : 'Cancel Request'}
                </button>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
