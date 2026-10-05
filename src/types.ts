export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'signatures' | 'mains' | 'breads_rice' | 'desserts_drinks';
  price: number;
  originalPrice?: number;
  description: string;
  isVeg: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0=none, 1=mild, 2=medium, 3=spicy
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  calories?: number;
  prepTimeMinutes?: number;
  portionSize?: string;
  allergens?: string[];
  ingredients?: string[];
  visualAccent: {
    bgGradient: string;
    borderGlow: string;
    dishEmoji: string;
    accentColor: string;
  };
}

export interface RestaurantPreset {
  id: string;
  name: string;
  tagline: string;
  subtagline: string;
  cuisine: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  timings: string;
  rating: number;
  reviewsCount: number;
  fssaiNumber: string;
  currency: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl?: string;
  chefImageUrl?: string;
  chefName: string;
  chefTitle: string;
  chefBio: string;
  chefQuote: string;
  accentColor: string;
  accentHex: string;
  menuItems: MenuItem[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationDetails {
  bookingId: string;
  guestName: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingArea: 'indoor_ac' | 'terrace' | 'private_booth' | 'romantic_corner';
  occasion?: string;
  specialRequests?: string;
}
