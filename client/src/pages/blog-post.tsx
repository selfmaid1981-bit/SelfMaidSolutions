import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useRoute } from 'wouter';
import { Calendar, Clock, ArrowLeft, Phone } from 'lucide-react';

const blogContent: Record<string, any> = {
  'montgomery-cleaning-guide': {
    title: 'Ultimate Guide to Home Cleaning in Montgomery, AL',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Home Cleaning',
    metaDescription: 'Complete guide to home cleaning in Montgomery, Alabama. Expert tips for dealing with humidity, seasonal cleaning, and keeping your Alabama home spotless year-round.',
    content: `
      <h2>Keeping Your Montgomery Home Spotless Year-Round</h2>
      <p>Living in Montgomery, Alabama comes with unique cleaning challenges. From high humidity levels to seasonal pollen, maintaining a clean home requires specific strategies tailored to our local climate.</p>

      <h3>Dealing with Alabama Humidity</h3>
      <p>Montgomery's humid climate can create ideal conditions for mold and mildew. Here are essential tips:</p>
      <ul>
        <li><strong>Ventilation is Key:</strong> Run bathroom fans during and after showers for at least 20 minutes</li>
        <li><strong>Dehumidifiers:</strong> Use in basements and bathrooms to keep moisture levels below 50%</li>
        <li><strong>Regular Inspections:</strong> Check under sinks, around windows, and in corners for mold growth</li>
        <li><strong>Air Circulation:</strong> Keep air moving with fans to prevent moisture buildup</li>
      </ul>

      <h3>Seasonal Cleaning Tasks for Montgomery Homes</h3>
      <h4>Spring (March-May)</h4>
      <ul>
        <li>Deep clean HVAC systems before summer heat</li>
        <li>Wash windows inside and out to remove winter grime</li>
        <li>Clean and organize closets, switching to summer wardrobes</li>
        <li>Power wash exterior surfaces including patios and driveways</li>
      </ul>

      <h4>Summer (June-August)</h4>
      <ul>
        <li>Clean ceiling fans and air vents weekly</li>
        <li>Mop floors more frequently due to increased foot traffic</li>
        <li>Sanitize high-touch surfaces daily</li>
        <li>Keep outdoor entertaining areas clean and pest-free</li>
      </ul>

      <h4>Fall (September-November)</h4>
      <ul>
        <li>Prepare for holiday guests with deep cleaning</li>
        <li>Clean gutters and downspouts</li>
        <li>Wash exterior windows before winter</li>
        <li>Deep clean carpets and upholstery</li>
      </ul>

      <h4>Winter (December-February)</h4>
      <ul>
        <li>Focus on indoor air quality with filter changes</li>
        <li>Clean and organize after holiday decorations</li>
        <li>Deep clean kitchen after holiday cooking</li>
        <li>Prepare home for spring with decluttering</li>
      </ul>

      <h3>Room-by-Room Montgomery Cleaning Checklist</h3>
      <h4>Kitchen</h4>
      <ul>
        <li>Wipe down appliances daily</li>
        <li>Clean refrigerator coils quarterly</li>
        <li>Deep clean oven monthly</li>
        <li>Sanitize countertops and sinks daily</li>
      </ul>

      <h4>Bathrooms</h4>
      <ul>
        <li>Scrub tubs and showers weekly</li>
        <li>Clean and disinfect toilets 2-3 times per week</li>
        <li>Wash bath mats and shower curtains monthly</li>
        <li>Check for and address any mildew immediately</li>
      </ul>

      <h4>Bedrooms</h4>
      <ul>
        <li>Wash bedding weekly in hot water</li>
        <li>Vacuum under beds monthly</li>
        <li>Rotate and flip mattresses quarterly</li>
        <li>Dust ceiling fans and light fixtures monthly</li>
      </ul>

      <h3>Local Montgomery Cleaning Challenges</h3>
      <p><strong>Pollen Season:</strong> Montgomery's spring pollen season is intense. Change HVAC filters monthly during peak season (March-May), and consider professional duct cleaning annually.</p>
      
      <p><strong>Red Clay Stains:</strong> Alabama's red clay can be tough on floors and carpets. Place mats at all entrances and clean them weekly. For carpets, address clay stains immediately with a mixture of white vinegar and water.</p>

      <p><strong>Pest Prevention:</strong> Regular cleaning is your first defense against Alabama's insects. Keep kitchens clean, seal food properly, and address crumbs and spills immediately.</p>

      <h3>When to Call Professional Cleaners in Montgomery</h3>
      <p>While regular maintenance is essential, professional cleaning services can help with:</p>
      <ul>
        <li>Deep cleaning before or after moves</li>
        <li>Preparing homes for sale or rent</li>
        <li>Spring and fall deep cleaning</li>
        <li>After renovations or construction</li>
        <li>Regular maintenance for busy families</li>
      </ul>

      <h3>Expert Cleaning Products for Alabama's Climate</h3>
      <p>For Montgomery's specific cleaning needs, we recommend:</p>
      <ul>
        <li><strong>Mold and Mildew Removers:</strong> Essential for bathrooms and humid areas</li>
        <li><strong>HEPA Filters:</strong> For vacuums to capture pollen and allergens</li>
        <li><strong>Microfiber Cloths:</strong> More effective than traditional cloths for Alabama dust</li>
        <li><strong>pH-Neutral Cleaners:</strong> Safe for Alabama's hardwood floors</li>
      </ul>

      <p class="mt-6"><strong>Need professional help keeping your Montgomery home spotless? Call Self-Maid Cleaning Solutions at (334) 877-9513 for a free quote!</strong></p>
    `
  },
  'airbnb-cleaning-checklist': {
    title: 'Complete Airbnb Cleaning Checklist for Prattville Hosts',
    date: '2025-01-10',
    readTime: '6 min read',
    category: 'Airbnb Tips',
    metaDescription: 'Essential Airbnb cleaning checklist for Prattville hosts. Learn how to achieve 5-star cleanliness ratings and keep guests coming back.',
    content: `
      <h2>Achieve 5-Star Cleanliness Ratings Every Time</h2>
      <p>As an Airbnb host in Prattville, Alabama, cleanliness is your top priority. Guests consistently rate cleanliness as the most important factor in their stay. This comprehensive checklist ensures your rental is guest-ready every time.</p>

      <h3>Pre-Arrival Deep Clean Checklist</h3>
      
      <h4>Kitchen</h4>
      <ul>
        <li>☐ Wipe down all appliances (refrigerator, oven, microwave, dishwasher)</li>
        <li>☐ Clean inside refrigerator and freezer</li>
        <li>☐ Sanitize all countertops and backsplash</li>
        <li>☐ Clean sink and polish fixtures</li>
        <li>☐ Wash all dishes, glasses, and utensils</li>
        <li>☐ Organize cabinets and drawers</li>
        <li>☐ Take out trash and replace liner</li>
        <li>☐ Sweep and mop floors</li>
        <li>☐ Restock coffee, tea, and basic condiments</li>
      </ul>

      <h4>Bathrooms</h4>
      <ul>
        <li>☐ Scrub toilet bowl, seat, and base</li>
        <li>☐ Clean shower/tub thoroughly</li>
        <li>☐ Wipe down all tiles and grout</li>
        <li>☐ Clean mirrors and polish to streak-free shine</li>
        <li>☐ Sanitize all fixtures and hardware</li>
        <li>☐ Replace toilet paper, tissues, and soap</li>
        <li>☐ Provide fresh towels and washcloths</li>
        <li>☐ Empty trash and replace liner</li>
        <li>☐ Clean floors and baseboards</li>
      </ul>

      <h4>Bedrooms</h4>
      <ul>
        <li>☐ Change all bedding with fresh linens</li>
        <li>☐ Fluff and arrange pillows</li>
        <li>☐ Dust all surfaces including nightstands</li>
        <li>☐ Clean under bed</li>
        <li>☐ Empty and wipe down closets and drawers</li>
        <li>☐ Vacuum carpets or mop floors</li>
        <li>☐ Clean mirrors and windows</li>
        <li>☐ Provide extra blankets and pillows</li>
      </ul>

      <h4>Living Areas</h4>
      <ul>
        <li>☐ Vacuum all carpets and rugs</li>
        <li>☐ Dust all surfaces including electronics</li>
        <li>☐ Clean TV screen and remote controls</li>
        <li>☐ Arrange furniture neatly</li>
        <li>☐ Fluff cushions and fold throws</li>
        <li>☐ Clean windows and windowsills</li>
        <li>☐ Wipe down light switches and door handles</li>
        <li>☐ Check and replace air fresheners</li>
      </ul>

      <h3>Turnaround Cleaning Timeline</h3>
      <p>For same-day turnovers in Prattville, follow this efficient schedule:</p>
      <ul>
        <li><strong>Hour 1:</strong> Strip beds, gather laundry, start first load</li>
        <li><strong>Hour 2:</strong> Clean bathrooms completely</li>
        <li><strong>Hour 3:</strong> Clean kitchen and living areas</li>
        <li><strong>Hour 4:</strong> Remake beds, final touches, and inspection</li>
      </ul>

      <h3>Prattville-Specific Considerations</h3>
      <p><strong>HVAC Filters:</strong> Check monthly, especially during Alabama's pollen season. Guests notice poor air quality.</p>
      
      <p><strong>Outdoor Spaces:</strong> If you offer a patio or yard, keep it clean and free of debris. Sweep regularly and ensure outdoor furniture is clean.</p>

      <p><strong>Pest Control:</strong> Regular cleaning prevents pest issues. Pay special attention to kitchen areas and keep all food sealed.</p>

      <h3>Guest Welcome Touches</h3>
      <p>Go beyond basic cleanliness with these welcoming touches:</p>
      <ul>
        <li>Fresh flowers or plants</li>
        <li>Welcome basket with local Prattville treats</li>
        <li>Guide to Prattville attractions and restaurants</li>
        <li>Spare phone chargers</li>
        <li>Local emergency contacts and WiFi password displayed</li>
      </ul>

      <h3>Common Airbnb Cleaning Mistakes to Avoid</h3>
      <ul>
        <li>Forgetting to check under furniture</li>
        <li>Missing light switches and door handles</li>
        <li>Not replacing hand soap and toilet paper</li>
        <li>Overlooking ceiling fans and light fixtures</li>
        <li>Leaving dust on baseboards</li>
        <li>Not checking for previous guest's items</li>
      </ul>

      <h3>Professional Airbnb Cleaning Services</h3>
      <p>Many successful Prattville hosts use professional cleaning services to maintain consistent 5-star ratings. Benefits include:</p>
      <ul>
        <li>Same-day turnaround capability</li>
        <li>Consistent quality every time</li>
        <li>Professional-grade cleaning products</li>
        <li>Pre-departure inspection reports</li>
        <li>Emergency cleaning availability</li>
      </ul>

      <p class="mt-6"><strong>Self-Maid Cleaning Solutions specializes in Airbnb turnover cleaning in Prattville. Call (334) 877-9513 to discuss your hosting needs!</strong></p>
    `
  }
};

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary">← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Self-Maid Cleaning Blog`}
        description={post.metaDescription}
        keywords={`${post.category}, cleaning tips Montgomery, cleaning tips Prattville, Alabama cleaning guide`}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Article Header */}
        <article className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/blog"
              className="text-primary inline-flex items-center gap-2 mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <div className="text-primary font-semibold mb-3">{post.category}</div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="prose prose-lg max-w-none p-8">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Need Professional Cleaning Services?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let our experienced team in Montgomery and Prattville handle the cleaning for you
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:334-877-9513" 
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call (334) 877-9513
                  </a>
                  <Link 
                    href="/quote" 
                    className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center justify-center"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
