import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  const isAdminPage = location.startsWith('/admin') || location.startsWith('/checkout');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isAdminPage) return null;

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('instant-quote');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 70;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 flex flex-col gap-3 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <a
        href="tel:13348779513"
        className="flex items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
        style={{ background: 'white', color: '#1F2A37', width: '52px', height: '52px', fontSize: '18px', border: '1px solid #E5E7EB' }}
        aria-label="Call us"
      >
        📞
      </a>
      <a
        href="#instant-quote"
        className="flex items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
        style={{ background: '#C6A969', color: 'white', width: '52px', height: '52px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
        aria-label="Get a quote"
        onClick={scrollToQuote}
        data-testid="floating-book-btn"
      >
        Quote
      </a>
    </div>
  );
}
