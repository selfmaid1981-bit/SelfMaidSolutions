import { useState } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascot from '@assets/10AB3390-5933-4EB1-80AB-AC9BD5429CCB_1769510626226.png';

const services = [
  { id: 'residential', icon: Home, title: 'Residential', price: '$80+' },
  { id: 'commercial', icon: Building, title: 'Commercial', price: '$120+' },
  { id: 'airbnb', icon: Key, title: 'Airbnb', price: '$65+' },
  { id: 'moveout', icon: Truck, title: 'Move In/Out', price: '$150+' },
];

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="hero relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 min-h-[600px] md:min-h-[700px]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Flying Mascot - Positioned Absolutely */}
          <div className="hero-mascot hidden md:block">
            <img 
              src={mascot} 
              alt="Super Sponge - Self-Maid Mascot" 
              className="hero-flyer"
            />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            {/* Mobile Mascot */}
            <div className="md:hidden flex justify-center mb-6">
              <img 
                src={mascot} 
                alt="Super Sponge - Self-Maid Mascot" 
                className="w-32 h-auto drop-shadow-2xl animate-bounce"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Superhero-Level Clean!
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              A Clean That Feels Like Home
            </h1>
            <p className="text-lg text-blue-100 mb-2">
              Professional cleaning done the right way, every time. No shortcuts. No stress. Just results you can trust.
            </p>
            <p className="text-sm text-blue-200">
              Serving Montgomery • Prattville • Selma • Homewood • Clanton
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-14">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-purple-600 font-bold text-xl">{service.price}</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:334-877-9513" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              (334) 877-9513
            </a>
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 rounded-full font-bold h-auto text-lg shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get Your Free Quote
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              ✓ Fully Insured
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              ✓ Background-Checked
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              ✓ Same-Day Available
            </span>
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
