import { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  imageAlt: string;
  gradient: string;
  glowColor: string;
}

const services: Service[] = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular or one-time cleaning services.',
    features: ['Weekly, bi-weekly, monthly', 'Deep cleaning available', 'Eco-friendly products'],
    price: 'Starting at $80',
    image: '/assets/services/service-residential.svg',
    imageAlt: 'Clean modern living room after residential cleaning service',
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'hover:shadow-blue-500/20',
  },
  {
    id: 'commercial',
    title: 'Commercial & Office',
    description: 'Professional office cleaning to maintain a productive work environment.',
    features: ['Daily, weekly cleaning', 'Restroom sanitization', 'Floor care & vacuuming'],
    price: 'Starting at $120',
    image: '/assets/services/service-commercial.svg',
    imageAlt: 'Clean professional office workspace after commercial cleaning',
    gradient: 'from-slate-600 to-slate-400',
    glowColor: 'hover:shadow-slate-500/20',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Cleaning',
    description: 'Fast turnaround cleaning between guests to maximize your bookings.',
    features: ['Same-day service', 'Linen service available', 'Inventory restocking'],
    price: 'Starting at $65',
    image: '/assets/services/service-airbnb.svg',
    imageAlt: 'Hotel-style bedroom with fresh linens ready for Airbnb guests',
    gradient: 'from-teal-500 to-emerald-400',
    glowColor: 'hover:shadow-teal-500/20',
  },
  {
    id: 'moveout',
    title: 'Move In/Out',
    description: 'Deep cleaning for moving day to get your deposit back or welcome home.',
    features: ['Deep clean all areas', 'Inside appliances', 'Deposit guarantee'],
    price: 'Starting at $150',
    image: '/assets/services/service-moveout.svg',
    imageAlt: 'Empty clean apartment ready for move-in after professional cleaning',
    gradient: 'from-violet-500 to-purple-400',
    glowColor: 'hover:shadow-violet-500/20',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'Intensive top-to-bottom cleaning for kitchens, bathrooms, and more.',
    features: ['Inside appliances', 'Grout & tile scrub', 'Baseboards & vents'],
    price: 'Starting at $250',
    image: '/assets/services/service-deep-clean.svg',
    imageAlt: 'Sparkling clean bathroom after professional deep cleaning service',
    gradient: 'from-pink-500 to-rose-400',
    glowColor: 'hover:shadow-pink-500/20',
  },
  {
    id: 'dorm',
    title: 'Student Dorm',
    description: 'Affordable cleaning for college students between semesters.',
    features: ['Fast turnaround', 'Student-friendly rates', 'Sanitization included'],
    price: 'Call for pricing',
    image: '/assets/services/service-dorm.svg',
    imageAlt: 'Clean organized college dorm room after professional cleaning',
    gradient: 'from-orange-500 to-amber-400',
    glowColor: 'hover:shadow-orange-500/20',
  }
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-10 lg:py-16 relative overflow-hidden section-gradient-blue">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="services-dot-pattern absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              What We Offer
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
              Our Cleaning Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-4" />
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs across Montgomery, Prattville, Selma, Homewood, and Clanton
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`service-card-enhanced group relative bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40 hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${service.glowColor} rounded-2xl overflow-hidden`}
                data-testid={`service-card-${service.id}`}
              >
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={176}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 bg-gradient-to-r ${service.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm`}>
                    {service.price}
                  </div>
                </div>
                <CardContent className="p-6 relative">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-5 flex-grow">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                            <svg className="w-2 h-2 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-slate-600 dark:text-slate-400 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleServiceClick(service.id)}
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white rounded-xl h-11 font-bold shadow-md group-hover:shadow-lg transition-all btn-shine`}
                      data-testid={`service-button-${service.id}`}
                    >
                      Book This Service
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <p className="text-slate-500 dark:text-slate-400 mb-5 text-lg">
              Need a custom cleaning package? We'll work with you to create the perfect solution.
            </p>
            <a 
              href="tel:334-877-9513" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-shine"
            >
              <Phone className="w-5 h-5" />
              Call (334) 877-9513 for Custom Quote
            </a>
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
