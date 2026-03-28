import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Clock,
  Search,
  ArrowRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { 
  BRAND_NAME, 
  WHATSAPP_NUMBER, 
  WHATSAPP_LINK, 
  CATEGORIES, 
  PRODUCTS, 
  TESTIMONIALS 
} from './constants';
import { Product } from './types';

// --- Components ---

const WhatsAppButton = () => (
  <a 
    href={WHATSAPP_LINK} 
    target="_blank" 
    rel="noopener noreferrer"
    className="whatsapp-float"
    aria-label="Contactez-nous sur WhatsApp"
  >
    <MessageCircle size={32} fill="currentColor" />
  </a>
);

const Navbar = ({ onOpenCart, cartCount, onNavigate }: { onOpenCart: () => void, cartCount: number, onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
          <Menu size={24} className={isScrolled ? 'text-black' : 'text-white'} />
        </button>
        
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => onNavigate('home')} className={`uppercase text-xs tracking-widest hover:text-gold transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Accueil</button>
          <button onClick={() => onNavigate('shop')} className={`uppercase text-xs tracking-widest hover:text-gold transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Boutique</button>
        </div>

        <button onClick={() => onNavigate('home')} className={`text-2xl font-serif tracking-tighter ${isScrolled ? 'text-black' : 'text-white'}`}>
          MIMAS
        </button>

        <div className="flex items-center gap-4">
          <button className={`hidden md:block ${isScrolled ? 'text-black' : 'text-white'}`}>
            <Search size={20} />
          </button>
          <button onClick={onOpenCart} className={`relative ${isScrolled ? 'text-black' : 'text-white'}`}>
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 bg-white z-50 p-8 flex flex-col"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-12">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-serif">
              <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}>Accueil</button>
              <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }}>Boutique</button>
              <button onClick={() => { onNavigate('categories'); setIsMenuOpen(false); }}>Catégories</button>
              <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }}>À Propos</button>
              <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}>Contact</button>
            </div>
            <div className="mt-auto flex gap-6">
              <Instagram size={24} />
              <Facebook size={24} />
              <MessageCircle size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelect: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
  const whatsappMsg = encodeURIComponent(`Bonjour, je suis intéressée par ce produit : ${product.name}`);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1">Best Seller</span>
        )}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-gold text-white text-[10px] uppercase tracking-widest px-3 py-1">Nouveau</span>
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-colors"
          >
            Ajouter au panier
          </button>
          <a 
            href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-[#25D366] text-white py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm uppercase tracking-wider font-medium">{product.name}</h3>
        <div className="mt-1 flex justify-center gap-2 items-center">
          <span className="text-gold font-bold">{product.price} DH</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">{product.originalPrice} DH</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }: { 
  isOpen: boolean, 
  onClose: () => void, 
  cart: { product: Product, quantity: number }[],
  updateQuantity: (id: string, delta: number) => void,
  removeFromCart: (id: string) => void
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-bottom flex justify-between items-center">
              <h2 className="text-xl font-serif uppercase tracking-widest">Votre Panier</h2>
              <button onClick={onClose}><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="uppercase tracking-widest text-sm">Votre panier est vide</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium uppercase tracking-tight">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-black"><Trash2 size={16} /></button>
                      </div>
                      <p className="text-gold font-bold mt-1">{item.product.price} DH</p>
                      <div className="mt-auto flex items-center gap-4">
                        <div className="flex items-center border border-gray-200">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-2 hover:bg-gray-50"><Minus size={12} /></button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-2 hover:bg-gray-50"><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="uppercase tracking-widest text-sm">Total</span>
                  <span className="text-xl font-bold">{total} DH</span>
                </div>
                <button className="w-full btn-gold mb-3">Commander Maintenant</button>
                <a 
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Bonjour, je souhaite commander mon panier d'un montant de ${total} DH.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Commander via WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: { product: Product | null, isOpen: boolean, onClose: () => void, onAddToCart: (p: Product) => void }) => {
  if (!product) return null;
  const whatsappMsg = encodeURIComponent(`Bonjour, je suis intéressée par ce produit : ${product.name}`);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row"
            >
              <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/50 rounded-full p-2 hover:bg-white transition-colors">
                <X size={24} />
              </button>
              
              <div className="md:w-1/2 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="flex gap-2 mb-4">
                  {product.isBestSeller && <span className="bg-black text-white text-[10px] px-2 py-1 uppercase tracking-widest">Best Seller</span>}
                  <span className="border border-gray-200 text-gray-500 text-[10px] px-2 py-1 uppercase tracking-widest">{product.category}</span>
                </div>
                
                <h2 className="text-3xl font-serif mb-2">{product.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-gold">{product.price} DH</span>
                  {product.originalPrice && <span className="text-gray-400 line-through">{product.originalPrice} DH</span>}
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-red-500 font-bold uppercase tracking-widest mb-4">
                    <Clock size={14} /> Stock Limité : plus que {product.stock} articles !
                  </div>
                  
                  <button onClick={() => { onAddToCart(product); onClose(); }} className="w-full btn-gold">
                    Ajouter au panier
                  </button>
                  <a 
                    href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> Commander via WhatsApp
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                    <Truck size={16} className="text-gold" /> Livraison Rapide
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                    <ShieldCheck size={16} className="text-gold" /> Paiement Sécurisé
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DiscountPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-24 left-6 z-40 max-w-xs bg-black text-white p-6 shadow-2xl hidden md:block"
    >
      <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-white/50 hover:text-white">
        <X size={16} />
      </button>
      <h3 className="font-serif text-xl mb-2">Offre de Bienvenue</h3>
      <p className="text-xs text-gray-400 mb-4 tracking-wide">Inscrivez-vous et profitez de -10% sur votre première commande !</p>
      <div className="flex">
        <input type="email" placeholder="Votre email" className="bg-white/10 border-none text-xs p-3 flex-1 outline-none" />
        <button className="bg-gold p-3"><ChevronRight size={16} /></button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} onNavigate={setCurrentPage} />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
                  alt="MIMAS Lifestyle" 
                  className="w-full h-full object-cover brightness-50"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="uppercase tracking-[0.3em] text-xs mb-6 block"
                >
                  Nouvelle Collection 2026
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-8xl font-serif mb-8 leading-tight"
                >
                  Révélez votre <br /> <span className="italic text-gold">Élégance</span>
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col md:flex-row gap-4 justify-center"
                >
                  <button onClick={() => setCurrentPage('shop')} className="btn-gold">Acheter Maintenant</button>
                  <button onClick={() => setCurrentPage('shop')} className="btn-outline border-white text-white hover:bg-white hover:text-black">Voir Nouveautés</button>
                </motion.div>
              </div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
              >
                <div className="w-[1px] h-16 bg-white/30 mx-auto" />
              </motion.div>
            </section>

            {/* Categories Grid */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif mb-4">Nos Univers</h2>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Explorez nos collections exclusives</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="relative aspect-[4/5] overflow-hidden group cursor-pointer" onClick={() => setCurrentPage('shop')}>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <h3 className="text-white text-2xl font-serif tracking-widest uppercase">{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Best Sellers */}
            <section className="py-24 bg-gray-50 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif mb-2">Best Sellers</h2>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">Les favoris de nos clientes</p>
                  </div>
                  <button onClick={() => setCurrentPage('shop')} className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-gold transition-colors">
                    Tout voir <ArrowRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {PRODUCTS.filter(p => p.isBestSeller).map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} onSelect={(p) => setSelectedProduct(p)} />
                  ))}
                </div>
              </div>
            </section>

            {/* Promo Banner */}
            <section className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop" alt="Promo" className="w-full h-full object-cover brightness-50" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-serif mb-6 italic">Offre Limitée</h2>
                <p className="text-xl md:text-2xl mb-10 tracking-wide">Profitez de -20% sur toute la collection Bijoux</p>
                <div className="flex justify-center gap-8 mb-12">
                  <div className="text-center">
                    <span className="text-4xl font-bold block">02</span>
                    <span className="text-[10px] uppercase tracking-[0.2em]">Jours</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold block">14</span>
                    <span className="text-[10px] uppercase tracking-[0.2em]">Heures</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold block">35</span>
                    <span className="text-[10px] uppercase tracking-[0.2em]">Min</span>
                  </div>
                </div>
                <button onClick={() => setCurrentPage('shop')} className="btn-gold bg-white text-black hover:bg-gold hover:text-white">J'en profite</button>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif mb-4">Elles nous adorent</h2>
                <div className="flex justify-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {TESTIMONIALS.map(t => (
                  <div key={t.id} className="text-center">
                    <p className="text-lg italic font-serif text-gray-600 mb-6">"{t.comment}"</p>
                    <p className="uppercase tracking-widest text-xs font-bold">— {t.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentPage === 'shop' && (
          <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
              <h1 className="text-4xl font-serif">La Boutique</h1>
              <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {['Tous', 'Bijoux', 'Montres', 'Sacs', 'Accessoires'].map(cat => (
                  <button key={cat} className="whitespace-nowrap px-6 py-2 border border-gray-200 text-[10px] uppercase tracking-widest hover:border-black transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} onSelect={(p) => setSelectedProduct(p)} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black text-white pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-serif mb-6 tracking-tighter">MIMAS</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Votre destination mode pour des accessoires raffinés et tendances au Maroc. L'élégance à portée de clic.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              <MessageCircle size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-gold cursor-pointer">Bijoux</li>
              <li className="hover:text-gold cursor-pointer">Montres</li>
              <li className="hover:text-gold cursor-pointer">Sacs</li>
              <li className="hover:text-gold cursor-pointer">Nouveautés</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-6">Aide</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-gold cursor-pointer">Livraison</li>
              <li className="hover:text-gold cursor-pointer">Retours</li>
              <li className="hover:text-gold cursor-pointer">FAQ</li>
              <li className="hover:text-gold cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-6">Inscrivez-vous pour recevoir nos offres exclusives.</p>
            <div className="flex border-b border-gray-800 pb-2">
              <input type="email" placeholder="Votre email" className="bg-transparent border-none text-sm flex-1 outline-none" />
              <button className="text-gold hover:text-white transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
          <p>© 2026 {BRAND_NAME}. Tous droits réservés.</p>
          <div className="flex gap-8">
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />
      <DiscountPopup />
    </div>
  );
}
