import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Leaf, Clock, Star, Phone } from 'lucide-react';
import aboutImage from '@assets/Copilot_20250927_160848_1759309660777.png';
import battleScene1 from '@assets/15B2E058-5750-4693-84A2-56BB21CDBAC2_1759307198370.png';
import battleScene2 from '@assets/2178DE78-F139-4676-9870-E02E493A2335_1759308549711.png';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete peace of mind with comprehensive insurance coverage.'
  },
  {
    icon: Users,
    title: 'Background Checked',
    description: 'All team members undergo thorough background checks.'
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Safe, non-toxic cleaning products for your family and pets.'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'We work around your schedule, including weekends.'
  }
];

const stats = [
  { number: '500+', label: 'Happy Customers' },
  { number: '16 Years', label: 'Experience' },
  { number: '24/7', label: 'Support Available' },
  { number: '100%', label: 'Satisfaction Guarantee' }
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us | Self-Maid Cleaning Solutions Alabama"
        description="Learn about Self-Maid Cleaning Solutions - Alabama's trusted cleaning service. Fully insured, background-checked team with eco-friendly products and flexible scheduling."
        keywords="Alabama cleaning company, about Self-Maid, cleaning service team, insured cleaners, background checked, eco-friendly cleaning"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-primary/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Self-Maid Cleaning
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted cleaning partner in Alabama, dedicated to making your world shine with superhero-level service.
            </p>
          </div>
        </section>

        {/* Main About Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Why Choose Self-Maid Cleaning?
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  With years of experience serving Alabama communities, we understand what it takes to keep your space spotless. Our team is trained, insured, and committed to exceeding your expectations.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  We believe cleaning shouldn't be a chore that weighs you down. That's why we've assembled a team of cleaning superheroes who bring energy, expertise, and eco-friendly solutions to every job.
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
              </div>
              
              <div className="relative">
                <img 
                  src={aboutImage} 
                  alt="Meet Shyne - Self-Maid Cleaning mascot superhero sponge - Let's light up this mess!" 
                  className="rounded-lg shadow-lg w-full h-auto" 
                  data-testid="about-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Track Record</h2>
              <p className="text-muted-foreground text-lg">Numbers that speak to our commitment to excellence</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Battle Scene Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                We Fight Dirt So You Don't Have To!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our cleaning superheroes are equipped and ready to tackle even the toughest messes. 
                No job is too big or too dirty for our expert team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={battleScene1}
                      alt="Superhero sponge mascot battling dirt with cleaning supplies" 
                      className="w-full h-auto transform transition-transform group-hover:scale-105"
                      data-testid="about-battle-scene-1"
                    />
                  </div>
                  <div className="p-6 bg-primary/5">
                    <h3 className="text-xl font-bold text-foreground mb-2">Armed & Ready</h3>
                    <p className="text-muted-foreground">
                      Our team comes fully equipped with professional-grade cleaning tools and eco-friendly 
                      solutions to defeat dirt, grime, and germs in every corner.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={battleScene2}
                      alt="Cleaning hero conquering mess and grime" 
                      className="w-full h-auto transform transition-transform group-hover:scale-105"
                      data-testid="about-battle-scene-2"
                    />
                  </div>
                  <div className="p-6 bg-secondary/5">
                    <h3 className="text-xl font-bold text-foreground mb-2">No Mess Too Tough</h3>
                    <p className="text-muted-foreground">
                      Whether it's stubborn stains, accumulated dust, or deep-seated grime, 
                      our superheroes tackle every challenge with skill and determination.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To transform the cleaning industry in Alabama by providing reliable, eco-friendly, and 
                  personalized cleaning services that give our customers more time to focus on what matters 
                  most to them. We believe everyone deserves a clean, healthy environment without the stress 
                  of maintaining it themselves.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Self-Maid Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied customers across Alabama and discover what superhero-level cleaning looks like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:334-877-9513" 
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                data-testid="about-cta-phone"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (334) 877-9513
              </a>
              <a 
                href="/#contact" 
                className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors"
                data-testid="about-cta-contact"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}