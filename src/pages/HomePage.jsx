import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Stethoscope, Utensils, Home as HomeIcon, DollarSign, PawPrint, ShieldCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import FAQ from '@/components/FAQ.jsx';
import CTASection from '@/components/CTASection.jsx';
import { NAP, TESTIMONIALS, GALLERY } from '@/lib/site';
import { faqSchema } from '@/lib/schema';

const highlights = [
  { icon: PawPrint, title: 'Companion animals on site', body: 'Alpacas, cats, and chickens residents help care for and love every day.' },
  { icon: Stethoscope, title: 'Registered Nurse on staff', body: 'Real clinical oversight on site — not just visiting aides.' },
  { icon: Utensils, title: 'Home-cooked meals', body: 'Three fresh, made-from-scratch meals served family-style each day.' },
  { icon: DollarSign, title: `Rent from ${NAP.priceFrom}/mo`, body: 'Transparent pricing, with financial assistance available for those who qualify.' },
  { icon: HomeIcon, title: 'Six-bedroom homes', body: 'A real house with a handful of neighbors — never an institution.' },
  { icon: ShieldCheck, title: 'Long-term care insurance', body: 'We streamline the long-term care insurance acceptance process for families.' },
];

const services = [
  {
    title: 'Assisted Living',
    path: '/assisted-living',
    body: 'Help with daily living — medication management, meals, housekeeping, and around-the-clock support — while residents keep their independence and dignity.',
  },
  {
    title: 'Memory Care',
    path: '/memory-care',
    body: 'Specialized, compassionate support for dementia, Alzheimer’s, frontotemporal dementia, and Lewy Body Dementia in a calm, secure home setting.',
  },
  {
    title: 'Respite Care',
    path: '/respite-care',
    body: 'Short-term stays that give family caregivers a much-needed break — for a few days, a few weeks, or longer — with the same loving care.',
  },
];

const homeFaqs = [
  {
    q: 'Where is Pine Haven Assisted Living located?',
    a: `Pine Haven is at ${NAP.addressLine}, in a quiet country setting about 25 minutes west of Saginaw. We proudly serve families from Hemlock, Saginaw, Midland, Bay City, and Merrill.`,
  },
  {
    q: 'How much does it cost to live at Pine Haven?',
    a: `Monthly rent starts at ${NAP.priceFrom}, and financial assistance is available for those who qualify. We also streamline the long-term care insurance acceptance process. Call us at ${NAP.phone} for a personalized quote based on your loved one’s level of care.`,
  },
  {
    q: 'What types of care does Pine Haven provide?',
    a: 'We provide assisted living, memory care for dementia and Alzheimer’s, and short-term respite care — all within small, six-bedroom residential homes with a registered nurse on staff.',
  },
  {
    q: 'Can we tour the home before deciding?',
    a: 'Absolutely. We encourage every family to visit in person, meet our staff and our companion animals, and see the home for themselves. Call us or fill out our contact form to schedule a tour or a virtual visit.',
  },
];

const HomePage = () => {
  return (
    <>
      <MetaTags
        title={NAP.name}
        description={`Pine Haven Assisted Living in Hemlock, MI offers assisted living, memory care, and respite care in warm, six-bedroom homes — with a registered nurse on staff, home-cooked meals, and on-site companion animals. Serving Saginaw, Midland, and Bay City. Rent from ${NAP.priceFrom}/mo.`}
        jsonLd={faqSchema(homeFaqs)}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
          <img src="/images/home-1.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">{NAP.tagline}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Care that makes a difference in Hemlock, MI
              </h1>
              <p className="text-lg md:text-xl text-secondary-foreground/90 leading-relaxed mb-8">
                Pine Haven is a small, family-owned assisted living and memory care home where your loved one is known by name — with a registered nurse on staff, home-cooked meals, and even alpacas in the yard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    Schedule a Tour <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground/10">
                    Explore Our Care
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why families choose Pine Haven</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                We&rsquo;re not a big facility. We&rsquo;re a home — and it shows in everything we do.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-sm border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <h.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground mb-2">{h.title}</h3>
                  <p className="text-base text-muted-foreground">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/facility-1.jpg" alt="A warm common living area inside Pine Haven Assisted Living" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">About Pine Haven</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">A real home, not an institution</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  Tucked into a beautiful, quiet country setting just outside Saginaw, Pine Haven is built around a simple idea: older adults deserve to live well, happy, and safe — with as much independence as possible and all the support they need.
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Our six-bedroom homes mean your loved one is never lost in a crowd. Staff and residents genuinely know each other. There are home-cooked meals, familiar faces, and yes — alpacas, cats, and chickens to brighten every day.
                </p>
                <ul className="space-y-2">
                  {['Family-centered, person-first care', 'Registered nurse on staff', 'Independence with the right level of support'].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-base text-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How we care for your loved one</h2>
              <p className="text-base md:text-lg text-muted-foreground">Three ways we support older adults and the families who love them.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="group bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-card-foreground mb-3">{s.title}</h3>
                  <p className="text-base text-muted-foreground mb-5">{s.body}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Families say it best</h2>
              <p className="text-base md:text-lg text-muted-foreground">A few words from the families who&rsquo;ve trusted us with the people they love.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.author} quote={t.quote} author={t.author} role={t.relation} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery preview */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Take a look around</h2>
                <p className="text-base md:text-lg text-muted-foreground">Our home, our grounds, and our four-legged residents.</p>
              </div>
              <Link to="/gallery" className="inline-flex items-center gap-2 text-primary font-semibold whitespace-nowrap">
                View full gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GALLERY.slice(0, 4).map((img) => (
                <div key={img.src} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ faqs={homeFaqs} />

        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
