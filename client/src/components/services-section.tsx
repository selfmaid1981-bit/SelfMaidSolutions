import { useState } from 'react';
import { BookingModal } from './booking-modal';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    id: 'disinfecting',
    title: 'Disinfecting Services',
    image: '/assets/services/photo-disinfecting.png',
  },
  {
    id: 'residential',
    title: 'Residential Cleaning',
    image: '/assets/services/photo-residential.png',
  },
  {
    id: 'commercial',
    title: 'Office Cleaning',
    image: '/assets/services/photo-office.png',
  },
  {
    id: 'airbnb',
    title: 'Short Stay Cleaning',
    image: '/assets/services/photo-shortStay.png',
  },
  {
    id: 'office',
    title: 'Commercial Cleaning',
    image: '/assets/services/photo-commercial.png',
  },
  {
    id: 'multifamily',
    title: 'Multi Tenant Building Cleaning',
    image: '/assets/services/photo-multitenant.png',
  },
];

export function ServicesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="services" className="py-14 lg:py-20 marble-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
              Our Services
            </h2>
            <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setIsBookingModalOpen(true)}
                className="group text-center focus:outline-none"
                data-testid={`service-card-${service.id}`}
              >
                <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#1F2A37] flex items-center justify-center gap-1">
                      {service.title}
                      <ChevronRight className="w-4 h-4 text-[#C6A969] group-hover:translate-x-1 transition-transform" />
                    </h3>
                  </div>
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
