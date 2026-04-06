import { useParams, Link } from 'wouter';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SocialProofBar } from '@/components/social-proof-bar';
import { MapPin, Phone, Star, Check, ArrowRight, Shield, Clock, Sparkles } from 'lucide-react';

interface CityData {
  name: string;
  slug: string;
  county: string;
  description: string;
  neighborhoods: string[];
  zipCodes: string[];
  nearbyAreas: string[];
  localDetails: string;
}

const cityData: Record<string, CityData> = {
  "montgomery-al": {
    name: "Montgomery",
    slug: "montgomery-al",
    county: "Montgomery County",
    description: "As Alabama's capital city, Montgomery deserves cleaning services that match its rich history and vibrant community. Self-Maid Cleaning Solutions has been proudly serving Montgomery homes and businesses since 2009.",
    neighborhoods: ["Eastchase", "Dalraida", "Cloverdale", "Old Cloverdale", "Pike Road", "Vaughn Park", "Halcyon", "The Hamptons", "Wynlakes", "Bell Road", "Taylor Road", "Atlanta Highway"],
    zipCodes: ["36101", "36104", "36106", "36107", "36108", "36109", "36110", "36111", "36112", "36116", "36117"],
    nearbyAreas: ["Prattville", "Millbrook", "Wetumpka", "Pike Road"],
    localDetails: "From the historic Cloverdale neighborhood to the growing Eastchase area, we know Montgomery inside and out. Whether you need regular house cleaning near the Riverfront or a deep clean in the Dalraida area, our experienced team delivers consistent, reliable results."
  },
  "prattville-al": {
    name: "Prattville",
    slug: "prattville-al",
    county: "Autauga County",
    description: "Known as the 'Fountain City,' Prattville's beautiful homes and growing business community deserve top-quality cleaning services. Self-Maid serves all of Prattville and surrounding Autauga County.",
    neighborhoods: ["Downtown Prattville", "Legends", "Bridle Creek", "Autumn Ridge", "Glennbrooke", "Silver Hills", "Highland Ridge", "Hunting Ridge", "Riverchase", "Pine Level", "Kingston", "Cobblestone"],
    zipCodes: ["36066", "36067", "36068"],
    nearbyAreas: ["Montgomery", "Millbrook", "Wetumpka"],
    localDetails: "From the charming downtown district along Daniel Pratt Drive to the newer developments in the Legends area, we provide professional cleaning throughout all of Prattville. Our team is familiar with every neighborhood and delivers the same high-quality service to every home."
  },
  "millbrook-al": {
    name: "Millbrook",
    slug: "millbrook-al",
    county: "Elmore County",
    description: "Millbrook's family-friendly neighborhoods and growing community make it one of our favorite areas to serve. Self-Maid Cleaning Solutions provides reliable, professional cleaning throughout Millbrook.",
    neighborhoods: ["Coosada", "Village Green", "Grandview", "Edgewood"],
    zipCodes: ["36054"],
    nearbyAreas: ["Prattville", "Montgomery", "Wetumpka"],
    localDetails: "Conveniently located between Montgomery and Prattville, Millbrook residents enjoy quick scheduling and reliable service from our team. We serve all neighborhoods and subdivisions throughout the city."
  },
  "wetumpka-al": {
    name: "Wetumpka",
    slug: "wetumpka-al",
    county: "Elmore County",
    description: "Wetumpka, the 'City of Natural Beauty,' deserves cleaning services that match its stunning surroundings. Self-Maid brings professional-grade cleaning to all of Wetumpka and Elmore County.",
    neighborhoods: ["Downtown Wetumpka", "River Oaks", "Emerald Mountain", "Redland"],
    zipCodes: ["36092", "36093"],
    nearbyAreas: ["Montgomery", "Millbrook", "Prattville"],
    localDetails: "From beautiful homes along the Coosa River to the charming downtown area, we provide thorough, reliable cleaning services throughout Wetumpka. Our team takes pride in helping families enjoy this naturally beautiful area with a spotless home."
  },
  "selma-al": {
    name: "Selma",
    slug: "selma-al",
    county: "Dallas County",
    description: "Selma's historic homes and proud community deserve exceptional care. Self-Maid Cleaning Solutions brings our trusted, professional service to all of Selma and Dallas County.",
    neighborhoods: ["Historic District", "Downtown Selma", "Valley Grande", "Orrville"],
    zipCodes: ["36701", "36702", "36703"],
    nearbyAreas: ["Montgomery", "Prattville", "Clanton"],
    localDetails: "From the beautiful historic homes near the Edmund Pettus Bridge to neighborhoods throughout Dallas County, Self-Maid delivers the same quality cleaning that has earned us 500+ satisfied customers across Central Alabama."
  },
  "homewood-al": {
    name: "Homewood",
    slug: "homewood-al",
    county: "Jefferson County",
    description: "Homewood's walkable neighborhoods and beautiful homes are a perfect fit for Self-Maid's detail-oriented cleaning services. We serve all of Homewood and surrounding Birmingham communities.",
    neighborhoods: ["Edgewood", "Hollywood", "Rosedale", "West Homewood", "Oxmoor"],
    zipCodes: ["35209", "35226"],
    nearbyAreas: ["Alabaster", "Birmingham", "Vestavia Hills"],
    localDetails: "Homewood's charming neighborhoods, from the shops along 18th Street to the tree-lined residential streets, deserve a cleaning service that pays attention to every detail. Our team provides thorough, reliable cleaning for Homewood families."
  },
  "clanton-al": {
    name: "Clanton",
    slug: "clanton-al",
    county: "Chilton County",
    description: "Clanton, the 'Peach Capital of Alabama,' is home to hardworking families who deserve a clean, comfortable home. Self-Maid Cleaning Solutions proudly serves all of Clanton and Chilton County.",
    neighborhoods: ["Downtown Clanton", "Thorsby", "Jemison", "Verbena"],
    zipCodes: ["35045", "35046"],
    nearbyAreas: ["Montgomery", "Alabaster", "Prattville"],
    localDetails: "From residential homes to commercial properties throughout Chilton County, our team provides professional cleaning services that fit your schedule and budget. We serve Clanton, Thorsby, Jemison, and surrounding communities."
  },
  "pike-road-al": {
    name: "Pike Road",
    slug: "pike-road-al",
    county: "Montgomery County",
    description: "Pike Road's beautiful homes and family-oriented community make it one of the most sought-after areas in Central Alabama. Self-Maid Cleaning Solutions is proud to serve Pike Road families.",
    neighborhoods: ["The Waters", "Pike Road Town Center", "Marston", "Deer Creek"],
    zipCodes: ["36064"],
    nearbyAreas: ["Montgomery", "Prattville", "Millbrook"],
    localDetails: "Pike Road's growing community of beautiful homes deserves cleaning services that match their quality. From The Waters to neighborhoods throughout the town, we deliver consistent, thorough cleaning that busy Pike Road families can count on."
  },
  "alabaster-al": {
    name: "Alabaster",
    slug: "alabaster-al",
    county: "Shelby County",
    description: "Alabaster's thriving community and family-friendly neighborhoods are a natural fit for Self-Maid's professional cleaning services. We serve all of Alabaster and surrounding Shelby County areas.",
    neighborhoods: ["Colonial Promenade", "Thompson", "Simmsville", "Weatherly"],
    zipCodes: ["35007", "35114"],
    nearbyAreas: ["Homewood", "Clanton", "Birmingham"],
    localDetails: "From the neighborhoods around Colonial Promenade to residential areas throughout the city, our cleaning team provides reliable, professional service that Alabaster families trust. We handle everything from weekly cleanings to deep cleans and move-in/move-out services."
  },
  "deatsville-al": {
    name: "Deatsville",
    slug: "deatsville-al",
    county: "Elmore County",
    description: "Deatsville's growing community between Prattville and Wetumpka makes it one of Elmore County's most desirable areas. Self-Maid Cleaning Solutions is proud to serve Deatsville families with professional cleaning.",
    neighborhoods: ["Downtown Deatsville", "Marler", "Central", "Rifle Range Road"],
    zipCodes: ["36022"],
    nearbyAreas: ["Prattville", "Millbrook", "Wetumpka", "Montgomery"],
    localDetails: "Nestled between Prattville and Wetumpka along Highway 143, Deatsville's mix of established homes and newer construction deserves dependable, professional cleaning. Our team serves every corner of the Deatsville community with the same care and attention to detail."
  }
};

