const services = [
  { id: 'ongoing', name: 'Ongoing', desc: 'Maintenance clean', price: 120, popular: false },
  { id: 'premium', name: 'Premium', desc: 'Detailed clean', price: 180, popular: true },
  { id: 'deep', name: 'Deep Clean', desc: 'Full reset', price: 250, popular: false },
  { id: 'moveinout', name: 'Move-In / Move-Out', desc: 'Perfect for property turnovers', price: 150, popular: false },
  { id: 'rental', name: 'Airbnb Turnover', desc: 'Same-day turnaround for hosts', price: 65, popular: false },
  { id: 'commercial', name: 'Commercial', desc: 'Office & workspace cleaning', price: 120, popular: false },
];

export function ServicesSection() {
  const scrollToQuote = (serviceId?: string) => {
    const el = document.getElementById('instant-quote');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="services-section section" aria-labelledby="services-h2">
      <div className="sm-container">
        <div className="section-intro">
          <p className="section-eyebrow">OUR SERVICES</p>
          <h2 id="services-h2" className="section-title">Our Services</h2>
          <div className="section-divider" />
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <article
              key={s.id}
              className="svc-card"
              onClick={() => scrollToQuote(s.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToQuote(s.id); } }}
              tabIndex={0}
              role="button"
              aria-label={`Book ${s.name} — from $${s.price}`}
            >
              {s.popular && <div className="popular-badge">MOST POPULAR</div>}
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-price">From ${s.price}</p>
              <span className="svc-cta">Book Now →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
