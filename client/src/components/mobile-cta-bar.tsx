export function MobileCtaBar() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 74;
      const topBarH = document.querySelector('.top-bar')?.clientHeight || 36;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - topBarH - 8, behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-cta-bar" role="navigation" aria-label="Quick actions">
      <a href="tel:3348779513" className="mcb-btn" aria-label="Call us">
        <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>&#128222;</span>
        CALL
      </a>
      <a href="sms:3348779513" className="mcb-btn" aria-label="Text us">
        <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>&#128172;</span>
        TEXT
      </a>
      <button onClick={scrollToContact} className="mcb-btn quote-btn" aria-label="Get a quote">
        <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>&#128196;</span>
        GET QUOTE
      </button>
    </div>
  );
}
