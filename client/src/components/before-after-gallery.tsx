import beforeAfterKitchen from '@assets/IMG_1852_1773888845939.png';
import afterKitchen from '@assets/IMG_0599_1773888652538.jpeg';
import afterKitchen2 from '@assets/att.8e7fYRKunZ706dZ8V_Z2PmSu1QzcZZ7BCW6xoPjGJ7s_1773888845939.jpeg';

export default function BeforeAfterGallery() {
  return (
    <section className="py-14 lg:py-20 marble-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
            See the Real Difference
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
          <p className="text-gray-600 mt-3 text-sm">Real results from real Self-Maid clients</p>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={beforeAfterKitchen}
              alt="Kitchen before and after Self-Maid cleaning — messy countertops transformed to spotless"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
              <img
                src={afterKitchen}
                alt="Spotless kitchen after Self-Maid cleaning"
                className="w-full h-56 sm:h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3">
                <span className="inline-block bg-[#C6A969] text-[#1F2A37] text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                  After
                </span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
              <img
                src={afterKitchen2}
                alt="Clean kitchen with navy cabinets after Self-Maid cleaning"
                className="w-full h-56 sm:h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3">
                <span className="inline-block bg-[#C6A969] text-[#1F2A37] text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                  After
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
