import ownerPhoto from '@assets/808AA65C-8994-4D31-BAF3-4FDC2EC96722_1773873939311.png';

export function AboutSection() {
  return (
    <section id="about" className="py-14 lg:py-20 marble-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={ownerPhoto}
              alt="Michelle, Owner of Self-Maid Cleaning Solutions"
              className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2A37] mb-4 font-serif italic">
              Meet the Owner
            </h2>
            <div className="w-16 h-[2px] bg-[#C6A969] mb-6 mx-auto md:mx-0" />
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Hi, I'm Michelle. I built Self-Maid to deliver a level of clean
              that feels calm, consistent, and truly professional — every time.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              With 16+ years of experience and a team of trusted, background-checked
              professionals, we treat every home like our own. Your satisfaction
              isn't just a promise — it's our guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
