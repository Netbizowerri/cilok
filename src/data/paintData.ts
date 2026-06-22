// src/data/paintData.ts

export interface Product {
  slug: string;
  name: string;
  category: 'paint' | 'texture' | 'prep' | 'specialty' | 'moulding';
  badge: string;
  description: string;
  longDescription: string;
  features: string[];
  howToApply: string[];
  faqs: { question: string; answer: string }[];
  compatibleServices: string[];
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  processSteps: { title: string; desc: string }[];
  idealFor: string[];
  differentiators: string[];
  relatedProducts: string[];
  beforeImage: string;
  afterImage: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  category: 'Commercial' | 'Residential' | 'Religious' | 'Government' | 'Hospitality';
  services: string[];
  image: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
}

export const products: Product[] = [
  {
    slug: 'silk-paint',
    name: 'Silk Paint',
    category: 'paint',
    badge: 'Interior/Exterior',
    description: 'A smooth, sheen finish that adds a luxurious, soft glow to any wall surface.',
    longDescription: 'Cilok Silk Paint' + " is a premium quality, highly washable acrylic emulsion designed for high-traffic interior and exterior walls. It offers a subtle, silk-like reflection that elevates living rooms, bedrooms, receptive hotel lobbies, and executive suites. Its special stain-resistant formula allows you to wipe away surface dirt easily, retaining its distinctive premium luster over years.",
    features: [
      'Subtle, luxurious silk-like sheen',
      'Ultra-washable: stains wipe away easily without losing color',
      'High opacity and coverage (12-14 sqm per liter)',
      'Excellent resistance to tropical humidity and peeling',
      'Eco-friendly: Low VOC formulation'
    ],
    howToApply: [
      'Prepare surface: Ensure wall is clean, dry, and free of loose particles.',
      'Screed first: Apply Cilok Wall Putty to achieve a perfectly smooth, level substrate.',
      'Prime: Apply an undercoat or a diluted base cohort of acrylic emulsion.',
      'Apply Silk Paint: Apply 2 coats of Silk Paint using a premium microfiber or roller. Allow 4 hours drying time between coats.'
    ],
    faqs: [
      { question: 'Can Silk Paint be washed?', answer: 'Yes! Silk Paint is specially formulated to be highly scrub-resistant, meaning you can easily clean off everyday scuffs and mild stains with soap and water.' },
      { question: 'Do I need perfect walls for Silk Paint?', answer: 'Because of its subtle reflective sheen, we highly recommend professional wall screeding (using Cilok Wall Putty) before application to prevent surface imperfections from reflecting light awkwardly.' }
    ],
    compatibleServices: ['wall-screeding', 'paint-application']
  },
  {
    slug: 'matt-paint',
    name: 'Matt Paint',
    category: 'paint',
    badge: 'Interior/Exterior',
    description: 'A flat, non reflective finish, ideal for hiding surface imperfections on interior/exterior walls.',
    longDescription: 'A flat, non reflective finish, ideal for hiding surface imperfections on interior/exterior walls.',
    features: [
      'Completely flat, velvety non-reflective finish',
      'Superb concealing power (excellent for hiding surface blemishes)',
      'Rich pigment density for deeper color vibes',
      'Quick drying and minimal odor during application',
      'Provides a smooth, breathable paint layer'
    ],
    howToApply: [
      'Clean surface and repair any cracks or holes with putty.',
      'Stir paint thoroughly before use.',
      'Apply 2 coats using a high-quality roller or brush. Allow 3-4 hours between coats.'
    ],
    faqs: [
      { question: 'Where is Matt Paint best used?', answer: 'It is highly popular for ceilings, main bedrooms, dining rooms, and any walls with minor structural imperfections, as the absence of surface sheen doesn\'t draw attention to bumps.' }
    ],
    compatibleServices: ['paint-application']
  },
  {
    slug: 'emulsion',
    name: 'Emulsion Paint',
    category: 'paint',
    badge: 'Interior/Exterior',
    description: 'Water-based, fast-drying emulsion for smooth, durable coverage on interior and exterior walls.',
    longDescription: 'Our premium Emulsion Paint offers a reliable, classic flat-to-eggshell finish for large residential, commercial, or institutional developments. It has exceptional spreadability and weather durability, making it the choice product for developers managing schools, church halls, administrative blocks, and massive housing estates.',
    features: [
      'Outstanding value and cost-competitive coverage',
      'High resistance to weathering and atmospheric pollution',
      'Quick drying; rooms can be occupied shortly after application',
      'Highly compatible with various primers and undercoats'
    ],
    howToApply: [
      'Wash down existing walls to remove any chalky residue.',
      'Stir well, diluting slightly with clean water if necessary for porous surfaces.',
      'Apply 2-3 coats uniformly by brush, roller, or spray.'
    ],
    faqs: [
      { question: 'Is Emulsion Paint suitable for outdoor use?', answer: 'Yes, our premium-grade Emulsion Paint is formulated with hardwearing polymers that resist fading and peeling under tropical weather.' }
    ],
    compatibleServices: ['paint-application']
  },
  {
    slug: 'texcoat',
    name: 'Texcoat',
    category: 'texture',
    badge: 'Exterior',
    description: 'A textured coating providing a robust, weatherproof finish ideal for exterior surfaces in tropical climates.',
    longDescription: 'Cilok Texcoat is an acrylic-aggregate textured render. It is designed specifically to withstand harsh tropical Downpours and scorching sunlight in West Africa. It masks structural concrete imperfections, prevents hairline water ingress, and gives buildings an attractive, rugged, and premium architectural status.',
    features: [
      'Tough, flexible textured paint film',
      'Masks major exterior plaster waviness and surface cracks',
      'Excellent protection against water permeability and mold growth',
      'Highly stable colors that resist baking in intense UV light'
    ],
    howToApply: [
      'Apply directly on fully cured exterior plastering.',
      'Use a texturing roller or honeycomb roller to create the desired texture pattern.',
      'Keep a wet edge to avoid obvious joints across the wall spans.'
    ],
    faqs: [
      { question: 'Does Texcoat scrape off easily?', answer: 'No. Our Texcoat contains durable binder resins and hard aggregates that permanently lock onto the substrate, offering reliable scratch and impacts protection.' }
    ],
    compatibleServices: ['paint-application', 'tyrolean']
  },
  {
    slug: 'wall-putty',
    name: 'Wall Putty (Screeding bond)',
    category: 'prep',
    badge: 'Prep Coat',
    description: 'A ready-mix, water resistant acrylic based paste. Applied to exterior/interior plastered wall to create a perfectly smooth, level and crack free bonded surface. It also reduces paint consumption.',
    longDescription: 'A ready-mix, water resistant acrylic based paste. Applied to exterior/interior plastered wall to create a perfectly smooth, level and crack free bonded surface. It also reduces paint consumption.',
    features: [
      'Fills microscopic pores and hairline masonry cracks',
      'Exceptional adhesion power to concrete plasters',
      'Significantly reduces subsequent paint consumption',
      'Easy to sand, producing a glass-like under layer'
    ],
    howToApply: [
      'Mix putty powder with clean water to a lump-free, creamy consistency.',
      'Dampen the plaster wall. Apply the first coat using a screeding blade.',
      'Apply a second coat after 4 hours. Once dry, sand gently with fine sandpaper.'
    ],
    faqs: [
      { question: 'Is wall putty mandatory?', answer: 'While not strictly mandatory, it is highly recommended if you want a premium finishing like Silk or Stucco, as it ensures zero structural waviness.' }
    ],
    compatibleServices: ['wall-screeding']
  },
  {
    slug: 'weatherproof',
    name: 'Weather Proof Coating',
    category: 'specialty',
    badge: 'Exterior / Durable',
    description: 'Specially formulated to withstand heavy rainfall and harsh UV exposure across West Africa.',
    longDescription: 'Our Weather Proof Coating represents the pin-point of paint engineering. Built with specialized elastomere polymers, this coating expands and contracts with natural thermal movements of concrete, preventing hairline fractures. It actively sheds dust and resists the growth of mold, biological moss, or black water stains that ruin exterior walls during severe wet seasons.',
    features: [
      'Elastomeric properties: stretches to cover building micro-movement cracks',
      'Anti-fungal and anti-algal rain shield coating',
      'Dirt repelling technology keeps external walls clean and bright',
      'Excellent washability and heavy scrub rating'
    ],
    howToApply: [
      'Clean plaster of all moss, fungus, or old peeling lime.',
      'Apply a priming coat to secure the base.',
      'Apply 2 full undiluted coats with a paint roller, ensuring uniform film thickness.'
    ],
    faqs: [
      { question: 'How long does this coating last?', answer: 'We formulate our Weather Proof Coating to endure 8 to 10 years of typical South-East heat and rain cycles without cracking or showing structural degradation.' }
    ],
    compatibleServices: ['paint-application']
  },
  {
    slug: 'oil-paint',
    name: 'Oil Paint',
    category: 'paint',
    badge: 'Interior',
    description: 'A high-gloss, hard-wearing oil-based paint for wood, metal, and feature wall surfaces.',
    longDescription: 'Cilok Oil Paint delivers a high-gloss, high-reflection finish. Crafted using superior alkyd solvent resins, it creates an impervious shield over timber doors, steel gates, window grilles, wall skirting boards, and high-wipe utility areas. It easily resists oils, moist wipes, water splashes, and physical bumps.',
    features: [
      'Resplendent high-gloss mirror-like shine',
      'Incredibly resilient surface protection against impacts',
      'Anti-rust properties when applied over metal primers',
      'Ideal for wood, metal banisters, gates, and bathroom skirting'
    ],
    howToApply: [
      'Ensure the wood is sanded smooth or metal is thoroughly wire-brushed of rust.',
      'Apply wood primer or anti-rust primer first.',
      'Apply 1-2 coats of Cilok Oil Paint, diluting slightly with mineral spirits if needed.'
    ],
    faqs: [
      { question: 'Can I paint this over damp surfaces?', answer: 'No, oil-based paints will fail on damp substrates. Ensure the wood or plaster is completely dry before laying it down.' }
    ],
    compatibleServices: ['paint-application']
  },
  {
    slug: 'pop-materials',
    name: 'POP Paint & Materials',
    category: 'specialty',
    badge: 'Decorative',
    description: 'All premium materials required for Plaster of Paris ceiling and wall decorative creations.',
    longDescription: 'Our POP materials and accompanying specialized matte POP paint provide flawless, bright white highlights for modern ceiling design. Perfect for intricate cornices, centerpieces, ceiling boards, and modern drop ceilings, they offer fine grain, easy molding capabilities, and rapid setting times.',
    features: [
      'Ultra-white plaster compound that doesn\'t dull over time',
      'Excellent mold strength for custom carving',
      'Special POP paint formulated with ultra-dry matte pigment for zero glaze ceilings'
    ],
    howToApply: [
      'Cast or arrange POP molds on structural ceiling wire grids.',
      'Screed smoothly with POP screeding compounds.',
      'Finish with low-opacity premium white matte POP paint for a smooth cloud-like ceiling look.'
    ],
    faqs: [
      { question: 'Do you sell POP accessories?', answer: 'Yes, we supply complete sets including POP powder, fiber glass materials grid, center roses, and skirting boards.' }
    ],
    compatibleServices: ['polystyrene-pop']
  }
];

