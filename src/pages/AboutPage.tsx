import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, SectionHeading } from '../components/ui';
import { ShieldCheck, Snowflake, FlaskConical, Map, Landmark, PhoneCall } from 'lucide-react';

export function AboutPage() {
  const navigate = useNavigate();
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
            eyebrow="Our Corporate Heritage"
            heading="About Cilok Paint"
            subheading="Enhancing landmarks across Nigeria with resilient, premium wall coatings for over two decades."
            inverse
          />
        </div>
      </section>

      {/* Brand story section */}
      <section className="py-16 md:py-24 bg-zinc-950 border-b border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="primary">OUR HISTORY</Badge>
            <h2 className="font-display font-medium text-3xl md:text-4xl text-white leading-snug">
              Beauty Redefined ...bring your vision to life.
            </h2>
            <div className="text-sm md:text-base text-zinc-400 leading-relaxed space-y-4 font-light">
              <p>
                Founded on the values of absolute structural durability and aesthetic visual balance, Cilok Coating and Technical Services Ltd has grown from a specialized technical paint workshop in Anambra State to a trusted national wall coating brand, producing Cilok Paint. 
              </p>
              <p>
                We realized early on that standard international paints often fail under the punishing sun, sudden moisture drenching, and parching Harmattan dust storms characteristic of the West African climate. This led to our creation of climate-specific formulations with superior polyurethane binders and elastomeric properties.
              </p>
              <p>
                Today, Cilok Paint works directly with prominent master developers, building committees, church archdioceses, and hotel design contractors. From premium Silk, high-opacity matte Emulsion and aggregate Texcoat to Venetian Stucco and pearlescent Palace effects—our mission remains clear: to protect and redefine the beauty of every wall system we coat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-brand-muted">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" 
                alt="Architects consulting on wall colors using paint boards" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* THREE VALUE PROPOSITIONS */}
      <section className="py-20 bg-brand-surface border-b border-brand-muted">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Resilience Engineering"
            heading="Why Cilok Stands Firm"
            subheading="Every gallon of paint mixed at our factory lines is engineered for superior structural adhesion."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800/80 hover:border-brand-primary/40 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Tropical Formulation</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
                Incorporates high-grade cross-linking acrylic resins that actively resist peeling, color fading, and chalking caused by intense ultraviolet sun radiation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800/80 hover:border-brand-primary/40 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Anti-Mold rain shield</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
                Formulated with advanced anti-microbial biocide additives that prevent black algae, water trails, and biological moss from taking root on masonry plasters.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800/80 hover:border-brand-primary/40 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Dust & Wash Resistance</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
                Our Silk and Emulsion surfaces possess high scrub-resistance indices, allowing you to wipe off everyday mud splashes easily without losing paint luster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORY AND LOGISTICAL DEPOT DATA */}
      <section className="py-20 bg-zinc-950 border-b border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-brand-secondary/30 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <h4 className="font-display font-bold text-lg text-brand-primary uppercase tracking-wide">Factory Headquarters</h4>
              <p className="text-xs md:text-sm text-brand-primary font-semibold leading-relaxed">
                Our ultra-modern manufacturing plant houses automated vertical bead mills, high-speed dispersion tanks, and color-match spectrometers. We produce up to 50,000 liters of paint daily to meet large commercial construction schedules securely.
              </p>
              <div className="text-xs font-bold text-white border-t border-zinc-800 pt-3">
                <span className="block text-[10px] uppercase font-bold text-brand-accent tracking-wider mb-1">Physical Address</span>
                25 Limca Road (Opp. Mr Biggs),<br />
                Nkpor Old Road, Anambra State
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <Badge variant="accent">QUALITY CONTROL</Badge>
            <h3 className="font-display font-medium text-2xl lg:text-3xl text-white leading-snug">
              Quality Control
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              At Cilok Paint, we ensure that products meet defined standards before, during and after manufacturing to ensure durability, viscosity, opacity, colour accuracy and general customer satisfaction.
            </p>
          </div>

        </div>
      </section>

      {/* MAP AND NATIONAL DISTRIBUTORS COLUMN */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Logistical Coordinates"
            heading="Distribution Hubs across Nigeria"
            subheading="Cilok maintains fully stocked distributor stores across multiple major nodes, facilitating simple, rapid site deliveries."
            inverse
          />

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-base md:text-lg text-text-soft leading-relaxed">
              We have a nationwide coverage that transcends barriers to reach you no matter your location.
            </p>
            <div className="border-t border-brand-muted/40 pt-6">
              <p className="text-sm md:text-base text-brand-primary leading-relaxed font-semibold">
                In collaboration with <span className="text-brand-accent">GO WORLD REAL ESTATE LTD.</span>
              </p>
              <p className="text-xs md:text-sm text-text-soft leading-relaxed mt-2">
                We serve as agent/distributor (in Nigeria) to <span className="text-brand-accent font-semibold">TERRACO GROUP</span>, a Swedish global leader in the formulation and distribution of Premium Paint, Architectural facade, Tiles adhesive etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHOS REPEATING BUSINESS WITH US - BRANDS BOARD */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <SectionHeading 
            eyebrow="Contract Partners"
            heading="General Contractors Relying on Cilok"
            subheading="These notable engineering, architecture, and holding corporations select Cilok Paint for major institutional commissions."
            inverse
          />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center justify-center pt-4 opacity-75">
            {['Paul-B Nigeria', 'Mode Nigeria', 'Tonimas Group', 'Chikason Group', 'Catholic Charismatic Renewal'].map((contractor, i) => (
              <div key={i} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 font-display font-bold text-sm tracking-widest uppercase text-white">
                {contractor}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Anchor to contact page */}
      <section className="relative py-16 md:py-20 bg-cover bg-center text-white text-center overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/ZpMJ8vtQ/CILOK-13.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="max-w-3xl mx-auto px-5 relative z-10">
          <PhoneCall className="w-12 h-12 text-brand-accent mx-auto mb-4 animate-bounce" />
          <h3 className="font-display font-medium text-2xl mb-3">Partner with Nigeria’s Finest Decorators</h3>
          <p className="text-xs sm:text-sm text-brand-secondary/85 leading-relaxed mb-6">
            Have an extensive commercial, private development, or religious cathedral project coming up? Connect with our business directors today.
          </p>
          <Button 
            id="btn-about-cta"
            variant="accent" 
            size="lg"
            onClick={() => navigate('/contact')}
          >
            Get in Touch Today
          </Button>
        </div>
      </section>

    </PageWrapper>
  );
}
