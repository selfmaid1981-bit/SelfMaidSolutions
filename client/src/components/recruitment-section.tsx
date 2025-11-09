import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookingModal } from './booking-modal';
import { DollarSign, Clock, Users, Briefcase, Award, Heart } from 'lucide-react';
import cleaningTeamImage from '@assets/stock_images/professional_cleanin_384f93e4.jpg';

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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900 dark:to-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
                Join Our Team
              </h2>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Be part of Alabama's most trusted cleaning service! We're looking for dedicated professionals 
                who share our commitment to exceptional service, reliability, and customer satisfaction.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl h-auto"
                  data-testid="recruitment-signup-button"
                >
                  Apply Now
                </Button>
                
                <a 
                  href="mailto:selfmaidclean@outlook.com?subject=Career Inquiry - Self-Maid Cleaning"
                  className="inline-flex items-center justify-center bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
                  data-testid="recruitment-email-button"
                >
                  Email Us
                </a>
              </div>
              
              <div className="flex items-center space-x-8 text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="font-semibold">Service</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="font-semibold">Reliability</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="font-semibold">Trust</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={cleaningTeamImage} 
                alt="Professional cleaning team at work" 
                className="w-full h-auto object-cover"
                data-testid="recruitment-team-image"
              />
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center font-serif">
              Why Work With Us?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
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