import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
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
import { Calculator, Phone, Check, Mail, Save, AlertTriangle, BookOpen, BedDouble, Bath, Ruler, Sparkles } from 'lucide-react';
import { UrgencyBanner, LoyaltyBadge, TrustSignals } from '@/components/urgency-banner';

const serviceTypes = [
  { value: 'residential', label: 'Standard House Cleaning', baseRate: 0.13, minCharge: 120 },
  { value: 'deep', label: 'Deep Cleaning', baseRate: 0.195, minCharge: 250 },
  { value: 'moveout', label: 'Move-Out Cleaning', baseRate: 0.228, minCharge: 325 },
  { value: 'apartment', label: 'Apartment Turnover', baseRate: 0.171, minCharge: 108 },
  { value: 'shorttermrental', label: 'Short Term Rental Cleaning', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office Cleaning', baseRate: 0.163, minCharge: 180 },
  { value: 'construction', label: 'Construction Cleanup', baseRate: 0.293, minCharge: 400 },
];

const frequencyOptions = [
  { value: 'onetime', label: 'One-Time Service', discount: 0 },
  { value: 'weekly', label: 'Weekly (15% discount)', discount: 0.15 },
  { value: 'biweekly', label: 'Bi-Weekly (10% discount)', discount: 0.10 },
  { value: 'monthly', label: 'Monthly (5% discount)', discount: 0.05 },
];

const addOns = [
  { id: 'carpet', label: 'Carpet Cleaning', price: 75 },
  { id: 'appliances', label: 'Appliance Cleaning', price: 35 },
  { id: 'refrigerator', label: 'Refrigerator Cleaning', price: 30 },
  { id: 'stove', label: 'Stove Cleaning', price: 25 },
  { id: 'garage', label: 'Garage Cleaning', price: 60 },
  { id: 'blinds', label: 'Blind Cleaning', price: 35 },
  { id: 'baseboards', label: 'Baseboard Cleaning', price: 30 },
];

function estimateSqFt(bedrooms: number, bathrooms: number): number {
  if (bedrooms <= 0 && bathrooms <= 0) return 0;
  const baseSqFt = 400;
  const perBedroom = 250;
  const perBathroom = 75;
  return Math.round(baseSqFt + (bedrooms * perBedroom) + (bathrooms * perBathroom));
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

  const selectedService = serviceTypes.find(s => s.value === serviceType);
  const freq = frequencyOptions.find(f => f.value === frequency);

  const estimatedSqFt = useMemo(() => {
    const sqFtInput = parseInt(customSqFt) || 0;
    if (sqFtInput > 0) return sqFtInput;
    return estimateSqFt(parseInt(bedrooms) || 0, parseFloat(bathrooms) || 0);
  }, [bedrooms, bathrooms, customSqFt]);

  const quote = useMemo(() => {
    if (!selectedService || !freq || estimatedSqFt <= 0) return 0;
    let basePrice = Math.max(selectedService.minCharge, estimatedSqFt * selectedService.baseRate);
    basePrice = basePrice * (1 - freq.discount);
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return Math.round(basePrice + addOnTotal);
  }, [selectedService, freq, estimatedSqFt, selectedAddOns]);

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
      return apiRequest('POST', '/api/quotes', {
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
    },
    onSuccess: () => {
      toast({
        title: "Quote Saved!",
        description: "Your quote has been saved and sent to your email. We'll be in touch soon!",
      });
      setShowSaveForm(false);
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

  const handleBookThisQuote = () => {
    if (!customerName || !customerEmail) {
      toast({ title: "Missing Information", description: "Please provide your name and email to book this quote.", variant: "destructive" });
      return;
    }
    const params = new URLSearchParams({
      quoteId: 'q-' + Date.now().toString(36),
      serviceType: selectedService?.label || '',
      estimatedPrice: quote.toString(),
      quoteName: customerName,
      quoteEmail: customerEmail,
      quotePhone: customerPhone,
    });
    setLocation(`/booking?${params.toString()}`);
  };

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
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Enter your home details and see your price instantly.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card className="rounded-2xl shadow-xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
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
                          <BedDouble className="w-4 h-4 text-blue-500" />
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

              <div>
                <Card className="sticky top-24 rounded-2xl shadow-2xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-teal-500" />
                      Your Estimated Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasInput ? (
                      <div className="space-y-6">
                        <div className="text-center py-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl -mx-2 relative overflow-hidden shadow-lg">
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                          <p className="text-blue-100 text-sm mb-2 font-semibold uppercase tracking-wider relative z-10">Estimated Total</p>
                          <p className="text-6xl font-black text-white relative z-10 drop-shadow-lg" data-testid="quote-total">
                            ${quote}
                          </p>
                          <p className="text-blue-100/80 text-sm mt-2 relative z-10">
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

                          {!showSaveForm ? (
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
                                  className="flex-1 bg-blue-600 hover:bg-blue-700"
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
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
