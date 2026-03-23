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
              style={{ border: '1px solid rgba(245,197,66,0.15)' }}
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-serif italic">
              Meet the Owner
            </h2>
            <div className="w-16 h-[2px] mb-6 mx-auto md:mx-0" style={{ background: 'linear-gradient(90deg, #f5c542, #c89b2d)' }} />
            <p className="text-white/80 text-base leading-relaxed mb-4">
              Hi, I'm Michelle. I built Self-Maid to deliver a level of clean
              that feels calm, consistent, and truly professional — every time.
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
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
