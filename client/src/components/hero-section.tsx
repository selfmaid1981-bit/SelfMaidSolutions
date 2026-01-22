import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock, MessageCircle, Home, Building2, Plane, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroBanner from '@assets/793F560B-3E81-474C-9196-6C977F28E5C3_1759307212932.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Clear Value Proposition - Answers: What, Who, Why */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Premium Home & Commercial Cleaning Services
            </h1>
            <p className="text-xl md:text-2xl text-black font-medium mb-4">
              Serving Montgomery, Prattville, Selma, Homewood & Clanton, Alabama
            </p>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Reliable • Fully Insured • 5-Star Rated • 16 Years Experience
            </p>
          </div>

          {/* Service Types - Quick Visual Reference */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <div className="flex items-center bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-medium text-sm md:text-base">
              <Home className="w-4 h-4 mr-2" />
              Residential
            </div>
            <div className="flex items-center bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-medium text-sm md:text-base">
              <Building2 className="w-4 h-4 mr-2" />
              Commercial
            </div>
            <div className="flex items-center bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-medium text-sm md:text-base">
              <Plane className="w-4 h-4 mr-2" />
              Airbnb & Vacation Rentals
            </div>
            <div className="flex items-center bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-medium text-sm md:text-base">
              <Truck className="w-4 h-4 mr-2" />
              Move In/Out
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="mb-10 fade-in">
            <img 
              src={heroBanner}
              alt="Self-Maid Cleaning Solutions - We Make Your World Shine" 
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              data-testid="hero-banner-image"
            />
          </div>
          
          {/* Special Offer Banner */}
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg max-w-2xl mx-auto">
            <p className="text-center font-bold text-lg">
              🎉 NEW CUSTOMERS: $20 OFF Your First Cleaning! 🎉
            </p>
          </div>

          {/* CTA Buttons & Trust Badges */}
          <div className="text-center fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a 
                href="tel:334-877-9513" 
                className="glass-effect text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 group"
                data-testid="hero-call-button"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="text-sm opacity-80">Call For Same-Day Service</span>
                  <span className="text-xl">(334) 877-9513</span>
                </div>
              </a>
              <a 
                href="sms:3348779513?body=Hi!%20I'm%20interested%20in%20a%20cleaning%20quote."
                className="glass-effect text-green-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 group"
                data-testid="hero-text-button"
              >
                <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="text-sm opacity-80">Text Us Anytime</span>
                  <span className="text-xl">Send a Text</span>
                </div>
              </a>
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="premium-button text-white px-8 py-4 rounded-xl text-lg font-bold h-auto group relative overflow-hidden"
                data-testid="hero-book-button"
              >
                <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>GET INSTANT QUOTE</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center bg-white/30 backdrop-blur-md px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Shield className="w-5 h-5 mr-2 text-blue-900" />
                <span className="text-sm font-bold text-blue-900">Fully Insured & Bonded</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="text-sm font-bold text-blue-900">500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all border border-white/40">
                <Clock className="w-5 h-5 mr-2 text-blue-900" />
                <span className="text-sm font-bold text-blue-900">Same-Day Service</span>
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
