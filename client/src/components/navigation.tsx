import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import logoImage from '@assets/logo-gold-nobg.png';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (location !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="header-inner">
        <a href="/" className="logo" aria-label="Self-Maid Cleaning Solutions — Home" onClick={(e) => {
          e.preventDefault();
          if (location === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = '/';
          }
        }}>
          <img src={logoImage} alt="Self-Maid Cleaning Solutions" className="logo-img" loading="eager" />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('reviews')}>Reviews</button>
          <button onClick={() => scrollTo('areas')}>Areas</button>
          <button onClick={() => scrollTo('faq')}>FAQ</button>
          <button onClick={() => scrollTo('contact')} className="nav-cta">Get a Quote</button>
        </nav>

        <button
          className="hamburger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <button onClick={() => scrollTo('services')} className="mob-link">Services</button>
          <button onClick={() => scrollTo('about')} className="mob-link">About</button>
          <button onClick={() => scrollTo('reviews')} className="mob-link">Reviews</button>
          <button onClick={() => scrollTo('areas')} className="mob-link">Areas We Serve</button>
          <button onClick={() => scrollTo('faq')} className="mob-link">FAQ</button>
          <button onClick={() => scrollTo('contact')} className="mob-link mob-cta">Get a Quote</button>
          <a href="tel:3348779513" className="mob-link mob-phone">(334) 877-9513</a>
        </nav>
      )}
    </header>
  );
}
