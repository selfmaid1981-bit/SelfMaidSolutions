import { Star, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FaGoogle } from 'react-icons/fa';

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Self-Maid transformed our home! The team was professional, thorough, and left everything sparkling clean. They even got stains out of our carpet that we thought were permanent. Highly recommend!",
    avatar: "SM"
  },
  {
    name: "Michael R.",
    rating: 5,
    date: "1 month ago",
    text: "Best cleaning service in Montgomery. They've been cleaning our office for 2 years now. Always on time, always thorough. Our employees love coming to a spotless workspace!",
    avatar: "MR"
  },
  {
    name: "Jennifer T.",
    rating: 5,
    date: "3 weeks ago",
    text: "Used Self-Maid for our move-out cleaning and got our full deposit back! They were flexible with scheduling and the price was very fair. Will definitely use again.",
    avatar: "JT"
  },
  {
    name: "David & Lisa K.",
    rating: 5,
    date: "1 week ago",
    text: "We've tried several cleaning services and Self-Maid is by far the best. They're reliable, trustworthy, and our house has never looked better. The bi-weekly service is a game changer!",
    avatar: "DK"
  },
  {
    name: "Amanda P.",
    rating: 5,
    date: "2 months ago",
    text: "Fantastic Airbnb turnaround service! They handle all our rental properties in Prattville. Quick, efficient, and guests always comment on how clean the places are. 5 stars!",
    avatar: "AP"
  },
  {
    name: "Robert H.",
    rating: 5,
    date: "3 weeks ago",
    text: "Professional, friendly, and incredibly detailed. They cleaned areas I didn't even think about. The team was respectful of our home and pets. Couldn't be happier!",
    avatar: "RH"
  }
];

export function GoogleReviews() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white shadow-md px-6 py-3 rounded-full mb-6">
            <FaGoogle className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg">Google Reviews</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-lg">5.0</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — see why 500+ customers across Alabama trust Self-Maid with their homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300" data-testid={`google-review-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{review.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300"
            data-testid="view-all-reviews-button"
          >
            <FaGoogle className="w-5 h-5" />
            View All Reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
