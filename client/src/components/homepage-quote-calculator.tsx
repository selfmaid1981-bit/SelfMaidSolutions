import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Calculator, BedDouble, Bath, Ruler, Sparkles, ArrowRight, Check, Zap, Phone, CheckCircle, PawPrint, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import mascotImg from '@assets/C1779863-20FF-4284-87E7-F8622C11FE8C_1773603022797.png';

const serviceTypes = [
  { value: 'residential', label: 'Standard House Cleaning', baseRate: 0.13, minCharge: 120 },
  { value: 'deep', label: 'Deep Cleaning', baseRate: 0.195, minCharge: 250 },
  { value: 'moveout', label: 'Move-Out Cleaning', baseRate: 0.228, minCharge: 325 },
  { value: 'apartment', label: 'Apartment Turnover', baseRate: 0.171, minCharge: 108 },
  { value: 'shorttermrental', label: 'Short Term Rental', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office', baseRate: 0.163, minCharge: 180 },
  { value: 'construction', label: 'Construction Cleanup', baseRate: 0.293, minCharge: 400 },
];

const frequencyOptions = [
  { value: 'onetime', label: 'One-Time Cleaning', discount: 0, badge: null },
  { value: 'biweekly', label: 'Biweekly Cleaning', discount: 0.10, badge: 'Most Popular' },
  { value: 'monthly', label: 'Monthly Cleaning', discount: 0.05, badge: null },
];

const PET_SURCHARGE = 25;

function estimateSqFt(bedrooms: number, bathrooms: number): number {
  if (bedrooms <= 0 && bathrooms <= 0) return 0;
  return Math.round(400 + (bedrooms * 250) + (bathrooms * 75));
}

function calcBasePrice(beds: number, baths: number, sqft: number): number {
  let base = 120 + (beds * 20) + (baths * 15);
  if (sqft > 1500) base += (sqft - 1500) * 0.05;
  return Math.round(base);
}

export function HomepageQuoteCalculator() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [serviceType, setServiceType] = useState('residential');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [pets, setPets] = useState('no');
  const [frequency, setFrequency] = useState('onetime');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'calc' | 'info'>('calc');

  const selectedService = serviceTypes.find(s => s.value === serviceType);
  const selectedFrequency = frequencyOptions.find(f => f.value === frequency) || frequencyOptions[0];

  const estimatedSqFt = useMemo(() => {
    const sqFtInput = parseInt(sqft) || 0;
    if (sqFtInput > 0) return sqFtInput;
    return estimateSqFt(parseInt(bedrooms) || 0, parseFloat(bathrooms) || 0);
  }, [bedrooms, bathrooms, sqft]);

  const basePrice = useMemo(() => {
    const beds = parseInt(bedrooms) || 0;
    const baths = parseFloat(bathrooms) || 0;
    if (beds <= 0 && baths <= 0 && estimatedSqFt <= 0) return 0;
    const formulaPrice = calcBasePrice(beds, baths, estimatedSqFt);
    if (!selectedService) return formulaPrice;
    const ratePrice = Math.max(selectedService.minCharge, estimatedSqFt * selectedService.baseRate);
    return Math.round(Math.max(formulaPrice, ratePrice));
  }, [selectedService, estimatedSqFt, bedrooms, bathrooms]);

  const price = useMemo(() => {
    if (basePrice <= 0) return 0;
    let total = basePrice;
    if (pets === 'yes') total += PET_SURCHARGE;
    total = Math.round(total * (1 - selectedFrequency.discount));
    return total;
  }, [basePrice, pets, selectedFrequency]);

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
        serviceType: selectedService?.label || serviceType,
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

  return (
    <section className="relative overflow-hidden py-14 lg:py-20" id="instant-quote">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0e7490 40%, #0f766e 70%, #1d4ed8 100%)' }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <Zap className="w-4 h-4 text-amber-300" />
              Instant Online Pricing
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Your Exact Price{' '}
              <span className="text-amber-300">in Seconds</span>
            </h2>

            <p className="text-blue-100/85 text-lg mb-7 leading-relaxed max-w-lg">
              Enter your home details and see transparent, no-hidden-fee pricing instantly — no phone call needed.
            </p>

            <div className="relative mb-8">
              <div className="flex items-end gap-4">
                <img
                  src={mascotImg}
                  alt="Self-Maid Cleaning Solutions"
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain flex-shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  loading="lazy"
                  width={128}
                  height={128}
                />
                <div className="relative bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl rounded-bl-sm px-5 py-3 max-w-xs">
                  <p className="text-white font-semibold text-sm leading-snug">
                    Let's get your home sparkling! Enter your details and I'll show you your price instantly.
                  </p>
                  <div className="absolute -bottom-1 left-0 w-3 h-3 bg-white/15 border-l border-b border-white/25" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {['Instant pricing — no waiting', 'No credit card required', 'Saves as a lead in our system', 'Continue straight to booking'].map(f => (
                <li key={f} className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-[15px]">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="tel:334-877-9513"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold px-6 py-3 rounded-2xl transition-all"
            >
              <Phone className="w-4 h-4" />
              Or Call (334) 877-9513
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Quote Calculator</p>
                    <p className="text-blue-200/70 text-xs">Get your price now</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 text-xs font-semibold">Live</span>
                  </div>
                </div>

                {step === 'calc' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1 block">Service Type</label>
                      <select
                        value={serviceType}
                        onChange={e => setServiceType(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none"
                        data-testid="home-quote-service"
                      >
                        <option value="" className="text-slate-900">Select a service...</option>
                        {serviceTypes.map(s => (
                          <option key={s.value} value={s.value} className="text-slate-900">{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                          <BedDouble className="w-3 h-3" /> Bedrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="e.g. 3"
                          value={bedrooms}
                          onChange={e => setBedrooms(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                          data-testid="home-quote-bedrooms"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                          <Bath className="w-3 h-3" /> Bathrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.5"
                          placeholder="e.g. 2"
                          value={bathrooms}
                          onChange={e => setBathrooms(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                          data-testid="home-quote-bathrooms"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                          <Ruler className="w-3 h-3" /> Sq Ft
                          <span className="text-white/40 text-[10px]">(opt.)</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder={estimatedSqFt > 0 && !sqft ? `~${estimatedSqFt}` : 'e.g. 1500'}
                          value={sqft}
                          onChange={e => setSqft(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                          data-testid="home-quote-sqft"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                          <PawPrint className="w-3 h-3" /> Pets?
                        </label>
                        <select
                          value={pets}
                          onChange={e => setPets(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none"
                          data-testid="home-quote-pets"
                        >
                          <option value="no" className="text-slate-900">No pets</option>
                          <option value="yes" className="text-slate-900">Yes (+$25)</option>
                        </select>
                      </div>
                    </div>

                    {basePrice > 0 && (
                      <div className="space-y-1.5">
                        {frequencyOptions.map(opt => {
                          const optPrice = Math.round((basePrice + (pets === 'yes' ? PET_SURCHARGE : 0)) * (1 - opt.discount));
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFrequency(opt.value)}
                              className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                                frequency === opt.value
                                  ? 'bg-white/20 border border-amber-400/50 shadow-lg'
                                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                              }`}
                              data-testid={`home-quote-freq-${opt.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                                  frequency === opt.value ? 'border-amber-400' : 'border-white/30'
                                }`}>
                                  {frequency === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                </span>
                                <span className="text-white font-medium">{opt.label}</span>
                                {opt.badge && (
                                  <span className="text-[9px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-1.5 py-0.5 rounded-full">{opt.badge}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5">
                                {opt.discount > 0 && (
                                  <span className="text-emerald-400 text-[10px] font-semibold">-{Math.round(opt.discount * 100)}%</span>
                                )}
                                <span className={`font-bold ${frequency === opt.value ? 'text-amber-300' : 'text-white/70'}`}>${optPrice}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {price > 0 && (
                      <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-4 text-center" data-testid="home-quote-result">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Your Estimated Price</p>
                        <p className="text-4xl font-black text-white" data-testid="home-quote-price">${price}</p>
                        <p className="text-white/50 text-xs mt-1">{selectedService?.label} · {selectedFrequency.label}</p>
                        {sizeLabel && <p className="text-white/40 text-[10px] mt-0.5">{sizeLabel}{pets === 'yes' ? ' · Pet surcharge' : ''}</p>}
                      </div>
                    )}

                    <button
                      onClick={handleContinue}
                      disabled={!serviceType || estimatedSqFt <= 0}
                      className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-white/10 disabled:text-white/30 text-slate-900 font-bold py-3 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      data-testid="home-quote-continue"
                    >
                      {price > 0 ? (
                        <>
                          Book This Cleaning
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4" />
                          Enter Details to See Price
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-3 text-[10px] text-white/50 mt-1">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />5.0 Google Rating</span>
                      <span>·</span>
                      <span>500+ Homes Cleaned</span>
                      <span>·</span>
                      <span>Fully Insured</span>
                    </div>

                    <button
                      onClick={handleSeeFullQuote}
                      className="w-full text-white/50 hover:text-white/80 text-xs py-1 transition-colors"
                    >
                      Want add-ons or frequency discounts? See full calculator →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-3 text-center">
                      <p className="text-white/60 text-xs">Your Quote</p>
                      <p className="text-3xl font-black text-white">${price}</p>
                      <p className="text-white/50 text-xs">{selectedService?.label} · {sizeLabel}</p>
                    </div>

                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1 block">Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        data-testid="home-quote-name"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1 block">Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        data-testid="home-quote-email"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(334) 555-0100"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        data-testid="home-quote-phone"
                      />
                      <p className="text-emerald-300/70 text-[10px] mt-1">We'll text your quote summary instantly</p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={saveQuoteMutation.isPending}
                      className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-bold py-3 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      data-testid="home-quote-submit"
                    >
                      {saveQuoteMutation.isPending ? 'Saving...' : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Save Quote & Continue to Booking
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-3 text-[10px] text-white/50 mt-1">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />5.0 Google Rating</span>
                      <span>·</span>
                      <span>500+ Homes Cleaned</span>
                      <span>·</span>
                      <span>Fully Insured</span>
                    </div>

                    <button
                      onClick={() => setStep('calc')}
                      className="w-full text-white/50 hover:text-white/80 text-xs py-1 transition-colors"
                    >
                      ← Back to calculator
                    </button>
                  </div>
                )}

                <p className="text-center text-blue-200/50 text-xs mt-3">
                  Free · Instant · No commitment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
