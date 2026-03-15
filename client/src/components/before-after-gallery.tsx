import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import kitchenTransformation from '@assets/B9A64146-698F-4F2A-BBFE-AEAB05F156F0_1773576140460.png';
import livingRoomTransformation from '@assets/2938E6F8-CE88-4B25-B262-960A50D4D205_1773576140460.png';
import fourSceneTransformation from '@assets/CDC87EB7-1D3E-4319-A902-6BB13B68E8ED_1773576140460.png';
import dirtyBathroom from '@assets/stock_images/dirty_messy_bathroom_91e52294.jpg';
import cleanBathroom from '@assets/stock_images/sparkling_clean_bath_3ad4062e.jpg';

const galleryItems = [
  {
    id: 'kitchen-transformation',
    title: 'Kitchen Deep Clean',
    subtitle: 'Self-Maid Transformation — before & after magic',
    image: kitchenTransformation,
    isSplitImage: true,
  },
  {
    id: 'living-room-transformation',
    title: 'Living Room Revival',
    subtitle: 'From chaos to calm — the Self-Maid difference',
    image: livingRoomTransformation,
    isSplitImage: true,
  },
  {
    id: 'multi-room',
    title: 'Whole Home Transformations',
    subtitle: 'Kitchen, living room, bathroom & pet-friendly cleaning',
    image: fourSceneTransformation,
    isSplitImage: true,
  },
  {
    id: 'bathroom',
    title: 'Bathroom Restoration',
    subtitle: 'From grime to shine — professional deep clean',
    beforeImage: dirtyBathroom,
    afterImage: cleanBathroom,
    isSplitImage: false,
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
            Real before and after photos from homes we've cleaned across Central Alabama.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl group">
            {item.isSplitImage ? (
              <div className="relative">
                <img
                  src={item.image}
                  alt={`${item.title} before and after cleaning transformation`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={1200}
                  height={600}
                  data-testid="gallery-image-kitchen"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg">
                    Before
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-emerald-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide shadow-lg">
                    After
                  </span>
                </div>
              </div>
            ) : (
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
            )}

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
