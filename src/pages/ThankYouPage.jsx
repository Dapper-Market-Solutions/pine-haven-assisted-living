import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import { NAP } from '@/lib/site';

const ThankYouPage = () => (
  <>
    <MetaTags title="Thank You" description="Thank you for contacting Pine Haven Assisted Living. We’ll be in touch shortly." />
    <Header />
    <main className="min-h-[60vh] flex items-center bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-9 h-9 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Thank you!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We’ve received your message, and one of our team members will reach out to you shortly. If you’d like to speak with us sooner, we’re here any time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={NAP.phoneHref}>
            <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="w-5 h-5 mr-2" /> Call {NAP.phone}
            </Button>
          </a>
          <Link to="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ThankYouPage;
