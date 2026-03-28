import { Product, Category, Testimonial } from './types';

export const BRAND_NAME = "MIMAS Accessoires";
export const WHATSAPP_NUMBER = "+212663818202";
export const WHATSAPP_LINK = `https://wa.me/212663818202`;

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Bijoux', slug: 'bijoux', image: 'https://images.unsplash.com/photo-1535633302704-b02f4fad253f?q=80&w=800&auto=format&fit=crop' },
  { id: '2', name: 'Montres', slug: 'montres', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop' },
  { id: '3', name: 'Sacs', slug: 'sacs', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { id: '4', name: 'Accessoires', slug: 'accessoires', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Collier Éclat Doré',
    price: 299,
    originalPrice: 450,
    category: 'Bijoux',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Un collier raffiné en acier inoxydable doré, parfait pour illuminer vos tenues de soirée.',
    isBestSeller: true,
    stock: 5
  },
  {
    id: 'p2',
    name: 'Montre Élégance Rose Gold',
    price: 599,
    originalPrice: 850,
    category: 'Montres',
    image: 'https://images.unsplash.com/photo-1508685096489-7aac291253f6?q=80&w=800&auto=format&fit=crop',
    description: 'Montre minimaliste avec bracelet en maille milanaise rose gold. Le comble du chic.',
    isBestSeller: true,
    stock: 3
  },
  {
    id: 'p3',
    name: 'Sac à Main Prestige Noir',
    price: 899,
    originalPrice: 1200,
    category: 'Sacs',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    description: 'Sac en cuir synthétique de haute qualité avec finitions dorées.',
    isNew: true,
    stock: 2
  },
  {
    id: 'p4',
    name: 'Bracelet Infini Argenté',
    price: 199,
    category: 'Bijoux',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Bracelet délicat symbolisant l\'éternité. Un cadeau idéal.',
    stock: 10
  },
  {
    id: 'p5',
    name: 'Boucles d\'oreilles Perles Royales',
    price: 249,
    originalPrice: 350,
    category: 'Bijoux',
    image: 'https://images.unsplash.com/photo-1535633302704-b02f4fad253f?q=80&w=800&auto=format&fit=crop',
    description: 'Perles d\'eau douce montées sur or 14k.',
    isBestSeller: true,
    stock: 4
  },
  {
    id: 'p6',
    name: 'Montre Chrono Sport Femme',
    price: 450,
    category: 'Montres',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    description: 'Alliez style et performance avec cette montre robuste et élégante.',
    isNew: true,
    stock: 7
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Siham R.', comment: 'Qualité incroyable ! J\'ai commandé via WhatsApp et la livraison a été super rapide.', rating: 5 },
  { id: '2', name: 'Layla M.', comment: 'Les bijoux ne noircissent pas, je suis ravie de mon achat.', rating: 5 },
  { id: '3', name: 'Khadija B.', comment: 'Le service client est au top, très réactif sur WhatsApp.', rating: 4 },
];
