import { useState, useEffect } from 'react';
import { Clock, Users, Calendar, Sparkles } from 'lucide-react';

interface UrgencyBannerProps {
  variant?: 'booking' | 'quote' | 'checkout';
}

export function UrgencyBanner({ variant = 'booking' }: UrgencyBannerProps) {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [viewingNow, setViewingNow] = useState(0);

  useEffect(() => {
    const randomSpots = Math.floor(Math.random() * 4) + 2;
    const randomViewers = Math.floor(Math.random() * 5) + 3;
    setSpotsLeft(randomSpots);
    setViewingNow(randomViewers);
  }, []);

  const messages = {
    booking: {
      icon: Calendar,
      text: `Only ${spotsLeft} spots left this week!`,
      subtext: 'Book now to secure your preferred time',
      color: 'from-orange-500 to-red-500',
    },
    quote: {
      icon: Clock,
      text: 'Quote valid for 7 days',
      subtext: 'Lock in your price before rates increase',
      color: 'from-blue-500 to-purple-500',
    },
    checkout: {
      icon: Users,
      text: `${viewingNow} people viewing this slot`,
      subtext: 'Complete payment to confirm your booking',
      color: 'from-green-500 to-emerald-500',
    },
  };

  const config = messages[variant];
  const Icon = config.icon;

  return (
    <div 
      className={`bg-gradient-to-r ${config.color} text-white px-4 py-3 rounded-lg shadow-lg`}
      data-testid={`urgency-banner-${variant}`}
    >
      <div className="flex items-center justify-center gap-3">
        <Icon className="w-5 h-5 animate-pulse" />
        <div className="text-center">
          <p className="font-bold text-sm md:text-base">{config.text}</p>
          <p className="text-xs md:text-sm opacity-90">{config.subtext}</p>
        </div>
      </div>
    </div>
  );
}

export function LoyaltyBadge() {
  return (
    <div 
      className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 px-4 py-2 rounded-lg shadow-md"
      data-testid="loyalty-badge"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="font-bold text-sm">
          Recurring customers save up to 15%!
        </span>
      </div>
    </div>
  );
}

export function TrustSignals() {
  return (
    <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm text-muted-foreground">
      <span className="flex items-center gap-1">
        <span className="text-green-500">✓</span> No upfront payment required
      </span>
      <span className="flex items-center gap-1">
        <span className="text-green-500">✓</span> Free cancellation 24h before
      </span>
      <span className="flex items-center gap-1">
        <span className="text-green-500">✓</span> 100% satisfaction guarantee
      </span>
    </div>
  );
}
