import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Calculator, BedDouble, Bath, Ruler, Phone, PawPrint, Sparkles } from 'lucide-react';
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
    if (sqFtVal > 3000) {
      setCleanType('deep');
    }
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

  const basePrice = useMemo(() => {
    return calculateQuotePrice({
      serviceType,
      customSqFt: sqft || (estimatedSqFt > 0 ? String(estimatedSqFt) : ''),
      frequency: 'onetime',
      selectedAddOns: [],
      bedrooms,
      bathrooms,
      pets: 'no',
      cleanType,
    });
  }, [serviceType, sqft, estimatedSqFt, bedrooms, bathrooms, cleanType]);

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

  const selectClass = "w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 appearance-none" + " " + "bg-[#111111] border border-white/10 text-white focus:ring-[#f5c542]/40 focus:border-[#f5c542]";
  const inputClass = "w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" + " " + "bg-[#111111] border border-white/10 text-white placeholder:text-white/30 focus:ring-[#f5c542]/40 focus:border-[#f5c542]";

  return (
    <section className="py-14 lg:py-20" style={{ background: 'linear-gradient(135deg, #0a0a0d 0%, #111111 50%, #0a0a0d 100%)' }} id="instant-quote">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif italic">
            Get Your Exact Cleaning Price
          </h2>
          <p className="text-white/50 mt-3">Takes less than 30 seconds</p>
        </div>
        <div className="rounded-2xl shadow-xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(245,197,66,0.15)' }}>
          <div className="px-6 py-5 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #0a0a0d, #111111)', borderBottom: '1px solid rgba(245,197,66,0.15)' }}>
            <Calculator className="w-5 h-5" style={{ color: '#f5c542' }} />
            <h3 className="text-lg font-bold text-white font-serif italic">Instant Cleaning Estimate</h3>
          </div>

          <div className="px-6 py-8">
            {step === 'calc' ? (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  {cleanTypeTiers.map(tier => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setCleanType(tier.value as CleanType)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 text-center ${
                        cleanType === tier.value
                          ? 'scale-105 ring-1'
                          : 'hover:shadow-md hover:-translate-y-0.5'
                      }`}
                      style={cleanType === tier.value
                        ? { borderColor: '#f5c542', background: '#1a1a1a', boxShadow: '0 0 20px rgba(245,197,66,0.1), 0 0 0 1px rgba(245,197,66,0.3)' }
                        : { borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }
                      }
                    >
                      {tier.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-1" style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}>
                          {tier.badge}
                        </span>
                      )}
                      <span className={`font-semibold block ${cleanType === tier.value ? 'text-white' : 'text-white/70'} ${tier.value === 'premium' ? 'text-base' : 'text-sm'}`}>
                        {tier.label}
                      </span>
                      <span className="text-[11px] text-white/40 block mt-0.5">{tier.description}</span>
                      {cleanType === tier.value && tier.includes.length > 0 && (
                        <ul className="text-[11px] text-white/60 mt-2 text-left space-y-0.5">
                          {tier.includes.map(item => (
                            <li key={item}>&#10004; {item}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-white/40" /> Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="e.g. 3"
                      value={bedrooms}
                      onChange={e => setBedrooms(e.target.value)}
                      className={inputClass}
                      data-testid="home-quote-bedrooms"
                    />
                  </div>
                  <div>
                    <label className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-white/40" /> Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      placeholder="e.g. 2"
                      value={bathrooms}
                      onChange={e => setBathrooms(e.target.value)}
                      className={inputClass}
                      data-testid="home-quote-bathrooms"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs font-semibold mb-1.5 block">Type of Service</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={serviceType}
                      onChange={e => setServiceType(e.target.value)}
                      className={selectClass}
                      data-testid="home-quote-service"
                    >
                      {serviceTypes.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <select
                      value={frequency}
                      onChange={e => setFrequency(e.target.value)}
                      className={selectClass}
                      data-testid="home-quote-frequency"
                    >
                      {frequencyOptions.map(f => (
                        <option key={f.value} value={f.value}>
                          {f.label}{f.discount > 0 ? ` (-${Math.round(f.discount * 100)}%)` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-white/40" /> Sq Ft
                      <span className="text-white/30 text-[10px]">(optional)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder={estimatedSqFt > 0 && !sqft ? `~${estimatedSqFt}` : 'e.g. 1500'}
                      value={sqft}
                      onChange={e => setSqft(e.target.value)}
                      className={inputClass}
                      data-testid="home-quote-sqft"
                    />
                  </div>
                  <div>
                    <label className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <PawPrint className="w-3.5 h-3.5 text-white/40" /> Pets?
                    </label>
                    <select
                      value={pets}
                      onChange={e => setPets(e.target.value)}
                      className={selectClass}
                      data-testid="home-quote-pets"
                    >
                      <option value="no">No pets</option>
                      <option value="yes">Yes (+$25)</option>
                    </select>
                  </div>
                </div>

                {price > 0 && (
                  <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }} data-testid="home-quote-result">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Your Estimated Price</p>
                    <p className="text-4xl font-black text-white" data-testid="home-quote-price">${price}</p>
                    <p className="text-white/50 text-xs mt-1">{selectedTier?.label} · {selectedService?.label} · {selectedFrequency.label}</p>
                    <p className="text-white/30 text-[11px] mt-1">Most homes range between $180 – $350</p>
                    <a
                      href="tel:334-877-9513"
                      className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors"
                      style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}
                    >
                      Call to Book — (334) 877-9513
                    </a>
                  </div>
                )}

                <button
                  onClick={handleContinue}
                  disabled={!serviceType || estimatedSqFt <= 0}
                  className="w-full disabled:opacity-30 font-bold py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}
                  data-testid="home-quote-continue"
                >
                  {price > 0 ? (
                    <>Calculate Price</>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      Calculate Price
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-white/30 text-[11px]">Final price confirmed after walkthrough</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: '#f5c542' }}>Limited availability this week — book now</p>
                </div>

                <button
                  onClick={handleSeeFullQuote}
                  className="w-full text-white/40 hover:text-[#f5c542] text-xs py-1 transition-colors"
                >
                  Need add-ons or more options? See full calculator →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}>
                  <p className="text-white/50 text-xs">Your Quote</p>
                  <p className="text-3xl font-black text-white">${price}</p>
                  <p className="text-white/50 text-xs">{selectedTier?.label} · {selectedService?.label} · {sizeLabel}</p>
                </div>

                <div>
                  <label className="text-white text-xs font-semibold mb-1.5 block">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={inputClass}
                    data-testid="home-quote-name"
                  />
                </div>
                <div>
                  <label className="text-white text-xs font-semibold mb-1.5 block">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={inputClass}
                    data-testid="home-quote-email"
                  />
                </div>
                <div>
                  <label className="text-white text-xs font-semibold mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-white/40" /> Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(334) 555-0100"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={inputClass}
                    data-testid="home-quote-phone"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={saveQuoteMutation.isPending}
                  className="w-full disabled:opacity-50 font-bold py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}
                  data-testid="home-quote-submit"
                >
                  {saveQuoteMutation.isPending ? 'Saving...' : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Save Quote & Continue to Booking
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('calc')}
                  className="w-full text-white/40 hover:text-[#f5c542] text-xs py-1 transition-colors"
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
