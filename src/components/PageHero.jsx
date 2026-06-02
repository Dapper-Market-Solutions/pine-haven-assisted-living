import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NAP } from '@/lib/site';

// Reusable inner-page hero. Optional background image with a pine overlay so
// white text stays legible (WCAG) over any photo.
const PageHero = ({ eyebrow, title, subtitle, image }) => {
  return (
    <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/85" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 font-sans">{eyebrow}</p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-secondary-foreground/90 leading-relaxed">{subtitle}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                Schedule a Visit
              </Button>
            </Link>
            <a href={NAP.phoneHref}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground/10">
                Call {NAP.phone}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
