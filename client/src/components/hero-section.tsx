import { useState } from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';

import heroImg from '@assets/89C624EB-3BF3-49AE-BA29-6CA4B6DA0ABB_1773813310714.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden min-h-[520px] lg:min-h-[600px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Beautiful white marble kitchen interior"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-[#1F2A37]/70" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1F2A37] to-transparent z-[5]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm sm:text-base font-semibold text-[#C6A969] italic mb-3 tracking-wide font-serif">
              Your Home's New Cleaning Standard
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight mb-3 font-serif">
              <span className="block text-white italic">A calm, polished,</span>
              <span className="block text-white italic">professional clean —</span>
              <span className="block text-[#C6A969] italic">every single visit.</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                onClick={() => {
                  const el = document.getElementById('instant-quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#C6A969] hover:bg-[#B8985A] text-[#1F2A37] px-8 py-6 rounded-lg font-bold text-base h-auto shadow-lg"
                data-testid="hero-get-quote"
              >
                Get Your Instant Quote
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
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0 60L720 0L1440 60V60H0Z" fill="#f5f0eb"/>
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
