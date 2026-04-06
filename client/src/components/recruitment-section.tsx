import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import { DollarSign, Clock, Users, Briefcase, Award, Heart } from 'lucide-react';

export function RecruitmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Earn competitive wages with performance bonuses and growth opportunities'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work around your life with flexible scheduling options that fit your needs'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Join a supportive, family-oriented team that values your contribution'
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Opportunities for advancement and professional development'
    },
    {
      icon: Award,
      title: 'Training Provided',
      description: 'Comprehensive training program with ongoing support'
    },
    {
      icon: Heart,
      title: 'Make a Difference',
      description: 'Help families and businesses maintain clean, healthy spaces'
    }
  ];

  return (
    <>
      <section className="py-16 lg:py-24 deep-teal-bg dark:from-slate-900 dark:to-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
                Join Our Team
              </h2>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Be part of Alabama's most trusted cleaning service! We're looking for dedicated professionals 
                who share our commitment to exceptional service, reliability, and customer satisfaction.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#C6A969] hover:bg-[#b89a5a] text-[#1F2A37] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl h-auto"
                  data-testid="recruitment-signup-button"
                >
                  Apply Now
                </Button>
                
                <a 
                  href="mailto:selfmaidclean@outlook.com?subject=Career Inquiry - Self-Maid Cleaning"
                  className="inline-flex items-center justify-center bg-white/10 text-white border-2 border-[#C6A969]/40 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors shadow-lg hover:shadow-xl"
                  data-testid="recruitment-email-button"
                >
                  Email Us
                </a>
              </div>
              
              <div className="flex items-center space-x-8 text-white/70">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#C6A969] rounded-full mr-2"></div>
                  <span className="font-semibold">Service</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#C6A969] rounded-full mr-2"></div>
                  <span className="font-semibold">Reliability</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#C6A969] rounded-full mr-2"></div>
                  <span className="font-semibold">Trust</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center font-serif">
              Why Work With Us?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#C6A969]/20"
                  >
                    <div className="w-12 h-12 bg-[#C6A969]/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#C6A969]" />
                    </div>
                    <h4 className="font-bold text-lg text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
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