import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Calculator, BedDouble, Bath, Ruler, Sparkles, ArrowRight, Check, Zap, Phone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const serviceTypes = [
  { value: 'residential', label: 'Standard House Cleaning', baseRate: 0.13, minCharge: 120 },
  { value: 'deep', label: 'Deep Cleaning', baseRate: 0.195, minCharge: 250 },
  { value: 'moveout', label: 'Move-Out Cleaning', baseRate: 0.228, minCharge: 325 },
  { value: 'apartment', label: 'Apartment Turnover', baseRate: 0.171, minCharge: 108 },
  { value: 'shorttermrental', label: 'Short Term Rental', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office', baseRate: 0.163, minCharge: 180 },
  { value: 'construction', label: 'Construction Cleanup', baseRate: 0.293, minCharge: 400 },
];

function estimateSqFt(bedrooms: number, bathrooms: number): number {
  if (bedrooms <= 0 && bathrooms <= 0) return 0;
  return Math.round(400 + (bedrooms * 250) + (bathrooms * 75));
}

export function HomepageQuoteCalculator() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [serviceType, setServiceType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'calc' | 'info'>('calc');

  const selectedService = serviceTypes.find(s => s.value === serviceType);

  const estimatedSqFt = useMemo(() => {
    const sqFtInput = parseInt(sqft) || 0;
    if (sqFtInput > 0) return sqFtInput;
    return estimateSqFt(parseInt(bedrooms) || 0, parseFloat(bathrooms) || 0);
  }, [bedrooms, bathrooms, sqft]);

  const price = useMemo(() => {
    if (!selectedService || estimatedSqFt <= 0) return 0;
    return Math.round(Math.max(selectedService.minCharge, estimatedSqFt * selectedService.baseRate));
  }, [selectedService, estimatedSqFt]);

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
        frequency: 'One-Time Service',
        addOns: [],
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
      });
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

                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1 flex items-center gap-1">
                        <Ruler className="w-3 h-3" /> Square Footage
                        <span className="text-white/40 text-[10px]">(optional)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder={estimatedSqFt > 0 && !sqft ? `Est. ~${estimatedSqFt} sq ft` : 'e.g. 1500'}
                        value={sqft}
                        onChange={e => setSqft(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        data-testid="home-quote-sqft"
                      />
                    </div>

                    {price > 0 && (
                      <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-4 text-center" data-testid="home-quote-result">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Your Estimated Price</p>
                        <p className="text-4xl font-black text-white" data-testid="home-quote-price">${price}</p>
                        <p className="text-white/50 text-xs mt-1">{selectedService?.label}</p>
                        {sizeLabel && <p className="text-white/40 text-[10px] mt-0.5">{sizeLabel}</p>}
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
                          Continue to Booking
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4" />
                          Enter Details to See Price
                        </>
                      )}
                    </button>

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
                      <label className="text-white/70 text-xs font-medium mb-1 block">Phone (optional)</label>
                      <input
                        type="tel"
                        placeholder="(334) 555-0100"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        data-testid="home-quote-phone"
                      />
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
