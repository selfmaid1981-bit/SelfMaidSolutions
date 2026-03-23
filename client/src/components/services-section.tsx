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
    title: 'Move-In/Move-Out',
    image: '/assets/services/icon-moveout-gold.png',
    desc: 'Perfect for property turnovers',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnover',
    image: '/assets/services/icon-airbnb-gold.png',
    desc: 'Fast & reliable service for hosts',
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="section-divider-gold" />
      <section id="services" className="section-warm" style={{ padding: '80px 10%' }}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-white/50 mb-3">
            ——— OUR SERVICES ———
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif mb-1">
            Experience the <span className="gold-shine-text">Self-Maid</span> Difference
          </h2>
          <p className="text-white/50 text-sm flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-white/20" />
            Premium Cleaning
            <span className="w-12 h-px bg-white/20" />
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setIsBookingModalOpen(true)}
                className="group focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div className="service-card-uniform">
                  <div className="w-16 h-16 mb-3 relative z-10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 relative z-10">{service.title}</h3>
                  <p className="text-xs text-white/50 flex items-start gap-1 relative z-10">
                    <span style={{ color: '#f5c542' }}>&#10004;</span>
                    {service.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="cleaner-photo-wrapper flex-shrink-0">
            <img
              src="/assets/services-cleaner-hero.png"
              alt="Self-Maid professional cleaner at work"
              className="object-cover"
              loading="lazy"
              style={{ width: '380px', maxHeight: '480px' }}
            />
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
