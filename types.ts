
export interface MenuItem {
  id: string;
  category: 'Drinks' | 'Brunch' | 'Dessert' | 'Special';
  name: string;
  description: string;
  minOrder: number;
  priceInfo: string;
  imageUrls: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  scale: '30' | '50' | '100+';
  type: 'Seminar' | 'Workshop' | 'Exhibition' | 'Vip';
  description: string;
  imageUrls: string[];
}

export interface HygieneItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  attendees: number;
  location: string;
  message: string;
  status: 'pending' | 'responded';
  createdAt: string;
}

export interface AppSettings {
  notificationEmail: string;
}

export type Category = 'All' | 'Drinks' | 'Brunch' | 'Dessert' | 'Special';
