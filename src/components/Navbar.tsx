import { useState } from 'react';
import { Languages, Hotel, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  lang: 'ky' | 'en';
  setLang: (lang: 'ky' | 'en') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingsCount: number;
}

export default function Navbar({ lang, setLang, activeTab, setActiveTab, bookingsCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'ky' ? 'en' : 'ky');
  };

  const navItems = [
    { id: 'home', labelKy: 'Башкы барак', labelEn: 'Home' },
    { id: 'rooms', labelKy: 'Бөлмөлөр', labelEn: 'Rooms' },
    { id: 'amenities', labelKy: 'Ыңгайлуулуктар', labelEn: 'Amenities' },
    { id: 'reviews', labelKy: 'Пикирлер', labelEn: 'Reviews' },
    { id: 'my-bookings', labelKy: 'Менин брондоолорум', labelEn: 'My Bookings' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/90 border-b border-stone-200/80 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-amber-800 text-stone-100 p-2.5 rounded-xl group-hover:bg-amber-700 transition-colors duration-300">
              <Hotel className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-stone-900 block font-heading uppercase">
                Ала-Тоо <span className="text-amber-800">Grand</span>
              </span>
              <span className="text-[10px] tracking-widest text-stone-500 uppercase block">
                {lang === 'ky' ? 'Ысык-Көл Отели' : 'Issyk-Kul Premium Hotel'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'text-amber-800 bg-amber-50/70 font-semibold' 
                    : 'text-stone-600 hover:text-amber-800 hover:bg-stone-100/50'
                }`}
              >
                {item.id === 'my-bookings' ? (
                  <span className="flex items-center space-x-1.5">
                    <span>{lang === 'ky' ? item.labelKy : item.labelEn}</span>
                    {bookingsCount > 0 && (
                      <span className="bg-amber-800 text-stone-100 text-xs px-2 py-0.5 rounded-full font-mono animate-pulse">
                        {bookingsCount}
                      </span>
                    )}
                  </span>
                ) : (
                  lang === 'ky' ? item.labelKy : item.labelEn
                )}
              </button>
            ))}
          </div>

          {/* Right Side Options (Language & Direct Booking View Button) */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-100 border border-stone-200 transition-all duration-200 focus:outline-hidden"
              title={lang === 'ky' ? 'Switch to English' : 'Кыргыз тилине өтүү'}
            >
              <Languages className="h-4 w-4 text-amber-800" />
              <span>{lang === 'ky' ? 'EN' : 'KY'}</span>
            </button>

            {/* Book Now Button trigger rooms search */}
            <button
              onClick={() => setActiveTab('rooms')}
              className="hidden sm:flex items-center space-x-2 bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md uppercase tracking-wider transition-all duration-300 transform active:scale-95"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{lang === 'ky' ? 'Бөлмө Тандоо' : 'Book a Room'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-stone-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'text-amber-800 bg-amber-50 font-bold' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.id === 'my-bookings' ? (
                  <div className="flex justify-between items-center">
                    <span>{lang === 'ky' ? item.labelKy : item.labelEn}</span>
                    {bookingsCount > 0 && (
                      <span className="bg-amber-800 text-stone-100 text-xs px-2 py-0.5 rounded-full font-mono">
                        {bookingsCount}
                      </span>
                    )}
                  </div>
                ) : (
                  lang === 'ky' ? item.labelKy : item.labelEn
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('rooms');
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full flex justify-center items-center space-x-2 bg-amber-800 text-white font-medium py-3 rounded-lg shadow-sm"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{lang === 'ky' ? 'Азыр Брондоо' : 'Book a Room Now'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
