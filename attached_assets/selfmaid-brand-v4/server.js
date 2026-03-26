// ─────────────────────────────────────────────────────────────
//  Self-Maid LLC – server.js
//  Full-stack Express server: security headers, gzip, contact API
// ─────────────────────────────────────────────────────────────
require('dotenv').config();
const express    = require('express');
const helmet     = require('helmet');
const compression = require('compression');
const rateLimit  = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security headers (FIX: was missing CSP, X-Frame, HSTS) ──
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https://maps.googleapis.com"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

// ── Gzip all responses (FIX: no compression detected on live site) ──
app.use(compression({ level: 6 }));

// ── Parse JSON bodies ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Aggressive static caching for assets (FIX: cache-control missing) ──
app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  maxAge: '1y', immutable: true
}));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts'), {
  maxAge: '1y', immutable: true
}));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders(res, filePath) {
    // HTML: no cache (always fresh)
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
    // CSS/JS: 1 week
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));

// ── Rate limiter for contact form (FIX: no spam protection existed) ──
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests. Please wait 15 minutes.' }
});

// ── Contact / Quote form API ──
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, service, message, bedrooms, bathrooms } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email and phone are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  // Calculate estimate if bedrooms/bathrooms provided
  const servicePrices = {
    'ongoing':    { base: 120, bedroom: 25, bathroom: 20 },
    'deep':       { base: 250, bedroom: 30, bathroom: 25 },
    'commercial': { base: 120, bedroom: 0,  bathroom: 20 },
    'rental':     { base:  65, bedroom: 15, bathroom: 15 },
    'moveinout':  { base: 150, bedroom: 25, bathroom: 20 },
    'apartment':  { base: 108, bedroom: 20, bathroom: 18 }
  };
  let estimate = '';
  if (service && bedrooms && servicePrices[service]) {
    const p = servicePrices[service];
    const total = p.base + (parseInt(bedrooms)||0)*p.bedroom + (parseInt(bathrooms)||0)*p.bathroom;
    estimate = `\nEstimated Quote: $${total}`;
  }

  // Email transport (uses env vars — see .env.example)
  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Email to business owner
    await transporter.sendMail({
      from:    `"Self-Maid Website" <${process.env.SMTP_USER}>`,
      to:      process.env.OWNER_EMAIL || 'selfmaidclean@outlook.com',
      subject: `New Quote Request – ${service || 'General'} from ${name}`,
      text: `
Name:    ${name}
Email:   ${email}
Phone:   ${phone}
Service: ${service || 'Not specified'}
Bedrooms:  ${bedrooms || 'N/A'}
Bathrooms: ${bathrooms || 'N/A'}
${estimate}

Message:
${message || 'No message provided.'}
      `.trim()
    });

    // Auto-reply to customer
    await transporter.sendMail({
      from:    `"Self-Maid Cleaning Solutions" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: 'We received your quote request! – Self-Maid LLC',
      html: `
<p>Hi ${name},</p>
<p>Thank you for contacting <strong>Self-Maid Cleaning Solutions</strong>!
We'll be in touch within a few hours to confirm your quote.</p>
${estimate ? `<p><strong>${estimate.trim()}</strong> (final price confirmed on call)</p>` : ''}
<p>Questions? Call or text us anytime:<br>
<strong><a href="tel:3348779513">(334) 877-9513</a></strong></p>
<p>— The Self-Maid Team</p>
      `
    });

    res.json({ success: true, message: 'Thank you! We\'ll be in touch within a few hours.' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ success: false, message: 'Could not send email. Please call us directly.' });
  }
});

// ── Structured data / sitemap ──
app.get('/sitemap.xml', (req, res) => {
  const urls = [
    '', '/services/montgomery-al', '/services/prattville-al',
    '/services/millbrook-al', '/services/wetumpka-al',
    '/services/selma-al', '/services/homewood-al',
    '/services/clanton-al', '/services/pike-road-al', '/services/alabaster-al'
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>https://selfmaidllc.com${u}</loc><changefreq>monthly</changefreq><priority>${u===''?'1.0':'0.8'}</priority></url>`).join('\n')}
</urlset>`;
  res.header('Content-Type', 'application/xml').send(xml);
});

// ── Catch-all: serve index.html (SPA fallback) ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`✅ Self-Maid server running on port ${PORT}`));
