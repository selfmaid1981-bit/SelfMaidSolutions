import { useState } from 'react';
import { Sparkles, Search, Truck, Home, Briefcase } from 'lucide-react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'residential',
    title: 'Standard Cleaning',
    description: 'Routine upkeep for a spotless home.',
    icon: Home,
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'Thorough top-to-bottom cleaning.',
    icon: Search,
  },
  {
    id: 'moveout',
    title: 'Move-Out Cleaning',
    description: 'Complete clean for a fresh start.',
    icon: Truck,
  },
  {
    id: 'airbnb',
    title: 'Airbnb Cleaning',
    description: 'Guest-ready cleaning for rentals.',
    icon: Sparkles,
  },
  {
    id: 'commercial',
    title: 'Office Cleaning',
    description: 'Professional office cleaning.',
    icon: Briefcase,
  },
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
      <section id="services" className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
              Our Services
            </h2>
            <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="group text-center focus:outline-none"
                  data-testid={`service-card-${service.id}`}
                >
                  <div className="border border-[#C6A969]/40 hover:border-[#C6A969] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg bg-white group-hover:-translate-y-1">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-[#1F2A37]/5 flex items-center justify-center group-hover:bg-[#C6A969]/10 transition-colors">
                      <Icon className="w-7 h-7 text-[#1F2A37] group-hover:text-[#C6A969] transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1F2A37] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </button>
              );
            })}
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
