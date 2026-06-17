import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Shield, Compass, Landmark, Hotel, Building2, Paintbrush, 
  ChevronRight, Quote, Plus, Star 
} from 'lucide-react';
import { Button, Badge, SectionHeading, BeforeAfterSlider } from '../components/ui';
import { products, services, projects, testimonials } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';

interface HomeProps {
  onOpenConsultation: () => void;
}

export function HomePage({ onOpenConsultation }: HomeProps) {
  const navigate = useNavigate();
  // HERO KEYWORD CYCLE
  const keywords = ['Silk Finish', 'Emulsion', 'Texcoat', 'Wall Screeding', 'Pearl Effect'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % keywords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen md:min-h-screen bg-black overflow-hidden flex items-center pt-44 sm:pt-48 md:pt-52 pb-24 md:pb-28">
        {/* Background Image Cover with All Three Paint Elements Visible */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <img 
            src="https://i.ibb.co/j9XTWhxp/CILOK-14.jpg" 
            alt="Cilok Paint Premium Hero Background" 
            className="w-full h-full object-cover object-center opacity-95 animate-kenburns"
            referrerPolicy="no-referrer"
          />
          {/* Sophisticated artistic overlays to keep text readable on left while letting the full image shine on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent/10 md:from-black md:via-black/45 md:to-transparent/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Decorative Gradients & SVG Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.45),_transparent)] pointer-events-none z-0" />
        
        {/* Subtle Paint Splatters at 4% opacity */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="paintSplatter" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M50 30 C 70 20, 80 40, 60 50 C 40 60, 30 40, 50 30 Z" fill="#D4FF00" />
                <path d="M150 120 C 160 110, 180 130, 170 140 C 160 150, 140 140, 150 120 Z" fill="#EF4444" />
                <circle cx="120" cy="50" r="8" fill="#D4FF00" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#paintSplatter)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full">
          {/* Hero text (Left 60%) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2 md:mb-4 inline-flex"
            >
              <span className="bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-[10px] md:text-xs uppercase font-extrabold tracking-widest px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-flex items-center gap-1.5 md:gap-2">
                <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" /> Established in Nigeria
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter leading-tight md:leading-none"
            >
              Nigeria’s Premier<br />
              <span className="text-brand-accent font-bold block mt-0.5 md:mt-1">Decorative Wall Coating</span>
            </motion.h1>

            {/* Cycling Word Showcase */}
            <div className="h-8 md:h-16 flex items-center text-lg md:text-4xl font-display font-medium text-brand-secondary/90 mt-2 md:mt-4">
              <span className="mr-2 text-white/50 text-sm md:text-3xl font-sans font-light">Crafting</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywords[currentWordIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-brand-accent border-b border-brand-accent/30 font-bold"
                >
                  {keywords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-xs sm:text-sm md:text-xl text-zinc-300 mt-4 md:mt-6 max-w-md md:max-w-xl leading-relaxed font-light"
            >
              From Silk and Emulsion to Tyrolean and Pearl effects—Cilok Paint formulation repels humidity and harsh tropical weather. Let's bring your vision to life.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-2.5 mt-6 md:mt-10"
            >
              <Button 
                variant="accent" 
                size="md"
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto text-xs md:text-sm font-extrabold px-6 py-3"
              >
                Explore Paint Products
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button 
                variant="secondary" 
                size="md"
                onClick={() => navigate('/services/book')}
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-dark text-xs md:text-sm px-6 py-3"
              >
                Book site Service
              </Button>
            </motion.div>
          </div>

          {/* Hero visual panel (Right 55%) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex lg:col-span-5 relative items-center justify-center lg:p-0"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600" 
                alt="Modern luxurious interior wall finished with Silk paint rendering smooth sheen colors" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
              
              {/* Dynamic Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white">
                <span className="text-[10px] text-brand-accent uppercase font-extrabold tracking-widest block mb-1">Featured Coating Finish</span>
                <h4 className="font-display font-medium text-lg leading-tight">Palace Pearlescent Swirls</h4>
                <p className="text-[11px] text-brand-secondary/80 mt-1">Lustrous mineral sand texture that glimmers naturally under daylight</p>
              </div>
            </div>

            {/* Small floating graphic card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-2xl border border-brand-muted shrink-0 hidden sm:flex items-center gap-3"
            >
              <div className="bg-brand-secondary p-2.5 rounded-full text-brand-primary">
                <Star className="w-5 h-5 fill-brand-accent text-brand-accent" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-primary block">Warranted</span>
                <span className="text-[11px] font-semibold text-text-soft">UV and Moisture Immune</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BRAND MARQUEE */}
      <section className="bg-[#0A0A0A] py-7 border-y border-zinc-900 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center gap-6 justify-between select-none">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-primary shrink-0 flex items-center gap-1.5 self-center font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-primary inline-block animate-ping" />
            Trusted across Nigeria:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-zinc-300 font-display font-medium text-sm md:text-base tracking-wide">
            <span className="flex items-center gap-2 text-zinc-200"><Landmark className="w-4 h-4 text-brand-primary" /> Diocesan Secretariats</span>
            <span className="flex items-center gap-2 text-zinc-200"><Hotel className="w-4 h-4 text-brand-primary" /> Luxury Hotels</span>
            <span className="flex items-center gap-2 text-zinc-200"><Building2 className="w-4 h-4 text-brand-primary" /> Commercial Complexes</span>
            <span className="flex items-center gap-2 text-zinc-200"><Paintbrush className="w-4 h-4 text-brand-primary" /> Industrial Yards</span>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS AT A GLANCE */}
      <section className="py-20 md:py-28 bg-[#FAFFF2] border-y border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Our Product Collection"
            heading="Premium Decorative Coatings"
            subheading="Scientifically crafted paint formulations, undercoats, and skirting boards built to survive tropical Downpours."
            inverse={false}
          />

          {/* Cards Grid (loads 8 products) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((prod) => (
              <motion.div
                key={prod.slug}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800/80 hover:border-brand-primary/40 shadow-md hover:shadow-xl transition-all flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-4">
                    <Badge variant={prod.category === 'prep' ? 'neutral' : 'primary'}>
                      {prod.category.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-extrabold tracking-wider bg-brand-accent/15 text-brand-accent px-2 py-0.5 rounded-full">
                      {prod.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">{prod.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                    {prod.description}
                  </p>
                </div>
                
                <Link 
                  to={`/products/${prod.slug}`}
                  className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:text-brand-accent transition-colors group mt-auto self-start"
                >
                  Learn Formulation Specs 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="dark" 
              size="md"
              onClick={() => navigate('/products')}
            >
              View All Products & Finishes →
            </Button>
          </div>
        </div>
      </section>

      {/* 4. SERVICES FEATURED PREVIEW */}
      <section className="py-20 md:py-28 bg-brand-surface border-y border-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Wall Application Guild"
            heading="Masterful Decorative Coatings"
            subheading="We don't just supply paint—our certified teams pre-treat, level, micro-screed, and coat your concrete with ultimate diligence."
            inverse={true}
          />

          <div className="space-y-24">
            {/* Row 1: Wall Screeding (services[1]) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <span className="text-xs text-brand-primary uppercase font-extrabold font-mono tracking-widest block mb-2">// Essential Under-Layer Setup</span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-4 uppercase">
                  Screeding to Mirror-Glass Smoothness
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6">
                  Poor plaster wave-bumps ruin expensive paint sheens. Cilok's specialized Wall Screeding service uses acrylic multi-coat wall putty and meticulous hand trowels to iron out masonry waves. Under light inspection, your walls will appear completely straight, uniform, and porous-sealed.
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {['Dual-axis micro level inspections on every wall', 'Increases topcoat spread capacity by 30%', 'Reduces paint peeling over decades'].map((pt, i) => (
                    <span key={i} className="text-xs md:text-sm font-semibold text-brand-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                      {pt}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="primary" size="sm" onClick={() => navigate('/services/wall-screeding')}>
                    Learn More Specs
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/services/book')}>
                    Book Screeding Now
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  <img 
                    src="https://i.ibb.co/Dffn1C0B/CILOK.jpg" 
                    alt="Screeding tools detailing and finishing plaster wall smooth"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Crackos Premium Finish (services[5]) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  <img 
                    src="https://i.ibb.co/hkss4Ph/CILOK-1.jpg" 
                    alt="Crackos premium antique crackle decorative finish"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <span className="text-xs text-brand-primary uppercase font-extrabold font-mono tracking-widest block mb-2">// Prestige Finishing</span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-4 uppercase">
                  Crackos Premium Textured Crackle
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6">
                  Transform master suites, grand feature backdrops, and luxury receiving columns into ultimate weathered-stone geological showpieces. Replicating the organic allure of antique travertine and earth fissures, Crackos is formulated from specialized high-elasticity structural minerals layered with hand-drawn gold or bronze vein stencils. A tactile masterpiece that continuously catches light and shadow with maximum distinction.
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {['Organic mineral crackle & antique travertine styling', 'Certified artisan hand-drawing for high-contrast fissures', 'Moisture-defying, scrub-immune protective glaze layer'].map((pt, i) => (
                    <span key={i} className="text-xs md:text-sm font-semibold text-brand-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                      {pt}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="primary" size="sm" onClick={() => navigate('/services/crackos-effect')}>
                    Explore Crackos Finish
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/services/book')}>
                    Book Premium Finish
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY CILOK PAINT */}
      <section className="py-20 md:py-28 bg-[#121212] relative overflow-hidden border-b border-zinc-900">
        {/* Abstract background vector elements */}
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <SectionHeading 
            eyebrow="Our Track Record"
            heading="Beauty · Durability · Expertise"
            subheading="Over twenty years formulated specifically to defend West African structures against rainfall and UV degradation."
            inverse={true}
          />

          {/* Stats layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900/90 rounded-2xl p-8 border border-zinc-800 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-4xl text-brand-primary mb-2">20+ Years</h3>
              <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-brand-accent mb-3">// Proven Experience</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Refining decorative coatings, white-cement formulations, and weathering defense paints since day one.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900/90 rounded-2xl p-8 border border-zinc-800 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-4xl text-brand-primary mb-2">100+ Projects</h3>
              <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-brand-accent mb-3">// Builds Completed</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Handing over massive diocese secretariats, churches, residences, and hotel complexes across Nigerian states.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900/90 rounded-2xl p-8 border border-zinc-800 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-4xl text-brand-primary mb-2">5 States</h3>
              <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-brand-accent mb-3">// Distributor Hubs</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Extensive networks in Awka, Enugu, Port Harcourt, and Abuja guarantee direct, secure shipping coordinates.
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-800 text-center shadow-2xl">
            <h4 className="font-display font-black uppercase text-brand-primary mb-2 tracking-tight">Formulated for the West African Climate</h4>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
              Nigeria undergoes complex climate cycles: months of grueling parching sun rays, dusty dry Harmattans, and violent tropical rain downpours. Cilok Paint utilizes elastomeric resins that expand and contract comfortably without cracking or harboring black water molds.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS PORTFOLIO */}
      <section className="py-20 md:py-28 bg-[#FAFFF2] border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Our Built Heritage"
            heading="Our Work Speaks"
            subheading="Step inside premium hotels, diocesan houses, and corporate complexes coated with the Cilok paint shield across Nigerian landmarks."
            inverse={false}
          />

          {/* Grid of 6 projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -6 }}
                className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 shadow-lg flex flex-col hover:shadow-2xl transition-all"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-zinc-800">
                  {proj.beforeImage && proj.afterImage ? (
                    <BeforeAfterSlider 
                      before={proj.beforeImage} 
                      after={proj.afterImage} 
                      beforeLabel="BEFORE CILOK" 
                      afterLabel="AFTER CILOK MASTER FINISH"
                    />
                  ) : (
                    <>
                      <img 
                        src={proj.image} 
                        alt={proj.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-brand-primary text-black text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                        {proj.category}
                      </div>
                    </>
                  )}
                </div>
                
                {proj.location && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent block mb-1">
                    {proj.location}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug line-clamp-1">
                  {proj.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {proj.services.map((srv, i) => (
                    <span key={i} className="text-[9px] font-bold bg-zinc-900 text-brand-primary border border-zinc-850 px-2 py-0.5 rounded">
                      {srv}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="dark" 
              size="md"
              onClick={() => navigate('/projects')}
            >
              View Full Portfolio Archive →
            </Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL SLIDER & CLIENT LOGOS */}
      <section className="py-20 md:py-28 bg-brand-dark text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.1),_transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <SectionHeading 
            eyebrow="Satisfied Building Committees"
            heading="Endorsements From the Field"
            subheading="Read testimonials from notable general developers and engineering contractors who depend on Cilok's product formulations."
            inverse
          />

          {/* Testimonial cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-2.5xl p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-brand-accent/50 mb-4" />
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed italic mb-6">
                    "{test.quote}"
                  </p>
                </div>
                <div className="flex flex-col border-t border-white/10 pt-4 mt-auto">
                  <span className="font-semibold text-xs text-white">{test.author}</span>
                  <span className="text-[10px] text-brand-accent uppercase font-bold mt-0.5">{test.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Notable institutional clients banner */}
          <div className="border-t border-white/10 pt-10 text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-accent block mb-8">Notable Organizations Served:</span>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-65">
              {['Paul-B Nigeria Ltd', 'Mode Nigeria Ltd', 'Tonimas Nigeria Ltd', 'Catholic Charismatic Renewal', 'Chikason Group'].map((org, i) => (
                <span key={i} className="font-display text-sm md:text-base text-white/80 tracking-widest font-semibold block uppercase">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER UNIT */}
      <section className="py-16 md:py-24 bg-[#070707] border-t border-zinc-900 text-white text-center relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,255,0,0.06),_transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 md:px-10 relative z-10">
          <SectionHeading 
            eyebrow="Transformation Call"
            heading="Ready to Transform Your Walls?"
            subheading="Book an appointment or request customized volume estimates from the Cilok factory production crew."
            inverse={true}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              id="cta-home-bottom-quote"
              variant="accent" 
              size="lg"
              onClick={() => navigate('/products/order')}
              className="w-full sm:w-auto"
            >
              Request a Free Quote
            </Button>
            <Button 
              id="cta-home-bottom-consultation"
              variant="secondary" 
              size="lg"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto"
            >
              Get free Site Consultation
            </Button>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
