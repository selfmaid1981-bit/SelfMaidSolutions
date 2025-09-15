import { useEffect, useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'wouter';
import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Loader2, CreditCard, Shield } from 'lucide-react';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const CheckoutForm = ({ bookingId, amount }: { bookingId: string; amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?payment=success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed! You'll receive a confirmation email shortly.",
      });
      setLocation('/?payment=success');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="checkout-form">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Booking Summary</h3>
        <div className="flex justify-between items-center">
          <span>Cleaning Service</span>
          <span className="font-semibold">${amount}.00</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Booking ID: {bookingId}
        </div>
      </div>

      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 mr-2 text-primary" />
          <span className="font-medium">Payment Information</span>
        </div>
        <PaymentElement />
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <Shield className="w-4 h-4 mr-2" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
        data-testid="submit-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${amount}.00`
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if Stripe is configured
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      toast({
        title: "Payment Not Available",
        description: "Payment processing is not currently configured. Please contact us directly.",
        variant: "destructive",
      });
      setLocation('/');
      return;
    }

    // Get booking details from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const bookingIdParam = urlParams.get('bookingId');
    const amountParam = urlParams.get('amount');

    if (!bookingIdParam || !amountParam) {
      toast({
        title: "Invalid Checkout",
        description: "Missing booking information. Please start a new booking.",
        variant: "destructive",
      });
      setLocation('/');
      return;
    }

    setBookingId(bookingIdParam);
    setAmount(parseInt(amountParam));

    // Create PaymentIntent
    apiRequest("POST", "/api/create-payment-intent", { 
      bookingId: bookingIdParam, 
      amount: parseInt(amountParam) 
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        toast({
          title: "Payment Setup Failed",
          description: "Unable to setup payment. Please try again.",
          variant: "destructive",
        });
        console.error('Payment intent creation failed:', error);
      });
  }, [toast, setLocation]);

  if (!clientSecret) {
    return (
      <>
        <SEOHead
          title="Checkout | Self-Maid Cleaning Solutions"
          description="Complete your cleaning service booking with secure payment processing."
          noindex={true}
        />
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Setting up secure payment...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <>
      <SEOHead
        title="Checkout | Self-Maid Cleaning Solutions"
        description="Complete your cleaning service booking with secure payment processing."
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Complete Your Booking</h1>
              <p className="text-muted-foreground">
                Secure payment processing powered by Stripe
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                {stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm bookingId={bookingId} amount={amount} />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Payment processing is not available at this time.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>Need help? Call us at <a href="tel:334-413-9029" className="text-primary hover:underline">(334) 413-9029</a></p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
