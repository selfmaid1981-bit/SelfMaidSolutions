export function CtaBandSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-band" aria-label="Call to action">
      <div className="sm-container">
        <div className="cta-band-inner">
          <div className="cta-band-text">
            <h2>Ready for a Spotless Home?</h2>
            <p>Book today and see why 500+ families trust Self-Maid.</p>
          </div>
          <div className="cta-band-actions">
            <button onClick={scrollToContact} className="btn-cta-white">Get a Quote</button>
            <a href="tel:3348779513" className="btn-cta-outline">Call (334) 877-9513</a>
          </div>
        </div>
      </div>
    </section>
  );
}
