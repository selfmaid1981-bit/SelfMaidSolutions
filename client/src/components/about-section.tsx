import cleanImage from '@assets/stock_images/professional_female__5e240e0d.jpg';

export function AboutSection() {
  return (
    <section id="about" className="section" style={{ background: 'transparent', paddingTop: '4rem' }} aria-labelledby="about-h2">
      <div className="sm-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 id="about-h2" style={{
                fontFamily: 'var(--sm-fD)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 600, color: 'var(--sm-navy)', lineHeight: 1.15, marginBottom: '.25rem',
              }}>Meet Michelle</h2>
              <p style={{
                fontFamily: 'var(--sm-fD)', fontSize: '15px', fontStyle: 'italic',
                color: 'var(--sm-gold-dk)', marginBottom: '1.5rem',
              }}>Your Trusted Cleaning Expert</p>
              <div style={{ width: '48px', height: '1px', background: 'var(--sm-gold)', marginBottom: '1.5rem' }} />

              <p style={{ fontSize: '15px', color: 'var(--sm-navy)', fontWeight: 600, marginBottom: '.5rem' }}>Hi, I'm Michelle.</p>
              <p style={{ fontSize: '14px', color: 'var(--sm-gray)', lineHeight: 1.85, marginBottom: '1rem' }}>
                With over 10 years of experience, I'm dedicated to making your home sparkle.
                My team and I are here to provide exceptional, personalized cleaning services you can rely on.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--sm-gray)', lineHeight: 1.85 }}>
                Your satisfaction isn't just a promise — it's our guarantee.
                Licensed, bonded, insured, and dedicated to excellence in the Montgomery metro area.
              </p>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.08)' }}>
              <img
                src={cleanImage}
                alt="Michelle — Owner of Self-Maid Cleaning Solutions"
                style={{ width: '100%', height: '360px', objectFit: 'cover', objectPosition: 'center top' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:767px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
