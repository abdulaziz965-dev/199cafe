import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Instagram,
  ArrowRight,
  Coffee,
  Leaf,
  Award,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1676028793913-d1b089954d10?w=1400&h=1800&fit=crop&auto=format",
  story1: "https://images.unsplash.com/photo-1573628684835-ca186702bbde?w=900&h=1100&fit=crop&auto=format",
  story2: "https://images.unsplash.com/photo-1761984336729-45a95d00df7e?w=900&h=700&fit=crop&auto=format",
  experienceBg: "https://images.unsplash.com/photo-1770206124597-801bdd953e2a?w=1800&h=1000&fit=crop&auto=format",
  drink1: "https://images.unsplash.com/photo-1513876585916-61d40895c50e?w=500&h=500&fit=crop&auto=format",
  drink2: "https://images.unsplash.com/photo-1749105862041-d7e03c78eccb?w=500&h=500&fit=crop&auto=format",
  drink3: "https://images.unsplash.com/photo-1587982704600-e5f79d652fe5?w=500&h=500&fit=crop&auto=format",
  drink4: "https://images.unsplash.com/photo-1622240760722-998b255f0501?w=500&h=500&fit=crop&auto=format",
  fav1: "https://images.unsplash.com/photo-1565252556328-92ee4a9a0983?w=700&h=800&fit=crop&auto=format",
  fav2: "https://images.unsplash.com/photo-1651241268906-38bde7268415?w=700&h=800&fit=crop&auto=format",
  fav3: "https://images.unsplash.com/photo-1749104028301-161eb396bd0b?w=700&h=800&fit=crop&auto=format",
  gallery1: "https://images.unsplash.com/photo-1785053370852-9c726873d447?w=600&h=600&fit=crop&auto=format",
  gallery2: "https://images.unsplash.com/photo-1669456920788-215ea17430c2?w=600&h=600&fit=crop&auto=format",
  gallery3: "https://images.unsplash.com/photo-1736901217577-8438e562922c?w=600&h=900&fit=crop&auto=format",
  gallery4: "https://images.unsplash.com/photo-1719156096011-cc4867ef94c8?w=600&h=600&fit=crop&auto=format",
  gallery5: "https://images.unsplash.com/photo-1561986810-4f3ba2f46ceb?w=600&h=900&fit=crop&auto=format",
  gallery6: "https://images.unsplash.com/photo-1697890191807-36238e23a0c9?w=600&h=600&fit=crop&auto=format",
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageReveal({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#EDE9E3] ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

const NAV_LINKS = ["Home", "Menu", "About", "Gallery", "Contact"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [reserveOpen, setReserveOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F8F6F3] text-[#1C1C1C]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-black/[0.06]"
            : "bg-white/60 backdrop-blur-md border border-black/[0.04]"
        } rounded-2xl px-6 py-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#9C6B3F] flex items-center justify-center">
              <Coffee size={15} className="text-white" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[17px] font-semibold tracking-tight text-[#1C1C1C] text-3d-dark">
              Café Elevate
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                style={{ fontFamily: "'Playfair Display', serif" }}
                className={`text-[15px] italic transition-colors duration-200 ${
                  activeSection === link ? "text-[#9C6B3F]" : "text-[#6A6A6A] hover:text-[#1C1C1C]"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setReserveOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#9C6B3F] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#8a5c33] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(156,107,63,0.35)]"
            >
              Reserve a Table
              <ArrowRight size={13} />
            </button>
            <button
              className="md:hidden text-[#1C1C1C]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-2 border-t border-black/[0.06] pt-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-left text-[16px] italic text-[#6A6A6A] hover:text-[#1C1C1C]"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => { setReserveOpen(true); setMenuOpen(false); }}
              className="mt-1 bg-[#9C6B3F] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl"
            >
              Reserve a Table
            </button>
          </motion.div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="Home" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 lg:pt-0 overflow-hidden">
        {/* Left */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-20 lg:py-0 order-2 lg:order-1">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-[#9C6B3F]/10 border border-[#9C6B3F]/20 rounded-full px-4 py-1.5 mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C6B3F]" />
              <span className="text-[12px] font-medium text-[#9C6B3F] tracking-wider uppercase">Specialty Coffee · Doha</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl md:text-6xl xl:text-[72px] font-semibold leading-[1.1] tracking-tight text-[#1C1C1C] mb-6 text-3d-dark"
            >
              Where Every
              <br />
              <em className="italic text-[#9C6B3F] text-3d-accent">Cup</em> Tells
              <br />a Story
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-[16px] leading-relaxed text-[#6A6A6A] max-w-sm mb-10">
              A sanctuary of craft coffee, seasonal pastries, and mindful moments — curated for those who appreciate the extraordinary in the everyday.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setReserveOpen(true)}
                className="group flex items-center gap-2.5 bg-[#1C1C1C] text-white text-[14px] font-medium px-7 py-3.5 rounded-2xl hover:bg-[#9C6B3F] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(156,107,63,0.35)]"
              >
                Reserve a Table
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <button onClick={() => scrollToSection('Menu')} className="flex items-center gap-2.5 text-[14px] font-medium text-[#1C1C1C] border border-black/10 px-7 py-3.5 rounded-2xl hover:border-[#9C6B3F] hover:text-[#9C6B3F] transition-all duration-200">
                Explore Menu
              </button>
            </div>
          </FadeUp>

          {/* Stats row */}
          <FadeUp delay={0.5}>
            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-black/[0.07]">
              {[
                { val: "4.9★", label: "Google Rating" },
                { val: "12K+", label: "Happy Guests" },
                { val: "6+", label: "Years of Craft" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-[#1C1C1C]">{s.val}</div>
                  <div className="text-[12px] text-[#6A6A6A] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — image */}
        <div className="relative order-1 lg:order-2 h-[55vw] lg:h-screen">
          <ImageReveal
            src={IMAGES.hero}
            alt="Barista pouring specialty coffee"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F8F6F3]/20 lg:to-[#F8F6F3]/60" />

          {/* Floating rating card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="absolute bottom-10 left-6 lg:-left-10 bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.12)] rounded-2xl p-4 flex items-center gap-3 w-52"
          >
            <div className="w-10 h-10 rounded-xl bg-[#9C6B3F]/10 flex items-center justify-center flex-shrink-0">
              <Star size={18} className="text-[#9C6B3F] fill-[#9C6B3F]" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-[#9C6B3F] fill-[#9C6B3F]" />
                ))}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[16px] font-semibold leading-none text-[#1C1C1C]">4.9 Rating</div>
              <div className="text-[11px] text-[#6A6A6A] mt-0.5">1,240+ reviews</div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="absolute top-10 right-6 bg-[#1C1C1C]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl p-4 text-white w-48"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Est.</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[18px] font-semibold leading-tight">Specialty Coffee<br />Since 2018</div>
            <div className="mt-2 flex items-center gap-1.5">
              <Award size={12} className="text-[#9C6B3F]" />
              <span className="text-[11px] text-white/60">SCA Certified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section id="About" className="py-24 lg:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <div className="h-px w-12 bg-[#9C6B3F]" />
            <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Our Story</span>
          </div>
        </FadeUp>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <FadeUp delay={0.1}>
            <ImageReveal
              src={IMAGES.story1}
              alt="Coffee being ground and brewed"
              className="rounded-[20px] h-[480px] lg:h-[580px]"
            />
          </FadeUp>
          <FadeUp delay={0.2}>
            <div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#1C1C1C] mb-6 text-3d-dark"
              >
                Born from a love of
                <br />
                <em className="italic text-[#9C6B3F] text-3d-accent">true craft</em>
              </h2>
              <p className="text-[16px] leading-[1.8] text-[#6A6A6A] mb-6">
                Café Elevate began in 2018 as a single-room espresso bar in the heart of Doha. Our founders — two barista champions from Copenhagen and Kyoto — shared a single belief: that exceptional coffee is inseparable from the space in which it is served.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#6A6A6A] mb-10">
                Today we source directly from small-lot farms across Ethiopia, Yemen, and Colombia, roasting in-house weekly to bring you coffee at peak expression.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { val: "24", label: "Origin Countries" },
                  { val: "8", label: "Brewing Methods" },
                  { val: "100%", label: "Direct Trade" },
                ].map((s) => (
                  <div key={s.label} className="border border-black/[0.08] rounded-2xl p-4">
                    <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#9C6B3F]">{s.val}</div>
                    <div className="text-[12px] text-[#6A6A6A] mt-1 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeUp delay={0.1} className="order-2 lg:order-1">
            <div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#1C1C1C] mb-6 text-3d-dark"
              >
                A space designed
                <br />to <em className="italic text-[#9C6B3F] text-3d-accent">slow you down</em>
              </h2>
              <p className="text-[16px] leading-[1.8] text-[#6A6A6A] mb-6">
                Every corner of Café Elevate was designed with the Japanese principle of <em>ma</em> — the beauty of negative space. Oak furniture, natural linen, warm light, and quiet music create an environment that invites you to stay a little longer.
              </p>
              <button className="group flex items-center gap-2.5 text-[14px] font-medium text-[#9C6B3F] hover:gap-3.5 transition-all duration-200">
                Read our full story <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="order-1 lg:order-2">
            <ImageReveal
              src={IMAGES.story2}
              alt="Minimalist café interior with wooden furniture"
              className="rounded-[20px] h-[380px] lg:h-[460px]"
            />
          </FadeUp>
        </div>
      </section>

      {/* ─── SIGNATURE DRINKS ─── */}
      <section id="Menu" className="py-24 lg:py-32 bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#9C6B3F]" />
                <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Signature Menu</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight text-3d-dark">
                Signature Drinks
              </h2>
              <p className="text-[15px] text-[#6A6A6A] max-w-xs md:text-right">
                Each recipe refined over hundreds of iterations. None compromised.
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {[
              {
                img: IMAGES.drink1,
                name: "Cascade Cappuccino",
                desc: "Double ristretto with micro-foamed oat milk, finished with an orange blossom swirl.",
                origin: "Ethiopia Yirgacheffe",
                note: "Floral · Citrus · Velvet",
                price: "32 QAR",
              },
              {
                img: IMAGES.drink2,
                name: "Kyoto Cold Brew",
                desc: "18-hour slow drip cold brew with a whisper of toasted sesame and brown sugar.",
                origin: "Colombia Huila",
                note: "Nutty · Sweet · Dark Chocolate",
                price: "36 QAR",
              },
              {
                img: IMAGES.drink3,
                name: "Pearl Flat White",
                desc: "Silky double espresso with steamed Jersey milk pulled to exactly 65°C.",
                origin: "Yemen Haraazi",
                note: "Caramel · Spice · Full Body",
                price: "28 QAR",
              },
              {
                img: IMAGES.drink4,
                name: "Amber Cortado",
                desc: "Equal parts espresso and warm milk with a hint of cardamom and raw honey.",
                origin: "Brazil Cerrado",
                note: "Honey · Almond · Smooth",
                price: "30 QAR",
              },
            ].map((drink, i) => (
              <FadeUp key={drink.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.09)" }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-[#F8F6F3] border border-black/[0.06] rounded-[20px] p-4 sm:p-5 group cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#EDE9E3]">
                    <img src={drink.img} alt={drink.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[18px] font-semibold text-[#1C1C1C]">
                        {drink.name}
                      </h3>
                      <span className="hidden sm:block h-px flex-1 bg-black/[0.06]" />
                      <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[18px] font-semibold text-[#9C6B3F] flex-shrink-0">
                        {drink.price}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#6A6A6A] leading-relaxed mb-2">{drink.desc}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Leaf size={11} className="text-[#9C6B3F]" />
                        <span className="text-[11px] font-medium text-[#9C6B3F]">{drink.origin}</span>
                      </div>
                      <span className="text-[11px] text-[#6A6A6A]/60">·</span>
                      <span className="text-[11px] text-[#6A6A6A]">{drink.note}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex ml-2">
                    <div className="w-9 h-9 rounded-full border border-black/[0.08] flex items-center justify-center group-hover:border-[#9C6B3F] group-hover:text-[#9C6B3F] transition-all duration-200 text-[#6A6A6A]">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="flex justify-center mt-10">
              <button onClick={() => scrollToSection('Menu')} className="flex items-center gap-2.5 border border-black/10 text-[14px] font-medium text-[#1C1C1C] px-8 py-3.5 rounded-2xl hover:border-[#9C6B3F] hover:text-[#9C6B3F] transition-all duration-200">
                View Full Menu <ArrowRight size={14} />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── CAFÉ EXPERIENCE ─── */}
      <section className="py-24 lg:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#9C6B3F]" />
            <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">The Experience</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight mb-14 max-w-xl text-3d-dark">
            More than coffee.<br />An entire atmosphere.
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="relative rounded-[24px] overflow-hidden h-[480px] lg:h-[600px] mb-10 bg-[#EDE9E3]">
            <img
              src={IMAGES.experienceBg}
              alt="Café Elevate interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-2xl md:text-3xl font-medium italic leading-snug max-w-lg">
                "Designed to feel like the best home you never had."
              </p>
              <p className="text-white/60 text-[13px] mt-2">— Sara Al-Mansoori, Interior Architect</p>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Coffee size={22} className="text-[#9C6B3F]" />,
              title: "Barista Counter",
              desc: "Watch your cup crafted in real-time at our open-plan espresso bar.",
            },
            {
              icon: <Leaf size={22} className="text-[#9C6B3F]" />,
              title: "Garden Terrace",
              desc: "An al fresco garden terrace with shade trees and ambient evening lighting.",
            },
            {
              icon: <Award size={22} className="text-[#9C6B3F]" />,
              title: "Cupping Sessions",
              desc: "Join our weekly cupping sessions led by our in-house SCA-certified trainer.",
            },
          ].map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-black/[0.06] rounded-[20px] p-7 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#9C6B3F]/10 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[20px] font-semibold mb-2.5">{f.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6A6A6A]">{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── CUSTOMER FAVORITES ─── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#9C6B3F]" />
              <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Guest Favourites</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight text-3d-dark">
                Most Loved
              </h2>
              <p className="text-[15px] text-[#6A6A6A] max-w-xs md:text-right">
                Chosen by over 12,000 guests across 6 years.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: IMAGES.fav1,
                tag: "#1 Best Seller",
                name: "Morning Ritual Set",
                desc: "Our signature cappuccino paired with a warm butter croissant and seasonal preserve.",
                price: "58 QAR",
              },
              {
                img: IMAGES.fav2,
                tag: "Staff Pick",
                name: "Matcha Mist Latte",
                desc: "Ceremonial-grade Japanese matcha whisked with cold oat milk and a touch of vanilla.",
                price: "42 QAR",
              },
              {
                img: IMAGES.fav3,
                tag: "New Arrival",
                name: "Honey Cardamom Drip",
                desc: "Single-origin Yemen pour-over sweetened with wildflower honey and ground cardamom.",
                price: "45 QAR",
              },
            ].map((item, i) => (
              <FadeUp key={item.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8F6F3] border border-black/[0.06] rounded-[20px] overflow-hidden group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="relative h-72 overflow-hidden bg-[#EDE9E3]">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#1C1C1C]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[20px] font-semibold mb-2">{item.name}</h3>
                    <p className="text-[13.5px] text-[#6A6A6A] leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[18px] font-semibold text-[#9C6B3F]">{item.price}</span>
                      <button className="text-[12px] font-medium text-[#1C1C1C] flex items-center gap-1.5 hover:text-[#9C6B3F] transition-colors duration-200">
                        Order Now <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 lg:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#9C6B3F]" />
            <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Testimonials</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight mb-14 text-3d-dark">
            Words from our guests
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Cascade Cappuccino is the finest I have had outside of Milan. The attention to milk texture alone tells you this is a team that truly cares.",
              name: "Layla Al-Rashidi",
              role: "Food Critic, Doha Life",
              stars: 5,
            },
            {
              quote: "Café Elevate is our weekly ritual now. The space is incredibly calming — it feels like Tokyo and Copenhagen had a beautiful child in the middle of West Bay.",
              name: "Mohammed Al-Thani",
              role: "Architect & Regular Guest",
              stars: 5,
            },
            {
              quote: "I have tried every specialty coffee shop in the city. None of them come close to the consistency and warmth you find here. Truly a hidden gem.",
              name: "Nour Khalifa",
              role: "Lifestyle Blogger",
              stars: 5,
            },
          ].map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-black/[0.06] rounded-[20px] p-7 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={13} className="text-[#9C6B3F] fill-[#9C6B3F]" />
                  ))}
                </div>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-[17px] leading-[1.65] text-[#1C1C1C] italic flex-1 mb-6"
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-black/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-[#9C6B3F]/15 flex items-center justify-center text-[#9C6B3F] font-semibold text-[14px]">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#1C1C1C]">{t.name}</div>
                    <div className="text-[12px] text-[#6A6A6A]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="Gallery" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <FadeUp>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-[#9C6B3F]" />
                  <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Gallery</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight text-3d-dark">
                  Life at Elevate
                </h2>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2.5 text-[13px] font-medium text-[#6A6A6A] hover:text-[#9C6B3F] transition-colors duration-200"
              >
                <Instagram size={16} />
                @cafeelevate.qa
              </a>
            </div>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-6 md:px-12 max-w-7xl mx-auto">
          {[
            { src: IMAGES.gallery1, className: "h-64 md:h-80", alt: "Guest enjoying coffee at Café Elevate" },
            { src: IMAGES.gallery2, className: "h-64 md:h-80", alt: "Couple at outdoor café table" },
            { src: IMAGES.gallery3, className: "h-64 md:h-80 row-span-1 md:row-span-2", alt: "Barista at counter" },
            { src: IMAGES.gallery4, className: "h-64 md:h-72", alt: "Woman reading by window" },
            { src: IMAGES.gallery5, className: "h-64 md:h-72 hidden md:block", alt: "Coffee beans closeup" },
            { src: IMAGES.gallery6, className: "h-64 md:h-64 col-span-2 md:col-span-1", alt: "Pastry display case" },
          ].map((img, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className={`relative overflow-hidden rounded-[16px] bg-[#EDE9E3] group cursor-pointer ${img.className}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                  <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── VISIT US ─── */}
      <section id="Contact" className="py-24 lg:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#9C6B3F]" />
            <span className="text-[12px] uppercase tracking-[0.15em] font-medium text-[#9C6B3F]">Visit Us</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl lg:text-5xl font-semibold leading-tight mb-14 text-3d-dark">
            Find your way to Elevate
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map placeholder */}
          <FadeUp delay={0.1}>
            <div className="rounded-[20px] overflow-hidden bg-[#EDE9E3] h-80 lg:h-[440px] relative">
              <div className="w-full h-full bg-gradient-to-br from-[#EDE9E3] to-[#D4CFC8] flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#9C6B3F] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(156,107,63,0.4)]">
                  <MapPin size={24} className="text-white" />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[18px] font-semibold text-[#1C1C1C] mb-1">Café Elevate</p>
                <p className="text-[14px] text-[#6A6A6A] text-center px-8">West Bay District, Al Maha Street<br />Doha, Qatar</p>
                <button className="mt-6 flex items-center gap-2 bg-white/80 text-[13px] font-medium text-[#1C1C1C] px-5 py-2.5 rounded-xl border border-black/10 hover:border-[#9C6B3F] hover:text-[#9C6B3F] transition-all duration-200">
                  Open in Maps <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Info panel */}
          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-5">
              <div className="bg-white border border-black/[0.06] rounded-[20px] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#9C6B3F]/10 flex items-center justify-center">
                    <Clock size={18} className="text-[#9C6B3F]" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[20px] font-semibold">Opening Hours</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { day: "Monday – Thursday", time: "7:00 AM – 10:00 PM" },
                    { day: "Friday", time: "8:00 AM – 11:30 PM" },
                    { day: "Saturday", time: "8:00 AM – 11:30 PM" },
                    { day: "Sunday", time: "9:00 AM – 9:00 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-[14px] py-1.5 border-b border-black/[0.05] last:border-0">
                      <span className="text-[#6A6A6A]">{h.day}</span>
                      <span className="font-medium text-[#1C1C1C]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-black/[0.06] rounded-[20px] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#9C6B3F]/10 flex items-center justify-center">
                    <Phone size={18} className="text-[#9C6B3F]" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[20px] font-semibold">Get in Touch</h3>
                </div>
                <div className="flex flex-col gap-2.5 text-[14px] text-[#6A6A6A] mb-6">
                  <p>+974 4444 5678</p>
                  <p>hello@cafeelevate.qa</p>
                  <p>West Bay District, Al Maha Street, Doha</p>
                </div>
                <button
                  onClick={() => setReserveOpen(true)}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#9C6B3F] text-white text-[14px] font-medium py-3.5 rounded-2xl hover:bg-[#8a5c33] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(156,107,63,0.35)]"
                >
                  Reserve a Table <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1C1C1C] text-white py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/[0.08]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#9C6B3F] flex items-center justify-center">
                  <Coffee size={15} className="text-white" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[17px] font-semibold">Café Elevate</span>
              </div>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-xs mb-6">
                A sanctuary of craft coffee and mindful moments in the heart of Doha. Specialty coffee since 2018.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#9C6B3F] hover:border-[#9C6B3F] transition-all duration-200">
                  <Instagram size={15} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] uppercase tracking-[0.15em] text-white/30 mb-5">Navigate</h4>
              <nav className="flex flex-col gap-3">
                {["Home", "Menu", "About", "Gallery", "Contact"].map((link) => (
                  <a key={link} href="#" className="text-[14px] text-white/50 hover:text-white transition-colors duration-200">{link}</a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-[12px] uppercase tracking-[0.15em] text-white/30 mb-5">Contact</h4>
              <div className="flex flex-col gap-3 text-[14px] text-white/50">
                <p>+974 4444 5678</p>
                <p>hello@cafeelevate.qa</p>
                <p>West Bay, Doha, Qatar</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-[12px] text-white/30">© 2024 Café Elevate. All rights reserved.</p>
            <p className="text-[12px] text-white/20">Designed by XenoSolutions · Tier 2 Template</p>
          </div>
        </div>
      </footer>

      {/* ─── RESERVATION MODAL ─── */}
      {reserveOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setReserveOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[24px] w-full max-w-md p-8 shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-7">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[26px] font-semibold text-[#1C1C1C]">Reserve a Table</h3>
                <p className="text-[13px] text-[#6A6A6A] mt-1">Availability confirmed within 2 hours.</p>
              </div>
              <button onClick={() => setReserveOpen(false)} className="text-[#6A6A6A] hover:text-[#1C1C1C] transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setReserveOpen(false); }}>
              {[
                { label: "Full Name", type: "text", placeholder: "Sara Al-Mansoori" },
                { label: "Phone Number", type: "tel", placeholder: "+974 5555 0000" },
                { label: "Date", type: "date", placeholder: "" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-[12px] font-medium text-[#6A6A6A] mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-[#F8F6F3] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#1C1C1C] outline-none focus:border-[#9C6B3F] transition-colors duration-200 placeholder:text-[#6A6A6A]/50"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[12px] font-medium text-[#6A6A6A] mb-1.5">Party Size</label>
                <select className="w-full bg-[#F8F6F3] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#1C1C1C] outline-none focus:border-[#9C6B3F] transition-colors duration-200">
                  {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                    <option key={n}>{n} {typeof n === "number" && n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-[#9C6B3F] text-white text-[14px] font-medium py-3.5 rounded-2xl hover:bg-[#8a5c33] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(156,107,63,0.35)]"
              >
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
