import { CheckCircle2 } from 'lucide-react';
import heroLogo from '@assets/hero-logo-transparent.png';

export function HeroSection() {
  return (
    <section className="relative" style={{ padding: '80px 10%' }}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="w-full lg:w-1/2">
          <h1 className="font-bold text-white font-serif" style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.1 }}>
            Spotless Homes.
            <br />
            Zero Stress.
          </h1>

          <p className="text-white/80 text-base mt-4 mb-6 max-w-md">
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

          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('instant-quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="nav-book-btn text-sm tracking-[1px] uppercase"
              data-testid="hero-get-quote"
            >
              GET A QUOTE
            </a>
            <a
              href="tel:334-877-9513"
              className="text-white/60 hover:text-white/90 text-sm transition-colors"
            >
              Or Call (334) 877-9513
            </a>
          </div>
        </div>

        <div className="hidden lg:block w-[40%]">
          <div className="relative">
            <div className="absolute -inset-12 pointer-events-none" style={{
              background: 'radial-gradient(ellipse, rgba(245,197,66,0.12) 0%, transparent 65%)',
              filter: 'blur(25px)'
            }} />
            <img
              src={heroLogo}
              alt="Self-Maid Cleaning Solutions"
              className="relative w-full object-contain"
              style={{ filter: 'drop-shadow(0 8px 30px rgba(245,197,66,0.15))' }}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
