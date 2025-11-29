import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import TrustBadges from '@/components/trust-badges';
import { ServicesSection } from '@/components/services-section';
import BeforeAfterGallery from '@/components/before-after-gallery';
import { AboutSection } from '@/components/about-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { RecruitmentSection } from '@/components/recruitment-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Phone } from 'lucide-react';

// Structured data for local business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Self-Maid Cleaning Solutions",
  "description": "Professional cleaning services serving Montgomery and Prattville, Alabama. Residential, commercial, Airbnb, move-in/out, and student dorm cleaning with 16 years of experience.",
  "url": "https://self-maid-cleaning.com",
  "telephone": "+1-334-877-9513",
  "email": "selfmaidclean@outlook.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Montgomery",
    "addressRegion": "AL",
    "addressCountry": "US"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Montgomery",
      "sameAs": "https://en.wikipedia.org/wiki/Montgomery,_Alabama"
    },
    {
      "@type": "City",
      "name": "Prattville",
      "sameAs": "https://en.wikipedia.org/wiki/Prattville,_Alabama"
    },
    {
      "@type": "State",
      "name": "Alabama"
    }
  ],
  "serviceType": [
    "Residential Cleaning",
    "Commercial Cleaning", 
    "Airbnb Cleaning",
    "Short Term Rental Cleaning",
    "Move In/Out Cleaning",
    "Student Dorm Cleaning",
    "Deep Cleaning",
    "Construction Cleanup"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Insurance",
      "description": "Fully Insured and Bonded"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "priceRange": "$45-$400",
  "openingHours": "Mo-Su 00:00-23:59",
  "paymentAccepted": "Cash, Credit Card, Debit Card"
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
        <TestimonialsSection />
        <RecruitmentSection />
        <ContactSection />
        <Footer />
        
        {/* Floating CTA for mobile */}
        <div className="floating-cta lg:hidden fixed bottom-4 right-4 z-50">
          <a 
            href="tel:334-877-9513" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full shadow-2xl inline-flex items-center font-bold text-lg hover:shadow-xl transition-all hover:scale-105 animate-bounce"
            data-testid="floating-cta"
          >
            <Phone className="w-5 h-5 mr-2" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-normal">Call Now</span>
              <span>(334) 877-9513</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
