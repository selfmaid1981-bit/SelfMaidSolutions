import heroLogo from '@assets/hero-logo-transparent.png';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(245,197,66,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(200,155,45,0.03) 0%, transparent 50%)'
      }} />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="section-label text-white/50 mb-6 tracking-[4px]">SELF-MAID CLEANING SOLUTIONS</p>
            <div className="editorial-divider hidden lg:block" />

            <h1 className="font-bold text-white font-serif mb-6" style={{ lineHeight: 1.05 }}>
              Spotless Homes.
              <br />
              <span className="italic" style={{ color: '#f5c542' }}>Zero Stress.</span>
            </h1>

            <p className="text-white/55 text-lg sm:text-xl mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
              Premium cleaning that shows up on time — every time. Serving Montgomery and Central Alabama since 2009.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">
              <a
                href="#instant-quote"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('instant-quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="nav-book-btn inline-flex items-center gap-2 px-10 py-4 font-bold text-sm tracking-[1.5px] uppercase"
                data-testid="hero-get-quote"
              >
                GET A QUOTE
              </a>
              <a
                href="tel:334-877-9513"
                className="text-white/40 hover:text-white/70 text-sm font-light tracking-wide transition-colors"
              >
                Or Call (334) 877-9513
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src={heroLogo}
              alt="Self-Maid Cleaning Solutions"
              className="w-full max-w-[460px] object-contain drop-shadow-md"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,66,0.15), transparent)' }} />
    </section>
  );
}
