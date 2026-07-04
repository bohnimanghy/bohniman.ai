export const site = {
  name: "Bohniman Systems",
  legalName: "Bohniman Systems Pvt Ltd",
  founded: 1999,
  location: "Guwahati, India",
  email: "hello@bohniman.com",
  phone: "+91 80477 89933",
  phoneHref: "tel:+918047789933",
  address:
    "4A Kalindi Plaza, Dr. J.C. Das Road, Panbazar, Guwahati, Assam 781001",
  accent: "#F0531C",
} as const;

/** Years since founding — matches design's `new Date().getFullYear() - 1999`. */
export function yearsSince(): number {
  return new Date().getFullYear() - site.founded;
}

export const nav = [
  { label: "Products", href: "/#products" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export type ProductStatus = "LIVE" | "BETA" | "COMING SOON";

export type Product = {
  slug: string;
  name: string;
  category: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  flagship?: boolean;
  features: { title: string; body: string }[];
};

export const products: Product[] = [
  {
    slug: "samagam",
    name: "Samagam",
    category: "Event Management",
    status: "LIVE",
    flagship: true,
    tagline: "End-to-end event management, with AI at the core.",
    description:
      "End-to-end event management — registrations, ticketing, QR check-in, agendas, sponsor management and real-time analytics, with AI automating check-in, scheduling and insights.",
    features: [
      { title: "Registrations & ticketing", body: "Custom forms, tiered tickets, promo codes and secure payments in one flow." },
      { title: "QR check-in", body: "Contactless entry with instant validation and live headcount." },
      { title: "Agendas & sessions", body: "Multi-track schedules, speaker management and attendee agendas." },
      { title: "Sponsor management", body: "Booths, packages and lead capture with measurable ROI." },
      { title: "Real-time analytics", body: "Live dashboards on attendance, engagement and revenue." },
      { title: "AI automation", body: "Automated check-in, smart scheduling and event insights." },
    ],
  },
  {
    slug: "kathan-ai",
    name: "Kathan AI",
    category: "Speech-to-Text",
    status: "LIVE",
    tagline: "Speech-to-text for 22 Indic languages.",
    description:
      "Speech-to-text for 22 Indic languages — accurate transcription tuned for Indian accents, dialects and code-switching.",
    features: [
      { title: "22 Indic languages", body: "Broad coverage across India's official languages and major dialects." },
      { title: "Accent-robust", body: "Trained for regional accents and everyday code-switching." },
      { title: "Real-time & batch", body: "Live streaming transcription or bulk file processing." },
      { title: "Developer API", body: "Simple REST API to embed transcription into your product." },
    ],
  },
  {
    slug: "curioversity",
    name: "Curioversity",
    category: "Education",
    status: "LIVE",
    tagline: "The operating system for modern institutions.",
    description:
      "The operating system for modern institutions — admissions, academics, operations and communication, unified and intelligent.",
    features: [
      { title: "Admissions", body: "End-to-end enquiry, application and enrolment workflows." },
      { title: "Academics", body: "Timetables, attendance, grading and report cards." },
      { title: "Operations", body: "Fees, transport, hostel and inventory in one system." },
      { title: "Communication", body: "Parent, student and staff messaging that stays in sync." },
    ],
  },
  {
    slug: "rasoios",
    name: "RasoiOS",
    category: "Restaurant Management",
    status: "BETA",
    tagline: "From order to kitchen to ledger — your restaurant, orchestrated.",
    description:
      "From order to kitchen to ledger — your restaurant, orchestrated. Orders, inventory, billing and analytics in one AI-assisted platform.",
    features: [
      { title: "Order management", body: "Dine-in, takeaway and online orders in a single queue." },
      { title: "Kitchen display", body: "Live tickets to the kitchen with prep timing." },
      { title: "Inventory & ledger", body: "Stock, purchase and accounts that reconcile themselves." },
      { title: "Analytics", body: "Sales, margins and menu performance at a glance." },
    ],
  },
  {
    slug: "biocrat",
    name: "Biocrat",
    category: "Health",
    status: "COMING SOON",
    tagline: "Healthcare operations, intelligently managed.",
    description:
      "Healthcare operations, intelligently managed — patient flow, records and clinic operations built on decades of systems discipline.",
    features: [
      { title: "Patient flow", body: "Appointments, queues and OPD management without the chaos." },
      { title: "Records", body: "Secure, structured patient records with quick retrieval." },
      { title: "Clinic operations", body: "Billing, pharmacy and staff coordination unified." },
      { title: "Built on discipline", body: "Engineered to the same standards as our government systems." },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
