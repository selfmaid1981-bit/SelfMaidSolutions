import { useLocation, Link } from 'wouter';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SocialProofBar } from '@/components/social-proof-bar';
import { MapPin, Phone, Star, Check, ArrowRight, Shield, Clock, Sparkles, Home, Building2, Key, Truck, Brush } from 'lucide-react';

interface CityInfo {
  name: string;
  slug: string;
  county: string;
  neighborhoods: string[];
  zipCodes: string[];
  localFlavor: string;
}

interface ServiceInfo {
  name: string;
  slug: string;
  shortName: string;
  startingPrice: string;
  description: string;
  benefits: string[];
  includes: string[];
  icon: typeof Home;
}

const cities: Record<string, CityInfo> = {
  "montgomery": {
    name: "Montgomery",
    slug: "montgomery",
    county: "Montgomery County",
    neighborhoods: ["Eastchase", "Dalraida", "Cloverdale", "Old Cloverdale", "Pike Road", "Vaughn Park", "Halcyon", "The Hamptons", "Wynlakes", "Bell Road", "Taylor Road"],
    zipCodes: ["36101", "36104", "36106", "36107", "36108", "36109", "36110", "36111", "36112", "36116", "36117"],
    localFlavor: "As Alabama's capital city, Montgomery homes deserve the highest standard of care. From the historic Cloverdale district to the modern developments in Eastchase, Self-Maid has been the trusted choice for Montgomery families since 2009."
  },
  "prattville": {
    name: "Prattville",
    slug: "prattville",
    county: "Autauga County",
    neighborhoods: ["Downtown Prattville", "Legends", "Bridle Creek", "Autumn Ridge", "Glennbrooke", "Silver Hills", "Highland Ridge", "Hunting Ridge", "Riverchase", "Pine Level", "Kingston", "Cobblestone"],
    zipCodes: ["36066", "36067", "36068"],
    localFlavor: "Known as the 'Fountain City,' Prattville's beautiful homes and growing neighborhoods deserve professional care. From the charming downtown along Daniel Pratt Drive to the newer Legends community, we keep Prattville homes spotless."
  },
  "millbrook": {
    name: "Millbrook",
    slug: "millbrook",
    county: "Elmore County",
    neighborhoods: ["Coosada", "Village Green", "Grandview", "Edgewood"],
    zipCodes: ["36054"],
    localFlavor: "Millbrook's family-friendly neighborhoods between Montgomery and Prattville make it a community we love to serve. Quick scheduling and reliable service for every Millbrook home."
  },
  "wetumpka": {
    name: "Wetumpka",
    slug: "wetumpka",
    county: "Elmore County",
    neighborhoods: ["Downtown Wetumpka", "River Oaks", "Emerald Mountain", "Redland"],
    zipCodes: ["36092", "36093"],
    localFlavor: "Wetumpka, the 'City of Natural Beauty,' deserves a cleaning service that matches its stunning surroundings. From homes along the Coosa River to the charming downtown, we deliver thorough, reliable results."
  },
  "selma": {
    name: "Selma",
    slug: "selma",
    county: "Dallas County",
    neighborhoods: ["Historic District", "Downtown Selma", "Valley Grande", "Orrville"],
    zipCodes: ["36701", "36702", "36703"],
    localFlavor: "Selma's historic homes and proud community deserve exceptional care. From the beautiful historic district to neighborhoods throughout Dallas County, Self-Maid delivers quality cleaning you can count on."
  },
  "deatsville": {
    name: "Deatsville",
    slug: "deatsville",
    county: "Elmore County",
    neighborhoods: ["Downtown Deatsville", "Marler", "Central", "Rifle Range Road"],
    zipCodes: ["36022"],
    localFlavor: "Deatsville's growing community between Prattville and Wetumpka deserves dependable, professional cleaning. From established homes to new-construction neighborhoods, Self-Maid keeps Deatsville residences looking their best."
  }
};

