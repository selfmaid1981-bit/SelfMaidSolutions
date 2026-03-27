const services = [
  { id: 'ongoing', name: 'Ongoing', desc: 'Maintenance clean', price: 120, popular: false },
  { id: 'premium', name: 'Premium', desc: 'Detailed clean', price: 180, popular: true },
  { id: 'deep', name: 'Deep Clean', desc: 'Full reset', price: 250, popular: false },
];

export function ServicesSection() {
  const scrollToQuote = () => {
    const el = document.getElementById('instant-quote');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C6A969, transparent)', margin: '0 auto 1.5rem' }} />
        <h2 className="text-3xl text-center mb-10" style={{ fontFamily: 'var(--sm-fD)', fontWeight: 600, color: '#1F2A37' }}>
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.id}
              onClick={scrollToQuote}
              className="rounded-xl text-center cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                padding: '2rem 1.5rem',
                border: s.popular ? '2px solid #C6A969' : '1px solid #E5E7EB',
                background: 'white',
                boxShadow: s.popular ? '0 8px 24px rgba(198,169,105,.15)' : '0 2px 8px rgba(0,0,0,.04)',
              }}
            >
              {s.popular && (
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#C6A969', letterSpacing: '.1em', marginBottom: '8px' }}>MOST POPULAR</p>
              )}
              <h3 style={{ fontFamily: 'var(--sm-fD)', fontSize: '1.25rem', fontWeight: 600, color: '#1F2A37' }}>{s.name}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>{s.desc}</p>
              <p style={{ fontSize: '14px', color: '#C6A969', fontWeight: 600, marginTop: '8px' }}>From ${s.price}</p>
              <button style={{
                marginTop: '16px',
                fontSize: '13px',
                color: 'white',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #D4BC85, #C6A969, #A88B4A)',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(198,169,105,.2)',
              }}>
                Book Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
