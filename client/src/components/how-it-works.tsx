import { useState } from 'react';
import { ClipboardList, CalendarCheck, Sparkles, ArrowRight, Phone, Star } from 'lucide-react';
import { BookingModal } from './booking-modal';

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Get Your Free Quote',
    description: 'Use our instant calculator or call us. Tell us your service type, home size, and preferred schedule. No obligations.',
    color: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/30',
    detail: 'Takes 60 seconds',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Pick Your Date & Time',
    description: 'Choose a time that works for you — mornings, afternoons, weekends. Same-day appointments available!',
    color: 'from-teal-500 to-teal-600',
    glow: 'shadow-teal-500/30',
    detail: 'Flexible scheduling',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Relax & Enjoy',
    description: 'Our professional team arrives, does the job right, and leaves your space spotless. 100% satisfaction guaranteed.',
    color: 'from-emerald-500 to-emerald-600',
    glow: 'shadow-emerald-500/30',
    detail: '100% guaranteed',
  },
];

export function HowItWorks() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-5 py-2.5 rounded-full mb-5">
              <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
              <span className="text-blue-700 dark:text-blue-400 font-semibold text-sm tracking-wide">Simple 3-Step Process</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
              Booking is Easy as 1-2-3
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              No contracts. No hassle. Just a sparkling clean home or office — exactly when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-gradient-to-r from-slate-200 to-slate-200 dark:from-slate-700 dark:to-slate-700 z-0">
                      <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 absolute -right-2.5 -top-2.5" />
                    </div>
                  )}

                  <div className={`relative w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-5 shadow-xl ${step.glow} group-hover:scale-110 transition-transform duration-300 z-10`}>
                    <Icon className="w-9 h-9 text-white" />
                    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-xs font-black shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">{step.description}</p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-10 md:p-14 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Limited Availability This Week
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 font-serif">
                Ready for a Spotless Home?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join 500+ happy customers in Montgomery, Prattville, and across Central Alabama.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Book Now — It's Free to Start
                </button>
                <a
                  href="tel:334-877-9513"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/25 transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  Call (334) 877-9513
                </a>
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