const services: Record<string, ServiceInfo> = {
  "house-cleaning": {
    name: "House Cleaning",
    slug: "house-cleaning",
    shortName: "House Cleaning",
    startingPrice: "$80",
    description: "Professional residential house cleaning that leaves every room sparkling. Our trained team handles dusting, vacuuming, mopping, kitchen and bathroom sanitizing, and more.",
    benefits: [
      "Consistent, reliable weekly or biweekly service",
      "Fully insured & background-checked cleaners",
      "Eco-friendly cleaning products available",
      "Customizable cleaning checklists",
      "100% satisfaction guarantee"
    ],
    includes: [
      "Dusting all surfaces & ceiling fans",
      "Vacuuming carpets & rugs",
      "Mopping hard floors",
      "Kitchen counters, sink & appliance exteriors",
      "Bathroom sanitizing & mirror cleaning",
      "Trash removal & bed making"
    ],
    icon: Home
  },
  "deep-cleaning": {
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    shortName: "Deep Cleaning",
    startingPrice: "$250",
    description: "Intensive top-to-bottom deep cleaning that reaches every corner. Perfect for seasonal refreshes, pre-event preparation, or getting your home back to a like-new condition.",
    benefits: [
      "Every surface scrubbed and sanitized",
      "Inside cabinets, appliances & closets",
      "Baseboards, light fixtures & vents cleaned",
      "Removes built-up grime & allergens",
      "Ideal first-time or seasonal service"
    ],
    includes: [
      "Everything in standard cleaning PLUS",
      "Inside oven & refrigerator cleaning",
      "Baseboard & door frame scrubbing",
      "Light fixture & vent dusting",
      "Inside cabinet & drawer wipe-down",
      "Window sill & track cleaning",
      "Wall spot cleaning & switch plate sanitizing"
    ],
    icon: Brush
  },
  "airbnb-cleaning": {
    name: "Airbnb & Vacation Rental Cleaning",
    slug: "airbnb-cleaning",
    shortName: "Airbnb Cleaning",
    startingPrice: "$65",
    description: "Fast-turnaround cleaning designed for short-term rental hosts. We ensure your property is guest-ready with hotel-quality standards every single time.",
    benefits: [
      "Same-day turnaround available",
      "Consistent quality for 5-star reviews",
      "Linen & laundry service included",
      "Restocking of guest amenities",
      "Photo-ready staging every visit"
    ],
    includes: [
      "Full property cleaning & sanitizing",
      "Fresh linen & towel setup",
      "Kitchen deep clean between guests",
      "Bathroom hotel-style presentation",
      "Trash removal & dishwasher run",
      "Welcome amenity restocking",
      "Damage & maintenance reporting"
    ],
    icon: Key
  },
  "move-in-move-out-cleaning": {
    name: "Move-In/Move-Out Cleaning",
    slug: "move-in-move-out-cleaning",
    shortName: "Move-In/Out Cleaning",
    startingPrice: "$150",
    description: "Comprehensive cleaning for when you're moving in or out. Get your full security deposit back or start fresh in your new home with a spotless clean.",
    benefits: [
      "Helps secure full deposit refunds",
      "Empty-home deep clean for best results",
      "Inside all appliances & cabinets",
      "Flexible scheduling around your move date",
      "Before & after photo documentation"
    ],
    includes: [
      "Inside all appliances (oven, fridge, dishwasher)",
      "Inside all cabinets & closets",
      "Baseboard & trim scrubbing",
      "Light fixture cleaning",
      "Full bathroom deep clean & sanitize",
      "Window sill & track cleaning",
      "Garage sweep (if applicable)"
    ],
    icon: Truck
  },
  "commercial-cleaning": {
    name: "Commercial & Office Cleaning",
    slug: "commercial-cleaning",
    shortName: "Commercial Cleaning",
    startingPrice: "$120",
    description: "Professional cleaning for offices, retail spaces, and commercial properties. Keep your business looking its best for employees and clients alike.",
    benefits: [
      "After-hours cleaning available",
      "OSHA-compliant sanitizing protocols",
      "Customizable service agreements",
      "Reliable daily, weekly, or monthly schedules",
      "Fully insured for commercial properties"
    ],
    includes: [
      "Office & desk area cleaning",
      "Restroom deep cleaning & restocking",
      "Break room & kitchen sanitizing",
      "Floor vacuuming & mopping",
      "Trash removal & liner replacement",
      "Glass & window cleaning",
      "Reception & common area detailing"
    ],
    icon: Building2
  }
};

