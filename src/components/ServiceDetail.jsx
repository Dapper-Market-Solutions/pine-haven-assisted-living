import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import PageHero from '@/components/PageHero.jsx';
import FAQ from '@/components/FAQ.jsx';
import CTASection from '@/components/CTASection.jsx';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

// Data-driven layout for the deep service pages (Assisted Living, Memory Care,
// Respite Care). Each page passes its own content; this enforces a consistent,
// SEO-complete shape: direct-answer lead, body sections, amenity list, FAQ +
// matching FAQPage schema, Service schema, and a BreadcrumbList.
const ServiceDetail = ({
  serviceName,
  metaTitle,
  metaDescription,
  slug,
  eyebrow,
  title,
  subtitle,
  heroImage,
  lead, // array of paragraph strings — the direct answer up top
  sections = [], // [{ heading, body: [..paragraphs], image? }]
  amenities, // { title, items: [] }
  faqs = [],
  related = [], // [{ title, path }]
  ctaTitle,
}) => {
  const schema = [
    serviceSchema({ name: serviceName, description: metaDescription, slug }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: serviceName, path: slug },
    ]),
  ];
  if (faqs.length) schema.push(faqSchema(faqs));

  return (
    <>
      <MetaTags title={metaTitle} description={metaDescription} jsonLd={schema} />
      <Header />

      <main>
        <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} image={heroImage} />

        {/* Lead / direct answer */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {lead.map((p, i) => (
              <p key={i} className={`text-lg md:text-xl text-foreground leading-relaxed ${i ? 'mt-5' : ''}`}>{p}</p>
            ))}
          </div>
        </section>

        {/* Body sections, alternating background */}
        {sections.map((s, i) => (
          <section key={i} className={`py-14 md:py-18 ${i % 2 === 0 ? 'bg-muted' : 'bg-background'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 ${s.image ? 'lg:grid-cols-2' : ''} gap-10 items-center`}>
                {s.image && i % 2 === 0 && (
                  <div className="rounded-2xl overflow-hidden shadow-lg order-1 lg:order-none">
                    <img src={s.image} alt={s.imageAlt || ''} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className={s.image ? '' : 'max-w-3xl mx-auto'}>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">{s.heading}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className={`text-base md:text-lg text-muted-foreground leading-relaxed ${j ? 'mt-4' : ''}`}>{p}</p>
                  ))}
                </div>
                {s.image && i % 2 !== 0 && (
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={s.image} alt={s.imageAlt || ''} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Amenities / what's included */}
        {amenities && (
          <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">{amenities.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-4xl mx-auto">
                {amenities.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-base text-secondary-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && <FAQ faqs={faqs} />}

        {/* Related services */}
        {related.length > 0 && (
          <section className="py-14 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Explore more of our care</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.path} to={r.path} className="flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <span className="font-semibold text-card-foreground">{r.title}</span>
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection title={ctaTitle} />
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetail;
