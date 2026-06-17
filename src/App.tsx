import { useState, useEffect } from 'react';
import { Room, Booking, Review } from './types';
import { ROOMS_DATA, REVIEWS_DATA } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import RoomDetailsModal from './components/RoomDetailsModal';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Amenities from './components/Amenities';
import Reviews from './components/Reviews';

import { 
  MapPin, Phone, Mail, Clock, Sparkles, Star, CheckCircle, 
  ArrowRight, ShieldCheck, HelpCircle, Gift, ChevronRight 
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'ky' | 'en'>('ky');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [priceFilter, setPriceFilter] = useState<number>(30000);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Load bookings and reviews from localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('alatoo_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('alatoo_reviews');
      return saved ? JSON.parse(saved) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('alatoo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('alatoo_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Modal / Wizard Booking states
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<Room | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const [congratsBooking, setCongratsBooking] = useState<Booking | null>(null);

  // Search filter options from Hero
  const [searchFilters, setSearchFilters] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    type: 'all'
  });

  const handleSearch = (filters: { checkIn: string; checkOut: string; guests: number; type: string }) => {
    setSearchFilters(filters);
    if (filters.type !== 'all') {
      setTypeFilter(filters.type);
    }
  };

  // Add / Cancel Booking events
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setCongratsBooking(newBooking);
    
    // Auto transition to My Bookings tab
    setTimeout(() => {
      setActiveTab('my-bookings');
    }, 1500);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [...prev, newReview]);
  };

  // Filtered rooms based on selector tabs
  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (typeFilter !== 'all' && room.type !== typeFilter) return false;
    if (room.pricePerNight > priceFilter) return false;
    if (searchFilters.guests > room.maxGuests) return false;
    return true;
  });

  const handleViewDetails = (room: Room) => {
    setSelectedRoomForDetails(room);
    setDetailsModalOpen(true);
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoomForBooking(room);
    setBookingFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-amber-100 selection:text-amber-900 antialiased flex flex-col justify-between">
      
      {/* Dynamic Global Notification banner */}
      <div className="bg-amber-800 text-stone-100 text-xs py-2 px-4 text-center tracking-wider font-semibold uppercase flex justify-center items-center space-x-2">
        <Sparkles className="h-4 w-4 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
        <span>
          {lang === 'ky' 
            ? 'Ысык-Көл кучагынан ажайып эс алуу! Азыр брондоп, СПА центрине 10% арзандатуу сунушун алыңыз.' 
            : 'Escape to Lake Issyk-Kul Beach shores! Book now for premium 10% SPA packages.'}
        </span>
      </div>

      {/* Styled Header with active tabs tracking */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingsCount={bookings.filter(b => b.status === 'confirmed').length}
      />

      {/* Main Structural Switching frame */}
      <main className="flex-1">
        
        {/* TAB 1: HOME (LANDING PAGE OVERVIEW WITH COMPREHENSIVE SECTIONS) */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300 space-y-16">
            
            {/* Elegant luxury Hero section */}
            <Hero 
              lang={lang} 
              onSearch={handleSearch} 
              setActiveTab={setActiveTab} 
            />

            {/* Teaser Highlight: Chosen Luxury Rooms Category */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-stone-200 pb-5 mb-8">
                <div>
                  <span className="text-[10px] text-amber-850 uppercase font-black tracking-widest block mb-1">
                    {lang === 'ky' ? 'Премиум деңгээлдеги бөлмөлөрүбүз' : 'COZY EXCLUSIVITY'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 uppercase font-heading">
                    {lang === 'ky' ? 'Өзгөчө Кооз Бөлмөлөр' : 'Aesthetic Rooms & Suites'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setTypeFilter('all');
                    setActiveTab('rooms');
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-700 flex items-center space-x-1 cursor-pointer group"
                >
                  <span>{lang === 'ky' ? 'Бардык бөлмөлөрдү көрүү' : 'Browse All Accommodations'}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

              {/* Display first 3 top rooms as elegant previews */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {ROOMS_DATA.slice(0, 3).map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    lang={lang}
                    onBook={handleBookRoom}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </section>

            {/* Exclusive In-hotel Packages & Offers */}
            <section className="bg-stone-900 border-y border-stone-850 py-16 text-stone-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-amber-800/20 border border-amber-600/30 text-amber-400 font-mono text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full w-fit">
                    {lang === 'ky' ? 'УЛУТТУК СЫЙМЫК' : 'LOCAL HERITAGE & FOOD'}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-tight font-heading leading-tight">
                    {lang === 'ky' ? 'Көк-Тай лаунж рестораны' : 'Kok-Tai Dining Experience'}
                  </h3>
                  <p className="text-stone-300 font-light text-sm leading-relaxed">
                    {lang === 'ky'
                      ? 'Отелибиздин ресторанында заманбап улуттук кыргыз баалуулуктарын камтыган, жаңы бышырылган боорсоктордон баштап, Ысык-Көлдүн нукура балыгынан даярдалган ажайып деликатестерди татып көрүңүз.'
                      : 'Indulge in authentic traditional tastes updated with five-star global finesse. Sample fresh alpine trout, local flatbread pastries, and wild-harvested herbs beside the waves.'}
                  </p>
                  <ul className="text-stone-400 text-xs space-y-2 pt-2">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>{lang === 'ky' ? 'Баардык бөлмөлөр үчүн эртең мененки тамак акысыз' : 'Complimentary warm traditional breakfast for room stays.'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>{lang === 'ky' ? 'Көл жээгинде ачык террасада кечки жандуу музыка' : 'Live local acoustic lakeside music under pristine twilight.'}</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden h-60 relative group border border-stone-800">
                    <img 
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" 
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'ky' ? 'Улуттук меню' : 'Traditional cuisine'}</h4>
                      <p className="text-[11px] text-stone-300 font-light mt-1">{lang === 'ky' ? 'Токмок, нукура казы-карта жана бешбармак' : 'Locally sourced mountains meats & signature stews.'}</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden h-60 relative group border border-stone-800">
                    <img 
                      src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" 
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'ky' ? 'СПА эс алуусу' : 'Thermal Hot Sauna'}</h4>
                      <p className="text-[11px] text-stone-300 font-light mt-1">{lang === 'ky' ? 'Суу жээгиндеги ысык дарылык бассейндер' : 'Steam detox and warm mineral salt basins.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Location Guideline Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
                
                {/* Text guide */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-amber-850 uppercase font-black tracking-widest block mb-1">
                      {lang === 'ky' ? 'Биз кайсы жердебиз?' : 'HOTEL LOCATION'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading uppercase">
                      {lang === 'ky' ? 'Байланыш маалыматтары' : 'Directions & Address'}
                    </h2>
                    <div className="w-12 h-1 bg-amber-800 rounded-full mt-3" />
                  </div>

                  <p className="text-stone-650 text-sm font-light leading-relaxed">
                    {lang === 'ky' 
                      ? 'Ала-Тоо Grand отели Чолпон-Ата шаарынын эң кооз, кумдак деңиз жээгинде жайгашкан. Бул жерде сиз тоонун таңкы таза абасынан жутуп, көлдүн толкун добушун уга аласыз.' 
                      : 'Located in Cholpon-Ata city on the prestigious northern shore. Ala-Too Grand provides a private sandy paradise framed by absolute ecological security, clean alpine forests, and breathtaking water views.'}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3.5 text-xs text-stone-700">
                      <MapPin className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block text-stone-850">{lang === 'ky' ? 'Дарегибиз' : 'Our Address'}</strong>
                        <span className="font-light">{lang === 'ky' ? 'Кыргызстан, Ысык-Көл облусу, Чолпон-Ата ш., Кара-Ой көчөсү, 42' : '42 Kara-Oy Street, Cholpon-Ata, Lake Issyk-Kul Region, Kyrgyzstan'}</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 text-xs text-stone-700">
                      <Phone className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block text-stone-850">{lang === 'ky' ? 'Брондоо телефондору' : 'Hotline Desk'}</strong>
                        <span className="font-mono font-light">+996 (3943) 4-56-78, +996 (770) 55-00-11</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 text-xs text-stone-700">
                      <Mail className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block text-stone-850">Email</strong>
                        <span className="font-light">booking@alatoo-grand.kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Visual Google Map styling */}
                <div className="relative h-[280px] sm:h-[350px] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 group">
                  <div className="absolute inset-0 bg-stone-200 flex flex-col items-center justify-center p-6 text-center text-stone-700 font-sans z-10 transition-colors group-hover:bg-stone-150">
                    <div className="bg-amber-100 p-3 rounded-full text-amber-850 mb-3.5 shadow-xs">
                      <MapPin className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">{lang === 'ky' ? 'Ысык-Көлдүн биринчи жээгиндеги карта' : 'Waterfront Sandy Google Map'}</h4>
                    <p className="text-xs text-stone-550 font-light max-w-sm mt-1 leading-relaxed">
                      {lang === 'ky' 
                        ? 'Биздин пляжга түз жол, Чолпон-Ата автовокзалынан 10 мүнөттүк аралыкта. Картаны толук көрүү үчүн жанындагы багыттар номерине кайрылыңыз.' 
                        : 'Private resort area 10 minutes east from Cholpon-Ata city center. Complete map coordinates available via concierge hotline desk.'}
                    </p>
                    <div className="mt-4 bg-stone-900 text-stone-100 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase">
                      42.6456° N, 77.0123° E
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* TAB 2: ROOMS CATALOG */}
        {activeTab === 'rooms' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-300">
            
            {/* Catalog header */}
            <div id="catalog-section" className="border-b border-stone-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-[10px] text-amber-850 uppercase font-black tracking-widest block">
                  {lang === 'ky' ? 'Премиум жатаканалар' : 'UNMATCHED SLEEPING SPACES'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading uppercase">
                  {lang === 'ky' ? 'Биздин Бөлмөлөр' : 'Hotel Rooms Catalog'}
                </h2>
                <p className="text-stone-550 font-light text-sm mt-1">
                  {lang === 'ky' 
                    ? 'Төмөнкү тизмеден ыңгайлуулук деңгээли жана баасы боюнча ылайыктуу бөлмөнү тандап, секунда ичинде брондоңуз.' 
                    : 'Choose your preferred five-star suite mapped tightly with direct booking simulation.'}
                </p>
              </div>

              {/* Advanced catalog filters and price sorting */}
              <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                
                {/* Room Type Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{lang === 'ky' ? 'Бөлмө тиби' : 'Type Class'}</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 focus:outline-hidden focus:border-amber-800"
                  >
                    <option value="all">{lang === 'ky' ? 'Бардык типтер' : 'All Rooms Types'}</option>
                    <option value="standard">{lang === 'ky' ? 'Стандарттык' : 'Standard Class'}</option>
                    <option value="deluxe">{lang === 'ky' ? 'Делюкс классы' : 'Deluxe Class'}</option>
                    <option value="family">{lang === 'ky' ? 'Үй-бүлөлүк' : 'Family Class'}</option>
                    <option value="presidential">{lang === 'ky' ? 'Президенттик VIP' : 'Presidential Suite'}</option>
                  </select>
                </div>

                {/* Night price range slider */}
                <div className="flex-1 sm:flex-initial min-w-[200px]">
                  <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                    <span>{lang === 'ky' ? 'Түнүнө эң кымбат:' : 'Max budget night:'}</span>
                    <span className="font-mono text-amber-900">{priceFilter.toLocaleString()} сом</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={30000}
                    step={1000}
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(Number(e.target.value))}
                    className="w-full accent-amber-800 bg-stone-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Empty State after filters */}
            {filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-8 space-y-4">
                <p className="text-stone-500 font-light text-sm">
                  {lang === 'ky' 
                    ? 'Сиз издеген параметрлерге туура келген бөлмөлөр калбаптыр. Чектөөлөрдү же баа чегин жогорулатып көрүңүз.' 
                    : 'No suites match the applied filters. Try adjusting price thresholds or guests requirements.'}
                </p>
                <button
                  onClick={() => {
                    setPriceFilter(30000);
                    setTypeFilter('all');
                    setSearchFilters({ checkIn: '', checkOut: '', guests: 1, type: 'all'});
                  }}
                  className="bg-stone-900 text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider"
                >
                  {lang === 'ky' ? 'Фильтрлерди тазалоо' : 'Clear Filters'}
                </button>
              </div>
            ) : (
              /* Catalog Grid of RoomCard */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    lang={lang}
                    onBook={handleBookRoom}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AMENITIES */}
        {activeTab === 'amenities' && (
          <div className="animate-in fade-in duration-300">
            <Amenities lang={lang} />
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="animate-in fade-in duration-300">
            <Reviews 
              reviews={reviews} 
              onAddReview={handleAddReview} 
              lang={lang} 
            />
          </div>
        )}

        {/* TAB 5: MY BOOKINGS SCREEN */}
        {activeTab === 'my-bookings' && (
          <div className="animate-in fade-in duration-300">
            <MyBookings
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              lang={lang}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

      </main>

      {/* Elegant Room Details view modal */}
      <RoomDetailsModal
        room={selectedRoomForDetails}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onBookNow={handleBookRoom}
        lang={lang}
      />

      {/* Styled Interactive Booking reservation form wizard */}
      <BookingForm
        room={selectedRoomForBooking}
        isOpen={bookingFormOpen}
        onClose={() => setBookingFormOpen(false)}
        onConfirmBooking={handleConfirmBooking}
        lang={lang}
      />

      {/* Congrats Reservation Notice message bubble overlay popup */}
      {congratsBooking && (
        <div className="fixed bottom-6 right-6 z-55 max-w-sm bg-stone-900 text-white rounded-2xl p-5 border border-amber-800 shadow-2xl flex items-start space-x-3.5 animate-in slide-in-from-bottom-12 duration-300">
          <div className="bg-amber-800 rounded-full p-2 text-white mt-1">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">{lang === 'ky' ? 'Брондоо кабыл алынды!' : 'Booking Registered!'}</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              {lang === 'ky' 
                ? `${congratsBooking.guestName}, Сиздин суроо-талабыңыз аткарылды. Брондоо ID коду: ${congratsBooking.id}.` 
                : `${congratsBooking.guestName}, your reservation is validated. Booking ID is ${congratsBooking.id}.`}
            </p>
            <span className="text-[10px] text-amber-400 font-bold block">{lang === 'ky' ? '«Менин Брондоолорум» барагына өтүүдө...' : 'Opening dashboard...'}</span>
          </div>
          <button 
            onClick={() => setCongratsBooking(null)} 
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* GRAND LUXURY HOTEL FOOTER */}
      <footer className="bg-stone-950 text-stone-300 border-t border-stone-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Footer blocks grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo/Info Col */}
            <div className="space-y-4">
              <span className="text-lg font-bold tracking-tight text-white block font-heading uppercase">
                АЛА-ТОО <span className="text-amber-550 text-amber-400">GRAND</span>
              </span>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                {lang === 'ky'
                  ? 'Ысык-Көл облусундагы премиум-класстагы отель. Жогорку тейлөө сапаты жана кооз жаратылыш койнундагы эс алуу.'
                  : 'Exclusive beachfront sanctuary beside Issyk-Kul. Offering five-star Kyrgyz hospitality, wellness, and scenic stays.'}
              </p>
              <div className="flex space-x-3 pt-2">
                <span className="text-stone-500 text-xs font-mono">{lang === 'ky' ? 'Кабыл алуу: 24 саат' : 'Front desk operates 24/7'}</span>
              </div>
            </div>

            {/* Navigation links Col */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-2">{lang === 'ky' ? 'Мейманкана' : 'QUICK NAV'}</h4>
              <ul className="space-y-2 font-light">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 text-left cursor-pointer">{lang === 'ky' ? 'Башкы барак' : 'Lobby Front'}</button></li>
                <li><button onClick={() => setActiveTab('rooms')} className="hover:text-amber-400 text-left cursor-pointer">{lang === 'ky' ? 'Бөлмөлөр тизмеси' : 'All Rooms catalog'}</button></li>
                <li><button onClick={() => setActiveTab('amenities')} className="hover:text-amber-400 text-left cursor-pointer">{lang === 'ky' ? 'Отелде камтылган кызматтар' : 'Exclusive Amenities'}</button></li>
                <li><button onClick={() => setActiveTab('reviews')} className="hover:text-amber-400 text-left cursor-pointer">{lang === 'ky' ? 'Конок пикирлери' : 'Guest Testimonials'}</button></li>
              </ul>
            </div>

            {/* Operating Guidelines FAQ links */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-2">{lang === 'ky' ? 'Көп берилүүчү суроолор' : 'HELP & FAQST'}</h4>
              <ul className="space-y-2 font-light text-stone-400">
                <li>{lang === 'ky' ? '• Эртең мененки тамак убактысы: 8:00 - 11:00' : '• Buffet breakfast: 8 AM to 11 AM.'}</li>
                <li>{lang === 'ky' ? '• Сауна жана бассейн: 10:00 - 22:00' : '• Spa is open: 10 AM to 22 PM.'}</li>
                <li>{lang === 'ky' ? '• Кир жуу кызматы бардык конокторго жеткиликтүү' : '• Dedicated laundry slots available for guests.'}</li>
                <li>{lang === 'ky' ? '• Отелде бекер коопсуз Wi-Fi иштейт' : '• Reliable secure fiber Wifi inside lobby.'}</li>
              </ul>
            </div>

            {/* Newsletter newsletter */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-white uppercase tracking-widest text-[10px]">{lang === 'ky' ? 'Жаңылыктарга Жазылуу' : 'STAY IN TOUCH'}</h4>
              <p className="text-stone-400 hover:text-amber-400 text-[11px] leading-relaxed">
                {lang === 'ky' ? 'Акциялар, жаңы бөлмөлөр жана арзандатуулар жөнүндө убагында кабардар болуңуз.' : 'Subscribe to receive summer hot deals directly.'}
              </p>
              <div className="flex border border-stone-800 rounded-lg overflow-hidden bg-stone-900">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-transparent px-3 py-2 w-full text-xs text-white focus:outline-hidden"
                />
                <button 
                  onClick={() => alert(lang === 'ky' ? 'Жазылуу кабыл алынды! Рахмат!' : 'Successfully subscribed!')}
                  className="bg-amber-800 hover:bg-amber-700 text-stone-100 px-3.5 py-2 uppercase font-bold text-[10px] tracking-wider shrink-0 cursor-pointer"
                >
                  {lang === 'ky' ? 'Жөнөтүү' : 'Join'}
                </button>
              </div>
            </div>

          </div>

          {/* Social line & copyright */}
          <div className="border-t border-stone-900/85 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 text-center sm:text-left">
            <div>
              <p>© 2026 Ала-Тоо Grand Premium Hotel. {lang === 'ky' ? 'Бардык укуктар корголгон.' : 'All rights reserved.'}</p>
              <p className="text-[10px] text-stone-600 font-light mt-0.5">{lang === 'ky' ? 'Чолпон-Ата, Ысык-Көл, Кыргызстан' : 'Cholpon-Ata, Lake Issyk-Kul Shoreline, Central Asia'}</p>
            </div>
            
            <div className="font-mono text-[11px] text-stone-550">
              {lang === 'ky' ? '«Ала-Тоо Меймандостук улуттук бирикмеси»' : '\"Ala-Too Hospitality Resorts Association\"'}
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
