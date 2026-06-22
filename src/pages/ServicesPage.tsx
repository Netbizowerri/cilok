import React from 'react';
import { motion } from 'motion/react';
import { services } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, SectionHeading } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Brush, Layers, Sparkles, PaintBucket, ZapOff, Crown, Hexagon, Grid, HelpCircle, Phone 
} from 'lucide-react';

interface ServicesProps {
  onOpenConsultation: () => void;
}

export function ServicesPage({ onOpenConsultation }: ServicesProps) {
  const navigate = useNavigate();

  // Map string to Lucide React icons
  const getServiceIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'Brush': return <Brush className="w-8 h-8 text-brand-primary" />;
      case 'Layers': return <Layers className="w-8 h-8 text-brand-primary" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-brand-primary" />;
      case 'PaintBucket': return <PaintBucket className="w-8 h-8 text-brand-primary" />;
      case 'ZapOff': return <ZapOff className="w-8 h-8 text-brand-primary" />;
      case 'Crown': return <Crown className="w-8 h-8 text-brand-primary" />;
      case 'Hexagon': return <Hexagon className="w-8 h-8 text-brand-primary" />;
      case 'Grid': return <Grid className="w-8 h-8 text-brand-primary" />;
      default: return <Brush className="w-8 h-8 text-brand-primary" />;
    }
  };

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
            eyebrow="Expert site operations"
            heading="Wall Finishing Services"
            subheading="Experience masterclass wall leveling, Venetian stucco, polystyrene installation, and classic coatings."
            inverse
          />
        </div>
      </section>

      {/* Services Grid (3 cols desktop, 1 col mobile) */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv) => {
              const isPremium = serv.slug === 'crackos-effect' || serv.slug === 'stucco' || serv.slug === 'ottochinto';
              return (
                <motion.div
                  key={serv.slug}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-950 rounded-2xl p-6 md:p-8 border border-zinc-800/80 hover:border-brand-primary/40 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon & Category Header */}
                      <div className="flex items-center justify-between gap-1 mb-6">
                        <div className="bg-zinc-900 p-4 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-800">
                          {getServiceIcon(serv.icon)}
                        </div>
                        {isPremium && (
                          <Badge variant="accent">Artisan Level</Badge>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-xl text-white mb-2">
                        {serv.name}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-6">
                        {serv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <Link 
                      to={`/services/${serv.slug}`}
                      className="text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors block"
                    >
                      View Process Details →
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(`/services/book?service=${serv.slug}`)}
                      className="px-4 py-1.5 text-xs font-bold"
                    >
                      Book Service
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Combined Consultation Callout */}
          <div className="mt-16 bg-gradient-to-br from-brand-primary to-brand-dark text-white rounded-3xl p-8 shadow-xl border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-accent/25 rounded-full blur-2xl" />
            
            <div className="max-w-2xl">
              <HelpCircle className="w-8 h-8 text-brand-accent mb-4" />
              <h3 className="font-display font-medium text-xl md:text-2xl text-white mb-2">
                Not sure which architectural wall finish matches?
              </h3>
              <p className="text-xs md:text-sm text-brand-secondary/80 leading-relaxed">
                Our site analysts can schedule a physical visit to inspect wall plaster moisture levels, dimensions, and structural settling. Let's draft a complete quotation for you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
              <Button 
                variant="accent" 
                size="md"
                onClick={onOpenConsultation}
              >
                Request a Free Consultation
              </Button>
              <a 
                href="tel:08039556430"
                className="bg-white/10 text-white border border-white/15 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white hover:text-brand-dark flex items-center justify-center gap-1.5 mt-1 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call: 08039556430
              </a>
            </div>
          </div>

        </div>
      </section>

    </PageWrapper>
  );
}
