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
        <h1>Your Home's New<br />Cleaning Standard</h1>

        <button className="hero-cta" onClick={() => scrollTo('instant-quote')}>
          Get a Free Quote
        </button>
      </div>
    </section>
  );
}
