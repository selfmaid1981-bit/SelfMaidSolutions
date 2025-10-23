import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 'montgomery-cleaning-guide',
    title: 'Ultimate Guide to Home Cleaning in Montgomery, AL',
    excerpt: 'Discover the best practices for keeping your Montgomery home spotless year-round. From dealing with Alabama humidity to seasonal cleaning tips.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Home Cleaning',
    slug: 'montgomery-cleaning-guide'
  },
  {
    id: 'airbnb-cleaning-checklist',
    title: 'Complete Airbnb Cleaning Checklist for Prattville Hosts',
    excerpt: 'Maximize your rental ratings with our comprehensive cleaning checklist. Learn what guests expect and how to deliver 5-star cleanliness.',
    date: '2025-01-10',
    readTime: '6 min read',
    category: 'Airbnb Tips',
    slug: 'airbnb-cleaning-checklist'
  },
  {
    id: 'move-out-cleaning-alabama',
    title: 'Move-Out Cleaning: Getting Your Deposit Back in Alabama',
    excerpt: 'Essential move-out cleaning tips for Alabama renters. What landlords look for and how to ensure you get your full security deposit returned.',
    date: '2025-01-05',
    readTime: '7 min read',
    category: 'Moving Tips',
    slug: 'move-out-cleaning-alabama'
  },
  {
    id: 'spring-cleaning-montgomery',
    title: 'Spring Cleaning Tips for Montgomery Homes',
    excerpt: 'Beat the Alabama heat with our spring cleaning guide. Prepare your home for summer with these essential cleaning tasks.',
    date: '2024-12-28',
    readTime: '5 min read',
    category: 'Seasonal Cleaning',
    slug: 'spring-cleaning-montgomery'
  },
  {
    id: 'commercial-cleaning-benefits',
    title: 'Benefits of Professional Commercial Cleaning for Prattville Businesses',
    excerpt: 'How professional cleaning services can improve employee productivity, reduce sick days, and create a positive impression for clients.',
    date: '2024-12-20',
    readTime: '6 min read',
    category: 'Business Tips',
    slug: 'commercial-cleaning-benefits'
  },
  {
    id: 'eco-friendly-cleaning',
    title: 'Eco-Friendly Cleaning Solutions for Alabama Families',
    excerpt: 'Safe, effective, and environmentally friendly cleaning products and methods that protect your family and the Alabama environment.',
    date: '2024-12-15',
    readTime: '5 min read',
    category: 'Green Cleaning',
    slug: 'eco-friendly-cleaning'
  }
];

export default function Blog() {
  return (
    <>
      <SEOHead
        title="Cleaning Tips & Resources | Self-Maid Cleaning Blog Montgomery AL"
        description="Expert cleaning tips, guides, and resources for Montgomery and Prattville, AL residents. Learn from 16 years of professional cleaning experience."
        keywords="cleaning tips Montgomery AL, cleaning guides Prattville, Alabama cleaning advice, home cleaning tips, commercial cleaning best practices"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Cleaning Tips & Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert advice from 16 years of professional cleaning experience in Montgomery and Prattville, Alabama
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-sm text-primary font-semibold mb-2">
                      {post.category}
                    </div>
                    <CardTitle className="text-xl mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Need Professional Cleaning Services?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let our experienced team handle the cleaning while you focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:334-877-9513" 
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Call (334) 877-9513
              </a>
              <Link 
                href="/quote" 
                className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
