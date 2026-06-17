import { Room, Review } from './types';

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-1',
    name: 'Эки кишилик Стандарт бөлмө',
    nameEn: 'Double Standard Room',
    type: 'standard',
    pricePerNight: 5500,
    size: 28,
    maxGuests: 2,
    bedType: '1 чоң керебет',
    bedTypeEn: '1 King Bed',
    image: 'https://images.unsplash.com/photo-1611891405122-4a0204199335?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1611891405122-4a0204199335?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ыңгайлуу жана жайлуу стандарттык бөлмөбүз заманбап эмеректер, жогорку ылдамдыктагы Wi-Fi, кондиционер жана сергитүүчү душ менен жабдылган. Кыска мөөнөттүү эс алуу же бизнес сапарлар үчүн идеалдуу тандоо.',
    descriptionEn: 'Our cozy and comfortable standard room is fully equipped with modern furniture, high-speed Wi-Fi, air conditioning, and a refreshing shower. An ideal choice for short stays or business trips.',
    amenities: [
      'Жогорку ылдамдыктагы Wi-Fi',
      'Кондиционер',
      'Плазмалык сыналгы',
      'Мини-бар',
      'Электр чайнеги',
      'Душ жана фен',
      'Гигиеналык каражаттар',
      'Коопсуз сейф'
    ],
    amenitiesEn: [
      'High-speed Wi-Fi',
      'Air Conditioning',
      'Plasma TV',
      'Mini-bar',
      'Electric kettle',
      'Shower and hairdryer',
      'Toiletries',
      'In-room safe'
    ],
    view: 'Бакчага караган көрүнүш',
    viewEn: 'Garden View',
    features: ['Эртең мененки тамак кошулган', 'Акысыз унаа токтотуучу жай'],
    featuresEn: ['Breakfast included', 'Free parking spot']
  },
  {
    id: 'room-2',
    name: 'Панорамалык Делюкс бөлмө',
    nameEn: 'Panoramic Deluxe Room',
    type: 'deluxe',
    pricePerNight: 8500,
    size: 38,
    maxGuests: 2,
    bedType: '1 чоң падышалык керебет',
    bedTypeEn: '1 Royal King Bed',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Терезеден көк тиреген тоолор же көгүлтүр көл көрүнгөн панорамалык терезелери бар люкс бөлмө. Кенен балкон, өзгөчө интерьер дизайны жана заманбап ванна бөлмөсү унутулгус эс алууну камсыздайт.',
    descriptionEn: 'A luxury room with majestic floor-to-ceiling windows showing pristine mountains or the azure lake. A spacious balcony, premium interior design, and a modern bathroom guarantee an unforgettable stay.',
    amenities: [
      'Панорамалык балкон',
      'Жогорку ылдамдыктагы Wi-Fi',
      'Климат-контроль сырты',
      'Чоң Smart TV',
      'Кофе кайнаткыч машина',
      'Кеңири ванна жана душ',
      'Халат жана тапочкалар',
      'Мини-бар (муздак суусундуктар менен)'
    ],
    amenitiesEn: [
      'Panoramic Balcony',
      'High-speed Wi-Fi',
      'Climate Control',
      'Smart TV',
      'Espresso machine',
      'Deep bathtub & shower',
      'Luxury robes & slippers',
      'Stocked mini-bar'
    ],
    view: 'Көлгө жана Тоолорго караган панорама',
    viewEn: 'Lake & Mountain Panorama',
    features: ['Бөлмөгө тамак алып келүү кызматы', 'Спа центрине 1 жолку акысыз кирүү'],
    featuresEn: ['In-room dining service', '1-time free access to our Spa center']
  },
  {
    id: 'room-3',
    name: 'Үй-бүлөлүк Люкс апартаменти',
    nameEn: 'Family Luxury Suite',
    type: 'family',
    pricePerNight: 12000,
    size: 55,
    maxGuests: 4,
    bedType: '1 эки кишилик чоң жана 2 бир кишилик керебет',
    bedTypeEn: '1 King Bed & 2 Twin Beds',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Бул эки бөлмөлүү апартамент чоң үй-бүлө же достордун тобу үчүн ыңгайлуу жайгаштырууну сунуштайт. Өзүнчө конок тосуучу бөлмө, уктоочу бөлмө жана ашкана аянты сиздин толук эркиндигиңизге өбөлгө түзөт.',
    descriptionEn: 'This two-room suite offers exceptionally comfortable accommodation for large families or a group of friends. Featuring a separate living room, bedrooms, and dining area for your complete peace of mind.',
    amenities: [
      'Эки өзүнчө бөлмө',
      'Чакан ашкана (микротолкундуу меш менен)',
      'Кир жуугуч машина',
      '3 жашка чейинки балдардын керебети (суроо-талап боюнча)',
      'Тез Wi-Fi жана 2 сыналгы',
      'Үй-бүлөлүк оюн топтомдору',
      'Терең ванна',
      'Жеке балкон'
    ],
    amenitiesEn: [
      'Two separate bedrooms',
      'Compact kitchen with microwave',
      'Washing machine',
      'Baby crib available upon request',
      'High-speed Wi-Fi & 2 TVs',
      'Family board games',
      'Full bathtub',
      'Private balcony'
    ],
    view: 'Кооз парк жана көл көрүнүшү',
    viewEn: 'Scenic Park & Lake View',
    features: ['Балдар үчүн атайын оюн зонасы бекер', 'Күнүмдүк бөлмө тазалоо'],
    featuresEn: ['Free indoor kids club access', 'Daily complimentary housekeeping']
  },
  {
    id: 'room-4',
    name: 'Президенттик Империал Апартаменти',
    nameEn: 'Presidential Imperial Suite',
    type: 'presidential',
    pricePerNight: 25000,
    size: 110,
    maxGuests: 6,
    bedType: '2 чоң падышалык керебет',
    bedTypeEn: '2 Presidential King Beds',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Жогорку деңгээлдеги коноктор үчүн иштелип чыккан эң чоң, люкс класс апартаменти. Камин бөлмөсү, жеке жолугушуу өткөрүүчү зал, жаккузи жана көл жээгине ачылган эң сонун панорамасы бар жеке кенен терраса.',
    descriptionEn: 'Our grandest, top-tier luxury suite designed for highly distinguished guests. Features a fireplace living room, dedicated meeting area, hot tub, and an expansive private terrace boasting breathtaking lake views.',
    amenities: [
      'Жеке жакузи куюлган мончо',
      'Камин залы',
      'Кенен купуя терраса',
      'Жеке консьерж кызматы (24/7)',
      'Аэропорттон люкс трансфер (эки тарапка)',
      'Бардык барды камтыган премиум меню',
      'Жеке коопсуздук системасы',
      'Акустикалык премиум үн системасы'
    ],
    amenitiesEn: [
      'Private Jacuzzi tub',
      'Real fireplace lounge',
      'Expansive private terrace',
      'Personal concierge 24/7',
      'Free luxury airport transfer',
      'Fully stocked premium bar & dining',
      'High-security features',
      'High-end acoustic sound system'
    ],
    view: 'Ысык-Көлдүн 180° толук панорамасы',
    viewEn: '180° Absolute Lake Panorama',
    features: ['Жеке шеф-ашпозчу кызматтары кошулган', 'VIP спа сунуштарына чексиз кирүү'],
    featuresEn: ['Dedicated private chef services', 'Unlimited VIP Spa access']
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Адилет Султанов',
    rating: 5,
    comment: 'Абдан сонун отель экен! Көлгө абдан жакын, бөлмөлөрү таптаза жана кенен. Панорамалык делюкс бөлмөсүн брондодук эле, терезеден караганда көл ушунчалык кооз көрүнөт экен. Рахмат сиздерге!',
    date: '2026-05-24',
    roomType: 'Панорамалык Делюкс бөлмө'
  },
  {
    id: 'rev-2',
    guestName: 'Eliza White',
    rating: 5,
    comment: 'Outstanding stay. The staff was incredibly welcoming and speaking good English. The view of Issyk-Kul lake and Ala-Too mountains from our Presidential Suite was unmatched. Definitely recommended!',
    date: '2026-06-01',
    roomType: 'Президенттик Империал Апартаменти'
  },
  {
    id: 'rev-3',
    guestName: 'Мирбек жана Самара',
    rating: 4,
    comment: 'Үй-бүлөбүз менен аябай жакшы эс алдык. Балдар үчүн оюн аянтчасы бар экен, эртең мененки тамагы даамдуу жана тандап жегенге көп нерселер бар. Кийинкиге дагы келебиз!',
    date: '2026-06-08',
    roomType: 'Үй-бүлөлүк Люкс апартаменти'
  }
];

