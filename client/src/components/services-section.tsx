import { useState } from 'react';
import { BookingModal } from './booking-modal';

const services = [
  {
    id: 'deep',
    title: 'Deep Cleaning',
    image: '/assets/services/icon-deep.png',
    description: 'Thorough, detailed, no shortcuts. Every surface, every corner.',
  },
  {
    id: 'moveout',
    title: 'Move-In / Move-Out',
    image: '/assets/services/icon-moveout.png',
    description: 'Perfect for property turnovers and getting your full deposit back.',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnover',
    image: '/assets/services/icon-airbnb.png',
    description: 'Fast, reliable service that keeps your 5-star reviews coming.',
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="services" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0d' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(245,197,66,0.03) 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <p className="section-label text-white/50 tracking-[4px]">OUR SERVICES</p>
              <div className="editorial-divider" />
              <h2 className="font-bold text-white font-serif mb-3">
                Experience the <span className="italic" style={{ color: '#f5c542' }}>Self-Maid</span> Difference
              </h2>
              <p className="text-white/40 text-sm mb-10 max-w-sm">Premium cleaning tailored to your space and schedule.</p>

              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="group w-full text-left focus:outline-none"
                    data-testid={`service-card-${service.id}`}
                  >
                    <div
                      className="rounded-xl p-5 transition-all duration-500 hover:translate-x-1 flex items-start gap-5"
                      style={{ background: 'rgba(17,17,17,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden" style={{ background: 'rgba(245,197,66,0.06)' }}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-contain p-2"
                          loading="lazy"
                          width={56}
                          height={56}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#f5c542] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <img
                  src="/assets/team-working-branded.png"
                  alt="Self-Maid professional cleaner at work"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ minHeight: '480px' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,13,0.6) 0%, transparent 40%)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/60 text-xs tracking-[2px] uppercase">16+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
