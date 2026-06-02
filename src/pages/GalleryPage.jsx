import React from 'react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import PageHero from '@/components/PageHero.jsx';
import CTASection from '@/components/CTASection.jsx';
import { GALLERY } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const GalleryPage = () => (
  <>
    <MetaTags
      title="Photo Gallery"
      description="See Pine Haven Assisted Living in Hemlock, MI — our six-bedroom homes, warm common spaces, country grounds, and the on-site alpacas, cats, and chickens that residents love."
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Photo Gallery', path: '/gallery' }])}
    />
    <Header />

    <main>
      <PageHero
        eyebrow="Photo Gallery"
        title="A look inside Pine Haven"
        subtitle="Our home, our grounds, and our four-legged residents. The best way to know a place is to see it — so here’s a window in, until you can visit for yourself."
        image="/images/home-2.jpg"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {GALLERY.map((img) => (
              <div key={img.src} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to see it in person?" body="Photos only go so far. Schedule a visit and we’ll show you around — alpacas included." />
    </main>

    <Footer />
  </>
);

export default GalleryPage;