function generateCityServiceContent(city: CityInfo, service: ServiceInfo) {
  const contentVariants: Record<string, Record<string, string>> = {
    "house-cleaning": {
      "montgomery": `Montgomery homeowners know that keeping a clean house in Alabama's capital isn't just about appearances — it's about creating a healthy, comfortable home for your family. With hot, humid summers bringing extra dust and allergens, regular professional house cleaning is essential. Self-Maid has been helping Montgomery families maintain spotless homes since 2009, from the elegant residences of Cloverdale to busy family homes in Eastchase.`,
      "prattville": `Prattville families juggling work, school, and activities in this fast-growing Fountain City deserve to come home to a clean house without the stress. Self-Maid's professional house cleaning lets you enjoy your beautiful Prattville home — whether it's in the Legends, Bridle Creek, or downtown — without sacrificing your weekends.`,
      "millbrook": `Millbrook's convenient location between Montgomery and Prattville means busy families need reliable home cleaning they can count on. Self-Maid provides consistent, thorough house cleaning throughout Millbrook's growing neighborhoods, so you can focus on what matters most.`,
      "wetumpka": `Wetumpka's naturally beautiful setting along the Coosa River deserves a home interior that's just as pristine. Self-Maid brings professional house cleaning to every Wetumpka neighborhood, from River Oaks to Emerald Mountain, ensuring your home reflects the beauty outside your windows.`,
      "selma": `Selma's historic homes require special attention and care. Self-Maid understands the unique needs of Selma residences, providing gentle yet thorough house cleaning that preserves your home's character while keeping every surface spotless and sanitized.`
    },
    "deep-cleaning": {
      "montgomery": `Montgomery's humid climate means homes can accumulate hidden grime faster than you'd think. A professional deep cleaning from Self-Maid goes beyond the surface, targeting built-up dust in vents, grease behind appliances, and allergens in every corner of your Montgomery home. Perfect before or after Alabama's hot summers.`,
      "prattville": `Prattville homes, especially newer constructions in growing neighborhoods like Autumn Ridge and Glennbrooke, benefit enormously from periodic deep cleaning. Self-Maid's intensive service reaches every corner, baseboard, and appliance interior — leaving your Prattville home refreshed from top to bottom.`,
      "millbrook": `Millbrook families looking for a fresh start or seasonal refresh choose Self-Maid's deep cleaning service. We go beyond regular cleaning to scrub, sanitize, and detail every surface in your Millbrook home, from inside appliances to behind furniture.`,
      "wetumpka": `The natural beauty surrounding Wetumpka means pollen, dust, and outdoor allergens can build up inside your home. A Self-Maid deep cleaning eliminates these hidden irritants, giving your Wetumpka home a thorough, health-focused refresh that regular cleaning can't match.`,
      "selma": `Selma's older, character-rich homes benefit tremendously from periodic deep cleaning. Self-Maid's detailed deep cleaning service addresses every surface — inside cabinets, behind appliances, baseboards, and more — helping preserve your Selma home while creating a healthier living environment.`
    },
    "airbnb-cleaning": {
      "montgomery": `Montgomery's growing tourism industry — from civil rights history tours to Alabama State University events — makes it a prime market for Airbnb hosts. Self-Maid provides fast-turnaround, hotel-quality cleaning that helps Montgomery hosts earn consistent 5-star cleanliness reviews and more bookings.`,
      "prattville": `Prattville vacation rentals near Robert Trent Jones Golf Trail and the growing downtown attract visitors year-round. Self-Maid's Airbnb cleaning service ensures your Prattville rental property is guest-ready with fresh linens, restocked amenities, and spotless presentation every single turnover.`,
      "millbrook": `Millbrook's central location makes it an increasingly popular spot for short-term rentals. Self-Maid delivers reliable, same-day turnaround cleaning for Millbrook Airbnb properties, ensuring every guest walks into a spotless, welcoming space.`,
      "wetumpka": `Wetumpka's stunning natural scenery and charming downtown draw visitors from across the Southeast. Self-Maid helps Wetumpka Airbnb hosts maintain 5-star standards with professional turnover cleaning, linen service, and guest-ready staging after every checkout.`,
      "selma": `Selma's rich history and cultural significance draw visitors from around the world. Self-Maid's Airbnb cleaning service helps Selma hosts provide a welcoming, spotless experience that earns 5-star reviews and keeps guests coming back to this historic city.`
    },
    "move-in-move-out-cleaning": {
      "montgomery": `Whether you're moving into a new home in Eastchase or moving out of an apartment near downtown Montgomery, Self-Maid's move-in/move-out cleaning ensures every surface is spotless. Our thorough service helps renters get their full deposit back and gives new homeowners a fresh, clean start.`,
      "prattville": `Prattville's growing real estate market means plenty of families moving in and out. Self-Maid's move-in/move-out cleaning service covers every detail — inside appliances, cabinets, closets, and more — so your Prattville property is pristine for the next chapter.`,
      "millbrook": `Moving in or out in Millbrook? Self-Maid's comprehensive cleaning service handles every detail that landlords and new owners inspect. We clean inside appliances, sanitize bathrooms, scrub baseboards, and leave your Millbrook property move-in ready.`,
      "wetumpka": `Wetumpka residents moving to a new home or leaving a rental property trust Self-Maid for thorough move-in/move-out cleaning. We handle every surface — inside closets, appliances, cabinets, and more — ensuring a spotless transition.`,
      "selma": `Self-Maid helps Selma residents and property managers with comprehensive move-in/move-out cleaning. From inside every cabinet to every baseboard, we ensure your Selma property is clean enough to pass any inspection and welcome its next occupants.`
    },
    "commercial-cleaning": {
      "montgomery": `As Alabama's capital, Montgomery is home to government offices, law firms, medical practices, and retail businesses that demand professional-grade cleaning. Self-Maid provides reliable commercial cleaning throughout Montgomery with flexible scheduling, OSHA-compliant protocols, and consistent results your team and clients will notice.`,
      "prattville": `Prattville's thriving business community — from downtown shops to professional offices — needs reliable commercial cleaning. Self-Maid serves Prattville businesses with customizable cleaning schedules, after-hours availability, and the consistent quality that keeps your space looking professional.`,
      "millbrook": `Millbrook's growing commercial corridor needs dependable cleaning services. Self-Maid provides professional commercial cleaning for Millbrook offices, retail spaces, and medical facilities with flexible schedules and attention to detail that supports your business image.`,
      "wetumpka": `Wetumpka's charming downtown businesses and professional offices deserve a cleaning service that matches their community standards. Self-Maid delivers reliable commercial cleaning throughout Wetumpka with customizable schedules and thorough, consistent results.`,
      "selma": `Selma businesses and organizations rely on Self-Maid for professional commercial cleaning that maintains a welcoming environment for employees and visitors. We offer flexible scheduling, thorough sanitizing, and reliable service throughout Dallas County.`
    }
  };

  return contentVariants[service.slug]?.[city.slug] || `Self-Maid Cleaning Solutions provides professional ${service.shortName.toLowerCase()} services throughout ${city.name}, Alabama. With 16+ years of experience serving ${city.county} and surrounding areas, we deliver consistent, reliable results that ${city.name} residents trust.`;
}

