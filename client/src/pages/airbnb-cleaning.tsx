import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import {
  Key, Star, Clock, Shield, CheckCircle, ArrowRight, Phone,
  Sparkles, Home, RefreshCw, Calendar, TrendingUp, Award, Zap
} from 'lucide-react';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Airbnb Cleaning Service Montgomery AL",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Self-Maid Cleaning Solutions",
    "telephone": "+1-334-877-9513",
    "url": "https://selfmaidllc.com"
  },
  "description": "Professional Airbnb and vacation rental cleaning in Montgomery, Prattville, and Central Alabama. Same-day turnovers, inspection reports, and 5-star ready every time.",
  "areaServed": ["Montgomery, AL", "Prattville, AL", "Millbrook, AL", "Wetumpka, AL"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "65",
    "description": "Airbnb turnover cleaning starting at $65"
  }
};

const features = [
  {
    icon: Zap,
    title: "Same-Day Turnovers",
    desc: "Guest checks out at 11am, we're ready for your next guest by 3pm. Fast, reliable, every time."
  },
  {
    icon: CheckCircle,
    title: "Inspection Reports",
    desc: "We document the condition of your property after every clean so you're always protected."
  },
  {
    icon: Star,
    title: "5-Star Ready Every Time",
    desc: "Guests consistently rate cleanliness as #1. We make sure your listing earns that rating."
  },
  {
    icon: RefreshCw,
    title: "Linen & Towel Service",
    desc: "Fresh linens, hotel-style towel folds, and restock of guest essentials included."
  },
  {
    icon: Shield,
    title: "Fully Insured & Bonded",
    desc: "Every cleaner is background-checked, insured, and trained to the highest standards."
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    desc: "We sync with your Airbnb calendar. Book once, and we handle the rest automatically."
  }
];

const pricing = [
  {
    label: "Studio / 1 BR",
    price: "$65",
    note: "Up to 600 sq ft",
    features: ["Full clean & sanitize", "Linen change", "Trash removal", "Restock essentials", "Inspection report"]
  },
  {
    label: "2–3 Bedroom",
    price: "$95",
    note: "600–1,400 sq ft",
    features: ["Full clean & sanitize", "All beds refreshed", "Trash removal", "Restock essentials", "Photo inspection", "Priority scheduling"],
    popular: true
  },
  {
    label: "4+ Bedroom / Large",
    price: "$149+",
    note: "1,400+ sq ft",
    features: ["Full clean & sanitize", "All beds refreshed", "Deep clean option", "Restock essentials", "Full photo report", "Priority scheduling"]
  }
];

const checklist = [
  "Strip and remake all beds with fresh linens",
  "Sanitize all bathrooms thoroughly",
  "Clean kitchen appliances inside and out",
  "Wipe counters, sinks, and all surfaces",
  "Vacuum and mop all floors",
  "Empty all trash cans and replace liners",
  "Restock toilet paper, soap, and essentials",
  "Hotel-style towel and pillow arrangement",
  "Spot-clean windows and mirrors",
  "Inspect for damages and left-behind items",
  "Document property condition with photos",
  "Deodorize and freshen air"
];

const testimonials = [
  {
    name: "Marcus T.",
    location: "Montgomery Airbnb Host",
    rating: 5,
    text: "I have 3 Airbnb properties and Self-Maid handles all of them. Same-day turnovers, always spotless. My average cleanliness rating went from 4.6 to 4.9 within a month."
  },
  {
    name: "Denise W.",
    location: "Prattville VRBO Host",
    rating: 5,
    text: "The inspection reports are a game-changer. I know exactly what's going on at my property even when I'm out of town. Absolute peace of mind."
  },
  {
    name: "James R.",
    location: "Montgomery Property Manager",
    rating: 5,
    text: "We manage 8 short-term rentals and Self-Maid is the only cleaning company we trust. Reliable, professional, and they actually care about the results."
  }
];

