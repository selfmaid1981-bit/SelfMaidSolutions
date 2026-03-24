import { useEffect, useRef, useState } from 'react';
import { Home, Star, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: Home, value: 500, suffix: '+', label: 'Homes Cleaned' },
  { icon: Star, value: 5.0, suffix: '', label: 'Star Rating', decimals: 1 },
  { icon: Clock, value: 16, suffix: '+', label: 'Years Experience' },
  { icon: Shield, value: 100, suffix: '%', label: 'Satisfaction' },
];

function AnimatedNumber({ target, suffix, decimals = 0, started }: { target: number; suffix: string; decimals?: number; started: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.min(increment * step, target));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span className="gold-shine-text text-4xl lg:text-5xl font-black">
      {decimals > 0 ? current.toFixed(decimals) : Math.round(current)}{suffix}
    </span>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center scroll-reveal">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.15)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#f5c542' }} />
                </div>
                <div className="mb-2">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} decimals={stat.decimals} started={started} />
                </div>
                <p className="text-white/40 text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
