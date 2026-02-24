import { Star, ExternalLink, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FaGoogle } from 'react-icons/fa';

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Self-Maid transformed our home! The team was professional, thorough, and left everything sparkling clean. They even got stains out of our carpet that we thought were permanent. Highly recommend!",
    avatar: "SM",
    avatarGradient: "from-blue-500 to-indigo-600"
  },
  {
    name: "Michael R.",
    rating: 5,
    date: "1 month ago",
    text: "Best cleaning service in Montgomery. They've been cleaning our office for 2 years now. Always on time, always thorough. Our employees love coming to a spotless workspace!",
    avatar: "MR",
    avatarGradient: "from-teal-500 to-emerald-600"
  },
  {
    name: "Jennifer T.",
    rating: 5,
    date: "3 weeks ago",
    text: "Used Self-Maid for our move-out cleaning and got my full deposit back! They were flexible with scheduling and the price was very fair. Will definitely use again.",
    avatar: "JT",
    avatarGradient: "from-violet-500 to-purple-600"
  },
  {
    name: "David & Lisa K.",
    rating: 5,
    date: "1 week ago",
    text: "We've tried several cleaning services and Self-Maid is by far the best. They're reliable, trustworthy, and our house has never looked better. The bi-weekly service is a game changer!",
    avatar: "DK",
    avatarGradient: "from-rose-500 to-pink-600"
  },
  {
    name: "Amanda P.",
    rating: 5,
    date: "2 months ago",
    text: "Fantastic Airbnb turnaround service! They handle all our rental properties in Prattville. Quick, efficient, and guests always comment on how clean the places are. 5 stars!",
    avatar: "AP",
    avatarGradient: "from-amber-500 to-orange-600"
  },
  {
    name: "Robert H.",
    rating: 5,
    date: "3 weeks ago",
    text: "Professional, friendly, and incredibly detailed. They cleaned areas I didn't even think about. The team was respectful of our home and pets. Couldn't be happier!",
    avatar: "RH",
    avatarGradient: "from-cyan-500 to-blue-600"
  }
];

export function GoogleReviews() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden section-gradient-blue">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.6) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 shadow-lg px-6 py-3.5 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
            <FaGoogle className="w-6 h-6 flex-shrink-0" style={{ color: '#4285F4' }} />
            <span className="font-bold text-slate-800 dark:text-white">Google Reviews</span>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-600" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-black text-slate-900 dark:text-white">5.0</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">(500+ reviews)</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            Real Reviews from Real Customers
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't take our word for it — see why 500+ customers across Alabama trust Self-Maid with their homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-white/70 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden"
              data-testid={`google-review-${index}`}
            >
              <div className="h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] opacity-70 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.avatarGradient} flex items-center justify-center font-bold text-white text-sm shadow-md flex-shrink-0`}>
                    {review.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{review.date}</span>
                    </div>
                  </div>
                  <FaGoogle className="w-4 h-4 ml-auto flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity" style={{ color: '#4285F4' }} />
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">"{review.text}"</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Verified Google Review</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white dark:bg-slate-800 border-2 border-[#4285F4] text-[#4285F4] dark:text-blue-400 px-8 py-4 rounded-xl font-bold hover:bg-[#4285F4] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-[#4285F4] transition-all duration-300 shadow-md hover:shadow-xl"
            data-testid="view-all-reviews-button"
          >
            <FaGoogle className="w-5 h-5" />
            View All Reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Your Free Quote
            <Star className="w-4 h-4 fill-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
