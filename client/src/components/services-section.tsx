import { useState } from 'react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'deep',
    title: 'Deep Cleaning',
    image: '/assets/services/icon-deep-gold.png',
    bullets: ['Thorough, detailed,', 'no shortcuts'],
  },
  {
    id: 'moveout',
    title: 'Move-In/Move-Out',
    image: '/assets/services/icon-moveout-gold.png',
    bullets: ['Perfect for', 'property turnovers'],
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnover',
    image: '/assets/services/icon-airbnb-gold.png',
    bullets: ['Fast & reliable', 'service for hosts'],
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="services" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#0a0a0d' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse at 80% 40%, rgba(245,197,66,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 90%, rgba(180,130,30,0.05) 0%, transparent 40%),
            linear-gradient(180deg, rgba(30,22,8,0.12) 0%, rgba(10,10,13,0) 30%, rgba(25,18,6,0.10) 100%)
          `
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-10" style={{ background: 'rgba(245,197,66,0.4)' }} />
                  <p className="text-[11px] font-semibold tracking-[3px] uppercase text-white/45">OUR SERVICES</p>
                  <div className="h-px w-10" style={{ background: 'rgba(245,197,66,0.4)' }} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif italic mb-2">
                  Experience the Self-Maid Difference
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(245,197,66,0.3), transparent)' }} />
                  <span className="text-white/40 text-xs tracking-wider">Premium Cleaning</span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,66,0.3))' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="group text-center focus:outline-none"
                    data-testid={`service-card-${service.id}`}
                  >
                    <div
                      className="rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col items-center"
                      style={{
                        background: 'linear-gradient(145deg, rgba(30,22,10,0.9) 0%, rgba(17,17,17,0.9) 100%)',
                        border: '1px solid rgba(245,197,66,0.2)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,197,66,0.05)'
                      }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          width={80}
                          height={80}
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <div className="text-left w-full space-y-0.5">
                        {service.bullets.map((bullet) => (
                          <p key={bullet} className="text-[11px] text-white/45 leading-snug">
                            <span style={{ color: '#f5c542' }}>&#10003;</span> {bullet}
                          </p>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block rounded-xl overflow-hidden" style={{
              border: '1px solid rgba(245,197,66,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}>
              <img
                src="/assets/services-cleaner-hero.png"
                alt="Self-Maid professional cleaner at work"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ minHeight: '420px' }}
              />
            </div>
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
