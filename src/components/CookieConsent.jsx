import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Cookie consent gate. While the visitor hasn't decided, GTM (and anything
// loaded through it — analytics, marketing pixels) does NOT load. On accept,
// we set a cookie and call window.phLoadGTM() (defined inline in index.html).
//
// Cookie: ph_cookie_consent (values: accepted | declined), 1-year TTL.
// Reopen via the small pill in the bottom-left after a choice is made.

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('ph_cookie_consent=')) {
      setHasConsented(true);
    } else {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    document.cookie = 'ph_cookie_consent=accepted;path=/;max-age=31536000;SameSite=Lax';
    setVisible(false);
    setHasConsented(true);
    // Consent Mode v2: grant the ad + analytics signals, then load GTM.
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
    if (window.phLoadGTM) window.phLoadGTM();
  }

  function decline() {
    document.cookie = 'ph_cookie_consent=declined;path=/;max-age=31536000;SameSite=Lax';
    setVisible(false);
    setHasConsented(true);
    // Leave Consent Mode at denied; Google still sends cookieless pings.
  }

  function reopen() {
    document.cookie = 'ph_cookie_consent=;path=/;max-age=0';
    setHasConsented(false);
    setVisible(true);
  }

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4">
          <div className="max-w-4xl mx-auto rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl bg-secondary text-secondary-foreground border border-primary/30">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">We value your privacy.</p>
              <p className="text-secondary-foreground/70 text-xs leading-relaxed">
                We use cookies to analyze site traffic and improve your experience. No tracking cookies are set until you consent. By clicking &ldquo;Accept,&rdquo; you agree to our use of analytics and marketing cookies.{' '}
                <Link to="/cookies" className="underline hover:text-secondary-foreground">Cookie Policy</Link>
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md border border-secondary-foreground/25 text-secondary-foreground/70 hover:border-secondary-foreground/50 transition cursor-pointer"
              >
                Essential Only
              </button>
              <button
                onClick={accept}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md bg-primary text-primary-foreground hover:-translate-y-0.5 transition cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {hasConsented && !visible && (
        <button
          onClick={reopen}
          className="fixed bottom-4 left-4 z-[9998] flex items-center gap-2 px-3 py-2 text-xs rounded-full bg-secondary/90 text-secondary-foreground/70 border border-primary/30 backdrop-blur-sm hover:text-secondary-foreground transition cursor-pointer"
          aria-label="Cookie Settings"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="15" cy="7" r="1" fill="currentColor" />
            <circle cx="10" cy="14" r="1" fill="currentColor" />
            <circle cx="16" cy="13" r="1.5" fill="currentColor" />
          </svg>
          Cookie Settings
        </button>
      )}
    </>
  );
}
