import { useState } from 'react';
import { Home, Building, Key, Truck, GraduationCap, Plus } from 'lucide-react';
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
  bgClass?: string;
}

const services: Service[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular or one-time cleaning services.',
    features: ['Weekly, bi-weekly, monthly', 'Deep cleaning available', 'Eco-friendly products'],
    price: 'From $80'
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial & Office',
    description: 'Professional office cleaning to maintain a productive work environment.',
    features: ['Daily, weekly cleaning', 'Restroom sanitization', 'Window cleaning'],
    price: 'From $120'
  },
  {
    id: 'airbnb',
    icon: Key,
    title: 'Airbnb Cleaning',
    description: 'Fast turnaround cleaning between guests to maximize your bookings.',
    features: ['Same-day service', 'Linen service available', 'Inventory restocking'],
    price: 'From $65'
  },
  {
    id: 'moveout',
    icon: Truck,
    title: 'Move In/Out',
    description: 'Deep cleaning for moving day to get your deposit back or welcome home.',
    features: ['Deep clean all areas', 'Inside appliances', 'Deposit guarantee'],
    price: 'From $150'
  },
  {
    id: 'dorm',
    icon: GraduationCap,
    title: 'Student Dorm Turnover',
    description: 'Quick and efficient dorm cleaning between semesters and student moves.',
    features: ['Fast turnaround', 'Student-friendly rates', 'Sanitization included'],
    price: 'From $45'
  },
  {
    id: 'addon',
    icon: Plus,
    title: 'Add-On Services',
    description: 'Enhance your cleaning with our additional specialty services.',
    features: ['Carpet cleaning', 'Window washing', 'Garage cleaning'],
    price: 'Custom',
    bgClass: 'bg-secondary/5 border-secondary/20'
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
      <section id="services" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Cleaning Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs across Alabama
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className={`service-card transition-all duration-300 hover:scale-105 hover:shadow-lg ${service.bgClass || ''}`}
                  data-testid={`service-card-${service.id}`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        service.id === 'addon' ? 'bg-secondary/10' : 'bg-primary/10'
                      }`}>
                        <Icon className={`w-8 h-8 ${service.id === 'addon' ? 'text-secondary' : 'text-primary'}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className={`w-2 h-2 rounded-full mr-3 ${service.id === 'addon' ? 'bg-secondary' : 'bg-secondary'}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-2 ${service.id === 'addon' ? 'text-secondary' : 'text-primary'}`}>
                        {service.price}
                      </div>
                      <Button 
                        onClick={() => handleServiceClick(service.id)}
                        className={`w-full ${
                          service.id === 'addon' 
                            ? 'bg-secondary hover:bg-secondary/90 text-white' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                        data-testid={`service-button-${service.id}`}
                      >
                        {service.id === 'addon' ? 'Learn More' : 'Get Quote'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        defaultService={selectedService}
      />
    </>
  );
}
