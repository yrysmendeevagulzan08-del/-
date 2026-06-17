import { useState, useEffect } from 'react';
import { Room } from '../types';
import { X, Check, Users, Maximize, Bed, Compass, CalendarCheck, ShieldCheck, Heart } from 'lucide-react';

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (room: Room) => void;
  lang: 'ky' | 'en';
}

export default function RoomDetailsModal({ room, isOpen, onClose, onBookNow, lang }: RoomDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Close modal on escape keypress
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF9F6] border border-stone-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-900/60 hover:bg-stone-900 text-stone-100 p-2.5 rounded-full shadow-md focus:outline-hidden transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Main Visual Carousel */}
          <div className="relative h-[250px] sm:h-[350px] bg-stone-100">
            <img
              src={room.images[activeImageIndex]}
              alt={lang === 'ky' ? room.name : room.nameEn}
              className="w-full h-full object-cover"
            />
            {/* Dark bottom shadow for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent" />
            
            {/* Info overlay inside visual header */}
            <div className="absolute bottom-6 left-6 text-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-900 px-2.5 py-1 rounded-sm">
                {room.type === 'presidential' ? 'VIP LUXURY' : room.type.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 font-heading">
                {lang === 'ky' ? room.name : room.nameEn}
              </h2>
            </div>
          </div>

          {/* Minor carousel thumbnail indicators */}
          <div className="bg-stone-100 p-3 flex gap-3 border-b border-stone-200">
            {room.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === i ? 'border-amber-800 scale-95 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Detailed Specifications */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick spec cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-stone-200/60">
              <div className="bg-white border border-stone-200/80 p-3.5 rounded-xl text-center">
                <Maximize className="h-5 w-5 text-amber-850 mx-auto mb-1 stroke-[1.5]" />
                <span className="text-[10px] text-stone-500 uppercase block tracking-wider">{lang === 'ky' ? 'Бөлмө аянты' : 'Room Size'}</span>
                <span className="text-sm font-bold text-stone-900 font-mono">{room.size} м²</span>
              </div>
              <div className="bg-white border border-stone-200/80 p-3.5 rounded-xl text-center">
                <Users className="h-5 w-5 text-amber-850 mx-auto mb-1 stroke-[1.5]" />
                <span className="text-[10px] text-stone-500 uppercase block tracking-wider">{lang === 'ky' ? 'Жайгаштыруу' : 'Capacity'}</span>
                <span className="text-sm font-bold text-stone-900 font-sans">{lang === 'ky' ? `макс. ${room.maxGuests} конок` : `max. ${room.maxGuests} guests`}</span>
              </div>
              <div className="bg-white border border-stone-200/80 p-3.5 rounded-xl text-center">
                <Bed className="h-5 w-5 text-amber-850 mx-auto mb-1 stroke-[1.5]" />
                <span className="text-[10px] text-stone-500 uppercase block tracking-wider">{lang === 'ky' ? 'Керебет' : 'Bed Type'}</span>
                <span className="text-sm font-bold text-stone-900 truncate block">{lang === 'ky' ? room.bedType : room.bedTypeEn}</span>
              </div>
              <div className="bg-white border border-stone-200/80 p-3.5 rounded-xl text-center">
                <Compass className="h-5 w-5 text-amber-850 mx-auto mb-1 stroke-[1.5]" />
                <span className="text-[10px] text-stone-500 uppercase block tracking-wider">{lang === 'ky' ? 'Көрүнүшү' : 'Room View'}</span>
                <span className="text-sm font-bold text-stone-900 block truncate">{lang === 'ky' ? room.view : room.viewEn}</span>
              </div>
            </div>

            {/* Content & Left-Right split of text vs amenities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left description */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">{lang === 'ky' ? 'Бөлмөнүн сүрөттөлүшү' : 'About Room'}</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  {lang === 'ky' ? room.description : room.descriptionEn}
                </p>

                {/* Policies & guidelines notes */}
                <div className="bg-stone-100 rounded-xl p-4 border border-stone-200/65 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center space-x-1.5 font-bold text-stone-700">
                    <ShieldCheck className="h-4 w-4 text-amber-800" />
                    <span>{lang === 'ky' ? 'Отелде жайгашуу шарттары' : 'Hotel Stay Policies'}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>{lang === 'ky' ? 'Кабыл алуу убактысы (Check-in): саат 14:00 кечкисин.' : 'Check-in priority: starting from 14:00 PM onwards.'}</li>
                    <li>{lang === 'ky' ? 'Аттануу убактысы (Check-out): саат 12:00 чак түштө.' : 'Check-out schedule: until 12:00 PM noon.'}</li>
                    <li>{lang === 'ky' ? 'Отелде жана бөлмөлөрдүн ичинде чылым чегүүгө тыюу салынат.' : 'Smoking inside any bedroom is explicitly prohibited.'}</li>
                  </ul>
                </div>
              </div>

              {/* Right list of all amenities */}
              <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-200/80">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">{lang === 'ky' ? 'Бардык ыңгайлуулуктар' : 'Room Amenities'}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {(lang === 'ky' ? room.amenities : room.amenitiesEn).map((amen, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700">
                      <div className="bg-amber-100 rounded-full p-0.5 mt-0.5">
                        <Check className="h-3 w-3 text-amber-850" />
                      </div>
                      <span className="font-light">{amen}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom package inclusions bottom banner */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/50 flex flex-wrap justify-between items-center gap-4">
              <div className="text-xs">
                <span className="font-bold text-amber-900 block uppercase tracking-wider mb-1">{lang === 'ky' ? 'Бул Брондоодо камтылган:' : 'Package Inclusions:'}</span>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'ky' ? room.features : room.featuresEn).map((feat, i) => (
                    <span key={i} className="bg-amber-100/50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium text-[10px]">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Dynamic Pricing Actions Footer */}
        <div className="bg-white border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-stone-500 uppercase tracking-widest block font-sans">{lang === 'ky' ? 'Жалпы баа' : 'Price per Night'}</span>
            <div className="flex items-center space-x-1 justify-center sm:justify-start">
              <span className="text-2xl font-black text-amber-900 font-mono">{(room.pricePerNight).toLocaleString()} сом</span>
              <span className="text-xs text-stone-500"> / {lang === 'ky' ? 'бир түн' : 'night'}</span>
            </div>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-300 px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {lang === 'ky' ? 'Жабуу' : 'Close'}
            </button>
            <button
              onClick={() => {
                onBookNow(room);
                onClose();
              }}
              className="flex-1 sm:flex-initial bg-amber-800 hover:bg-amber-700 text-stone-100 px-7 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{lang === 'ky' ? 'Азыр брондоо' : 'Reserve Room'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
