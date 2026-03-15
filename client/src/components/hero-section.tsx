import { useState, useEffect } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck, Star, Shield, Zap, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import { Animated3DLogo } from './animated-3d-logo';

const services = [
  { id: 'residential', icon: Home, title: 'Residential', price: '$80+', gradient: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/25' },
  { id: 'commercial', icon: Building, title: 'Commercial', price: '$120+', gradient: 'from-indigo-500 to-blue-400', shadow: 'shadow-indigo-500/25' },
  { id: 'airbnb', icon: Key, title: 'Airbnb', price: '$65+', gradient: 'from-teal-500 to-emerald-400', shadow: 'shadow-teal-500/25' },
  { id: 'moveout', icon: Truck, title: 'Move In/Out', price: '$150+', gradient: 'from-violet-500 to-purple-400', shadow: 'shadow-violet-500/25' },
];

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [numericTarget]);

  return <>{count}{suffix}</>;
}

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="hero-viral relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="hero-mesh-bg absolute inset-0" />
        <div className="hero-noise absolute inset-0" />
        <div className="hero-grid-pattern absolute inset-0" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/12 rounded-full blur-3xl hero-orb-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/12 rounded-full blur-3xl hero-orb-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl hero-orb-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-cyan-400/8 rounded-full blur-xl hero-orb-float-delayed" />
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-indigo-400/8 rounded-full blur-xl hero-orb-float" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                <div className="hero-badge-glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                  <span className="text-blue-200 font-bold">Alabama's #1 Cleaning Heroes</span>
                </div>
                <div className="hero-badge-urgency inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <span className="text-red-200 font-bold">Only 3 Spots Left This Week!</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05] tracking-tight">
                <span className="block hero-headline-gradient">Professional</span>
                <span className="block drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">House Cleaning</span>
                <span className="block hero-headline-gradient">in Prattville AL</span>
              </h1>

              <p className="text-base md:text-lg text-amber-300/90 font-semibold mb-3 tracking-wide">
                Get an instant cleaning quote in under 30 seconds.
              </p>

              <p className="text-lg md:text-xl text-blue-100/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Serving Prattville, Montgomery, Millbrook & Deatsville since 2009. No shortcuts. No stress. Just results you can trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="hero-cta-primary group px-8 py-6 rounded-2xl font-bold h-auto text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a
                  href="tel:334-877-9513"
                  className="hero-cta-secondary inline-flex items-center justify-center px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2 text-emerald-400" />
                  (334) 877-9513
                </a>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <div className="hero-trust-pill flex items-center gap-2 px-3.5 py-2 rounded-full text-white/90 text-sm">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fully Insured</span>
                </div>
                <div className="hero-trust-pill flex items-center gap-2 px-3.5 py-2 rounded-full text-white/90 text-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>5-Star Rated</span>
                </div>
                <div className="hero-trust-pill flex items-center gap-2 px-3.5 py-2 rounded-full text-white/90 text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Same-Day Available</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="hero-stat-card text-center group hover:border-blue-400/30 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-blue-300 transition-colors"><AnimatedCounter target="500" suffix="+" /></div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Happy Clients</div>
                </div>
                <div className="hero-stat-card text-center group hover:border-purple-400/30 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-purple-300 transition-colors"><AnimatedCounter target="16" /></div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Years Experience</div>
                </div>
                <div className="hero-stat-card text-center group hover:border-emerald-400/30 transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">24/7</div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Support</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative">
                <Animated3DLogo size={280} variant="dark" />
                <div className="absolute top-4 -left-4 z-20 hero-float-card">
                  <div className="hero-floating-badge flex items-center gap-2.5 rounded-2xl px-4 py-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <Star className="w-[18px] h-[18px] text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">5.0 Rating</div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 -right-4 z-20 hero-float-card-delayed">
                  <div className="hero-floating-badge flex items-center gap-2.5 rounded-2xl px-4 py-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-[18px] h-[18px] text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">100% Insured</div>
                      <div className="text-[10px] text-slate-500">Peace of Mind</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <p className="text-center text-blue-200/40 text-xs font-semibold tracking-widest uppercase mb-6">Our Services</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="hero-service-card-viral group relative p-4 md:p-5 rounded-2xl text-center hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-[22px] h-[22px] text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{service.title}</h3>
                    <p className="text-amber-300 font-bold text-lg">{service.price}</p>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 30px rgba(255,255,255,0.05) inset' }} />
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-center text-blue-200/50 text-sm mt-8">
            Serving Montgomery · Prattville · Millbrook · Wetumpka · Alabaster · Selma · Homewood · Clanton & More
          </p>
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