export const HOTEL_AMENITIES_DATA = [
  {
    id: 'amen-1',
    title: 'Көл жээги (Жеке пляж)',
    titleEn: 'Private Sandy Beach',
    desc: 'Отелдин жеке таза пляжы, шезлонгдор жана пляж кол чатырлары бекер берилет.',
    descEn: 'Clean, secure private sandy beach of the hotel with complimentary sun loungers and umbrellas.',
    icon: 'Waves'
  },
  {
    id: 'amen-2',
    title: 'СПА & Термалдык Бассейн',
    titleEn: 'Luxury SPA & Pool',
    desc: 'Ысытылган суусу бар бассейндер, фин саунасы, хамам жана кесипкөй массаж кызматы.',
    descEn: 'Heated outdoor & indoor pools, Finnish sauna, Turkish hammam, and professional beauty massages.',
    icon: 'Compass'
  },
  {
    id: 'amen-3',
    title: '«Ала-Too» Рестораны',
    titleEn: '"Ala-Too" Restaurant',
    desc: 'Улуттук жана европалык ашкананын эң даамдуу тамактары деңгээлдүү шеф-ашпозчудан.',
    descEn: 'Exquisite national Kyrgyz and fine European cuisines prepared by our award-winning head chef.',
    icon: 'Utensils'
  },
  {
    id: 'amen-4',
    title: 'Бизнес & Конференц Зал',
    titleEn: 'Business Conference Hall',
    desc: 'Заманбап проектор, спикердик жабдуулар жана 150 конокко ылайыкталган кенен зал.',
    descEn: 'Modern projector screens, premium acoustic systems, and high-capacity halls for up to 150 guests.',
    icon: 'Briefcase'
  },
  {
    id: 'amen-5',
    title: '24/7 Сервис & Консьерж',
    titleEn: '24/7 Reception & Concierge',
    desc: 'Сиздин коопсуздугуңуз жана бардык суроолоруңузду чечүү үчүн күнү-түнү иштеген тейлөө тобу.',
    descEn: 'Round-the-clock professional service desk and safety team to fulfill your requests at any moment.',
    icon: 'Clock'
  },
  {
    id: 'amen-6',
    title: 'Унаа токтотуучу жай',
    titleEn: 'Secure Free Parking',
    desc: '24 саат бою видеобайкоо астында турган унаалар үчүн акысыз коопсуз аянтча.',
    descEn: 'Complementary secure, 24-hour guarded parking lot under comprehensive video surveillance.',
    icon: 'Car'
  }
];
