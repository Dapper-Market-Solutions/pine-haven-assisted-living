import React from 'react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import { NAP } from '@/lib/site';

const TermsPage = () => {
  return (
    <>
      <MetaTags title="Terms & Conditions" description="Terms and conditions for the Pine Haven Assisted Living website." />
      <Header />

      <main>
        <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Terms &amp; Conditions</h1>
            <p className="text-lg text-secondary-foreground/90">Last updated: June 1, 2026</p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Use of This Website</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                This website is provided by Pine Haven Assisted Living for general informational purposes. By using it, you agree to these Terms. The content describes our community and services but does not constitute a contract, a guarantee of availability, or medical advice.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Information Accuracy</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We work to keep information on this site — including pricing, availability, and services — accurate and current, but it may change without notice. Pricing such as monthly rent (from {NAP.priceFrom}) is a starting point and depends on each resident’s level of care. Please contact us at {NAP.phone} to confirm current details.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Admissions &amp; Services</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Admission to Pine Haven is subject to assessment, availability, and a separate written residency agreement that governs the actual terms of care, fees, and resident rights. Nothing on this website creates an obligation to admit any individual or to provide a particular service.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">No Medical Advice</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Content on this site is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of a qualified health provider with questions about a medical condition.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Intellectual Property</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The text, images, and design of this website are the property of Pine Haven Assisted Living and may not be reproduced without permission.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pine Haven Assisted Living is not liable for any damages arising from your use of, or inability to use, this website. Third-party links are provided for convenience and we are not responsible for their content.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Governing Law</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                These Terms are governed by the laws of the State of Michigan.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Contact</h2>
              <p className="text-muted-foreground">
                {NAP.name}<br />
                {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}<br />
                Phone: {NAP.phone}<br />
                Email: {NAP.email}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermsPage;
