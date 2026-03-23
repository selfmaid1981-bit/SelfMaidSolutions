import heroLogo from '@assets/hero-logo-transparent.png';

export function HeroSection() {
  return (
    <section className="relative" style={{ display: 'flex', padding: '80px 10%' }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,13,0.92), rgba(10,10,13,0.5))',
        }}
      />

      <div className="relative z-10 w-full lg:w-1/2">
        <h1 className="font-bold text-white font-serif" style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.1 }}>
          Spotless Homes.<br />Zero Stress.
        </h1>

        <p className="text-white/80 mt-4 mb-6">
          Premium cleaning that shows up on time — every time.
        </p>

        <ul className="space-y-2 mb-8">
          {['Licensed, bonded, and insured', '100% satisfaction guaranteed', 'Serving Montgomery, AL & surrounding areas'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
              <span style={{ color: '#f5c542' }}>&#10004;</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 flex-wrap">
          <button
            onClick={() => {
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-outline-btn text-sm tracking-[1px] uppercase font-bold"
            data-testid="hero-get-quote"
          >
            GET A QUOTE
          </button>
          <a
            href="tel:334-877-9513"
            className="text-white/60 hover:text-white/90 text-sm transition-colors"
          >
            Or Call (334) 877-9513
          </a>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center relative z-10" style={{ width: '40%' }}>
        <img
          src={heroLogo}
          alt="Self-Maid Cleaning Solutions"
          style={{ width: '400px', filter: 'drop-shadow(0 8px 30px rgba(245,197,66,0.2))' }}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
