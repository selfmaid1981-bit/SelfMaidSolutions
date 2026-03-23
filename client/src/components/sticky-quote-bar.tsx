import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

export function StickyQuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-quote-bar" data-testid="sticky-quote-bar">
      <div className="sticky-quote-inner">
        <span className="hidden sm:inline text-white/70 text-sm font-medium">
          Get your instant cleaning estimate
        </span>
        <button
          onClick={() => {
            const el = document.getElementById('instant-quote');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="sticky-quote-btn"
        >
          <Calculator className="w-4 h-4" />
          GET A QUOTE
        </button>
        <a
          href="tel:334-877-9513"
          className="text-white/50 hover:text-white text-sm transition-colors hidden md:inline"
        >
          (334) 877-9513
        </a>
      </div>
    </div>
  );
}
