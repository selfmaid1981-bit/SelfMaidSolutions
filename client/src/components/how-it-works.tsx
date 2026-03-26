import { ClipboardList, CalendarCheck, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Get Your Instant Quote',
    description: 'Tell us about your space and receive a transparent price in seconds.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Schedule Your Cleaning',
    description: 'Pick the date and time that works best for your life.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Relax & Enjoy',
    description: 'We handle every detail while you enjoy a spotless home.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-label text-white/50 tracking-[4px]">THE PROCESS</p>
          <div className="editorial-divider-center" />
          <h2 className="font-bold text-white font-serif">
            How It <span className="italic" style={{ color: '#c9a020' }}>Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center group">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] right-[-40%] z-0">
                    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(201,160,32,0.15), transparent)' }} />
                  </div>
                )}

                <div className="relative z-10 mb-6">
                  <span className="block text-xs font-mono tracking-widest mb-3" style={{ color: 'rgba(201,160,32,0.4)' }}>{step.number}</span>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105" style={{ background: 'rgba(201,160,32,0.06)', border: '1px solid rgba(201,160,32,0.12)' }}>
                    <Icon className="w-7 h-7" style={{ color: '#c9a020' }} />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 max-w-[240px] leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
      </div>
    </section>
  );
}
