import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Excellent service! My home has never looked better. They were thorough, professional, and I could tell they genuinely cared about doing a great job.",
    author: "Sarah L.",
    location: "Montgomery, AL",
  },
  {
    id: 2,
    text: "Professional and reliable. Highly recommended! They showed up on time, communicated clearly, and left everything spotless. Will definitely use again.",
    author: "James R.",
    location: "Prattville, AL",
  },
  {
    id: 3,
    text: "They helped me get my full deposit back when I moved out! The landlord was impressed. Best cleaning service in the area, hands down.",
    author: "David C.",
    location: "Selma, AL",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-14 lg:py-20" style={{ background: '#0a0a0d' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
            What Our Clients Are Saying
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-3" style={{ background: 'linear-gradient(90deg, #f5c542, #c89b2d)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-2xl transition-shadow hover:shadow-lg"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" style={{ color: '#f5c542' }} />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                "{testimonial.text}"
              </p>

              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                <p className="text-xs text-white/40">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
