import { Shield, Star, UserCheck, Award } from 'lucide-react';

const signals = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Star, label: '5-Star Reviews', filled: true },
  { icon: UserCheck, label: 'Background Checked' },
  { icon: Award, label: 'Since 2009' },
];

export function TrustBar() {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-x-8 gap-y-3 py-4">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#1E8E6A]/10 flex items-center justify-center">
                  <Icon className={`w-3.5 h-3.5 text-[#1E8E6A] ${signal.filled ? 'fill-[#C6A969] text-[#C6A969]' : ''}`} />
                </div>
                <span className="text-[#1F2A37] text-sm font-medium whitespace-nowrap">{signal.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
