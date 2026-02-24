import { useState } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascotBanner from '@assets/ChatGPT_Image_Jan_27,_2026,_05_57_05_AM_1769511552762.png';

const services = [
  { id: 'residential', icon: Home, title: 'Residential', price: '$80+', gradient: 'from-blue-500 to-cyan-400' },
  { id: 'commercial', icon: Building, title: 'Commercial', price: '$120+', gradient: 'from-indigo-500 to-blue-400' },
  { id: 'airbnb', icon: Key, title: 'Airbnb', price: '$65+', gradient: 'from-teal-500 to-emerald-400' },
  { id: 'moveout', icon: Truck, title: 'Move In/Out', price: '$150+', gradient: 'from-violet-500 to-purple-400' },
];

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="hero relative overflow-hidden">
        <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gradient-to-b from-sky-400 to-sky-300">
          <img 
            src={mascotBanner} 
            alt="Super Sponge - Self-Maid Mascot flying through the sky" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900"></div>
        </div>
        
        <div className="hero-gradient-bg relative pb-12 md:pb-20">
          <div className="hero-dot-pattern absolute inset-0 pointer-events-none"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold mb-5 shadow-lg shadow-amber-400/20">
                <Sparkles className="w-4 h-4" />
                Superhero-Level Clean!
              </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              A Clean That Feels Like Home
            </h1>
            <p className="text-lg text-blue-100/90 mb-2">
              Professional cleaning done the right way, every time. No shortcuts. No stress. Just results you can trust.
            </p>
            <p className="text-sm text-blue-200/70">
              Serving Montgomery · Prattville · Millbrook · Wetumpka · Alabaster & More
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-14">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="hero-service-card group relative bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hover:bg-white/20 transition-all duration-300 text-center hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{service.title}</h3>
                  <p className="text-amber-300 font-bold text-xl">{service.price}</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:334-877-9513" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white/95 backdrop-blur-sm text-slate-800 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-300"
            >
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              (334) 877-9513
            </a>
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 rounded-full font-bold h-auto text-lg shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get Your Free Quote
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <span className="hero-trust-badge">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Fully Insured
            </span>
            <span className="hero-trust-badge">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Background-Checked
            </span>
            <span className="hero-trust-badge">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Same-Day Available
            </span>
          </div>
          </div>
        </div>
      </section>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
}
