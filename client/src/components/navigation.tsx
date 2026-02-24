import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mascotImage from '@assets/2290BC3D-42AC-47C8-8279-D1D3C7452892_1771958986136.png';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/quote', label: 'Get Quote' },
    { href: '/#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'nav-top'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 lg:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity" data-testid="logo-link">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-yellow-400/40">
                <img 
                  src={mascotImage} 
                  alt="Self-Maid Sponge Hero Mascot" 
                  className="w-full h-full object-cover object-[center_20%] scale-110"
                  data-testid="logo-image"
                />
              </div>
              <div className="hidden sm:flex flex-col gap-0.5">
                <span className="logo-brand-text font-serif text-[22px] font-black leading-none tracking-tight" data-testid="brand-text">Self-Maid</span>
                <span className="logo-sub-text text-[9px] font-sans font-bold tracking-[0.22em] uppercase">Cleaning Solutions</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link relative text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link relative px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                      isActive 
                        ? 'text-primary nav-active' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a 
                href="tel:334-877-9513" 
                className="premium-button text-white px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center group ml-2"
                data-testid="nav-phone"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                (334) 877-9513
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 pt-3 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return item.href.startsWith('#') ? (
              <button
                key={item.href}
                onClick={() => {
                  scrollToSection(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-colors"
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            );
          })}
          <a 
            href="tel:334-877-9513" 
            className="premium-button text-white block px-4 py-3 rounded-xl text-base font-bold text-center mt-2"
            data-testid="mobile-nav-phone"
          >
            <Phone className="w-4 h-4 mr-2 inline" />
            (334) 877-9513
          </a>
        </div>
      </div>
    </nav>
  );
}
