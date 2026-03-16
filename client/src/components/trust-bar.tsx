import { Shield, Star, Clock, Award, CheckCircle } from 'lucide-react';

const signals = [
  { icon: Shield, label: 'Licensed & Insured', color: 'text-emerald-300' },
  { icon: CheckCircle, label: 'Background Checked Cleaners', color: 'text-amber-200' },
  { icon: Star, label: '5-Star Customer Reviews', color: 'text-amber-300' },
  { icon: Award, label: 'Serving Prattville Since 2009', color: 'text-emerald-300' },
];

export function TrustBar() {
  return (
    <div className="trust-bar-gradient relative overflow-hidden">
      <div className="absolute inset-0 trust-bar-shimmer pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-x-6 gap-y-2 py-3.5">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <Icon className={`w-4 h-4 ${signal.color}`} />
                <span className="text-white/90 text-xs font-semibold whitespace-nowrap tracking-wide">{signal.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
