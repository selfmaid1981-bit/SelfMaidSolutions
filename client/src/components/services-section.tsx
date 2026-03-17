import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'residential',
    title: 'Recurring Cleaning',
    image: '/assets/services/service-residential.png',
    imageAlt: 'Professional cleaner providing recurring cleaning service',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    image: '/assets/services/service-deep-clean.png',
    imageAlt: 'Professional deep cleaning service',
  },
  {
    id: 'moveout',
    title: 'Move-Out Cleaning',
    image: '/assets/services/service-moveout.png',
    imageAlt: 'Move-out cleaning service for apartments and homes',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Cleaning',
    image: '/assets/services/service-airbnb.png',
    imageAlt: 'Airbnb turnover cleaning service',
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="group text-left focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={300}
                    height={240}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-sm sm:text-base font-bold text-[#1F2A37] group-hover:text-[#1E8E6A] transition-colors">
                    {service.title}
                  </h3>
                </div>
              </button>
            ))}
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
