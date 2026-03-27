import { useState, useEffect } from 'react';

export function HomepageQuoteCalculator() {
  const [form, setForm] = useState({
    sqft: '',
    beds: '',
    baths: '',
    tier: 'premium',
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const beds = Math.max(0, parseInt(form.beds) || 0);
    const baths = Math.max(0, parseInt(form.baths) || 0);
    const sqft = Math.max(0, parseInt(form.sqft) || 0);

    let total = 120 + beds * 25 + baths * 20;

    if (sqft > 3000) total += 40;
    else if (sqft > 2000) total += 25;

    const multipliers: Record<string, number> = {
      ongoing: 1,
      premium: 1.25,
      deep: 1.5,
    };
    total *= multipliers[form.tier] || 1;
    if (total < 150) total = 150;

    setPrice(Math.round(total / 10) * 10);
  }, [form]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  const tierCards = [
    { value: 'ongoing', label: 'Ongoing Cleaning', desc: 'Weekly or Bi-Weekly Service' },
    { value: 'premium', label: 'Premium Cleaning', desc: 'Top-to-Bottom Luxury Clean' },
    { value: 'deep', label: 'Deep Cleaning', desc: 'Intensive Whole Home Refresh' },
  ];

  return (
    <section className="section" id="instant-quote" style={{ background: 'transparent', paddingTop: '1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--sm-fD)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 600, color: 'var(--sm-navy)', lineHeight: 1.15, marginBottom: '.5rem',
          }}>Get a Quick Quote</h2>
          <p style={{ fontSize: '14px', color: 'var(--sm-gray)', fontStyle: 'italic' }}>Calculate Your Cleaning Costs</p>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {tierCards.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setForm({ ...form, tier: t.value })}
              style={{
                padding: '1.25rem 1rem',
                borderRadius: '12px',
                border: form.tier === t.value ? '2px solid var(--sm-gold)' : '1px solid var(--sm-border)',
                background: form.tier === t.value ? 'linear-gradient(135deg, #C6A969, #A88B4A)' : 'var(--sm-white)',
                color: form.tier === t.value ? 'white' : 'var(--sm-navy)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all .25s',
                boxShadow: form.tier === t.value ? '0 6px 20px rgba(198,169,105,.3)' : '0 2px 8px rgba(0,0,0,.04)',
              }}
            >
              <span style={{ fontFamily: 'var(--sm-fD)', fontSize: '1rem', fontWeight: 600, display: 'block', lineHeight: 1.2 }}>{t.label}</span>
              <span style={{ fontSize: '11px', display: 'block', marginTop: '4px', color: form.tier === t.value ? 'rgba(255,255,255,.8)' : 'var(--sm-gray)' }}>{t.desc}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sm-gray)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>Home Size (sq ft)</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 1800"
              value={form.sqft}
              onChange={e => setForm({ ...form, sqft: e.target.value })}
              style={{
                width: '100%', padding: '.75rem 1rem', borderRadius: '10px',
                border: '1px solid var(--sm-border)', background: 'var(--sm-white)',
                fontSize: '14px', color: 'var(--sm-navy)', textAlign: 'center',
                outline: 'none',
              }}
              data-testid="home-quote-sqft"
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sm-gray)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>Number of Bedrooms</label>
            <input
              type="number"
              min="0"
              max="10"
              placeholder="e.g. 3"
              value={form.beds}
              onChange={e => setForm({ ...form, beds: e.target.value })}
              style={{
                width: '100%', padding: '.75rem 1rem', borderRadius: '10px',
                border: '1px solid var(--sm-border)', background: 'var(--sm-white)',
                fontSize: '14px', color: 'var(--sm-navy)', textAlign: 'center',
                outline: 'none',
              }}
              data-testid="home-quote-bedrooms"
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sm-gray)', display: 'block', marginBottom: '6px', textAlign: 'center' }}>Number of Bathrooms</label>
            <input
              type="number"
              min="0"
              max="10"
              placeholder="e.g. 2"
              value={form.baths}
              onChange={e => setForm({ ...form, baths: e.target.value })}
              style={{
                width: '100%', padding: '.75rem 1rem', borderRadius: '10px',
                border: '1px solid var(--sm-border)', background: 'var(--sm-white)',
                fontSize: '14px', color: 'var(--sm-navy)', textAlign: 'center',
                outline: 'none',
              }}
              data-testid="home-quote-bathrooms"
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button
            onClick={scrollToContact}
            style={{
              background: 'linear-gradient(135deg, #C6A969, #A88B4A)',
              color: 'white', padding: '.85rem 3rem', borderRadius: '999px',
              border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600,
              letterSpacing: '.03em', boxShadow: '0 4px 16px rgba(198,169,105,.3)',
              transition: 'all .25s',
            }}
          >
            Calculate
          </button>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <p style={{ fontSize: '14px', color: 'var(--sm-gray)', fontStyle: 'italic', marginBottom: '.25rem' }}>Your Instant Quote:</p>
          <p style={{
            fontFamily: 'var(--sm-fD)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 700, color: 'var(--sm-navy)', margin: 0, lineHeight: 1,
          }} data-testid="home-quote-price">${price}</p>
          <p style={{ fontSize: '12px', color: 'var(--sm-gray-lt)', marginTop: '.5rem' }}>Final price confirmed after walkthrough</p>
        </div>
      </div>
    </section>
  );
}
