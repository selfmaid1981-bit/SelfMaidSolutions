import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  sqFtServiceTypes as serviceTypes,
  homepageFrequencyOptions as frequencyOptions,
  estimateSqFt,
  calculateQuotePrice,
  cleanTypeTiers,
  type CleanType,
} from '@/lib/services';

export function HomepageQuoteCalculator() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [serviceType, setServiceType] = useState('residential');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [pets, setPets] = useState('no');
  const [frequency, setFrequency] = useState('onetime');
  const [cleanType, setCleanType] = useState<CleanType>('premium');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'calc' | 'info'>('calc');

  const selectedService = serviceTypes.find(s => s.value === serviceType);
  const selectedFrequency = frequencyOptions.find(f => f.value === frequency) || frequencyOptions[0];
  const selectedTier = cleanTypeTiers.find(t => t.value === cleanType);

  const estimatedSqFt = useMemo(() => {
    const sqFtInput = parseInt(sqft) || 0;
    if (sqFtInput > 0) return sqFtInput;
    return estimateSqFt(parseInt(bedrooms) || 0, parseFloat(bathrooms) || 0);
  }, [bedrooms, bathrooms, sqft]);

  useEffect(() => {
    const sqFtVal = parseInt(sqft) || estimatedSqFt;
    if (sqFtVal > 3000) setCleanType('deep');
  }, [sqft, estimatedSqFt]);

  const price = useMemo(() => {
    return calculateQuotePrice({
      serviceType,
      customSqFt: sqft || (estimatedSqFt > 0 ? String(estimatedSqFt) : ''),
      frequency,
      selectedAddOns: [],
      bedrooms,
      bathrooms,
      pets,
      cleanType,
    });
  }, [serviceType, sqft, estimatedSqFt, frequency, bedrooms, bathrooms, pets, cleanType]);

  const sizeLabel = sqft
    ? `${sqft} sq ft`
    : estimatedSqFt > 0
      ? `~${estimatedSqFt} sq ft (${bedrooms || 0} bed / ${bathrooms || 0} bath)`
      : null;

  const saveQuoteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/quotes', {
        name,
        email,
        phone: phone || null,
        serviceType: `${selectedTier?.label || 'Premium'} ${selectedService?.label || serviceType}`,
        propertySize: sizeLabel,
        customSqFt: estimatedSqFt || null,
        frequency: selectedFrequency.label,
        addOns: pets === 'yes' ? ['Pet Surcharge'] : [],
        estimatedPrice: price,
      });
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Quote Saved!", description: "Check your email for details." });
      const params = new URLSearchParams({
        quoteId: data.quoteId || 'q-' + Date.now().toString(36),
        serviceType: selectedService?.label || '',
        estimatedPrice: price.toString(),
        quoteName: name,
        quoteEmail: email,
        quotePhone: phone,
        frequency: selectedFrequency.label,
        propertySize: sizeLabel || '',
        bedrooms: bedrooms || '',
        bathrooms: bathrooms || '',
      });
      if (pets === 'yes') params.set('pets', 'yes');
      setLocation(`/booking?${params.toString()}`);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to save quote.", variant: "destructive" });
    },
  });

  const handleContinue = () => {
    if (!serviceType || estimatedSqFt <= 0) {
      toast({ title: "Missing Details", description: "Please select a service and enter your home size.", variant: "destructive" });
      return;
    }
    setStep('info');
  };

  const handleSubmit = () => {
    if (!name || !email) {
      toast({ title: "Missing Info", description: "Please provide your name and email.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    saveQuoteMutation.mutate();
  };

  const handleSeeFullQuote = () => {
    const params = new URLSearchParams();
    if (serviceType) params.set('service', serviceType);
    if (bedrooms) params.set('beds', bedrooms);
    if (bathrooms) params.set('baths', bathrooms);
    if (sqft) params.set('sqft', sqft);
    setLocation(`/quote?${params.toString()}`);
  };

  const inputCls = "w-full border border-[var(--sm-border)] bg-[var(--sm-cream)] rounded-lg px-4 py-3 text-sm text-[var(--sm-navy)] placeholder:text-[var(--sm-gray-lt)] focus:outline-none focus:ring-2 focus:ring-[var(--sm-gold)]/30 focus:border-[var(--sm-gold)] transition-colors";
  const selectCls = inputCls + " appearance-none";

  return (
    <section className="section" id="instant-quote" style={{ background: 'var(--sm-white)' }}>
      <div style={{ maxWidth: '540px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-intro">
          <p className="section-eyebrow">PRICING</p>
          <h2 className="section-title">Get Your Instant Quote</h2>
          <p className="section-subtitle">Takes less than 30 seconds</p>
          <div className="section-divider" />
        </div>

        <div style={{ background: 'var(--sm-white)', border: '1px solid var(--sm-border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.06)' }}>
          <div style={{ background: 'var(--sm-navy)', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--sm-fD)', fontSize: '1.15rem', fontWeight: 600, color: 'white', margin: 0 }}>Instant Cleaning Estimate</h3>
          </div>

          <div style={{ padding: '1.75rem' }}>
            {step === 'calc' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {cleanTypeTiers.map(tier => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setCleanType(tier.value as CleanType)}
                      style={{
                        padding: '1rem .75rem',
                        borderRadius: '12px',
                        border: cleanType === tier.value ? '2px solid var(--sm-gold)' : '1px solid var(--sm-border)',
                        background: cleanType === tier.value ? 'rgba(198,169,105,.06)' : 'var(--sm-cream)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all .2s',
                        transform: cleanType === tier.value ? 'scale(1.03)' : 'scale(1)',
                        boxShadow: cleanType === tier.value ? '0 4px 16px rgba(198,169,105,.15)' : 'none',
                      }}
                    >
                      {tier.badge && (
                        <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--sm-gold-dk)', letterSpacing: '.1em', display: 'block', marginBottom: '4px' }}>
                          {tier.badge}
                        </span>
                      )}
                      <span style={{ fontFamily: 'var(--sm-fD)', fontWeight: 600, fontSize: tier.value === 'premium' ? '1rem' : '0.9rem', color: 'var(--sm-navy)', display: 'block' }}>
                        {tier.label}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--sm-gray)', display: 'block', marginTop: '2px' }}>{tier.description}</span>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Bedrooms</label>
                    <input type="number" min="0" max="10" placeholder="e.g. 3" value={bedrooms} onChange={e => setBedrooms(e.target.value)} className={inputCls} data-testid="home-quote-bedrooms" />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Bathrooms</label>
                    <input type="number" min="0" max="10" step="0.5" placeholder="e.g. 2" value={bathrooms} onChange={e => setBathrooms(e.target.value)} className={inputCls} data-testid="home-quote-bathrooms" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Service Type</label>
                    <select value={serviceType} onChange={e => setServiceType(e.target.value)} className={selectCls} data-testid="home-quote-service">
                      {serviceTypes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Frequency</label>
                    <select value={frequency} onChange={e => setFrequency(e.target.value)} className={selectCls} data-testid="home-quote-frequency">
                      {frequencyOptions.map(f => <option key={f.value} value={f.value}>{f.label}{f.discount > 0 ? ` (-${Math.round(f.discount * 100)}%)` : ''}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Sq Ft <span style={{ color: 'var(--sm-gray-lt)', fontSize: '10px' }}>(optional)</span></label>
                    <input type="number" min="0" placeholder={estimatedSqFt > 0 && !sqft ? `~${estimatedSqFt}` : 'e.g. 1500'} value={sqft} onChange={e => setSqft(e.target.value)} className={inputCls} data-testid="home-quote-sqft" />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Pets?</label>
                    <select value={pets} onChange={e => setPets(e.target.value)} className={selectCls} data-testid="home-quote-pets">
                      <option value="no">No pets</option>
                      <option value="yes">Yes (+$25)</option>
                    </select>
                  </div>
                </div>

                {price > 0 && (
                  <div style={{ background: 'rgba(198,169,105,.06)', border: '1px solid var(--sm-border)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }} data-testid="home-quote-result">
                    <p style={{ fontSize: '12px', color: 'var(--sm-gray)', letterSpacing: '.1em', marginBottom: '4px' }}>YOUR ESTIMATED PRICE</p>
                    <p style={{ fontFamily: 'var(--sm-fD)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--sm-navy)', margin: '0' }} data-testid="home-quote-price">${price}</p>
                    <p style={{ fontSize: '12px', color: 'var(--sm-gray)', marginTop: '4px' }}>{selectedTier?.label} · {selectedService?.label} · {selectedFrequency.label}</p>
                    <p style={{ fontSize: '11px', color: 'var(--sm-gray-lt)', marginTop: '4px' }}>Most homes range between $180 – $350</p>
                    <a
                      href="tel:334-877-9513"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                        marginTop: '0.75rem', background: 'var(--sm-gold)', color: 'white',
                        padding: '.6rem 1.5rem', borderRadius: '999px',
                        fontSize: '13px', fontWeight: 600, transition: 'all .2s',
                      }}
                    >
                      Call to Book — (334) 877-9513
                    </a>
                  </div>
                )}

                <button
                  onClick={handleContinue}
                  disabled={!serviceType || estimatedSqFt <= 0}
                  className="btn-submit"
                  data-testid="home-quote-continue"
                >
                  {price > 0 ? 'Save Quote & Continue' : 'Calculate Price'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: 'var(--sm-gray-lt)' }}>Final price confirmed after walkthrough</p>
                  <p style={{ fontSize: '12px', color: 'var(--sm-gold-dk)', fontWeight: 500, marginTop: '4px' }}>
                    Limited availability this week — book now
                  </p>
                </div>

                <button
                  onClick={handleSeeFullQuote}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--sm-gray)', padding: '4px', transition: 'color .2s' }}
                >
                  Need add-ons or more options? See full calculator →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(198,169,105,.06)', border: '1px solid var(--sm-border)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: 'var(--sm-gray)' }}>Your Quote</p>
                  <p style={{ fontFamily: 'var(--sm-fD)', fontSize: '2rem', fontWeight: 700, color: 'var(--sm-navy)', margin: '4px 0' }}>${price}</p>
                  <p style={{ fontSize: '12px', color: 'var(--sm-gray)' }}>{selectedTier?.label} · {selectedService?.label} · {sizeLabel}</p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Name *</label>
                  <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={inputCls} data-testid="home-quote-name" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Email *</label>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} data-testid="home-quote-email" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-navy-lt)', display: 'block', marginBottom: '6px' }}>Phone</label>
                  <input type="tel" placeholder="(334) 555-0100" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} data-testid="home-quote-phone" />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={saveQuoteMutation.isPending}
                  className="btn-submit"
                  data-testid="home-quote-submit"
                >
                  {saveQuoteMutation.isPending ? 'Saving...' : 'Save Quote & Continue to Booking'}
                </button>

                <button
                  onClick={() => setStep('calc')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--sm-gray)', padding: '4px', transition: 'color .2s' }}
                >
                  ← Back to calculator
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
