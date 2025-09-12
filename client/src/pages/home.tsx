import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
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
  "description": "Professional cleaning services in Alabama. Residential, commercial, Airbnb, move-in/out, and student dorm cleaning.",
  "url": "https://self-maid-cleaning.com",
  "telephone": "+1-334-413-9029",
  "email": "selfmaidclean@outlook.com",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "AL",
    "addressCountry": "US"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Alabama"
    }
  ],
  "serviceType": [
    "Residential Cleaning",
    "Commercial Cleaning", 
    "Airbnb Cleaning",
    "Move In/Out Cleaning",
    "Student Dorm Cleaning"
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
    "reviewCount": "500"
  },
  "priceRange": "$45-$150"
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="Self-Maid Cleaning Solutions | Professional Cleaning Services in Alabama"
        description="Professional cleaning services in Alabama. Residential, commercial, Airbnb, move-in/out, and student dorm cleaning. Book online or call (334) 413-9029."
        keywords="cleaning services Alabama, residential cleaning, commercial cleaning, Airbnb cleaning, move out cleaning, Birmingham cleaning, Montgomery cleaning, Huntsville cleaning"
        ogTitle="Self-Maid Cleaning Solutions - Alabama's Trusted Cleaning Service"
        ogDescription="Reliable, thorough, and affordable cleaning services across Alabama. From homes to offices, we make everything spotless."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <RecruitmentSection />
        <ContactSection />
        <Footer />
        
        {/* Floating CTA for mobile */}
        <div className="floating-cta lg:hidden fixed bottom-4 right-4 z-50 animate-pulse">
          <a 
            href="tel:334-413-9029" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg inline-flex items-center font-semibold"
            data-testid="floating-cta"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </a>
        </div>
      </div>
    </>
  );
}
