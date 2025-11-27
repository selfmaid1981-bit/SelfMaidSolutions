import { Shield, UserCheck, Leaf, Clock, Award, Users } from 'lucide-react';
import bathroomImage from '@assets/stock_images/clean_modern_bathroo_821537ee.jpg';
import officeImage from '@assets/photo-1507089947368-19c1da9775ae_1764233361201.avif';

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: 'Fully Insured & Bonded',
      description: 'Complete peace of mind with comprehensive insurance coverage'
    },
    {
      icon: UserCheck,
      title: 'Background Checked',
      description: 'All team members thoroughly vetted and professionally trained'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Products',
      description: 'Safe, green cleaning solutions for your family and pets'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Same-day service available. We work around your busy schedule'
    },
    {
      icon: Award,
      title: '16 Years Experience',
      description: 'Serving Montgomery and Prattville with proven expertise'
    },
    {
      icon: Users,
      title: '500+ Happy Customers',
      description: 'Trusted by families and businesses across Alabama'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            Why Choose Self-Maid Cleaning?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Family-owned and operated with 16 years of experience serving Alabama communities. 
            We deliver professional results you can trust.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700" 
                data-testid={`feature-${index}`}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={bathroomImage} 
              alt="Professionally cleaned modern bathroom - spotless results" 
              className="w-full h-auto object-cover" 
              data-testid="about-image-1"
            />
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={officeImage} 
              alt="Professional commercial office cleaning services" 
              className="w-full h-auto object-cover" 
              data-testid="about-image-2"
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="tel:334-877-9513" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="about-call-button"
          >
            Call (334) 877-9513 for a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
