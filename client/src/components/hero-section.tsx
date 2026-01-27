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
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
              Montgomery • Prattville • Selma • Homewood • Clanton
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              A Clean Home That Feels Like<br className="hidden md:block" /> Peace of Mind
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
                  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-slate-100 hover:border-blue-200"
                >
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-blue-600 font-bold text-xl">{service.price}</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:334-877-9513" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-semibold hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              (334) 877-9513
            </a>
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold h-auto text-base"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get Your Free Quote
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Fully insured • Background-checked team • Same-day available
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
