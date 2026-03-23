import heroLogo from '@assets/hero-logo-transparent.png';

export function HeroSection() {
  return (
    <section className="hero-bg relative" style={{ display: 'flex', padding: '80px 10%' }}>
      <div className="hero-overlay" />

      <div className="relative z-10 w-full lg:w-1/2">
        <h1 className="font-bold text-white" style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.1 }}>
          Spotless Homes.<br />Zero Stress.
        </h1>

        <p className="text-white/80 mt-4 mb-6">
          Premium cleaning that shows up on time — every time.
        </p>

        <ul className="space-y-2 mb-8">
          {['Licensed, bonded, and insured', '100% satisfaction guaranteed', 'Serving Montgomery & surrounding areas'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
              <span style={{ color: '#f5c542' }}>&#10004;</span>
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            const el = document.getElementById('instant-quote');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="nav-book-btn text-sm tracking-[1px] uppercase"
          data-testid="hero-get-quote"
        >
          GET A QUOTE
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-center relative z-10" style={{ width: '40%' }}>
        <img
          src={heroLogo}
          alt="Self-Maid Cleaning Solutions"
          style={{ width: '400px', filter: 'drop-shadow(0 8px 30px rgba(245,197,66,0.15))' }}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
