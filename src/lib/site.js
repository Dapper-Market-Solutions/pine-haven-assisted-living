// Pine Haven Assisted Living — single source of truth for NAP, nav, and content.
// Anything that appears in more than one place (footer, header, schema, pages)
// lives here so it can never drift. Update the address/phone ONCE here and it
// propagates to every page + the JSON-LD entity layer.

export const SITE_URL = 'https://pinehavenassistedliving.com';

export const NAP = {
  name: 'Pine Haven Assisted Living',
  legalName: 'Pine Haven Assisted Living',
  tagline: 'Living well. Living happy. Living safe.',
  phone: '(989) 642-5761',
  phoneHref: 'tel:+19896425761',
  email: 'pinehavenassistedliving@gmail.com',
  emailHref: 'mailto:pinehavenassistedliving@gmail.com',
  // Address per the owner: 515 N Brennan Rd (corrected 2026-06-02 to add the "N";
  // supersedes the 2026-06-01 "515 Brennan Rd" note). The old WP site's
  // "555 N Brennan Rd" had the wrong house number.
  street: '515 N Brennan Rd',
  city: 'Hemlock',
  state: 'MI',
  stateLong: 'Michigan',
  zip: '48626',
  get addressLine() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
  },
  mapQuery: '515 N Brennan Rd, Hemlock, MI 48626',
  hours: '24 hours a day, 365 days a year',
  geo: { lat: 43.4119, lng: -84.2289 }, // Hemlock, MI — refine if needed
  // Monthly rent (owner, 2026-06-02): semi-private $3,500, private $3,900.
  // priceFrom drives all "Rent from $X/mo" copy — keep it = the semi-private rate.
  priceFrom: '$3,500',
  priceSemiPrivate: '$3,500',
  pricePrivate: '$3,900',
  licensedFor: 18,
};

// Social / review profiles. Mirror any non-empty URL here into the `sameAs`
// array in index.html (the entity-layer JSON-LD). Leave a value '' to hide it.
export const SOCIALS = {
  facebook: 'https://www.facebook.com/PineHavenSeniorAssistedLivingLLC/',
  google: 'https://www.google.com/search?kgmid=/g/1tks6ycc', // GBP Knowledge Panel (kgmid /g/1tks6ycc)
};

// Communities Pine Haven draws from — drives the local pages + areaServed schema.
export const SERVICE_AREAS = ['Hemlock', 'Saginaw', 'Midland', 'Bay City', 'Merrill'];

export const NAV = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    children: [
      { name: 'Memory Care', path: '/memory-care' },
      { name: 'Assisted Living', path: '/assisted-living' },
      { name: 'Respite Care', path: '/respite-care' },
    ],
  },
  { name: 'Photo Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

// Real facility photos pulled from the old WP media library (2020–2021 uploads).
export const GALLERY = [
  { src: '/images/home-1.jpg', alt: 'Pine Haven Assisted Living home exterior in Hemlock, Michigan' },
  { src: '/images/home-2.jpg', alt: 'Front entrance of Pine Haven Assisted Living' },
  { src: '/images/facility-1.jpg', alt: 'Resident common living area at Pine Haven' },
  { src: '/images/facility-2.jpg', alt: 'Home-style dining room at Pine Haven Assisted Living' },
  { src: '/images/facility-3.jpg', alt: 'Comfortable private resident room at Pine Haven' },
  { src: '/images/facility-4.jpg', alt: 'Sun-filled common space at Pine Haven' },
  { src: '/images/facility-5.jpg', alt: 'Grounds and country setting at Pine Haven' },
  { src: '/images/facility-6.jpg', alt: 'Interior gathering area at Pine Haven Assisted Living' },
  { src: '/images/facility-7.jpg', alt: 'On-site alpacas at Pine Haven Assisted Living' },
  { src: '/images/facility-8.jpg', alt: 'Companion animals at Pine Haven' },
  { src: '/images/photo-4776.jpeg', alt: 'Daily life at Pine Haven Assisted Living' },
  { src: '/images/photo-4777.jpeg', alt: 'Caring staff at Pine Haven Assisted Living' },
];

// Verbatim family testimonials from the original site.
export const TESTIMONIALS = [
  {
    quote: 'My (our) mother loved it at Pine Haven. So did we. Thanks for your loving care!',
    author: 'Nanci B.',
    relation: 'Daughter of a resident',
  },
  {
    quote:
      'The staff treated my mother with such compassion. The home was always clean and warm, and one of the caregivers sat with her so she would not be alone at the end. It is a little jewel of a home.',
    author: 'Terri',
    relation: 'Daughter of a resident',
  },
  {
    quote:
      'After a bad experience at another place, finding Pine Haven for my father was such a relief. We finally felt like he was truly cared for.',
    author: 'Brenda H.',
    relation: 'Daughter of a resident',
  },
];

// The differentiators that actually sell Pine Haven — used on Home + service pages.
export const HIGHLIGHTS = [
  { title: 'On-site companion animals', body: 'Alpacas, a llama, sheep, goats, and chickens that residents help care for and love.' },
  { title: 'Registered Nurse & LPNs on staff', body: 'A registered nurse and licensed practical nurses on site — not just visiting aides.' },
  { title: 'Home-cooked meals', body: 'Three fresh, made-from-scratch meals served family-style every day.' },
  { title: 'Rent from ' + NAP.priceFrom + '/mo', body: `Semi-private rooms ${NAP.priceSemiPrivate}/mo, private rooms ${NAP.pricePrivate}/mo — financial assistance available for those who qualify.` },
  { title: 'State-licensed for 18 residents', body: 'Small, six-bedroom residential homes — a real house with a handful of neighbors, never an institution.' },
  { title: 'Insurance & Medicaid waiver', body: 'We streamline long-term care insurance and accept the Medicaid waiver.' },
];
