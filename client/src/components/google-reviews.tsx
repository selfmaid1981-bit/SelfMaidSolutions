import { Star, ExternalLink, ThumbsUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FaGoogle } from 'react-icons/fa';

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Self-Maid transformed our home! The team was professional, thorough, and left everything sparkling clean. They even got stains out of our carpet that we thought were permanent. Highly recommend!",
    avatar: "SM",
    avatarGradient: "from-[#1F2A37] to-[#2D3F52]"
  },
  {
    name: "Michael R.",
    rating: 5,
    date: "1 month ago",
    text: "Best cleaning service in Montgomery. They've been cleaning our office for 2 years now. Always on time, always thorough. Our employees love coming to a spotless workspace!",
    avatar: "MR",
    avatarGradient: "from-[#2D3F52] to-[#1F2A37]"
  },
  {
    name: "Jennifer T.",
    rating: 5,
    date: "3 weeks ago",
    text: "Used Self-Maid for our move-out cleaning and got my full deposit back! They were flexible with scheduling and the price was very fair. Will definitely use again.",
    avatar: "JT",
    avatarGradient: "from-violet-500 to-[#1F2A37]"
  },
];

export function GoogleReviews() {
  return (
    <section className="py-10 lg:py-14 relative overflow-hidden section-gradient-blue">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(198,169,105,0.6) 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm shadow-xl px-6 py-3.5 rounded-2xl mb-6 border border-[#C6A969]/20">
            <FaGoogle className="w-6 h-6 flex-shrink-0" style={{ color: '#4285F4' }} />
            <span className="font-bold text-white">Google Reviews</span>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
              ))}
            </div>
            <span className="font-black text-white text-lg">5.0</span>
            <span className="text-white/60 text-sm">(500+)</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3 font-serif">
            Real Reviews from Real Customers
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            Don't take our word for it — see why 500+ customers across Alabama trust Self-Maid with their homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-200/70 dark:border-slate-700/40 bg-white/95 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-[#C6A969]/30 dark:hover:border-[#C6A969]/20"
              data-testid={`google-review-${index}`}
            >
              <div className="h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-[#C6A969]/5 to-[#1F2A37]/5 rounded-full group-hover:from-[#C6A969]/10 group-hover:to-[#1F2A37]/10 transition-all duration-500 pointer-events-none" />
                <div className="flex items-start gap-3 mb-4 relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${review.avatarGradient} flex items-center justify-center font-bold text-white text-sm shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ring-2 ring-white/50 dark:ring-slate-700/50`}>
                    {review.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate mb-0.5">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{review.date}</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-600 shadow-sm group-hover:shadow-md transition-shadow">
                    <FaGoogle className="w-4 h-4" style={{ color: '#4285F4' }} />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">"{review.text}"</p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <ThumbsUp className="w-3.5 h-3.5 text-[#C6A969]" />
                    <span className="text-[#1F2A37] dark:text-[#C6A969] font-medium">Verified Google Review</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Shield className="w-3 h-3" />
                    <span>Authentic</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-5">
            <img
              src="/assets/reviews/happy-homeowner.svg"
              alt="Happy homeowner relaxing in a clean home"
              className="w-20 h-20 object-cover rounded-2xl shadow-lg"
              loading="lazy"
              width={80}
              height={80}
            />
            <div className="bg-white/10 backdrop-blur-sm border border-[#C6A969]/20 rounded-2xl rounded-bl-sm px-5 py-3 shadow-md max-w-xs">
              <p className="text-white/90 text-sm font-medium">
                Join 500+ happy customers! Your spotless home is just one quote away.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border-2 border-[#C6A969]/40 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C6A969]/20 hover:border-[#C6A969] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              data-testid="view-all-reviews-button"
            >
              <FaGoogle className="w-5 h-5" />
              View All Reviews on Google
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/quote"
              className="inline-flex items-center gap-2 gold-bg text-[#1F2A37] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Your Free Quote
              <Star className="w-4 h-4 fill-[#1F2A37]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
