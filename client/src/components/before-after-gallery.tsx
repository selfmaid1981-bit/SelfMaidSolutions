import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import kitchenBefore1 from '@assets/stock_images/messy_dirty_kitchen__d6fe30c0.jpg';
import kitchenAfter1 from '@assets/stock_images/spotless_clean_moder_9ef4ad4d.jpg';
import bathroomBefore1 from '@assets/stock_images/dirty_bathroom_befor_1f12c64e.jpg';
import bathroomAfter1 from '@assets/stock_images/sparkling_clean_bath_ddbff972.jpg';

interface BeforeAfterItem {
  before: string;
  after: string;
  title: string;
  description: string;
}

const galleryItems: BeforeAfterItem[] = [
  {
    before: kitchenBefore1,
    after: kitchenAfter1,
    title: 'Kitchen Deep Clean',
    description: 'From grimy to gleaming in just 2 hours'
  },
  {
    before: bathroomBefore1,
    after: bathroomAfter1,
    title: 'Bathroom Transformation',
    description: 'Spotless results you can see and feel'
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const currentItem = galleryItems[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    setShowAfter(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setShowAfter(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            See the Difference
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real results from real homes. This is the level of quality we deliver every single time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/9]">
              <img
                src={showAfter ? currentItem.after : currentItem.before}
                alt={showAfter ? `${currentItem.title} - After` : `${currentItem.title} - Before`}
                className="w-full h-full object-cover transition-opacity duration-300"
                data-testid={`gallery-image-${showAfter ? 'after' : 'before'}`}
              />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  {showAfter ? 'AFTER' : 'BEFORE'}
                </span>
              </div>

              <button
                onClick={() => setShowAfter(!showAfter)}
                className="absolute inset-0 cursor-pointer hover:bg-black/10 transition-colors group"
                aria-label={showAfter ? 'Show before photo' : 'Show after photo'}
                data-testid="toggle-before-after"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                    Click to see {showAfter ? 'BEFORE' : 'AFTER'}
                  </span>
                </div>
              </button>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <Button
                onClick={prevSlide}
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800"
                data-testid="gallery-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <Button
                onClick={nextSlide}
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800"
                data-testid="gallery-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {currentItem.title}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {currentItem.description}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowAfter(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`gallery-indicator-${index}`}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
              Ready for these results in your home?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:3348779513"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                data-testid="gallery-cta-phone"
              >
                📞 Call (334) 877-9513
              </a>
              <Button
                onClick={() => window.location.href = '/quote'}
                className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl h-auto"
                data-testid="gallery-cta-quote"
              >
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
