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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900 dark:to-sky-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-500 fill-yellow-600 dark:fill-yellow-500 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-400 font-bold">500+ Five-Star Reviews</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real reviews from real customers across Montgomery, Prattville, and Selma
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 relative overflow-hidden" 
              data-testid={`testimonial-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-blue-200 dark:text-blue-900 absolute top-4 right-4 opacity-50" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                    {testimonial.service}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Join 500+ Happy Customers!
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Experience the same 5-star service that keeps our customers coming back
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3348779513"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              data-testid="testimonials-cta-phone"
            >
              📞 Call (334) 877-9513
            </a>
            <a
              href="/quote"
              className="inline-flex items-center justify-center bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
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
