import React from 'react';
import { Link } from 'react-router-dom';
import { Umbrella, Phone, Mail, MapPin, Award, ShieldCheck, HelpCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-muted/10">
      
      {/* Upper Footer section (Distributorship Ribbon) */}
      <div className="bg-[#070707] py-8 border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary p-2.5 rounded-lg text-black">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm md:text-base text-white tracking-tight uppercase font-display">Authorized National Distributors</h4>
              <p className="text-xs text-zinc-400">Visit our stores or request direct shipping to your building site</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-center">
            {['Awka', 'Enugu', 'Port Harcourt', 'Abuja'].map((city) => (
              <span 
                key={city} 
                className="bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg border border-zinc-800 shadow-sm select-none"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Link Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
        
        {/* Brand Information Column */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-brand-primary p-2.5 rounded-lg text-black shadow-md">
              <Umbrella className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl leading-none tracking-tighter text-white">
                CILOK
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-accent">
                Synthesis Studio
              </span>
            </div>
          </Link>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Professional wall coating formulations designed precisely for tropical climate resilience. Enhancing homes, churches, and complexes across Nigeria since 2006.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-accent animate-pulse" /> Premium Quality
            </span>
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-brand-accent" /> Professional Crews
            </span>
          </div>
        </div>

        {/* Directory Navigator Page-by-Page */}
        <div>
          <h4 className="font-semibold text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent mb-6">// Quick Links</h4>
          <ul className="flex flex-col gap-3.5 text-sm font-medium text-zinc-300">
            <li>
              <Link to="/products" className="hover:text-brand-accent transition-colors">Our Paint Products</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-accent transition-colors">Wall Coating Services</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-brand-accent transition-colors">Portfolio & Showcase</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-accent transition-colors">Our Core Story</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-accent transition-colors">Contact / Distributors</Link>
            </li>
            <li>
              <Link to="/products/order" className="text-brand-primary hover:text-brand-accent font-bold transition-colors">Order Paint Form</Link>
            </li>
          </ul>
        </div>

        {/* FACTORY ADDRESS COLUMN */}
        <div>
          <h4 className="font-semibold text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent mb-6">// Our Factory Address</h4>
          <div className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
            <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
            <address className="not-italic">
              <strong className="text-white block mb-1 font-display">Cilok Factory Head Office</strong>
              25 Limca Road (Opp. Mr Biggs),<br />
              Nkpor Old Road,<br />
              Anambra State, Nigeria
            </address>
          </div>
        </div>

        {/* TELEPHONE & DIGITAL CHANNELS COLUMN */}
        <div>
          <h4 className="font-semibold text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent mb-6">// Contact Channels</h4>
          <ul className="flex flex-col gap-4 text-sm text-zinc-300 font-medium">
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Call Head Office</span>
                <a href="tel:08037046594" className="hover:text-brand-accent text-white font-semibold block transition-colors">08037046594</a>
                <a href="tel:08039556430" className="hover:text-brand-accent text-white font-semibold block transition-colors">08039556430</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Sales & Support</span>
                <a 
                  href="mailto:cilokpaint@gmail.com" 
                  className="hover:text-brand-accent text-white font-semibold block transition-colors"
                >
                  cilokpaint@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Footer Sub-section */}
      <div className="border-t border-zinc-900 py-8 bg-black/60">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
          <p>© {currentYear} Cilok Paint. All Rights Reserved. ...bring your vision to life.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-brand-accent transition-colors">Beauty Redefined</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <a href="https://wa.me/2348037046594" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors flex items-center gap-1">
               WhatsApp Support
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
