import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ServiceBookingForm } from '../components/forms/ServiceBookingForm';
import { SectionHeading } from '../components/ui';
import { Clipboard, ShieldEllipsis, CalendarCheck } from 'lucide-react';

export function ServiceBookingPage() {
  return (
    <PageWrapper>
      
      {/* Short Banner Hero with Homepage Hero Background image */}
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
            eyebrow="Architectural Contract Booking"
            heading="Book a Wall Finishing Service"
            subheading="Schedule highly skilled screeding crews and decorative paint applicators for your project."
            inverse
          />
        </div>
      </section>

      {/* Main split form and advisory cards */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in">
            
            {/* The main booking form (Col span 8) */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <ServiceBookingForm />
            </div>

            {/* Advisory notes column (Col span 4) */}
            <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
              
              {/* Note 1 */}
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-md">
                <Clipboard className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-white mb-2">
                  1. Free Site Assessment
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Upon form receipt, a Cilok project evaluator schedules a secure site inspection visit. This allows us to inspect concrete moisture levels, structure cracks, and verify exact wall dimensions directly.
                </p>
              </div>

              {/* Note 2 */}
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-md">
                <CalendarCheck className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-white mb-2">
                  2. Timing & Logistical Layout
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Please book services at least 5 business days in advance. This ensures our logistical managers pre-pack materials from our factory and deploy painters seamlessly.
                </p>
              </div>

              {/* Note 3 */}
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-md">
                <ShieldEllipsis className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-white mb-2">
                  3. Performance Guarantee
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hiring certified Cilok coaters unlocks an official structural performance contract. We guarantee that varnishes, sheens, and texturing aggregates won't peel, yellow, or crack under tropical cycles.
                </p>
              </div>

              {/* Direct callout */}
              <div className="bg-brand-primary/10 border border-brand-primary/15 rounded-3xl p-6 text-center">
                <p className="text-xs font-semibold text-brand-primary">
                  Under strict construction deadlines?<br />
                  Speak to our logistics director directly:
                </p>
                <div className="font-display font-bold text-lg md:text-xl text-brand-accent mt-2 leading-tight">
                  <a href="tel:08039556430">08039556430</a><br />
                  <a href="tel:08037046594" className="text-brand-primary text-xs">08037046594</a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </PageWrapper>
  );
}
