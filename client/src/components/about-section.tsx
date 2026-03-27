import michelleImage from '@assets/808AA65C-8994-4D31-BAF3-4FDC2EC96722_1774605599285.png';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white px-6" aria-labelledby="about-h2">
      <div className="max-w-4xl mx-auto">
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C6A969, transparent)', margin: '0 auto 1.5rem' }} />
        <h2 id="about-h2" className="text-center mb-10" style={{
          fontFamily: 'var(--sm-fD)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 600, color: '#1F2A37',
        }}>Meet the Owner</h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.85 }}>
              Welcome! I'm Michelle, the proud owner of Self-Maid Cleaning Solutions. Our team is
              dedicated to providing exceptional cleaning services with a personal touch.
              We treat your home like it's our own!
            </p>

            <div style={{ margin: '2rem 0 0' }}>
              <h3 style={{ fontFamily: 'var(--sm-fD)', fontSize: '1.15rem', fontWeight: 600, color: '#1F2A37', marginBottom: '1rem' }}>
                Our Services
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {['Routine House Cleaning', 'Deep Cleaning', 'Move-In/Move-Out Cleaning', 'Post-Construction Cleaning'].map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '14px', color: '#6B7280' }}>
                    <span style={{ color: '#C6A969', fontSize: '16px' }}>✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="trust-badges" style={{ padding: '1.5rem 0 0', justifyContent: 'flex-start', gap: '1.5rem' }}>
              <div className="trust-badge">
                <div className="trust-badge-icon">⭐</div>
                <span className="trust-badge-label">5-Star<br />Rated</span>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">🛡️</div>
                <span className="trust-badge-label">Insured</span>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">🏠</div>
                <span className="trust-badge-label">Local &<br />Trusted</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <img
              src={michelleImage}
              alt="Michelle — Owner of Self-Maid Cleaning Solutions"
              className="rounded-lg shadow-md w-full max-w-sm mx-auto"
              style={{ objectFit: 'cover', height: '420px' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
