import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="text-white py-16 lg:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0d 0%, #111111 50%, #0a0a0d 100%)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 font-serif italic">
          Ready for a Spotless Home?
        </h2>
        <p className="text-white/50 text-base mb-8">
          Limited availability this week
        </p>
        <div>
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d', boxShadow: '0 8px 30px rgba(245,197,66,0.25)' }}
          >
            Get Your Instant Quote
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-white/30 text-sm mt-3">Takes 30 seconds — no obligation</p>
        </div>
      </div>
    </section>
  );
}
