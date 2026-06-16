import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ContactForm } from '../components/forms/ContactForm';
import { SectionHeading, Button } from '../components/ui';
import { Phone, Mail, MapPin, Building2, MessageCircle } from 'lucide-react';

export function ContactPage() {
  return (
    <PageWrapper>
      
      {/* Short banner Hero */}
      <section className="bg-brand-dark pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden text-center text-white select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.15),_transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <SectionHeading 
            eyebrow="Direct reach channels"
            heading="Contact Us & Distributors"
            subheading="Get directly in touch with our factory chemists, sales managers, or your nearest state distributor depots."
            inverse
          />
        </div>
      </section>

      {/* Main Core Split Layout */}
      <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-muted/40 animate-fade-in">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side (55%): Contact cards and Channels */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              
              <div className="space-y-4">
                <h3 className="font-display font-medium text-2xl text-brand-dark">Cilok Headquarters</h3>
                <p className="text-xs md:text-sm text-text-soft leading-relaxed font-light">
                  For wholesale volume pricing, contractor discounts, or paint container logistics questions, reach out to our primary Anambra headquarters.
                </p>
              </div>

              {/* Physical Channels Grid */}
              <div className="space-y-4">
                
                {/* Channel 1: Calling */}
                <div className="bg-white border border-brand-muted/75 p-5 rounded-2.5xl flex gap-4 items-start shadow-sm">
                  <div className="bg-brand-secondary/40 p-3 rounded-xl text-brand-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-soft uppercase font-extrabold tracking-wider block mb-1">Telephone Sales Office</span>
                    <a href="tel:08037046594" className="text-brand-primary hover:text-brand-accent text-sm font-bold block transition-colors">08037046594</a>
                    <a href="tel:08039556430" className="text-brand-primary hover:text-brand-accent text-sm font-bold block transition-colors">08039556430</a>
                  </div>
                </div>

                {/* Channel 2: Email */}
                <div className="bg-white border border-brand-muted/75 p-5 rounded-2.5xl flex gap-4 items-start shadow-sm">
                  <div className="bg-brand-secondary/40 p-3 rounded-xl text-brand-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-soft uppercase font-extrabold tracking-wider block mb-1">Sales & Correspondence</span>
                    <a 
                      href="mailto:cilokpaint@gmail.com" 
                      className="text-brand-primary hover:text-brand-accent text-sm font-bold block transition-colors"
                    >
                      cilokpaint@gmail.com
                    </a>
                  </div>
                </div>

                {/* Channel 3: Address */}
                <div className="bg-white border border-brand-muted/75 p-5 rounded-2.5xl flex gap-4 items-start shadow-sm">
                  <div className="bg-brand-secondary/40 p-3 rounded-xl text-brand-primary shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-soft uppercase font-extrabold tracking-wider block mb-1">Anambra Plant Address</span>
                    <address className="not-italic text-sm text-brand-dark font-medium leading-relaxed">
                      25 Limca Road (Opp. Mr Biggs),<br />
                      Nkpor Old Road, Anambra State, Nigeria
                    </address>
                  </div>
                </div>

              </div>

              {/* WhatsApp direct CTA */}
              <div className="bg-emerald-50 border border-emerald-100 hover:border-emerald-200 transition-all p-6 rounded-2.5xl flex flex-col sm:flex-row items-center gap-5 justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-emerald-950 flex items-center gap-1">
                    <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" /> WhatsApp Sales Chat
                  </h4>
                  <p className="text-xs text-emerald-800/80 mt-1">Get custom product price-lists and tint logs instantly in chat.</p>
                </div>
                <a 
                  href="https://wa.me/2348037046594?text=Hello%20Cilok%20Paint%2C%20I%20am%20inquiring%20about%20your%20paint%20and%20screeding%20products%20pricing." 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full flex items-center shadow-lg"
                >
                  Chat with Us
                </a>
              </div>

            </div>

            {/* Right Side (45%): Interactive Contact Form */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <ContactForm />
            </div>

          </div>

        </div>
      </section>

      {/* REGIONAL DISTRIBUTORS STATE BLOCK */}
      <section className="py-20 bg-white border-b border-brand-muted">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Depot Coordinates"
            heading="Authorized State Outlets"
            subheading="Need to pick up sealant buckets physically? Visit these authorized distributor coordinates or call store leads directly:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Awka */}
            <div className="bg-brand-surface p-6 rounded-3xl border border-brand-muted flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded inline-block mb-3">Anambra Hub</span>
                <h4 className="font-display font-bold text-base text-brand-dark mb-2">Awka Distributor</h4>
                <p className="text-xs text-text-soft leading-relaxed mb-4">
                  Serving Udoka Housing Estate, Agu-Awka development layouts, and capital ministries.
                </p>
              </div>
              <a href="tel:08037046594" className="text-brand-accent text-xs font-bold block hover:underline">Ph: 08037046594</a>
            </div>

            {/* Enugu */}
            <div className="bg-brand-surface p-6 rounded-3xl border border-brand-muted flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded inline-block mb-3">Enugu Depot</span>
                <h4 className="font-display font-bold text-base text-brand-dark mb-2">Enugu Distributor</h4>
                <p className="text-xs text-text-soft leading-relaxed mb-4">
                  Coordination of trans-shipments to Independence Layout, GRA, and Trans-Ekulu developers.
                </p>
              </div>
              <a href="tel:08037046594" className="text-brand-accent text-xs font-bold block hover:underline">Ph: 08037046594</a>
            </div>

            {/* Port Harcourt */}
            <div className="bg-brand-surface p-6 rounded-3xl border border-brand-muted flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded inline-block mb-3">Rivers State Hub</span>
                <h4 className="font-display font-bold text-base text-brand-dark mb-2">Port Harcourt Outlet</h4>
                <p className="text-xs text-text-soft leading-relaxed mb-4">
                  Distributing coastal weather-shield formulas to properties across high-humidity coastal sites.
                </p>
              </div>
              <a href="tel:08039556430" className="text-brand-accent text-xs font-bold block hover:underline">Ph: 08039556430</a>
            </div>

            {/* Abuja */}
            <div className="bg-brand-surface p-6 rounded-3xl border border-brand-muted flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded inline-block mb-3">FCT Capital</span>
                <h4 className="font-display font-bold text-base text-brand-dark mb-2">Abuja Coordinator</h4>
                <p className="text-xs text-text-soft leading-relaxed mb-4">
                  Supplying interior luxury, stucco, and Palace effects to Maitama, Asokoro, and Gwarinpa.
                </p>
              </div>
              <a href="tel:08039556430" className="text-brand-accent text-xs font-bold block hover:underline">Ph: 08039556430</a>
            </div>

          </div>

        </div>
      </section>

      {/* EMBEDDED GOOGLE MAPS IFRAME FOR PHYSICAL NKPOR-ONITSHA VERIFICATION */}
      <section className="relative h-[450px] w-full bg-brand-muted/30 border-b border-brand-muted overflow-hidden">
        <iframe 
          title="Cilok Paint Headquarters Factory on Limca Road, Nkpor, Anambra"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15871.21855663731!2d6.865322987158203!3d5.1311028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043f2f815ba0cb9%3A0xe5a363cedab19a32!2sNkpor%2C%20Onitsha!5e0!3m2!1sen!2sng!4v1718536102603!5m2!1sen!2sng" 
          className="absolute inset-0 w-full h-full border-0" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </PageWrapper>
  );
}
