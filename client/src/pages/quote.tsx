import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Calculator, Phone, Check, Mail, Save, AlertTriangle, BookOpen, BedDouble, Bath, Ruler, Sparkles, Timer, Zap, Calendar, Clock } from 'lucide-react';
import { UrgencyBanner, LoyaltyBadge, TrustSignals } from '@/components/urgency-banner';
import {
  sqFtServiceTypes as serviceTypes,
  fullQuoteFrequencyOptions as frequencyOptions,
  addOnServices as addOns,
  estimateSqFt,
  calculateQuotePrice,
} from '@/lib/services';

const DISCOUNT_PERCENT = 10;
const COUNTDOWN_SECONDS = 15 * 60;

function generateAvailableSlots(): { date: string; label: string; slots: string[] }[] {
  const result: { date: string; label: string; slots: string[] }[] = [];
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dow = d.getDay();
    if (dow === 0) continue;

    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const label = `${dayNames[dow]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;

    const slots: string[] = [];
    const startHour = 8;
    const endHour = dow === 6 ? 14 : 17;
    for (let h = startHour; h < endHour; h += 2) {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h > 12 ? h - 12 : h;
      const endH = h + 2;
      const endAmpm = endH >= 12 ? 'PM' : 'AM';
      const endH12 = endH > 12 ? endH - 12 : endH;
      slots.push(`${h12}:00 ${ampm} – ${endH12}:00 ${endAmpm}`);
    }

    result.push({ date: dateStr, label, slots });
  }
  return result;
}

function CountdownTimer({ seconds, onExpire }: { seconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const expireCalled = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!expireCalled.current) {
            expireCalled.current = true;
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / seconds) * 100;
  const isUrgent = remaining < 120;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className={`w-4 h-4 ${isUrgent ? 'text-emerald-500 animate-pulse' : 'text-orange-500'}`} />
          <span className={`text-sm font-semibold ${isUrgent ? 'text-emerald-600' : 'text-orange-600'}`}>
            Offer expires in
          </span>
        </div>
        <span className={`text-lg font-bold font-mono ${isUrgent ? 'text-emerald-600' : 'text-orange-700'}`}>
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${isUrgent ? 'bg-emerald-500' : 'bg-orange-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function Quote() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [serviceType, setServiceType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [customSqFt, setCustomSqFt] = useState('');
  const [frequency, setFrequency] = useState('onetime');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [savedQuoteId, setSavedQuoteId] = useState<string | null>(null);
  const [showIncentive, setShowIncentive] = useState(false);
  const [discountExpired, setDiscountExpired] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  const selectedService = serviceTypes.find(s => s.value === serviceType);
  const freq = frequencyOptions.find(f => f.value === frequency);

  const estimatedSqFt = useMemo(() => {
    const sqFtInput = parseInt(customSqFt) || 0;
    if (sqFtInput > 0) return sqFtInput;
    return estimateSqFt(parseInt(bedrooms) || 0, parseFloat(bathrooms) || 0);
  }, [bedrooms, bathrooms, customSqFt]);

  const quote = useMemo(() => {
    return calculateQuotePrice({
      serviceType,
      customSqFt: customSqFt || (estimatedSqFt > 0 ? String(estimatedSqFt) : ''),
      frequency,
      selectedAddOns,
      bedrooms,
      bathrooms,
    });
  }, [serviceType, customSqFt, estimatedSqFt, frequency, selectedAddOns, bedrooms, bathrooms]);

  const discountedPrice = useMemo(() => {
    if (!quote) return 0;
    return Math.round(quote * (1 - DISCOUNT_PERCENT / 100));
  }, [quote]);

  const savings = quote - discountedPrice;

  const availableSlots = useMemo(() => generateAvailableSlots(), []);

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const sizeLabel = customSqFt
    ? `${customSqFt} sq ft`
    : estimatedSqFt > 0
      ? `~${estimatedSqFt} sq ft (${bedrooms || 0} bed / ${bathrooms || 0} bath)`
      : null;

  const saveQuoteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/quotes', {
        name: customerName,
        email: customerEmail,
        phone: customerPhone || null,
        serviceType: selectedService?.label || serviceType,
        propertySize: sizeLabel,
        customSqFt: estimatedSqFt || null,
        frequency: freq?.label || frequency,
        addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.label || id),
        estimatedPrice: quote,
      });
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Quote Saved!",
        description: "Your quote has been saved and sent to your email. Check out your limited-time offer below!",
      });
      setSavedQuoteId(data.quoteId || 'q-' + Date.now().toString(36));
      setShowSaveForm(false);
      setShowIncentive(true);
      setDiscountExpired(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save quote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveQuote = () => {
    if (!customerName || !customerEmail) {
      toast({ title: "Missing Information", description: "Please provide your name and email to save your quote.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    saveQuoteMutation.mutate();
  };

  const handleBookWithDiscount = () => {
    const useDiscount = showIncentive && !discountExpired;
    const finalPrice = useDiscount ? discountedPrice : quote;
    const params = new URLSearchParams({
      quoteId: savedQuoteId || 'q-' + Date.now().toString(36),
      serviceType: selectedService?.label || '',
      estimatedPrice: finalPrice.toString(),
      quoteName: customerName,
      quoteEmail: customerEmail,
      quotePhone: customerPhone,
    });
    if (useDiscount) {
      params.set('discountApplied', savings.toString());
      params.set('discountSource', 'booking_incentive');
      params.set('originalPrice', quote.toString());
    }
    if (selectedSlot) {
      params.set('preferredDate', selectedSlot.date);
      params.set('preferredTime', selectedSlot.time);
    }
    setLocation(`/booking?${params.toString()}`);
  };

  const handleBookThisQuote = () => {
    if (!customerName || !customerEmail) {
      toast({ title: "Missing Information", description: "Please provide your name and email to book this quote.", variant: "destructive" });
      return;
    }
    handleBookWithDiscount();
  };

  const handleDiscountExpired = useCallback(() => {
    setDiscountExpired(true);
  }, []);

  const hasInput = serviceType && estimatedSqFt > 0;

  return (
    <>
      <SEOHead
        title="Free Cleaning Quote Calculator | Montgomery & Prattville AL | Self-Maid"
        description="Instant cleaning quote calculator for Montgomery and Prattville, AL. Get accurate pricing for residential, commercial, Airbnb cleaning services. Free estimates!"
        keywords="cleaning quote Montgomery AL, cleaning cost calculator Prattville, free cleaning estimate Alabama, cleaning service pricing Montgomery"
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="page-hero py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6">
              <Calculator className="w-8 h-8 text-teal-300" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Enter your home details and see your price instantly.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card className="rounded-2xl shadow-xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
                  <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-teal-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-white" />
                      </div>
                      Your Home Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger id="service-type" data-testid="quote-service-select">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map(service => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms" className="flex items-center gap-1.5">
                          <BedDouble className="w-4 h-4 text-emerald-500" />
                          Bedrooms
                        </Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          min="0"
                          max="10"
                          placeholder="e.g. 3"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          data-testid="quote-bedrooms-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms" className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-teal-500" />
                          Bathrooms
                        </Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          min="0"
                          max="10"
                          step="0.5"
                          placeholder="e.g. 2"
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                          data-testid="quote-bathrooms-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sqft" className="flex items-center gap-1.5">
                        <Ruler className="w-4 h-4 text-orange-500" />
                        Square Footage
                        <span className="text-xs text-muted-foreground font-normal">(optional — overrides bed/bath estimate)</span>
                      </Label>
                      <Input
                        id="sqft"
                        type="number"
                        min="0"
                        placeholder={estimatedSqFt > 0 && !customSqFt ? `Estimated: ~${estimatedSqFt} sq ft` : "e.g. 1500"}
                        value={customSqFt}
                        onChange={(e) => setCustomSqFt(e.target.value)}
                        data-testid="quote-sqft-input"
                      />
                      {estimatedSqFt > 0 && !customSqFt && (bedrooms || bathrooms) && (
                        <p className="text-xs text-muted-foreground">
                          Estimated ~{estimatedSqFt} sq ft based on {bedrooms || 0} bedroom(s) and {bathrooms || 0} bathroom(s)
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency">Service Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger id="frequency" data-testid="quote-frequency-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Services (Optional)</Label>
                      <div className="space-y-2">
                        {addOns.map(addOn => (
                          <div key={addOn.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={addOn.id}
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => toggleAddOn(addOn.id)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              data-testid={`addon-${addOn.id}`}
                            />
                            <label htmlFor={addOn.id} className="flex-1 text-sm cursor-pointer">
                              {addOn.label} (+${addOn.price})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24 rounded-2xl shadow-2xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
                  <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-teal-500" />
                      Your Estimated Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasInput ? (
                      <div className="space-y-6">
                        <div className="text-center py-8 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl -mx-2 relative overflow-hidden shadow-lg">
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                          <p className="text-emerald-100 text-sm mb-2 font-semibold uppercase tracking-wider relative z-10">Estimated Total</p>
                          {showIncentive && !discountExpired ? (
                            <>
                              <p className="text-2xl text-emerald-200/60 line-through relative z-10">${quote}</p>
                              <p className="text-6xl font-black text-white relative z-10 drop-shadow-lg" data-testid="quote-total">
                                ${discountedPrice}
                              </p>
                              <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-bold relative z-10 animate-pulse">
                                <Zap className="w-3.5 h-3.5" />
                                You save ${savings}!
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-6xl font-black text-white relative z-10 drop-shadow-lg" data-testid="quote-total">
                                ${quote}
                              </p>
                            </>
                          )}
                          <p className="text-emerald-100/80 text-sm mt-2 relative z-10">
                            {frequency !== 'onetime' ? 'per service' : 'one-time service'}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-semibold relative z-10">
                            <Sparkles className="w-3.5 h-3.5" />
                            No hidden fees — ever
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground">Quote Details:</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Service:</span>
                              <span className="font-medium">{selectedService?.label}</span>
                            </div>
                            {(bedrooms || bathrooms) && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Rooms:</span>
                                <span className="font-medium">{bedrooms || 0} bed / {bathrooms || 0} bath</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Size:</span>
                              <span className="font-medium">
                                {customSqFt ? `${customSqFt} sq ft` : `~${estimatedSqFt} sq ft (est.)`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frequency:</span>
                              <span className="font-medium">{freq?.label}</span>
                            </div>
                            {selectedAddOns.length > 0 && (
                              <div className="pt-2 border-t">
                                <p className="text-muted-foreground mb-1">Add-ons:</p>
                                {selectedAddOns.map(addOnId => {
                                  const addOn = addOns.find(a => a.id === addOnId);
                                  return (
                                    <div key={addOnId} className="flex items-center justify-between ml-4">
                                      <span className="flex items-center">
                                        <Check className="w-3 h-3 mr-1 text-secondary" />
                                        {addOn?.label}
                                      </span>
                                      <span className="font-medium">+${addOn?.price}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        {showIncentive && !discountExpired && (
                          <div className="rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4 space-y-3" data-testid="incentive-panel">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-orange-800 dark:text-orange-200">{DISCOUNT_PERCENT}% Off — Book Now!</p>
                                <p className="text-xs text-orange-600 dark:text-orange-400">Limited time offer for new customers</p>
                              </div>
                            </div>
                            <CountdownTimer seconds={COUNTDOWN_SECONDS} onExpire={handleDiscountExpired} />
                          </div>
                        )}

                        {showIncentive && discountExpired && (
                          <div className="rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 p-4 text-center" data-testid="incentive-expired">
                            <p className="text-sm text-gray-500">Discount offer has expired</p>
                            <p className="text-xs text-gray-400 mt-1">You can still book at the regular price</p>
                          </div>
                        )}

                        <div className="pt-6 border-t space-y-3">
                          <Alert className="bg-amber-50 border-amber-200">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800 text-xs">
                              <strong>Important:</strong> Each quote must be approved by Self-Maid. You will be contacted as soon as your booking request is received. Booking is not guaranteed by this website.
                            </AlertDescription>
                          </Alert>

                          <p className="text-sm text-muted-foreground text-center">
                            This is an estimate. Final price may vary based on specific conditions.
                          </p>

                          <UrgencyBanner variant="quote" />
                          <TrustSignals />

                          {!showSaveForm && !showIncentive ? (
                            <>
                              <Button
                                onClick={() => setShowSaveForm(true)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                data-testid="show-save-form-button"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save My Quote
                              </Button>
                              <a
                                href="tel:334-877-9513"
                                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                                data-testid="quote-call-button"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call to Book: (334) 877-9513
                              </a>
                            </>
                          ) : showIncentive ? (
                            <div className="space-y-3">
                              <Button
                                onClick={handleBookWithDiscount}
                                size="lg"
                                className={`w-full text-white font-bold text-lg py-6 shadow-lg transition-all ${
                                  !discountExpired
                                    ? 'bg-gradient-to-r from-orange-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 animate-pulse hover:animate-none'
                                    : 'bg-emerald-600 hover:bg-emerald-700'
                                }`}
                                data-testid="button-book-with-discount"
                              >
                                <BookOpen className="w-5 h-5 mr-2" />
                                {!discountExpired
                                  ? `Book Now — $${discountedPrice} (Save $${savings}!)`
                                  : `Book Now — $${quote}`
                                }
                              </Button>
                              <a
                                href="tel:334-877-9513"
                                className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center text-sm"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Or call: (334) 877-9513
                              </a>
                            </div>
                          ) : (
                            <div className="space-y-4 bg-gradient-to-br from-muted/30 to-muted/10 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                              <h4 className="font-semibold text-foreground flex items-center gap-2">
                                <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                  <Mail className="w-3.5 h-3.5 text-white" />
                                </div>
                                Your Information
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="customer-name">Name *</Label>
                                  <Input
                                    id="customer-name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Your name"
                                    data-testid="input-customer-name"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="customer-email">Email *</Label>
                                  <Input
                                    id="customer-email"
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    data-testid="input-customer-email"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="customer-phone">Phone (Optional)</Label>
                                  <Input
                                    id="customer-phone"
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="(334) 555-0100"
                                    data-testid="input-customer-phone"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleSaveQuote}
                                  disabled={saveQuoteMutation.isPending}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                  data-testid="button-save-quote"
                                >
                                  {saveQuoteMutation.isPending ? 'Saving...' : 'Save & Email Quote'}
                                </Button>
                                <Button
                                  onClick={handleBookThisQuote}
                                  disabled={!customerName || !customerEmail}
                                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                  data-testid="button-book-this-quote"
                                >
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Book Now
                                </Button>
                              </div>
                              <Button
                                onClick={() => setShowSaveForm(false)}
                                variant="ghost"
                                className="w-full text-sm"
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-14">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl mb-5 shadow-inner">
                          <Calculator className="w-10 h-10 text-slate-300 dark:text-slate-500" />
                        </div>
                        <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                          Select a service and enter your bedrooms, bathrooms, or square footage to see your price instantly
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {showIncentive && (
                  <Card className="rounded-2xl shadow-xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden" data-testid="available-slots-card">
                    <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        Available Booking Slots
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">Select a time and we'll pre-fill your booking</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {availableSlots.slice(0, 4).map(day => (
                        <div key={day.date}>
                          <p className="text-sm font-semibold text-foreground mb-2">{day.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map(slot => {
                              const isSelected = selectedSlot?.date === day.date && selectedSlot?.time === slot;
                              return (
                                <button
                                  key={`${day.date}-${slot}`}
                                  onClick={() => setSelectedSlot(isSelected ? null : { date: day.date, time: slot })}
                                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                                    isSelected
                                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                                  }`}
                                  data-testid={`slot-${day.date}-${slot}`}
                                >
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                      {selectedSlot && (
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <p className="text-sm text-emerald-700 dark:text-emerald-300">
                            Selected: <strong>{selectedSlot.time}</strong> on <strong>{selectedSlot.date}</strong>
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
