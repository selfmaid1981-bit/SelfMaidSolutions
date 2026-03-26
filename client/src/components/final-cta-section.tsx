export function CtaBandSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 74;
      const topBarH = document.querySelector('.top-bar')?.clientHeight || 36;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - topBarH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-band" aria-label="Call to action">
      <div className="sm-container">
        <div className="cta-band-inner">
          <div className="cta-band-text">
            <h2>Ready for a <span className="gold-text">Spotless</span> Home?</h2>
            <p>Book today and see why 500+ families trust Self-Maid.</p>
          </div>
          <div className="cta-band-actions">
            <button onClick={scrollToContact} className="btn btn-gold gold-shimmer">GET A QUOTE</button>
            <a href="tel:3348779513" className="btn btn-outline-gold">CALL (334) 877-9513</a>
          </div>
        </div>
      </div>
    </section>
  );
}