export const services: Service[] = [
  {
    slug: 'paint-application',
    name: 'Paint Application',
    icon: 'Brush',
    tagline: 'Precision painting that guarantees a immaculate finish.',
    description: 'Professional application of all Cilok Paint products by trained specialists.',
    longDescription: 'At Cilok Paint, we don\'t just produce paint; we apply it with masterful precision. Our highly trained application crews understand substrate preparation, optimal dry-film thickness, humidity constraints, and correct structural brushwork. We ensure every bucket of Cilok Paint is translated into a breathtaking, durable surface.',
    processSteps: [
      { title: 'Substrate Inspection', desc: 'Identify wall moisture, plaster stability, and old cracking paints.' },
      { title: 'Screeding & Sanding', desc: 'Screed and sand thoroughly to establish a flat base canvas.' },
      { title: 'Priming', desc: 'Apply professional undercoats to seal porosity.' },
      { title: 'Finishing Coats', desc: 'Precision apply two or more topcoats with premium rollers for seamless color.' }
    ],
    idealFor: ['Luxury Residential Homes', 'Hotels', 'Commercial Office Spaces', 'Church Worship Auditoriums'],
    differentiators: [
      'Skilled, direct-hire crews (no random sub-contractors)',
      'Strict adherence to dry times and weather matching',
      'Zero-mess guarantee: detailed masking and final cleanups included'
    ],
    relatedProducts: ['silk-paint', 'matt-paint', 'emulsion'],
    beforeImage: 'https://i.ibb.co/272jcGgN/Cilok-16.jpg',
    afterImage: 'https://i.ibb.co/272jcGgN/Cilok-16.jpg'
  },
  {
    slug: 'wall-screeding',
    name: 'Wall Screeding',
    icon: 'Layers',
    tagline: 'Establishing base layers flat enough to mimic mirror glass.',
    description: 'Expert surface levelling and screeding to prepare walls for premium finishes.',
    longDescription: 'Poor concrete plastering ruins even the most expensive paints. Our professional Wall Screeding service uses high-grade Cilok Wall Putty and professional float techniques to iron out plaster waves, bumps, and pores. The resulting walls look clean, solid, and completely flat from any viewing angle.',
    processSteps: [
      { title: 'Chipping Bumps', desc: 'Knock down protruding cement plaster slag.' },
      { title: 'First Putty Coat', desc: 'Apply a dense filling putty coat across structural waves.' },
      { title: 'Second Putty Coat', desc: 'Apply a perpendicular second coat to level out fine lines.' },
      { title: 'Precision Sanding', desc: 'Machine or hand sand with fine sandpaper to a silky dust-free texture.' }
    ],
    idealFor: ['Living rooms looking for Silk finish', 'Specular/Sheen wall coatings', 'Exhibition halls', 'Premium offices'],
    differentiators: [
      'Dual-axis leveling check on every structural wall',
      'Ultra durable white-cement base mix that never cracks',
      'Creates a 30% saving on topcoat paint consumption'
    ],
    relatedProducts: ['wall-putty'],
    beforeImage: 'https://i.ibb.co/YTDxM7FW/CILOK.jpg',
    afterImage: 'https://i.ibb.co/YTDxM7FW/CILOK.jpg'
  },
  {
    slug: 'tyrolean',
    name: 'Tyrolean Finish',
    icon: 'Sparkles',
    tagline: 'Distinctive splattered aggregates that provide beautiful, rugged defenses.',
    description: 'A distinctive splattered texture finish for exterior walls, popular for Nigerian architectural aesthetics.',
    longDescription: 'Tyrolean Finish is a widely reliable decorative style for fences, exterior columns, and outer building facades in Nigeria. Using specialized splatter machinery and robust cementitious mixes, we create a durable textured render that masks water trails, resists physical scratches, and adds structural presence.',
    processSteps: [
      { title: 'Base Plaster Prep', desc: 'Ensure plaster is fully dry and cured.' },
      { title: 'Slurry Mixing', desc: 'Create a specific textured mix of cement, sand, and coloring aggregates.' },
      { title: 'Machine Spraying', desc: 'Uniformly spray slurry onto the walls to create custom textured splatters.' }
    ],
    idealFor: ['Compound Fences', 'Accent Facades', 'High-height Pillars', 'Tropical weather exposure structures'],
    differentiators: [
      'Unified textured splatter without blank spots',
      'Integrated pigments that won\'t wash off with rain',
      'Provides sound dampening and superior weathering defense'
    ],
    relatedProducts: ['texcoat'],
    beforeImage: 'https://i.ibb.co/xSw3k2rr/Untitled-design-1.jpg',
    afterImage: 'https://i.ibb.co/xSw3k2rr/Untitled-design-1.jpg'
  },
  {
    slug: 'stucco',
    name: 'Stucco Finish',
    icon: 'PaintBucket',
    tagline: 'Classic venetian-inspired plaster walls.',
    description: 'A classic plastered finish that creates elegant, smooth or rough wall surfaces.',
    longDescription: 'Stucco Finish is a timeless decorative art. We apply specialized lime-based or cement-acrylic micro-plasters, polished consecutively to bring out marbled visual veins, rich depth, and a cool-to-the-touch rock feel. Ideal for statement walls, high end dining spaces, and architectural pillars.',
    processSteps: [
      { title: 'Underlayment', desc: 'Secure an ultra-stable base substrate.' },
      { title: 'Stucco Coat One', desc: 'Lay down a smooth uniform base color coat.' },
      { title: 'Artisan Layering', desc: 'Apply multi-tonal stucco strokes to create depth and veins.' },
      { title: 'Polishing/Waxing', desc: 'Hand polish to reveal the classic stone glow or semi-gloss finish.' }
    ],
    idealFor: ['Reception areas', 'Pillars and columns', 'Luxury dining chambers', 'Boardrooms'],
    differentiators: [
      'Hand-crafted by native specialized stucco artists',
      'Washable and humidity-repelling wax finish options',
      'Instant touch of historic class'
    ],
    relatedProducts: ['silk-paint', 'wall-putty'],
    beforeImage: 'https://i.ibb.co/spFWsWg0/CILOK-11.jpg',
    afterImage: 'https://i.ibb.co/spFWsWg0/CILOK-11.jpg'
  },
  {
    slug: 'crackled-effect',
    name: 'Crackled Effect',
    icon: 'ZapOff',
    tagline: 'Charming vintage textures that evoke depth and luxury.',
    description: 'A decorative antique-style cracked texture that adds character and depth to accent walls.',
    longDescription: 'For spaces that command character, our Crackled Effect finish creates an intentional cracked pattern. This evokes a weathered heritage elegance popular in museums, palace rooms, boutique hotels, and select living rooms. Carefully controlled to prevent structural flaking.',
    processSteps: [
      { title: 'Base Color Coat', desc: 'Paint the base background color that will show through the cracks.' },
      { title: 'Cracking medium', desc: 'Apply a specialized technical cracking glaze.' },
      { title: 'Top Reaction Coat', desc: 'Apply the contrasting top coat, which splits to form structural fissures.' }
    ],
    idealFor: ['Art galleries', 'Boutique hotels', 'Vintage TV Accent Walls', 'Exotic cafes'],
    differentiators: [
      'Artistic speed and sizing control of cracked fissures',
      'Stable polymer formula that stays solid and clean',
      'Dozens of base/top color combinations'
    ],
    relatedProducts: ['matt-paint', 'oil-paint'],
    beforeImage: 'https://i.ibb.co/zhfbwWzj/CILOK-1.jpg',
    afterImage: 'https://i.ibb.co/zhfbwWzj/CILOK-1.jpg'
  },
  {
    slug: 'crackos-effect',
    name: 'Crackos Premium Finish',
    icon: 'Zap',
    tagline: 'Striking weathered-stone designs with organic golden fissures.',
    description: 'Exquisite antique plaster and organic crackle decorative textures with rich metallic vein runs.',
    longDescription: 'Crackos is an ultra-premium architectural finish reproducing the timeless grandeur of weathered travertine and antique crackled stone. Layered with high-elasticity mineral-rich stuccoing and filled with shimmering gold, silver, or bronze veins, it adds absolute structural aristocracy to any luxury space.',
    processSteps: [
      { title: 'Substrate Preparation', desc: 'Requires pristine sanding and priming to secure perfect mineral adhesion.' },
      { title: 'Crackos Plaster Coat', desc: 'Applying our specialized rich crackle plaster base with structural mineral grains.' },
      { title: 'Vein Detailing', desc: 'Artisans hand-draw metallic or contrasting fluid stencils through the fissure pathways.' },
      { title: 'Protective Crystalline Glaze', desc: 'Sealing the masterpiece with water-repellent, non-yellowing wax coats for lifelong durability.' }
    ],
    idealFor: ['Duplex double-height pillars', 'Statement reception columns', 'Master suite feature backdrops', 'VIP receiving rooms'],
    differentiators: [
      'Authentic antique look safely supported by high-elasticity acrylic polymers',
      'Hand-crafted custom golden or bronze hairline accents',
      'Washable, scrub-immune, and highly light-responsive textures'
    ],
    relatedProducts: ['silk-paint', 'wall-putty'],
    beforeImage: 'https://i.ibb.co/zhfbwWzj/CILOK-1.jpg',
    afterImage: 'https://i.ibb.co/zhfbwWzj/CILOK-1.jpg'
  },
  {
    slug: 'ottochinto',
    name: 'Ottochinto',
    icon: 'Hexagon',
    tagline: 'Velvety textures with European architectural pedigree.',
    description: 'A distinctive European-inspired stippled decorative finish for statement walls.',
    longDescription: 'Ottochinto is a high-grade textile-inspired paint finish. It replicates the luxurious texture of velvet or suede fabric on the wall. By using specialized metallic paints applied in layered circular stippled strokes, the finish looks lush, rich, and feels warm, shifting dramatically under light.',
    processSteps: [
      { title: 'Screeding', desc: 'Establish a completely level wall structure.' },
      { title: 'Base Application', desc: 'Apply a flat color coat.' },
      { title: 'Artisan swiping', desc: 'Apply velvet-glaze using specialized trowels in overlapping light strokes.' }
    ],
    idealFor: ['Home theaters', 'Executive master suites', 'High-end clothing boutiques', 'Presidential suites'],
    differentiators: [
      'Premium velvet look and tactile dry feel',
      'Resistant to indoor dirt, easy to clean',
      'Highly unique visual appeal'
    ],
    relatedProducts: ['silk-paint', 'wall-putty'],
    beforeImage: 'https://i.ibb.co/C5C4S5R2/Ottocinto.jpg',
    afterImage: 'https://i.ibb.co/C5C4S5R2/Ottocinto.jpg'
  },
  {
    slug: 'polystyrene-pop',
    name: 'Polystyrene POP',
    icon: 'Grid',
    tagline: 'Intricate ceilings, cornices, and belting moulding.',
    description: 'Installation of polystyrene cornices, ceiling roses, and decorative POP panels.',
    longDescription: 'No luxury space is complete without ceiling and corner detailing. We provide lightweight, durable Polystyrene POP installation. This is far superior to old gypsum mixtures because it is humidity resistant, doesn\'t crack with structural settling, and installs cleanly without weeks of muddy plaster dust.',
    processSteps: [
      { title: 'Measuring and cutting', desc: 'Measure corners with exact precision, mitering the corner angles.' },
      { title: 'Screwing and Gluing', desc: 'Install utilizing strong, specialty water-based POP adhesives.' },
      { title: 'Joint Filling', desc: 'Fill joint lines seamlessly with fine POP screeding material.' },
      { title: 'Cohesive Painting', desc: 'Paint together with the ceiling in an ultra-white matte POP finish.' }
    ],
    idealFor: ['Living rooms', 'Hotel bedrooms', 'Conference halls', 'Offices'],
    differentiators: [
      'Extremely quick, dry installation (less than 48 hours for a complex villa)',
      'Zero cracking or moisture rotting over years of damp air',
      'Beautiful catalog of classic, neoclassical, and modern profiles'
    ],
    relatedProducts: ['pop-materials'],
    beforeImage: 'https://i.ibb.co/8g6Z9JMD/Untitled-design-2.jpg',
    afterImage: 'https://i.ibb.co/8g6Z9JMD/Untitled-design-2.jpg'
  },
  {
    slug: 'printing-services',
    name: 'Printing Services',
    icon: 'Layers',
    tagline: 'Multi-colour bucket screen printing at its finest.',
    description: 'With our multi-colour bucket screen printing machine, we offer printing services for plastic containers ranging from 5 litres - 20 litres.',
    longDescription: 'Cilok Paint now offers professional multi-colour bucket screen printing services for plastic containers ranging from 5 litres to 20 litres. Using our state-of-the-art screen printing machine, we deliver precise, vibrant, and durable prints on plastic containers, perfect for branding, product labeling, and promotional materials. Whether you need single-colour or multi-colour prints, our advanced equipment ensures crisp registration, consistent ink density, and long-lasting results that withstand handling and environmental exposure.',
    processSteps: [
      { title: 'Artwork Preparation', desc: 'We receive and prepare your artwork, ensuring proper sizing, colour separation, and screen creation.' },
      { title: 'Screen Setup', desc: 'Our technicians mount and align screens on the multi-colour printing machine for precise registration.' },
      { title: 'Printing', desc: 'The machine applies each colour layer sequentially with consistent pressure and alignment.' },
      { title: 'Quality Check & Curing', desc: 'Each printed container is inspected for defect-free impressions and cured for durability.' }
    ],
    idealFor: ['Paint manufacturers', 'Chemical companies', 'Lubricant brands', 'Industrial packaging'],
    differentiators: [
      'Multi-colour capability in a single pass for reduced turnaround time',
      'Handles containers from 5 litres to 20 litres',
      'Crisp, consistent print quality with industrial-grade inks'
    ],
    relatedProducts: [],
    beforeImage: 'https://i.ibb.co/pj2wD9rD/Whats-App-Image-2026-06-22-at-10-48-57-AM.jpg',
    afterImage: 'https://i.ibb.co/pj2wD9rD/Whats-App-Image-2026-06-22-at-10-48-57-AM.jpg'
  }
];

