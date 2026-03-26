'use strict';
/* ═══════════════════════════════════════════════════════════════
   script.js — Self-Maid Cleaning Solutions
   Config-driven · SaaS-ready · CleanOS™ Platform
═══════════════════════════════════════════════════════════════ */
const C = window.SITE_CONFIG || {};

// ── 1. Render Services Grid ─────────────────────────────────────
(function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid || !C.services) return;
  grid.innerHTML = C.services.map((s, i) => {
    const featured = s.id === 'deep';
    return `
    <article class="svc-card${featured ? ' featured' : ''}" aria-labelledby="svc-${s.id}">
      ${featured ? '<div class="popular-badge">MOST POPULAR</div>' : ''}
      <div class="svc-num" aria-hidden="true">0${i + 1}</div>
      <div class="svc-emoji" aria-hidden="true">${s.emoji}</div>
      <h3 id="svc-${s.id}" class="svc-name">${s.name}</h3>
      <div class="svc-price">From <strong>$${s.price}</strong></div>
      ${s.tag ? `<div class="svc-tag">${s.tag}</div>` : ''}
      <p class="svc-desc">${s.desc}</p>
      <a href="#contact" class="svc-cta" data-service="${s.id}">
        Book Now <span aria-hidden="true">→</span>
      </a>
    </article>`;
  }).join('');
})();

// ── 2. Populate service selects ─────────────────────────────────
(function populateSelects() {
  const id = 'f-service';
  const el = document.getElementById(id);
  if (!el || !C.services) return;
  C.services.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} — from $${s.price}`;
    el.appendChild(opt);
  });
})();

// ── 3. Estimate calculator ──────────────────────────────────────
function calcEst(svcId, beds, baths) {
  if (!svcId || !C.services) return null;
  const s = C.services.find(x => x.id === svcId);
  if (!s) return null;
  return s.price + (parseInt(beds) || 0) * s.bed + (parseInt(baths) || 1) * s.bath;
}

(function initCalc() {
  const svc  = document.getElementById('f-service');
  const bed  = document.getElementById('f-bed');
  const bath = document.getElementById('f-bath');
  const pill = document.getElementById('est-pill');
  const val  = document.getElementById('est-val');
  if (!svc) return;
  function update() {
    const est = calcEst(svc.value, bed?.value, bath?.value);
    if (pill) pill.hidden = !est;
    if (val && est) val.textContent = '$' + est;
  }
  [svc, bed, bath].forEach(el => el && el.addEventListener('change', update));
  // Pre-fill from service card CTA click
  document.addEventListener('click', e => {
    const cta = e.target.closest('[data-service]');
    if (!cta || !cta.dataset.service) return;
    if (svc) { svc.value = cta.dataset.service; update(); }
  });
})();

// ── 4. Reviews carousel ─────────────────────────────────────────
(function initReviews() {
  const track  = document.getElementById('reviews-track');
  const dotsEl = document.getElementById('reviews-dots');
  if (!track || !C.testimonials) return;
  const items = C.testimonials;
  let cur = 0, timer;

  track.innerHTML = items.map((t, i) => `
    <div class="review-card" role="listitem" aria-label="Review ${i+1} of ${items.length}">
      <div class="review-stars" aria-label="5 stars">★★★★★</div>
      <blockquote class="review-quote">"${t.quote}"</blockquote>
      <div class="review-author">${t.author} · ${t.location}</div>
      ${t.tag ? `<div class="review-tag">${t.tag}</div>` : ''}
    </div>`).join('');

  if (dotsEl) {
    dotsEl.innerHTML = items.map((_, i) => `
      <button class="rev-dot${i===0?' active':''}" role="tab"
        aria-selected="${i===0}" aria-label="Review ${i+1}"></button>`).join('');
    dotsEl.querySelectorAll('.rev-dot').forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  }

  function goTo(n) {
    cur = n;
    track.style.transform = `translateX(-${100 * n}%)`;
    dotsEl?.querySelectorAll('.rev-dot').forEach((d, i) => {
      d.classList.toggle('active', i === n);
      d.setAttribute('aria-selected', String(i === n));
    });
  }

  const startTimer = () => { timer = setInterval(() => goTo((cur + 1) % items.length), 5500); };
  const stopTimer  = () => clearInterval(timer);
  startTimer();
  track.parentElement?.addEventListener('mouseenter', stopTimer);
  track.parentElement?.addEventListener('mouseleave', startTimer);

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) dx < 0 ? goTo((cur + 1) % items.length) : goTo((cur - 1 + items.length) % items.length);
  });
})();

// ── 5. Render Areas ─────────────────────────────────────────────
(function renderAreas() {
  const grid   = document.getElementById('areas-grid');
  const footer = document.getElementById('footer-areas');
  if (!C.areas) return;
  if (grid) {
    grid.innerHTML = C.areas.map(a =>
      `<a href="/services/${a.slug}" class="area-chip">📍 ${a.name}, AL</a>`
    ).join('');
  }
  if (footer) {
    footer.innerHTML = '<h4>Service Areas</h4>' +
      C.areas.slice(0, 6).map(a => `<a href="/services/${a.slug}">${a.name}</a>`).join('');
  }
})();

// ── 6. Render FAQ ───────────────────────────────────────────────
(function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list || !C.faq) return;
  list.innerHTML = C.faq.map(f => `
    <details class="faq-item">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`).join('');
})();

// ── 7. Animated stat counters ───────────────────────────────────
(function initCounters() {
  const els = document.querySelectorAll('.stat-num[data-count]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => { el.textContent = el.dataset.count; }); return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = parseInt(el.dataset.count), dur = 1600;
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(el => obs.observe(el));
})();

// ── 8. Gold particle effect (canvas) ───────────────────────────
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container || !('IntersectionObserver' in window)) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;

  function resize() {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 10;
      this.vy   = -(Math.random() * .4 + .15);
      this.vx   = (Math.random() - .5) * .3;
      this.size = Math.random() * 1.5 + .5;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset();
    }
    draw() {
      const alpha = Math.min(this.life / 30, 1) * Math.min((this.maxLife - this.life) / 30, 1) * .5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,160,32,${alpha})`;
      ctx.fill();
    }
  }

  // Only run when hero is visible
  const heroEl = document.querySelector('.hero');
  let active = false;
  const obs = new IntersectionObserver(([e]) => {
    active = e.isIntersecting;
    if (active && !raf) loop();
  });
  if (heroEl) obs.observe(heroEl);

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function loop() {
    if (!active) { raf = null; return; }
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }
  if (heroEl) loop();
})();

