import { useEffect, useRef } from 'react';
import mascotImg from '@assets/mascot-nobg.png';

export function Animated3DLogo({ size = 200 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
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
      mouseX = ((e.clientX - centerX) / (rect.width / 2)) * 25;
      mouseY = ((e.clientY - centerY) / (rect.height / 2)) * -25;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const inner = container.querySelector('.logo-3d-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="logo-3d-container"
      style={{
        width: size,
        height: size,
        perspective: '800px',
      }}
    >
      <div className="logo-3d-inner" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}>
        <div className="logo-3d-glow" />
        <img
          src={mascotImg}
          alt="Self-Maid 3D animated mascot"
          className="logo-3d-image"
          style={{ width: size, height: size }}
        />
        <div className="logo-3d-reflection" />

        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="logo-3d-sparkle"
            style={{
              '--sparkle-delay': `${i * 0.4}s`,
              '--sparkle-x': `${Math.cos((i / 12) * Math.PI * 2) * (size * 0.55)}px`,
              '--sparkle-y': `${Math.sin((i / 12) * Math.PI * 2) * (size * 0.55)}px`,
              '--sparkle-size': `${4 + Math.random() * 6}px`,
            } as React.CSSProperties}
          />
        ))}

        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={`ring-${i}`}
            className="logo-3d-ring-dot"
            style={{
              '--ring-delay': `${i * 0.6}s`,
              '--ring-angle': `${(i / 6) * 360}deg`,
              '--ring-radius': `${size * 0.48}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
