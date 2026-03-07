import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const services = [
  {
    icon: '🔑',
    name: 'Airbnb Turnover',
    tagline: 'Fastest growing market',
    range: '$65 – $149',
    highlight: true,
    features: ['Same-day turnovers', 'Linen change included', 'Inspection report', 'Calendar sync available']
  },
  {
    icon: '🏠',
    name: 'Residential Cleaning',
    tagline: 'Most popular service',
    range: '$80 – $180',
    highlight: false,
    features: ['Weekly, bi-weekly, or monthly', 'All rooms & bathrooms', 'Kitchen deep clean', 'Eco-friendly products']
  },
  {
    icon: '✨',
    name: 'Deep Cleaning',
    tagline: 'Thorough top-to-bottom clean',
    range: '$250 – $450',
    highlight: false,
    features: ['Inside appliances', 'Baseboards & vents', 'Behind furniture', 'Perfect before moving in/out']
  },
  {
    icon: '📦',
    name: 'Move In / Move Out',
    tagline: 'Get your deposit back',
    range: '$150 – $300',
    highlight: false,
    features: ['Move-out deep clean', 'Inside cabinets & drawers', 'Full sanitization', 'Landlord-ready condition']
  },
  {
    icon: '🏢',
    name: 'Commercial Cleaning',
    tagline: 'Offices & businesses',
    range: '$120 – $400',
    highlight: false,
    features: ['After-hours available', 'Recurring contracts', 'All workspace surfaces', 'Restroom sanitization']
  },
  {
    icon: '🏘️',
    name: 'Apartment Turnover',
    tagline: 'For property managers',
    range: '$108 – $200',
    highlight: false,
    features: ['Tenant change-over ready', 'Same-day turnaround', 'Appliance cleaning', 'Move-in ready']
  }
];

export function PricingSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple Pricing. No Hidden Fees.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Know exactly what you'll pay before we ever show up. Use our instant quote calculator for your exact price in under 60 seconds.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.name}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                service.highlight
                  ? 'bg-gradient-to-br from-teal-600 to-blue-700 border-teal-500 text-white shadow-xl shadow-teal-500/15'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-md'
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  FASTEST GROWING
                </div>
              )}

              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className={`text-xl font-bold mb-1 ${service.highlight ? 'text-white' : 'text-foreground'}`}>
                {service.name}
              </h3>
              <p className={`text-sm mb-3 ${service.highlight ? 'text-teal-200' : 'text-muted-foreground'}`}>
                {service.tagline}
              </p>

              <div className={`text-2xl font-extrabold mb-4 ${service.highlight ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`}>
                {service.range}
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${service.highlight ? 'text-teal-300' : 'text-teal-500'}`} />
                    <span className={service.highlight ? 'text-teal-100' : 'text-foreground/75'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="/quote">
                <Button
                  className={`w-full font-semibold ${
                    service.highlight
                      ? 'bg-white text-teal-700 hover:bg-teal-50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Get Exact Quote
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6 text-sm">
            Prices vary based on property size and condition. Our quote calculator gives you a precise number instantly — no phone call required.
          </p>
          <Link href="/quote">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-lg px-10 py-6 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Calculate My Exact Price <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
