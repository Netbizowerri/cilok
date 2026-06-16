import { useState, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageWrapper } from './components/layout/PageWrapper';
import { ConsultationModal } from './components/forms/ConsultationModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useSEOMeta } from './hooks/useSEOMeta';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const ProductOrderPage = lazy(() => import('./pages/ProductOrderPage').then(m => ({ default: m.ProductOrderPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const ServiceBookingPage = lazy(() => import('./pages/ServiceBookingPage').then(m => ({ default: m.ServiceBookingPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function PageSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

function AppRoutes({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  useScrollToTop();
  useSEOMeta();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageSuspense><PageWrapper><HomePage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/products" element={<PageSuspense><PageWrapper><ProductsPage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/products/:slug" element={<PageSuspense><PageWrapper><ProductDetailPage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/products/order" element={<PageSuspense><PageWrapper><ProductOrderPage /></PageWrapper></PageSuspense>} />
          <Route path="/services" element={<PageSuspense><PageWrapper><ServicesPage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/services/:slug" element={<PageSuspense><PageWrapper><ServiceDetailPage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/services/book" element={<PageSuspense><PageWrapper><ServiceBookingPage /></PageWrapper></PageSuspense>} />
          <Route path="/projects" element={<PageSuspense><PageWrapper><ProjectsPage onOpenConsultation={onOpenConsultation} /></PageWrapper></PageSuspense>} />
          <Route path="/about" element={<PageSuspense><PageWrapper><AboutPage /></PageWrapper></PageSuspense>} />
          <Route path="/contact" element={<PageSuspense><PageWrapper><ContactPage /></PageWrapper></PageSuspense>} />
          <Route path="*" element={<PageSuspense><PageWrapper><NotFoundPage /></PageWrapper></PageSuspense>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen text-brand-dark">
          <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
          <main className="flex-grow">
            <AppRoutes onOpenConsultation={() => setIsConsultationOpen(true)} />
          </main>
          <Footer />
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
          />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
