import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Booking() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [zipCode, setZipCode] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentOption, setPaymentOption] = useState('later');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Quote data from URL params
  const [quoteData, setQuoteData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('quoteId');
    const serviceType = params.get('serviceType');
    const estimatedPrice = params.get('estimatedPrice');
    const quoteName = params.get('quoteName');
    const quoteEmail = params.get('quoteEmail');
    const quotePhone = params.get('quotePhone');

    if (quoteId) {
      setQuoteData({
        quoteId,
        serviceType: serviceType || '',
        estimatedPrice: estimatedPrice ? parseInt(estimatedPrice) : 0,
        quoteName: quoteName || '',
        quoteEmail: quoteEmail || '',
        quotePhone: quotePhone || '',
      });

      // Pre-fill form with quote data
      if (quoteName) {
        const [first, last] = quoteName.split(' ');
        setFirstName(first || '');
        setLastName(last || '');
      }
      if (quoteEmail) setEmail(quoteEmail);
      if (quotePhone) setPhone(quotePhone);
    }
  }, []);

  const createBookingMutation = useMutation({
    mutationFn: async () => {
      const bookingData = {
        firstName,
        lastName,
        email,
        phone,
        serviceType: quoteData?.serviceType || '',
        address,
        city,
        state,
        zipCode,
        preferredDate,
        preferredTime,
        specialInstructions: specialInstructions || null,
        amount: quoteData?.estimatedPrice || 0,
        quoteId: quoteData?.quoteId || null,
      };

      if (paymentOption === 'later') {
        return apiRequest('POST', '/api/bookings', {
          ...bookingData,
          skipPayment: true,
        });
      } else {
        const response = await apiRequest('POST', '/api/bookings', bookingData);
        const { bookingId } = await response.json();
        setLocation(`/checkout?bookingId=${bookingId}&amount=${bookingData.amount}`);
        return response;
      }
    },
    onSuccess: () => {
      if (paymentOption === 'later') {
        toast({
          title: 'Booking Request Submitted!',
          description: 'We will contact you within 24 hours to confirm and discuss details.',
        });
        setLocation('/');
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit booking. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the terms and disclaimers to proceed.',
        variant: 'destructive',
      });
      return;
    }

    if (!firstName || !lastName || !email || !phone || !address || !city || !zipCode || !preferredDate || !preferredTime) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    createBookingMutation.mutate();
  };

  return (
    <>
      <SEOHead
        title="Book Cleaning Service | Montgomery & Prattville AL | Self-Maid"
        description="Schedule your professional cleaning service in Montgomery and Prattville, AL. Easy online booking with flexible payment options."
        noindex={true}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="py-12 lg:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Schedule Your Cleaning
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {quoteData ? 'Complete your booking based on your quote' : 'Book a professional cleaning service'}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Quote Info Display */}
                  {quoteData && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Quote Details:</strong> {quoteData.serviceType} - ${quoteData.estimatedPrice}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Disclaimer Alert */}
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 text-sm space-y-2">
                      <p><strong>Important Disclaimer:</strong></p>
                      <p>Each quote must be approved by Self-Maid Cleaning Solutions. You will be contacted as soon as your booking request is received. Booking is not guaranteed by this website. Final confirmation is subject to Self-Maid's approval and service availability.</p>
                    </AlertDescription>
                  </Alert>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(334) 555-0100"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  {/* Service Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Service Address</h3>
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St"
                        data-testid="input-address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Montgomery"
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="AL"
                          maxLength={2}
                          data-testid="input-state"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="36104"
                        data-testid="input-zip"
                      />
                    </div>
                  </div>

                  {/* Preferred Date/Time */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Preferred Appointment</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          data-testid="input-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          data-testid="input-time"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g., Avoid using strong perfumes, focus on bedrooms, etc."
                      className="min-h-24"
                      data-testid="input-instructions"
                    />
                  </div>

                  {/* Payment Option */}
                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground">Payment Option</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="payLater"
                          name="payment"
                          value="later"
                          checked={paymentOption === 'later'}
                          onChange={(e) => setPaymentOption(e.target.value)}
                          className="w-4 h-4 text-primary"
                          data-testid="radio-pay-later"
                        />
                        <label htmlFor="payLater" className="ml-2 cursor-pointer text-sm">
                          Pay Later - We'll contact you within 24 hours to confirm
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="payNow"
                          name="payment"
                          value="now"
                          checked={paymentOption === 'now'}
                          onChange={(e) => setPaymentOption(e.target.value)}
                          className="w-4 h-4 text-primary"
                          data-testid="radio-pay-now"
                        />
                        <label htmlFor="payNow" className="ml-2 cursor-pointer text-sm">
                          Pay Now - Proceed to secure payment
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2 bg-muted/30 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-1 text-primary"
                      data-testid="checkbox-terms"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I understand that each quote must be approved by Self-Maid and booking is not guaranteed. I will be contacted as soon as my request is received.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={createBookingMutation.isPending}
                    className="w-full"
                    size="lg"
                    data-testid="button-submit-booking"
                  >
                    {createBookingMutation.isPending ? 'Processing...' : 'Submit Booking Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Need help? Call us at <a href="tel:334-877-9513" className="text-primary hover:underline">(334) 877-9513</a></p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
