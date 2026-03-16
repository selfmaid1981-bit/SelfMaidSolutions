import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Zap, CheckCircle, Clock, DollarSign } from 'lucide-react';

const pricingExamples = [
  { service: 'Studio Apartment', price: '$80', badge: 'Most Popular' },
  { service: '3-Bed Home', price: '$145', badge: 'Best Value' },
  { service: 'Airbnb Turnover', price: '$65', badge: 'Fast' },
  { service: 'Move-Out Deep Clean', price: '$195', badge: 'Thorough' },
];

const features = [
  'Instant pricing — no waiting',
  'No credit card required',
  'Compare service options',
  'Book directly from quote',
];

export function QuoteAdBanner() {
  const [activePrice, setActivePrice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePrice(prev => (prev + 1) % pricingExamples.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1d4ed8 0%, #0e7490 40%, #0f766e 70%, #1d4ed8 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <Zap className="w-4 h-4 text-amber-300" />
              Instant Online Pricing
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              See Your Exact Price{' '}
              <span className="text-amber-300">in Seconds</span>
            </h2>

            <p className="text-emerald-100/85 text-lg mb-7 leading-relaxed max-w-lg">
              Stop guessing. Use our instant quote calculator to get transparent,
              no-hidden-fee pricing tailored to your home — no phone call needed.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-[15px]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
                data-testid="quote-ad-cta"
              >
                <Calculator className="w-5 h-5" />
                Get My Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:334-877-9513"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200"
              >
                Or Call (334) 877-9513
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Quote Calculator</p>
                    <p className="text-emerald-200/70 text-xs">selfmaidllc.com/quote</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 text-xs font-semibold">Live</span>
                  </div>
                </div>

                <div className="space-y-2.5 mb-5">
                  {pricingExamples.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-500 ${
                        activePrice === i
                          ? 'bg-white/20 border border-white/30 shadow-lg scale-[1.02]'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activePrice === i ? 'bg-amber-400' : 'bg-white/20'}`} />
                        <span className="text-white text-sm font-medium">{item.service}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activePrice === i && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <span className={`font-black text-lg transition-all duration-300 ${activePrice === i ? 'text-amber-300' : 'text-white/60'}`}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="bg-white/8 border border-white/15 rounded-xl p-3 text-center">
                    <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">No Hidden Fees</p>
                    <p className="text-emerald-200/60 text-xs">What you see = what you pay</p>
                  </div>
                  <div className="bg-white/8 border border-white/15 rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-emerald-300 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">Takes 60 Seconds</p>
                    <p className="text-emerald-200/60 text-xs">Answer 4 quick questions</p>
                  </div>
                </div>

                <a
                  href="/quote"
                  className="block w-full text-center bg-amber-400 hover:bg-amber-300 text-slate-900 font-black py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Calculate My Price →
                </a>

                <p className="text-center text-emerald-200/50 text-xs mt-3">
                  Free · Instant · No commitment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