const allCityServiceCombinations = Object.keys(cities).flatMap(citySlug =>
  Object.keys(services).map(serviceSlug => ({
    slug: `${serviceSlug}-${citySlug}-al`,
    citySlug,
    serviceSlug
  }))
);

const slugAliases: Record<string, string> = {};
Object.keys(cities).forEach(citySlug => {
  slugAliases[`move-out-cleaning-${citySlug}`] = `move-in-move-out-cleaning-${citySlug}-al`;
  slugAliases[`move-in-cleaning-${citySlug}`] = `move-in-move-out-cleaning-${citySlug}-al`;
  slugAliases[`maid-service-${citySlug}`] = `house-cleaning-${citySlug}-al`;
  slugAliases[`cleaning-service-${citySlug}`] = `house-cleaning-${citySlug}-al`;
  slugAliases[`office-cleaning-${citySlug}`] = `commercial-cleaning-${citySlug}-al`;
  slugAliases[`vacation-rental-cleaning-${citySlug}`] = `airbnb-cleaning-${citySlug}-al`;
  Object.keys(services).forEach(serviceSlug => {
    slugAliases[`${serviceSlug}-${citySlug}`] = `${serviceSlug}-${citySlug}-al`;
  });
});

export { allCityServiceCombinations, slugAliases };

