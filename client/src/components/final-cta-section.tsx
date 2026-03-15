import { ArrowRight, Phone, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773576264615.png';

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0e7490 40%, #0f766e 70%, #1d4ed8 100%)' }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl scale-150" />
            <img
              src={mascotImg}
              alt="Self-Maid cleaning mascot"
              className="relative w-40 h-40 lg:w-56 lg:h-56 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              loading="lazy"
              width={224}
              height={224}
            />
            <div className="absolute -top-4 -right-2 lg:-right-6 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[180px]">
              <p className="text-white font-semibold text-xs leading-snug">
                Ready for a sparkling clean home? Let's do this!
              </p>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Your Spotless Home{' '}
              <span className="text-amber-300">Starts Here</span>
            </h2>
            <p className="text-blue-100/80 text-lg mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Get your free quote in under 30 seconds. No hidden fees, no commitments — just professional cleaning you can count on.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {[
                { icon: Shield, text: 'Fully Insured' },
                { icon: Star, text: '5.0 Rated' },
                { icon: Clock, text: '16+ Years' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                  <item.icon className="w-4 h-4 text-amber-300" />
                  <span className="text-white/90 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/quote">
                <Button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-10 py-6 rounded-2xl text-lg h-auto shadow-xl hover:shadow-2xl transition-all">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a
                href="tel:334-877-9513"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                (334) 877-9513
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
