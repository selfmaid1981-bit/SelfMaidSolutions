import logoImage from '@assets/logo-gold-nobg.png';

export function AboutSection() {
  return (
    <section id="about" className="about-section section" aria-labelledby="about-h2">
      <div className="sm-container">
        <div className="about-grid">
          <div className="about-frame" aria-hidden="false">
            <div className="about-frame-inner">
              <div className="about-badge-top">
                <span className="ab-num">16+</span>
                <span className="ab-lbl">YEARS EXPERIENCE</span>
              </div>
              <img src={logoImage} alt="Self-Maid Cleaning Solutions" className="about-logo" width="280" height="200" loading="lazy" style={{ mixBlendMode: 'lighten' }} />
              <span className="sparkle s1" aria-hidden="true">&#10024;</span>
              <span className="sparkle s2" aria-hidden="true">&#10024;</span>
              <span className="sparkle s3" aria-hidden="true">&#10024;</span>
            </div>
          </div>

          <div>
            <div className="section-eyebrow left">OUR STORY</div>
            <h2 id="about-h2" className="section-title left">Meet the <span className="gold-text">Owner</span></h2>
            <div className="section-divider-line" style={{ justifyContent: 'flex-start' }}><span>&mdash; Since 2009 &mdash;</span></div>
            <p className="about-body" style={{ marginTop: '1.5rem' }}>
              Hi, I'm Michelle. I built Self-Maid to deliver a level of clean that feels
              calm, consistent, and truly professional &mdash; every time. With 16+ years
              of experience, we treat every home like our own.
            </p>
            <p className="about-body">
              Your satisfaction isn't just a promise &mdash; it's our guarantee.
              Licensed, bonded, insured, and dedicated to excellence in the
              Montgomery metro area.
            </p>
            <ul className="about-creds">
              <li>
                <span className="cred-icon" aria-hidden="true">&#128737;&#65039;</span>
                <div>
                  <strong>Licensed &amp; Insured</strong>
                  <span>Full liability coverage for your peace of mind</span>
                </div>
              </li>
              <li>
                <span className="cred-icon" aria-hidden="true">&#10004;&#65039;</span>
                <div>
                  <strong>Background-Checked Team</strong>
                  <span>Every team member is vetted and trained</span>
                </div>
              </li>
              <li>
                <span className="cred-icon" aria-hidden="true">&#127807;</span>
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
