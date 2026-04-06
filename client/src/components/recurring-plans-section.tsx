import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingDown, Heart, ArrowRight, CheckCircle } from 'lucide-react';

const plans = [
  {
    freq: 'Weekly',
    label: 'Best Value',
    discount: 'Save 20%',
    price: '$64+',
    originalPrice: '$80',
    perMonth: 'from $256/mo',
    color: 'from-[#C6A969] to-[#b89a5a]',
    badge: 'bg-[#C6A969] text-[#1F2A37]',
    features: ['Every week, same day', 'Always fresh & spotless', 'Priority scheduling', 'Free re-clean guarantee']
  },
  {
    freq: 'Bi-Weekly',
    label: 'Most Popular',
    discount: 'Save 15%',
    price: '$68+',
    originalPrice: '$80',
    perMonth: 'from $136/mo',
    color: 'from-[#1F2A37] to-[#0f3a45]',
    badge: 'bg-[#1F2A37] text-[#C6A969]',
    features: ['Every two weeks', 'Consistent clean home', 'Priority scheduling', 'Free re-clean guarantee']
  },
  {
    freq: 'Monthly',
    label: 'Light Touch',
    discount: 'Save 10%',
    price: '$72+',
    originalPrice: '$80',
    perMonth: 'from $72/mo',
    color: 'from-[#0c2e35] to-[#1F2A37]',
    badge: 'bg-[#0c2e35] text-white',
    features: ['Once a month', 'Ideal for smaller homes', 'Flexible scheduling', 'Free re-clean guarantee']
  }
];

export function RecurringPlansSection() {
  return (
    <section className="py-20 lg:py-28 marble-bg dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#C6A969]/15 text-[#C6A969] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <RefreshCw className="w-4 h-4" /> Recurring Cleaning Plans
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Subscribe & Save Every Month
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Set it and forget it. Lock in a lower rate, get priority scheduling, and come home to a clean house — every single time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.freq}
              className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${plan.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.freq}</h3>
                    <p className="text-sm text-muted-foreground">{plan.label}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${plan.badge}`}>
                    {plan.discount}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground line-through text-sm">{plan.originalPrice}</span>
                  </div>
                  <p className="text-sm text-[#C6A969] font-medium mt-1">
                    <TrendingDown className="w-3.5 h-3.5 inline mr-1" />
                    {plan.perMonth}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#C6A969] flex-shrink-0" />
                      <span className="text-foreground/75">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/booking">
                  <Button className="w-full font-semibold bg-[#1F2A37] text-[#C6A969] hover:bg-[#2a3a4d]">
                    Start {plan.freq} Plan
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1F2A37]/5 rounded-2xl p-8 text-center border border-[#C6A969]/20">
          <Heart className="w-8 h-8 text-[#C6A969] mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h3>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
            Not happy with your clean? We'll come back and fix it for free — no questions, no hassle. That's our promise to every recurring customer.
          </p>
          <Link href="/quote">
            <Button variant="outline" className="font-semibold border-[#C6A969] text-[#1F2A37] hover:bg-[#C6A969]/10">
              Get My Recurring Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
