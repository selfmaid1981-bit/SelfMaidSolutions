import cleanImage from '@assets/stock_images/professional_house_c_5be17032.jpg';

export function AboutSection() {
  return (
    <section id="about" className="about-section section" aria-labelledby="about-h2">
      <div className="sm-container">
        <div className="about-grid">
          <div className="about-image-wrap">
            <img src={cleanImage} alt="Professional cleaning service" loading="lazy" />
            <div className="about-badge">
              <strong>16+</strong>
              <span>Years</span>
            </div>
          </div>

          <div>
            <p className="section-eyebrow" style={{ textAlign: 'left' }}>OUR STORY</p>
            <h2 id="about-h2" className="section-title" style={{ textAlign: 'left' }}>Meet Michelle</h2>
            <div className="section-divider" style={{ margin: '1rem 0 0' }} />

            <p className="about-body" style={{ marginTop: '1.5rem' }}>
              We provide detailed, reliable cleaning services designed to keep your
              home calm, clean, and consistently cared for. With 16+ years of experience,
              we treat every home like our own.
            </p>
            <p className="about-body">
              Your satisfaction isn't just a promise — it's our guarantee.
              Licensed, bonded, insured, and dedicated to excellence in the
              Montgomery metro area.
            </p>

            <p style={{ fontSize: '14px', color: 'var(--sm-gold-dk)', fontWeight: 600, marginTop: '1rem' }}>
              Owner · Local · Trusted
            </p>

            <ul className="about-creds" style={{ marginTop: '1.5rem' }}>
              <li>
                <span className="cred-icon" aria-hidden="true">🛡️</span>
                <div>
                  <strong>Licensed & Insured</strong>
                  <span>Full liability coverage for your peace of mind</span>
                </div>
              </li>
              <li>
                <span className="cred-icon" aria-hidden="true">✔️</span>
                <div>
                  <strong>Background-Checked Team</strong>
                  <span>Every team member is vetted and trained</span>
                </div>
              </li>
              <li>
                <span className="cred-icon" aria-hidden="true">🌿</span>
                <div>
                  <strong>Eco-Friendly Products</strong>
                  <span>Safe for your family, pets, and the planet</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
