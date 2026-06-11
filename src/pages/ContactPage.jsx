import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import Turnstile from '@/components/Turnstile.jsx';
import { trackLead } from '@/lib/analytics';
import { NAP } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const CARE_OPTIONS = ['Assisted Living', 'Memory Care', 'Respite Care', 'A tour / general question'];
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', care_interest: '', message: '',
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false); // synchronous double-submit guard — survives rapid clicks
  const [tsToken, setTsToken] = useState(''); // Cloudflare Turnstile token
  const renderedAt = useRef(0); // anti-spam time-trap: set on mount
  const honeypotRef = useRef(null); // anti-spam honeypot field

  // Pre-select the care type if arriving via ?interest=Memory%20Care etc.,
  // and stamp the form render time for the time-trap.
  useEffect(() => {
    renderedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    if (interest && CARE_OPTIONS.includes(interest)) {
      setFormData((d) => ({ ...d, care_interest: interest }));
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in your name, email, and a short message.');
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.pathname,
          referrer: document.referrer || 'direct',
          // Anti-spam (see api/_lib/antispam.js)
          website: honeypotRef.current?.value || '',
          renderedAt: renderedAt.current,
          turnstileToken: tsToken,
        }),
      });

      if (resp.ok || resp.status === 207) {
        trackLead({ formName: 'Pine Haven Contact', care_interest: formData.care_interest });
        toast.success('Thank you! We received your message and will reach out to you shortly.');
        setFormData({ name: '', email: '', phone: '', care_interest: '', message: '' });
        setConsent(false);
      } else {
        const data = await resp.json().catch(() => ({}));
        toast.error(data.error || `Something went wrong. Please call us at ${NAP.phone}.`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error(`Something went wrong. Please call us at ${NAP.phone}.`);
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <>
      <MetaTags
        title="Contact Us & Schedule a Tour"
        description={`Contact Pine Haven Assisted Living in Hemlock, MI. Call ${NAP.phone}, email us, or fill out the form to schedule a tour. Serving Saginaw, Midland, Bay City & Merrill.`}
        jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])}
      />
      <Header />

      <main>
        <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Contact Pine Haven</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">Let’s find out if Pine Haven is right for your family</h1>
            <p className="text-lg md:text-xl text-secondary-foreground/90 leading-relaxed">
              Fill out the form below and one of our helpful staff will reach out to you shortly — or call us any time at{' '}
              <a href={NAP.phoneHref} className="font-semibold underline">{NAP.phone}</a>.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">How can we help?</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1" placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="mt-1" placeholder={NAP.phone} />
                </div>
                <div>
                  <Label htmlFor="care_interest" className="text-foreground">What are you interested in?</Label>
                  <Select value={formData.care_interest} onValueChange={(v) => setFormData({ ...formData, care_interest: v })}>
                    <SelectTrigger id="care_interest" className="mt-1"><SelectValue placeholder="Select an option" /></SelectTrigger>
                    <SelectContent>
                      {CARE_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">How can we help you today? *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="mt-1" placeholder="Tell us a little about your loved one and what you’re looking for." />
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-1" />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I agree that Pine Haven may contact me by phone, text, or email about my inquiry. Message and data rates may apply; consent is not a condition of any service.
                  </Label>
                </div>
                {/* Honeypot — off-screen; humans never fill it, bots do and get silently dropped. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, overflow: 'hidden' }}>
                  <label>Website<input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                {/* Cloudflare Turnstile — renders only when VITE_TURNSTILE_SITE_KEY is set. */}
                <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={setTsToken} />

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading || (TURNSTILE_SITE_KEY && !tsToken)}>
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact info + map */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Visit or call us</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: MapPin, label: 'Address', value: NAP.addressLine, href: `https://maps.google.com/?q=${encodeURIComponent(NAP.mapQuery)}` },
                  { icon: Phone, label: 'Phone', value: NAP.phone, href: NAP.phoneHref },
                  { icon: Mail, label: 'Email', value: NAP.email, href: NAP.emailHref },
                  { icon: Clock, label: 'Hours', value: `Open ${NAP.hours}` },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{c.label}</h3>
                      {c.href ? (
                        <a href={c.href} target={c.label === 'Address' ? '_blank' : undefined} rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors break-words">{c.value}</a>
                      ) : (
                        <p className="text-muted-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-border">
                <iframe
                  title="Map to Pine Haven Assisted Living"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(NAP.mapQuery)}&output=embed`}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
