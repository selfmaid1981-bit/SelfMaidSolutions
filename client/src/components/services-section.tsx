import { useState } from 'react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'deep',
    title: 'Deep Cleaning',
    image: '/assets/services/icon-deep-gold.png',
    desc: 'Thorough, detailed, no shortcuts',
  },
  {
    id: 'moveout',
    title: 'Move-In/Out',
    image: '/assets/services/icon-moveout-gold.png',
    desc: 'Perfect for turnovers',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnover',
    image: '/assets/services/icon-airbnb-gold.png',
    desc: 'Fast & reliable service',
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="services" style={{ padding: '60px 10%', textAlign: 'center' }}>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Our Services</h2>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setIsBookingModalOpen(true)}
              className="group focus:outline-none"
              data-testid={`service-card-${service.id}`}
            >
              <div
                className="transition-all duration-300 group-hover:-translate-y-1 flex flex-col items-center text-center"
                style={{
                  background: '#111',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #333',
                  width: '180px'
                }}
              >
                <div className="w-16 h-16 mb-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{service.title}</h3>
                <p className="text-xs text-white/50">{service.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
