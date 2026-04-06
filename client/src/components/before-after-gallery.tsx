import { useRef, useEffect } from 'react';

const galleryPairs = [
  {
    id: 'kitchen',
    beforeImage: '/assets/before-after/before-kitchen-dirty.png',
    afterImage: '/assets/before-after/after-kitchen-clean.png',
    beforeAlt: 'Kitchen before cleaning',
    afterAlt: 'Kitchen after Self-Maid cleaning',
  },
];

function TransformationVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.play().catch(() => {});
        } else {
          ref.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8" ref={containerRef}>
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#C6A969]/30 max-w-2xl mx-auto">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full aspect-video object-cover"
        >
          <source src="/assets/videos/before_after_bathroom.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
          <p className="text-white font-semibold text-sm">Watch the Full Transformation</p>
          <p className="text-white/60 text-xs">From grimy to gleaming — see the Self-Maid difference</p>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="py-14 lg:py-20 deep-teal-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
            See the Difference
          </h2>
          <div className="w-24 gold-divider mx-auto mt-3" />
        </div>

        <div className="max-w-2xl mx-auto">
          {galleryPairs.map((pair) => (
            <div key={pair.id} className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-2xl border border-[#C6A969]/30">
              <div className="relative">
                <img
                  src={pair.beforeImage}
                  alt={pair.beforeAlt}
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-[#1F2A37] text-white text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                    Before
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={pair.afterImage}
                  alt={pair.afterAlt}
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute bottom-3 right-3">
                  <span className="inline-block gold-bg text-[#1F2A37] text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                    After
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TransformationVideo />
      </div>
    </section>
  );
}
