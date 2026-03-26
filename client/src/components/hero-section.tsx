import { useEffect, useRef } from 'react';
import heroLogo from '@assets/hero-logo-transparent.png';
import heroBgImage from '@assets/684CD4DB-734B-4590-A13D-18C218898903_1774534125341.jpeg';

function GoldParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = 0, H = 0, raf = 0, active = true, visible = true;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    }

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0; size = 0; life = 0; maxLife = 0; sparkle = false;
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.vy = -(Math.random() * .5 + .1);
        this.vx = (Math.random() - .5) * .4;
        this.size = Math.random() * 2.5 + .5;
        this.life = 0;
        this.maxLife = Math.random() * 250 + 80;
        this.sparkle = Math.random() > .7;
      }
      update() {
        this.x += this.vx + Math.sin(this.life * .02) * .15;
        this.y += this.vy;
        this.life++;
        if (this.y < -10 || this.life > this.maxLife) this.reset();
      }
      draw() {
        const fade = Math.min(this.life / 25, 1) * Math.min((this.maxLife - this.life) / 25, 1);
        const flicker = this.sparkle ? (.6 + .4 * Math.sin(this.life * .15)) : 1;
        const alpha = fade * flicker * .7;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(232,191,74,${alpha})`);
        gradient.addColorStop(.5, `rgba(201,160,32,${alpha * .6})`);
        gradient.addColorStop(1, `rgba(154,116,16,0)`);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    const particles: Particle[] = [];
    for (let i = 0; i < 90; i++) particles.push(new Particle(true));

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && active) loop();
    }, { threshold: 0.1 });
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    function loop() {
      if (!active || !visible) return;
      ctx!.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />;
}

export function HeroSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerH = document.querySelector('.site-header')?.clientHeight || 74;
      const topBarH = document.querySelector('.top-bar')?.clientHeight || 36;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH - topBarH - 8, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-h1">
      <div className="hero-bg" aria-hidden="true">
        <img src={heroBgImage} alt="" className="hero-bg-image" loading="eager" />
        <div className="hero-bg-overlay" />
      </div>
      <div className="hero-particles-layer" aria-hidden="true">
        <GoldParticlesCanvas />
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hb-star" aria-hidden="true">&#9733;</span>
            LICENSED &middot; BONDED &middot; INSURED
            <span className="hb-star" aria-hidden="true">&#9733;</span>
          </div>
          <h1 id="hero-h1">
            <span className="h1-line1">Spotless Homes.</span>
            <span className="h1-line2">Zero Stress.</span>
          </h1>
          <p className="hero-sub">Premium cleaning that shows<br />up on time &mdash; every time.</p>
          <ul className="hero-checks" aria-label="Key selling points">
            <li><span className="chk" aria-hidden="true">&#10004;</span> Licensed, bonded, and insured</li>
            <li><span className="chk" aria-hidden="true">&#10004;</span> 100% satisfaction guaranteed</li>
            <li><span className="chk" aria-hidden="true">&#10004;</span> Serving Montgomery, AL &amp; surrounding areas</li>
          </ul>
          <div className="hero-actions">
            <button onClick={scrollToContact} className="btn btn-gold btn-lg gold-shimmer">GET A QUOTE</button>
            <span className="hero-or">Or Call</span>
            <a href="tel:3348779513" className="hero-phone-link gold-shimmer-text">(334) 877-9513</a>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <div className="hero-logo-wrap">
            <div className="hero-logo-glow" />
            <div className="hero-logo-sparkle s1" />
            <div className="hero-logo-sparkle s2" />
            <div className="hero-logo-sparkle s3" />
            <div className="hero-logo-sparkle s4" />
            <div className="hero-logo-sparkle s5" />
            <img src={heroLogo} alt="" className="hero-logo-img" width="600" height="500" loading="eager" />
          </div>
        </div>
      </div>

      <div className="hero-bottom-bar gold-shimmer-bar" aria-label="Quick stats">
        <div className="hbb-item"><strong>16+</strong> Years Experience</div>
        <div className="hbb-sep" aria-hidden="true" />
        <div className="hbb-item"><strong>500+</strong> Happy Clients</div>
        <div className="hbb-sep" aria-hidden="true" />
        <div className="hbb-item"><strong>5 &#9733;</strong> Google Rating</div>
        <div className="hbb-sep" aria-hidden="true" />
        <div className="hbb-item"><strong>7 Days</strong> a Week</div>
      </div>
    </section>
  );
}
