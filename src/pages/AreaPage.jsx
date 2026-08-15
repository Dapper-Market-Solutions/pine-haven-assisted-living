import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import PageHero from '@/components/PageHero.jsx';
import FAQ from '@/components/FAQ.jsx';
import CTASection from '@/components/CTASection.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { NAP, TESTIMONIALS } from '@/lib/site';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

// City landing page (Saginaw / Midland / Bay City). Each renders unique,
// location-specific copy — never thin duplicate pages — so they earn their own
// local search visibility per the site-standard's programmatic-page guardrails.
const AreaPage = ({ city, distance, blurb, slug }) => {
  const faqs = [
    {
      q: `Does Pine Haven serve families from ${city}, MI?`,
      a: `Yes. Pine Haven is located in Hemlock, ${distance} ${city}, and we proudly welcome residents and families from ${city} and the surrounding Tri-Cities area. Many of our residents come from ${city} and nearby communities.`,
    },
    {
      q: `How far is Pine Haven from ${city}?`,
      a: `Pine Haven is at ${NAP.addressLine}, ${distance} ${city} \u2014 an easy drive for family visits, which we warmly encourage any time.`,
    },
    {
      q: `What kinds of senior care does Pine Haven offer ${city} families?`,
      a: "We offer assisted living, memory care for dementia and Alzheimer\u2019s, and short-term respite care, all within small six-bedroom homes with a registered nurse and LPNs on staff and home-cooked meals.",
    },
    {
      q: `How much does assisted living near ${city} cost at Pine Haven?`,
      a: `Semi-private rooms start at ${NAP.priceSemiPrivate} a month and private rooms at ${NAP.pricePrivate} a month, with financial assistance available for those who qualify. We also help families apply long-term care insurance and accept the Medicaid waiver. Call ${NAP.phone} for a quote based on your loved one\u2019s needs.`,
    },
  ];

  const schema = [
    serviceSchema({
      name: `Assisted Living serving ${city}, MI`,
      description: `Assisted living, memory care, and respite care for ${city}, MI families at Pine Haven in nearby Hemlock.`,
      slug,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: `${city} Assisted Living`, path: slug },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <MetaTags
        title={`Assisted Living & Memory Care Near ${city}, MI`}
        description={`Assisted living, memory care, and respite care near ${city}, MI \u2014 at Pine Haven in Hemlock. Six-bedroom home, RN on staff, home-cooked meals. Rent from ${NAP.priceFrom}/mo.`}
        jsonLd={schema}
      />
      <Header />

      <main>
        <PageHero
          eyebrow={`Serving ${city}, MI`}
          title={`Assisted living & memory care near ${city}`}
          subtitle={blurb}
          image="/images/home-1.jpg"
        />

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-5">
              When a parent or spouse from {city} needs more care than home can provide, the last thing most families want is a big, impersonal facility. Pine Haven is the alternative: a real, six-bedroom home in the country, {distance} {city}, where your loved one is known by name.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              With a registered nurse and LPNs on staff, home-cooked meals, on-site companion animals, and around-the-clock support, we deliver the kind of attentive, personal care that simply isn&apos;t possible at larger places &mdash; all just a short drive from {city}.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Care options for {city} families</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Assisted Living', path: '/assisted-living', body: 'Daily support with meals, medication, and personal care \u2014 independence intact.' },
                { title: 'Memory Care', path: '/memory-care', body: "Specialized dementia and Alzheimer\u2019s care in a calm, secure home setting." },
                { title: 'Respite Care', path: '/respite-care', body: 'Short-term stays that give family caregivers a much-needed break.' },
              ].map((s) => (
                <Link key={s.path} to={s.path} className="group bg-card rounded-2xl p-7 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
                  <h3 className="font-bold text-xl text-card-foreground mb-2">{s.title}</h3>
                  <p className="text-base text-muted-foreground mb-4">{s.body}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">Learn more <ArrowRight className="w-4 h-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why {city} families choose Pine Haven</h2>
            <ul className="space-y-3">
              {[
                'A small, six-bedroom home \u2014 never a crowded institution',
                'Registered nurse & LPNs on staff for real clinical oversight',
                'Home-cooked meals served family-style every day',
                'On-site alpacas, a llama, sheep, goats, and chickens residents adore',
                `Rent from ${NAP.priceFrom}/mo with financial assistance available`,
                "A quiet country setting that\u2019s still an easy drive for visits",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-base md:text-lg text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.author} quote={t.quote} author={t.author} role={t.relation} index={i} />
              ))}
            </div>
          </div>
        </section>

        <FAQ faqs={faqs} title={`${city} senior care \u2014 common questions`} />

        <CTASection title={`Schedule a visit from ${city}`} />
      </main>

      <Footer />
    </>
  );
};

export default AreaPage;
