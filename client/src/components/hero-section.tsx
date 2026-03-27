import heroLogo from '@assets/hero-logo-transparent.png';
import heroBgImage from '@assets/stock_images/sparkling_clean_kitc_dc53ff93.jpg';

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <img src={heroBgImage} alt="" className="hero-bg-image" aria-hidden="true" loading="eager" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <img src={heroLogo} alt="Self-Maid Cleaning Solutions" className="hero-logo-img" loading="eager" />

        <h1>Your Home's New<br />Cleaning Standard</h1>
        <p className="hero-sub">Reliable. Detailed. Consistent.</p>

        <button className="hero-cta" onClick={() => scrollTo('contact')}>
          Get Your Instant Quote
        </button>

        <div className="hero-phone">
          <p>Call or Text</p>
          <a href="tel:3348779513">(334) 877-9513</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>16+</strong>
            <span>Years</span>
          </div>
          <div className="hero-stat">
            <strong>500+</strong>
            <span>Happy Clients</span>
          </div>
          <div className="hero-stat">
            <strong>5.0</strong>
            <span>★ Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}
