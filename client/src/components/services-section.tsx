import { useState } from 'react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'deep',
    title: 'Deep Cleaning',
    image: '/assets/services/icon-deep.png',
    bullets: ['Thorough, detailed, no shortcuts'],
  },
  {
    id: 'moveout',
    title: 'Move-In/Move-Out',
    image: '/assets/services/icon-moveout.png',
    bullets: ['Perfect for property turnovers'],
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnover',
    image: '/assets/services/icon-airbnb.png',
    bullets: ['Fast & reliable service for hosts'],
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="services" className="py-14 lg:py-20 relative overflow-hidden" style={{ background: '#0a0a0d' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(245,197,66,0.03) 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="mb-6">
                <p className="section-label uppercase text-white mb-2">OUR SERVICES</p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, rgba(245,197,66,0.5), transparent)' }} />
                  <span className="text-white/40 text-xs tracking-wider uppercase" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic mb-2">
                  Experience the Self-Maid Difference
                </h2>
                <div className="flex items-center gap-3 mt-3">
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, rgba(245,197,66,0.4), transparent)' }} />
                  <span className="text-white/50 text-sm tracking-wider">Premium Cleaning</span>
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,66,0.4))' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="group text-center focus:outline-none"
                    data-testid={`service-card-${service.id}`}
                  >
                    <div
                      className="rounded-xl p-4 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col items-center"
                      style={{ background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(245,197,66,0.2)' }}
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
                          <p key={bullet} className="text-[11px] text-white/50 leading-snug">
                            <span style={{ color: '#f5c542' }}>✓</span> {bullet}
                          </p>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block rounded-xl overflow-hidden" style={{ border: '1px solid rgba(245,197,66,0.1)' }}>
              <img
                src="/assets/team-working-branded.png"
                alt="Self-Maid professional cleaner at work"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ minHeight: '380px' }}
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
