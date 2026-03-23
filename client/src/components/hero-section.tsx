import heroLogo from '@assets/hero-logo-transparent.png';
import { GoldParticles } from './gold-particles';

export function HeroSection() {
  return (
    <section className="hero-section">
      <GoldParticles />
      <div className="hero-container">
        <div className="hero-content">
          <h1>Spotless Homes.<br />Zero Stress.</h1>
          <p className="hero-subtext">
            Premium cleaning that shows up on time — every time.
          </p>
          <ul className="hero-trust">
            <li>&#10004; Licensed, bonded, and insured</li>
            <li>&#10004; 100% satisfaction guaranteed</li>
            <li>&#10004; Serving Montgomery, AL & surrounding areas</li>
          </ul>
          <div className="hero-actions">
            <a
              href="#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('instant-quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-outline-btn"
              data-testid="hero-get-quote"
            >
              GET A QUOTE
            </a>
            <a href="tel:334-877-9513" className="hero-phone">
              Or Call (334) 877-9513
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroLogo}
            alt="Self-Maid Cleaning Solutions"
          />
        </div>
      </div>
    </section>
  );
}
