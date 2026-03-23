import { ArrowRight, CheckCircle2 } from 'lucide-react';
import heroLogo from '@assets/B7C3758D-4E80-457B-8925-422DC3AD5C33_1774242177721.jpeg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[520px] lg:min-h-[600px]" style={{ background: 'linear-gradient(160deg, #0a0a0d 0%, #111111 30%, #0d0d10 60%, #0a0a0d 100%)' }}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,197,66,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,155,45,0.04) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold mb-5 tracking-wide" style={{ color: '#f5c542' }}>
              Rated 5 Stars &bull; Insured & Bonded &bull; Montgomery, AL
            </p>

            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.15] tracking-tight mb-5 text-white font-serif italic">
              Spotless Homes.<br />
              <span style={{ color: '#f5c542' }}>Zero Stress.</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Premium cleaning that shows up on time — every time.
            </p>

            <div className="space-y-2.5 mb-8 text-left max-w-sm mx-auto lg:mx-0">
              {['Licensed, bonded, and insured', '100% satisfaction guaranteed', 'Serving Montgomery & surrounding areas'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#f5c542' }} />
                  <span className="text-white/80 text-sm">{item}</span>
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
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all duration-200 hover:scale-[1.03] max-w-[320px] w-full justify-center"
                style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d', boxShadow: '0 8px 30px rgba(245,197,66,0.25)' }}
                data-testid="hero-get-quote"
              >
                Get Your Instant Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:334-877-9513"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Or Call (334) 877-9513
              </a>
            </div>

            <p className="text-white/40 text-[13px] mt-4 text-center lg:text-left">
              Takes 30 seconds &bull; No obligation
            </p>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src={heroLogo}
              alt="Self-Maid Cleaning Solutions"
              className="w-full max-w-[440px] object-contain drop-shadow-2xl"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
