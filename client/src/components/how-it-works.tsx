export function HowItWorks() {
  const steps = [
    { num: '1', title: 'Get Your Instant Quote', desc: 'Tell us about your space and receive a transparent price in seconds.' },
    { num: '2', title: 'Schedule Your Cleaning', desc: 'Pick the date and time that works best for your life.' },
    { num: '3', title: 'Relax & Enjoy', desc: 'We handle every detail while you enjoy a spotless home.' },
  ];

  return (
    <section className="how-it-works-section section" aria-labelledby="hiw-h2">
      <div className="sm-container">
        <div className="section-intro">
          <p className="section-eyebrow">THE PROCESS</p>
          <h2 id="hiw-h2" className="section-title">How It Works</h2>
          <div className="section-divider" />
        </div>

        <div className="hiw-grid">
          {steps.map((s) => (
            <div key={s.num} className="hiw-step">
              <div className="hiw-num">{s.num}</div>
              <h3 className="hiw-title">{s.title}</h3>
              <p className="hiw-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
