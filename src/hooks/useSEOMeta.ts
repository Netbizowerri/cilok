import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products, services } from '../data/paintData';

interface MetaInfo {
  title: string;
  description: string;
}

const metaMap: Record<string, (path: string) => MetaInfo> = {
  '/': () => ({
    title: "Cilok Paint | Nigeria's Premier Decorative Wall Coating",
    description: "Premium wall coating formulations designed for tropical climate resilience. Silk paint, emulsion, texcoat & professional application services across Nigeria.",
  }),
  '/products': () => ({
    title: "Paint Products | Silk, Matt, Emulsion, Texcoat | Cilok Paint",
    description: "Explore our range of professional wall coatings: Silk Paint, Matt Paint, Emulsion, Texcoat, Wall Putty, Weather Proof Coating, Oil Paint, and POP materials.",
  }),
  '/products/order': () => ({
    title: "Order Cilok Paint Products | Direct Factory Delivery",
    description: "Order premium wall coatings direct from the factory. Nationwide shipping to Awka, Enugu, Port Harcourt, Abuja. Bulk and retail available.",
  }),
  '/services': () => ({
    title: "Wall Finishing Services | Paint Application, Screeding | Cilok Paint",
    description: "Professional wall finishing services: Paint Application, Wall Screeding, Tyrolean Finish, Stucco, Crackled Effect, Crackos Premium, Ottochinto, Polystyrene POP.",
  }),
  '/services/book': () => ({
    title: "Book Wall Coating Services | Certified Application Crews",
    description: "Schedule professional wall coating and finishing services. Certified crews for residential, commercial, and religious projects across Nigeria.",
  }),
  '/projects': () => ({
    title: "Past Projects Showcase & Portfolio | Cilok Paint",
    description: "View our portfolio of completed wall coating projects across Nigeria. Churches, residential estates, commercial complexes, and government buildings.",
  }),
  '/about': () => ({
    title: "About Cilok Paint | Beauty Redefined Since 2006 | Anambra",
    description: "Cilok Paint has been formulating premium wall coatings for the Nigerian climate since 2006. Anti-mold, rain-shield, dust-resistant formulations from Anambra.",
  }),
  '/contact': () => ({
    title: "Contact Cilok Paint | Distributors in Awka, Enugu, PH, Abuja",
    description: "Get in touch with Cilok Paint. Visit our factory in Nkpor, Onitsha or contact our distributors in Awka, Enugu, Port Harcourt, and Abuja.",
  }),
};

function getProductMeta(slug: string): MetaInfo {
  const prod = products.find(p => p.slug === slug);
  return prod
    ? {
        title: `${prod.name} Technical Specs | Cilok Paint`,
        description: `${prod.name} — ${prod.description.slice(0, 150)}. Features: ${prod.features.slice(0, 3).join(', ')}.`,
      }
    : { title: "Paint Product Formulation | Cilok Paint", description: "Explore our premium wall coating formulations." };
}

function getServiceMeta(slug: string): MetaInfo {
  const serv = services.find(s => s.slug === slug);
  return serv
    ? {
        title: `${serv.name} Application Process | Cilok Paint`,
        description: `${serv.name} — ${serv.description.slice(0, 150)}. ${serv.idealFor.slice(0, 3).join(', ')}.`,
      }
    : { title: "Architectural Finishing Service | Cilok Paint", description: "Professional wall finishing and coating services." };
}

export function useSEOMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname;
    let info: MetaInfo;

    if (path.startsWith('/products/')) {
      const slug = path.split('/')[2];
      info = slug === 'order' ? metaMap['/products/order'](path) : getProductMeta(slug);
    } else if (path.startsWith('/services/')) {
      const slug = path.split('/')[2];
      info = slug === 'book' ? metaMap['/services/book'](path) : getServiceMeta(slug);
    } else {
      info = metaMap[path]?.(path) ?? {
        title: "Page Not Found | Cilok Paint",
        description: "The page you're looking for doesn't exist. Explore our products and services.",
      };
    }

    document.title = info.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', info.description);
  }, [pathname]);
}
