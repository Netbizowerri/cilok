import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ProductOrderForm } from '../components/forms/ProductOrderForm';
import { SectionHeading } from '../components/ui';
import { Building, Truck, Clock, ShieldCheck } from 'lucide-react';

export function ProductOrderPage() {
  return (
    <PageWrapper>
      
      {/* Banner */}
      <section className="bg-brand-dark pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden text-center text-white select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.15),_transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <SectionHeading 
            eyebrow="Direct Distributor Coordinates"
            heading="Order Paint Products"
            subheading="Securely configure paint volumes and specific colors. Direct from our Limca Road factory lines to your building premises."
            inverse
          />
        </div>
      </section>

      {/* Main Form content and logistial guides */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* The main Order Form (col span 8) */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <ProductOrderForm />
            </div>

            {/* Side logistical guides (col span 4) */}
            <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
              
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-3xl border border-brand-muted/75 shadow-sm">
                <Truck className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-black mb-2">
                  Reliable Nationwide Shipping
                </h4>
                <p className="text-xs text-text-soft leading-relaxed">
                  We package, secure, and load your buckets directly onto transit carriers. Shipping is coordinated through Awka, Enugu, Port Harcourt, and Abuja depots to guarantee prompt transit times.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-3xl border border-brand-muted/75 shadow-sm">
                <Clock className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-black mb-2">
                  3-Day Prep Limit
                </h4>
                <p className="text-xs text-text-soft leading-relaxed">
                  Cilok Paint actively tints and packages formulations per order to guarantee chemical freshness. Because of this, please schedule your orders at least 3 business days before painters require them.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-3xl border border-brand-muted/75 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-brand-primary mb-4" />
                <h4 className="font-display font-bold text-base text-black mb-2">
                  Double Sealed Guarantee
                </h4>
                <p className="text-xs text-text-soft leading-relaxed">
                  Every metric bucket of Cilok Paint incorporates original anti-counterfeit seals and custom identification. Check that seals are fully intact upon delivery at your premises.
                </p>
              </div>

              {/* Card 4 - Factory details */}
              <div className="bg-brand-secondary/30 p-6 rounded-3xl border border-brand-muted/50">
                <Building className="w-8 h-8 text-brand-accent mb-4" />
                <h4 className="font-display font-bold text-base text-brand-primary mb-2">
                  Factory Pickup Available
                </h4>
                <p className="text-xs text-brand-primary leading-relaxed mb-4">
                  Contractors with custom logistics carriers can select "Factory Direct" pickup to receive material crates directly from our Nkpor-Onitsha loading bays.
                </p>
                <address className="not-italic text-xs font-bold text-black">
                  25 Limca Road (Opp. Mr Biggs),<br />
                  Nkpor Old Road, Anambra State
                </address>
              </div>

            </div>

          </div>

        </div>
      </section>

    </PageWrapper>
  );
}
