import { Link } from 'wouter';
import logoImage from '@assets/logo-gold-nobg.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="sm-container">
        <div className="footer-grid">
          <div>
            <img src={logoImage} alt="Self-Maid Cleaning Solutions" className="footer-logo-img" loading="lazy" />
            <p className="footer-desc">
              Professional cleaning services you can trust. Serving Central Alabama
              with 16+ years of experience. Licensed, bonded, and insured.
            </p>
            <a href="tel:3348779513" className="footer-phone" data-testid="footer-phone">(334) 877-9513</a>
          </div>

          <div className="footer-col">
            <h4>SERVICES</h4>
            <Link href="/services">Regular Cleaning</Link>
            <Link href="/services">Deep Cleaning</Link>
            <Link href="/services">Move-In/Move-Out</Link>
            <Link href="/services">Airbnb Turnover</Link>
            <Link href="/services">Commercial Cleaning</Link>
          </div>

          <div className="footer-col">
            <h4>COMPANY</h4>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/portal">My Bookings</Link>
            <a href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL" target="_blank" rel="noopener noreferrer">Leave a Review</a>
          </div>

          <div className="footer-col">
            <h4>SERVICE AREAS</h4>
            <p>Montgomery · Prattville · Millbrook · Wetumpka · Pike Road · Selma · Homewood · Clanton</p>
            <h4 style={{ marginTop: '1.5rem' }}>CONNECT</h4>
            <a href="https://www.facebook.com/selfmaidcleaning" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/selfmaidcleaning" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL" target="_blank" rel="noopener noreferrer">Google</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p data-testid="footer-copyright">&copy; {currentYear} Self-Maid Cleaning Solutions LLC. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '12px' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,.35)' }}>Privacy</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>·</span>
            <Link href="/terms" style={{ color: 'rgba(255,255,255,.35)' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