// ── 9. Mobile nav ───────────────────────────────────────────────
(function initNav() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
  });
  nav.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false'); nav.hidden = true;
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !nav.hidden) {
      btn.setAttribute('aria-expanded', 'false'); nav.hidden = true; btn.focus();
    }
  });
})();

// ── 10. Smooth anchor scroll ────────────────────────────────────
(function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const h = (document.getElementById('site-header')?.offsetHeight || 74) +
                (document.querySelector('.top-bar')?.offsetHeight || 36);
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - h - 8, behavior: 'smooth' });
      t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true });
    });
  });
})();

// ── 11. Header shadow on scroll ─────────────────────────────────
(function initHeaderFX() {
  const h = document.getElementById('site-header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(0,0,0,.7), 0 0 60px rgba(201,160,32,.04)'
      : '0 2px 20px rgba(0,0,0,.4)';
  }, { passive: true });
})();

// ── 12. Quote form ──────────────────────────────────────────────
(function initForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const submitBtn = document.getElementById('submit-btn');
  const btnText   = document.getElementById('btn-text');
  const btnSpin   = document.getElementById('btn-spin');
  const successEl = document.getElementById('f-success');
  const errGlobal = document.getElementById('f-errg');

  const rules = {
    'f-name':  { required:true, min:2,   msg:'Please enter your full name.' },
    'f-phone': { required:true, pattern:/[\d\s\-().+]{7,}/, msg:'Please enter a valid phone number.' },
    'f-email': { required:true, pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg:'Please enter a valid email address.' }
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const rule  = rules[id];
    const errEl = input?.parentElement.querySelector('.ferr');
    if (!input || !rule) return true;
    let valid = true, msg = '';
    if (rule.required && !input.value.trim()) { valid = false; msg = rule.msg; }
    else if (rule.min && input.value.trim().length < rule.min) { valid = false; msg = rule.msg; }
    else if (rule.pattern && input.value.trim() && !rule.pattern.test(input.value.trim())) { valid = false; msg = rule.msg; }
    input.classList.toggle('invalid', !valid);
    if (errEl) errEl.textContent = valid ? '' : msg;
    return valid;
  }

  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(validateField).every(Boolean);
    if (!ok) { form.querySelector('.invalid')?.focus(); return; }

    submitBtn.disabled = true;
    if (btnText) btnText.hidden = true;
    if (btnSpin) btnSpin.hidden = false;
    if (successEl) successEl.hidden = true;
    if (errGlobal) { errGlobal.hidden = true; errGlobal.textContent = ''; }

    const payload = {
      name:     document.getElementById('f-name')?.value.trim(),
      email:    document.getElementById('f-email')?.value.trim(),
      phone:    document.getElementById('f-phone')?.value.trim(),
      service:  document.getElementById('f-service')?.value,
      bedrooms: document.getElementById('f-bed')?.value,
      bathrooms:document.getElementById('f-bath')?.value,
    };

    try {
      const res  = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
      const json = await res.json();
      if (json.success) {
        form.reset();
        const pill = document.getElementById('est-pill');
        if (pill) pill.hidden = true;
        if (successEl) { successEl.hidden = false; successEl.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
        if (typeof gtag === 'function') gtag('event','quote_request',{event_category:'lead',event_label:payload.service});
      } else {
        if (errGlobal) { errGlobal.textContent = json.message || 'Something went wrong. Please call us directly.'; errGlobal.hidden = false; }
      }
    } catch {
      if (errGlobal) { errGlobal.textContent = 'Network error. Please call ' + (C.phone || '(334) 877-9513') + '.'; errGlobal.hidden = false; }
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.hidden = false;
      if (btnSpin) btnSpin.hidden = true;
    }
  });
})();

// ── 13. Hide mobile CTA when contact visible ────────────────────
(function initCTABar() {
  const bar = document.getElementById('mobile-cta');
  const sec = document.getElementById('contact');
  if (!bar || !sec || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => {
    bar.style.opacity      = e.isIntersecting ? '0' : '1';
    bar.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
  }, { threshold:.2 }).observe(sec);
})();

// ── 14. Footer year + review links ──────────────────────────────
(function initFooter() {
  const yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();
  if (C.googleReviewUrl) {
    ['review-link','footer-review'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = C.googleReviewUrl;
    });
  }
  const pb = document.querySelector('.powered-by');
  if (pb && C.poweredBy) pb.textContent = `Powered by ${C.poweredBy}`;
})();

// ── 15. Lazy image polyfill ─────────────────────────────────────
(function initLazy() {
  if ('loading' in HTMLImageElement.prototype) return;
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length || !('IntersectionObserver' in window)) {
    imgs.forEach(img => { img.src = img.dataset.src; }); return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const img = en.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      obs.unobserve(img);
    });
  }, { rootMargin:'200px' });
  imgs.forEach(img => obs.observe(img));
})();
