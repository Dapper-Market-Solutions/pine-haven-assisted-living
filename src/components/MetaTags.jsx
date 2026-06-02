import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, NAP } from '@/lib/site';

// Per-page <head> + structured data. The site-wide Organization/LocalBusiness
// entity schema lives in index.html (baked into every prerendered page), so it
// is NOT repeated here — pass page-specific Service/FAQPage/Breadcrumb schema
// via the `jsonLd` prop (single object or array).

const MetaTags = ({
  title = NAP.name,
  description = 'Family-owned assisted living, memory care, and respite care in Hemlock, Michigan — six-bedroom homes with a registered nurse on staff, home-cooked meals, and on-site companion animals.',
  image = `${SITE_URL}/og-preview.jpg`,
  url, // optional canonical override; defaults to the current route
  jsonLd = null,
}) => {
  const { pathname } = useLocation();
  const canonicalUrl = url || `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  const fullTitle = title === NAP.name ? `${NAP.name} | Assisted Living in Hemlock, MI` : `${title} | ${NAP.name}`;

  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={NAP.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={canonicalUrl} />

      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaTags;
