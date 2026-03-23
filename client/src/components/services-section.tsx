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
      <section id="services" className="py-14 lg:py-20" style={{ background: '#0a0a0d' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#f5c542' }}>Our Services</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
              Experience the Self-Maid Difference
            </h2>
            <div className="w-24 h-[2px] mx-auto mt-3" style={{ background: 'linear-gradient(90deg, #f5c542, #c89b2d)' }} />
            <p className="text-white/50 mt-3 text-sm">Premium Cleaning</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setIsBookingModalOpen(true)}
                className="group text-center focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div className="rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col items-center" style={{ background: '#111111', border: '1px solid rgba(245,197,66,0.15)' }}>
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
                  <h3 className="text-sm font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
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
