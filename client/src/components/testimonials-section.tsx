import { useState, useEffect, useCallback, useRef } from 'react';

const reviews = [
  { id: 1, stars: 5, quote: '"Self-Maid transformed my home. I\'ve tried other services, but nothing compares to their attention to detail. They treat my home like their own."', author: 'SARAH M.', tag: 'Montgomery, AL \u2014 Recurring Client' },
  { id: 2, stars: 5, quote: '"I was nervous about letting someone into my home, but Michelle and her team put me completely at ease. Professional, thorough, and always on time."', author: 'DAVID R.', tag: 'Prattville, AL \u2014 Deep Clean' },
  { id: 3, stars: 5, quote: '"As an Airbnb host, quick turnovers are essential. Self-Maid consistently delivers spotless results, often same-day. My guest ratings have never been higher."', author: 'JENNIFER K.', tag: 'Montgomery, AL \u2014 Airbnb Host' },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const go = useCallback((n: number) => { setIdx(n); }, []);
  const next = useCallback(() => setIdx(i => (i + 1) % reviews.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5500);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setIdx(i => (i + 1) % reviews.length);
      else setIdx(i => (i - 1 + reviews.length) % reviews.length);
      resetTimer();
    }
  };

  return (
    <section id="reviews" className="reviews-section section" aria-labelledby="reviews-h2">
      <div className="sm-container">
        <div className="section-intro">
          <div className="section-eyebrow">TESTIMONIALS</div>
          <h2 id="reviews-h2" className="section-title">What Our Clients Are <span className="gold-text">Saying</span></h2>
          <div className="section-divider-line"><span>&mdash; Real Reviews &mdash;</span></div>
        </div>

        <div className="reviews-track-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="reviews-track" ref={trackRef} style={{ transform: `translateX(-${idx * 100}%)` }} aria-live="polite">
            {reviews.map(r => (
              <div key={r.id} className="review-card" role="group" aria-roledescription="slide">
                <div className="review-stars" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }, (_, i) => <span key={i}>&#9733;</span>)}
                </div>
                <blockquote className="review-quote">{r.quote}</blockquote>
                <cite className="review-author">{r.author}</cite>
                <span className="review-tag">{r.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-dots" role="tablist" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`rev-dot${i === idx ? ' active' : ''}`}
              onClick={() => { go(i); resetTimer(); }}
              aria-label={`Go to review ${i + 1}`}
              aria-selected={i === idx}
              role="tab"
            />
          ))}
        </div>

        <div className="reviews-cta">
          <a href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL" target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">READ MORE ON GOOGLE &rarr;</a>
        </div>
      </div>
    </section>
  );
}
