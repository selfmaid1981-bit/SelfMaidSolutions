import { useState, useEffect } from 'react';

export function HomepageQuoteCalculator() {
  const [form, setForm] = useState({ sqft: '', beds: '', baths: '', tier: 'premium' });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const beds = Math.max(0, parseInt(form.beds) || 0);
    const baths = Math.max(0, parseInt(form.baths) || 0);
    const sqft = Math.max(0, parseInt(form.sqft) || 0);

    let total = 120 + beds * 25 + baths * 20;
    if (sqft > 3000) total += 40;
    else if (sqft > 2000) total += 25;

    const multipliers: Record<string, number> = { ongoing: 1, premium: 1.25, deep: 1.5 };
    total *= multipliers[form.tier] || 1;
    if (total < 150) total = 150;
    setPrice(Math.round(total / 10) * 10);
  }, [form]);

  return (
    <section className="py-24 px-6" id="instant-quote" style={{ background: '#F7F7F5' }}>
      <div className="max-w-xl mx-auto">

        <h2 className="text-center mb-2" style={{ fontFamily: 'var(--sm-fD)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#1F2A37' }}>
          Get a Quick Quote
        </h2>
        <p className="text-center mb-10" style={{ fontSize: '14px', color: '#6B7280', fontStyle: 'italic' }}>
          Calculate Your Cleaning Costs
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-center mb-2" style={{ fontSize: '13px', color: '#6B7280' }}>Home Size (sq ft)</label>
            <input
              type="number" min="0" placeholder="1800"
              value={form.sqft}
              onChange={e => setForm({ ...form, sqft: e.target.value })}
              className="w-full border rounded-lg p-3 text-center text-sm"
              style={{ borderColor: '#E5E7EB', color: '#1F2A37', background: 'white' }}
              data-testid="home-quote-sqft"
            />
          </div>
          <div>
            <label className="block text-center mb-2" style={{ fontSize: '13px', color: '#6B7280' }}>Number of Bedrooms</label>
            <input
              type="number" min="0" max="10" placeholder="3"
              value={form.beds}
              onChange={e => setForm({ ...form, beds: e.target.value })}
              className="w-full border rounded-lg p-3 text-center text-sm"
              style={{ borderColor: '#E5E7EB', color: '#1F2A37', background: 'white' }}
              data-testid="home-quote-bedrooms"
            />
          </div>
          <div>
            <label className="block text-center mb-2" style={{ fontSize: '13px', color: '#6B7280' }}>Number of Bathrooms</label>
            <input
              type="number" min="0" max="10" placeholder="2"
              value={form.baths}
              onChange={e => setForm({ ...form, baths: e.target.value })}
              className="w-full border rounded-lg p-3 text-center text-sm"
              style={{ borderColor: '#E5E7EB', color: '#1F2A37', background: 'white' }}
              data-testid="home-quote-bathrooms"
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <button
            onClick={() => {}}
            style={{
              background: '#C6A969', color: 'white',
              padding: '12px 40px', borderRadius: '999px',
              fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(198,169,105,.25)',
            }}
          >
            Calculate
          </button>
        </div>

        <div className="text-center mt-8">
          <p style={{ fontSize: '14px', color: '#6B7280', fontStyle: 'italic' }}>Your Instant Quote:</p>
          <p style={{
            fontFamily: 'var(--sm-fD)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 700, color: '#1F2A37', margin: '4px 0 0',
          }} data-testid="home-quote-price">${price}</p>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>Final price confirmed after walkthrough</p>
        </div>
      </div>
    </section>
  );
}
