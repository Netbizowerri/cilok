import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/paintData';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge, Button, Modal, SectionHeading, BeforeAfterSlider } from '../components/ui';
import { MapPin, Landmark, Hammer, X, ClipboardList } from 'lucide-react';

interface ProjectsProps {
  onOpenConsultation: () => void;
}

export function ProjectsPage({ onOpenConsultation }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Commercial' | 'Residential' | 'Religious' | 'Government' | 'Hospitality'>('All');
  const [lightboxProject, setLightboxProject] = useState<typeof projects[0] | null>(null);

  // Filter projects based on selectedTab
  const filteredProjects = projects.filter(proj => {
    if (selectedCategory === 'All') return true;
    return proj.category === selectedCategory;
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
            eyebrow="Our Built Heritage Archive"
            heading="Our Projects Portfolio"
            subheading="Step inside major church auditoriums, boutique hotels, and offices decorated with Cilok materials."
            inverse
          />
        </div>
      </section>

      {/* Main Grid and filter tabs */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-muted/65 pb-6 mb-12">
            {(['All', 'Commercial', 'Residential', 'Religious', 'Government', 'Hospitality'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-brand-dark border border-brand-muted hover:border-brand-primary/55'
                }`}
              >
                {cat === 'All' ? 'All Sites' : cat}
              </button>
            ))}
          </div>

          {/* Masonry / Grid of projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(proj => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightboxProject(proj)}
                  className="bg-white rounded-3xl p-4 border border-brand-muted shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-brand-muted/40">
                      <img 
                        src={proj.image} 
                        alt={proj.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        {proj.category}
                      </div>
                      {proj.beforeImage && proj.afterImage && (
                        <div className="absolute top-3 right-3 bg-zinc-900 border border-zinc-750 text-brand-accent text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                          ⚡ BEFORE & AFTER
                        </div>
                      )}
                    </div>

                    {proj.location && (
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-brand-accent uppercase tracking-wider mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                    )}

                    <h3 className="font-display font-bold text-lg text-brand-dark mb-2 leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">
                      {proj.name}
                    </h3>
                    
                    <p className="text-xs text-text-soft leading-relaxed line-clamp-3 mb-6">
                      {proj.description}
                    </p>
                  </div>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-muted/20">
                    {proj.services.map((srv, i) => (
                      <span key={i} className="text-[9px] uppercase font-bold bg-brand-secondary/40 text-brand-primary px-2 py-0.5 rounded border border-brand-muted/10">
                        {srv}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white border border-brand-muted rounded-3xl p-8 max-w-md mx-auto shadow-sm">
              <span className="font-display font-bold text-lg text-brand-dark">No projects categorized under {selectedCategory} yet.</span>
              <p className="text-xs text-text-soft mt-1">Please explore our Commercial or Religious project archives for extensive showcases.</p>
            </div>
          )}

        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX MODAL TRIGGERED ON ELEMENT SELECTION */}
      <Modal
        isOpen={lightboxProject !== null}
        onClose={() => setLightboxProject(null)}
        title={lightboxProject ? lightboxProject.name : 'Project Showcase'}
      >
        {lightboxProject && (
          <div className="space-y-6">
            
            {/* Extended Image / Slider */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-muted/60 shadow">
              {lightboxProject.beforeImage && lightboxProject.afterImage ? (
                <BeforeAfterSlider 
                  before={lightboxProject.beforeImage} 
                  after={lightboxProject.afterImage} 
                  beforeLabel="BEFORE" 
                  afterLabel="AFTER CILOK MASTER"
                />
              ) : (
                <img 
                  src={lightboxProject.image} 
                  alt={lightboxProject.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute bottom-4 right-4 bg-brand-accent text-brand-dark px-3 py-1 text-xs font-extrabold uppercase tracking-widest rounded-full shadow z-10">
                {lightboxProject.category}
              </div>
            </div>

            {/* Coordinates list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-muted/75 text-xs font-semibold text-brand-dark">
              {lightboxProject.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                  <div>
                    <span className="text-[10px] text-text-soft uppercase block font-extrabold">Site Location</span>
                    <span>{lightboxProject.location}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-brand-accent shrink-0" />
                <div>
                  <span className="text-[10px] text-text-soft uppercase block font-extrabold">Primary Client</span>
                  <span>{lightboxProject.client}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-base text-brand-dark">Core Scope of Works</h4>
              <p className="text-xs md:text-sm text-text-soft leading-relaxed">
                {lightboxProject.description}
              </p>
            </div>

            {/* Services Done */}
            <div className="pt-4 border-t border-brand-muted/30">
              <span className="text-[10px] font-extrabold text-brand-accent uppercase tracking-wider block mb-2">Systems Installed</span>
              <div className="flex flex-wrap gap-2">
                {lightboxProject.services.map((srv, i) => (
                  <span key={i} className="text-xs font-semibold bg-brand-primary text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5 text-brand-accent" />
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation trigger action */}
            <div className="pt-5 border-t border-brand-muted/40 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setLightboxProject(null)}>
                Close Window
              </Button>
              <Button 
                variant="accent" 
                size="sm"
                onClick={() => {
                  setLightboxProject(null);
                  onOpenConsultation();
                }}
              >
                Inquire About Similar Build
              </Button>
            </div>

          </div>
        )}
      </Modal>

      {/* BOTTOM ACTION SECTION */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center text-white text-center overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/ZpMJ8vtQ/CILOK-13.jpg')" }}
      >
        {/* Dark high-contrast overlay */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <SectionHeading 
            eyebrow="Transformation Anchor"
            heading="Want Results Like These for Your Walls?"
            subheading="Our screeding is flatter, paints are vibrant, and weathering resistance stands firm. Schedule your assessment today."
            inverse
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button 
              id="cta-projects-order"
              variant="accent" 
              size="lg"
              onClick={() => window.location.href = '/products/order'}
              className="w-full sm:w-auto font-bold"
            >
              Get a Coating Estimate
            </Button>
            <Button 
              id="cta-projects-consult"
              variant="secondary" 
              size="lg"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-dark"
            >
              Consult site Engineers
            </Button>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
