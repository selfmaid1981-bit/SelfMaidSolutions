import { ArrowRight } from 'lucide-react';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773754774408.png';

export function FinalCtaSection() {
  return (
    <section className="bg-[#1F2A37] text-white py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-shrink-0">
          <img
            src={mascotImg}
            alt="Self-Maid Cleaning Solutions mascot"
            className="w-36 h-36 lg:w-48 lg:h-48 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            loading="lazy"
            width={192}
            height={192}
          />
        </div>

        <div className="text-center lg:text-left flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 font-serif italic">
            Ready for a Spotless Home?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Get your free, no-obligation quote today!
          </p>
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#C6A969] hover:bg-[#B8985A] text-[#1F2A37] px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Your Instant Quote
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
