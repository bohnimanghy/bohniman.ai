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
  { label: "Case Studies", href: "/#cases" },
  { label: "Enterprise", href: "/#contact" },
  { label: "About", href: "/about" },
  { label: "News Room", href: "/#news" },
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
    slug: "zalpan",
    name: "Zalpan",
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

export type CaseStudy = {
  sector: string;
  tag: string;
  title: string;
  body: string;
  link: string;
  stats: { value: string; label: string }[];
  meta: string;
};

/** Homepage proof section — client identities withheld under confidentiality. */
export const caseStudies: CaseStudy[] = [
  {
    sector: "Justice & Public Safety",
    tag: "Prime Contractor · SI",
    title: "e-Court & Biometric Verification Platform",
    body: "Replaced fragmented paper legal workflows with a biometric-enabled digital governance system — uniquely identifying suspects, preventing identity manipulation, and migrating nearly three decades of legacy cases into one searchable platform.",
    link: "Powers our biometric identity & secure-workflow engineering.",
    stats: [
      { value: "5.5M", label: "Records digitized" },
      { value: "0.45M", label: "Legacy cases migrated" },
      { value: "100", label: "Tribunal offices" },
      { value: "319", label: "Police stations integrated" },
    ],
    meta: "State judicial & police administration · ~1 TB managed · multi-year engagement",
  },
  {
    sector: "Digital Governance",
    tag: "Delivered in 6 months",
    title: "Legacy Digitization & Citizen Search Platform",
    body: "Digitized fragile 1951–1971 archival records across 25 district headquarters and published them statewide as a multilingual, phonetic search platform — in Assamese, Bengali and English — served online and through offline-first assisted centers.",
    link: "The Indic-language & document-intelligence work behind Kathan AI.",
    stats: [
      { value: "2.02 Cr", label: "Records indexed" },
      { value: "17M", label: "Citizen hits in 6 months" },
      { value: "43 L", label: "Record retrievals" },
      { value: "25", label: "District headquarters" },
    ],
    meta: "State digital-governance programme · 5,000 laptops · 2,500 assisted centers",
  },
  {
    sector: "Citizen Verification",
    tag: "Offline-first · ~3 months",
    title: "Family Linkage Verification Platform",
    body: "Generated computerized family trees from millions of citizen records to validate lineage claims and surface false linkages — consolidating siblings, cousins and households sharing a legacy code, and equipping statutory officers with structured hearing workflows.",
    link: "Behind our relational-data & distributed, offline-first platforms.",
    stats: [
      { value: "57 L", label: "Family trees generated" },
      { value: "90 L", label: "Verification cases" },
      { value: "43 L+", label: "Legacy codes resolved" },
      { value: "27", label: "Districts, simultaneously" },
    ],
    meta: "Statewide citizen-verification initiative · scheduled replication from the field",
  },
];

export type PressItem = {
  source: string;
  date: string;
  title: string;
  href: string;
};

/** News Room — featured coverage. */
export const featuredPress = {
  source: "The Assam Tribune",
  year: "2025",
  tag: "Featured · Indic-language AI",
  stat: "2.76M",
  statLabel: "Pages of Assamese literature decoded & made keyword-searchable with AI",
  title: "Rare Assamese journals and books, digitized and searchable with AI",
  body: "As technology partner to the Nanda Talukdar Foundation's Digitizing Assam initiative, Bohniman used AI to decode, index and organize decades of manuscripts, journals and books published between 1840 and 1970 — one of the harder language-processing problems in India.",
  href: "https://assamtribune.com/guwahati/rare-assamese-journals-and-books-to-be-digitized-1475989",
};

/** News Room — press list. */
export const pressItems: PressItem[] = [
  {
    source: "India Today",
    date: "Jul 29, 2018 · PTI",
    title: "Guwahati-based IT firm digitized data of 3 crore people for the NRC",
    href: "https://www.indiatoday.in/pti-feed/story/guwahati-based-it-firm-digitized-data-of-3-cr-people-for-nrc-1299506-2018-07-29",
  },
  {
    source: "The News Mill",
    date: "Jan 4, 2018",
    title: "Backbone of the NRC update process: the backroom Assam engineers",
    href: "https://thenewsmill.com/2018/01/backbone-nrc-update-process-assam-backroom-assam-engineers/",
  },
  {
    source: "Financial Express",
    date: "2017 · eGov",
    title: "Bohniman Systems to the rescue as Assam embarks on its citizen-verification drive",
    href: "https://www.financialexpress.com/life/technology-egov-illegal-immigrants-bohniman-systems-to-the-rescue-as-assam-embarks-on-citizen-hunt-653242/",
  },
  {
    source: "The Economic Times",
    date: "2017 · e-Governance",
    title: "Arunachal Pradesh launches e-Inner Line Permit programme, built by Bohniman",
    href: "https://economictimes.indiatimes.com/news/politics-and-nation/arunachal-pradesh-launches-e-inner-line-permit-programme/articleshow/59401268.cms",
  },
];
