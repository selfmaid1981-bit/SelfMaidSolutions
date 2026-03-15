import { useEffect, useRef, useState } from 'react';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773578331892.png';

interface Animated3DLogoProps {
  size?: number;
  variant?: 'light' | 'dark';
}

export function Animated3DLogo({ size = 220, variant = 'light' }: Animated3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'enter' | 'wipe' | 'sparkle' | 'idle'>('enter');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('wipe'), 1200),
      setTimeout(() => setPhase('sparkle'), 4000),
      setTimeout(() => setPhase('idle'), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const mascotH = size * 0.75;

  return (
    <div
      ref={containerRef}
      className={`cr-stage cr-${phase} ${variant === 'dark' ? 'cr-dark' : ''}`}
      style={{ '--cr-size': `${size}px`, '--cr-mascot': `${mascotH}px` } as React.CSSProperties}
    >
      <div className="cr-surface">
        <div className="cr-dirty" />

        <div className="cr-text-wrap">
          <span className="cr-brand">Self-Maid</span>
          <span className="cr-sub">Cleaning Solutions</span>
        </div>

        <div className="cr-reveal-mask" />
      </div>

      <div className="cr-mascot-slot">
        <img
          src={mascotImg}
          alt="Self-Maid sponge hero mascot"
          className="cr-mascot-img"
          width={mascotH}
          height={mascotH}
        />
        <div className="cr-streak" />
      </div>

      <div className="cr-shine-bar" />

      {['tl','tr','bl','br'].map((pos) => (
        <span key={pos} className={`cr-star cr-star-${pos}`} />
      ))}
    </div>
  );
}
