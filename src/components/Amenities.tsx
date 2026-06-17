import { HOTEL_AMENITIES_DATA } from '../data';
import { Waves, Compass, Utensils, Briefcase, Clock, Car, HelpCircle } from 'lucide-react';

interface AmenitiesProps {
  lang: 'ky' | 'en';
}

export default function Amenities({ lang }: AmenitiesProps) {
  // Helper to dynamically match icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="h-7 w-7 text-amber-805 text-amber-850 stroke-[1.25]" />;
      case 'Compass': return <Compass className="h-7 w-7 text-amber-805 text-amber-850 stroke-[1.25]" />;
      case 'Utensils': return <Utensils className="h-7 w-7 text-amber-805 text-amber-850 stroke-[1.25]" />;
      case 'Briefcase': return <Briefcase className="h-7 w-7 text-amber-850 stroke-[1.25]" />;
      case 'Clock': return <Clock className="h-7 w-7 text-amber-850 stroke-[1.25]" />;
      case 'Car': return <Car className="h-7 w-7 text-amber-850 stroke-[1.25]" />;
      default: return <HelpCircle className="h-7 w-7 text-amber-850 stroke-[1.25]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] text-amber-850 uppercase font-black tracking-widest block">
            {lang === 'ky' ? 'Жогорку тейлөө стандарттары' : 'Exquisite Guest Inclusions'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight uppercase font-heading">
            {lang === 'ky' ? 'Премиум Мүмкүнчүлүктөр' : 'Premium Luxury Services'}
          </h2>
          <div className="w-12 h-[3px] bg-amber-800 mx-auto rounded-full" />
          <p className="text-stone-550 font-light text-sm leading-relaxed">
            {lang === 'ky' 
              ? 'Ала-Тоо Grand отели сизге жөн гана жатакана эмес, көңүлдүү жана эсте калаарлык премиум-класстагы деңгээлдеги толук шарттарды уюштурат.' 
              : 'Our five-star complex provides seamless upscale amenities tailored diligently for outstanding leisure, wellness, and corporate demands.'}
          </p>
        </div>

        {/* Features Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HOTEL_AMENITIES_DATA.map((amen) => (
            <div 
              key={amen.id}
              className="group bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 hover:bg-[#FAF9F6]/50 hover:shadow-lg hover:border-amber-700/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="bg-amber-100 p-3.5 rounded-2xl w-fit group-hover:bg-amber-800 group-hover:text-stone-100 text-amber-900 transition-colors duration-300">
                  {getIcon(amen.icon)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-stone-900 tracking-tight group-hover:text-amber-800 transition-colors">
                    {lang === 'ky' ? amen.title : amen.titleEn}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                    {lang === 'ky' ? amen.desc : amen.descEn}
                  </p>
                </div>
              </div>

              {/* Fine visual accent line */}
              <div className="pt-6">
                <div className="w-full h-[1px] bg-stone-100 group-hover:bg-amber-300/30 transition-colors" />
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mt-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {lang === 'ky' ? 'Толук маалымат алуу →' : 'Explore Privilege →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Special highlight bottom segment */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800">
          {/* Subtle background abstract shape */}
          <div className="absolute top-0 right-0 w-80 h-8 frame shadow-inner opacity-25 rounded-full filter blur-xl" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[10px] text-amber-400 uppercase font-black tracking-widest block">
              {lang === 'ky' ? 'ЖАЙКЫ СУНУШ 2026' : 'EXCLUSIVE SUMMER OFFERS'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase font-heading">
              {lang === 'ky' 
                ? 'Көл жээгиндеги жеке кабиналар жана яхта саякаттары' 
                : 'Beachside Cabana Rentals & VIP Issyk-Kul Yacht Charters'}
            </h3>
            <p className="text-stone-300 font-light text-sm leading-relaxed">
              {lang === 'ky' 
                ? 'Эс алууңузду андан да кызыктуу өткөрүү үчүн бизде жеке яхта, көл үстүндөгү моторлуу кайыктар жана пляждын жээгиндеги жеке кабиналарды ижарага алуу мүмкүнчүлүктөрү бар.'
                : 'Elevate your retreat via tailored speedboat cruises, private sunset water sails, or luxury canopied cabanas operating directly on our beach shores.'}
            </p>
            <div className="pt-2">
              <span className="text-xs text-stone-400 font-mono italic block">
                * {lang === 'ky' ? 'Кирип жаткан учурда консьержге кайрылыңыз' : 'Inquire with our private concierge team upon hotel arrival.'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
