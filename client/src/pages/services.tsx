import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { QuickBookingForm } from '@/components/quick-booking-form';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import residentialMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_40_12 PM_1757723474618.png';
import commercialMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_42_11 PM_1757723517491.png';
import dormMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_48_21 PM_1757727839055.png';
import airbnbMascot from '@assets/ChatGPT Image Sep 12, 2025, 05_04_54 PM_1757726485914.png';
import teamMascot from '@assets/1757706827111_b956ca088944de0fd6e1a8f465109c1b_1757728012075.webp';

const serviceDetails = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services tailored to your schedule and preferences.',
    pricing: 'Starting at $80',
    features: [
      'Living rooms and bedrooms',
      'Kitchen cleaning and sanitization',
      'Bathroom deep cleaning',
      'Dusting and vacuuming',
      'Floor mopping and care',
      'Trash removal',
      'Weekly, bi-weekly, or monthly service',
      'One-time deep cleaning available'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial & Office Cleaning',
    description: 'Professional cleaning services to maintain a clean and productive workplace.',
    pricing: 'Starting at $120',
    features: [
      'Office spaces and workstations',
      'Conference rooms',
      'Reception areas',
      'Restroom sanitization',
      'Kitchen/break room cleaning',
      'Window cleaning',
      'Floor care and maintenance',
      'Trash and recycling service'
    ]
  },
  {
    id: 'airbnb',
    title: 'Airbnb Cleaning',
    description: 'Fast and thorough turnover cleaning to keep your property booking-ready.',
    pricing: 'Starting at $65',
    features: [
      'Same-day turnaround service',
      'Complete sanitization',
      'Linen changes and washing',
      'Inventory restocking',
      'Guest amenity setup',
      'Quality check and photos',
      'Flexible scheduling',
      'Emergency cleaning available'
    ]
  },
  {
    id: 'moveout',
    title: 'Move In/Out Cleaning',
    description: 'Comprehensive deep cleaning for moving day to ensure you get your deposit back.',
    pricing: 'Starting at $150',
    features: [
      'Deep clean all rooms',
      'Inside appliance cleaning',
      'Cabinet and drawer cleaning',
      'Window and sill cleaning',
      'Baseboard and trim cleaning',
      'Light fixture cleaning',
      'Carpet cleaning available',
      'Deposit back guarantee'
    ]
  },
  {
    id: 'dorm',
    title: 'Student Dorm Turnover',
    description: 'Quick and efficient cleaning between semesters and student moves.',
    pricing: 'Starting at $45',
    features: [
      'Fast 2-4 hour turnaround',
      'Student-friendly pricing',
      'Sanitization and disinfection',
      'Furniture cleaning',
      'Floor care',
      'Bathroom deep clean',
      'Trash removal',
      'End-of-semester specials'
    ]
  }
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Cleaning Services | Self-Maid Cleaning Solutions Alabama"
        description="Detailed information about our professional cleaning services in Alabama. Residential, commercial, Airbnb, move-in/out, and student dorm cleaning with transparent pricing."
        keywords="Alabama cleaning services pricing, residential cleaning cost, commercial cleaning Alabama, Airbnb cleaning rates, move out cleaning price"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Cleaning Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional cleaning solutions with transparent pricing and guaranteed satisfaction. 
              Choose from our comprehensive range of services designed for Alabama homes and businesses.
            </p>
          </div>
        </section>

        {/* Team Mascot Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img 
              src={teamMascot} 
              alt="Three superhero sponge mascots working together with cleaning tools and spray bottles" 
              className="w-[96rem] h-[96rem] object-contain mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Join the Clean Team!
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to experience superhero-level cleaning? Let's get started!
            </p>
          </div>
        </section>

        {/* Quick Booking Form */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickBookingForm />
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {serviceDetails.map((service, index) => (
                <Card key={service.id} className="overflow-hidden" data-testid={`service-detail-${service.id}`}>
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className="p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                        <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                        <div className="text-2xl font-bold text-primary mb-6">{service.pricing}</div>
                        
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground mb-4">What's Included:</h3>
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start">
                              <Check className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className={`bg-muted/30 p-8 lg:p-12 flex items-center justify-center ${
                        index % 2 === 1 ? 'lg:col-start-1' : ''
                      }`}>
                        <div className="text-center">
                          <div className="w-[32rem] h-[32rem] bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            {service.id === 'residential' ? (
                              <img 
                                src={residentialMascot} 
                                alt="Residential cleaning sponge mascot with glasses, mop and bucket" 
                                className="w-[28rem] h-[28rem] object-contain"
                              />
                            ) : service.id === 'commercial' ? (
                              <img 
                                src={commercialMascot} 
                                alt="Commercial office cleaning sponge mascot with spray bottle and clipboard" 
                                className="w-[28rem] h-[28rem] object-contain"
                              />
                            ) : (service.id === 'moveout' || service.id === 'dorm') ? (
                              <img 
                                src={dormMascot} 
                                alt="Apartment and student dorm cleaning sponge mascot with boxes, clothing, and dorm furniture" 
                                className="w-[28rem] h-[28rem] object-contain"
                              />
                            ) : service.id === 'airbnb' ? (
                              <img 
                                src={airbnbMascot} 
                                alt="Airbnb cleaning sponge mascot with sanitization supplies and medical cross" 
                                className="w-[28rem] h-[28rem] object-contain"
                              />
                            ) : null}
                          </div>
                          <p className="text-muted-foreground">
                            Professional {service.title.toLowerCase()} service with guaranteed satisfaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Book Your Cleaning Service?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get a free quote today and experience the Self-Maid difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:334-413-9029" 
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                data-testid="services-cta-phone"
              >
                Call (334) 413-9029
              </a>
              <a 
                href="/#contact" 
                className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors"
                data-testid="services-cta-quote"
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