export default function CityServicePage() {
  const [location] = useLocation();
  const slug = location.replace(/^\//, "");

  const match = allCityServiceCombinations.find(c => c.slug === slug);

  if (!match) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">We couldn't find that service page. Browse our services and locations below.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {allCityServiceCombinations.slice(0, 10).map(c => {
              const city = cities[c.citySlug];
              const service = services[c.serviceSlug];
              return (
                <Link key={c.slug} href={`/${c.slug}`}>
                  <Button variant="outline" className="w-full text-left justify-start">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    {service.shortName} in {city.name}, AL
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const city = cities[match.citySlug];
  const service = services[match.serviceSlug];
  const ServiceIcon = service.icon;
  const localContent = generateCityServiceContent(city, service);

  const otherServicesInCity = Object.values(services)
    .filter(s => s.slug !== service.slug)
    .map(s => ({
      ...s,
      url: `/${s.slug}-${city.slug}-al`
    }));

  const samServiceOtherCities = Object.values(cities)
    .filter(c => c.slug !== city.slug)
    .map(c => ({
      ...c,
      url: `/${service.slug}-${c.slug}-al`
    }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${service.name} in ${city.name}, AL`,
      "description": `Professional ${service.name.toLowerCase()} services in ${city.name}, Alabama. ${service.description}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Self-Maid Cleaning Solutions",
        "telephone": "+1-334-877-9513",
        "email": "selfmaidclean@outlook.com",
        "url": "https://selfmaidllc.com",
        "priceRange": "$65-$400",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "500"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": city.name,
        "containedInPlace": {
          "@type": "State",
          "name": "Alabama"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": service.startingPrice.replace("$", ""),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://selfmaidllc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://selfmaidllc.com/services" },
        { "@type": "ListItem", "position": 3, "name": `${service.shortName} in ${city.name}, AL`, "item": `https://selfmaidllc.com/${match.slug}` }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title={`${service.name} ${city.name} AL | Professional ${service.shortName} | Self-Maid`}
        description={`Top-rated ${service.name.toLowerCase()} in ${city.name}, Alabama. Starting at ${service.startingPrice}. Insured, bonded & background-checked. Serving ${city.county} since 2009. Call (334) 877-9513.`}
        keywords={`${service.name.toLowerCase()} ${city.name} AL, ${service.shortName.toLowerCase()} ${city.name}, ${service.shortName.toLowerCase()} ${city.name} Alabama, professional ${service.shortName.toLowerCase()} ${city.name}, best ${service.shortName.toLowerCase()} ${city.name} AL, affordable ${service.shortName.toLowerCase()} near me, ${city.neighborhoods.slice(0, 4).join(", ")} cleaning`}
        canonical={`https://selfmaidllc.com/${match.slug}`}
        structuredData={structuredData}
      />
      <Navigation />

      <section className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium">Serving {city.name}, {city.county}, Alabama</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {service.name} in<br />{city.name}, Alabama
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-4">
            {service.description}
          </p>
          <p className="text-2xl font-bold text-green-400 mb-8">Starting at {service.startingPrice}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <ServiceIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {service.shortName} in {city.name}, AL
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {localContent}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">Why Choose Self-Maid</h3>
                  <ul className="space-y-3">
                    {service.benefits.map(benefit => (
                      <li key={benefit} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">What's Included</h3>
                  <ul className="space-y-3">
                    {service.includes.map(item => (
                      <li key={item} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{city.name} Areas We Serve</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Neighborhoods
                </h3>
                <ul className="space-y-2">
                  {city.neighborhoods.map(n => (
                    <li key={n} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  ZIP Codes Served
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.zipCodes.map(z => (
                    <span key={z} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">{z}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why {city.name} Trusts Self-Maid</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <Shield className="w-10 h-10 mx-auto mb-3 text-blue-300" />
              <h3 className="font-bold text-lg mb-1">Fully Insured</h3>
              <p className="text-sm text-gray-300">Licensed, bonded & background-checked</p>
            </div>
            <div>
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <h3 className="font-bold text-lg mb-1">5-Star Rated</h3>
              <p className="text-sm text-gray-300">500+ satisfied customers</p>
            </div>
            <div>
              <Clock className="w-10 h-10 mx-auto mb-3 text-blue-300" />
              <h3 className="font-bold text-lg mb-1">Since 2009</h3>
              <p className="text-sm text-gray-300">16+ years serving Alabama</p>
            </div>
            <div>
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-blue-300" />
              <h3 className="font-bold text-lg mb-1">100% Guarantee</h3>
              <p className="text-sm text-gray-300">Not happy? We come back free</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Professional {service.shortName} in {city.name}?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get an instant quote in under 60 seconds, or call us directly. No obligations, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
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

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Other Services in {city.name}</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {otherServicesInCity.map(s => (
              <Link key={s.url} href={s.url}>
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border">
                  {s.shortName}
                </span>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">{service.shortName} in Other Cities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {samServiceOtherCities.map(c => (
              <Link key={c.url} href={c.url}>
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border">
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