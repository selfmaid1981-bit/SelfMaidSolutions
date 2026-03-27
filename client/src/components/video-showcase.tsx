import { useRef, useEffect } from 'react';

const showcaseVideos = [
  {
    id: 'deep-clean',
    title: 'Deep Clean Process',
    description: 'See how our team transforms kitchens from top to bottom.',
    src: '/assets/videos/deep_clean_kitchen.mp4',
  },
  {
    id: 'airbnb',
    title: 'Airbnb Turnovers',
    description: 'Guest-ready in hours — every detail covered.',
    src: '/assets/videos/airbnb_turnover.mp4',
  },
  {
    id: 'detail-work',
    title: 'Attention to Detail',
    description: 'Close-up quality that sets us apart.',
    src: '/assets/videos/service_detail_closeups.mp4',
  },
];

function VideoCard({ video }: { video: typeof showcaseVideos[0] }) {
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
    <div ref={containerRef} className="group relative rounded-xl overflow-hidden shadow-lg border border-[#C6A969]/20 bg-[#1F2A37]">
      <div className="relative aspect-video">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
        <p className="text-white/60 text-sm">{video.description}</p>
      </div>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <section className="py-14 lg:py-20" style={{ background: 'linear-gradient(180deg, #1F2A37 0%, #1e2e35 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#C6A969] text-sm font-semibold tracking-widest uppercase mb-3">Our Work in Motion</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
            See It. Believe It.
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-4" />
          <p className="text-white/60 mt-4 max-w-lg mx-auto">
            Watch our team deliver the premium results that Montgomery homeowners trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
