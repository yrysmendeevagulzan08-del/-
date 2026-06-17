import { useState } from 'react';
import { Calendar, Users, Briefcase, ChevronRight, Award, ShieldCheck, Landmark } from 'lucide-react';

interface HeroProps {
  lang: 'ky' | 'en';
  onSearch: (filters: { checkIn: string; checkOut: string; guests: number; type: string }) => void;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ lang, onSearch, setActiveTab }: HeroProps) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, type: roomType });
    setActiveTab('rooms');
    
    // Smooth scroll to rooms catalog if available
    setTimeout(() => {
      const element = document.getElementById('catalog-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="relative">
      {/* Background Frame with elegant geometric details */}
      <div className="relative h-[560px] md:h-[650px] flex items-center bg-stone-900 overflow-hidden">
        {/* Background Image with a rich vignette overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
            alt="Ala-Too Grand Luxury Hotel"
            className="w-full h-full object-cover object-center opacity-65 scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/80 via-stone-900/60 to-stone-900/20" />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-90" />
        </div>

        {/* Content Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-stone-100">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-800/20 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <Award className="h-4 w-4 stroke-[2]" />
              <span>{lang === 'ky' ? 'Премиум эс алуу 2026' : 'Premium Vacation 2026'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase font-heading">
              {lang === 'ky' ? (
                <>
                  Ысык-Көлдүн Жүрөгүндөгү <br />
                  <span className="text-amber-400">Бейпил Эс Алуу</span>
                </>
              ) : (
                <>
                  Serene Sanctuary in <br />
                  The Heart of <span className="text-amber-400">Issyk-Kul</span>
                </>
              )}
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              {lang === 'ky' ? (
                'Ала-Тоо Grand отелинен улуу тоолордун кучагындагы көгүлтүр көл көрүнүшүн, өзгөчө люкс деңгээлдеги меймандостукту жана унутулгус эс алуу учурларын табыңыз.'
              ) : (
                'Discover majestic water shore hospitality nested between perpetual snowy peaks and the deep azure waters. Experience true luxury defined by pristine nature and timeless service.'
              )}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setActiveTab('rooms')}
                className="bg-amber-700 hover:bg-amber-600 text-white font-medium px-6 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-95 shadow-lg shadow-amber-900/20 flex items-center space-x-2"
              >
                <span>{lang === 'ky' ? 'Бөлмөлөрдү көрүү' : 'View Our Rooms'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab('amenities')}
                className="bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 font-medium px-6 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all duration-300"
              >
                {lang === 'ky' ? 'Отелдин мүмкүнчүлүктөрү' : 'Hotel Exploration'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Search panel floating above hero background */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 z-20">
        <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-stone-950/20">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Check In Date */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-2">
                <Calendar className="h-3.5 w-3.5 text-amber-800" />
                <span>{lang === 'ky' ? 'Келүү күнү' : 'Check-In'}</span>
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                    setCheckOut(nextDay);
                  }
                }}
                className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-3.5 py-3 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 transition-colors"
                required
              />
            </div>

            {/* Check Out Date */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-2">
                <Calendar className="h-3.5 w-3.5 text-amber-800" />
                <span>{lang === 'ky' ? 'Кетүү күнү' : 'Check-Out'}</span>
              </label>
              <input
                type="date"
                min={checkIn || tomorrow}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-3.5 py-3 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 transition-colors"
                required
              />
            </div>

            {/* Guests Number */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-2">
                <Users className="h-3.5 w-3.5 text-amber-800" />
                <span>{lang === 'ky' ? 'Конок саны' : 'Guests'}</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-3.5 py-3 text-sm text-stone-800 focus:outline-hidden focus:border-amber-800 transition-colors"
              >
                <option value={1}>{lang === 'ky' ? '1 адам' : '1 Guest'}</option>
                <option value={2}>{lang === 'ky' ? '2 адам' : '2 Guests'}</option>
                <option value={3}>{lang === 'ky' ? '3 адам' : '3 Guests'}</option>
                <option value={4}>{lang === 'ky' ? '4 адам' : '4 Guests'}</option>
                <option value={5}>{lang === 'ky' ? '5+ адам' : '5+ Guests'}</option>
              </select>
            </div>

            {/* Submit button */}
            <div className="flex items-end justify-center md:justify-start">
              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-700 text-stone-100 font-semibold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 focus:outline-hidden cursor-pointer"
              >
                <Briefcase className="h-4 w-4" />
                <span>{lang === 'ky' ? 'Бөлмө издөө' : 'Find Rooms'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mini-features belt below search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-4 flex flex-col items-center space-y-2 border border-stone-200/50 rounded-xl bg-[#FAF9F6]/30">
          <ShieldCheck className="h-8 w-8 text-amber-800 mb-1 stroke-[1.25]" />
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">{lang === 'ky' ? '100% Акысыз Жокко чыгаруу' : 'Flexible Booking Cancellation'}</h3>
          <p className="text-xs text-stone-600">{lang === 'ky' ? 'Келишиңизге 48 саат калганга чейин акысыз жокко чыгаруу мүмкүнчүлүгү.' : 'Check-ins can be canceled free of charge up to 48 hours in advance.'}</p>
        </div>
        <div className="p-4 flex flex-col items-center space-y-2 border border-stone-200/50 rounded-xl bg-[#FAF9F6]/30">
          <Landmark className="h-8 w-8 text-amber-800 mb-1 stroke-[1.25]" />
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">{lang === 'ky' ? 'Деңиз Деңгээлинде' : 'Lakefront Location'}</h3>
          <p className="text-xs text-stone-600">{lang === 'ky' ? 'Көл жээгин утурлаган, табигый кумдуу таза пляжда жайгашкан.' : 'Direct beachfront resort nestled tightly beside clean sandy shores.'}</p>
        </div>
        <div className="p-4 flex flex-col items-center space-y-2 border border-stone-200/50 rounded-xl bg-[#FAF9F6]/30">
          <Award className="h-8 w-8 text-amber-800 mb-1 stroke-[1.25]" />
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">{lang === 'ky' ? 'Премиум Спа & Бассейн' : 'Unbounded Wellness'}</h3>
          <p className="text-xs text-stone-600">{lang === 'ky' ? 'Жаратылыш койнундагы жылуу минералдык бассейндер жана спа.' : 'Unlimited, rich mineral hot basins, thermal spa therapies, and expert wellness.'}</p>
        </div>
      </div>
    </div>
  );
}
