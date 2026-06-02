import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV, NAP } from '@/lib/site';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top contact bar */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-6 gap-y-1 text-sm">
            <span className="hidden sm:inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{NAP.street}, {NAP.city}, {NAP.state}</span>
            </span>
            <a href={NAP.phoneHref} className="flex items-center gap-2 font-semibold hover:text-secondary-foreground/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{NAP.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" aria-label={`${NAP.name} — home`} className="flex items-center">
            <img src="/logo.svg" alt={NAP.name} className="h-11 w-auto md:h-14" width="300" height="72" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1 ${
                      isActive(link.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full pt-2 w-56">
                      <div className="bg-white rounded-lg shadow-lg border border-border py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link to="/contact">
              <Button size="sm" className="ml-3 bg-accent text-accent-foreground hover:bg-accent/90">
                Schedule a Tour
              </Button>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV.map((link) => (
              <React.Fragment key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive(link.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col gap-1 mb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <a href={NAP.phoneHref} className="px-4 py-3 text-base font-semibold text-primary inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> {NAP.phone}
            </a>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full mt-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Schedule a Tour
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
