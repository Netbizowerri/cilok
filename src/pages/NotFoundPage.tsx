import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading, Button } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { Umbrella, Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <section className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,160,23,0.15),_transparent)] pointer-events-none" />
        
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="bg-brand-red p-4 rounded-full text-white w-16 h-16 flex items-center justify-center mx-auto shadow-2xl animate-spin">
            <Umbrella className="w-8 h-8" />
          </div>

          <h1 className="font-display font-medium text-4xl md:text-5xl tracking-normal text-brand-accent">
            Page Not Found
          </h1>

          <p className="text-sm md:text-base text-brand-secondary/80 leading-relaxed font-light">
            We apologize. The page you are trying to visit does not exist or has been relocated within our decorative catalog.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Button 
              variant="accent" 
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" /> Return to Home
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/products')}
              className="border-white text-white hover:bg-white hover:text-brand-dark"
            >
              Our Paint Products
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
