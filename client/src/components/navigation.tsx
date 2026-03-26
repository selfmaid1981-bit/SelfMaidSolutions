import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import logoImage from '@assets/logo-gold-nobg.png';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location]);

  const scrollTo = (id: string) => {
    if (location !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 74;
      const topBarH = document.querySelector('.top-bar')?.clientHeight || 36;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - topBarH - 8, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-inner">
          <span>&#11088; 5-Star Rated &middot; 500+ Happy Customers &middot; Serving Central Alabama Since 2009</span>
          <a href="tel:3348779513" className="top-bar-phone">&#128222; (334) 877-9513</a>
        </div>
      </div>

      <header className="site-header" role="banner">
        <div className="header-inner">
          <a href="/" className="logo" aria-label="Self-Maid Cleaning Solutions — Home" onClick={(e) => {
            e.preventDefault();
            if (location === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.href = '/';
            }
          }}>
            <img src={logoImage} alt="Self-Maid Cleaning Solutions Logo" className="logo-img" width="160" height="60" loading="eager" style={{ mixBlendMode: 'lighten' }} />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <button onClick={() => scrollTo('services')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.65)', fontFamily: 'var(--sm-fD)', fontSize: 'var(--sm-t-xs)', fontWeight: 400, letterSpacing: '.1em' }}>Services</button>
            <button onClick={() => scrollTo('about')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.65)', fontFamily: 'var(--sm-fD)', fontSize: 'var(--sm-t-xs)', fontWeight: 400, letterSpacing: '.1em' }}>About Us</button>
            <button onClick={() => scrollTo('reviews')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.65)', fontFamily: 'var(--sm-fD)', fontSize: 'var(--sm-t-xs)', fontWeight: 400, letterSpacing: '.1em' }}>Reviews</button>
            <button onClick={() => scrollTo('areas')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.65)', fontFamily: 'var(--sm-fD)', fontSize: 'var(--sm-t-xs)', fontWeight: 400, letterSpacing: '.1em' }}>Areas</button>
            <button onClick={() => scrollTo('faq')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.65)', fontFamily: 'var(--sm-fD)', fontSize: 'var(--sm-t-xs)', fontWeight: 400, letterSpacing: '.1em' }}>FAQ</button>
            <button onClick={() => scrollTo('contact')} className="nav-cta">GET A QUOTE</button>
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
            <button onClick={() => { scrollTo('services'); setMobileOpen(false); }} className="mob-link" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,160,32,.08)', textAlign: 'left', cursor: 'pointer' }}>Services</button>
            <button onClick={() => { scrollTo('about'); setMobileOpen(false); }} className="mob-link" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,160,32,.08)', textAlign: 'left', cursor: 'pointer' }}>About Us</button>
            <button onClick={() => { scrollTo('reviews'); setMobileOpen(false); }} className="mob-link" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,160,32,.08)', textAlign: 'left', cursor: 'pointer' }}>Reviews</button>
            <button onClick={() => { scrollTo('areas'); setMobileOpen(false); }} className="mob-link" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,160,32,.08)', textAlign: 'left', cursor: 'pointer' }}>Areas We Serve</button>
            <button onClick={() => { scrollTo('faq'); setMobileOpen(false); }} className="mob-link" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(201,160,32,.08)', textAlign: 'left', cursor: 'pointer' }}>FAQ</button>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} className="mob-link mob-cta" style={{ width: 'calc(100% - 2rem)', background: 'var(--sm-gold)', border: 'none', cursor: 'pointer', textAlign: 'center' }}>GET A QUOTE</button>
            <a href="tel:3348779513" className="mob-link mob-phone">&#128222; (334) 877-9513</a>
          </nav>
        )}
      </header>
    </>
  );
}
