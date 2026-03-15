import { useState } from 'react';
import { Phone, ArrowRight, Sparkles, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="premium-hero relative overflow-hidden">
        <div className="premium-hero-glow premium-hero-glow-1" />
        <div className="premium-hero-glow premium-hero-glow-2" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-hero-pill mb-8">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold tracking-wide text-white/90">Bringing the Shine Since 2009</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight mb-6">
                <span className="block text-white">Relax, We Do</span>
                <span className="block premium-hero-headline-accent">the Dirty Work.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/75 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                Professional residential cleaning in Prattville, Montgomery, Millbrook & surrounding areas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="premium-hero-cta group px-8 py-6 rounded-xl font-bold h-auto text-lg border-0"
                >
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a
                  href="tel:334-877-9513"
                  className="premium-hero-cta-ghost inline-flex items-center justify-center px-8 py-6 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (334) 877-9513
                </a>
              </div>

              <p className="text-base text-[#D4AF37]/80 font-medium tracking-wide mb-12">
                Your Mess is Our Magic <span className="inline-block animate-pulse">✨</span>
              </p>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Shield className="w-4 h-4 text-[#19A974]" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock className="w-4 h-4 text-[#19A974]" />
                  <span>Same-Day Available</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative premium-hero-visual">
                <div className="premium-hero-image-frame">
                  <img
                    src="/assets/hero/hero-clean-home.svg"
                    alt="Beautiful clean modern home interior — Self-Maid Cleaning Solutions"
                    className="w-full h-full object-cover"
                    width={640}
                    height={400}
                  />
                  <div className="premium-hero-image-overlay" />
                </div>

                <div className="absolute -bottom-4 -left-4 md:-left-8 z-20 premium-hero-float">
                  <div className="premium-hero-badge">
                    <div className="w-9 h-9 bg-[#19A974] rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C2D3A]">5.0 Rating</div>
                      <div className="flex gap-0.5 mt-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 md:-right-8 z-20 premium-hero-float-delayed">
                  <div className="premium-hero-badge">
                    <div className="w-9 h-9 bg-[#19A974] rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C2D3A]">100% Insured</div>
                      <div className="text-[10px] text-[#1C2D3A]/50">Peace of Mind</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
