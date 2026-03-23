import ownerPhoto from '@assets/808AA65C-8994-4D31-BAF3-4FDC2EC96722_1773873939311.png';

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: '#0a0a0d' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="flex justify-center md:justify-start scroll-reveal-left">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl" style={{ background: 'radial-gradient(ellipse, rgba(245,197,66,0.04) 0%, transparent 70%)' }} />
              <img
                src={ownerPhoto}
                alt="Michelle, Owner of Self-Maid Cleaning Solutions"
                className="relative rounded-2xl w-full max-w-sm object-cover"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg px-4 py-3" style={{ background: 'rgba(10,10,13,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white text-sm font-semibold">Michelle</p>
                <p className="text-white/40 text-xs">Founder & Lead</p>
              </div>
            </div>
          </div>
          <div className="text-center md:text-left scroll-reveal-right">
            <p className="section-label text-white/50 tracking-[4px]">OUR STORY</p>
            <div className="editorial-divider hidden md:block" />
            <h2 className="font-bold text-white mb-6 font-serif">
              Meet the <span className="italic gold-shine-text">Owner</span>
            </h2>
            <p className="text-white/60 text-base leading-[1.8] mb-5">
              Hi, I'm Michelle. I built Self-Maid to deliver a level of clean
              that feels calm, consistent, and truly professional — every time.
            </p>
            <p className="text-white/40 text-sm leading-[1.8]">
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
