import { useParams, Link } from 'wouter';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Star, Check, ArrowRight, Shield, Clock, Sparkles, Home, Building2, Key } from 'lucide-react';

interface NeighborhoodData {
  name: string;
  slug: string;
  city: string;
  citySlug: string;
  description: string;
  highlights: string[];
  nearbyNeighborhoods: string[];
  localContent: string;
}

const neighborhoods: Record<string, NeighborhoodData> = {
  "glennbrooke": {
    name: "Glennbrooke",
    slug: "glennbrooke",
    city: "Prattville",
    citySlug: "prattville",
    description: "Glennbrooke is one of Prattville's most desirable neighborhoods, known for its well-maintained homes, tree-lined streets, and strong community feel. Self-Maid Cleaning Solutions proudly serves Glennbrooke families with reliable, professional house cleaning.",
    highlights: ["Family-friendly neighborhood", "Well-maintained single-family homes", "Active community association", "Close to Prattville schools"],
    nearbyNeighborhoods: ["Silver Hills", "Highland Ridge", "Legends"],
    localContent: "Glennbrooke homeowners appreciate attention to detail, and that's exactly what Self-Maid delivers. Our experienced cleaning teams are familiar with the spacious floor plans and finishes common in Glennbrooke homes. Whether you need weekly maintenance or a seasonal deep clean, we tailor our service to your home's specific needs."
  },
  "silver-hills": {
    name: "Silver Hills",
    slug: "silver-hills",
    city: "Prattville",
    citySlug: "prattville",
    description: "Silver Hills is a popular Prattville subdivision featuring beautiful homes and a welcoming atmosphere. Self-Maid Cleaning Solutions provides dependable house cleaning services to Silver Hills residents, keeping homes spotless inside and out.",
    highlights: ["Growing residential community", "Modern home construction", "Convenient access to Highway 82", "Near Prattville shopping centers"],
    nearbyNeighborhoods: ["Glennbrooke", "Hunting Ridge", "Cobblestone"],
    localContent: "Silver Hills residents choose Self-Maid because we understand the needs of modern Prattville homes. Our teams are trained to handle every surface and room type, from open-concept living areas to detailed kitchen and bathroom deep cleaning. We bring all supplies and equipment — you just enjoy the results."
  },
  "highland-ridge": {
    name: "Highland Ridge",
    slug: "highland-ridge",
    city: "Prattville",
    citySlug: "prattville",
    description: "Highland Ridge is a well-established Prattville neighborhood with beautiful homes and a great location. Self-Maid Cleaning Solutions offers professional cleaning services throughout Highland Ridge, from standard cleanings to deep cleans.",
    highlights: ["Established subdivision", "Spacious home lots", "Quiet residential streets", "Easy access to downtown Prattville"],
    nearbyNeighborhoods: ["Glennbrooke", "Riverchase", "Autumn Ridge"],
    localContent: "Highland Ridge homeowners trust Self-Maid for consistent, thorough cleaning. Our team knows that Highland Ridge homes often feature larger square footage and detailed finishes — we adjust our service accordingly. Every visit includes a comprehensive checklist so nothing gets missed."
  },
  "hunting-ridge": {
    name: "Hunting Ridge",
    slug: "hunting-ridge",
    city: "Prattville",
    citySlug: "prattville",
    description: "Hunting Ridge is a sought-after residential community in Prattville, featuring quality homes and friendly neighbors. Self-Maid Cleaning Solutions provides reliable, professional cleaning to keep every Hunting Ridge home looking its best.",
    highlights: ["Quality residential homes", "Family-oriented community", "Well-maintained common areas", "Convenient to Prattville amenities"],
    nearbyNeighborhoods: ["Silver Hills", "Bridle Creek", "Legends"],
    localContent: "Hunting Ridge families count on Self-Maid for worry-free home cleaning. We've built a reputation in this community through consistent results and trustworthy service. Our background-checked, fully insured teams arrive on time and leave your home sparkling clean."
  },
  "riverchase": {
    name: "Riverchase",
    slug: "riverchase",
    city: "Prattville",
    citySlug: "prattville",
    description: "Riverchase is a premier Prattville neighborhood known for its beautiful homes and excellent location. Self-Maid Cleaning Solutions serves Riverchase with the same professional, reliable cleaning that has earned us 500+ happy customers across Central Alabama.",
    highlights: ["Premier Prattville neighborhood", "Beautiful landscaping", "Close to the Alabama River", "Near top-rated schools"],
    nearbyNeighborhoods: ["Highland Ridge", "Downtown Prattville", "Kingston"],
    localContent: "Riverchase residents expect the best, and Self-Maid delivers. Our professional cleaning teams provide thorough, detail-oriented service that matches the quality of your home. From standard weekly cleanings to comprehensive deep cleans and move-in/move-out services, we have you covered."
  }
};

