import { useState, useRef } from 'react';

interface HeroVideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  fallbackImageSrc?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
}

export function HeroVideoBackground({
  videoSrc = '/assets/video/clean-home-hero.mp4',
  posterSrc,
  fallbackImageSrc = '/assets/hero/hero-clean-home.png',
  overlayOpacity = 0.6,
  children,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const showVideo = videoSrc && !videoError;
  const showFallback = !showVideo || !videoLoaded;

  return (
    <div className="relative overflow-hidden">
      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        />
      )}

      {showFallback && fallbackImageSrc && (
        <img
          src={fallbackImageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 bg-[#1F2A37]"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
