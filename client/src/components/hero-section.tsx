import { CheckCircle2 } from 'lucide-react';
import heroLogo from '@assets/B7C3758D-4E80-457B-8925-422DC3AD5C33_1774242177721.jpeg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 60% 40%, rgba(245,197,66,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(200,155,45,0.04) 0%, transparent 50%)'
      }} />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-5 text-white font-serif">
              Spotless Homes.<br />
              Zero Stress.
            </h1>

            <p className="text-white/70 text-base sm:text-lg mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Premium cleaning that shows up on time — every time.
            </p>

            <div className="space-y-2 mb-8 text-left max-w-sm mx-auto lg:mx-0">
              {['Licensed, bonded, and insured', '100% satisfaction guaranteed', 'Serving Montgomery & surrounding areas'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f5c542' }} />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href="#instant-quote"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('instant-quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="nav-book-btn inline-flex items-center gap-2 px-8 py-3 font-bold text-sm tracking-[1px] uppercase"
                data-testid="hero-get-quote"
              >
                GET A QUOTE
              </a>
              <a
                href="tel:334-877-9513"
                className="text-white/60 hover:text-white text-sm font-medium transition-colors"
              >
                Or Call (334) 877-9513
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src={heroLogo}
              alt="Self-Maid Cleaning Solutions"
              className="w-full max-w-[420px] object-contain"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
