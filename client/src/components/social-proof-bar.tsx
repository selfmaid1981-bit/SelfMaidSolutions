import { Star, Shield, Clock, Users } from 'lucide-react';

interface SocialProofBarProps {
  variant?: 'default' | 'compact';
}

export function SocialProofBar({ variant = 'default' }: SocialProofBarProps) {
  const stats = [
    { icon: Star, label: '5.0 Rating', sublabel: 'Google Reviews' },
    { icon: Users, label: '500+', sublabel: 'Happy Customers' },
    { icon: Clock, label: '16 Years', sublabel: 'Experience' },
    { icon: Shield, label: '100%', sublabel: 'Satisfaction' },
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-muted/30 py-3 border-y" data-testid="social-proof-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">{stat.label}</span>
                <span className="hidden sm:inline">{stat.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-6 border-y" data-testid="social-proof-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 justify-center" data-testid={`social-proof-stat-${index}`}>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
