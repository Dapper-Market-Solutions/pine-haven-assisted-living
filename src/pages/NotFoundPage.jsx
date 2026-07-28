import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';

const NotFoundPage = () => {
  useEffect(() => {
    // DMS 404-logging loop: report this dead URL so the SEO/GEO cron can
    // auto-redirect recurring 404s. Fire-and-forget; never blocks the page.
    try {
      fetch('https://help.dapperms.com/api/ingest-404', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer || null }),
        keepalive: true,
      }).catch(() => {})
    } catch { /* ignore */ }
  }, [])

  return (
    <>
      <MetaTags title="Page Not Found" description="The page you’re looking for doesn’t exist." />
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <p className="text-7xl font-bold text-primary mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="px-6 py-3 rounded-lg font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition">
              Back to Home
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-muted transition">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
