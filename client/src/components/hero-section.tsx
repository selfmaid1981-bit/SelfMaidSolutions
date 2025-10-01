import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroBanner from '@assets/793F560B-3E81-474C-9196-6C977F28E5C3_1759307212932.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 dark:from-blue-950 dark:via-blue-900 dark:to-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Banner Image - No Overlay */}
          <div className="mb-8">
            <img 
              src={heroBanner}
              alt="Self-Maid Cleaning Solutions - Spotless Every Time" 
              className="w-full h-auto rounded-lg shadow-2xl"
              data-testid="hero-banner-image"
            />
          </div>
          
          {/* CTA Buttons & Trust Badges Below Image */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
            
            <div className="flex flex-wrap gap-4 justify-center text-white">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Insured & Bonded</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
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
