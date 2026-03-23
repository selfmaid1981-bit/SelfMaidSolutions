import { ClipboardList, CalendarCheck, Sparkles, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '1',
    title: 'Get Your Instant Quote',
    description: 'Request a fast, free estimate.',
  },
  {
    icon: CalendarCheck,
    number: '2',
    title: 'Schedule Your Cleaning',
    description: 'Choose your preferred date & time.',
  },
  {
    icon: Sparkles,
    number: '3',
    title: 'Relax & Enjoy',
    description: 'We handle the rest while you unwind.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 lg:py-20" style={{ background: '#0a0a0d' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
            How It Works
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-3" style={{ background: 'linear-gradient(90deg, #f5c542, #c89b2d)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] z-0">
                    <div className="h-px w-full" style={{ background: 'rgba(245,197,66,0.2)' }} />
                    <ChevronRight className="w-4 h-4 absolute -right-2 -top-2" style={{ color: 'rgba(245,197,66,0.4)' }} />
                  </div>
                )}

                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: '#111111', border: '2px solid rgba(245,197,66,0.2)' }}>
                    <Icon className="w-7 h-7" style={{ color: '#f5c542' }} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow" style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}>
                    {step.number}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/50 max-w-[200px]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
