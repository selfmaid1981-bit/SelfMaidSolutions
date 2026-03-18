import { useState } from 'react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'residential',
    title: 'Ongoing Home Cleaning',
    description: 'Routine upkeep for a spotless home.',
    image: '/assets/services/icon-standard.png',
  },
  {
    id: 'deep',
    title: 'Detailed Deep Cleaning',
    description: 'Thorough top-to-bottom cleaning.',
    image: '/assets/services/icon-deep.png',
  },
  {
    id: 'moveout',
    title: 'Move-Out & Turnover Cleaning',
    description: 'Complete clean for a fresh start.',
    image: '/assets/services/icon-moveout.png',
  },
  {
    id: 'airbnb',
    title: 'Short-Term Rental Turnovers',
    description: 'Guest-ready cleaning for rentals.',
    image: '/assets/services/icon-airbnb.png',
  },
  {
    id: 'commercial',
    title: 'Office Cleaning',
    description: 'Professional office cleaning.',
    image: '/assets/services/icon-office.png',
  },
  {
    id: 'dorm',
    title: 'Student Dorm',
    description: 'Fast dorm turnovers for students.',
    image: '/assets/services/icon-dorm.png',
  },
  {
    id: 'multifamily',
    title: 'Multi-Family Turnovers',
    description: 'Unit-ready cleaning for property managers.',
    image: '/assets/services/icon-multifamily.png',
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setIsBookingModalOpen(true)}
                className="group text-center focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div className="border-2 border-[#C6A969]/30 hover:border-[#C6A969] rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-md bg-white group-hover:-translate-y-1 h-full flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#1F2A37] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
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
