import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    text: "Self-Maid Cleaning transformed my home! They were professional, thorough, and paid attention to every detail. I couldn't be happier with the service.",
    author: "Sarah Johnson",
    location: "Birmingham, AL",
    initials: "SJ"
  },
  {
    id: 2,
    text: "Great service for our Airbnb property. Fast turnaround between guests and always spotless. Highly recommend for property managers!",
    author: "Mike Thompson",
    location: "Montgomery, AL",
    initials: "MT"
  },
  {
    id: 3,
    text: "Reliable office cleaning service. Our workplace has never been cleaner, and their team is always professional and trustworthy.",
    author: "Lisa Martinez",
    location: "Huntsville, AL",
    initials: "LM"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">Don't just take our word for it - hear from satisfied customers across Alabama</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-border" data-testid={`testimonial-${testimonial.id}`}>
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold text-sm">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
