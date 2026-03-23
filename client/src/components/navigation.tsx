import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import logoImage from '@assets/logo-gold-nobg.png';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#testimonials', label: 'Reviews' },
    { href: '/#services', label: 'Before & After' },
    { href: '/about', label: 'Team' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      if (location !== '/') {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'nav-top'}`}>
      <div style={{ padding: '0 10%' }}>
        <div className="flex items-center justify-between" style={{ padding: '20px 0' }}>
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0" data-testid="logo-link">
            <img
              src={logoImage}
              alt="Self-Maid Cleaning Solutions"
              className="h-12 lg:h-14 w-auto object-contain"
              style={{ mixBlendMode: 'lighten' }}
              data-testid="logo-image"
            />
          </Link>

          <div className="hidden lg:flex items-center" style={{ gap: '30px' }}>
            {navItems.map((item) => {
              const isActive = location === item.href;
              return item.href.startsWith('/#') ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.replace('/', ''))}
                  className="text-white/70 hover:text-white text-[14px] tracking-[1px] transition-colors"
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] tracking-[1px] transition-colors ${
                    isActive
                      ? 'text-[#f5c542]'
                      : 'text-white/70 hover:text-white'
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="nav-book-btn px-6 py-2.5 text-[13px] font-bold tracking-[1px] uppercase"
              data-testid="nav-book-now"
            >
              GET A QUOTE
            </button>
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 p-0"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden mobile-menu-container ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="mobile-menu-glass px-4 pt-3 pb-5 space-y-0.5">
          {navItems.map((item, index) => {
            const isActive = location === item.href;
            return item.href.startsWith('/#') ? (
              <button
                key={item.href}
                onClick={() => {
                  scrollToSection(item.href.replace('/', ''));
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-nav-item text-white/70 hover:text-white hover:bg-white/5 flex items-center px-4 py-3 rounded-xl text-[15px] font-medium w-full text-left transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-item flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#f5c542] bg-[#f5c542]/10 font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.label}
                {isActive && <span className="w-2 h-2 rounded-full bg-[#f5c542] flex-shrink-0" />}
              </Link>
            );
          })}
          <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => { setIsBookingModalOpen(true); setIsMobileMenuOpen(false); }}
              className="flex-1 inline-flex items-center justify-center gap-2 nav-book-btn px-4 py-3 rounded-md text-sm font-bold transition-all"
              data-testid="mobile-nav-book-now"
            >
              GET A QUOTE
            </button>
            <a
              href="tel:334-877-9513"
              className="flex-1 text-white flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-bold transition-all"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}
              data-testid="mobile-nav-phone"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </nav>
  );
}
