import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import TrustBadges from '@/components/trust-badges';
import { ServicesSection } from '@/components/services-section';
import BeforeAfterGallery from '@/components/before-after-gallery';
import { AboutSection } from '@/components/about-section';
import { GoogleReviews } from '@/components/google-reviews';
import { TestimonialsSection } from '@/components/testimonials-section';
import { RecruitmentSection } from '@/components/recruitment-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { ExitIntentPopup } from '@/components/exit-intent-popup';
import { Phone, MessageCircle } from 'lucide-react';

// Structured data for local business - optimized for SEO, ChatGPT, and Google
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://selfmaidllc.com/#business",
      "name": "Self-Maid Cleaning Solutions",
      "alternateName": "Self-Maid LLC",
      "description": "Professional cleaning services serving Montgomery, Prattville, Selma, Homewood, Clanton, and surrounding Alabama communities. Residential, commercial, Airbnb, move-in/out, and student dorm cleaning with 16 years of experience. Fully insured and bonded.",
      "url": "https://selfmaidllc.com",
      "telephone": "+1-334-877-9513",
      "email": "selfmaidclean@outlook.com",
      "foundingDate": "2009",
      "priceRange": "$65-$400",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Check",
      "openingHours": "Mo-Su 07:00-20:00",
      "image": "https://selfmaidllc.com/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montgomery",
        "addressRegion": "AL",
        "postalCode": "36117",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "32.3792",
        "longitude": "-86.3077"
      },
      "areaServed": [
        { "@type": "City", "name": "Montgomery", "sameAs": "https://en.wikipedia.org/wiki/Montgomery,_Alabama" },
        { "@type": "City", "name": "Prattville", "sameAs": "https://en.wikipedia.org/wiki/Prattville,_Alabama" },
        { "@type": "City", "name": "Selma", "sameAs": "https://en.wikipedia.org/wiki/Selma,_Alabama" },
        { "@type": "City", "name": "Homewood", "sameAs": "https://en.wikipedia.org/wiki/Homewood,_Alabama" },
        { "@type": "City", "name": "Clanton", "sameAs": "https://en.wikipedia.org/wiki/Clanton,_Alabama" },
        { "@type": "City", "name": "Millbrook" },
        { "@type": "City", "name": "Wetumpka" },
        { "@type": "City", "name": "Pike Road" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cleaning Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Cleaning", "description": "Complete home cleaning starting at $80" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Cleaning", "description": "Professional office cleaning starting at $120" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airbnb Cleaning", "description": "Vacation rental turnover starting at $65" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Move In/Out Cleaning", "description": "Deep cleaning for moving day starting at $150" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deep Cleaning", "description": "Intensive cleaning starting at $250" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Apartment Turnover", "description": "Property manager cleaning starting at $108" }}
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sarah M." },
          "datePublished": "2025-10-15",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Self-Maid transformed our home! The team was professional, thorough, and left everything sparkling clean."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Michael R." },
          "datePublished": "2025-09-20",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Best cleaning service in Montgomery. They've been cleaning our office for 2 years now. Highly recommend!"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/selfmaidcleaning",
        "https://www.instagram.com/selfmaidcleaning",
        "https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL",
        "https://www.yelp.com/search?find_desc=Self-Maid+Cleaning&find_loc=Montgomery%2C+AL"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://selfmaidllc.com/#website",
      "url": "https://selfmaidllc.com",
      "name": "Self-Maid Cleaning Solutions",
      "publisher": { "@id": "https://selfmaidllc.com/#business" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What areas do you serve in Alabama?", "acceptedAnswer": { "@type": "Answer", "text": "We serve Montgomery, Prattville, Selma, Homewood, Clanton, Millbrook, Wetumpka, Pike Road, and surrounding communities in central Alabama." }},
        { "@type": "Question", "name": "Are you insured and bonded?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Self-Maid Cleaning Solutions is fully insured and bonded. All team members undergo comprehensive background checks." }},
        { "@type": "Question", "name": "How much do your cleaning services cost?", "acceptedAnswer": { "@type": "Answer", "text": "Prices start at $65 for Airbnb cleaning, $80 for residential, $108 for apartment turnover, $120 for commercial, $150 for move-in/out, and $250 for deep cleaning." }},
        { "@type": "Question", "name": "Do you use eco-friendly products?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we use safe, non-toxic, eco-friendly cleaning products that are safe for your family and pets." }}
      ]
    }
  ]
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="Professional Cleaning Services Montgomery, Prattville, Selma & Central Alabama | Self-Maid"
        description="Top-rated cleaning services in Montgomery, Prattville, Selma, Homewood, and Clanton, Alabama. Residential, commercial, Airbnb, move-in/out cleaning. 16 years experience. Call (334) 877-9513 for a free quote!"
        keywords="cleaning services Montgomery AL, cleaning services Prattville AL, cleaning services Selma Alabama, house cleaning Montgomery, maid service Prattville, professional cleaners Montgomery Alabama, residential cleaning Montgomery, commercial cleaning Prattville, Airbnb cleaning Alabama, move out cleaning Montgomery, move in cleaning Prattville, deep cleaning services Montgomery, apartment cleaning Prattville, office cleaning Montgomery AL, cleaning company near me Montgomery, best cleaning service Prattville, affordable house cleaning Montgomery, same day cleaning service Alabama, eco friendly cleaning Montgomery, recurring cleaning service Prattville, one time deep clean Montgomery, spring cleaning Prattville AL, cleaning lady Montgomery, housekeeping services Prattville, Montgomery cleaning company, Prattville maid service, Selma cleaning services, Homewood cleaning Alabama, Clanton cleaning service, Millbrook house cleaning, Wetumpka cleaning service"
        ogTitle="Self-Maid Cleaning Solutions - Central Alabama's Trusted Cleaning Service"
        ogDescription="Professional cleaning services serving Montgomery, Prattville, Selma, Homewood, and Clanton, AL. From homes to offices, we make everything spotless with 16 years of experience."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <TrustBadges />
        <ServicesSection />
        <BeforeAfterGallery />
        <AboutSection />
        <GoogleReviews />
        <TestimonialsSection />
        <RecruitmentSection />
        <ContactSection />
        <Footer />
        
        {/* Exit Intent Popup */}
        <ExitIntentPopup />
        
        {/* Sticky Mobile CTA Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t shadow-lg px-4 py-3 safe-area-pb">
          <div className="flex gap-3 justify-center max-w-lg mx-auto">
            <a 
              href="tel:334-877-9513" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl shadow-lg inline-flex items-center justify-center font-bold text-base hover:shadow-xl transition-all"
              data-testid="sticky-call-cta"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a 
              href="sms:3348779513?body=Hi!%20I'm%20interested%20in%20a%20cleaning%20quote."
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl shadow-lg inline-flex items-center justify-center font-bold text-base hover:shadow-xl transition-all"
              data-testid="sticky-text-cta"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Text Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
