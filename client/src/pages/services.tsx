import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { QuickBookingForm } from '@/components/quick-booking-form';
import { SocialProofBar } from '@/components/social-proof-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Star, AlertCircle } from 'lucide-react';
import heroCleaningImage from '@assets/image_1765053192396.png';
import residentialImage from '@assets/stock_images/professional_house_c_e14d1c08.jpg';
import deepCleaningImage from '@assets/stock_images/deep_cleaning_kitche_676b17fb.jpg';
import commercialImage from '@assets/stock_images/commercial_office_cl_ccd81be4.jpg';
import airbnbImage from '@assets/stock_images/airbnb_vacation_rent_f4a32ec6.jpg';
import moveoutImage from '@assets/stock_images/move_out_cleaning_em_6d539a21.jpg';
import apartmentImage from '@assets/stock_images/apartment_cleaning_p_7464443a.jpg';
import dormImage from '@assets/stock_images/student_dorm_room_cl_f32964a4.jpg';

const serviceImages: Record<string, string> = {
  residential: residentialImage,
  deep: deepCleaningImage,
  commercial: commercialImage,
  airbnb: airbnbImage,
  moveout: moveoutImage,
  apartment: apartmentImage,
  dorm: dormImage,
};

const serviceDetails = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services tailored to your schedule and preferences. Serving Montgomery, Prattville, Selma, Homewood, and Clanton homes with professional care.',
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
    ],
    notIncluded: [
      'Exterior window cleaning',
      'Garage or outdoor areas',
      'Moving heavy furniture',
      'Biohazard or mold remediation',
      'Organizing or decluttering (can add on)'
    ],
    idealFor: 'Busy families, working professionals, and anyone who wants to come home to a clean space without lifting a finger.'
  },
  {
    id: 'deep',
    title: 'Deep Cleaning Service',
    description: 'Our most intensive cleaning service - a comprehensive top-to-bottom transformation of your entire home. Perfect for spring cleaning, post-renovation, or when your home needs extra attention. Priced based on square footage for fair, accurate quotes.',
    pricing: 'Starting at $250 (based on square footage)',
    features: [
      'KITCHEN: Clean inside/outside all appliances (oven, microwave, refrigerator), degrease cabinets, scrub countertops & backsplash, sanitize sink & faucets',
      'BATHROOMS: Scrub tile & grout, descale shower doors, deep clean toilets, disinfect all surfaces, polish fixtures & mirrors',
      'BEDROOMS: Dust ceiling fans & light fixtures, wipe baseboards & door frames, vacuum under furniture, organize closets (optional)',
      'LIVING AREAS: Vacuum/shampoo upholstery, dust all surfaces including high areas, clean window sills & tracks, polish wood furniture',
      'FLOORS: Vacuum all carpets & rugs, mop & polish hard floors, clean corners & edges, baseboards wiped down',
      'EXTRAS: Dust blinds & window treatments, wipe light switches & outlets, clean interior windows, remove cobwebs',
      'All rooms receive thorough dusting, vacuuming, and sanitization',
      'Typical time: 4-8 hours depending on home size'
    ],
    notIncluded: [
      'Exterior windows and outdoor areas',
      'Professional carpet steam cleaning (can add on)',
      'Mold remediation or biohazard cleanup',
      'Hoarding situations',
      'Garage cleaning (can add on)'
    ],
    idealFor: 'First-time customers, seasonal deep cleans, post-party or event cleanup, and homes that haven\'t been professionally cleaned in 6+ months.'
  },
  {
    id: 'commercial',
    title: 'Commercial & Office Cleaning',
    description: 'Professional cleaning services to maintain a clean and productive workplace in Montgomery, Prattville, Selma, Homewood, and Clanton business districts.',
    pricing: 'Starting at $120',
    features: [
      'Office spaces and workstations',
      'Conference rooms',
      'Reception areas',
      'Restroom sanitization',
      'Kitchen/break room cleaning',
      'Floor care and maintenance',
      'Dusting and surface cleaning',
      'Trash and recycling service'
    ],
    notIncluded: [
      'Industrial equipment cleaning',
      'Medical-grade sterilization',
      'Warehouse or factory floors',
      'IT equipment interior cleaning',
      'High-rise window cleaning'
    ],
    idealFor: 'Small to medium offices, retail stores, medical/dental offices, real estate offices, and professional service businesses.'
  },
  {
    id: 'airbnb',
    title: 'Airbnb Cleaning',
    description: 'Fast and thorough turnover cleaning to keep your Montgomery, Prattville, Selma, or Clanton rental property booking-ready with same-day service.',
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
    ],
    notIncluded: [
      'Deep cleaning tasks (separate service)',
      'Laundry pickup/delivery off-site',
      'Stocking groceries or personal items',
      'Major property repairs',
      'Pet care or pet cleaning'
    ],
    idealFor: 'Airbnb hosts, VRBO owners, vacation rental managers, and anyone with short-term rental properties.'
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
      'Sill and ledge cleaning',
      'Baseboard and trim cleaning',
      'Light fixture cleaning',
      'Carpet cleaning available',
      'Deposit back guarantee'
    ],
    notIncluded: [
      'Moving or packing belongings',
      'Junk removal or hauling',
      'Professional carpet replacement',
      'Wall painting or repairs',
      'Pest control services'
    ],
    idealFor: 'Renters moving out, new homeowners, landlords preparing units, and anyone transitioning between properties.'
  },
  {
    id: 'apartment',
    title: 'Apartment Turnover',
    description: 'Professional turnover cleaning for property managers and landlords in Montgomery, Prattville, Selma, Homewood, and Clanton.',
    pricing: 'Starting at $108',
    features: [
      'Same-day or next-day service',
      'Make-ready deep cleaning',
      'All rooms sanitized',
      'Kitchen and appliances',
      'Bathroom deep clean',
      'Carpet spot cleaning',
      'Move-in ready photos',
      'Volume discounts for property managers'
    ],
    notIncluded: [
      'Major renovation cleanup',
      'Full carpet replacement',
      'Paint touch-ups or repairs',
      'HVAC duct cleaning',
      'Junk removal or haul away'
    ],
    idealFor: 'Property managers, landlords, real estate investors, and housing authorities.'
  },
  {
    id: 'dorm',
    title: 'Student Dorm Turnover',
    description: 'Quick and efficient cleaning between semesters and student moves.',
    pricing: 'Call for pricing',
    features: [
      'Fast 2-4 hour turnaround',
      'Student-friendly pricing',
      'Sanitization and disinfection',
      'Furniture cleaning',
      'Floor care',
      'Bathroom deep clean',
      'Trash removal',
      'End-of-semester specials'
    ],
    notIncluded: [
      'Personal belongings packing',
      'Moving services',
      'Storage or shipping',
      'Furniture repairs',
      'Exterior building cleaning'
    ],
    idealFor: 'Universities, student housing, parents helping students move, and campus housing managers.'
  }
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Cleaning Services Montgomery, Prattville, Selma, Homewood & Clanton AL | Self-Maid"
        description="Professional cleaning services in Montgomery, Prattville, Selma, Homewood, and Clanton, AL. Transparent pricing for residential, commercial, Airbnb, move-in/out cleaning. Free quotes. Call (334) 877-9513."
        keywords="cleaning services Montgomery AL, Prattville cleaning prices, Selma cleaning company, Homewood house cleaning, Clanton cleaning service, residential cleaning cost Montgomery, commercial cleaning Prattville, Airbnb cleaning rates Alabama, move out cleaning Montgomery pricing, move in cleaning cost Prattville, deep cleaning prices Montgomery, apartment cleaning rates Prattville AL, office cleaning cost Montgomery, house cleaning prices Alabama, maid service rates Montgomery, cleaning service cost Prattville, affordable cleaning Montgomery AL, same day cleaning rates Prattville, recurring cleaning discounts Montgomery, weekly cleaning service Prattville, bi-weekly cleaning Montgomery, monthly cleaning rates Alabama, vacation rental cleaning Montgomery, short term rental cleaning Prattville, student dorm cleaning Montgomery AL, post construction cleaning Prattville, spring cleaning rates Montgomery, apartment turnover cleaning Alabama, Selma maid service, Homewood office cleaning, Clanton residential cleaning"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section - Split Layout */}
        <section className="bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
              <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  SERVICES
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Professional<br />
                  Cleaning<br />
                  Services
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md">
                  Residential & Commercial Cleaning in Montgomery, Prattville, Selma, Homewood & Clanton, AL
                </p>
                <div>
                  <a 
                    href="/quote" 
                    className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                    data-testid="hero-get-quote-btn"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
              <div className="relative overflow-hidden bg-[#f5f3ef] flex items-center justify-center">
                <img 
                  src={heroCleaningImage}
                  alt="Self-Maid Cleaning Solutions superhero sponge mascot in clean living room"
                  className="w-full h-full object-contain min-h-[300px] lg:min-h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <SocialProofBar variant="compact" />

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
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`p-6 lg:p-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                      <p className="text-muted-foreground text-lg mb-4">{service.description}</p>
                      <div className="text-2xl font-bold text-primary mb-4">{service.pricing}</div>
                      
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-foreground">Ideal for: </span>
                            <span className="text-muted-foreground">{service.idealFor}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-500" />
                            What's Included
                          </h3>
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Not Included
                          </h3>
                          {service.notIncluded.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start">
                              <X className="w-4 h-4 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </div>
                          ))}
                          <p className="text-xs text-muted-foreground italic mt-2">
                            Need something not listed? Ask us about add-on services!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`relative overflow-hidden min-h-[300px] lg:min-h-[400px] ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <img 
                        src={serviceImages[service.id]}
                        alt={`Professional ${service.title.toLowerCase()}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
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
                    Yes! We understand that cleaning emergencies happen. We offer same-day cleaning services throughout our service areas including Montgomery, Prattville, Selma, Homewood, and Clanton, subject to availability. Contact us as early as possible for the best chance of accommodating your request. Our Airbnb turnover service is specifically designed for quick turnarounds.
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
              Serving Central Alabama Communities
            </h2>
            <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-12">
              With 16 years of experience serving Montgomery, Prattville, Selma, Homewood, Clanton, and surrounding areas, we understand the unique cleaning needs of Alabama homes and businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Montgomery, AL</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    From downtown historic districts to suburban neighborhoods. Our local team knows Garden District, Old Cloverdale, Hampstead, and beyond.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Popular:</strong> Residential, commercial, move-in/out cleaning
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Prattville, AL</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Serving the "Fountain City" with pride! From established neighborhoods to new developments, we handle homes and multi-unit properties.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Popular:</strong> Weekly cleaning, Airbnb turnover, commercial
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Selma, AL</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Historic Selma deserves professional care. We serve homes and businesses throughout Dallas County with attention to detail.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Popular:</strong> Residential, deep cleaning, move-out cleaning
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Homewood, AL</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Quality cleaning services for the greater Birmingham metro area. From charming bungalows to modern offices, we've got you covered.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Popular:</strong> Residential, commercial, recurring service
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Clanton, AL</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Serving Chilton County's peach country! Professional cleaning for homes, vacation rentals, and local businesses.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Popular:</strong> Residential, Airbnb, deep cleaning
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Surrounding Areas</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Millbrook, Wetumpka, Pike Road, and all communities in Autauga, Montgomery, Chilton, Dallas, and Jefferson counties.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Call to confirm:</strong> (334) 877-9513
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
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
