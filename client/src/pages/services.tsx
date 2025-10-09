import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { QuickBookingForm } from '@/components/quick-booking-form';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Home, ArrowRightLeft, Sparkles } from 'lucide-react';
import residentialMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_40_12 PM_1757723474618.png';
import commercialMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_42_11 PM_1757723517491.png';
import dormMascot from '@assets/ChatGPT Image Sep 12, 2025, 04_48_21 PM_1757730283479.png';
import moveoutMascot from '@assets/ChatGPT Image Sep 12, 2025, 05_09_00 PM_1757730261066.png';
import airbnbMascot from '@assets/ChatGPT Image Sep 12, 2025, 05_04_54 PM_1757726485914.png';
import teamMascot from '@assets/1757706827111_b956ca088944de0fd6e1a8f465109c1b_1757728436450.webp';

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
        
        {/* Team Mascot Hero Section */}
        <section className="relative">
          <div 
            className="min-h-[350px] sm:min-h-[450px] lg:min-h-[600px] relative"
            style={{
              backgroundImage: `url(${teamMascot})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Fade gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
          </div>
          <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Cleaning Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Professional cleaning solutions with transparent pricing and guaranteed satisfaction. 
              Choose from our comprehensive range of services designed for Alabama homes and businesses.
            </p>
            <p className="text-2xl lg:text-3xl font-bold text-primary">
              Join the Clean Team!
            </p>
          </div>
        </section>

        {/* Quick Booking Form */}
        <section className="py-8 lg:py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickBookingForm />
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {serviceDetails.map((service, index) => (
                <Card key={service.id} className="overflow-hidden" data-testid={`service-detail-${service.id}`}>
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className="p-6 lg:p-8">
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
                      
                      <div className={`bg-muted/30 p-6 lg:p-8 flex items-center justify-center ${
                        index % 2 === 1 ? 'lg:col-start-1' : ''
                      }`}>
                        <div className="text-center">
                          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            {service.id === 'residential' ? (
                              <img 
                                src={residentialMascot} 
                                alt="Residential cleaning sponge mascot with glasses, mop and bucket" 
                                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
                              />
                            ) : service.id === 'commercial' ? (
                              <img 
                                src={commercialMascot} 
                                alt="Commercial office cleaning sponge mascot with spray bottle and clipboard" 
                                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
                              />
                            ) : service.id === 'moveout' ? (
                              <img 
                                src={moveoutMascot} 
                                alt="Move in/out cleaning sponge mascot team in action with moving and cleaning tools" 
                                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
                              />
                            ) : service.id === 'dorm' ? (
                              <img 
                                src={dormMascot} 
                                alt="Student dorm cleaning sponge mascot with moving boxes, clothing, and dorm furniture" 
                                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
                              />
                            ) : service.id === 'airbnb' ? (
                              <img 
                                src={airbnbMascot} 
                                alt="Airbnb cleaning sponge mascot with sanitization supplies and medical cross" 
                                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
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
                href="tel:334-877-9513" 
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                data-testid="services-cta-phone"
              >
                Call (334) 877-9513
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
