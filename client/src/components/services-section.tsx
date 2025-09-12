import { useState } from 'react';
import { Home, Building, Key, Truck, GraduationCap, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascotPoses from '@assets/ChatGPT Image Sep 11, 2025, 04_03_42 AM_1757704445185.png';
import residentialBg from '@assets/D6E85900-DEB4-4C6D-B91A-C36A8887DD8D_1757705959397.png';
import commercialBg from '@assets/DC920807-7C0A-42AF-877B-C5EAEDD978DA_1757705959398.png';
import airbnbBg from '@assets/ChatGPT Image Sep 11, 2025, 03_48_23 AM_1757706116037.png';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  price: string;
  bgClass?: string;
  mascotPose: 'thumbs-up' | 'running' | 'flexing' | 'pointing';
}

const services: Service[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular or one-time cleaning services.',
    features: ['Weekly, bi-weekly, monthly', 'Deep cleaning available', 'Eco-friendly products'],
    price: 'From $80',
    mascotPose: 'thumbs-up'
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial & Office',
    description: 'Professional office cleaning to maintain a productive work environment.',
    features: ['Daily, weekly cleaning', 'Restroom sanitization', 'Window cleaning'],
    price: 'From $120',
    mascotPose: 'pointing'
  },
  {
    id: 'airbnb',
    icon: Key,
    title: 'Airbnb Cleaning',
    description: 'Fast turnaround cleaning between guests to maximize your bookings.',
    features: ['Same-day service', 'Linen service available', 'Inventory restocking'],
    price: 'From $65',
    mascotPose: 'running'
  },
  {
    id: 'moveout',
    icon: Truck,
    title: 'Move In/Out',
    description: 'Deep cleaning for moving day to get your deposit back or welcome home.',
    features: ['Deep clean all areas', 'Inside appliances', 'Deposit guarantee'],
    price: 'From $150',
    mascotPose: 'flexing'
  },
  {
    id: 'dorm',
    icon: GraduationCap,
    title: 'Student Dorm Turnover',
    description: 'Quick and efficient dorm cleaning between semesters and student moves.',
    features: ['Fast turnaround', 'Student-friendly rates', 'Sanitization included'],
    price: 'From $45',
    mascotPose: 'thumbs-up'
  },
  {
    id: 'addon',
    icon: Plus,
    title: 'Add-On Services',
    description: 'Enhance your cleaning with our additional specialty services.',
    features: ['Carpet cleaning', 'Window washing', 'Garage cleaning'],
    price: 'Custom',
    bgClass: 'bg-secondary/5 border-secondary/20',
    mascotPose: 'pointing'
  }
];

// Helper function to get mascot position class
const getMascotPositionClass = (pose: Service['mascotPose']) => {
  switch (pose) {
    case 'thumbs-up':
      return 'mascot-thumbs-up'; // Top left
    case 'running':
      return 'mascot-running'; // Top right
    case 'flexing':
      return 'mascot-flexing'; // Bottom left
    case 'pointing':
      return 'mascot-pointing'; // Bottom right
    default:
      return 'mascot-thumbs-up';
  }
};

