import { Shield, UserCheck, Leaf, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aboutImage from '@assets/ChatGPT Image Sep 11, 2025, 03_48_23 AM_1757710354914.png';

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete peace of mind with full insurance coverage'
    },
    {
      icon: UserCheck,
      title: 'Background Checked',
      description: 'All team members thoroughly vetted and trained'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Safe, green cleaning products for your family'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'We work around your busy schedule'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Why Choose Self-Maid Cleaning?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              With years of experience serving Alabama communities, we understand what it takes to keep your space spotless. Our team is trained, insured, and committed to exceeding your expectations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start" data-testid={`feature-${index}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:334-877-9513" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors text-center"
                data-testid="about-call-button"
              >
                Call (334) 877-9513
              </a>
              <Button 
                variant="outline" 
                className="px-6 py-3"
                data-testid="about-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={aboutImage} 
              alt="Self-Maid mascot sponge superhero with cleaning spray - We Make Your World Shine" 
              className="rounded-lg shadow-lg w-full h-auto" 
              data-testid="about-image"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-lg shadow-lg p-4 border border-border" data-testid="rating-badge">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">5.0 Rating</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">500+ Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
