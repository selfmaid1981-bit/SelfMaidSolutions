import { useState, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const serviceOptions = [
  { value: '', label: 'Select a service\u2026' },
  { value: 'ongoing', label: 'Regular Home Cleaning \u2014 from $120' },
  { value: 'deep', label: 'Deep Cleaning \u2014 from $250' },
  { value: 'moveinout', label: 'Move-In / Move-Out \u2014 from $150' },
  { value: 'rental', label: 'Airbnb Turnover \u2014 from $65' },
  { value: 'commercial', label: 'Commercial & Office \u2014 from $120' },
  { value: 'apartment', label: 'Apartment Turnover \u2014 from $108' },
];

const priceMap: Record<string, { base: number; bed: number; bath: number }> = {
  ongoing:    { base: 120, bed: 25, bath: 20 },
  deep:       { base: 250, bed: 30, bath: 25 },
  moveinout:  { base: 150, bed: 25, bath: 20 },
  rental:     { base: 65,  bed: 15, bath: 15 },
  commercial: { base: 120, bed: 0,  bath: 20 },
  apartment:  { base: 108, bed: 20, bath: 18 },
};

export function ContactSection() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('service');
    const q = params.get('quote');
    if (s) {
      setService(s);
      if (q) setMessage(`I received a quote of $${q} for ${s} and would like to proceed with booking.`);
    }
  }, []);

  const estimate = useMemo(() => {
    if (!service || !priceMap[service]) return null;
    const p = priceMap[service];
    const b = parseInt(beds) || 0;
    const ba = parseInt(baths) || 0;
    return p.base + (b * p.bed) + (ba * p.bath);
  }, [service, beds, baths]);

  const contactMutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; email: string; phone: string | null; serviceType: string; message: string | null }) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({ title: 'Message Sent!', description: "Thank you! We'll get back to you within 24 hours." });
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message || 'Failed to send. Please try again.', variant: 'destructive' });
    },
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required';
    if (!service) errs.service = 'Please select a service';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    let msg = message || '';
    if (estimate) msg = `Estimated quote: $${estimate}. ${msg}`;
    contactMutation.mutate({
      firstName,
      lastName,
      email,
      phone: phone || null,
      serviceType: service,
      message: msg || null,
    });
  };

  return (
    <section id="contact" className="contact-section section" aria-labelledby="contact-h2">
      <div className="sm-container">
        <div className="section-intro">
          <div className="section-eyebrow">CONTACT</div>
          <h2 id="contact-h2" className="section-title">Get Your <span className="gold-text">Free Quote</span></h2>
          <div className="section-divider-line"><span>&mdash; No Obligation &mdash;</span></div>
        </div>
        <div className="contact-grid">
          <div>
            <p className="contact-body">
              Ready to experience the Self-Maid difference? Fill out the form and we'll
              respond within 24 hours with a detailed, no-obligation quote.
              Prefer to talk? Call us anytime.
            </p>
            <div className="contact-items">
              <a href="tel:3348779513" className="ci">
                <span className="ci-ic" aria-hidden="true">&#128222;</span>
                <div><strong>(334) 877-9513</strong><small>Mon-Sat, 8am-6pm</small></div>
              </a>
              <a href="mailto:selfmaidclean@outlook.com" className="ci">
                <span className="ci-ic" aria-hidden="true">&#9993;&#65039;</span>
                <div><strong>selfmaidclean@outlook.com</strong><small>We reply within 24 hours</small></div>
              </a>
              <a href="https://www.google.com/maps/search/Self-Maid+Cleaning+Solutions+Montgomery+AL" target="_blank" rel="noopener noreferrer" className="ci">
                <span className="ci-ic" aria-hidden="true">&#128205;</span>
                <div><strong>Montgomery, AL</strong><small>Serving Central Alabama</small></div>
              </a>
            </div>
          </div>

          <div className="form-panel" id="instant-quote">
            <div className="fp-header">
              <div className="fp-title">Request a Quote</div>
              <div className="fp-sub">FREE &middot; NO OBLIGATION &middot; 24-HR RESPONSE</div>
            </div>
            {submitted ? (
              <div className="quote-form">
                <div className="f-success">
                  &#10004; <strong>Thank you!</strong> Your request has been received.
                  We'll get back to you within 24 hours with a detailed quote.
                  <br />Need faster service? <a href="tel:3348779513">Call (334) 877-9513</a>
                </div>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit} data-testid="contact-form" noValidate>
                <div className="form-row">
                  <div className="fg">
                    <label htmlFor="f-name">NAME <span className="req">*</span></label>
                    <input id="f-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className={errors.name ? 'invalid' : ''} data-testid="input-name" />
                    <span className="ferr">{errors.name || ''}</span>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-email">EMAIL <span className="req">*</span></label>
                    <input id="f-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={errors.email ? 'invalid' : ''} data-testid="input-email" />
                    <span className="ferr">{errors.email || ''}</span>
                  </div>
                </div>
                <div className="fg">
                  <label htmlFor="f-phone">PHONE</label>
                  <input id="f-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(334) 000-0000" data-testid="input-phone" />
                </div>
                <div className="fg">
                  <label htmlFor="f-service">SERVICE <span className="req">*</span></label>
                  <select id="f-service" value={service} onChange={e => setService(e.target.value)} className={errors.service ? 'invalid' : ''} data-testid="select-serviceType">
                    {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <span className="ferr">{errors.service || ''}</span>
                </div>
                <div className="form-row">
                  <div className="fg">
                    <label htmlFor="f-beds">BEDROOMS</label>
                    <select id="f-beds" value={beds} onChange={e => setBeds(e.target.value)}>
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={String(n)}>{n}</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label htmlFor="f-baths">BATHROOMS</label>
                    <select id="f-baths" value={baths} onChange={e => setBaths(e.target.value)}>
                      <option value="">Select</option>
                      {[1, 2, 3, 4].map(n => <option key={n} value={String(n)}>{n}</option>)}
                    </select>
                  </div>
                </div>
                {estimate !== null && (
                  <div className="est-pill">
                    <span>ESTIMATED QUOTE</span>
                    <strong>${estimate}</strong>
                  </div>
                )}
                <div className="fg">
                  <label htmlFor="f-msg">MESSAGE</label>
                  <textarea id="f-msg" rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Anything else we should know?" data-testid="textarea-message" />
                </div>
                <button type="submit" className="btn btn-gold btn-full" disabled={contactMutation.isPending} data-testid="button-submit">
                  {contactMutation.isPending ? 'SENDING\u2026' : 'GET MY FREE QUOTE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
