import React from 'react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import { NAP } from '@/lib/site';

const CookiesPage = () => {
  return (
    <>
      <MetaTags
        title="Cookie Policy"
        description="How Pine Haven Assisted Living uses cookies and similar technologies, and how you control your preferences."
      />
      <Header />

      <main>
        <section className="py-20 bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Cookie Policy
              </h1>
              <p className="text-xl text-secondary-foreground/90 leading-relaxed">
                Last updated: May 21, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">What cookies are</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Cookies are small text files placed on your device when you visit a website. They help the site function, remember your preferences, and understand how visitors use the site.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Consent-first approach</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We do not load analytics or marketing cookies until you accept them. When you first visit, a banner lets you choose &ldquo;Accept All&rdquo; or &ldquo;Essential Only.&rdquo; Until you choose, only the cookie that records your preference is set. You can change your choice at any time using the <strong>Cookie Settings</strong> control in the bottom-left corner of any page.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Types of cookies we use</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Essential</strong> — required for the site to function and to remember your cookie choice. Always active.</li>
                <li><strong>Analytics</strong> — help us understand how the site is used so we can improve it. Loaded only after consent.</li>
                <li><strong>Marketing</strong> — used to measure and improve outreach. Loaded only after consent.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Managing cookies</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Beyond the on-site control, most browsers let you block or delete cookies through their settings. Blocking essential cookies may affect how the site works. For more on managing cookies, see your browser&rsquo;s help documentation.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Questions</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For questions about this policy, contact us at{' '}
                <a href={NAP.emailHref} className="text-primary hover:underline">{NAP.email}</a>{' '}
                or {NAP.phone}.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CookiesPage;
