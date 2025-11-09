import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroBanner from '@assets/793F560B-3E81-474C-9196-6C977F28E5C3_1759307212932.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Hero Banner Image */}
          <div className="mb-10 fade-in">
            <img 
              src={heroBanner}
              alt="Self-Maid Cleaning Solutions - We Make Your World Shine" 
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              data-testid="hero-banner-image"
            />
          </div>
          
          {/* CTA Buttons & Trust Badges */}
          <div className="text-center fade-in">
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <a 
                href="tel:334-877-9513" 
                className="glass-effect text-blue-700 px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 group"
                data-testid="hero-call-button"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                Call Now: (334) 877-9513
              </a>
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="premium-button text-white px-10 py-5 rounded-xl text-lg font-bold h-auto group"
                data-testid="hero-book-button"
              >
                <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                BOOK ONLINE
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Shield className="w-6 h-6 mr-3 text-blue-900" />
                <span className="text-base font-bold text-blue-900">Fully Insured & Bonded</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Star className="w-6 h-6 mr-3 text-yellow-500" />
                <span className="text-base font-bold text-blue-900">500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Clock className="w-6 h-6 mr-3 text-blue-900" />
                <span className="text-base font-bold text-blue-900">Same-Day Service Available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200 rounded-full blur-3xl"></div>
        </div>
      </section>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
}
