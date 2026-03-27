import heroBgImage from '@assets/C40E5A82-7E87-4927-809E-594B6CB93679_1774605599285.png';

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0">
        <img src={heroBgImage} alt="" className="w-full h-full object-cover" style={{ opacity: 0.3 }} loading="eager" />
      </div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(247,247,245,.6) 0%, rgba(255,255,255,.65) 40%, rgba(247,247,245,.75) 100%)',
      }} />

      <div className="absolute bottom-0 left-0 right-0 h-24" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(198,169,105,.08) 50%, rgba(198,169,105,.15) 100%)',
      }} />

      <div className="relative text-center max-w-xl mx-auto px-6 py-24" style={{ zIndex: 2 }}>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C6A969, transparent)', margin: '0 auto 2rem' }} />

        <h1 style={{
          fontFamily: 'var(--sm-fD)',
          fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
          fontWeight: 600,
          color: '#1F2A37',
          lineHeight: 1.1,
        }}>
          Your Home's New<br />Cleaning Standard
        </h1>

        <p className="mt-4" style={{ color: '#6B7280', fontSize: '16px', letterSpacing: '.02em' }}>
          Reliable. Detailed. Consistent.
        </p>

        <button
          onClick={() => scrollTo('instant-quote')}
          className="mt-8"
          style={{
            background: 'linear-gradient(135deg, #D4BC85, #C6A969, #A88B4A)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '.04em',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(198,169,105,.35)',
            transition: 'all .25s',
          }}
        >
          Get Your Instant Quote
        </button>

        <p className="mt-6" style={{ color: '#6B7280', fontSize: '14px' }}>
          <a href="tel:13348779513" style={{ color: '#1F2A37', fontWeight: 500 }}>(334) 877-9513</a>
          <br />
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>www.selfmaidllc.com</span>
        </p>
      </div>
    </section>
  );
}
