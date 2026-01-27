import { useState } from 'react';
import { Phone, Calendar, Home, Building, Key, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-sm font-medium text-blue-200 tracking-wide uppercase mb-3">
              Montgomery • Prattville • Selma • Homewood • Clanton
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              A Clean Home That Feels Like<br className="hidden md:block" /> Peace of Mind
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              I'm Michelle — and my team is trained to clean your space the right way, every time. No shortcuts. No stress. Just results you can trust.
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-blue-600 font-bold text-xl">{service.price}</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:334-877-9513" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
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
