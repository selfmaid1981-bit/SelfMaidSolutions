import { Shield, Clock, Award, Users, CheckCircle2, Phone } from 'lucide-react';

const trustBadges = [
  {
    icon: Award,
    title: '16 Years',
    subtitle: 'In Business',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    subtitle: '& Bonded',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: Users,
    title: '500+',
    subtitle: 'Happy Customers',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: Clock,
    title: 'Same-Day',
    subtitle: 'Service Available',
    color: 'text-orange-600 dark:text-orange-400'
  },
  {
    icon: CheckCircle2,
    title: '100%',
    subtitle: 'Satisfaction Guarantee',
    color: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    icon: Phone,
    title: '2-Hour',
    subtitle: 'Response Time',
    color: 'text-red-600 dark:text-red-400'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-12 lg:py-16 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
                data-testid={`trust-badge-${index}`}
              >
                <div className="mb-2">
                  <Icon className={`w-8 h-8 ${badge.color}`} />
                </div>
                <div className="font-bold text-white text-lg">
                  {badge.title}
                </div>
                <div className="text-slate-400 text-sm">
                  {badge.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-300 text-lg">
            <span className="font-semibold text-white">Trusted by families and businesses</span> across Montgomery, Prattville, and Selma since 2009
          </p>
        </div>
      </div>
    </section>
  );
}