// Special Residential Service Card Component
const ResidentialServiceCard = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <Card 
      className="residential-service-card overflow-hidden relative min-h-[400px] md:col-span-2 lg:col-span-3 bg-gradient-to-br from-sky-200 to-sky-300"
      data-testid="service-card-residential"
      style={{
        backgroundImage: `url(${residentialBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <CardContent className="p-8 h-full flex items-center justify-between relative">
        {/* Sparkle decorations */}
        <div className="absolute top-6 left-8 w-4 h-4 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-12 right-16 w-3 h-3 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-20 left-12 w-2 h-2 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-16 right-32 w-3 h-3 bg-white rounded-full opacity-50"></div>
        
        <div className="flex-1 max-w-xl">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              BRING SHINE HOME<br />
              WITH SELF-MAID!
            </h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              RESIDENTIAL<br />CLEANING
            </h3>
            <p className="text-lg text-primary font-medium">
              Expert Cleaning Services<br />for Your Home
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onBookClick}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
              data-testid="service-button-residential"
            >
              BOOK NOW
            </Button>
            <div className="text-2xl font-bold text-primary">
              334-877-9513
            </div>
          </div>
        </div>
        
        {/* Mascot area - visible on larger screens */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="w-48 h-48 relative">
            {/* The mascot is part of the background image, so we just ensure space for it */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Special Airbnb Service Card Component
const AirbnbServiceCard = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <Card 
      className="airbnb-service-card overflow-hidden relative min-h-[400px] md:col-span-2 lg:col-span-3 bg-gradient-to-br from-sky-100 to-sky-300"
      data-testid="service-card-airbnb"
      style={{
        backgroundImage: `url(${airbnbBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <CardContent className="p-8 h-full flex flex-col justify-center relative">
        {/* Sparkle decorations */}
        <div className="absolute top-8 right-16 w-4 h-4 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-16 right-32 w-3 h-3 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-32 right-24 w-2 h-2 bg-white rounded-full opacity-80"></div>
        <div className="absolute bottom-20 left-32 w-3 h-3 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-20 left-16 w-2 h-2 bg-white rounded-full opacity-75"></div>
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="text-sm font-bold text-primary mb-2 tracking-wider">
              SELF-MAID CLEANING SOLUTIONS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              We Make<br />
              Your World<br />
              Shine!
            </h2>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-primary font-medium mb-6">
              Professional cleaning with a<br />
              personal touch. Service you can trust.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onBookClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-primary px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              data-testid="service-button-airbnb"
            >
              BOOK YOUR CLEAN TODAY
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Special Commercial Service Card Component
const CommercialServiceCard = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <Card 
      className="commercial-service-card overflow-hidden relative min-h-[400px] md:col-span-2 lg:col-span-3 bg-gradient-to-br from-sky-200 to-sky-300"
      data-testid="service-card-commercial"
      style={{
        backgroundImage: `url(${commercialBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <CardContent className="p-8 h-full flex items-center justify-between relative">
        {/* Sparkle decorations - like stars in the original image */}
        <div className="absolute top-8 left-16 w-4 h-4 bg-white rounded-full opacity-80" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
        <div className="absolute top-16 right-24 w-3 h-3 bg-white rounded-full opacity-60" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-white rounded-full opacity-70" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
        <div className="absolute bottom-24 right-32 w-3 h-3 bg-white rounded-full opacity-50" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
        
        <div className="flex-1 max-w-xl">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              KEEP YOUR WORK<br />
              SPACE SUPR CLEAN!
            </h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              COMMERCIAL/OFFICE<br />CLEANING
            </h3>
            <p className="text-lg text-primary font-medium">
              Expert Cleaning Services<br />for Businesses
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onBookClick}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
              data-testid="service-button-commercial"
            >
              BOOK NOW
            </Button>
            <div className="text-2xl font-bold text-primary">
              334-877-9513
            </div>
          </div>
        </div>
        
        {/* Mascot area - visible on larger screens */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="w-48 h-48 relative">
            {/* The three mascots are part of the background image, so we just ensure space for them */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  // Filter services to separate residential and commercial from others
  const residentialService = services.find(service => service.id === 'residential');
  const commercialService = services.find(service => service.id === 'commercial');
  const otherServices = services.filter(service => service.id !== 'residential' && service.id !== 'commercial');

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
          
          <div className="space-y-8">
            {/* Special Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <ResidentialServiceCard 
                onBookClick={() => handleServiceClick('residential')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <CommercialServiceCard 
                onBookClick={() => handleServiceClick('commercial')}
              />
            </div>
            
            {/* Regular Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={service.id} 
                    className={`service-card transition-all duration-300 hover:scale-105 hover:shadow-lg ${service.bgClass || ''}`}
                    data-testid={`service-card-${service.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Mascot Image */}
                        <div className="flex-shrink-0">
                          <div className="relative w-24 h-24">
                            <div 
                              className={`mascot-sprite ${getMascotPositionClass(service.mascotPose)} w-full h-full transition-transform duration-300 hover:scale-110`}
                              style={{ backgroundImage: `url(${mascotPoses})` }}
                              data-testid={`mascot-${service.id}`}
                            />
                            {/* Fallback icon for accessibility */}
                            <Icon className="sr-only" />
                          </div>
                        </div>
                        
                        {/* Service Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                          <p className="text-muted-foreground mb-3">{service.description}</p>
                          <div className="space-y-2 mb-4">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-muted-foreground">
                                <div className={`w-2 h-2 rounded-full mr-3 ${service.id === 'addon' ? 'bg-secondary' : 'bg-secondary'}`}></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className={`text-2xl font-bold ${service.id === 'addon' ? 'text-secondary' : 'text-primary'}`}>
                              {service.price}
                            </div>
                            <Button 
                              onClick={() => handleServiceClick(service.id)}
                              className={`${
                                service.id === 'addon' 
                                  ? 'bg-secondary hover:bg-secondary/90 text-white' 
                                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              }`}
                              data-testid={`service-button-${service.id}`}
                            >
                              {service.id === 'addon' ? 'Learn More' : 'Get Quote'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
