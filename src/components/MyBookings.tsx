import { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Trash2, ShieldAlert, Award, FileText, Check, Printer, X, Download, Tag } from 'lucide-react';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  lang: 'ky' | 'en';
  setActiveTab: (tab: string) => void;
}

export default function MyBookings({ bookings, onCancelBooking, lang, setActiveTab }: MyBookingsProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ky' ? 'ky-KG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNightsCount = (checkIn: string, checkOut: string) => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24)) || 1;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading uppercase">
            {lang === 'ky' ? 'Менин Брондоолорум' : 'My Travel Bookings'}
          </h2>
          <p className="text-stone-500 font-light text-sm mt-1 leading-relaxed">
            {lang === 'ky' 
              ? 'Сиз тандаган жайлуу бөлмөлөрдүн жана алынган кызматтардын тизмеси. Бул жерден брондоолорду жокко чыгарып же дүмүрчөк алсаңыз болот.' 
              : 'View status lists of reserved rooms or luxurious packages. Access printable billing sheets and invoices below.'}
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 space-y-5 shadow-xs">
            <div className="bg-amber-100/70 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-amber-800">
              <Calendar className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-stone-850">
                {lang === 'ky' ? 'Азырынча эч кандай брондоо жок' : 'No Current Bookings Found'}
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {lang === 'ky' 
                  ? 'Азыр биздин заманбап жана жогорку сапаттагы бөлмөлөрүбүздү карап көрүп, Ысык-Көлдөгү кооз эс алууңузду пландаштырыңыз!'
                  : 'Your dashboard is fresh and clean. Explore outstanding, premium rooms to reserve your upcoming stay.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('rooms')}
              className="mt-2 bg-amber-800 hover:bg-amber-700 text-stone-100 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {lang === 'ky' ? 'Бөлмөлөрдү Издөө' : 'Explore Hotels and Rooms'}
            </button>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-5">
            {bookings.map((b) => {
              const nightsCount = calculateNightsCount(b.checkIn, b.checkOut);
              const isCancelled = b.status === 'cancelled';

              return (
                <div 
                  key={b.id} 
                  className={`border rounded-xl p-5 sm:p-6 bg-white transition-all shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                    isCancelled ? 'border-stone-200 opacity-65 bg-stone-50/70' : 'border-amber-200/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-3.5 flex-1 w-full">
                    {/* Badge and ID headers */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 border border-stone-200/60 px-2 py-0.5 rounded-sm">
                        ID: {b.id}
                      </span>
                      {isCancelled ? (
                        <span className="bg-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {lang === 'ky' ? 'Жокко Чыгарылды' : 'Cancelled'}
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" />
                          <span>{lang === 'ky' ? 'Тастыкталды' : 'Confirmed'}</span>
                        </span>
                      )}
                      
                      <span className="text-xs text-stone-400 font-light font-mono ml-auto sm:ml-0">
                        {lang === 'ky' ? `Күнү: ${formatDate(b.bookingDate)}` : `Booked: ${formatDate(b.bookingDate)}`}
                      </span>
                    </div>

                    {/* Room title & Booking Specs */}
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        {b.roomName}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-stone-600 mt-2 font-light">
                        <div>
                          <strong className="font-semibold text-stone-700">{lang === 'ky' ? 'Конок аты:' : 'Guest:'}</strong> {b.guestName}
                        </div>
                        <div>
                          <strong className="font-semibold text-stone-700">{lang === 'ky' ? 'Телефон:' : 'Phone:'}</strong> {b.guestPhone}
                        </div>
                        <div>
                          <strong className="font-semibold text-stone-700">{lang === 'ky' ? 'Конок саны:' : 'People:'}</strong> {b.guestsCount} адам
                        </div>
                      </div>
                    </div>

                    {/* Check In / Check Out Grid Segment */}
                    <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-lg grid grid-cols-2 gap-4 text-xs font-light text-stone-700">
                      <div>
                        <span className="text-[10px] uppercase text-stone-500 block font-bold">{lang === 'ky' ? 'Келүү күнү' : 'Check-In'}</span>
                        <span className="font-medium text-stone-900">{formatDate(b.checkIn)}</span>
                      </div>
                      <div className="border-l border-stone-205 pl-4">
                        <span className="text-[10px] uppercase text-stone-500 block font-bold">{lang === 'ky' ? 'Кетүү күнү' : 'Check-Out'}</span>
                        <span className="font-medium text-stone-900">{formatDate(b.checkOut)} <span className="font-mono text-amber-800">({nightsCount} түн)</span></span>
                      </div>
                    </div>

                    {/* Premium services toggles summarized */}
                    {(b.additionalServices.spa || b.additionalServices.breakfast || b.additionalServices.transfer) && (
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] text-stone-500 uppercase font-black mr-1">{lang === 'ky' ? 'Шарттар:' : 'Extras:'}</span>
                        {b.additionalServices.breakfast && (
                          <span className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded-md text-[10px] border border-amber-200/50">
                            {lang === 'ky' ? '✓ Эртең мененки тамак' : '✓ Breakfast Buffet'}
                          </span>
                        )}
                        {b.additionalServices.spa && (
                          <span className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded-md text-[10px] border border-amber-200/50">
                            {lang === 'ky' ? '✓ СПА талон' : '✓ Unlimited SPA'}
                          </span>
                        )}
                        {b.additionalServices.transfer && (
                          <span className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded-md text-[10px] border border-amber-200/50">
                            {lang === 'ky' ? '✓ Трансфер унаасы' : '✓ Airport Transfer'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Pricing Segment & CTAs */}
                  <div className="flex flex-col items-center sm:items-end gap-3 w-full md:w-auto border-t md:border-t-0 border-stone-100 md:pt-0 pt-4">
                    <div className="text-center md:text-right">
                      <span className="text-[10px] text-stone-500 block uppercase tracking-widest">{lang === 'ky' ? 'Баасы' : 'Total Invoice'}</span>
                      <span className="text-xl font-mono font-black text-amber-900">{b.totalPrice.toLocaleString()} сом</span>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedReceipt(b)}
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-1 border border-stone-305 hover:border-stone-505 bg-white text-stone-704 py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <FileText className="h-4 w-4 text-stone-500" />
                        <span>{lang === 'ky' ? 'Дүмүрчөк' : 'Receipt'}</span>
                      </button>

                      {!isCancelled && (
                        <button
                          onClick={() => {
                            if (window.confirm(lang === 'ky' ? 'Бул брондоону чын эле жокко чыгарууну каалайсызбы?' : 'Are you sure you want to cancel this booking?')) {
                              onCancelBooking(b.id);
                            }
                          }}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:shadow-xs cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>{lang === 'ky' ? 'Жокко салуу' : 'Cancel'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Invoice Receipt Modal Screen Overlay */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setSelectedReceipt(null)} className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" />
          
          <div className="relative bg-white border border-stone-300 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 space-y-6 flex flex-col justify-between max-h-[92vh]">
            
            {/* Action headers */}
            <div className="flex justify-between items-center pb-4 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <div className="bg-amber-800 text-stone-100 p-1.5 rounded-md">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-950 uppercase tracking-widest leading-none">ALA-TOO GRAND HOTEL</h3>
                  <span className="text-[10px] uppercase text-stone-500 font-light font-mono">Receipt statement / Дүмүрчөк</span>
                </div>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-stone-500 hover:text-stone-900 p-1 rounded-full hover:bg-stone-50 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Receipt Main Frame for pristine presentation */}
            <div className="space-y-6 overflow-y-auto flex-1 font-sans">
              
              {/* Receipt metadata grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-light text-stone-600">
                <div>
                  <span className="font-bold text-stone-800 block uppercase tracking-wider text-[10px] mb-1">{lang === 'ky' ? 'Отел дареги:' : 'Issuing Location:'}</span>
                  <p>Ала-Тоо Grand Мейманканасы</p>
                  <p>Ысык-Көл облусу, Чолпон-Ата ш.</p>
                  <p>Кара-Ой көчөсү, 42</p>
                  <p>тел: +996 (3943) 4-56-78</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-stone-800 block uppercase tracking-wider text-[10px] mb-1">{lang === 'ky' ? 'Брондоо Күбөлүгү:' : 'Statement Specs:'}</span>
                  <p><strong className="font-semibold text-stone-850">Дүмүрчөк #:</strong> {selectedReceipt.id}</p>
                  <p><strong className="font-semibold text-stone-850">Күнү:</strong> {formatDate(selectedReceipt.bookingDate)}</p>
                  <p><strong className="font-semibold text-stone-850">Каралуу Абалы:</strong> <span className={selectedReceipt.status === 'cancelled' ? 'text-red-650' : 'text-emerald-700 font-bold'}>{selectedReceipt.status.toUpperCase()}</span></p>
                </div>
              </div>

              {/* Guest specifications box */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs">
                <span className="font-bold text-stone-800 uppercase block tracking-wider text-[10px] mb-2">{lang === 'ky' ? 'Конок маалыматы:' : 'Guest Details:'}</span>
                <div className="grid grid-cols-2 gap-2 text-stone-650 font-light">
                  <p><strong>{lang === 'ky' ? 'Коноктун аты:' : 'Guest Name:'}</strong> {selectedReceipt.guestName}</p>
                  <p><strong>{lang === 'ky' ? 'Телефон:' : 'Phone No:'}</strong> {selectedReceipt.guestPhone}</p>
                  <p><strong>{lang === 'ky' ? 'Почтасы:' : 'Email:'}</strong> {selectedReceipt.guestEmail}</p>
                  <p><strong>{lang === 'ky' ? 'Жалпы келген адам:' : 'Total Occupants:'}</strong> {selectedReceipt.guestsCount} адам</p>
                </div>
              </div>

              {/* Line items billing ledger table */}
              <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
                <div className="bg-stone-50 border-b border-stone-200 p-2.5 grid grid-cols-4 font-bold text-stone-800 uppercase text-[10px] tracking-wider">
                  <div className="col-span-2">{lang === 'ky' ? 'Кызмат сүрөттөлүшү' : 'Stay Details'}</div>
                  <div className="text-center">{lang === 'ky' ? 'Мурунку чен' : 'Rate parameters'}</div>
                  <div className="text-right">{lang === 'ky' ? 'Баасы' : 'Subtotal Som'}</div>
                </div>

                {/* Subtotal row of Room nights */}
                <div className="p-3 grid grid-cols-4 border-b border-stone-105 font-light text-stone-705">
                  <div className="col-span-2">
                    <p className="font-medium text-stone-900">{selectedReceipt.roomName}</p>
                    <p className="text-[10px] text-stone-500 font-light">{formatDate(selectedReceipt.checkIn)} — {formatDate(selectedReceipt.checkOut)}</p>
                  </div>
                  <div className="text-center font-mono text-stone-600">
                    {calculateNightsCount(selectedReceipt.checkIn, selectedReceipt.checkOut)} {lang === 'ky' ? 'түн' : 'night(s)'}
                  </div>
                  <div className="text-right font-mono text-stone-900">
                    {(selectedReceipt.totalPrice - (selectedReceipt.additionalServices.spa ? 3000 : 0) - (selectedReceipt.additionalServices.transfer ? 2000 : 0) - (selectedReceipt.additionalServices.breakfast ? 1000 * selectedReceipt.guestsCount * calculateNightsCount(selectedReceipt.checkIn, selectedReceipt.checkOut) : 0)).toLocaleString()} сом
                  </div>
                </div>

                {/* Extras row items conditionally mapped */}
                {selectedReceipt.additionalServices.breakfast && (
                  <div className="p-3 grid grid-cols-4 border-b border-stone-105 text-stone-705 font-light">
                    <div className="col-span-2">
                      <p className="font-medium text-stone-900">{lang === 'ky' ? 'Швед үстөлүнөн Эртең мененки тамак' : 'Buffet Breakfast Selection'}</p>
                      <p className="text-[10px] text-stone-500">{selectedReceipt.guestsCount} {lang === 'ky' ? 'адама' : 'person(s)'} * {calculateNightsCount(selectedReceipt.checkIn, selectedReceipt.checkOut)} {lang === 'ky' ? 'түн' : 'night(s)'}</p>
                    </div>
                    <div className="text-center font-mono">1 000 сом</div>
                    <div className="text-right font-mono">{(1000 * selectedReceipt.guestsCount * calculateNightsCount(selectedReceipt.checkIn, selectedReceipt.checkOut)).toLocaleString()} сом</div>
                  </div>
                )}

                {selectedReceipt.additionalServices.spa && (
                  <div className="p-3 grid grid-cols-4 border-b border-stone-105 text-stone-750 font-light font-sans">
                    <div className="col-span-2">
                      <p className="font-medium text-stone-900">{lang === 'ky' ? 'СПА жана Сауна термалдык бассейнге чексиз уруксат' : 'Luxury Thermal Spa Pass'}</p>
                      <p className="text-[10px] text-stone-500">Бир жолу төлөнүүчү флэт тариф</p>
                    </div>
                    <div className="text-center font-mono">3 000 сом</div>
                    <div className="text-right font-mono">3,000 сом</div>
                  </div>
                )}

                {selectedReceipt.additionalServices.transfer && (
                  <div className="p-3 grid grid-cols-4 text-stone-750 font-light">
                    <div className="col-span-2">
                      <p className="font-medium text-stone-900">{lang === 'ky' ? 'Автотранспорттук аэропорт кызматы (Люкс седан)' : 'Airport private shuttle pickup'}</p>
                      <p className="text-[10px] text-stone-400">Бир тарапка тосуп алуу</p>
                    </div>
                    <div className="text-center font-mono">2 000 сом</div>
                    <div className="text-right font-mono">2,000 сом</div>
                  </div>
                )}
              </div>

              {/* Grand Total banner inside receipt */}
              <div className="bg-stone-100 p-4 rounded-lg flex justify-between items-center text-stone-900 font-sans border border-stone-200">
                <span className="text-xs font-bold uppercase tracking-widest">{lang === 'ky' ? 'Жалпы төлөм:' : 'GRAND BILLING AMOUNT:'}</span>
                <span className="text-lg font-mono font-black text-amber-900">{selectedReceipt.totalPrice.toLocaleString()} сом</span>
              </div>

              {/* Footer policy signature */}
              <div className="text-[10px] text-stone-500 font-light space-y-1 mt-6 pt-4 border-t border-dashed border-stone-200">
                <p>• {lang === 'ky' ? 'Баалар КНСти камтыйт.' : 'All billing statements include domestic commercial taxes.'}</p>
                <p>• {lang === 'ky' ? 'Төлөө мейманканага кирип жатканда кассада аткарылат.' : 'Payment completes physically at reception counter upon check-in.'}</p>
              </div>

            </div>

            {/* Interaction Buttons footer */}
            <div className="border-t border-stone-200 pt-4 flex gap-3">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lang === 'ky' ? 'Артка' : 'Close'}
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-amber-850 hover:bg-amber-800 text-stone-100 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>{lang === 'ky' ? 'Басып чыгаруу' : 'Print Invoice'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
