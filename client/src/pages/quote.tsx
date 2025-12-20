import { useState } from 'react';
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
import { Calculator, Phone, Check, Mail, Save, AlertTriangle, BookOpen, Clock, Sparkles } from 'lucide-react';
import { UrgencyBanner, LoyaltyBadge, TrustSignals } from '@/components/urgency-banner';

const serviceTypes = [
  { value: 'residential', label: 'Standard House Cleaning', baseRate: 0.13, minCharge: 120 },
  { value: 'deep', label: 'Deep Cleaning', baseRate: 0.195, minCharge: 250 },
  { value: 'moveout', label: 'Move-Out Cleaning', baseRate: 0.228, minCharge: 325 },
  { value: 'apartment', label: 'Apartment Turnover', baseRate: 0.171, minCharge: 108 },
  { value: 'shorttermrental', label: 'Short Term Rental Cleaning', baseRate: 0.114, minCharge: 95 },
  { value: 'commercial', label: 'Commercial/Office Cleaning', baseRate: 0.163, minCharge: 180 },
  { value: 'construction', label: 'Construction Cleanup', baseRate: 0.293, minCharge: 400 },
  { value: 'studentdorm', label: 'Student Dorm/Apartment Turnover (Call for Pricing)', perRoom: 45, minCharge: 45 }
];

const sizeOptions = [
  { value: 'small', label: 'Small (Under 1000 sq ft)', multiplier: 1 },
  { value: 'medium', label: 'Medium (1000-2000 sq ft)', multiplier: 1.5 },
  { value: 'large', label: 'Large (2000-3000 sq ft)', multiplier: 2 },
  { value: 'xlarge', label: 'Extra Large (3000+ sq ft)', multiplier: 2.5 }
];

const frequencyOptions = [
  { value: 'onetime', label: 'One-Time Service', discount: 0 },
  { value: 'weekly', label: 'Weekly (15% discount)', discount: 0.15 },
  { value: 'biweekly', label: 'Bi-Weekly (10% discount)', discount: 0.10 },
  { value: 'monthly', label: 'Monthly (5% discount)', discount: 0.05 }
];

const addOns = [
  { id: 'deep', label: 'Deep Cleaning', price: 50 },
  { id: 'carpet', label: 'Carpet Cleaning', price: 75 },
  { id: 'windows', label: 'Window Cleaning (Custom Quote - depends on quantity & height)', price: 0 },
  { id: 'appliances', label: 'Appliance Cleaning', price: 35 },
  { id: 'refrigerator', label: 'Refrigerator Cleaning', price: 30 },
  { id: 'stove', label: 'Stove Cleaning', price: 25 },
  { id: 'garage', label: 'Garage Cleaning', price: 60 },
  { id: 'blinds', label: 'Blind Cleaning', price: 35 },
  { id: 'baseboards', label: 'Baseboard Cleaning', price: 30 }
];

