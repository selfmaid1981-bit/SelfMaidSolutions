import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, CalendarCheck, ChevronRight, ChevronDown, MapPin, Sparkles, Building2, Home, Key, Package, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import logoImage from '@assets/C1779863-20FF-4284-87E7-F8622C11FE8C_1773603022797.png';

const serviceAreas = [
  { name: "Montgomery", slug: "montgomery-al" },
  { name: "Prattville", slug: "prattville-al" },
  { name: "Millbrook", slug: "millbrook-al" },
  { name: "Wetumpka", slug: "wetumpka-al" },
  { name: "Selma", slug: "selma-al" },
  { name: "Deatsville", slug: "deatsville-al" },
  { name: "Pike Road", slug: "pike-road-al" },
  { name: "Homewood", slug: "homewood-al" },
  { name: "Clanton", slug: "clanton-al" },
  { name: "Alabaster", slug: "alabaster-al" },
];

const serviceTypes = [
  { name: "Residential Cleaning", href: "/services", icon: Home },
  { name: "Deep Cleaning", href: "/services", icon: Sparkles },
  { name: "Commercial/Office", href: "/services", icon: Building2 },
  { name: "Airbnb Cleaning", href: "/airbnb-cleaning", icon: Key },
  { name: "Move In/Out", href: "/services", icon: Package },
  { name: "Apartment Turnover", href: "/services", icon: Briefcase },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const areasTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  }, [location]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
    setAreasDropdownOpen(false);
  };
  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 150);
  };
  const handleAreasEnter = () => {
    if (areasTimeoutRef.current) clearTimeout(areasTimeoutRef.current);
    setAreasDropdownOpen(true);
    setServicesDropdownOpen(false);
  };
  const handleAreasLeave = () => {
    areasTimeoutRef.current = setTimeout(() => setAreasDropdownOpen(false), 150);
  };

  const navItems = [
    { href: '/', label: 'Home' },
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
        <div className="flex justify-between items-center h-[4.5rem] lg:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group" data-testid="logo-link">
              <img 
                src={logoImage} 
                alt="Self-Maid Cleaning Solutions" 
                className="h-12 sm:h-14 w-auto object-contain"
                data-testid="logo-image"
              />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-0.5">
              <Link
                href="/"
                className={`nav-link-enhanced relative px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  location === '/' 
                    ? 'text-[#C6A969] font-semibold' 
                    : 'text-white/80 hover:text-[#C6A969] hover:bg-white/5'
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>

              <div
                ref={servicesDropdownRef}
                className="relative"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <Link
                  href="/services"
                  className={`nav-link-enhanced relative px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 inline-flex items-center gap-1 ${
                    location === '/services' || location === '/airbnb-cleaning'
                      ? 'text-[#C6A969] font-semibold' 
                      : 'text-white/80 hover:text-[#C6A969] hover:bg-white/5'
                  }`}
                  data-testid="nav-services"
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {serviceTypes.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <Icon className="w-4 h-4 text-emerald-500" />
                          {service.name}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                      <Link
                        href="/services"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        View All Services
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                ref={areasDropdownRef}
                className="relative"
                onMouseEnter={handleAreasEnter}
                onMouseLeave={handleAreasLeave}
              >
                <button
                  className={`nav-link-enhanced relative px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 inline-flex items-center gap-1 ${
                    location.startsWith('/services/') 
                      ? 'text-[#C6A969] font-semibold' 
                      : 'text-white/80 hover:text-[#C6A969] hover:bg-white/5'
                  }`}
                  data-testid="nav-service-areas"
                >
                  Service Areas
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${areasDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {areasDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {serviceAreas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/services/${area.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                        onClick={() => setAreasDropdownOpen(false)}
                      >
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        {area.name}, AL
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => {
                const isActive = location === item.href;
                return item.href.startsWith('/#') ? (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href.replace('/', ''))}
                    className="nav-link-enhanced relative text-white/80 hover:text-[#C6A969] px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 hover:bg-white/5"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link-enhanced relative px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-[#C6A969] font-semibold' 
                        : 'text-white/80 hover:text-[#C6A969] hover:bg-white/5'
                    }`}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="nav-book-btn inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 ml-2"
                data-testid="nav-book-now"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Now
              </button>
              <a 
                href="tel:334-877-9513" 
                className="premium-button text-white px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center group ml-1.5"
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
              className="relative w-10 h-10 p-0"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden mobile-menu-container ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="mobile-menu-glass px-4 pt-3 pb-5 space-y-0.5">
          <Link
            href="/"
            className={`mobile-nav-item flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
              location === '/'
                ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80'
            }`}
            style={{ animationDelay: '0ms' }}
            onClick={() => setIsMobileMenuOpen(false)}
            data-testid="mobile-nav-home"
          >
            Home
            {location === '/' && <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0 shadow-sm shadow-emerald-400/50" />}
          </Link>

          <div style={{ animationDelay: '50ms' }}>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`mobile-nav-item flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium w-full text-left transition-all duration-200 ${
                location === '/services' || location === '/airbnb-cleaning'
                  ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80'
              }`}
              data-testid="mobile-nav-services"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-4 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                {serviceTypes.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 text-emerald-500" />
                      {service.name}
                    </Link>
                  );
                })}
                <Link
                  href="/services"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-600 hover:bg-emerald-50/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View All Services
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
              </div>
            )}
          </div>

          <div style={{ animationDelay: '100ms' }}>
            <button
              onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
              className={`mobile-nav-item flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium w-full text-left transition-all duration-200 ${
                location.startsWith('/services/')
                  ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80'
              }`}
              data-testid="mobile-nav-service-areas"
            >
              Service Areas
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAreasOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAreasOpen && (
              <div className="ml-4 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/services/${area.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {area.name}, AL
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map((item, index) => {
            const isActive = location === item.href;
            return item.href.startsWith('/#') ? (
              <button
                key={item.href}
                onClick={() => {
                  scrollToSection(item.href.replace('/', ''));
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-nav-item text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80 flex items-center px-4 py-3 rounded-xl text-[15px] font-medium w-full text-left transition-all duration-200"
                style={{ animationDelay: `${(index + 3) * 50}ms` }}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-item flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80'
                }`}
                style={{ animationDelay: `${(index + 3) * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
                {isActive && <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0 shadow-sm shadow-emerald-400/50" />}
              </Link>
            );
          })}
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100/80">
            <button
              onClick={() => { setIsBookingModalOpen(true); setIsMobileMenuOpen(false); }}
              className="flex-1 inline-flex items-center justify-center gap-2 nav-book-btn text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md transition-all"
              data-testid="mobile-nav-book-now"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Now
            </button>
            <a 
              href="tel:334-877-9513" 
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold shadow-md transition-all"
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
