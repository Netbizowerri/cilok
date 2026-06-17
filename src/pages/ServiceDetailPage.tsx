import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { services, products } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, BeforeAfterSlider, SectionHeading } from '../components/ui';
import { Check, ClipboardList, Info, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface ServiceDetailProps {
  onOpenConsultation: () => void;
}

export function ServiceDetailPage({ onOpenConsultation }: ServiceDetailProps) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(s => s.slug === slug);

  // Redirect if service not found
  if (!service) {
    return <Navigate to="/services" replace />;
  }

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
          <Link 
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-brand-accent hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          <SectionHeading 
            eyebrow="Architectural Wall Coating Service"
            heading={service.name}
            subheading={service.tagline}
            inverse
          />
        </div>
      </section>

      {/* Main Core split description */}
      <section className="py-16 md:py-24 bg-brand-surface border-b border-brand-muted">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Col (55%): Description and ideal uses */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-brand-dark">
                  What is {service.name}?
                </h3>
                <p className="text-sm md:text-base text-text-soft leading-relaxed font-light">
                  {service.longDescription}
                </p>
              </div>

              {/* Ideal Use Cases */}
              <div className="pt-6 border-t border-brand-muted">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-accent mb-4">
                  Ideal Structural Environments:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.idealFor.map((useCase, i) => (
                    <span key={i} className="bg-white border border-brand-muted p-3 rounded-xl text-xs md:text-sm text-text-base flex items-center gap-2.5 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outstanding Differentiators */}
              <div className="pt-6 border-t border-brand-muted space-y-4">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-accent">
                  Why Cilok is the Expert Choice:
                </h4>
                <ul className="space-y-3">
                  {service.differentiators.map((diff, i) => (
                    <li key={i} className="flex gap-3 text-xs md:text-sm text-text-base">
                      <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Col (45%): Before / After Slider comparison */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <BeforeAfterSlider 
                before={service.beforeImage} 
                after={service.afterImage} 
                beforeLabel="Base Plaster / Old Coating"
                afterLabel={`Premium ${service.name}`}
              />
              <p className="text-center text-[11px] text-text-soft italic font-medium">
                * Drag or slide central handle to compare raw concrete plastering against our finished coatings.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TECHNICAL TIMELINE PROCESS STEPS */}
      <section className="py-20 bg-white border-b border-brand-muted">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeading 
            eyebrow="Precision Timeline"
            heading="Our Professional Application Process"
            subheading="Cilok Paint crews follow strict site parameters on wall dust, humidity, and dry periods to guarantee flawless coatings."
          />

          <div className="relative border-l-2 border-brand-primary/10 ml-4 md:ml-6 space-y-10 pl-8">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Node bubble */}
                <div className="absolute -left-12 top-0.5 bg-brand-primary font-bold text-xs text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-brand-dark mb-1">{step.title}</h4>
                  <p className="text-xs md:text-sm text-text-soft leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-20 bg-brand-surface border-b border-brand-muted/40">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Associated Formulations"
            heading="Paint Products Formulated for This Service"
            subheading="We specifically recommend packing these products to yield cohesive weather defense and correct sheens on site."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.relatedProducts.map(prodSlug => {
              const p = products.find(prod => prod.slug === prodSlug);
              if (!p) return null;
              return (
                <div 
                  key={prodSlug}
                  className="bg-white border border-brand-muted rounded-3xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-brand-accent block mb-2">{p.badge}</span>
                    <h3 className="font-display font-semibold text-lg text-brand-primary mb-2">{p.name}</h3>
                    <p className="text-xs text-text-soft line-clamp-2 mt-1 mb-6 leading-relaxed">{p.description}</p>
                  </div>
                  <Link 
                    to={`/products/${prodSlug}`}
                    className="text-xs font-bold text-brand-accent inline-flex items-center hover:text-brand-primary transition-colors"
                  >
                    Review Formulation Sheet 
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL WIDTH BOOKING BANNER */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-5">
          <ClipboardList className="w-12 h-12 text-brand-accent mx-auto mb-4" />
          <h2 className="font-display font-medium text-2xl md:text-3xl mb-3">Ready to Hire Our Painters for {service.name}?</h2>
          <p className="text-xs md:text-sm text-brand-secondary/80 leading-relaxed mb-8">
            Tell us about your property addresses and sqm dimensions. We will schedule an engineer to inspect structure cracks free of charge.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              id={`btn-book-service-${service.slug}`}
              variant="accent" 
              size="lg"
              onClick={() => navigate(`/services/book?service=${service.slug}`)}
            >
              Book {service.name} Now →
            </Button>
            <Button 
              id={`btn-quote-service-${service.slug}`}
              variant="secondary" 
              size="lg"
              onClick={onOpenConsultation}
              className="border-white text-white hover:bg-white hover:text-brand-dark"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
