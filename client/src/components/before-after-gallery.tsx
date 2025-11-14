import { Button } from '@/components/ui/button';
import kitchenTransformation from '@assets/IMG_1852_1763084552552.png';

export default function BeforeAfterGallery() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
            See the Difference
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real results from real homes in Montgomery, Alabama. This is the level of quality we deliver every single time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              <img
                src={kitchenTransformation}
                alt="Kitchen cleaning before and after - Montgomery Alabama"
                className="w-full h-auto object-cover"
                data-testid="gallery-image-kitchen"
              />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  BEFORE
                </span>
              </div>

              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  AFTER
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Kitchen Deep Clean Transformation
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              From cluttered and messy to spotless and organized - complete kitchen cleaning service in Montgomery
            </p>
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
