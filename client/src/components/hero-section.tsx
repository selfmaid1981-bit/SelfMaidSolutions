export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Spotless Homes.<br />Zero Stress.</h1>
          <p className="hero-subtext">
            Premium cleaning that shows up on time — every time.
          </p>
          <ul className="hero-trust">
            <li>&#10004; Licensed, bonded, insured</li>
            <li>&#10004; 100% satisfaction guarantee</li>
            <li>&#10004; Serving Montgomery, AL</li>
          </ul>
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-cta"
            data-testid="hero-get-quote"
          >
            Book Your Cleaning
          </a>
        </div>

        <div className="hero-image">
          <img
            src="/assets/real-clean-home.png"
            alt="Spotless clean kitchen by Self-Maid Cleaning Solutions"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
