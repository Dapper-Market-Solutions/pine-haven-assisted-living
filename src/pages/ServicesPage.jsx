import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, CalendarClock, Check } from 'lucide-react';
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
      title="Assisted Living Cost &amp; Services in Michigan"
      brand="Pine Haven"
      description="Assisted living cost in Michigan, explained: Pine Haven in Hemlock, MI is $3,500/mo semi-private or $3,900/mo private, all-inclusive. Medicaid waiver accepted."
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
    />
    <Header />

    <main>
      <PageHero
        eyebrow="Assisted Living &amp; Respite Care"
        title="What assisted living costs in Michigan at Pine Haven"
        subtitle="Plain answers on assisted living cost in Michigan: semi-private rooms from $3,500 a month, private rooms from $3,900, all-inclusive, in a small home in Hemlock. Respite care too."
        image="/images/facility-2.jpg"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">Our services</h2>
          <p className="text-lg text-muted-foreground">
            Every person who comes to Pine Haven arrives with a different story and different needs. Our two core services let us meet your loved one exactly where they are — and adjust as those needs change over time.
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

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Assisted living cost at Pine Haven</h2>
          <p className="text-lg text-muted-foreground mb-5">
            Semi-private rooms at Pine Haven start at <strong className="text-foreground">$3,500&nbsp;per month</strong>, and private rooms start at <strong className="text-foreground">$3,900&nbsp;per month</strong>. Both options are all-inclusive — your monthly rate covers meals, personal care, medication management, utilities, housekeeping, laundry, and a full calendar of activities. There are no surprise add-on fees.
          </p>
          <p className="text-lg text-muted-foreground">
            Pine Haven accepts the <strong className="text-foreground">Michigan Medicaid Home &amp; Community-Based Services (HCBS) waiver</strong> and works directly with most long-term care insurance plans to help simplify the payment process. Our team is happy to walk you through your options and help you understand what coverage may apply.{' '}
            <Link to="/contact" className="text-primary font-semibold hover:underline">
              Contact us to discuss pricing and availability &rarr;
            </Link>
          </p>
          <p className="text-lg text-muted-foreground mt-5">
            Want the longer version? Read{' '}
            <Link to="/blog/assisted-living-cost-michigan" className="text-primary font-semibold hover:underline">
              how much assisted living costs in Michigan
            </Link>{' '}
            and{' '}
            <Link to="/blog/how-to-pay-for-assisted-living-michigan" className="text-primary font-semibold hover:underline">
              how families pay for it
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection />
    </main>

    <Footer />
  </>
);

export default ServicesPage;
