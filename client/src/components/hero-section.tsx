import { useState } from 'react';
import { Phone, Calendar, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import heroImage from '@assets/stock_images/professional_house_c_5be17032.jpg';
import logoImage from '@assets/SMLLC LOGO_1761598219650.png';

import _793F560B_3E81_474C_9196_6C977F28E5C3 from "@assets/793F560B-3E81-474C-9196-6C977F28E5C3.png";

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left fade-in">
              <div className="mb-6">
                <img 
                  src={logoImage}
                  alt="Self-Maid Cleaning Solutions LLC" 
                  className="h-20 w-auto mx-auto lg:mx-0 mb-8"
                  data-testid="hero-logo"
                />
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-serif leading-tight">
                Professional Cleaning Services in Montgomery & Prattville
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                16 years of experience serving Alabama families and businesses. 
                From residential homes to commercial offices, we deliver spotless results every time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a 
                  href="tel:334-877-9513" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group"
                  data-testid="hero-call-button"
                >
                  <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Call (334) 877-9513
                </a>
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl h-auto group"
                  data-testid="hero-book-button"
                >
                  <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Book Online
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center bg-white dark:bg-slate-800 px-5 py-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fully Insured</span>
                </div>
                <div className="flex items-center bg-white dark:bg-slate-800 px-5 py-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">500+ Happy Customers</span>
                </div>
                <div className="flex items-center bg-white dark:bg-slate-800 px-5 py-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Same-Day Available</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Hero Image */}
            <div className="fade-in">
              <img 
                src={_793F560B_3E81_474C_9196_6C977F28E5C3}
                alt="Professional house cleaning service - sparkling clean modern kitchen" 
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                data-testid="hero-banner-image"
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
