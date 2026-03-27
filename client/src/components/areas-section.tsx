const areas = [
  'Montgomery', 'Prattville', 'Selma', 'Homewood',
  'Clanton', 'Millbrook', 'Wetumpka', 'Pike Road', 'Alabaster',
];

export function AreasSection() {
  return (
    <section id="areas" className="areas-section section" aria-labelledby="areas-h2">
      <div className="sm-container">
        <div className="section-intro">
          <p className="section-eyebrow">SERVICE AREAS</p>
          <h2 id="areas-h2" className="section-title">Proudly Serving Central Alabama</h2>
          <div className="section-divider" />
        </div>
        <div className="areas-grid">
          {areas.map(a => (
            <span key={a} className="area-chip">
              📍 {a}, AL
            </span>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '14px', color: 'var(--sm-gray)' }}>
          Don't see your city? <a href="tel:3348779513" style={{ color: 'var(--sm-gold-dk)', fontWeight: 600 }}>Call us</a> — we likely serve your area too.
        </p>
      </div>
    </section>
  );
}