export const projects: Project[] = [
  {
    id: 'grand-sanctuary-restoration',
    name: "Grand Sanctuary Facade & Cathedral Restoration",
    client: 'Paul-B Nigeria Ltd',
    location: '',
    category: 'Religious',
    services: ['Wall Screeding', 'Paint Application', 'Pearl & Palace Effect'],
    image: 'https://i.ibb.co/pSHrX0g/CILOK-3.jpg',
    beforeImage: 'https://i.ibb.co/C3hQYYHT/CILOK-2.jpg',
    afterImage: 'https://i.ibb.co/pSHrX0g/CILOK-3.jpg',
    description: "A monumental transformation from raw, unrefined weathered masonry structures into a breathtaking architectural jewel. Cilok Paint performed comprehensive surface leveling, pristine dustcoat protection, and applied our ultra-durable premium weatherproof white exterior shield. The result is a luminous, majestic sanctuary fully fortified against hostile tropical climates, featuring high-sheen pearlescent accents across the internal vaults."
  },
  {
    id: 'elite-contemporary-villa',
    name: "Elite Contemporary Residential Villa",
    client: 'Private Owner',
    location: '',
    category: 'Residential',
    services: ['Wall Screeding', 'Paint Application', 'Silk Paint'],
    image: 'https://i.ibb.co/LXXz2sFn/CILOK-4.jpg',
    description: "A gorgeous, high-end residential statement design showcasing the absolute flawless brilliance of a complete Cilok painting system. Starting with premium high-density screeding utilizing Cilok putty, the residence was completely leveled of all hairline imperfections before receiving several pristine coats of our ultra-washable, dirt-resistant exterior emulsion. The flawless, light-maximizing premium finish emphasizes the villa's modern block geometry beautifully."
  },
  {
    id: 'udeh-foundation-headquarters',
    name: "Udeh Foundation Complex",
    client: 'Udeh Foundation',
    location: '',
    category: 'Commercial',
    services: ['Wall Screeding', 'Paint Application', 'Weatherproof Shield'],
    image: 'https://i.ibb.co/DDYFB4Hf/CILOK-6.jpg',
    beforeImage: 'https://i.ibb.co/fdXdK01t/CILOK-5.jpg',
    afterImage: 'https://i.ibb.co/DDYFB4Hf/CILOK-6.jpg',
    description: "A breathtaking, full-scale architectural rejuvenation. The initial structure suffered from severe weathering, humidity-induced surface staining, and uneven moisture spots. Cilok Paint performed comprehensive wall prep, intensive crack-bridging, premium high-density putty screeding, and applied our superior weatherproof shield emulsion. This complete overhaul restored the building's aesthetic integrity, turning a tired, dark facade into a vibrant, brilliant contemporary hub designed to stand up to extreme weather conditions."
  },
  {
    id: 'executive-twin-villa',
    name: "Executive Twin-Villa Residence",
    client: 'Private Developer',
    location: '',
    category: 'Residential',
    services: ['Wall Screeding', 'Paint Application', 'Weatherproof Shield'],
    image: 'https://i.ibb.co/wrKbMfhS/CILOK-8.jpg',
    description: "An incredible before-and-after narrative of modern architectural transformation. The property was upgraded from an uncompleted brick shell into a breathtaking, light-filled contemporary masterpiece. Applying Cilok premium base putty achieved a perfectly leveled plane, finished with multiple high-opacity coats of our ultra-durable weatherproof exterior white emulsion."
  },
  {
    id: 'grand-architectural-villa',
    name: "Grand Architectural Block Villa",
    client: 'Private Client',
    location: '',
    category: 'Residential',
    services: ['Wall Screeding', 'Paint Application', 'Silk Paint'],
    image: 'https://i.ibb.co/9mWNHMdX/CILOK-9.jpg',
    description: "A gorgeous luxury villa showing modern geometric clean lines highlighted by a flawless coat of Cilok Paint. Thoroughly prepared from screeding to final brush stroke, the exterior reflects absolute perfection, blending dustcoat resilience with a flat white-grey finish that emphasizes modern block structures and sophisticated aesthetic design."
  },
  {
    id: 'premium-stucco-artistry',
    name: "Artisanal Textured Stucco Plaster Finish",
    client: 'Private Owner',
    location: '',
    category: 'Residential',
    services: ['Stucco Finish', 'Wall Screeding', 'Textured Finish'],
    image: 'https://i.ibb.co/xtZ1dr5H/CILOK-11.jpg',
    description: "An exquisite showcase of high-end Stucco wall finishing. The project demonstrates the stunning transformation of raw, unrefined interior wall surfaces into a masterpiece of texture and visual depth. Hand-polished by skilled artisans with Cilok's advanced stucco plaster compound, the resulting marble-like surface boasts beautiful natural tonal variances and high-sheen architectural luxury."
  },
  {
    id: 'palace-effects',
    name: "Luxury Palace Effects Finish",
    client: 'Private Client',
    location: '',
    category: 'Residential',
    services: ['Palace Effects', 'Decorative Finishes'],
    image: 'https://i.ibb.co/vCyWVyPB/Palace-Effects.jpg',
    description: "A stunning showcase of our premium Palace Effects decorative finish. This luxurious treatment transforms ordinary walls into opulent statements of style and sophistication, featuring rich depth and luminous character that elevates any interior space."
  },
  {
    id: 'pearl-effect-showcase',
    name: "Pearl Effect Decorative Finish",
    client: 'Private Client',
    location: '',
    category: 'Residential',
    services: ['Pearl Effect', 'Decorative Finishes'],
    image: 'https://i.ibb.co/VY1gZV20/Pearl-Effect.jpg',
    description: "An elegant demonstration of our Pearl Effect finish, capturing the subtle iridescence and soft luminescence that brings walls to life. This refined treatment adds a shimmering, sophisticated dimension to residential and commercial interiors."
  },
  {
    id: 'ottochinto-showcase',
    name: "Ottochinto Velvet Textured Finish",
    client: 'Private Client',
    location: '',
    category: 'Residential',
    services: ['Ottochinto', 'Decorative Finishes'],
    image: 'https://i.ibb.co/mLrc6pN/Ottocinto.jpg',
    description: "A breathtaking Ottochinto velvet-textured wall finish that replicates the luxurious feel of fine suede. Applied using specialized layered circular stippled strokes, the result is a warm, richly textured surface that shifts dramatically under light, perfect for executive interiors."
  },
];

export const testimonials = [
  {
    quote: "Cilok Paint redefined the visual standards of the Bishop's Residence. Their screeding is masterclass, flat as glass, and the Silk Paint has withstood the dusty Onitsha harmattans beautifully. High recommendation.",
    author: "Arch. Kingsley",
    role: "Project Manager, Mode Nig. Ltd"
  },
  {
    quote: "We utilized Cilok's Stucco and Pearl finishes at Vine Suites, Agu-Awka. The metallic sand shimmer has had guest heads turning since day one. Absolute brilliance in service delivery.",
    author: "Chief Tony Nnaemego",
    role: "MD/CEO, Vine Suites"
  },
  {
    quote: "Formulation matters. As contractors in Abuja and eastern states, dry-out, weather cracking, and moss are always threats. Cilok is fully resilient to tropical downpours.",
    author: "Engr. Chudy Okudo",
    role: "Gen. Manager, Paul.B Nig. Ltd"
  }
];
