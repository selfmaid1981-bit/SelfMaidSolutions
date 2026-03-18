import { Shield, Leaf, CheckCircle, Award } from 'lucide-react';

const trustItems = [
  {
    icon: CheckCircle,
    title: 'Trusted Professionals',
    description: 'Background-checked, trained, and reliable cleaning experts.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Safe, non-toxic solutions for your family and pets.',
  },
  {
    icon: Award,
    title: 'Satisfaction Guaranteed',
    description: "Not happy? We'll re-clean at no extra charge.",
  },
  {
    icon: Shield,
    title: 'Insured & Bonded',
    description: 'Full coverage and peace of mind on every visit.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-14 lg:py-20 marble-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
            Why Choose Self-Maid
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center"
                data-testid={`trust-${index}`}
              >
                <div className="w-14 h-14 rounded-full bg-[#1F2A37]/5 flex items-center justify-center mb-3">
                  <Icon className="w-7 h-7 text-[#1F2A37]" />
                </div>
                <h3 className="text-sm font-bold text-[#1F2A37] mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[160px]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