export default function Quote() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [serviceType, setServiceType] = useState('');
  const [size, setSize] = useState('');
  const [frequency, setFrequency] = useState('onetime');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customSqFt, setCustomSqFt] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const calculateQuote = () => {
    if (!serviceType) return 0;

    const service = serviceTypes.find(s => s.value === serviceType);
    const freq = frequencyOptions.find(f => f.value === frequency);

    if (!service || !freq) return 0;

    let basePrice = 0;

    // Handle student dorm/apartment turnover with room-based pricing
    if (serviceType === 'studentdorm') {
      const rooms = Math.max(0, parseInt(numberOfRooms) || 0);
      if (rooms > 0) {
        const perRoomRate = (service as any).perRoom || 45;
        basePrice = rooms * perRoomRate;
      } else {
        return 0;
      }
    }
    // If custom square footage is provided, use that
    else if (customSqFt) {
      const sqFt = Math.max(0, parseInt(customSqFt) || 0);
      if (sqFt > 0) {
        const rate = (service as any).baseRate || 0;
        basePrice = Math.max(service.minCharge, sqFt * rate);
      } else {
        return 0;
      }
    } else if (size) {
      // Otherwise use size selection
      const sizeOption = sizeOptions.find(s => s.value === size);
      if (!sizeOption) return 0;
      basePrice = service.minCharge * sizeOption.multiplier;
    } else {
      return 0;
    }

    // Apply frequency discount
    basePrice = basePrice * (1 - freq.discount);

    // Add selected add-ons
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);

    return Math.round(basePrice + addOnTotal);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const saveQuoteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/quotes', {
        name: customerName,
        email: customerEmail,
        phone: customerPhone || null,
        serviceType: selectedService?.label || serviceType,
        propertySize: serviceType === 'studentdorm' ? `${numberOfRooms} rooms` : (size ? sizeOptions.find(s => s.value === size)?.label : null),
        customSqFt: customSqFt ? parseInt(customSqFt) : null,
        frequency: frequencyOptions.find(f => f.value === frequency)?.label || frequency,
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
      toast({
        title: "Missing Information",
        description: "Please provide your name and email to save your quote.",
        variant: "destructive",
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    saveQuoteMutation.mutate();
  };

  const handleBookThisQuote = () => {
    if (!customerName || !customerEmail) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email to book this quote.",
        variant: "destructive",
      });
      return;
    }

    // Build booking URL with quote data
    const params = new URLSearchParams({
      quoteId: Math.random().toString(36).substr(2, 9), // Temporary quote ID
      serviceType: selectedService?.label || '',
      estimatedPrice: quote.toString(),
      quoteName: customerName,
      quoteEmail: customerEmail,
      quotePhone: customerPhone,
    });

    setLocation(`/booking?${params.toString()}`);
  };

  const quote = calculateQuote();
  const selectedService = serviceTypes.find(s => s.value === serviceType);

  return (
    <>
      <SEOHead
        title="Free Cleaning Quote Calculator | Montgomery & Prattville AL | Self-Maid"
        description="Instant cleaning quote calculator for Montgomery and Prattville, AL. Get accurate pricing for residential, commercial, Airbnb cleaning services. Free estimates!"
        keywords="cleaning quote Montgomery AL, cleaning cost calculator Prattville, free cleaning estimate Alabama, cleaning service pricing Montgomery, instant quote Prattville cleaning, how much does cleaning cost Montgomery, house cleaning estimate Prattville AL, cleaning price calculator Alabama, get cleaning quote Montgomery, free estimate house cleaning Prattville, cleaning service cost estimator Montgomery AL, calculate cleaning cost Alabama, residential cleaning quote Montgomery, commercial cleaning estimate Prattville, Airbnb cleaning pricing Montgomery, move out cleaning quote Alabama, deep cleaning cost calculator Prattville, apartment cleaning estimate Montgomery, Selma cleaning quote, Homewood cleaning estimate, Clanton cleaning prices, online quote cleaning Alabama, instant pricing house cleaning Montgomery, cleaning cost by room Prattville, cleaning price per bedroom Montgomery, bathroom cleaning cost Alabama, square footage cleaning rates Montgomery, cleaning quote no obligation Prattville, free in home estimate Montgomery, virtual cleaning estimate Alabama, text quote cleaning Montgomery, phone estimate cleaning Prattville, same day quote cleaning Alabama"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-primary/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Calculate your cleaning service cost instantly based on your specific needs.
            </p>
          </div>
        </section>

        {/* Quote Calculator */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calculate Your Quote</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Service Type */}
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger id="service-type" data-testid="quote-service-select">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map(service => (
                            <SelectItem 
                              key={service.value} 
                              value={service.value}
                              data-testid={`option-service-${service.value}`}
                            >
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Room Count for Student Dorm */}
                    {serviceType === 'studentdorm' ? (
                      <div className="space-y-2">
                        <Label htmlFor="rooms">Number of Rooms</Label>
                        <Input 
                          id="rooms"
                          type="number"
                          min="1"
                          step="1"
                          placeholder="e.g., 3 (kitchen, living room, bathroom)"
                          value={numberOfRooms}
                          onChange={(e) => setNumberOfRooms(e.target.value)}
                          data-testid="quote-rooms-input"
                        />
                        <p className="text-sm text-muted-foreground">
                          $45 per room. Count all rooms including kitchen, living room, bedrooms, bathrooms, etc.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Size */}
                        <div className="space-y-2">
                          <Label htmlFor="size">Property Size</Label>
                          <Select value={size} onValueChange={setSize}>
                            <SelectTrigger id="size" data-testid="quote-size-select">
                              <SelectValue placeholder="Select property size" />
                            </SelectTrigger>
                            <SelectContent>
                              {sizeOptions.map(option => (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  data-testid={`option-size-${option.value}`}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Custom Square Footage */}
                        <div className="space-y-2">
                          <Label htmlFor="sqft">Custom Square Footage (Optional)</Label>
                          <Input 
                            id="sqft"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="e.g., 1500"
                            value={customSqFt}
                            onChange={(e) => setCustomSqFt(e.target.value)}
                            data-testid="quote-sqft-input"
                          />
                          <p className="text-sm text-muted-foreground">
                            Enter exact square footage to override size selection
                          </p>
                        </div>
                      </>
                    )}

                    {/* Frequency */}
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Service Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger id="frequency" data-testid="quote-frequency-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map(option => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                              data-testid={`option-frequency-${option.value}`}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Add-Ons */}
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

                    <Button 
                      onClick={() => setShowQuote(true)} 
                      disabled={
                        !serviceType || 
                        (serviceType === 'studentdorm' ? !(Number(numberOfRooms) > 0) : (!size && !(Number(customSqFt) > 0)))
                      }
                      className="w-full"
                      data-testid="calculate-quote-button"
                    >
                      Calculate Quote
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quote Display */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Your Estimated Quote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showQuote && serviceType && (serviceType === 'studentdorm' ? Number(numberOfRooms) > 0 : (size || Number(customSqFt) > 0)) ? (
                      <div className="space-y-6">
                        <div className="text-center py-8 border-b">
                          <p className="text-sm text-muted-foreground mb-2">Estimated Total</p>
                          <p className="text-5xl font-bold text-primary" data-testid="quote-total">
                            ${quote}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {frequency !== 'onetime' && 'per service'}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground">Quote Details:</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Service:</span>
                              <span className="font-medium">{selectedService?.label}</span>
                            </div>
                            {serviceType === 'studentdorm' ? (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Number of Rooms:</span>
                                <span className="font-medium">{numberOfRooms} rooms</span>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Size:</span>
                                  <span className="font-medium">
                                    {size ? sizeOptions.find(s => s.value === size)?.label : 'Custom'}
                                  </span>
                                </div>
                                {customSqFt && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Square Footage:</span>
                                    <span className="font-medium">{customSqFt} sq ft</span>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frequency:</span>
                              <span className="font-medium">
                                {frequencyOptions.find(f => f.value === frequency)?.label}
                              </span>
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
                            <AlertDescription className="text-amber-800 text-xs space-y-1">
                              <p><strong>Important:</strong> Each quote must be approved by Self-Maid. You will be contacted as soon as your booking request is received. Booking is not guaranteed by this website.</p>
                            </AlertDescription>
                          </Alert>

                          <p className="text-sm text-muted-foreground text-center">
                            This is an estimate. Final price may vary based on specific conditions.
                          </p>

                          <UrgencyBanner variant="quote" />
                          
                          <TrustSignals />
                          
                          {!showSaveForm ? (
                            <>
                              <div className="space-y-3">
                                <Button
                                  onClick={() => setShowSaveForm(true)}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                                  data-testid="show-save-form-button"
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Save My Quote
                                </Button>
                              </div>
                              <a 
                                href="tel:334-877-9513"
                                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                                data-testid="quote-call-button"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call to Book: (334) 877-9513
                              </a>
                              <Button
                                onClick={handleBookThisQuote}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                data-testid="button-book-this-quote"
                              >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Book This Quote
                              </Button>
                              <a 
                                href={`/#contact?service=${encodeURIComponent(selectedService?.label || '')}&quote=${quote}`}
                                className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center"
                                data-testid="quote-contact-button"
                              >
                                Request This Quote
                              </a>
                            </>
                          ) : (
                            <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                              <h4 className="font-semibold text-foreground flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
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
                                  onClick={() => setShowSaveForm(false)}
                                  variant="outline"
                                  data-testid="button-cancel-save"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calculator className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          Select a service and size or enter square footage to calculate your quote
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
