import { Room } from '../types';
import { Users, Maximize, Bed, Eye, CalendarCheck, HelpCircle, Wifi, Tv, Coffee } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  lang: 'ky' | 'en';
  onBook: (room: Room) => void;
  onViewDetails: (room: Room) => void;
}

export default function RoomCard({ room, lang, onBook, onViewDetails }: RoomCardProps) {
  // Mini utility to highlight popular icons
  const renderMiniIcons = (amenity: string) => {
    const norm = amenity.toLowerCase();
    if (norm.includes('wi-fi') || norm.includes('wi fi')) {
      return <Wifi className="h-4 w-4 text-stone-600" title={amenity} />;
    }
    if (norm.includes('tv') || norm.includes('сыналгы')) {
      return <Tv className="h-4 w-4 text-stone-600" title={amenity} />;
    }
    if (norm.includes('кофе') || norm.includes('coffee') || norm.includes('чайнеги') || norm.includes('kettle')) {
      return <Coffee className="h-4 w-4 text-stone-600" title={amenity} />;
    }
    return null;
  };

  return (
    <div className="group bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Room Image Frame */}
      <div className="relative overflow-hidden aspect-[16/10] bg-stone-100">
        <img
          src={room.image}
          alt={lang === 'ky' ? room.name : room.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Price Tag Overlay */}
        <div className="absolute top-4 left-4 bg-[#FAF9F6] border border-stone-200 py-1.5 px-3 rounded-lg shadow-sm">
          <span className="font-mono text-base font-bold text-amber-900 block">
            {room.pricePerNight.toLocaleString()} сом
          </span>
          <span className="text-[10px] uppercase tracking-wider text-stone-600 block text-center font-semibold">
            {lang === 'ky' ? 'түнүнө' : 'per night'}
          </span>
        </div>

        {/* Room View Overlay Tag */}
        <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-xs px-2.5 py-1 rounded-md">
          {lang === 'ky' ? room.view : room.viewEn}
        </div>
      </div>

      {/* Room Details Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 tracking-wider uppercase">
              {room.type === 'presidential' ? 'VIP LUXURY' : room.type.toUpperCase()}
            </span>
            {/* Display size & guest specs */}
            <div className="flex items-center space-x-2 text-stone-600 text-sm">
              <span className="flex items-center space-x-1">
                <Maximize className="h-3.5 w-3.5 text-amber-800" />
                <span className="font-mono">{room.size}м²</span>
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-stone-900 tracking-normal group-hover:text-amber-800 transition-colors">
            {lang === 'ky' ? room.name : room.nameEn}
          </h3>

          <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 font-light">
            {lang === 'ky' ? room.description : room.descriptionEn}
          </p>

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 gap-2 text-xs py-3.5 border-y border-stone-100/80 text-stone-600">
            <span className="flex items-center space-x-1.5">
              <Users className="h-4 w-4 text-amber-800/80" />
              <span>
                {lang === 'ky' ? `Макс. ${room.maxGuests} конок` : `Up to ${room.maxGuests} Guests`}
              </span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Bed className="h-4 w-4 text-amber-800/80" />
              <span className="truncate">
                {lang === 'ky' ? room.bedType : room.bedTypeEn}
              </span>
            </span>
          </div>
        </div>

        <div className="pt-5 space-y-4">
          {/* Preview a couple of available highlights */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-stone-500 uppercase tracking-wider">{lang === 'ky' ? 'Ыңгайлуулуктар:' : 'Amenities:'}</span>
            <div className="flex space-x-2">
              {room.amenities.map((item, idx) => {
                const icon = renderMiniIcons(item);
                if (icon && idx < 4) {
                  return (
                    <div key={idx} className="bg-stone-50 p-1.5 rounded-md border border-stone-200/50">
                      {icon}
                    </div>
                  );
                }
                return null;
              })}
              {/* Default fallback info bubble if no specific ones mapped */}
              <div className="text-xs text-stone-500 font-medium pl-1">
                + {room.amenities.length - 2} {lang === 'ky' ? 'дагы' : 'more'}
              </div>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onViewDetails(room)}
              className="flex items-center justify-center space-x-1.5 border border-stone-300 hover:border-stone-500 text-stone-700 hover:text-stone-900 bg-[#FAF9F6] py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4 text-stone-500" />
              <span>{lang === 'ky' ? 'Толук' : 'Details'}</span>
            </button>
            <button
              onClick={() => onBook(room)}
              className="flex items-center justify-center space-x-1.5 bg-amber-800 hover:bg-amber-700 hover:border-amber-600 border border-transparent text-stone-100 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all transform active:scale-95 shadow-xs hover:shadow-md cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{lang === 'ky' ? 'Брондоо' : 'Reserve'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
