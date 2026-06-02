import React from 'react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import { NAP } from '@/lib/site';

const PrivacyPolicyPage = () => {
  return (
    <>
      <MetaTags
        title="Privacy Policy"
        description="Privacy policy for Pine Haven Assisted Living — how we collect, use, and protect your personal information."
      />
      <Header />

      <main>
        <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Privacy Policy</h1>
            <p className="text-lg text-secondary-foreground/90">Last updated: June 1, 2026</p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pine Haven Assisted Living respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect through our website and inquiries, how we use it, and the choices you have.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Information We Collect</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">When you contact us or request a tour, we may collect:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Your name, phone number, and email address</li>
                <li>Information you choose to share about your loved one and their care needs</li>
                <li>Messages and communication records related to your inquiry</li>
                <li>Basic website usage data (such as pages visited), where analytics are enabled with your consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>To respond to your inquiry and schedule tours or visits</li>
                <li>To provide information about our assisted living, memory care, and respite care services</li>
                <li>To follow up with you about your inquiry</li>
                <li>To improve our website and the way we serve families</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Information Sharing</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We do not sell your personal information. We share it only with trusted service providers who help us operate (for example, email delivery), and only as needed to respond to you — or where required by law.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Health Information</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Any health-related details you choose to share with us about a prospective or current resident are treated as confidential and used only to determine fit and to provide appropriate care. We limit access to this information to staff who need it.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Cookies &amp; Analytics</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our website uses cookies and similar technologies only after you consent. No analytics or marketing cookies are set until you accept them through our cookie banner. See our{' '}
                <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for details.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Telephone &amp; Text Communications</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                When you provide a phone number, you may receive calls or text messages related to your inquiry. Any such outreach complies with the Telephone Consumer Protection Act (TCPA) and the regulations of the FTC and FCC, including the{' '}
                <a href="https://www.donotcall.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">National Do-Not-Call Registry</a>. You may opt out of text messages at any time by replying STOP. To learn more about your rights regarding unwanted calls and texts, visit{' '}
                <a href="https://consumer.ftc.gov/unwanted-calls-emails-texts" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">consumer.ftc.gov/unwanted-calls-emails-texts</a>.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Your Choices</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You may request that we update or delete the personal information you have provided, or that we stop contacting you, by emailing{' '}
                <a href={NAP.emailHref} className="text-primary hover:underline">{NAP.email}</a>.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Contact Us</h2>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us:
              </p>
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

export default PrivacyPolicyPage;
