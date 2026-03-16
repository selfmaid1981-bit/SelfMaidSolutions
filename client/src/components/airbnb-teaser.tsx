import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Key, TrendingUp, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';

export function AirbnbTeaser() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-teal-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Key className="w-4 h-4" /> Airbnb & Vacation Rental Hosts
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Boost Your Ratings.<br />
              <span className="text-teal-400">Fill More Nights.</span>
            </h2>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Guests rate cleanliness as the #1 factor in their review. Self-Maid specializes in same-day Airbnb turnovers in Montgomery and Prattville — so your listing stays 5-star ready, every checkout.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Same-day turnovers guaranteed',
                'Inspection reports after every clean',
                'Linen change & guest essential restock',
                'Starting at just $65 per turnover'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/airbnb-cleaning">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-5">
                  Learn About Airbnb Cleaning <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-5">
                  Get Turnover Quote
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
              <TrendingUp className="w-8 h-8 text-teal-400 mb-3" />
              <div className="text-2xl font-extrabold text-white mb-1">4.9★</div>
              <p className="text-gray-300 text-sm">Average guest cleanliness rating for our Airbnb clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
              <Clock className="w-8 h-8 text-amber-400 mb-3" />
              <div className="text-2xl font-extrabold text-white mb-1">Same Day</div>
              <p className="text-gray-300 text-sm">Turnover service — ready before your next guest checks in</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
              <Star className="w-8 h-8 text-amber-400 mb-3" />
              <div className="text-2xl font-extrabold text-white mb-1">5-Star</div>
              <p className="text-gray-300 text-sm">Inspection reports document every turnover for your protection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
              <Key className="w-8 h-8 text-teal-400 mb-3" />
              <div className="text-2xl font-extrabold text-white mb-1">$65+</div>
              <p className="text-gray-300 text-sm">Starting price for Airbnb turnover cleaning per visit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
