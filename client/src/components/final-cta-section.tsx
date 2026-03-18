import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="bg-[#1F2A37] text-white py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
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
    </section>
  );
}
