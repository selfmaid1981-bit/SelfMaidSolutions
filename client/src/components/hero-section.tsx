import { CheckCircle2 } from 'lucide-react';
import heroLogo from '@assets/1002A1AE-EF4B-4A40-BBCA-AEA8E3385BAC_1774251413661.png';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 70% 40%, rgba(245,197,66,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(200,155,45,0.03) 0%, transparent 50%)'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-bold text-white font-serif mb-5" style={{ lineHeight: 1.05, letterSpacing: '-1.5px' }}>
              Spotless Homes.
              <br />
              Zero Stress.
            </h1>

            <p className="text-white/60 text-base sm:text-lg mb-7 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Premium cleaning that shows up on time — every time.
            </p>

            <div className="space-y-2.5 mb-8 text-left max-w-sm mx-auto lg:mx-0">
              {['Licensed, bonded, and insured', '100% satisfaction guaranteed', 'Serving Montgomery & surrounding areas'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f5c542' }} />
                  <span className="text-white/65 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">
              <a
                href="#instant-quote"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('instant-quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="nav-book-btn inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm tracking-[1px] uppercase"
                data-testid="hero-get-quote"
              >
                GET A QUOTE
              </a>
              <a
                href="tel:334-877-9513"
                className="text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                Or Call (334) 877-9513
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-8 pointer-events-none" style={{
                background: 'radial-gradient(ellipse, rgba(245,197,66,0.08) 0%, transparent 65%)',
                filter: 'blur(20px)'
              }} />
              <img
                src={heroLogo}
                alt="Self-Maid Cleaning Solutions"
                className="relative w-full max-w-[440px] object-contain"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))' }}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(245,197,66,0.25) 50%, transparent 90%)' }} />
    </section>
  );
}
