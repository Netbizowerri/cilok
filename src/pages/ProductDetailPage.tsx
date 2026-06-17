import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { products, services } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, FAQAccordion, SectionHeading } from '../components/ui';
import { Check, ArrowRight, HelpCircle, ArrowLeft, Phone, Calendar } from 'lucide-react';

interface ProductDetailProps {
  onOpenConsultation: () => void;
}

export function ProductDetailPage({ onOpenConsultation }: ProductDetailProps) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);

  // Fallback if product not found
  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Get matching image based on slug
  const getProductImage = (slugStr: string) => {
    return 'https://i.ibb.co/4Z3sQTmP/CILOK-12.jpg';
  };

  // Find related products
  const relatedProducts = products.filter(p => p.slug !== product.slug).slice(0, 3);

  return (
    <PageWrapper>
      
      {/* Dynamic detailed product container */}
      <section className="py-24 md:py-32 bg-brand-surface border-b border-brand-muted/40">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Back button */}
          <Link 
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-brand-primary hover:text-brand-accent transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (55%) - Product Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">{product.category.toUpperCase()}</Badge>
                <span className="text-xs font-extrabold uppercase tracking-widest bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              </div>

              <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-brand-dark leading-tight">
                {product.name}
              </h1>

              <div className="text-sm md:text-base text-text-soft leading-relaxed space-y-4 font-light">
                <p>{product.longDescription}</p>
              </div>

              {/* Bullet Features (Checkmarks) */}
              <div className="pt-6 border-t border-brand-muted">
                <h3 className="font-display font-bold text-lg text-brand-dark mb-4">
                  Key Performance Characteristics
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-xs md:text-sm text-text-base">
                      <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compatible Services */}
              {product.compatibleServices.length > 0 && (
                <div className="pt-6 border-t border-brand-muted">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-accent mb-3">Compatible Site Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibleServices.map(srvSlug => {
                      const srv = services.find(s => s.slug === srvSlug);
                      if (!srv) return null;
                      return (
                        <Link 
                          key={srvSlug}
                          to={`/services/${srvSlug}`}
                          className="bg-brand-secondary/35 hover:bg-brand-secondary/70 border border-brand-muted text-brand-primary text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          {srv.name} Service
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Desktop inline CTAs */}
              <div className="pt-8 border-t border-brand-muted flex flex-wrap gap-4">
                <Button 
                  id={`btn-order-detail-${product.slug}`}
                  variant="primary" 
                  size="md"
                  onClick={() => navigate(`/products/order?product=${product.slug}`)}
                >
                  Order Formulation Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  id={`btn-consult-detail-${product.slug}`}
                  variant="secondary" 
                  size="md"
                  onClick={onOpenConsultation}
                >
                  Consult Paint Estimator
                </Button>
              </div>

            </div>

            {/* Right Column (45%) - Sticky Image */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-brand-muted">
                <img 
                  src={getProductImage(product.slug)} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* APPLICATION STEPS SECTION */}
      <section className="py-20 bg-white border-b border-brand-muted">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeading 
            eyebrow="Application Instructions"
            heading={`How to Apply ${product.name}`}
            subheading="Carefully compiled by our factory engineers to guarantee an immaculate finish on your building site."
            inverse/>

          <div className="space-y-6">
            {product.howToApply.map((step, idx) => (
              <div key={idx} className="flex gap-5 items-start p-5 rounded-2xl bg-brand-surface border border-brand-muted/75 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm md:text-base text-text-base leading-relaxed leading-relaxed font-semibold">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs ACCORDION */}
      <section className="py-20 bg-brand-surface border-b border-brand-muted/40">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeading 
            eyebrow="Technical FAQ"
            heading="Frequently Asked Questions"
            subheading="Clear, objective explanations on product washing, wall preparations, and chemical compositions."
            inverse/>
          <FAQAccordion items={product.faqs} />
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHeading 
            eyebrow="Related Formulations"
            heading="Recommended Product Pairings"
            subheading="These companion cements, textured sealers, or paints expand coverage and build durable wall systems."
            inverse/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <div 
                key={p.slug}
                className="bg-brand-surface border border-brand-muted rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-dark mb-2">{p.name}</h3>
                  <p className="text-xs text-text-soft line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                </div>
                <Link 
                  to={`/products/${p.slug}`}
                  className="text-xs font-bold text-brand-primary hover:text-brand-accent flex items-center mt-4 self-start"
                >
                  View Spec Sheet →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINIMAL MOBILE PINNED BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white border-t border-brand-muted flex gap-3 md:hidden shadow-[0_-4px_10px_rgba(13,31,60,0.08)]">
        <a 
          href={`tel:08037046594`}
          className="bg-brand-secondary text-brand-primary p-3 rounded-full flex items-center justify-center border border-brand-muted focus:outline-none"
        >
          <Phone className="w-5 h-5" />
        </a>
        <Button 
          variant="primary" 
          onClick={() => navigate(`/products/order?product=${product.slug}`)}
          className="flex-1 text-center py-3 text-xs"
        >
          Order {product.name} Now →
        </Button>
      </div>

    </PageWrapper>
  );
}
