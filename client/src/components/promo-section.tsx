import { useState } from 'react';
import { Tag, ArrowRight, Phone } from 'lucide-react';
import { BookingModal } from './booking-modal';

export function PromoSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden deep-teal-bg">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 bg-amber-400/20 border border-amber-400/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-black text-lg leading-tight">
                  First-Time Customers Save <span className="text-amber-400">15%</span>
                </p>
                <p className="text-slate-300 text-sm">No promo code needed — just mention it when you book.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Claim My 15% Off
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:334-877-9513"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  );
}
