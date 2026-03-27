import { useState, useEffect, useCallback, useRef } from 'react';

const reviews = [
  { id: 1, stars: 5, quote: '"Self-Maid transformed my home. I\'ve tried other services, but nothing compares to their attention to detail."', author: 'SARAH M.', tag: 'Montgomery, AL — Recurring Client' },
  { id: 2, stars: 5, quote: '"Michelle and her team put me completely at ease. Professional, thorough, and always on time."', author: 'DAVID R.', tag: 'Prattville, AL — Deep Clean' },
  { id: 3, stars: 5, quote: '"As an Airbnb host, quick turnovers are essential. Self-Maid consistently delivers spotless results."', author: 'JENNIFER K.', tag: 'Montgomery, AL — Airbnb Host' },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

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
          <p className="section-eyebrow">TESTIMONIALS</p>
          <h2 id="reviews-h2" className="section-title">What Our Clients Say</h2>
          <div className="section-divider" />
        </div>

        <div className="reviews-track-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="reviews-track" style={{ transform: `translateX(-${idx * 100}%)` }} aria-live="polite">
            {reviews.map(r => (
              <div key={r.id} className="review-card" role="group" aria-roledescription="slide">
                <div className="review-stars" aria-label={`${r.stars} out of 5 stars`}>
                  {'★'.repeat(r.stars)}
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
              onClick={() => { setIdx(i); resetTimer(); }}
              aria-label={`Go to review ${i + 1}`}
              aria-selected={i === idx}
              role="tab"
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sm-gold-dk)' }}
          >
            Read More on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
