import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Self-Maid Cleaning transformed my home! They were professional, thorough, and paid attention to every detail. My house has never looked better.",
    author: "Sarah Johnson",
    location: "Montgomery, AL",
    initials: "SJ",
    service: "Deep Cleaning"
  },
  {
    id: 2,
    text: "Great service for our Airbnb property. Fast turnaround between guests and always spotless. They helped us maintain 5-star ratings. Highly recommend for property managers!",
    author: "Mike Thompson",
    location: "Prattville, AL",
    initials: "MT",
    service: "Airbnb Cleaning"
  },
  {
    id: 3,
    text: "Reliable office cleaning service. Our workplace has never been cleaner, and their team is always professional and trustworthy. Best decision we made for our business!",
    author: "Lisa Martinez",
    location: "Montgomery, AL",
    initials: "LM",
    service: "Commercial Cleaning"
  },
  {
    id: 4,
    text: "They helped me get my full deposit back when I moved out! The landlord was impressed with how spotless everything was. Worth every penny!",
    author: "David Chen",
    location: "Selma, AL",
    initials: "DC",
    service: "Move-Out Cleaning"
  },
  {
    id: 5,
    text: "I was skeptical at first, but after 16 years in business they clearly know what they're doing. My elderly mother's home sparkles and she feels safe with their team.",
    author: "Jennifer Williams",
    location: "Montgomery, AL",
    initials: "JW",
    service: "Residential Cleaning"
  },
  {
    id: 6,
    text: "Same-day service saved me when I had last-minute guests coming! They arrived within hours and made my home look amazing. Will definitely use again!",
    author: "Robert Anderson",
    location: "Prattville, AL",
    initials: "RA",
    service: "Emergency Cleaning"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 dark:from-slate-900 dark:via-sky-950 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14 stagger-in">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="group border border-white/60 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden rounded-2xl" 
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-7">
                <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900/60 absolute top-5 right-5" />
                
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-sm" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-[15px]">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white font-bold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {testimonial.author}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
                    {testimonial.service}
                  </div>
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
