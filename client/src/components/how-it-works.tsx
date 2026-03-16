import { useState } from 'react';
import { ClipboardList, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import { BookingModal } from './booking-modal';

const steps = [
  {
    icon: ClipboardList,
    title: 'Get Your Free Quote',
    description: 'Use our instant calculator or call us. Takes 60 seconds, no obligation.',
    color: 'from-emerald-500 to-emerald-600',
    detail: '60 seconds',
  },
  {
    icon: CalendarCheck,
    title: 'Pick Your Date & Time',
    description: 'Mornings, afternoons, weekends — even same-day. We fit your schedule.',
    color: 'from-teal-500 to-teal-600',
    detail: 'Flexible',
  },
  {
    icon: Sparkles,
    title: 'Relax & Enjoy',
    description: 'Our team arrives, cleans everything spotless, and you\'re done. Guaranteed.',
    color: 'from-emerald-500 to-emerald-600',
    detail: '100% guaranteed',
  },
];

export function HowItWorks() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="py-10 lg:py-14 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-900/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
              Booking Takes 3 Simple Steps
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              No contracts. No stress. Just a spotless space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-px bg-slate-200 dark:bg-slate-700 z-0">
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 absolute -right-2 -top-2" />
                    </div>
                  )}

                  <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10`}>
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-xs font-black shadow">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Now — It's Free to Start
            </button>
            <a href="/quote" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline text-sm">
              Or get an instant quote →
            </a>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  );
}
