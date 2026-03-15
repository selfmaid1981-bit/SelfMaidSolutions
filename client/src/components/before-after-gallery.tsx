import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryItems = [
  {
    id: 'kitchen',
    title: 'Kitchen Deep Clean',
    subtitle: 'From grease and grime to spotless and shining',
    beforeImage: '/assets/before-after/before-kitchen-dirty.svg',
    afterImage: '/assets/before-after/after-kitchen-clean.svg',
  },
  {
    id: 'bathroom',
    title: 'Bathroom Restoration',
    subtitle: 'Professional deep clean — tile, grout, and fixtures',
    beforeImage: '/assets/before-after/before-bathroom-dirty.svg',
    afterImage: '/assets/before-after/after-bathroom-clean.svg',
  },
  {
    id: 'livingroom',
    title: 'Living Room Revival',
    subtitle: 'Cluttered to clean — organized and refreshed',
    beforeImage: '/assets/before-after/before-livingroom-messy.svg',
    afterImage: '/assets/before-after/after-livingroom-clean.svg',
  },
];

export default function BeforeAfterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = galleryItems[activeIndex];

  const prev = () => setActiveIndex(i => (i === 0 ? galleryItems.length - 1 : i - 1));
  const next = () => setActiveIndex(i => (i === galleryItems.length - 1 ? 0 : i + 1));

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Real Results
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 font-serif">
            See the Self-Maid Difference
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real before and after transformations from homes we've cleaned across Central Alabama.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl group">
            <div className="grid grid-cols-2">
              <div className="relative">
                <img
                  src={item.beforeImage}
                  alt={`${item.title} - before cleaning`}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg">
                    Before
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={item.afterImage}
                  alt={`${item.title} - after cleaning by Self-Maid`}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-emerald-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg">
                    After
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 dark:text-white" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {item.subtitle}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'bg-blue-600 w-8' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-5 text-lg">
              Ready for a transformation like this in your home?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:3348779513"
                className="inline-flex items-center justify-center bg-slate-900 dark:bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                data-testid="gallery-cta-phone"
              >
                Call (334) 877-9513
              </a>
              <Link href="/quote">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl h-auto"
                  data-testid="gallery-cta-quote"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
