import { useState } from 'react';
import { Phone, ArrowRight, Sparkles, Shield, Star, Clock, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroTeamImg from '@assets/C426B05F-D2BE-452E-9952-D51C42B2222A_1773675315722.png';
import mascotImg from '@assets/CB9B78E1-3011-4CA6-8EFF-BCEC4E145765_1773674858018.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="premium-hero relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroTeamImg}
            alt="Self-Maid Dream Cleaning Team"
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: 'center 15%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A37]/95 via-[#1F2A37]/75 to-[#1F2A37]/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A37] via-transparent to-[#1F2A37]/30" />
        </div>

        <div className="premium-hero-glow premium-hero-glow-1" />
        <div className="premium-hero-glow premium-hero-glow-2" />
        <div className="hero-particles" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-hero-pill mb-6 hero-badge-glow">
                <Sparkles className="w-4 h-4 text-[#C6A969]" />
                <span className="text-sm font-semibold tracking-wide text-white/90">Bringing the Shine Since 2009</span>
              </div>

              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#C6A969] mb-3 hero-tagline-glow">
                Self-Maid Cleaning Solutions
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight mb-5">
                <span className="block text-white hero-text-shadow">Relax, We Do</span>
                <span className="block premium-hero-headline-accent">the Dirty Work.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/75 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                Professional residential cleaning in Prattville, Montgomery, Millbrook & surrounding areas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="premium-hero-cta hero-cta-pulse group px-10 py-7 rounded-2xl font-extrabold h-auto text-lg border-0 relative"
                >
                  <span className="relative z-10 flex items-center">
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <a
                  href="/quote"
                  className="premium-hero-cta-ghost inline-flex items-center justify-center px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300"
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  Book Cleaning
                </a>
              </div>

              <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                {[
                  { icon: Shield, label: 'Fully Insured', color: 'text-[#1E8E6A]' },
                  { icon: Star, label: '5-Star Rated', color: 'text-[#C6A969] fill-[#C6A969]' },
                  { icon: Clock, label: 'Same-Day Available', color: 'text-[#1E8E6A]' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 bg-white/[0.06] px-3.5 py-2 rounded-full border border-white/[0.08] backdrop-blur-sm">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 hidden lg:flex justify-center lg:justify-end">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl rounded-br-sm px-5 py-3 shadow-xl border border-white/50 max-w-[220px]">
                      <p className="text-[#1F2A37] font-bold text-sm leading-snug">
                        "Let's make your home sparkle!"
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#C6A969] fill-[#C6A969]" />)}
                      </div>
                    </div>
                  </div>
                  <img
                    src={mascotImg}
                    alt="Self-Maid sponge superhero mascot"
                    className="w-52 h-52 lg:w-64 lg:h-64 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] hero-character-glow"
                    loading="eager"
                  />
                </div>

                <div className="absolute -bottom-4 -left-8 z-20 premium-hero-float">
                  <div className="premium-hero-badge hero-badge-glass">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#1E8E6A] to-[#166B50] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2A37]">5.0 Rating</div>
                      <div className="flex gap-0.5 mt-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-[#C6A969] fill-[#C6A969]" />)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-8 z-20 premium-hero-float-delayed">
                  <div className="premium-hero-badge hero-badge-glass">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#C6A969] to-[#A08A50] rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2A37]">100% Insured</div>
                      <div className="text-[10px] text-[#1F2A37]/50">Peace of Mind</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
            <path d="M0 80L60 65C120 50 240 25 360 18C480 10 600 22 720 28C840 34 960 34 1080 28C1200 22 1320 12 1380 7L1440 0V80H0Z" fill="hsl(var(--background))"/>
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
