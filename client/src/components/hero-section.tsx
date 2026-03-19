import { ArrowRight } from 'lucide-react';

import heroImg from '@assets/89C624EB-3BF3-49AE-BA29-6CA4B6DA0ABB_1773813310714.png';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[480px] lg:min-h-[560px]">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Beautiful white marble kitchen interior"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,28,46,0.78) 0%, rgba(18,32,38,0.75) 50%, rgba(15,28,46,0.78) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-16 lg:py-20 text-center">
        <p className="text-sm font-semibold text-[#C6A969] mb-5 tracking-wide">
          ⭐⭐⭐⭐⭐ Rated &bull; Insured &amp; Bonded &bull; Montgomery, AL
        </p>

        <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.2] tracking-tight mb-4 text-white">
          Luxury Cleaning.<br />
          Done Right.
        </h1>

        <p className="text-white/90 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Reliable, polished results — every visit.
        </p>

        <div className="flex flex-col items-center">
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-[#C6A969] hover:bg-[#B8985A] hover:scale-[1.03] text-[#0f1c2e] px-10 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 max-w-[320px] w-full"
            data-testid="hero-get-quote"
          >
            Get Your Instant Quote →
          </a>
          <p className="text-white/70 text-[13px] mt-3">
            Takes 30 seconds &bull; No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
