import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Self-Maid Cleaning transformed my home! They were professional, thorough, and paid attention to every detail. My house has never looked better.",
    author: "Sarah Johnson",
    location: "Montgomery, AL",
    initials: "SJ",
    service: "Deep Cleaning",
    avatarGradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    text: "They helped me get my full deposit back when I moved out! The landlord was impressed with how spotless everything was. Worth every penny!",
    author: "David Chen",
    location: "Selma, AL",
    initials: "DC",
    service: "Move-Out Cleaning",
    avatarGradient: "from-teal-500 to-emerald-600"
  },
  {
    id: 3,
    text: "Same-day service saved me when I had last-minute guests coming! They arrived within hours and made my home look amazing. Will definitely use again!",
    author: "Robert Anderson",
    location: "Prattville, AL",
    initials: "RA",
    service: "Emergency Cleaning",
    avatarGradient: "from-violet-500 to-purple-600"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-10 lg:py-16 relative overflow-hidden section-gradient-teal">
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.5) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-10 right-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 px-5 py-2.5 rounded-full mb-5 shadow-sm">
            <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-400 font-bold text-sm tracking-wide">500+ Five-Star Reviews</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real reviews from real customers across Montgomery, Prattville, and Selma
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="group border border-white/70 dark:border-slate-700/40 bg-white/85 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden rounded-2xl" 
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-100 dark:text-blue-900/60 flex-shrink-0" />
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-[15px] italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 bg-gradient-to-br ${testimonial.avatarGradient} rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-700`}>
                      <span className="text-white font-bold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {testimonial.author}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-full border border-teal-100 dark:border-teal-800">
                    {testimonial.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50 dark:border-slate-700/50">
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Join 500+ Happy Customers!
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto">
            Experience the same 5-star service that keeps our customers coming back
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3348779513"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              data-testid="testimonials-cta-phone"
            >
              📞 Call (334) 877-9513
            </a>
            <a
              href="/quote"
              className="inline-flex items-center justify-center bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              data-testid="testimonials-cta-quote"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
