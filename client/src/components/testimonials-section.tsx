import { Star } from 'lucide-react';
import { getRotatingTestimonials } from '@/lib/dynamic-content';

export function TestimonialsSection() {
  const testimonials = getRotatingTestimonials();

  return (
    <section id="testimonials" className="py-24 lg:py-32" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <p className="section-label text-white/50 tracking-[4px]">TESTIMONIALS</p>
          <div className="editorial-divider-center" />
          <h2 className="font-bold text-white font-serif">
            What Our Clients <span className="italic gold-shine-text">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-8 rounded-2xl transition-all duration-500 hover:translate-y-[-2px] scroll-reveal"
              style={{ background: 'rgba(17,17,17,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
              data-testid={`testimonial-${testimonial.id}`}
            >
              <span className="editorial-quote-mark">&ldquo;</span>

              <div className="relative z-10">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#f5c542' }} />
                  ))}
                </div>

                <p className="text-white/60 text-sm leading-[1.8] mb-6 italic">
                  {testimonial.text}
                </p>

                <div className="pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="font-semibold text-white text-sm tracking-wide">{testimonial.author}</p>
                  <p className="text-[11px] text-white/30 tracking-wider uppercase mt-0.5">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
