const tiers = [
  { id: 'ongoing', name: 'Ongoing Cleaning', desc: 'Weekly or Bi-Weekly Service', active: false },
  { id: 'premium', name: 'Premium Cleaning', desc: 'Top-to-Bottom Luxury Clean', active: true },
  { id: 'deep', name: 'Deep Cleaning', desc: 'Intensive Whole Home Refresh', active: false },
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
    <section id="services" className="section" style={{ background: 'transparent', paddingTop: '3rem', paddingBottom: '2rem' }}>
      <div className="sm-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={scrollToQuote}
              style={{
                padding: '1.75rem 1.25rem',
                borderRadius: '12px',
                border: t.active ? '2px solid var(--sm-gold)' : '1px solid var(--sm-border)',
                background: t.active ? 'linear-gradient(135deg, #C6A969, #A88B4A)' : 'var(--sm-white)',
                color: t.active ? 'white' : 'var(--sm-navy)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all .25s',
                boxShadow: t.active ? '0 8px 24px rgba(198,169,105,.3)' : '0 2px 8px rgba(0,0,0,.04)',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--sm-fD)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600, marginBottom: '.5rem', lineHeight: 1.2,
              }}>{t.name}</h3>
              <p style={{
                fontSize: '13px', lineHeight: 1.5,
                color: t.active ? 'rgba(255,255,255,.85)' : 'var(--sm-gray)',
                margin: 0,
              }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
