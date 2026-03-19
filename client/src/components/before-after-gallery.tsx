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
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 select-none touch-none cursor-col-resize"
        style={{ aspectRatio: '4/3' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img
          src={after}
          alt={`${label} after cleaning`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
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
          />
        </div>

        <div
          className="absolute top-0 bottom-0 z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-[3px] h-full bg-white shadow-md" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#C6A969]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F2A37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
            </svg>
          </div>
        </div>

        <span className="absolute top-3 left-3 z-20 bg-[#1F2A37]/80 text-white text-xs font-bold px-3 py-1 rounded-sm">
          Before
        </span>
        <span className="absolute top-3 right-3 z-20 bg-[#C6A969] text-[#1F2A37] text-xs font-bold px-3 py-1 rounded-sm">
          After
        </span>
      </div>
      <p className="text-center text-gray-500 text-xs">{label}</p>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="py-14 lg:py-20 marble-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
            See the Real Difference
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
          <p className="text-gray-600 mt-3 text-sm">Real results from real Self-Maid clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((s) => (
            <BeforeAfterSlider key={s.label} before={s.before} after={s.after} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