export default function AirbnbCleaning() {
  return (
    <>
      <SEOHead
        title="Airbnb Cleaning Service Montgomery AL | Same-Day Turnover | Self-Maid"
        description="Professional Airbnb and vacation rental cleaning in Montgomery, Prattville & Central Alabama. Same-day turnovers, 5-star ready, inspection reports. Starting at $65. Call (334) 877-9513."
        keywords="Airbnb cleaning Montgomery AL, vacation rental cleaning Prattville, VRBO cleaning Alabama, short term rental cleaning Montgomery, Airbnb turnover service Prattville, STR cleaning Alabama, Airbnb host cleaning service Montgomery, rental property cleaning Prattville AL, same day Airbnb cleaning Montgomery, Airbnb cleaner Montgomery Alabama"
        canonical="https://selfmaidllc.com/airbnb-cleaning"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero */}
        <section className="relative deep-teal-bg text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#C6A969]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#C6A969]/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#C6A969]/20 backdrop-blur-sm border border-[#C6A969]/30 text-[#C6A969] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Key className="w-4 h-4" />
              For Airbnb Hosts & Property Managers
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              5-Star Airbnb Cleaning<br />
              <span className="text-[#C6A969]">Done Right, Every Time</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-4">
              Same-day turnovers, inspection reports, and hotel-level cleanliness for your Montgomery or Prattville rental. We sync with your calendar — you just watch the 5-star reviews roll in.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4 text-[#C6A969]" /> Boost Your Ratings
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-amber-400" /> Same-Day Available
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-[#C6A969]" /> Fully Insured
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="gold-bg text-[#1F2A37] text-lg px-8 py-6 font-bold hover:opacity-90">
                  Get Airbnb Quote <ArrowRight className="w-5 h-5 ml-2" />
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

        {/* Why Airbnb Hosts Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-[#C6A969]/10 dark:bg-[#C6A969]/20 text-[#1F2A37] dark:text-[#C6A969] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" /> Why Hosts Trust Self-Maid
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything Your Rental Needs to Succeed</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're not just cleaners — we're your on-the-ground team making sure every guest arrives to a spotless, welcoming home.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F2A37] to-[#2D3F52] rounded-xl flex items-center justify-center mb-4 shadow-md">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground text-lg">No surprises. No hidden fees. Just great cleaning at a fair price.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricing.map((tier) => (
                <Card key={tier.label} className={`relative overflow-hidden ${tier.popular ? 'border-2 border-[#C6A969] shadow-xl shadow-[#C6A969]/10' : 'border shadow-md'}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 gold-bg text-[#1F2A37] text-xs font-bold text-center py-1.5 tracking-wider">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent className={`p-6 ${tier.popular ? 'pt-10' : 'pt-6'}`}>
                    <h3 className="text-lg font-bold mb-1">{tier.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.note}</p>
                    <div className="text-4xl font-extrabold text-[#1F2A37] dark:text-[#C6A969] mb-1">{tier.price}</div>
                    <p className="text-xs text-muted-foreground mb-6">per turnover</p>
                    <ul className="space-y-2.5 mb-6">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#C6A969] flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/quote">
                      <Button className={`w-full ${tier.popular ? 'gold-bg text-[#1F2A37] hover:opacity-90' : ''}`} variant={tier.popular ? 'default' : 'outline'}>
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Prices may vary based on property condition. Deep cleaning and add-ons available.{' '}
              <a href="tel:3348779513" className="text-[#C6A969] font-semibold hover:underline">Call for a custom quote.</a>
            </p>
          </div>
        </section>

        {/* Turnover Checklist */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#C6A969]/10 dark:bg-[#C6A969]/20 text-[#1F2A37] dark:text-[#C6A969] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" /> Our Turnover Checklist
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Item. Every Time.</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Our Airbnb turnover checklist is built from years of hosting experience. Nothing gets skipped, nothing gets missed.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/booking">
                    <Button className="gold-bg text-[#1F2A37] hover:opacity-90">
                      Book Your First Turnover
                    </Button>
                  </Link>
                  <a href="tel:3348779513">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" /> Talk to Us
                    </Button>
                  </a>
                </div>
              </div>
              <div>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Home className="w-5 h-5 text-[#C6A969]" />
                      <span className="font-bold">Turnover Checklist</span>
                    </div>
                    <ul className="space-y-2.5">
                      {checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#C6A969] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 deep-teal-bg text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hosts Love Self-Maid</h2>
              <p className="text-white/70 text-lg">Real results from real Airbnb hosts in Montgomery and Prattville</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[#C6A969] text-xs">{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <Sparkles className="w-10 h-10 text-[#C6A969] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Earn More 5-Star Reviews?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join Montgomery and Prattville hosts who count on Self-Maid to keep their properties guest-ready. Get a quote in 60 seconds, or call us now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="gold-bg text-[#1F2A37] text-lg px-8 py-6 font-bold hover:opacity-90">
                  Get My Airbnb Quote <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:3348779513">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Phone className="w-5 h-5 mr-2" /> (334) 877-9513
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Serving Montgomery · Prattville · Millbrook · Wetumpka and surrounding areas
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
