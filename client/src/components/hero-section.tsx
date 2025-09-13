import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import mascotImage from '@assets/IMG_0585_1757723061263.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Self-Maid Cleaning Solutions</h1>
              <div className="text-lg text-white/90 mb-8">
                <p className="mb-2">Residential • Commercial/Office • Turnovers/Student and Apartment</p>
                <p>Move in and Out • Air BnB</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <a 
                  href="tel:334-877-9513" 
                  className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center"
                  data-testid="hero-call-button"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now: (334) 877-9513
                </a>
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors h-auto"
                  data-testid="hero-book-button"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  BOOK NOW
                </Button>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start items-center space-x-8 text-white/80">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Insured & Bonded</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>5-Star Rated</span>
                </div>
                <div className="hidden sm:flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Same Day Service</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Mascot */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src={mascotImage} 
                alt="Self-Maid superhero sponge mascot saying MESS? I'M ON IT! with cleaning spray" 
                className="max-w-md w-full h-auto"
                data-testid="hero-mascot-image"
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
