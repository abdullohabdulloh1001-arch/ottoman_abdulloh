import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  Compass, 
  Activity, 
  MousePointer, 
  Calendar,
  Sliders,
  Check, 
  ArrowRight, 
  X, 
  User, 
  Mail, 
  Phone,
  MessageSquare,
  Gift,
  Book,
  Heart,
  ShoppingCart,
  MapPin,
  Truck,
  Search,
  Menu
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// SUBCOMPONENTS
// ==========================================

// 1. Magnetic Button Component
const MagneticButton = ({ children, onClick, className = "", variant = "primary" }) => {
  const btnRef = useRef(null);

  const baseStyles = "magnetic-btn relative overflow-hidden font-mono text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 select-none cursor-pointer";
  const variants = {
    primary: "bg-royalBlue text-white border border-royalBlue hover:text-royalBlue font-semibold",
    secondary: "bg-transparent text-royalBlue border border-royalBlue/40 hover:border-royalBlue hover:bg-royalBlue/10",
    dark: "bg-navyBlue text-white border border-navyBlue hover:bg-royalBlue hover:border-royalBlue"
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Sliding hover layer */}
      <span className="magnetic-btn-bg absolute top-0 left-[-100%] w-full h-full bg-royalBg transition-transform duration-500 ease-out z-0"></span>
    </button>
  );
};

const TelegramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.73 7.58-3.25 3.61-1.48 4.36-1.74 4.85-1.75.11 0 .35.03.5.16.13.12.17.29.18.41-.01.08-.01.17-.02.26z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FavoriteHeart = ({ isFavorite, onClick, className = "" }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-royalBlue/10 shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 ${className}`}
  >
    <Heart 
      className={`w-3.5 h-3.5 transition-colors duration-300 ${
        isFavorite ? 'fill-royalBlue text-royalBlue' : 'text-navyBlue/40 hover:text-navyBlue/60'
      }`}
    />
  </button>
);

// ==========================================
// ==========================================
// ALL PRODUCTS DATA
// ==========================================
const ALL_PRODUCTS = [
  { id: 'b1', name: "Hadislar to'plami", price: "50 000", image: "/images/kitob_hadis_toplam.jpg", category: "Diniy Kitoblar" },
  { id: 'b2', name: "365 kunda duo", price: "105 000", image: "/images/kitob_365_duo.jpg", category: "Diniy Kitoblar" },
  { id: 'b3', name: "365 kunda hadis", price: "105 000", image: "/images/kitob_365_hadis.jpg", category: "Diniy Kitoblar" },
  { id: 'b4', name: "Payg'ambarimni taniyman", price: "107 000", image: "/images/kitob_paygambar_taniyman.jpg", category: "Diniy Kitoblar" },
  { id: 'b5', name: "Payg'ambarlar qissasi", price: "110 000", image: "/images/kitob_paygambarlar_qissasi.jpg", category: "Diniy Kitoblar" },
  { id: 'u1', name: "Ekonom To'plam", price: "1 000 000", image: "/images/umra_ekonom.jpg", category: "Umra Anjomlari" },
  { id: 'u2', name: "Standart To'plam", price: "1 500 000", image: "/images/umra_standart.jpg", category: "Umra Anjomlari" },
  { id: 'u3', name: "Premium To'plam", price: "2 000 000", image: "/images/umra_premium.jpg", category: "Umra Anjomlari" },
  { id: 'k1', name: "Er-xotinga nasihat", price: "115 000", image: "/images/kitob_er_xotin.jpg", category: "Kitoblar" },
  { id: 'k2', name: "Jannat bo'stonidagi oilaviy oqshomlar", price: "107 000", image: "/images/kitob_jannat_bostoni.jpg", category: "Kitoblar" },
  { id: 'k3', name: "Oqshom go'zalliklari", price: "94 000", image: "/images/kitob_oqshom_gozalliklari.jpg", category: "Kitoblar" },
  { id: 'k4', name: "Qalbi singanlarga", price: "61 000", image: "/images/kitob_qalbi_singanlarga.jpg", category: "Kitoblar" },
  { id: 'k5', name: "Binafsha shu'lasi", price: "75 000", image: "/images/kitob_binafsha_1.jpg", category: "Kitoblar" },
  { id: 'k6', name: "Binafsha shu'lasi 2", price: "85 000", image: "/images/kitob_binafsha_2.jpg", category: "Kitoblar" },
  { id: 'k7', name: "Qur'ondan maktublar", price: "75 000", image: "/images/kitob_qurondan_maktublar.jpg", category: "Kitoblar" }
];

// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isUmraModalOpen, setIsUmraModalOpen] = useState(false);
  const [isDiniyModalOpen, setIsDiniyModalOpen] = useState(false);
  const [isKitoblarModalOpen, setIsKitoblarModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('qalam_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('qalam_favorites', JSON.stringify(next));
      return next;
    });
  };

  const filteredProducts = ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Disable body scroll when any modal is open
  useEffect(() => {
    if (isUmraModalOpen || isDiniyModalOpen || isKitoblarModalOpen || isFavoritesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isUmraModalOpen, isDiniyModalOpen, isKitoblarModalOpen, isFavoritesModalOpen]);

  // Telemetry Typewriter States
  const [telemetryText, setTelemetryText] = useState("");
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [telemetryLogs] = useState([
    "DO'KON BAZASIGA ULANISH...",
    "YANGI BUYURTMA KELIB TUSHDI...",
    "MAHSULOT: Qur'oni Karim (Oltin bezakli, charm)...",
    "SOVG'A TURI: Premium baxmal sandiq to'plami...",
    "CHARM RANGI: Qirollik Zangori (Royal Blue)...",
    "HOLAT: QADOQLASH JARAYONI YAKUNLANDI... OK",
    "TAYYOR: TELEGRAM ORQALI BOG'LANING."
  ]);

  // Shuffler States
  const [shuffleCards, setShuffleCards] = useState([
    {
      id: 1,
      title: "Alisher Navoiy — Xamsa",
      desc: "Oliy toifadagi zangori charm muqovali, qo'lda oltin suvi yugurtirilgan eksklyuziv devon.",
      spec: "KATEGORIYA: Tarixiy & Badiiy Kitoblar"
    },
    {
      id: 2,
      title: "Qur'oni Karim Tasfsiri",
      desc: "Premium yashil va ko'k charm muqovali, ipak sahifali muqaddas Qur'on nashrlari.",
      spec: "KATEGORIYA: Diniy Adabiyotlar"
    },
    {
      id: 3,
      title: "Qirollik Hadis To'plami",
      desc: "Yong'oq yog'ochidan ishlangan baxmal sandiq ichidagi hadis kitoblari to'plami.",
      spec: "KATEGORIYA: Premium Sovg'alar"
    }
  ]);

  // Scheduler States
  const schedulerCursorRef = useRef(null);
  const schedulerGridRefs = useRef([]);
  const schedulerBtnRef = useRef(null);
  const schedulerContainerRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isSchedulerBooked, setIsSchedulerBooked] = useState(false);

  // Stacking Protocol Ref
  const philosophySectionRef = useRef(null);

  const TELEGRAM_LINK = "https://t.me/Abdurafiq_A";

  const handleTelegramRedirect = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  const getTelegramPurchaseLink = (productName, imagePath) => {
    const fullImageUrl = window.location.origin + imagePath;
    const message = `Assalomu alaykum!\nMen quyidagi mahsulotni sotib olmoqchi edim: ${productName}\nRasm havolasi: ${fullImageUrl}\n\nMavjudmi va yetkazib berish qancha vaqt oladi?`;
    return `${TELEGRAM_LINK}?text=${encodeURIComponent(message)}`;
  };

  // 1. Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Telemetry Typewriter Logic
  useEffect(() => {
    let charIndex = 0;
    let currentLog = telemetryLogs[telemetryIndex];
    let isDeleting = false;
    let typingSpeed = 50;

    const type = () => {
      if (!isDeleting) {
        setTelemetryText(currentLog.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentLog.length) {
          // Pause at the end of typing
          setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
          return;
        }
      } else {
        setTelemetryText(currentLog.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          setTelemetryIndex((prev) => (prev + 1) % telemetryLogs.length);
          return;
        }
      }

      setTimeout(type, isDeleting ? 20 : typingSpeed);
    };

    const timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, [telemetryIndex]);

  // 3. Shuffler Rotate Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 4. GSAP Entrances and Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.hero-fade-up', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Philosophy Scroll Trigger
      gsap.from('.philosophy-fade-up', {
        scrollTrigger: {
          trigger: philosophySectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      });

    });

    return () => ctx.revert();
  }, []);

  // 5. Cursor Protocol Scheduler Simulation
  useEffect(() => {
    if (!schedulerCursorRef.current || schedulerGridRefs.current.length === 0 || !schedulerBtnRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // Reset states
      tl.call(() => {
        setSelectedDay(null);
        setIsSchedulerBooked(false);
      });

      // Target day: Wednesday (index 3) - Chor
      tl.to(schedulerCursorRef.current, {
        x: () => {
          const rect = schedulerGridRefs.current[3].getBoundingClientRect();
          const parent = schedulerContainerRef.current.getBoundingClientRect();
          return rect.left - parent.left + rect.width / 2;
        },
        y: () => {
          const rect = schedulerGridRefs.current[3].getBoundingClientRect();
          const parent = schedulerContainerRef.current.getBoundingClientRect();
          return rect.top - parent.top + rect.height / 2;
        },
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Click day animation
      tl.to(schedulerCursorRef.current, { scale: 0.75, duration: 0.15 });
      tl.call(() => setSelectedDay(3));
      tl.to(schedulerCursorRef.current, { scale: 1, duration: 0.15 });

      // Move to button
      tl.to(schedulerCursorRef.current, {
        x: () => {
          const rect = schedulerBtnRef.current.getBoundingClientRect();
          const parent = schedulerContainerRef.current.getBoundingClientRect();
          return rect.left - parent.left + rect.width / 2;
        },
        y: () => {
          const rect = schedulerBtnRef.current.getBoundingClientRect();
          const parent = schedulerContainerRef.current.getBoundingClientRect();
          return rect.top - parent.top + rect.height / 2;
        },
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.4
      });

      // Click button
      tl.to(schedulerCursorRef.current, { scale: 0.75, duration: 0.15 });
      tl.call(() => setIsSchedulerBooked(true));
      tl.to(schedulerCursorRef.current, { scale: 1, duration: 0.15 });

      // Exit cursor
      tl.to(schedulerCursorRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1.5
      });
    }, schedulerContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-royalBg text-navyBlue selection:bg-royalBlue selection:text-royalBg overflow-hidden font-sans">
      
      {/* Global CSS Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Pill Navbar */}
      <nav className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-[1.8rem] md:rounded-full border transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 ${
        scrolled || isMobileMenuOpen
          ? 'top-4 bg-white/95 backdrop-blur-xl border-royalBlue/20 shadow-2xl py-2.5 shadow-navyBlue/5' 
          : 'top-6 bg-transparent border-transparent py-4'
      }`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#" className="flex items-center gap-2 md:gap-3 hover-lift">
            <img 
              src="/logo.png" 
              alt="Qalam Samarqand Logo" 
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-royalBlue/20 object-cover bg-white"
            />
            <span className={`font-serif text-sm md:text-base lg:text-lg font-bold tracking-wider transition-colors duration-500 ${
              scrolled || isMobileMenuOpen ? 'text-royalBlue' : 'text-white'
            }`}>
              QALAM SAMARQAND
            </span>
          </a>

          {/* Hamburger / Close Menu Button on Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsFavoritesModalOpen(true)}
              className="hover-lift transition-all duration-300 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-mono bg-amber-500 hover:bg-amber-600 text-navyBlue shadow-md shadow-amber-500/20 active:scale-95"
              title="Savatcha"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-navyBlue" />
              <span className="flex items-center justify-center bg-navyBlue text-amber-500 font-black text-[8px] w-4.5 h-4.5 rounded-full">
                {favorites.length}
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                scrolled || isMobileMenuOpen ? 'text-navyBlue hover:bg-navyBlue/5' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Navigation Categories (Desktop) */}
        <div className={`hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[9px] lg:text-[10px] tracking-[0.15em] uppercase transition-colors duration-500 ${
          scrolled ? 'text-navyBlue/70' : 'text-white/95'
        }`}>
          <a href="#kitoblar" className={`hover-lift transition-colors font-medium ${scrolled ? 'hover:text-royalBlue' : 'hover:text-sky-300'}`}>Katalog</a>
          <a href="#tarixiy-kitoblar" className={`hover-lift transition-colors font-medium ${scrolled ? 'hover:text-royalBlue' : 'hover:text-sky-300'}`}>Sovg'alar</a>
          <a href="#afzalliklar" className={`hover-lift transition-colors font-medium ${scrolled ? 'hover:text-royalBlue' : 'hover:text-sky-300'}`}>Afzalliklar</a>
          
          {/* Prominent Standalone Link with Elegant Visual Marker for Umra Anjomlari */}
          <button 
            onClick={() => setIsUmraModalOpen(true)}
            className={`hover-lift transition-all duration-300 font-bold flex items-center gap-1.5 px-3 py-1 rounded-full ${
              scrolled 
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-700 hover:text-amber-600' 
                : 'bg-amber-400/20 border border-amber-400/30 text-amber-300 hover:text-amber-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            Umra Anjomlari
          </button>
        </div>
        
        {/* Desktop CTA Button & Favorites */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setIsFavoritesModalOpen(true)}
            className="hover-lift transition-all duration-300 font-bold flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-mono bg-amber-500 hover:bg-amber-600 text-navyBlue shadow-lg shadow-amber-500/25 active:scale-95"
            title="Savatcha"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-navyBlue" />
            <span className="font-extrabold text-navyBlue">Savatcha</span>
            <span className="flex items-center justify-center bg-navyBlue text-amber-500 font-black text-[9px] w-5 h-5 rounded-full">
              {favorites.length}
            </span>
          </button>
          <MagneticButton 
            variant="primary" 
            onClick={handleTelegramRedirect}
            className="px-4 py-2.5 text-[9px] md:px-5 md:py-3 md:text-xs bg-royalBlue border-royalBlue hover:bg-navyBlue text-white"
          >
            Buyurtma berish
          </MagneticButton>
        </div>

        {/* Mobile Menu Panel (Slide-down dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-royalBlue/10 flex flex-col gap-4 pb-2">
            <a 
              href="#kitoblar" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-xs tracking-wider uppercase text-navyBlue font-medium py-1 px-2 hover:bg-navyBlue/5 rounded-xl transition-all"
            >
              Katalog
            </a>
            <a 
              href="#tarixiy-kitoblar" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-xs tracking-wider uppercase text-navyBlue font-medium py-1 px-2 hover:bg-navyBlue/5 rounded-xl transition-all"
            >
              Sovg'alar
            </a>
            <a 
              href="#afzalliklar" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-mono text-xs tracking-wider uppercase text-navyBlue font-medium py-1 px-2 hover:bg-navyBlue/5 rounded-xl transition-all"
            >
              Afzalliklar
            </a>
            
            <button 
              onClick={() => { setIsUmraModalOpen(true); setIsMobileMenuOpen(false); }}
              className="font-mono text-xs font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-full flex items-center justify-center gap-2 self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Umra Anjomlari
            </button>

            <button 
              onClick={() => { setIsFavoritesModalOpen(true); setIsMobileMenuOpen(false); }}
              className="font-mono text-xs font-bold text-navyBlue bg-amber-500 hover:bg-amber-600 px-5 py-2.5 rounded-full flex items-center justify-center gap-2 self-start shadow-md shadow-amber-500/10 active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-navyBlue" />
              <span>Savatcha</span>
              <span className="flex items-center justify-center bg-navyBlue text-amber-500 font-black text-[10px] w-5 h-5 rounded-full">
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => { handleTelegramRedirect(); setIsMobileMenuOpen(false); }}
              className="w-full bg-royalBlue text-white font-mono text-xs tracking-widest uppercase py-3.5 rounded-full font-bold shadow-md hover:bg-navyBlue transition-all duration-300"
            >
              Buyurtma berish
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen w-full relative flex items-end justify-start overflow-hidden">
        {/* Luxury Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920" 
            alt="Bright classical luxury library bookstore" 
            className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.05]"
          />
          {/* Dark overlay mask (navy/charcoal at 50% opacity) */}
          <div className="absolute inset-0 bg-[#071324]/50 z-0" />
          {/* Smooth gradient layer transitioning from light page background to dark top */}
          <div className="absolute inset-0 bg-gradient-to-t from-royalBg via-[#071324]/40 to-transparent z-0" />
        </div>

        {/* Hero Content (Lower third) */}
        <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 pb-20 md:pb-28">
          <span className="hero-fade-up font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-sky-300 mb-4 block font-bold">
            Premium Kitoblar va Sovg'alar Do'koni
          </span>
          <h1 className="hero-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] mb-8 drop-shadow-[0_4px_12px_rgba(7,19,36,0.6)]">
            Yuksak sifat va qulay narxlar
            <span className="hero-fade-up block font-drama text-sky-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3 font-normal">
              uyg'unligi — siz uchun.
            </span>
          </h1>
          <div className="hero-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <MagneticButton onClick={handleTelegramRedirect} className="bg-royalBlue text-white hover:bg-navyBlue">
              Telegram orqali bog'lanish
            </MagneticButton>
            <a 
              href="#kitoblar" 
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-sky-300 transition-colors flex items-center justify-center gap-2 py-4 px-2 hover-lift"
            >
              Katalogni ko'rish <ArrowRight className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </section>

      {/* DEDICATED SPECIAL SECTION: Umra Anjomlari Banner */}
      <section id="umra-banner" className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-navyBlue via-royalBlue to-navyBlue border border-royalBlue/30 text-white rounded-6xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Elegant gold mesh pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1600" 
              alt="Mesh overlay" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-navyBlue font-mono text-[10px] tracking-widest font-bold shadow-lg shadow-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> MAHSUS TO'PLAM
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight text-royalBg">
              Umra Anjomlari To'plami
            </h2>
            <p className="text-xs md:text-sm text-royalBg/85 leading-relaxed font-light">
              Muborak Umra safaringiz uchun maxsus jamlangan, yuqori sifatli eko-foydali anjomlar to'plami. Safaringiz davomida sizga hamroh bo'luvchi qulay joynamoz, tasbeh, zikr daftari va safar sovg'alari qutisi.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => setIsUmraModalOpen(true)}
              className="magnetic-btn relative overflow-hidden bg-navyBlue hover:bg-royalBlue text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold shadow-xl shadow-navyBlue/15"
            >
              Ko'rish va Buyurtma Berish <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC CATEGORY SHOWCASE (Tarixiy, Diniy, Sovg'alar, Umra Anjomlari) */}
      <section id="kitoblar" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
            Do'kon Kolleksiyalari
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-navyBlue mt-4">
            Bizning Aniq Yo'nalishlarimiz
          </h2>
          <p className="text-sm md:text-base text-slateMuted max-w-lg mx-auto mt-4 leading-relaxed font-light">
            Siz uchun maxsus saralangan premium kitoblar, tarixiy manbalar, diniy adabiyotlar va Umra safarlari uchun anjomlar.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Kitob yoki mahsulot nomini kiriting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-white border-2 border-navyBlue/20 rounded-full font-serif text-sm text-navyBlue placeholder-navyBlue/40 focus:outline-none focus:border-royalBlue focus:ring-1 focus:ring-royalBlue transition-all duration-300 shadow-md"
            />
            <Search className="w-5 h-5 text-navyBlue/50 absolute left-4.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-4.5 top-1/2 -translate-y-1/2 text-navyBlue/50 hover:text-navyBlue transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {searchQuery.trim() !== "" ? (
          /* Live Search Results */
          <div>
            <div className="mb-8 font-mono text-xs text-slateMuted tracking-wider uppercase">
              Qidiruv natijalari ({filteredProducts.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-white border border-royalBorder rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="h-48 w-full overflow-hidden rounded-3xl mb-6 relative flex items-center justify-center bg-royalBg">
                        <FavoriteHeart 
                          isFavorite={favorites.includes(product.id)} 
                          onClick={() => toggleFavorite(product.id)} 
                        />
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-royalBlue bg-royalBlueLight/50 px-2.5 py-1 rounded-full">{product.category}</span>
                      <h3 className="text-lg font-serif font-bold text-navyBlue mt-3 mb-2">{product.name}</h3>
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-4">
                        <span>Narxi:</span>
                        <span className="text-navyBlue text-sm font-extrabold">{product.price}</span>
                        <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(getTelegramPurchaseLink(product.name, product.image), '_blank')}
                      className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      Buyurtma berish <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slateMuted font-light">Bunday mahsulot topilmadi.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Standard Categories Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
            
            {/* Card 1: Kitoblar */}
            <div className="bg-white border border-royalBorder rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full overflow-hidden rounded-3xl mb-6 relative">
                  <img 
                    src="/images/tarixiy.jpg" 
                    alt="Kitoblar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Kitoblar</h3>
                <p className="text-xs md:text-sm text-slateMuted font-light leading-relaxed mb-6">
                  Siz izlagan barcha turdagi ma'naviy, ilmiy va tarixiy kitoblar to'plami.
                </p>
              </div>
              <button
                onClick={() => setIsKitoblarModalOpen(true)}
                className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Ko'rish va Buyurtma Berish <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Diniy Kitoblar */}
            <div className="bg-white border border-royalBorder rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full overflow-hidden rounded-3xl mb-6 relative">
                  <img 
                    src="/images/diniy.jpg" 
                    alt="Diniy Kitoblar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Diniy Kitoblar</h3>
                <p className="text-xs md:text-sm text-slateMuted font-light leading-relaxed mb-6">
                  Ma'naviy va ilmiy qadriyatlarimizni o'rganish uchun mo'ljallangan asarlar.
                </p>
              </div>
              <button
                onClick={() => setIsDiniyModalOpen(true)}
                className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Ko'rish va Buyurtma Berish <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Premium Sovg'alar */}
            <div className="bg-white border border-royalBorder rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full overflow-hidden rounded-3xl mb-6 relative">
                  <img 
                    src="/images/sovgalar.jpg" 
                    alt="Premium Sovg'alar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Premium Sovg'alar</h3>
                <p className="text-xs md:text-sm text-slateMuted font-light leading-relaxed mb-6">
                  Yaqinlaringiz uchun nafis va qadrli bo'lgan maxsus hadyalar to'plami.
                </p>
              </div>
              <button
                onClick={handleTelegramRedirect}
                className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Ko'rish va Buyurtma Berish <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 4: Umra Anjomlari (Visual Distinct / Highly Highlighted) */}
            <div className="bg-white border-2 border-amber-500 shadow-xl shadow-amber-500/5 rounded-5xl p-6 hover:shadow-2xl hover:border-amber-600 transition-all duration-500 flex flex-col justify-between group relative">
              <div>
                <div className="h-48 w-full overflow-hidden rounded-3xl mb-6 relative">
                  <span className="absolute top-4 right-4 z-10 bg-amber-500 text-navyBlue font-mono text-[9px] tracking-wider uppercase font-bold px-3 py-1 rounded-full shadow-md">
                    MAXSUS TO'PLAM
                  </span>
                  <img 
                    src="/images/umra.jpg" 
                    alt="Umra Anjomlari" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-navyBlue mb-3 flex items-center gap-2">
                  Umra Anjomlari 
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                </h3>
                <p className="text-xs md:text-sm text-slateMuted font-light leading-relaxed mb-6">
                  Muborak safarga otlanganlar uchun eng kerakli va yuqori sifatli to'plamlar.
                </p>
              </div>
              <button
                onClick={() => setIsUmraModalOpen(true)}
                className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Ko'rish va Buyurtma Berish <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </section>

      {/* Umra packages are now available inside the overlay modal popup */}

      {/* MISSION STATEMENT SECTION */}
      <section 
        id="philosophy" 
        ref={philosophySectionRef}
        className="relative border-y border-royalBorder py-28 md:py-40 px-6 overflow-hidden"
        style={{ backgroundColor: '#f8f7f4' }}
      >
        {/* Subtle warm texture background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1600" 
            alt="Soft texture" 
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="philosophy-fade-up font-mono text-[10px] tracking-[0.3em] uppercase text-royalBlue mb-8 font-bold border border-royalBlue/15 rounded-full px-5 py-2 bg-white/60">
            BIZNING MAQSADIMIZ
          </span>

          <h2 className="philosophy-fade-up text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif text-navyBlue leading-snug md:leading-tight font-bold tracking-tight max-w-2xl px-4">
            Biz xalqga bozordan yaqinroqmiz.
          </h2>

          <div className="philosophy-fade-up w-12 h-[2px] bg-royalBlue/30 rounded-full mt-10 mb-10"></div>
          
          <div className="philosophy-fade-up">
            <MagneticButton onClick={handleTelegramRedirect} className="bg-royalBlue text-white hover:bg-navyBlue">
              Telegram orqali bog'lanish
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* BRAND HIGHLIGHT SHOWCASE (Yaqinlaringiz uchun mukammal hadyalar) */}
      <section id="tarixiy-kitoblar" className="w-full bg-royalBg flex items-center justify-center px-6 md:px-16 py-24 border-t border-royalBorder">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="font-mono text-xs text-royalBlue tracking-[0.25em] uppercase block mb-4 font-bold">
              KATEGORIYA 01 // PREMIUM SOVG'ALAR
            </span>
            <h3 className="text-4xl md:text-5xl font-bold font-serif text-navyBlue mb-6 leading-tight">
              Yaqinlaringiz uchun mukammal hadyalar.
            </h3>
            <p className="text-slateDark text-sm md:text-base leading-relaxed mb-8 font-light">
              Yaqinlaringizga sovg'a izlashning endi hech qanday hojati yo'q. Qadrli va nafis to'plamlarning barchasi endi bizning do'konimizda mujassam.
            </p>
            <div className="font-mono text-xs text-royalBlue/70 space-y-2 border-l border-royalBlue/30 pl-4">
              <div>// PREMIUM SOVG'ALAR VA KITOB TO'PLAMLARI</div>
              <div>// EKSKLYUZIV QADOQLASH XIZMATI VA YETKAZIB BERISH</div>
            </div>
          </div>

          {/* Animation Graphic (Rotating brand logo with premium isolation mask) */}
          <div className="flex items-center justify-center p-8 bg-white border border-royalBorder rounded-6xl h-[300px] md:h-[400px] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-royalBlue/5 to-transparent pointer-events-none" />
            <img 
              src="/logo.png" 
              alt="Qalam Samarqand" 
              className="w-36 h-36 md:w-48 md:h-48 object-contain animate-[spin_40s_linear_infinite]"
              style={{ mixBlendMode: 'multiply', clipPath: 'circle(50%)' }}
            />
          </div>
        </div>
      </section>

      {/* STORE FEATURES GRID */}
      <section id="afzalliklar" className="py-24 md:py-36 px-6 md:px-12 bg-white border-t border-royalBorder relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
              Nima Uchun Biz?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-navyBlue mt-4">
              Sohaga Mos Afzalliklar
            </h2>
            <p className="text-sm md:text-base text-slateMuted max-w-lg mx-auto mt-4 leading-relaxed font-light">
              Mijozlarimizga doimo eng yaxshi tajribani taqdim etish — bizning asosiy maqsadimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Feature 1: Hamyonbop va Sifatli */}
            <div className="bg-royalBg border border-royalBorder rounded-5xl p-8 md:p-10 text-center hover:border-royalBlue/20 hover:shadow-2xl transition-all duration-500 shadow-xl group">
              <div className="w-16 h-16 mx-auto mb-6 bg-royalBlueLight/40 rounded-full flex items-center justify-center group-hover:bg-royalBlue/10 transition-colors duration-300">
                <BookOpen className="w-7 h-7 text-royalBlue" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Hamyonbop va Sifatli</h3>
              <p className="text-sm text-slateMuted font-light leading-relaxed">
                Sizga eng sara kitoblar va sovg'alarni bozordagidan ham qulayroq narxlarda taqdim etamiz.
              </p>
            </div>

            {/* Feature 2: Tezkor Yetkazib Berish */}
            <div className="bg-royalBg border border-royalBorder rounded-5xl p-8 md:p-10 text-center hover:border-royalBlue/20 hover:shadow-2xl transition-all duration-500 shadow-xl group">
              <div className="w-16 h-16 mx-auto mb-6 bg-royalBlueLight/40 rounded-full flex items-center justify-center group-hover:bg-royalBlue/10 transition-colors duration-300">
                <Truck className="w-7 h-7 text-royalBlue" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Tezkor Yetkazib Berish</h3>
              <p className="text-sm text-slateMuted font-light leading-relaxed">
                Buyurtmangizni O'zbekiston bo'ylab eng qisqa vaqt ichida xavfsiz yetkazib beramiz.
              </p>
            </div>

            {/* Feature 3: Bespoke Qadoqlash */}
            <div className="bg-royalBg border border-royalBorder rounded-5xl p-8 md:p-10 text-center hover:border-royalBlue/20 hover:shadow-2xl transition-all duration-500 shadow-xl group">
              <div className="w-16 h-16 mx-auto mb-6 bg-royalBlueLight/40 rounded-full flex items-center justify-center group-hover:bg-royalBlue/10 transition-colors duration-300">
                <Gift className="w-7 h-7 text-royalBlue" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navyBlue mb-3">Bespoke Qadoqlash</h3>
              <p className="text-sm text-slateMuted font-light leading-relaxed">
                Har bir kitob va sovg'ani nafis va premium qadoqlarda, hadya qilishga tayyor holatda yetkazamiz.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navyBlue text-white rounded-t-[3rem] md:rounded-t-[4rem] pt-20 pb-12 px-6 md:px-12 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-royalBg tracking-wider flex items-center gap-3">
              <img src="/logo.png" alt="Qalam logo" className="h-8 w-8 rounded-full border border-royalBlueLight/20 object-cover bg-white" />
              QALAM SAMARQAND
            </h3>
            <p className="text-xs md:text-sm text-royalBg/60 max-w-sm leading-relaxed font-light">
              Premium kitoblar va eksklyuziv sovg'alar do'koni. Sharq she'riyat devonlari, islomiy manbalar, Qur'on nusxalari va milliy hadya to'plamlari.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs text-royalBg/80 tracking-widest uppercase mb-4">Kategoriyalar</h4>
            <ul className="space-y-2 font-mono text-[10px] text-royalBg/40 uppercase tracking-widest">
              <li><a href="#kitoblar" className="hover:text-royalBlueLight transition-colors">Katalog</a></li>
              <li><a href="#tarixiy-kitoblar" className="hover:text-royalBlueLight transition-colors">Sovg'alar</a></li>
              <li><a href="#afzalliklar" className="hover:text-royalBlueLight transition-colors">Afzalliklar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs text-royalBg/80 tracking-widest uppercase mb-4">Ijtimoiy Tarmoqlar</h4>
            <ul className="space-y-2 font-mono text-[10px] text-royalBg/40 uppercase tracking-widest">
              <li>
                <a 
                  href="https://www.instagram.com/qalamsamarqand?igsh=ZmZvZzdmOWRqc2V3" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-royalBlueLight transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/QalamSamarqand" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-royalBlueLight transition-colors flex items-center gap-2"
                >
                  <TelegramIcon className="w-4 h-4" />
                  <span>Telegram Kanalimiz</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs text-royalBg/80 tracking-widest uppercase mb-4">Huquqiy</h4>
            <ul className="space-y-2 font-mono text-[10px] text-royalBg/40 uppercase tracking-widest">
              <li><a href="#" className="hover:text-royalBlueLight transition-colors">Maxfiylik Nizomi</a></li>
              <li><a href="#" className="hover:text-royalBlueLight transition-colors">Do'kon Shartlari</a></li>
              <li><a href="#" className="hover:text-royalBlueLight transition-colors">Kafolat Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-mono text-[10px] text-royalBg/40 tracking-wider">
            © 2019-2026 Qalam Samarqand. Yetti yillik ishonch va oliy sifat.
          </span>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[10px] text-emerald-400 tracking-[0.15em] uppercase">
              SAMARQAND MENEJERI JONLI EFIRDA
            </span>
          </div>
        </div>
      </footer>

      {/* Premium Overlay Modal for Umra Anjomlari */}
      {isUmraModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navyBlue/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-royalBg border border-royalBlue/10 rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-6xl max-h-[96vh] md:max-h-[90vh] overflow-y-auto shadow-2xl relative p-4 sm:p-6 md:p-10 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 md:mb-8 pb-4 border-b border-royalBorder">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
                  Safar Tayyorgarligi
                </span>
                <h2 className="text-xl md:text-4xl font-bold font-serif text-navyBlue mt-3">
                  Muborak Safar To'plamlari (Umra Anjomlari)
                </h2>
              </div>
              <button 
                onClick={() => setIsUmraModalOpen(false)}
                className="bg-navyBlue/5 hover:bg-navyBlue/10 text-navyBlue p-2 sm:p-3 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase font-bold"
              >
                <X className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            </div>

            {/* 3 Premium Packages Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              
              {/* Card 1: Ekonom To'plam */}
              <div className="bg-white border border-royalBorder rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-56 w-full overflow-hidden rounded-3xl mb-6 relative">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('u1')} 
                      onClick={() => toggleFavorite('u1')} 
                    />
                    <img 
                      src="/images/umra_ekonom.jpg" 
                      alt="Ekonom To'plam" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navyBlue mb-2">Ekonom To'plam</h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-4">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">1 000 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>

                  <ul className="space-y-2.5 font-mono text-[10px] text-slateDark mb-6 border-t border-royalBorder pt-4">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Ihrom kiyimi (100% paxta)</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Safar kamari (sozlanuvchan oq)</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Qulay joynamoz va tasbeh</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Zikr kitobi va safar yo'riqnomasi</li>
                  </ul>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Ekonom To'plam", "/images/umra_ekonom.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  Telegram orqali xarid qilish
                </button>
              </div>

              {/* Card 2: Standart To'plam */}
              <div className="bg-white border border-royalBlue/30 rounded-5xl p-6 shadow-xl hover:shadow-2xl hover:border-royalBlue/50 transition-all duration-500 flex flex-col justify-between group relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase font-bold px-4 py-1 rounded-full shadow-md z-10">
                  OMBOB TANLOV
                </div>
                <div>
                  <div className="h-56 w-full overflow-hidden rounded-3xl mb-6 relative">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('u2')} 
                      onClick={() => toggleFavorite('u2')} 
                    />
                    <img 
                      src="/images/umra_standart.jpg" 
                      alt="Standart To'plam" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navyBlue mb-2">Standart To'plam</h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-royalBlueLight text-royalBlue font-mono text-xs font-bold mb-4">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">1 500 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>

                  <ul className="space-y-2.5 font-mono text-[10px] text-slateDark mb-6 border-t border-royalBorder pt-4">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Ihrom kiyimi (Turkiya oliy paxtasi)</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Teri oyoq kiyimi / maxsus shippak</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Maxsus yelkaga osiladigan hamyon set</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Eko-joynamoz, tasbeh va zikr daftari</li>
                  </ul>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Standart To'plam", "/images/umra_standart.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  Telegram orqali xarid qilish
                </button>
              </div>

              {/* Card 3: Premium To'plam */}
              <div className="bg-white border-2 border-amber-500 shadow-xl shadow-amber-500/5 rounded-5xl p-6 hover:shadow-2xl hover:border-amber-600 transition-all duration-500 flex flex-col justify-between group relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-amber-500 text-navyBlue font-mono text-[9px] tracking-widest uppercase font-bold px-4 py-1 rounded-full shadow-md z-10">
                  VIP BUNDLE
                </div>
                <div>
                  <div className="h-56 w-full overflow-hidden rounded-3xl mb-6 relative">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('u3')} 
                      onClick={() => toggleFavorite('u3')} 
                    />
                    <img 
                      src="/images/umra_premium.jpg" 
                      alt="Premium To'plam" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navyBlue mb-2 flex items-center gap-2">
                    Premium To'plam
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-amber-500/10 text-amber-700 font-mono text-xs font-bold mb-4 border border-amber-500/20">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">2 000 000</span>
                    <span className="text-[10px] text-amber-700/80 font-semibold">so'm</span>
                  </div>

                  <ul className="space-y-2.5 font-mono text-[10px] text-slateDark mb-6 border-t border-royalBorder pt-4">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Premium turk paxtali ipaksimon ihrom</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Haqiqiy teri shippak va maxsus kamar</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Safar gigiyenik to'plami (hidsiz to'plam)</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-royalBlue" /> Hasamatli yong'oq yog'ochli sovg'a qutisi</li>
                  </ul>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Premium To'plam", "/images/umra_premium.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[10px] tracking-widest uppercase py-3.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  Telegram orqali xarid qilish
                </button>
              </div>

            </div>

            {/* Store Information Footer */}
            <div className="mt-10 p-6 rounded-3xl bg-royalBlueLight/30 border border-royalBlue/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Bizning Manzil</span>
                  <span className="text-xs font-medium">Samarqand shahar, Registon non bozorchasi ro'parasidagi "Qalam" kitoblar do'koni</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Telefon raqamlar</span>
                  <span className="text-xs font-medium flex flex-col sm:flex-row sm:gap-x-4">
                    <a href="tel:+998979162526" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 916 25 26</a>
                    <a href="tel:+998970252600" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 025 26 00</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Ijtimoiy tarmoqlar</span>
                  <span className="text-xs font-medium flex flex-wrap gap-x-4 gap-y-2">
                    <a 
                      href="https://t.me/QalamSamarqand" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <TelegramIcon className="w-4 h-4 text-royalBlue" />
                      Telegram
                    </a>
                    <a 
                      href="https://www.instagram.com/qalamsamarqand?igsh=ZmZvZzdmOWRqc2V3" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <InstagramIcon className="w-4 h-4 text-royalBlue" />
                      Instagram
                    </a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Premium Overlay Modal for Diniy Kitoblar */}
      {isDiniyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navyBlue/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-royalBg border border-royalBlue/10 rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-6xl max-h-[96vh] md:max-h-[90vh] overflow-y-auto shadow-2xl relative p-4 sm:p-6 md:p-10 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 md:mb-8 pb-4 border-b border-royalBorder">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
                  Ma'naviy Qadriyatlar
                </span>
                <h2 className="text-xl md:text-4xl font-bold font-serif text-navyBlue mt-3">
                  Diniy Kitoblar Kolleksiyasi
                </h2>
              </div>
              <button 
                onClick={() => setIsDiniyModalOpen(false)}
                className="bg-navyBlue/5 hover:bg-navyBlue/10 text-navyBlue p-2 sm:p-3 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase font-bold"
              >
                <X className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            </div>

            {/* 5 Premium Book Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
              
              {/* Book 1 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('b1')} 
                      onClick={() => toggleFavorite('b1')} 
                    />
                    <img 
                      src="/images/kitob_hadis_toplam.jpg" 
                      alt="Hadislar to'plami" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Hadislar to'plami
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">50 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Hadislar to'plami", "/images/kitob_hadis_toplam.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 2 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('b2')} 
                      onClick={() => toggleFavorite('b2')} 
                    />
                    <img 
                      src="/images/kitob_365_duo.jpg" 
                      alt="365 kunda duo" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    365 kunda duo
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">105 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("365 kunda duo", "/images/kitob_365_duo.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 3 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('b3')} 
                      onClick={() => toggleFavorite('b3')} 
                    />
                    <img 
                      src="/images/kitob_365_hadis.jpg" 
                      alt="365 kunda hadis" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    365 kunda hadis
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">105 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("365 kunda hadis", "/images/kitob_365_hadis.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 4 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('b4')} 
                      onClick={() => toggleFavorite('b4')} 
                    />
                    <img 
                      src="/images/kitob_paygambar_taniyman.jpg" 
                      alt="Payg'ambarimni taniyman" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Payg'ambarimni taniyman
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">107 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Payg'ambarimni taniyman", "/images/kitob_paygambar_taniyman.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 5 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('b5')} 
                      onClick={() => toggleFavorite('b5')} 
                    />
                    <img 
                      src="/images/kitob_paygambarlar_qissasi.jpg" 
                      alt="Payg'ambarlar qissasi" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Payg'ambarlar qissasi
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">84 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Payg'ambarlar qissasi", "/images/kitob_paygambarlar_qissasi.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Store Information Footer */}
            <div className="mt-10 p-6 rounded-3xl bg-royalBlueLight/30 border border-royalBlue/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Bizning Manzil</span>
                  <span className="text-xs font-medium">Samarqand shahar, Registon non bozorchasi ro'parasidagi "Qalam" kitoblar do'koni</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Telefon raqamlar</span>
                  <span className="text-xs font-medium flex flex-col sm:flex-row sm:gap-x-4">
                    <a href="tel:+998979162526" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 916 25 26</a>
                    <a href="tel:+998970252600" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 025 26 00</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Ijtimoiy tarmoqlar</span>
                  <span className="text-xs font-medium flex flex-wrap gap-x-4 gap-y-2">
                    <a 
                      href="https://t.me/QalamSamarqand" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <TelegramIcon className="w-4 h-4 text-royalBlue" />
                      Telegram
                    </a>
                    <a 
                      href="https://www.instagram.com/qalamsamarqand?igsh=ZmZvZzdmOWRqc2V3" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <InstagramIcon className="w-4 h-4 text-royalBlue" />
                      Instagram
                    </a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Premium Overlay Modal for Kitoblar */}
      {isKitoblarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navyBlue/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-royalBg border border-royalBlue/10 rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-6xl max-h-[96vh] md:max-h-[90vh] overflow-y-auto shadow-2xl relative p-4 sm:p-6 md:p-10 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 md:mb-8 pb-4 border-b border-royalBorder">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
                  Ma'naviy Va Ilmiy
                </span>
                <h2 className="text-xl md:text-4xl font-bold font-serif text-navyBlue mt-3">
                  Kitoblar Kolleksiyasi
                </h2>
              </div>
              <button 
                onClick={() => setIsKitoblarModalOpen(false)}
                className="bg-navyBlue/5 hover:bg-navyBlue/10 text-navyBlue p-2 sm:p-3 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase font-bold"
              >
                <X className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            </div>

            {/* 7 Premium Book Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* Book 1 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k1')} 
                      onClick={() => toggleFavorite('k1')} 
                    />
                    <img 
                      src="/images/kitob_er_xotin.jpg" 
                      alt="Er-xotinga nasihat" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Er-xotinga nasihat
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">115 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Er-xotinga nasihat", "/images/kitob_er_xotin.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 2 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k2')} 
                      onClick={() => toggleFavorite('k2')} 
                    />
                    <img 
                      src="/images/kitob_jannat_bostoni.jpg" 
                      alt="Jannat bo'stonidagi oilaviy oqshomlar" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Jannat bo'stonidagi oilaviy oqshomlar
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">107 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Jannat bo'stonidagi oilaviy oqshomlar", "/images/kitob_jannat_bostoni.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 3 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k3')} 
                      onClick={() => toggleFavorite('k3')} 
                    />
                    <img 
                      src="/images/kitob_oqshom_gozalliklari.jpg" 
                      alt="Oqshom go'zalliklari" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Oqshom go'zalliklari
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">94 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Oqshom go'zalliklari", "/images/kitob_oqshom_gozalliklari.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 4 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k4')} 
                      onClick={() => toggleFavorite('k4')} 
                    />
                    <img 
                      src="/images/kitob_qalbi_singanlarga.jpg" 
                      alt="Qalbi singanlarga" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Qalbi singanlarga
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">61 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Qalbi singanlarga", "/images/kitob_qalbi_singanlarga.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 5 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k5')} 
                      onClick={() => toggleFavorite('k5')} 
                    />
                    <img 
                      src="/images/kitob_binafsha_1.jpg" 
                      alt="Binafsha shu'lasi" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Binafsha shu'lasi
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">75 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Binafsha shu'lasi", "/images/kitob_binafsha_1.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 6 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k6')} 
                      onClick={() => toggleFavorite('k6')} 
                    />
                    <img 
                      src="/images/kitob_binafsha_2.jpg" 
                      alt="Binafsha shu'lasi 2" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Binafsha shu'lasi 2
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">85 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Binafsha shu'lasi 2", "/images/kitob_binafsha_2.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book 7 */}
              <div className="bg-white border border-royalBorder rounded-4xl p-5 shadow-xl hover:shadow-2xl hover:border-royalBlue/20 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="h-60 w-full overflow-hidden rounded-2xl mb-4 relative flex items-center justify-center bg-royalBg">
                    <FavoriteHeart 
                      isFavorite={favorites.includes('k7')} 
                      onClick={() => toggleFavorite('k7')} 
                    />
                    <img 
                      src="/images/kitob_qurondan_maktublar.jpg" 
                      alt="Qur'ondan maktublar" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm font-serif font-bold text-navyBlue mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    Qur'ondan maktublar
                  </h3>
                  
                  {/* Elegant Currency Wrapper */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-royalBlueLight/40 text-royalBlue font-mono text-xs font-bold mb-3">
                    <span>Narxi:</span>
                    <span className="text-navyBlue text-sm font-extrabold">75 000</span>
                    <span className="text-[10px] text-royalBlue/70 font-semibold">so'm</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(getTelegramPurchaseLink("Qur'ondan maktublar", "/images/kitob_qurondan_maktublar.jpg"), '_blank')}
                  className="w-full bg-navyBlue hover:bg-royalBlue text-white font-mono text-[9px] tracking-widest uppercase py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Store Information Footer */}
            <div className="mt-10 p-6 rounded-3xl bg-royalBlueLight/30 border border-royalBlue/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Bizning Manzil</span>
                  <span className="text-xs font-medium">Samarqand shahar, Registon non bozorchasi ro'parasidagi "Qalam" kitoblar do'koni</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Telefon raqamlar</span>
                  <span className="text-xs font-medium flex flex-col sm:flex-row sm:gap-x-4">
                    <a href="tel:+998979162526" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 916 25 26</a>
                    <a href="tel:+998970252600" className="hover:text-royalBlue hover:underline transition-colors font-mono font-bold">+998 (97) 025 26 00</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-navyBlue">
                <div className="p-3 bg-white rounded-full border border-royalBlue/15 shadow-sm text-royalBlue flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-royalBlue font-bold">// Ijtimoiy tarmoqlar</span>
                  <span className="text-xs font-medium flex flex-wrap gap-x-4 gap-y-2">
                    <a 
                      href="https://t.me/QalamSamarqand" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <TelegramIcon className="w-4 h-4 text-royalBlue" />
                      Telegram
                    </a>
                    <a 
                      href="https://www.instagram.com/qalamsamarqand?igsh=ZmZvZzdmOWRqc2V3" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-royalBlue hover:underline transition-colors font-semibold flex items-center gap-2"
                    >
                      <InstagramIcon className="w-4 h-4 text-royalBlue" />
                      Instagram
                    </a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Premium Overlay Modal for Savatcha (Shopping Cart) */}
      {isFavoritesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navyBlue/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-royalBg border border-royalBlue/10 rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-2xl max-h-[96vh] md:max-h-[85vh] overflow-y-auto shadow-2xl relative p-4 sm:p-6 md:p-8 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-royalBorder">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-royalBlue border border-royalBlue/20 rounded-full px-4 py-1.5 bg-royalBlueLight/30 font-bold">
                  Sizning Savatchangiz
                </span>
                <h2 className="text-xl md:text-3xl font-bold font-serif text-navyBlue mt-3">
                  Savatchangizdagi Mahsulotlar
                </h2>
              </div>
              <button 
                onClick={() => setIsFavoritesModalOpen(false)}
                className="bg-navyBlue/5 hover:bg-navyBlue/10 text-navyBlue p-2 sm:p-3 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase font-bold"
              >
                <X className="w-4 h-4" />
                <span>Yopish</span>
              </button>
            </div>

            {/* Favorites List */}
            {favorites.length > 0 ? (
              <div className="space-y-4">
                <div className="divide-y divide-royalBorder max-h-[45vh] overflow-y-auto pr-2">
                  {favorites.map(id => {
                    const product = ALL_PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="py-4 flex items-center justify-between gap-4 group">
                        <div className="flex items-center gap-3">
                          <div className="h-16 w-16 overflow-hidden rounded-xl border border-royalBorder bg-white flex items-center justify-center flex-shrink-0">
                            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div>
                            <span className="font-mono text-[8px] uppercase tracking-wider text-royalBlue bg-royalBlueLight/40 px-2 py-0.5 rounded">{product.category}</span>
                            <h4 className="text-sm font-serif font-bold text-navyBlue mt-1">{product.name}</h4>
                            <div className="font-mono text-xs text-navyBlue/60 mt-0.5">{product.price} so'm</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(id)}
                          className="p-2 rounded-full hover:bg-red-50 text-navyBlue/30 hover:text-red-500 transition-colors flex-shrink-0"
                          title="O'chirish"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Checkout Section */}
                <div className="border-t border-royalBorder pt-6 mt-6 space-y-4">
                  <div className="flex justify-between items-center font-serif text-lg font-bold text-navyBlue">
                    <span>Jami savatchada:</span>
                    <span>{favorites.length} ta mahsulot</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      const favoritedProducts = favorites.map(id => ALL_PRODUCTS.find(p => p.id === id)).filter(Boolean);
                      const listText = favoritedProducts.map((p, idx) => `${idx + 1}. ${p.name} - ${p.price} so'm`).join('\n');
                      const message = `Assalomu alaykum! Men quyidagi mahsulotlarni savatchamga qo'shdim va sotib olmoqchiman:\n\n${listText}\n\nHammasi mavjudmi?`;
                      window.open(`https://t.me/Abdurafiq_A?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full bg-royalBlue hover:bg-navyBlue text-white font-mono text-xs tracking-widest uppercase py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    Savatcha bo'yicha buyurtma berish <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <ShoppingCart className="w-12 h-12 text-navyBlue/20 mx-auto" />
                <p className="text-slateMuted font-light text-sm">Savatchangiz bo'sh. Mahsulotlarni savatchaga qo'shish uchun ularning yonidagi yurakcha tugmasini bosing.</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