const services = [
  { name: "Residential Cleaning", price: "$80", icon: "🏠" },
  { name: "Deep Cleaning", price: "$250", icon: "✨" },
  { name: "Commercial Cleaning", price: "$120", icon: "🏢" },
  { name: "Airbnb Cleaning", price: "$65", icon: "🔑" },
  { name: "Move-In/Move-Out", price: "$150", icon: "📦" },
  { name: "Apartment Turnover", price: "$108", icon: "🏘️" },
];

export default function ServiceArea() {
  const params = useParams<{ city: string }>();
  const city = cityData[params.city || ""];

  if (!city) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Area Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">We couldn't find that service area. Check out our available locations below.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {Object.values(cityData).map(c => (
              <Link key={c.slug} href={`/services/${c.slug}`}>
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {c.name}, AL
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Self-Maid Cleaning Solutions",
    "description": `Professional cleaning services in ${city.name}, Alabama. Residential, commercial, Airbnb, and move-in/out cleaning.`,
    "telephone": "+1-334-877-9513",
    "email": "selfmaidclean@outlook.com",
    "url": `https://selfmaidllc.com/services/${city.slug}`,
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "containedInPlace": {
        "@type": "State",
        "name": "Alabama"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "AL",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "500"
    },
    "priceRange": "$65-$400"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title={`Cleaning Services ${city.name} AL | House Cleaning & Maid Service | Self-Maid`}
        description={`Top-rated cleaning services in ${city.name}, Alabama. Residential, commercial, Airbnb, move-in/out cleaning. Serving ${city.county} since 2009. Insured & bonded. Call (334) 877-9513.`}
        keywords={`cleaning services ${city.name} AL, house cleaning ${city.name}, maid service ${city.name} Alabama, residential cleaning ${city.name}, commercial cleaning ${city.name}, Airbnb cleaning ${city.name}, move out cleaning ${city.name}, deep cleaning ${city.name} AL, cleaning company ${city.name}, ${city.neighborhoods.join(", ")}`}
        canonical={`https://selfmaidllc.com/services/${city.slug}`}
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1525] via-[#1F2A37] to-[#0a1525] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-[#C6A969]" />
            <span className="text-sm font-medium">Serving {city.name} & {city.county}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Professional Cleaning Services<br />in {city.name}, Alabama
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            {city.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="gold-bg text-[#1F2A37] hover:opacity-90 text-lg px-8 py-6">
                Get Instant Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:3348779513">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" /> (334) 877-9513
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SocialProofBar />

      {/* Services Available */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Cleaning Services Available in {city.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From regular house cleaning to deep cleans and commercial services, we have {city.name} covered.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map(service => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-[#C6A969] font-semibold text-lg mb-3">Starting at {service.price}</p>
                  <Link href="/quote">
                    <Button variant="outline" className="w-full">Get Quote</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why {city.name} Residents Choose Self-Maid</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">{city.localDetails}</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C6A969]" />
                  {city.name} Neighborhoods We Serve
                </h3>
                <ul className="space-y-2">
                  {city.neighborhoods.map(n => (
                    <li key={n} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-[#C6A969] flex-shrink-0" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C6A969]" />
                  ZIP Codes Served
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {city.zipCodes.map(z => (
                    <span key={z} className="bg-[#1F2A37]/10 dark:bg-[#1F2A37] text-[#1F2A37] dark:text-[#C6A969] px-3 py-1 rounded-full text-sm font-medium">{z}</span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C6A969]" />
                  Nearby Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.nearbyAreas.map(a => {
                    const areaSlug = Object.values(cityData).find(c => c.name === a)?.slug;
                    return areaSlug ? (
                      <Link key={a} href={`/services/${areaSlug}`}>
                        <span className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors">
                          {a}, AL
                        </span>
                      </Link>
                    ) : (
                      <span key={a} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">{a}, AL</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 deep-teal-bg text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by 500+ Alabama Families</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <Shield className="w-10 h-10 mx-auto mb-3 text-[#C6A969]" />
              <h3 className="font-bold text-lg mb-1">Fully Insured</h3>
              <p className="text-sm text-gray-300">Licensed, bonded & background-checked</p>
            </div>
            <div>
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <h3 className="font-bold text-lg mb-1">5-Star Rated</h3>
              <p className="text-sm text-gray-300">Consistently 5 stars on Google</p>
            </div>
            <div>
              <Clock className="w-10 h-10 mx-auto mb-3 text-[#C6A969]" />
              <h3 className="font-bold text-lg mb-1">Since 2009</h3>
              <p className="text-sm text-gray-300">16+ years serving Alabama</p>
            </div>
            <div>
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-[#C6A969]" />
              <h3 className="font-bold text-lg mb-1">100% Guarantee</h3>
              <p className="text-sm text-gray-300">Not happy? We come back free</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Cleaner Home in {city.name}?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get an instant quote in under 60 seconds, or call us directly. No obligations, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="gold-bg text-[#1F2A37] hover:opacity-90 text-lg px-8 py-6">
                Get Your Free Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Book Online Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Other Service Areas */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">All Service Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(cityData).map(c => (
              <Link key={c.slug} href={`/services/${c.slug}`}>
                <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  c.slug === city.slug 
                    ? 'bg-[#1F2A37] text-white' 
                    : 'bg-white dark:bg-gray-700 hover:bg-[#1F2A37]/5 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border'
                }`}>
                  <MapPin className="w-3 h-3" />
                  {c.name}, AL
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
