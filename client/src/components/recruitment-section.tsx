import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import recruitmentBanner from '@assets/Superhero Sponges Clean the Day!_1757704445189.png';

export function RecruitmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Banner Image */}
            <div className="mb-8">
              <img 
                src={recruitmentBanner} 
                alt="Join the Clean Team - Superhero Sponges recruitment banner" 
                className="max-w-4xl mx-auto w-full h-auto rounded-lg shadow-lg"
                data-testid="recruitment-banner-image"
              />
            </div>
            
            {/* Content */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                JOIN THE CLEAN TEAM!
              </h2>
              
              <div className="flex justify-center items-center space-x-4 text-lg font-semibold text-muted-foreground mb-8">
                <span>SERVICE</span>
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span>RELIABILITY</span>
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span>TRUST</span>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of Alabama's most trusted cleaning team! We're looking for dedicated professionals 
                who share our commitment to exceptional service and reliability.
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full text-lg font-semibold h-auto shadow-lg transform hover:scale-105 transition-all"
                  data-testid="recruitment-signup-button"
                >
                  SIGN UP NOW
                </Button>
                
                <a 
                  href="mailto:selfmaidclean@outlook.com?subject=Join the Clean Team - Career Inquiry"
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                  data-testid="recruitment-email-button"
                >
                  Email Us About Careers
                </a>
              </div>
              
              {/* Benefits */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md">
                  <div className="text-3xl mb-3">💪</div>
                  <h3 className="font-semibold text-foreground mb-2">Competitive Pay</h3>
                  <p className="text-sm text-muted-foreground">Earn competitive wages with performance bonuses</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md">
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="font-semibold text-foreground mb-2">Flexible Schedule</h3>
                  <p className="text-sm text-muted-foreground">Work around your life with flexible scheduling options</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md">
                  <div className="text-3xl mb-3">🌟</div>
                  <h3 className="font-semibold text-foreground mb-2">Great Team</h3>
                  <p className="text-sm text-muted-foreground">Join a supportive team that values your contribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        isRecruitment={true}
      />
    </>
  );
}