import { Shield, Leaf, CheckCircle, Award } from 'lucide-react';
import ownerPhoto from '@assets/808AA65C-8994-4D31-BAF3-4FDC2EC96722_1773873939311.png';

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

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-12">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-[#C6A969]/30 shadow-lg">
              <img
                src={ownerPhoto}
                alt="Michelle, Owner of Self-Maid Cleaning Solutions"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-[#1F2A37] mb-2 font-serif italic">
              Hi, I'm Michelle
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              With over 16 years of experience, I built Self-Maid on one simple promise: every home deserves a calm, thorough, and trustworthy clean. Our team treats your space like our own — because your peace of mind matters most.
            </p>
          </div>
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
