import { useEffect, useRef, useState } from 'react';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773578331892.png';

export function Animated3DLogo({ size = 220 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [phase, setPhase] = useState<'enter' | 'wipe' | 'reveal' | 'idle'>('enter');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('wipe'), 800),
      setTimeout(() => setPhase('reveal'), 1800),
      setTimeout(() => setPhase('idle'), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== 'idle') return;
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = ((e.clientX - centerX) / (rect.width / 2)) * 15;
      mouseY = ((e.clientY - centerY) / (rect.height / 2)) * -15;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;
      const mascot = container.querySelector('.wipe-mascot') as HTMLElement;
      if (mascot) {
        mascot.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [phase]);

  const mascotSize = size * 0.85;

  return (
    <div
      ref={containerRef}
      className="wipe-logo-container"
      style={{ '--logo-size': `${size}px` } as React.CSSProperties}
    >
      <div className={`wipe-mascot-track ${phase}`}>
        <div className="wipe-mascot" style={{ perspective: '600px', transformStyle: 'preserve-3d' }}>
          <div className="wipe-mascot-glow" />
          <img
            src={mascotImg}
            alt="Self-Maid mascot"
            className="wipe-mascot-img"
            style={{ width: mascotSize, height: mascotSize }}
          />
          <div className="wipe-clean-streak" />
        </div>
      </div>

      <div className={`wipe-text-block ${phase}`}>
        <span className="wipe-brand" data-text="Self-Maid">Self-Maid</span>
        <span className="wipe-sub">Cleaning Solutions</span>
        <div className="wipe-shine" />
      </div>

      {phase === 'idle' && (
        <div className="wipe-sparkles">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="wipe-sparkle-dot"
              style={{
                '--sp-delay': `${i * 0.5}s`,
                '--sp-x': `${(Math.random() - 0.5) * size * 2.2}px`,
                '--sp-y': `${(Math.random() - 0.5) * size * 1.4}px`,
                '--sp-size': `${3 + Math.random() * 5}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}
