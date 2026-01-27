import { useState } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascotBanner from '@assets/ChatGPT_Image_Jan_27,_2026,_05_57_05_AM_1769511552762.png';

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
      <section className="hero relative overflow-hidden">
        <div className="relative w-full h-56 md:h-72 overflow-hidden">
          <img 
            src={mascotBanner} 
            alt="Super Sponge - Self-Maid Mascot flying through the sky" 
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-950"></div>
        </div>
        
        <div className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-950 pb-12 md:pb-20">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
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
        </div>
      </section>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
}
