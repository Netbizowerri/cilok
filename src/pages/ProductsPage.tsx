import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/paintData';
import { Badge, Button, SectionHeading } from '../components/ui';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Compass, HelpCircle, Phone, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProductsProps {
  onOpenConsultation: () => void;
}

export function ProductsPage({ onOpenConsultation }: ProductsProps) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'All' | 'Paints' | 'Putty' | 'Specialty'>('All');

  // Filter products based on selectedTab
  const filteredProducts = products.filter(prod => {
    if (selectedTab === 'All') return true;
    if (selectedTab === 'Paints') return prod.category === 'paint' || prod.category === 'texture';
    if (selectedTab === 'Putty') return prod.category === 'prep';
    if (selectedTab === 'Specialty') return prod.category === 'specialty' || prod.category === 'moulding';
    return true;
  });

  return (
    <PageWrapper>
      
      {/* Short banner Hero with Homepage Hero Background image */}
      <section className="relative bg-black pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden text-center text-white select-none">
        {/* Background Image Cover */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <img 
            src="https://i.ibb.co/k2yXg5sJ/Gemini-Generated-Image-2o63xb2o63xb2o63-1.png" 
            alt="Cilok Paint Premium Hero Background" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          {/* High contrast gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/85 pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <SectionHeading 
            eyebrow="Cilok Formulation Catalogue"
            heading="Premium Decorative Products"
            subheading="Expert-grade paints, texture coats, and ceiling materials designed for incredible longevity."
            inverse
          />
        </div>
      </section>

      {/* Grid and Tabs layout */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Products Grid (Left Col-span 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-brand-muted/60 pb-4">
                {(['All', 'Paints', 'Putty', 'Specialty'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTab === tab 
                        ? 'bg-brand-primary text-black shadow-md' 
                        : 'bg-white text-brand-dark border border-brand-muted hover:border-brand-primary/55'
                    }`}
                  >
                    {tab === 'All' ? 'All Products' : tab === 'Paints' ? 'Paints & Emulsions' : tab === 'Putty' ? 'Putties & Fillers' : 'Specialty POP'}
                  </button>
                ))}
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(prod => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      key={prod.slug}
                      className="bg-white rounded-3xl p-6 border border-brand-muted shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-4">
                          <span className="text-[10px] uppercase font-extrabold text-brand-accent tracking-widest block bg-brand-accent/15 px-2.5 py-1 rounded">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-text-soft font-bold capitalize select-none">
                            {prod.category}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg md:text-xl text-brand-dark mb-2">
                          {prod.name}
                        </h3>
                        <p className="text-xs md:text-sm text-text-soft line-clamp-3 mb-6">
                          {prod.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-brand-muted/20 flex items-center justify-between mt-auto">
                        <Link 
                          to={`/products/${prod.slug}`}
                          className="text-xs font-bold text-brand-primary inline-flex items-center hover:text-brand-accent group"
                        >
                          Technical Specs 
                          <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate(`/products/order?product=${prod.slug}`)}
                          className="px-4 py-1.5 text-xs font-bold"
                        >
                          Order Paint →
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

            {/* Sticky Sidebar (Right Col-span 4) */}
            <div className="lg:col-span-4 lg:relative">
              <div className="lg:sticky lg:top-28 col-span-1 space-y-6">
                
                {/* Free consultation helper */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-dark text-white p-6 rounded-3xl shadow-xl border border-white/5 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl" />
                  
                  <HelpCircle className="w-8 h-8 text-brand-accent mb-4" />
                  <h3 className="font-display font-medium text-lg md:text-xl text-white mb-2 leading-snug">
                    Need Help Choosing Formula Colors?
                  </h3>
                  <p className="text-xs text-brand-secondary/80 leading-relaxed mb-6">
                    Our paint chemists are happy to guide you on damp problems, concrete thickness values, and matching color schemes.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="accent" 
                      size="sm"
                      onClick={onOpenConsultation}
                      className="w-full text-xs font-bold"
                    >
                      Get free Consultation
                    </Button>
                    <a 
                      href="tel:08037046594"
                      className="text-xs text-brand-secondary/85 text-center font-bold tracking-wide hover:text-white flex items-center justify-center gap-1 mt-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Speak directly: 08037046594
                    </a>
                  </div>
                </div>

                {/* Distributor Network info */}
                <div className="bg-white p-6 rounded-3xl border border-brand-muted/70 shadow-sm">
                  <h4 className="font-display font-bold text-sm text-brand-dark mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                    <Compass className="w-4 h-4 text-brand-accent" /> Logistics Coverage
                  </h4>
                  <p className="text-xs text-text-soft leading-relaxed mb-4">
                    Packs are prepared from our factory on Limca Road, Nkpor, and can be shipped securely to sites in any of our distributor coordinate zones:
                  </p>
                  <ul className="space-y-2 text-xs font-bold text-brand-primary">
                    {['Awka Distributor Center', 'Enugu Distributor Center', 'Port Harcourt Distributor Store', 'Abuja Corporate Hub'].map((itm, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                        {itm}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

    </PageWrapper>
  );
}
