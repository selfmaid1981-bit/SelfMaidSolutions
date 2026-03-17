import { useState } from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773754774408.png';
import heroImg from '@assets/hero-kitchen-luxury.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden min-h-[520px] lg:min-h-[600px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury clean kitchen interior"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A37]/85 via-[#1F2A37]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A37]/60 via-transparent to-[#1F2A37]/15" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1F2A37] to-transparent z-[5]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-sm sm:text-base font-semibold text-[#C6A969] italic mb-2 tracking-wide">
                Bringing the Shine Since 2009
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight mb-6">
                <span className="block text-white">Relax, We Do</span>
                <span className="block text-white">the Dirty Work.</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  onClick={() => {
                    const el = document.getElementById('instant-quote');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#1E8E6A] hover:bg-[#166B50] text-white px-8 py-6 rounded-lg font-bold text-base h-auto shadow-lg"
                  data-testid="hero-get-quote"
                >
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-[#1F2A37] border-white/80 px-8 py-6 rounded-lg font-bold text-base h-auto shadow-lg"
                  data-testid="hero-book-cleaning"
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  Book Cleaning
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src={mascotImg}
                alt="Shine the Super Sponge - Self-Maid mascot"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0 60L720 0L1440 60V60H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
