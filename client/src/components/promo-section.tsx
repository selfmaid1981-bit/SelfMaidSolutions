import { useState } from 'react';
import { Tag, Check, Phone, ArrowRight, Clock } from 'lucide-react';
import { BookingModal } from './booking-modal';

const perks = [
  'No contracts or commitments',
  'Fully insured & background-checked staff',
  'Eco-friendly, pet-safe products',
  '100% satisfaction guaranteed',
  'Free re-clean if you\'re not thrilled',
  'Flexible scheduling — even same-day',
];

export function PromoSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a5c 30%, #133547 60%, #0f4c5c 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-5 py-2.5 rounded-full mb-6">
                <Tag className="w-4 h-4" />
                <span className="font-bold text-sm tracking-wide">Limited Time Offer</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 font-serif leading-tight">
                First-Time Customers Save <span className="text-amber-400">15%</span> on Any Service
              </h2>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Ready to experience what Alabama's highest-rated cleaning team can do for your home or office? Book your first clean and we'll take 15% off. No promo code needed — just mention it when you call or book online.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Claim My 15% Off
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="tel:334-877-9513"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  (334) 877-9513
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center">
                    <Tag className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg">First Clean Discount</h3>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-slate-300">Regular Price</span>
                  <span className="text-slate-400 line-through text-lg">$150+</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-slate-300">First-Time Discount (15%)</span>
                  <span className="text-emerald-400 font-bold">-$22.50+</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-white font-bold text-lg">Your Price</span>
                  <span className="text-amber-400 font-black text-2xl">$127.50+</span>
                </div>
                <p className="text-slate-400 text-xs mt-3">*Based on standard residential cleaning. Exact savings depend on service selected.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                <Clock className="w-8 h-8 text-blue-300 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Same-Day & Next-Day Available</p>
                  <p className="text-slate-400 text-sm">Call before noon and we may be able to clean today!</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 rounded-2xl p-5">
                <p className="text-teal-200 font-semibold text-center text-sm uppercase tracking-wider mb-2">Offer Expires Soon</p>
                <p className="text-white text-center font-bold">Don't miss your chance to save — book this week!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
