import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroBanner from '@assets/793F560B-3E81-474C-9196-6C977F28E5C3_1759307212932.png';

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {/* Clear Value Proposition - Emotional Promise */}
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-2 md:mb-4">
              A Clean Home That Feels Like Peace of Mind
            </h1>
            <p className="text-sm md:text-lg text-black max-w-3xl mx-auto mb-3 md:mb-4">
              We follow an <span className="font-bold">extensive training guide</span> and a <span className="font-bold">no-nonsense plan for every visit</span>—so your home is cleaned the right way, every time, with one goal: <span className="font-bold">alleviate your stress and restore your comfort.</span>
            </p>
            <p className="text-xs md:text-base text-black/70">
              Montgomery • Prattville • Selma • Homewood • Clanton, Alabama
            </p>
          </div>

          {/* Our Promise - Training & Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8 max-w-3xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-lg text-center">
              <p className="text-xs md:text-sm font-bold text-blue-900">Structured Visit Checklist</p>
              <p className="text-xs text-black/70 hidden md:block">Nothing is ever missed</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-lg text-center">
              <p className="text-xs md:text-sm font-bold text-blue-900">Professionally Trained</p>
              <p className="text-xs text-black/70 hidden md:block">In-house training guide</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-lg text-center">
              <p className="text-xs md:text-sm font-bold text-blue-900">Comfort-Focused</p>
              <p className="text-xs text-black/70 hidden md:block">Zero judgment, full respect</p>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="mb-4 md:mb-10 fade-in">
            <img 
              src={heroBanner}
              alt="Self-Maid Cleaning Solutions - We Make Your World Shine" 
              className="w-full h-auto rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              data-testid="hero-banner-image"
            />
          </div>
          
          {/* Special Offer Banner */}
          <div className="mb-4 md:mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg max-w-2xl mx-auto">
            <p className="text-center font-bold text-sm md:text-lg">
              🎉 $20 OFF Your First Cleaning! 🎉
            </p>
          </div>

          {/* CTA Buttons & Trust Badges */}
          <div className="text-center fade-in">
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center mb-4 md:mb-6">
              <a 
                href="tel:334-877-9513" 
                className="glass-effect text-blue-700 px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 group"
                data-testid="hero-call-button"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
                <span className="md:hidden">(334) 877-9513</span>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-sm opacity-80">Call For Same-Day Service</span>
                  <span className="text-xl">(334) 877-9513</span>
                </div>
              </a>
              <a 
                href="sms:3348779513?body=Hi!%20I'm%20interested%20in%20a%20cleaning%20quote."
                className="glass-effect text-green-700 px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105 group"
                data-testid="hero-text-button"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
                <span className="md:hidden">Text Us</span>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-sm opacity-80">Text Us Anytime</span>
                  <span className="text-xl">Send a Text</span>
                </div>
              </a>
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="premium-button text-white px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-bold h-auto group relative overflow-hidden"
                data-testid="hero-book-button"
              >
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
                <span className="md:hidden">GET QUOTE</span>
                <span className="hidden md:inline">GET INSTANT QUOTE</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              <div className="flex items-center bg-white/30 backdrop-blur-md px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-white/40">
                <Shield className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-blue-900" />
                <span className="text-xs md:text-sm font-bold text-blue-900">Insured</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-white/40">
                <Star className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-yellow-500" />
                <span className="text-xs md:text-sm font-bold text-blue-900">5-Star</span>
              </div>
              <div className="flex items-center bg-white/30 backdrop-blur-md px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-white/40">
                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-blue-900" />
                <span className="text-xs md:text-sm font-bold text-blue-900">Same-Day</span>
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
