const areas = [
  'Montgomery', 'Prattville', 'Selma', 'Homewood',
  'Clanton', 'Millbrook', 'Wetumpka', 'Pike Road', 'Alabaster',
];

export function AreasSection() {
  return (
    <section id="areas" className="areas-section section" aria-labelledby="areas-h2">
      <div className="sm-container">
        <div className="section-intro">
          <div className="section-eyebrow">SERVICE AREAS</div>
          <h2 id="areas-h2" className="section-title">Proudly Serving <span className="gold-text">Central Alabama</span></h2>
          <div className="section-divider-line"><span>&mdash; Montgomery &amp; Beyond &mdash;</span></div>
        </div>
        <div className="areas-grid">
          {areas.map(a => (
            <span key={a} className="area-chip">
              <span aria-hidden="true">&#128205;</span> {a}, AL
            </span>
          ))}
        </div>
        <p className="areas-note" style={{ marginTop: '1.5rem' }}>
          Don't see your city? <a href="tel:3348779513">Call us</a> &mdash; we likely serve your area too.
        </p>
      </div>
    </section>
  );
}
