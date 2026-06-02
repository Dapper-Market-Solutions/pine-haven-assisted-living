import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAP } from '@/lib/site';

// Warm closing call-to-action band, reused at the bottom of most pages.
const CTASection = ({
  title = 'Come see if Pine Haven is the right home',
  body = 'Schedule a visit, take a tour, or just call with your questions. We treat every family like our own.',
}) => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">{body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact">
            <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              Schedule a Visit
            </Button>
          </Link>
          <a href={NAP.phoneHref}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5 mr-2" /> {NAP.phone}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
