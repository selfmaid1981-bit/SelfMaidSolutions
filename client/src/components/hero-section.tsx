import { useState, useEffect } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck, Sparkles, Star, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroCharacter from '@assets/C35B6F6D-FBA3-4D14-B4FC-B7466FFAC89B_1771957028664.png';

const services = [
  { id: 'residential', icon: Home, title: 'Residential', price: '$80+', gradient: 'from-blue-500 to-cyan-400' },
  { id: 'commercial', icon: Building, title: 'Commercial', price: '$120+', gradient: 'from-indigo-500 to-blue-400' },
  { id: 'airbnb', icon: Key, title: 'Airbnb', price: '$65+', gradient: 'from-teal-500 to-emerald-400' },
  { id: 'moveout', icon: Truck, title: 'Move In/Out', price: '$150+', gradient: 'from-violet-500 to-purple-400' },
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

        <div className="particles-bg">
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" /><div className="particle" />
          <div className="particle" /><div className="particle" />
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl motion-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl motion-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-500/8 rounded-full blur-2xl motion-pulse" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 hero-badge-glow">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="gradient-text-animated font-bold">Alabama's #1 Cleaning Heroes</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                <span className="block">A Clean That</span>
                <span className="block hero-headline-gradient">Feels Like</span>
                <span className="block hero-headline-gradient">Home.</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Professional cleaning done the right way, every time. No shortcuts. No stress. Just results you can trust.
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
                  className="inline-flex items-center justify-center px-8 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5 mr-2 text-emerald-400" />
                  (334) 877-9513
                </a>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Same-Day Available</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="hero-stat-card text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-white"><AnimatedCounter target="500" suffix="+" /></div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Happy Clients</div>
                </div>
                <div className="hero-stat-card text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-white"><AnimatedCounter target="16" /></div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Years Experience</div>
                </div>
                <div className="hero-stat-card text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-white">24/7</div>
                  <div className="text-[11px] text-blue-200/60 font-medium uppercase tracking-wider mt-1">Support</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative hero-character-container">
                <div className="absolute inset-0 hero-character-glow" />
                <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-2xl motion-pulse" />
                <img
                  src={heroCharacter}
                  alt="Self-Maid Cleaning Superhero - Professional cleaning with superpowers"
                  className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto hero-character-float drop-shadow-2xl"
                />
                <div className="absolute top-8 -left-4 hero-floating-badge">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">5.0 Rating</div>
                      <div className="text-[10px] text-slate-500">500+ Reviews</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 -right-4 hero-floating-badge" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 stagger-in">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="hero-service-card-viral group relative p-4 md:p-5 rounded-2xl text-center hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`w-11 h-11 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{service.title}</h3>
                    <p className="text-amber-300 font-bold text-lg">{service.price}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-center text-blue-200/50 text-sm mt-8">
            Serving Montgomery · Prattville · Millbrook · Wetumpka · Alabaster · Selma · Homewood · Clanton & More
          </p>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
