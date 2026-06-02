// JSON-LD builders for per-page structured data (site-standard §3).
// The site-wide Organization/LocalBusiness lives in index.html; these add the
// page-specific Service / FAQPage / BreadcrumbList / etc. on top via MetaTags.

import { SITE_URL, NAP, SERVICE_AREAS } from './site';

const PROVIDER = {
  '@type': 'AssistedLivingFacility',
  name: NAP.name,
  telephone: '+1-989-295-6632',
  address: {
    '@type': 'PostalAddress',
    streetAddress: NAP.street,
    addressLocality: NAP.city,
    addressRegion: NAP.state,
    postalCode: NAP.zip,
    addressCountry: 'US',
  },
};

// Service schema for a single offering (Memory Care, Assisted Living, etc.).
export function serviceSchema({ name, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: PROVIDER,
    areaServed: SERVICE_AREAS.map((c) => ({ '@type': 'City', name: c })),
    url: `${SITE_URL}${slug}`,
  };
}

// FAQPage schema — pass an array of { q, a } objects. Must mirror visible FAQ.
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// BreadcrumbList for inner pages. Pass [{ name, path }] from home → current.
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '' : c.path}`,
    })),
  };
}
