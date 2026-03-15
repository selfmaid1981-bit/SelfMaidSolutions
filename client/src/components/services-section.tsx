import { useState } from 'react';
import { Home, Building, Key, Truck, GraduationCap, Building2, ArrowRight, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  price: string;
  iconGradient: string;
  glowColor: string;
  bgAccent: string;
}

const services: Service[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular or one-time cleaning services.',
    features: ['Weekly, bi-weekly, monthly', 'Deep cleaning available', 'Eco-friendly products'],
    price: 'Starting at $80',
    iconGradient: 'from-blue-500 to-cyan-400',
    glowColor: 'hover:shadow-blue-500/20',
    bgAccent: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial & Office',
    description: 'Professional office cleaning to maintain a productive work environment.',
    features: ['Daily, weekly cleaning', 'Restroom sanitization', 'Floor care & vacuuming'],
    price: 'Starting at $120',
    iconGradient: 'from-slate-600 to-slate-400',
    glowColor: 'hover:shadow-slate-500/20',
    bgAccent: 'from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30',
  },
  {
    id: 'airbnb',
    icon: Key,
    title: 'Airbnb Cleaning',
    description: 'Fast turnaround cleaning between guests to maximize your bookings.',
    features: ['Same-day service', 'Linen service available', 'Inventory restocking'],
    price: 'Starting at $65',
    iconGradient: 'from-teal-500 to-emerald-400',
    glowColor: 'hover:shadow-teal-500/20',
    bgAccent: 'from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30',
  },
  {
    id: 'moveout',
    icon: Truck,
    title: 'Move In/Out',
    description: 'Deep cleaning for moving day to get your deposit back or welcome home.',
    features: ['Deep clean all areas', 'Inside appliances', 'Deposit guarantee'],
    price: 'Starting at $150',
    iconGradient: 'from-violet-500 to-purple-400',
    glowColor: 'hover:shadow-violet-500/20',
    bgAccent: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
  },
  {
    id: 'dorm',
    icon: GraduationCap,
    title: 'Student Dorm',
    description: 'Affordable cleaning for college students between semesters.',
    features: ['Fast turnaround', 'Student-friendly rates', 'Sanitization included'],
    price: 'Call for pricing',
    iconGradient: 'from-pink-500 to-rose-400',
    glowColor: 'hover:shadow-pink-500/20',
    bgAccent: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30',
  },
  {
    id: 'apartment',
    icon: Building2,
    title: 'Apartment Turnover',
    description: 'Professional apartment make-ready for property managers.',
    features: ['Fast turnaround', 'Volume discounts', 'Sanitization included'],
    price: 'Starting at $108',
    iconGradient: 'from-orange-500 to-amber-400',
    glowColor: 'hover:shadow-orange-500/20',
    bgAccent: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
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
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/8 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
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
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className={`service-card-enhanced group relative bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40 hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${service.glowColor} rounded-2xl overflow-hidden`}
                  data-testid={`service-card-${service.id}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.iconGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                  <CardContent className="p-7 relative">
                    <div className="flex flex-col h-full">
                      <div className="mb-5">
                        <div className="relative mb-5">
                          <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${service.iconGradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                          <div className={`relative w-14 h-14 bg-gradient-to-br ${service.iconGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3 transition-all duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2.5 mb-6 flex-grow">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2.5 group/feature">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.iconGradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover/feature:scale-110 transition-transform duration-200`}>
                              <svg className="w-2.5 h-2.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-slate-100 dark:border-slate-700/50 pt-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${service.iconGradient} text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm`}>
                            {service.price}
                          </div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            No hidden fees
                          </span>
                        </div>
                        <Button 
                          onClick={() => handleServiceClick(service.id)}
                          className={`w-full bg-gradient-to-r ${service.iconGradient} hover:opacity-90 text-white rounded-xl h-12 font-bold shadow-md group-hover:shadow-lg transition-all btn-shine`}
                          data-testid={`service-button-${service.id}`}
                        >
                          Book This Service
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
