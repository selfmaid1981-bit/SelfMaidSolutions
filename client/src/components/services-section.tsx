const services = [
  { id: 'ongoing', emoji: '\u{1F3E0}', name: 'Regular Home Cleaning', price: 120, bed: 25, bath: 20, tag: 'Save 15% weekly', desc: 'Weekly, bi-weekly, or monthly. Thorough, detailed, no shortcuts. Your home exactly how you like it \u2014 every time.' },
  { id: 'deep', emoji: '\u2728', name: 'Deep Cleaning', price: 250, bed: 30, bath: 25, tag: 'Most Popular', desc: 'Our most intensive service. Top-to-bottom transformation. Every surface, every corner \u2014 pristine and immaculate.' },
  { id: 'moveinout', emoji: '\u{1F4E6}', name: 'Move-In / Move-Out', price: 150, bed: 25, bath: 20, tag: 'Deposit Guarantee', desc: 'Perfect for property turnovers. Get your deposit back or start fresh. We leave no corner untouched.' },
  { id: 'rental', emoji: '\u{1F3E1}', name: 'Airbnb Turnover', price: 65, bed: 15, bath: 15, tag: 'Same-Day Available', desc: 'Fast & reliable service for hosts. Same-day turnaround keeps your ratings high and guests happy.' },
  { id: 'commercial', emoji: '\u{1F3E2}', name: 'Commercial & Office', price: 120, bed: 0, bath: 20, tag: '', desc: 'Professional workplace cleaning. Keep your team productive and your clients impressed. Recurring plans available.' },
  { id: 'apartment', emoji: '\u{1F3D7}\uFE0F', name: 'Apartment Turnover', price: 108, bed: 20, bath: 18, tag: 'Volume Discounts', desc: 'For landlords and property managers. Same or next-day make-ready with photo documentation and volume pricing.' },
];

export function ServicesSection() {
  const scrollToContact = (serviceId?: string) => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 74;
      const topBarH = document.querySelector('.top-bar')?.clientHeight || 36;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - topBarH - 8, behavior: 'smooth' });
    }
    if (serviceId) {
      setTimeout(() => {
        const select = document.getElementById('f-service') as HTMLSelectElement | null;
        if (select) { select.value = serviceId; select.dispatchEvent(new Event('change', { bubbles: true })); }
      }, 500);
    }
  };

  return (
    <section id="services" className="services-section section" aria-labelledby="services-h2">
      <div className="sm-container">
        <div className="section-intro">
          <div className="section-eyebrow">OUR SERVICES</div>
          <h2 id="services-h2" className="section-title">Experience the <span className="gold-text">Self-Maid</span> Difference</h2>
          <div className="section-divider-line"><span>&mdash; Premium Cleaning &mdash;</span></div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const featured = s.id === 'deep';
            return (
              <article key={s.id} className={`svc-card${featured ? ' featured' : ''}`} onClick={() => scrollToContact(s.id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToContact(s.id); } }} tabIndex={0} role="button" aria-label={`Book ${s.name} - from $${s.price}`}>
                {featured && <div className="popular-badge">MOST POPULAR</div>}
                <div className="svc-num" aria-hidden="true">0{i + 1}</div>
                <div className="svc-emoji" aria-hidden="true">{s.emoji}</div>
                <h3 className="svc-name">{s.name}</h3>
                <div className="svc-price">From <strong>${s.price}</strong></div>
                {s.tag && <div className="svc-tag">{s.tag}</div>}
                <p className="svc-desc">{s.desc}</p>
                <span className="svc-cta">Book Now <span aria-hidden="true">&rarr;</span></span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
