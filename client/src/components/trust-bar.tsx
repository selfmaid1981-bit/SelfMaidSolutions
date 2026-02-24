import { Shield, Star, Clock, Award, CheckCircle } from 'lucide-react';

const signals = [
  { icon: Star, label: '500+ Five-Star Reviews', color: 'text-amber-500' },
  { icon: Award, label: '16 Years Experience', color: 'text-blue-500' },
  { icon: Shield, label: 'Fully Insured & Bonded', color: 'text-emerald-500' },
  { icon: Clock, label: 'Same-Day Available', color: 'text-teal-500' },
  { icon: CheckCircle, label: '100% Satisfaction Guarantee', color: 'text-violet-500' },
];

export function TrustBar() {
  return (
    <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-x-6 gap-y-2 py-3">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <Icon className={`w-4 h-4 ${signal.color}`} />
                <span className="text-slate-300 text-xs font-medium whitespace-nowrap">{signal.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
