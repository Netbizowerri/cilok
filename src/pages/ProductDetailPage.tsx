import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { products, services } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, SectionHeading } from '../components/ui';
import { Check, ArrowRight, ArrowLeft, Phone, Calendar } from 'lucide-react';

interface ProductDetailProps {
  onOpenConsultation: () => void;
}

const paintColors = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Off White', hex: '#F5F5F0' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Eggshell', hex: '#F0EAD6' },
  { name: 'Alabaster', hex: '#EDEADE' },
  { name: 'Snow White', hex: '#F6F6F6' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Sand', hex: '#C2B280' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Khaki', hex: '#C3B091' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Oatmeal', hex: '#E6D5B8' },
  { name: 'Biscuit', hex: '#F2E6D0' },
  { name: 'Light Grey', hex: '#D3D3D3' },
  { name: 'Warm Grey', hex: '#A9A9A9' },
  { name: 'Cool Grey', hex: '#8C92AC' },
  { name: 'Slate', hex: '#708090' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Stone', hex: '#928E85' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Graphite', hex: '#474A51' },
  { name: 'Pewter', hex: '#899499' },
  { name: 'Ash', hex: '#B2BEB5' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Baby Blue', hex: '#89CFF0' },
  { name: 'Steel Blue', hex: '#4682B4' },
  { name: 'Cobalt Blue', hex: '#0047AB' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Midnight Blue', hex: '#191970' },
  { name: 'Ocean Blue', hex: '#0077BE' },
  { name: 'Cornflower', hex: '#6495ED' },
  { name: 'Ice Blue', hex: '#A5D7E8' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Aqua', hex: '#00FFFF' },
  { name: 'Sage Green', hex: '#BCB88A' },
  { name: 'Olive Green', hex: '#556B2F' },
  { name: 'Mint Green', hex: '#98FB98' },
  { name: 'Emerald', hex: '#50C878' },
  { name: 'Forest Green', hex: '#228B22' },
  { name: 'Moss Green', hex: '#8A9A5B' },
  { name: 'Seafoam', hex: '#9FE2BF' },
  { name: 'Hunter Green', hex: '#355E3B' },
  { name: 'Pine', hex: '#01796F' },
  { name: 'Lime', hex: '#32CD32' },
  { name: 'Chartreuse', hex: '#7FFF00' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Lilac', hex: '#C8A2C8' },
  { name: 'Plum', hex: '#DDA0DD' },
  { name: 'Mauve', hex: '#E0B0FF' },
  { name: 'Orchid', hex: '#DA70D6' },
  { name: 'Violet', hex: '#7F00FF' },
  { name: 'Amethyst', hex: '#9966CC' },
  { name: 'Eggplant', hex: '#614051' },
  { name: 'Blush', hex: '#DE5D83' },
  { name: 'Rose', hex: '#FF007F' },
  { name: 'Dusty Rose', hex: '#C08080' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Salmon', hex: '#FA8072' },
  { name: 'Brick Red', hex: '#CB4154' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Raspberry', hex: '#E30B5C' },
  { name: 'Terracotta', hex: '#E2725B' },
  { name: 'Rust', hex: '#B7410E' },
  { name: 'Butter', hex: '#FFF4B0' },
  { name: 'Mustard', hex: '#FFDB58' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Peach', hex: '#FFE5B4' },
  { name: 'Amber', hex: '#FFBF00' },
  { name: 'Tangerine', hex: '#FF9966' },
  { name: 'Sunflower', hex: '#FFDA03' },
  { name: 'Apricot', hex: '#FBCEB1' },
  { name: 'Chocolate', hex: '#7B3F00' },
  { name: 'Espresso', hex: '#4E3524' },
  { name: 'Mocha', hex: '#967969' },
  { name: 'Walnut', hex: '#773F1A' },
  { name: 'Caramel', hex: '#AA6F33' },
  { name: 'Cinnamon', hex: '#D2691E' },
  { name: 'Chestnut', hex: '#954535' },
  { name: 'Taupe', hex: '#8B8589' },
];

export function ProductDetailPage({ onOpenConsultation }: ProductDetailProps) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* COLOR PALETTE SECTION */}
      <section className="py-20 bg-brand-surface border-b border-brand-muted/40">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeading
            eyebrow="Color Palette"
            heading="Explore Available Colors"
            subheading="Browse our curated selection of premium paint colors. Click a swatch to preview the shade."
            inverse/>

          <div>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-3">
              {paintColors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-full aspect-square rounded-xl border-2 transition-all ${
                    selectedColor === c.hex
                      ? 'border-brand-primary ring-2 ring-brand-primary/30 scale-105'
                      : 'border-zinc-700 hover:border-zinc-500'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            {selectedColor && (
              <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-zinc-700 shrink-0"
                  style={{ backgroundColor: selectedColor }}
                />
                <div>
                  <p className="text-sm font-bold text-white">
                    {paintColors.find((c) => c.hex === selectedColor)?.name}
                  </p>
                  <p className="text-xs text-zinc-400">{selectedColor}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* APPLICATION STEPS SECTION */}
      <section className="py-20 bg-zinc-950 border-b border-zinc-800/40">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeading 
            eyebrow="Application Instructions"
            heading={`How to Apply ${product.name}`}
            subheading="Carefully compiled by our factory engineers to guarantee an immaculate finish on your building site."
            inverse/>

          <div className="space-y-6">
            {product.howToApply.map((step, idx) => (
              <div key={idx} className="flex gap-5 items-start p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-semibold">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-20 bg-zinc-950">
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
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">{p.description}</p>
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
