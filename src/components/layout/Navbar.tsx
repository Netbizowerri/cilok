import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Umbrella, Menu, X, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui';
import { products, services } from '../../data/paintData';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'services' | null>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav bg-white/90 shadow-lg border-b border-brand-muted/20 py-2 md:py-3' 
            : 'bg-transparent pt-8 md:pt-5 pb-3.5 md:pb-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            id="nav-logo"
            to="/" 
            className="flex items-center gap-1.5 md:gap-2 group focus:outline-none"
          >
            <div className="bg-brand-primary p-1.5 md:p-2 rounded-lg text-black shadow-md group-hover:rotate-12 transition-transform duration-300">
              <Umbrella className="w-4 h-4 md:w-5 h-5" />
            </div>
            <span className={`font-display font-black text-base md:text-2xl leading-none tracking-tighter ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>
              CILOK PAINTS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home */}
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] font-mono font-semibold transition-colors hover:text-brand-accent ${
                isActive ? 'text-brand-accent border-b border-brand-accent pb-1' : 'text-zinc-300'
              }`}
            >
              Home
            </NavLink>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-zinc-300 hover:text-brand-accent py-2 focus:outline-none">
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-48 w-[450px] bg-[#121212] border border-zinc-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] p-6 grid grid-cols-2 gap-4 mt-1"
                  >
                    <div className="col-span-2 border-b border-zinc-800 pb-2 mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-brand-accent">// Paint Product Formulations</span>
                    </div>
                    {products.slice(0, 8).map((prod) => (
                      <Link
                        key={prod.slug}
                        to={`/products/${prod.slug}`}
                        className="p-2.5 rounded-lg hover:bg-zinc-900 transition-colors group focus:outline-none"
                      >
                        <h4 className="font-semibold text-xs text-white group-hover:text-brand-accent transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 font-sans">
                          {prod.description}
                        </p>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-zinc-800 text-center">
                      <Link to="/products" className="text-[10px] font-mono font-bold tracking-[0.1em] text-brand-primary hover:text-brand-accent transition-colors">
                        View All Products & Finishing Boards →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-zinc-300 hover:text-brand-accent py-2 focus:outline-none">
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-48 w-[500px] bg-[#121212] border border-zinc-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] p-6 grid grid-cols-2 gap-4 mt-1"
                  >
                    <div className="col-span-2 border-b border-zinc-800 pb-2 mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-brand-accent">// Expert Application Guild</span>
                    </div>
                    {services.map((serv) => (
                      <Link
                        key={serv.slug}
                        to={`/services/${serv.slug}`}
                        className="p-2.5 rounded-lg hover:bg-zinc-900 transition-colors group focus:outline-none"
                      >
                        <h4 className="font-semibold text-xs text-white group-hover:text-brand-accent transition-colors">
                          {serv.name}
                        </h4>
                        <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 font-sans">
                          {serv.description}
                        </p>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-zinc-800 text-center">
                      <Link to="/services" className="text-[10px] font-mono font-bold tracking-[0.1em] text-brand-primary hover:text-brand-accent transition-colors">
                        View All Architectural Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects */}
            <NavLink 
              to="/projects" 
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] font-mono font-semibold transition-colors hover:text-brand-accent ${
                isActive ? 'text-brand-accent border-b border-brand-accent pb-1' : 'text-zinc-300'
              }`}
            >
              Projects
            </NavLink>

            {/* About */}
            <NavLink 
              to="/about" 
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] font-mono font-semibold transition-colors hover:text-brand-accent ${
                isActive ? 'text-brand-accent border-b border-brand-accent pb-1' : 'text-zinc-300'
              }`}
            >
              About
            </NavLink>

            {/* Contact */}
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `text-[10px] uppercase tracking-[0.2em] font-mono font-semibold transition-colors hover:text-brand-accent ${
                isActive ? 'text-brand-accent border-b border-brand-accent pb-1' : 'text-zinc-300'
              }`}
            >
              Contact
            </NavLink>
          </nav>

          {/* Action Button & Menu Button */}
          <div className="flex items-center gap-4">
            <Button 
              id="cta-header-quote"
              variant="accent" 
              size="sm" 
              onClick={onOpenConsultation}
              className="hidden md:inline-flex"
            >
              Get a Free Quote →
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 md:p-2 rounded-full bg-brand-secondary/30 text-brand-dark hover:bg-brand-accent/20 transition-all lg:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4.5 h-4.5 md:w-5 md:h-5 text-brand-dark" />
              ) : (
                <Menu className="w-4.5 h-4.5 md:w-5 md:h-5 text-brand-dark" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-brand-dark/95 backdrop-blur-lg pt-24 pb-8 px-6 overflow-y-auto flex flex-col justify-between lg:hidden"
          >
            {/* Navigation links */}
            <div className="flex flex-col gap-6 mt-6">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-display text-2xl font-bold tracking-tight ${
                  isActive ? 'text-brand-accent' : 'text-white'
                }`}
              >
                Home
              </NavLink>

              {/* Products Sub Menu */}
              <div className="border-t border-white/10 pt-4">
                <span className="text-xs uppercase font-bold tracking-widest text-brand-accent mb-2.5 block">Products Catalogue</span>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  <Link 
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/85 text-sm font-semibold underline decoration-brand-accent/50 underline-offset-4 col-span-2 mb-1"
                  >
                    View All Products
                  </Link>
                  {products.slice(0, 8).map((prod) => (
                    <Link
                      key={prod.slug}
                      to={`/products/${prod.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white/70 text-xs py-1 hover:text-brand-accent"
                    >
                      {prod.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services Sub Menu */}
              <div className="border-t border-white/10 pt-4">
                <span className="text-xs uppercase font-bold tracking-widest text-brand-accent mb-2.5 block">Our Application Services</span>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  <Link 
                    to="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/85 text-sm font-semibold underline decoration-brand-accent/50 underline-offset-4 col-span-2 mb-1"
                  >
                    View All Services
                  </Link>
                  {services.map((serv) => (
                    <Link
                      key={serv.slug}
                      to={`/services/${serv.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white/70 text-xs py-1 hover:text-brand-accent"
                    >
                      {serv.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Standard single routes */}
              <NavLink 
                to="/projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-display text-2xl font-bold tracking-tight border-t border-white/10 pt-4 ${
                  isActive ? 'text-brand-accent' : 'text-white'
                }`}
              >
                Projects Portfolio
              </NavLink>

              <NavLink 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-display text-2xl font-bold tracking-tight ${
                  isActive ? 'text-brand-accent' : 'text-white'
                }`}
              >
                About Us
              </NavLink>

              <NavLink 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-display text-2xl font-bold tracking-tight ${
                  isActive ? 'text-brand-accent' : 'text-white'
                }`}
              >
                Distributors & Contact
              </NavLink>
            </div>

            {/* Bottom Actions and Contacts */}
            <div className="flex flex-col gap-4 mt-8 border-t border-white/10 pt-6">
              <Button 
                variant="accent" 
                size="lg" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center"
              >
                Get a Free Quote →
              </Button>
              <div className="flex flex-wrap items-center justify-between text-white/50 text-xs font-semibold px-2 mt-2">
                <span className="flex items-center gap-1.5 hover:text-brand-accent">
                  <Phone className="w-3.5 h-3.5" /> 
                  <a href="tel:08037046594">08037046594</a>
                </span>
                <span>cilokpaint@gmail.com</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
