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
      <section id="services" className="relative" style={{ padding: '80px 10%' }}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-white/60 mb-2">OUR SERVICES</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif mb-1">
            Experience the Self-Maid Difference
          </h2>
          <p className="text-white/70 text-sm">Premium Cleaning</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setIsBookingModalOpen(true)}
                className="group text-left focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div
                  className="rounded-[10px] p-5 transition-all duration-300 group-hover:-translate-y-1 flex flex-col items-center text-center"
                  style={{
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.08)',
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
                  <h3 className="text-sm font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/50">{service.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden lg:block flex-shrink-0">
            <img
              src="/assets/services-cleaner-hero.png"
              alt="Self-Maid professional cleaner at work"
              className="object-cover rounded-[10px]"
              loading="lazy"
              style={{ width: '300px' }}
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
