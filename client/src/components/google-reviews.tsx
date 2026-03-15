import { Star, ExternalLink, ThumbsUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FaGoogle } from 'react-icons/fa';
import mascotImg from '@assets/899188B8-841E-438D-B74D-E0D12D6EBD97_1773576264615.png';

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
];

export function GoogleReviews() {
  return (
    <section className="py-10 lg:py-14 relative overflow-hidden section-gradient-blue">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.6) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 shadow-xl px-6 py-3.5 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700 ring-1 ring-black/5 dark:ring-white/5">
            <FaGoogle className="w-6 h-6 flex-shrink-0" style={{ color: '#4285F4' }} />
            <span className="font-bold text-slate-800 dark:text-white">Google Reviews</span>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-600" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
              ))}
            </div>
            <span className="font-black text-slate-900 dark:text-white text-lg">5.0</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm">(500+)</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 font-serif">
            Real Reviews from Real Customers
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't take our word for it — see why 500+ customers across Alabama trust Self-Maid with their homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-200/70 dark:border-slate-700/40 bg-white/95 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-blue-200/60 dark:hover:border-blue-700/40"
              data-testid={`google-review-${index}`}
            >
              <div className="h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-teal-400/5 rounded-full group-hover:from-blue-400/10 group-hover:to-teal-400/10 transition-all duration-500 pointer-events-none" />
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
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Google Review</span>
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
          <div className="flex items-end gap-3">
            <img
              src={mascotImg}
              alt="Self-Maid mascot"
              className="w-16 h-16 object-contain drop-shadow-lg"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-md max-w-xs">
              <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                Join 500+ happy customers! Your spotless home is just one quote away.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white dark:bg-slate-800 border-2 border-[#4285F4] text-[#4285F4] dark:text-blue-400 px-8 py-4 rounded-xl font-bold hover:bg-[#4285F4] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-[#4285F4] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
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
      </div>
    </section>
  );
}
