const galleryPairs = [
  {
    id: 'kitchen',
    beforeImage: '/assets/before-after/before-kitchen-dirty.png',
    afterImage: '/assets/before-after/after-kitchen-clean.jpg',
    beforeAlt: 'Kitchen before cleaning',
    afterAlt: 'Kitchen after Self-Maid cleaning',
  },
  {
    id: 'bathroom',
    beforeImage: '/assets/before-after/before-bathroom-dirty.png',
    afterImage: '/assets/before-after/after-bathroom-clean.png',
    beforeAlt: 'Bathroom before cleaning',
    afterAlt: 'Bathroom after Self-Maid cleaning',
  },
];

export default function BeforeAfterGallery() {
  return (
    <section className="py-14 lg:py-20 marble-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] font-serif italic">
            See the Difference
          </h2>
          <div className="w-24 h-[2px] bg-[#C6A969] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryPairs.map((pair) => (
            <div key={pair.id} className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <div className="relative">
                <img
                  src={pair.beforeImage}
                  alt={pair.beforeAlt}
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-[#1F2A37] text-white text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                    Before
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={pair.afterImage}
                  alt={pair.afterAlt}
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute bottom-3 right-3">
                  <span className="inline-block bg-[#C6A969] text-[#1F2A37] text-xs font-bold px-4 py-1.5 rounded-sm shadow-md">
                    After
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