const services = [
  { name: "Standard House Cleaning", price: "From $120", icon: Home, desc: "Regular maintenance cleaning for a spotless home" },
  { name: "Deep Cleaning", price: "From $250", icon: Sparkles, desc: "Top-to-bottom intensive cleaning for every corner" },
  { name: "Move-In/Move-Out", price: "From $150", icon: Key, desc: "Complete cleaning for your move day" },
  { name: "Commercial Cleaning", price: "From $180", icon: Building2, desc: "Professional office and business cleaning" },
];

const reviews = [
  { name: "Sarah M.", neighborhood: "Prattville", rating: 5, text: "Self-Maid has been cleaning our home for over a year. They're always on time, thorough, and trustworthy. Highly recommend!" },
  { name: "James T.", neighborhood: "Prattville", rating: 5, text: "Best cleaning service in Autauga County. They go above and beyond every single time. Our home has never looked better." },
  { name: "Lisa R.", neighborhood: "Prattville", rating: 5, text: "Professional, reliable, and affordable. Self-Maid takes the stress out of keeping our home clean. Love this company!" },
];

export default function NeighborhoodPage() {
  const params = useParams<{ city: string; neighborhood: string }>();
  const cityParam = params.city || '';
  const neighborhoodSlug = params.neighborhood || '';
  const data = neighborhoods[neighborhoodSlug];

  if (!data || data.citySlug !== cityParam) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Neighborhood Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find that neighborhood page.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Self-Maid Cleaning Solutions",
    "description": `Professional house cleaning services in ${data.name}, ${data.city}, AL`,
    "telephone": "+1-334-877-9513",
    "areaServed": {
      "@type": "Place",
      "name": `${data.name}, ${data.city}, Alabama`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "500"
    }
  };

  return (
    <>
      <SEOHead
        title={`House Cleaning ${data.name}, ${data.city} AL | Self-Maid Cleaning`}
        description={`Professional house cleaning services in ${data.name}, ${data.city}, Alabama. Residential, deep cleaning, move-in/out. 16+ years experience. Call (334) 877-9513 for a free quote!`}
        keywords={`house cleaning ${data.name} ${data.city} AL, maid service ${data.name}, cleaning service ${data.city} Alabama, ${data.name} house cleaner, residential cleaning ${data.name}`}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0e7490 40%, #0f766e 70%, #1d4ed8 100%)' }}>
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-emerald-200/70 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/services/${data.citySlug}-al`} className="hover:text-white transition-colors">{data.city}</Link>
              <span>/</span>
              <span className="text-white">{data.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              House Cleaning in{' '}
              <span className="text-amber-300">{data.name}</span>
              <span className="block text-2xl sm:text-3xl mt-1 text-emerald-100/80">{data.city}, Alabama</span>
            </h1>
            <p className="text-lg text-emerald-100/80 max-w-2xl mb-8 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <Button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-6 rounded-2xl text-lg h-auto">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:334-877-9513" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all">
                <Phone className="w-5 h-5" />
                (334) 877-9513
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Licensed & Insured" },
                { icon: Check, label: "Background Checked" },
                { icon: Star, label: "5.0 Star Rating" },
                { icon: Clock, label: "16+ Years Experience" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <item.icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why {data.name} Residents Choose Self-Maid
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">{data.localContent}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {data.highlights.map(h => (
                <div key={h} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Cleaning Services Available in {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(s => (
                <Card key={s.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <s.icon className="w-8 h-8 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <p className="text-emerald-600 font-bold">{s.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              What {data.city} Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">"{r.text}"</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">— {r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.neighborhood} Resident</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Nearby {data.city} Neighborhoods We Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.nearbyNeighborhoods.map(n => {
                const nSlug = n.toLowerCase().replace(/\s+/g, '-');
                const isLinkable = !!neighborhoods[nSlug];
                return isLinkable ? (
                  <Link key={n} href={`/services/${data.citySlug}/${nSlug}`}>
                    <span className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm font-medium hover:border-emerald-400 transition-colors cursor-pointer">
                      <MapPin className="w-3 h-3 text-emerald-600" />{n}
                    </span>
                  </Link>
                ) : (
                  <span key={n} className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm font-medium">
                    <MapPin className="w-3 h-3 text-emerald-600" />{n}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0e7490 50%, #0f766e 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for a Cleaner Home in {data.name}?
            </h2>
            <p className="text-emerald-100/80 text-lg mb-8 max-w-2xl mx-auto">
              Get an instant quote in under 30 seconds. No commitments, no hidden fees — just transparent pricing for professional cleaning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-10 py-6 rounded-2xl text-lg h-auto">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:334-877-9513" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all">
                <Phone className="w-5 h-5" />
                Call (334) 877-9513
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export { neighborhoods };
