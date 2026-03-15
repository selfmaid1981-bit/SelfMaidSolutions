import { useState, useEffect } from 'react';
import { X, Gift, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/contact', {
        name: 'Newsletter Subscriber',
        email,
        phone: '',
        message: 'Exit popup subscription - 10% discount offer',
        serviceType: 'newsletter'
      });
    },
    onSuccess: () => {
      toast({
        title: "You're all set!",
        description: "Check your email for your 10% discount code.",
      });
      setIsVisible(false);
      localStorage.setItem('exitPopupClaimed', 'true');
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    const alreadyClaimed = localStorage.getItem('exitPopupClaimed');
    if (alreadyClaimed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const timer = setTimeout(() => {
      if (!hasShown) {
        document.addEventListener('mouseout', handleMouseLeave);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          data-testid="exit-popup-close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Wait! Don't Leave Yet!</h3>
          <p className="text-white/90">Get 10% OFF your first cleaning service</p>
        </div>

        <div className="p-8">
          <p className="text-muted-foreground text-center mb-6">
            Enter your email below and we'll send you a special discount code for your first booking with Self-Maid Cleaning.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
                data-testid="exit-popup-email"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold"
              disabled={subscribeMutation.isPending}
              data-testid="exit-popup-submit"
            >
              {subscribeMutation.isPending ? 'Sending...' : 'Get My 10% Discount'}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            No spam, ever. Unsubscribe anytime. By signing up you agree to our terms.
          </p>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-4 underline"
            data-testid="exit-popup-no-thanks"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
