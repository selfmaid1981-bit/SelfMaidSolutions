import { useState } from 'react';
import { Home, Building, Key, Truck, GraduationCap, Building2, ArrowRight } from 'lucide-react';
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
  bgGradient: string;
}

const services: Service[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular or one-time cleaning services.',
    features: ['Weekly, bi-weekly, monthly', 'Deep cleaning available', 'Eco-friendly products'],
    price: 'From $120',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950'
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial & Office',
    description: 'Professional office cleaning to maintain a productive work environment.',
    features: ['Daily, weekly cleaning', 'Restroom sanitization', 'Floor care & vacuuming'],
    price: 'From $150',
    bgGradient: 'from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900'
  },
  {
    id: 'airbnb',
    icon: Key,
    title: 'Airbnb Cleaning',
    description: 'Fast turnaround cleaning between guests to maximize your bookings.',
    features: ['Same-day service', 'Linen service available', 'Inventory restocking'],
    price: 'From $95',
    bgGradient: 'from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950'
  },
  {
    id: 'moveout',
    icon: Truck,
    title: 'Move In/Out',
    description: 'Deep cleaning for moving day to get your deposit back or welcome home.',
    features: ['Deep clean all areas', 'Inside appliances', 'Deposit guarantee'],
    price: 'From $180',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950'
  },
  {
    id: 'dorm',
    icon: GraduationCap,
    title: 'Student Dorm',
    description: 'Affordable cleaning for college students between semesters.',
    features: ['Fast turnaround', 'Student-friendly rates', 'Sanitization included'],
    price: 'Call for pricing',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950'
  },
  {
    id: 'apartment',
    icon: Building2,
    title: 'Apartment Turnover',
    description: 'Professional apartment make-ready for property managers.',
    features: ['Fast turnaround', 'Volume discounts', 'Sanitization included'],
    price: 'From $108',
    bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950'
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
      <section id="services" className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
              Our Cleaning Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs across Montgomery, Prattville, and Selma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className={`group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 bg-gradient-to-br ${service.bgGradient}`}
                  data-testid={`service-card-${service.id}`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3 mb-6 flex-grow">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {service.price}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleServiceClick(service.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all"
                          data-testid={`service-button-${service.id}`}
                        >
                          Get a Quote
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Need a custom cleaning package? We'll work with you to create the perfect solution.
            </p>
            <a 
              href="tel:334-877-9513" 
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
