import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Brain, CalendarClock, Check } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import PageHero from '@/components/PageHero.jsx';
import CTASection from '@/components/CTASection.jsx';
import { NAP } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const services = [
  {
    icon: HeartHandshake,
    title: 'Assisted Living',
    path: '/assisted-living',
    body: 'Private studios, home-cooked meals, medication management, and 24-hour support — with all the independence your loved one wants to keep.',
    points: ['Private studio apartments', 'Medication management by an RN', 'Three home-cooked meals daily'],
  },
  {
    icon: Brain,
    title: 'Memory Care',
    path: '/memory-care',
    body: 'Specialized, compassionate care for dementia, Alzheimer’s, frontotemporal dementia, and Lewy Body Dementia in a calm, secure home.',
    points: ['Consistent caregivers & routine', 'Calm, home-scale environment', 'Animal-assisted comfort'],
  },
  {
    icon: CalendarClock,
    title: 'Respite Care',
    path: '/respite-care',
    body: 'Short-term stays that give family caregivers a break — for hours, days, or weeks — with the same warm care our residents enjoy.',
    points: ['Flexible short-term stays', 'Full personal care & meals', 'A no-pressure way to try Pine Haven'],
  },
];

const ServicesPage = () => (
  <>
    <MetaTags
      title="Our Services — Assisted Living, Memory Care & Respite Care"
      description={`Pine Haven Assisted Living in Hemlock, MI offers assisted living, memory care for dementia and Alzheimer's, and short-term respite care in small six-bedroom homes. Serving Saginaw, Midland & Bay City. Rent from ${NAP.priceFrom}/mo.`}
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
    />
    <Header />

    <main>
      <PageHero
        eyebrow="Assisted Living & Respite Care"
        title="Exceptional senior care in Hemlock, MI"
        subtitle="Helping older adults lead enriching, dignified lives — with the right level of support, in a home that feels like one."
        image="/images/facility-2.jpg"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">Our services</h2>
          <p className="text-lg text-muted-foreground">
            Every person who comes to Pine Haven arrives with a different story and different needs. Our three core services let us meet your loved one exactly where they are — and adjust as those needs change over time.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.path} className="flex flex-col bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-2xl text-card-foreground mb-3">{s.title}</h3>
              <p className="text-base text-muted-foreground mb-5">{s.body}</p>
              <ul className="space-y-2 mb-6">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /> {p}
                  </li>
                ))}
              </ul>
              <Link to={s.path} className="mt-auto inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Learn more about {s.title.toLowerCase()} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>

    <Footer />
  </>
);

export default ServicesPage;
