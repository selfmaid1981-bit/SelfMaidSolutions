import { useState, useEffect } from 'react';
import { Calendar, X, Phone, ChevronUp } from 'lucide-react';
import { BookingModal } from './booking-modal';
import { useLocation } from 'wouter';

export function FloatingCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  const isAdminPage = location.startsWith('/admin') || location.startsWith('/checkout');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isAdminPage) return null;

  return (
    <>
      <div
        className={`fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {expanded && (
          <div className="flex flex-col gap-2 items-end animate-in slide-in-from-bottom-4 duration-200">
            <a
              href="tel:334-877-9513"
              className="flex items-center gap-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm hover:bg-[#C6A969]/5 hover:border-[#C6A969]/30 transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#C6A969]" />
              Call (334) 877-9513
            </a>
            <button
              onClick={() => { setIsBookingModalOpen(true); setExpanded(false); }}
              className="flex items-center gap-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm hover:bg-[#C6A969]/5 hover:border-[#C6A969]/30 transition-all whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#C6A969]" />
              Get a Quote
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="w-9 h-9 bg-white dark:bg-slate-700 text-slate-500 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-all border border-slate-200 dark:border-slate-600"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              if (!expanded) {
                setIsBookingModalOpen(true);
              } else {
                setExpanded(false);
              }
            }}
            onContextMenu={(e) => { e.preventDefault(); setExpanded(!expanded); }}
            className="relative group flex items-center gap-2.5 gold-bg text-[#1F2A37] px-6 py-4 rounded-2xl shadow-2xl shadow-amber-600/20 font-bold text-sm transition-all duration-300 hover:shadow-amber-600/40 hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Book cleaning now"
            data-testid="floating-book-btn"
          >
            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C6A969] rounded-full border-2 border-white animate-pulse" />
            <Calendar className="w-5 h-5 relative z-10" />
            <span className="relative z-10 font-extrabold tracking-wide">Book Now</span>
            <ChevronUp
              className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            />
          </button>
        </div>

        <div className="hidden sm:flex items-center justify-center">
          <span className="text-[10px] text-white/80 bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium tracking-wide">
            Free Quote · No Obligation
          </span>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
