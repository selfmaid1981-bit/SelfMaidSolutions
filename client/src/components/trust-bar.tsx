import { Shield, Star, UserCheck, Award } from 'lucide-react';

const signals = [
  { icon: Shield, label: 'Licensed & Insured', iconClass: 'text-white' },
  { icon: Star, label: '5-Star Reviews', iconClass: 'text-[#C6A969] fill-[#C6A969]', bgClass: 'bg-transparent' },
  { icon: UserCheck, label: 'Background Checked', iconClass: 'text-white' },
  { icon: Award, label: 'Since 2009', iconClass: 'text-white' },
];

export function TrustBar() {
  return (
    <div className="bg-white/80 border-b border-gray-200 py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-x-8 gap-y-3">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            const isStars = signal.label === '5-Star Reviews';
            return (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                {isStars ? (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 text-[#C6A969] fill-[#C6A969]" />
                    ))}
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#1F2A37] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                {!isStars && (
                  <span className="text-[#1F2A37] text-sm font-medium whitespace-nowrap">{signal.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
