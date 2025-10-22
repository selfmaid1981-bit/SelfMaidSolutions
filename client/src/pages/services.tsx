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
    description: 'Complete home cleaning services tailored to your schedule and preferences. Serving Montgomery and Prattville homes with professional care.',
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
    description: 'Professional cleaning services to maintain a clean and productive workplace in Montgomery and Prattville business districts.',
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
    description: 'Fast and thorough turnover cleaning to keep your Montgomery or Prattville rental property booking-ready with same-day service.',
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
    pricing: '$45 per room',
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
        title="Cleaning Services Montgomery & Prattville AL | Pricing & Details | Self-Maid"
        description="Professional cleaning services in Montgomery and Prattville, AL. Transparent pricing for residential, commercial, Airbnb, move-in/out cleaning. Free quotes. Call (334) 877-9513."
        keywords="cleaning services Montgomery AL, Prattville cleaning prices, residential cleaning cost Montgomery, commercial cleaning Prattville, Airbnb cleaning rates Alabama, move out cleaning Montgomery pricing"
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

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Common questions about our cleaning services in Montgomery and Prattville, AL
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What areas do you serve in Alabama?
                  </h3>
                  <p className="text-muted-foreground">
                    We proudly serve Montgomery, Prattville, and surrounding areas in central Alabama. Our cleaning teams are familiar with local neighborhoods and can provide same-day or next-day service in most locations. Call us at (334) 877-9513 to confirm service availability in your specific area.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Are you insured and bonded?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! Self-Maid Cleaning Solutions is fully insured and bonded for your protection. All our team members undergo comprehensive background checks and are trained in professional cleaning techniques. We carry liability insurance to protect your property and give you complete peace of mind.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Do I need to provide cleaning supplies?
                  </h3>
                  <p className="text-muted-foreground">
                    No! We bring all necessary cleaning supplies and equipment. We use professional-grade, eco-friendly cleaning products that are safe for your family and pets. If you have specific products you'd like us to use or any allergies we should know about, just let us know when booking.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    How do I get a quote for my property in Montgomery or Prattville?
                  </h3>
                  <p className="text-muted-foreground">
                    Getting a quote is easy! Use our online quote calculator for instant pricing based on your property size and service needs. You can also call us at (334) 877-9513 for a free phone estimate, or schedule an in-person assessment for larger commercial properties or special projects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What if I'm not satisfied with the cleaning?
                  </h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority! We offer a 100% satisfaction guarantee. If you're not completely happy with our service, contact us within 24 hours and we'll return to re-clean the areas of concern at no additional charge. With 16 years of experience and 500+ happy customers, we're confident you'll love the results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Can you accommodate same-day or emergency cleaning requests?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! We understand that cleaning emergencies happen. We offer same-day cleaning services in Montgomery and Prattville, subject to availability. Contact us as early as possible for the best chance of accommodating your request. Our Airbnb turnover service is specifically designed for quick turnarounds.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Do you offer recurring cleaning services?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolutely! We offer weekly, bi-weekly, and monthly recurring cleaning services with discounted rates. Weekly service receives 15% off, bi-weekly gets 10% off, and monthly service gets 5% off. Regular customers enjoy priority scheduling and consistent service from the same cleaning team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location-Specific Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-center">
              Serving Montgomery & Prattville, Alabama
            </h2>
            <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-12">
              With 16 years of experience serving the greater Montgomery area, we understand the unique cleaning needs of Alabama homes and businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Montgomery, AL</h3>
                  <p className="text-muted-foreground mb-4">
                    From downtown historic districts to suburban neighborhoods, we provide comprehensive cleaning services throughout Montgomery. Whether you're in Garden District, Old Cloverdale, or Hampstead, our local team knows your area and can provide reliable, efficient service.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Popular services in Montgomery:</strong> Residential cleaning, commercial office cleaning, move-in/out cleaning for apartments and homes, and deep cleaning for historic properties.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Prattville, AL</h3>
                  <p className="text-muted-foreground mb-4">
                    Serving the "Fountain City" with pride! We clean homes and businesses throughout Prattville, from established neighborhoods to new developments. Our team is familiar with local property types and can handle everything from single-family homes to multi-unit properties.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Popular services in Prattville:</strong> Weekly home cleaning, Airbnb turnover for rental properties, student housing cleaning, and commercial cleaning for local businesses.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-lg mb-6">
                <strong>Also serving:</strong> Millbrook, Wetumpka, Pike Road, and surrounding communities in Autauga and Montgomery counties.
              </p>
              <a 
                href="/quote" 
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Your Free Quote Today
              </a>
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
                href="/quote" 
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
