import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroBanner from '@assets/793F560B-3E81-474C-9196-6C977F28E5C3_1759307212932.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section 
        className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Self-Maid Cleaning Solutions
            </h1>
            <p className="text-2xl lg:text-3xl text-white font-semibold mb-4 drop-shadow-lg">
              Spotless Every Time.
            </p>
            <p className="text-lg lg:text-xl text-white/95 mb-8 drop-shadow-md">
              Residential • Commercial • Move-In/Out Turnovers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href="tel:334-877-9513" 
                className="bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center shadow-xl"
                data-testid="hero-call-button"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call Now: (334) 877-9513
              </a>
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors h-auto shadow-xl"
                data-testid="hero-book-button"
              >
                <Calendar className="w-5 h-5 mr-3" />
                BOOK NOW
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Insured & Bonded</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Same Day Service</span>
              </div>
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
