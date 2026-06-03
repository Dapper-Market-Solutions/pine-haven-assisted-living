import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Star } from 'lucide-react';
import { NAP, SERVICE_AREAS, SOCIALS } from '@/lib/site';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt={NAP.name} className="h-20 w-auto brightness-0 invert mb-4" width="1170" height="762" />
            <p className="text-sm text-secondary-foreground/80 leading-relaxed max-w-xs mb-5">
              {NAP.tagline} A family-owned assisted living and memory care home in {NAP.city}, {NAP.stateLong} — 25 minutes from Saginaw.
            </p>
            <div className="flex gap-3">
              {SOCIALS.facebook && (
                <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Pine Haven on Facebook" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {SOCIALS.instagram && (
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Pine Haven on Instagram" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {SOCIALS.google && (
                <a href={SOCIALS.google} target="_blank" rel="noopener noreferrer" aria-label="Pine Haven on Google" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Star className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <span className="font-semibold text-base mb-4 block font-display">Care &amp; Services</span>
            <ul className="space-y-2">
              {[
                { name: 'Assisted Living', path: '/assisted-living' },
                { name: 'Memory Care', path: '/memory-care' },
                { name: 'Respite Care', path: '/respite-care' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Contact & Tours', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-base mb-4 block font-display">Visit or Call</span>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{NAP.street}<br />{NAP.city}, {NAP.state} {NAP.zip}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={NAP.phoneHref} className="hover:text-secondary-foreground transition-colors">{NAP.phone}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={NAP.emailHref} className="hover:text-secondary-foreground transition-colors break-all">{NAP.email}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Open {NAP.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-base mb-4 block font-display">Proudly Serving</span>
            <ul className="space-y-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm text-secondary-foreground/80">{area}, MI</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/80">
            © {new Date().getFullYear()} {NAP.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/privacy" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Cookie Policy</Link>
            <Link to="/terms" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Terms</Link>
            <a href="https://consumer.ftc.gov/unwanted-calls-emails-texts" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Do Not Call Registry</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
