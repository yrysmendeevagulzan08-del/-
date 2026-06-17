export interface Room {
  id: string;
  name: string;
  nameEn: string;
  type: 'standard' | 'deluxe' | 'family' | 'presidential';
  pricePerNight: number; // in KGS / Som
  size: number; // in m²
  maxGuests: number;
  bedType: string;
  bedTypeEn: string;
  image: string;
  images: string[];
  description: string;
  descriptionEn: string;
  amenities: string[];
  amenitiesEn: string[];
  view: string;
  viewEn: string;
  features: string[];
  featuresEn: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  additionalServices: {
    spa: boolean;
    breakfast: boolean;
    transfer: boolean;
  };
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  guestName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  roomType: string;
}
