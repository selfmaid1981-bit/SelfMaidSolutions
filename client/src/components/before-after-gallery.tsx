import { useState, useRef, useCallback } from 'react';

const slides = [
  {
    before: '/assets/before-after/slide1-before.png',
    after: '/assets/before-after/slide1-after.png',
    label: 'Kitchen Countertops',
  },
  {
    before: '/assets/before-after/slide2-before.png',
    after: '/assets/before-after/slide2-after.png',
    label: 'Full Kitchen',
  },
];

function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl select-none touch-none cursor-col-resize"
        style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.06)' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img
          src={after}
          alt={`${label} after cleaning`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${label} before cleaning`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-[2px] h-full" style={{ background: 'rgba(245,197,66,0.6)' }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0a0a0d', border: '2px solid rgba(245,197,66,0.6)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5c542" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
            </svg>
          </div>
        </div>

        <span className="absolute top-3 left-3 z-20 text-white/70 text-[10px] font-medium px-3 py-1.5 rounded tracking-[1px] uppercase" style={{ background: 'rgba(10,10,13,0.7)', backdropFilter: 'blur(4px)' }}>
          Before
        </span>
        <span className="absolute top-3 right-3 z-20 text-[10px] font-medium px-3 py-1.5 rounded tracking-[1px] uppercase" style={{ background: 'rgba(245,197,66,0.9)', color: '#0a0a0d' }}>
          After
        </span>
      </div>
      <p className="text-center text-white/30 text-xs tracking-[2px] uppercase">{label}</p>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="py-24 lg:py-32" style={{ background: '#0a0a0d' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label text-white/50 tracking-[4px]">RESULTS</p>
          <div className="editorial-divider-center" />
          <h2 className="font-bold text-white font-serif">
            See the Real <span className="italic" style={{ color: '#f5c542' }}>Difference</span>
          </h2>
          <p className="text-white/35 mt-4 text-sm tracking-wide">Real results from real Self-Maid clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {slides.map((s) => (
            <BeforeAfterSlider key={s.label} before={s.before} after={s.after} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
