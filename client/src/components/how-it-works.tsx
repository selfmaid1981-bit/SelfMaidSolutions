import { ClipboardList, CalendarCheck, Sparkles, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '1',
    title: 'Get a Quote',
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
    <section className="py-14 lg:py-20 marble-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
            How It Works
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] z-0">
                    <div className="h-px bg-[#C6A969]/30 w-full" />
                    <ChevronRight className="w-4 h-4 text-[#C6A969]/50 absolute -right-2 -top-2" />
                  </div>
                )}

                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 bg-white border-2 border-[#C6A969]/30 rounded-2xl flex items-center justify-center shadow-sm">
                    <Icon className="w-7 h-7 text-[#1F2A37]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#C6A969] text-white rounded-full flex items-center justify-center text-xs font-black shadow">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1F2A37] mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
