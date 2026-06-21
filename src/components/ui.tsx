import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, X } from 'lucide-react';

// BADGE COMPONENT
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'neutral' | 'red';
}
export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const classes = {
    primary: 'bg-brand-primary/10 text-brand-primary border-brand-primary/25',
    accent: 'bg-brand-accent/10 text-brand-accent border-brand-accent/25',
    neutral: 'bg-brand-muted/50 text-text-base border-brand-muted',
    red: 'bg-brand-red/10 text-brand-red border-brand-red/25',
  }[variant];
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${classes}`}>
      {children}
    </span>
  );
}

// BUTTON COMPONENT
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'red' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
export function Button({ variant = 'primary', size = 'md', children, className = '', id, onClick, type = 'button', disabled }: ButtonProps) {
  const baseStyle = 'font-bold rounded-full tracking-wide transition-all duration-200 inline-flex items-center justify-center shadow-md select-none focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-brand-primary text-brand-dark font-extrabold hover:bg-brand-primary/90 hover:shadow-[0_0_15px_rgba(144,163,238,0.45)]',
    secondary: 'border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-brand-dark hover:shadow-[0_0_10px_rgba(144,163,238,0.25)]',
    accent: 'bg-brand-accent text-brand-dark font-extrabold hover:bg-brand-accent/90 hover:shadow-[0_0_15px_rgba(144,163,238,0.45)]',
    red: 'bg-brand-red text-white hover:bg-brand-red/90',
    ghost: 'bg-transparent text-brand-primary shadow-none hover:bg-brand-primary/10',
    dark: 'bg-zinc-950 text-white border-2 border-zinc-800 font-extrabold hover:bg-zinc-900 hover:border-zinc-700 hover:text-brand-accent hover:shadow-[0_0_15px_rgba(212,160,23,0.15)] transition-all duration-300',
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  }[size];

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyle} ${variantStyles} ${sizeStyles} ${className}`}
      id={id}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// BEFORE AFTER SLIDER
interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}
export function BeforeAfterSlider({ before, after, beforeLabel = 'Before Treatment', afterLabel = 'Cilok Master Finish' }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2.5xl overflow-hidden shadow-2xl border border-brand-muted group select-none">
      {/* After Image (Base Layer) */}
      <img 
        src={after} 
        alt="After Treatment" 
        className="absolute inset-0 w-full h-full object-cover" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-brand-primary/90 text-white text-xs md:text-sm md:px-3 md:py-1.5 px-2 py-1 rounded-full font-bold shadow-md z-1">
        {afterLabel}
      </div>

      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden" 
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={before} 
          alt="Before Treatment" 
          className="absolute inset-0 w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs md:text-sm md:px-3 md:py-1.5 px-2 py-1 rounded-full font-bold shadow-md z-1">
          {beforeLabel}
        </div>
      </div>

      {/* Invisible range element */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />

      {/* Bar and controller handle */}
      <div className="absolute top-0 bottom-0 pointer-events-none z-10" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-0 bottom-0 w-1 bg-brand-accent shadow-[0_0_10px_rgba(212,160,23,0.8)]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-accent text-white border-2 border-white flex items-center justify-center shadow-2xl">
          <span className="font-bold text-lg select-none">↔</span>
        </div>
      </div>
    </div>
  );
}

// SECTION HEADING
interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'center' | 'left';
  inverse?: boolean;
}
export function SectionHeading({ eyebrow, heading, subheading, align = 'center', inverse = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <span className={`text-xs md:text-sm font-mono tracking-[0.25em] uppercase mb-3 block ${inverse ? 'text-brand-primary' : 'text-zinc-900 font-black'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-5xl font-display font-black tracking-tighter uppercase ${inverse ? 'text-white' : 'text-zinc-950'}`}>
        {heading}
      </h2>
      {subheading && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${align === 'left' ? 'ml-0' : ''} ${inverse ? 'text-zinc-400 font-light' : 'text-zinc-600 font-normal'}`}>
          {subheading}
        </p>
      )}
    </div>
  );
}

// FAQ ACCORDION
interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}
export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border border-brand-muted rounded-2xl bg-white overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-brand-dark bg-transparent hover:bg-brand-secondary/30 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-brand-muted/20 text-text-soft text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// REUSABLE POPUP MODAL
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Support Escape key to close
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl z-10 overflow-hidden border border-brand-muted"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-muted bg-brand-secondary/25">
              <h3 className="font-display font-semibold text-lg md:text-xl text-brand-dark">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-brand-muted text-text-soft hover:text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content SCROLLABLE */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
