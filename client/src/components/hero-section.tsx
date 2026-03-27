import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

import heroImg from '@assets/89C624EB-3BF3-49AE-BA29-6CA4B6DA0ABB_1773813310714.png';

const heroVideos = [
  '/assets/videos/hero_cleaning_transformation.mp4',
  '/assets/videos/service_detail_closeups.mp4',
  '/assets/videos/deep_clean_kitchen.mp4',
  '/assets/videos/airbnb_turnover.mp4',
];

export function HeroSection() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const currentIndex = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const crossfade = useCallback(() => {
    const nextIndex = (currentIndex.current + 1) % heroVideos.length;
    currentIndex.current = nextIndex;

    const incoming = activeSlot === 'A' ? videoBRef.current : videoARef.current;
    if (incoming) {
      incoming.src = heroVideos[nextIndex];
      incoming.load();
      incoming.play().catch(() => {});
    }
    setActiveSlot((prev) => (prev === 'A' ? 'B' : 'A'));
  }, [activeSlot]);

  useEffect(() => {
    if (paused || !videoLoaded) return;

    timerRef.current = setInterval(() => {
      crossfade();
    }, 8000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, videoLoaded, crossfade]);

  const toggleVideo = () => {
    const activeRef = activeSlot === 'A' ? videoARef.current : videoBRef.current;
    if (!activeRef) return;
    if (paused) {
      activeRef.play();
      setPaused(false);
    } else {
      activeRef.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[480px] lg:min-h-[560px]">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Beautiful white marble kitchen interior"
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectPosition: 'center 40%' }}
        />
        <video
          ref={videoARef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${activeSlot === 'A' ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={heroVideos[0]} type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${activeSlot === 'B' ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,28,46,0.78) 0%, rgba(18,32,38,0.72) 50%, rgba(15,28,46,0.78) 100%)' }} />
      </div>

      {videoLoaded && (
        <button
          onClick={toggleVideo}
          className="absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white/70 hover:text-white rounded-full p-2 transition-all"
          aria-label={paused ? 'Play video' : 'Pause video'}
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-16 lg:py-20 text-center">
        <p className="text-sm font-semibold text-[#C6A969] mb-5 tracking-wide">
          ⭐⭐⭐⭐⭐ Rated &bull; Insured &amp; Bonded &bull; Montgomery, AL
        </p>

        <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.2] tracking-tight mb-4 text-white">
          Luxury Cleaning.<br />
          Done Right.
        </h1>

        <p className="text-white/90 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Reliable, polished results — every visit.
        </p>

        <div className="flex flex-col items-center">
          <a
            href="#instant-quote"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('instant-quote');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-[#C6A969] hover:bg-[#B8985A] hover:scale-[1.03] text-[#0f1c2e] px-10 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 max-w-[320px] w-full"
            data-testid="hero-get-quote"
          >
            Get Your Instant Quote →
          </a>
          <p className="text-white/70 text-[13px] mt-3">
            Takes 30 seconds &bull; No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
