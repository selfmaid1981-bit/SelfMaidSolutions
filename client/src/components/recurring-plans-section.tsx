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
    color: 'from-emerald-600 to-teal-500',
    badge: 'bg-amber-400 text-amber-900',
    features: ['Every week, same day', 'Always fresh & spotless', 'Priority scheduling', 'Free re-clean guarantee']
  },
  {
    freq: 'Bi-Weekly',
    label: 'Most Popular',
    discount: 'Save 15%',
    price: '$68+',
    originalPrice: '$80',
    perMonth: 'from $136/mo',
    color: 'from-teal-500 to-emerald-500',
    badge: 'bg-teal-500 text-white',
    features: ['Every two weeks', 'Consistent clean home', 'Priority scheduling', 'Free re-clean guarantee']
  },
  {
    freq: 'Monthly',
    label: 'Light Touch',
    discount: 'Save 10%',
    price: '$72+',
    originalPrice: '$80',
    perMonth: 'from $72/mo',
    color: 'from-slate-500 to-emerald-500',
    badge: 'bg-slate-500 text-white',
    features: ['Once a month', 'Ideal for smaller homes', 'Flexible scheduling', 'Free re-clean guarantee']
  }
];

export function RecurringPlansSection() {
  return (
    <section className="py-20 lg:py-28 marble-bg dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
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
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-1">
                    <TrendingDown className="w-3.5 h-3.5 inline mr-1" />
                    {plan.perMonth}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span className="text-foreground/75">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/booking">
                  <Button className="w-full font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-90">
                    Start {plan.freq} Plan
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 text-center border border-emerald-100 dark:border-emerald-800">
          <Heart className="w-8 h-8 text-rose-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h3>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
            Not happy with your clean? We'll come back and fix it for free — no questions, no hassle. That's our promise to every recurring customer.
          </p>
          <Link href="/quote">
            <Button variant="outline" className="font-semibold border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
              Get My Recurring Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
