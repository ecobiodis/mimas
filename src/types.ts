export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Bijoux' | 'Montres' | 'Sacs' | 'Accessoires';
  image: string;
  description: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
}
