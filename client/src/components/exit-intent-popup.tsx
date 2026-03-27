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
        firstName: 'Newsletter',
        lastName: 'Subscriber',
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
    const dismissed = localStorage.getItem('exitPopupDismissed');
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

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
    }, 45000);

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300" style={{ background: 'rgba(31,42,55,.5)', backdropFilter: 'blur(8px)' }}>
      <div className="relative rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300" style={{ background: 'var(--sm-white)', border: '1px solid var(--sm-border)' }}>
        <button
          onClick={() => { setIsVisible(false); localStorage.setItem('exitPopupDismissed', String(Date.now())); }}
          className="absolute top-4 right-4 transition-colors z-10"
          style={{ color: 'var(--sm-gray-lt)' }}
          data-testid="exit-popup-close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center" style={{ background: 'rgba(198,169,105,.06)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(198,169,105,.1)', border: '1px solid var(--sm-border)' }}>
            <Gift className="w-8 h-8" style={{ color: 'var(--sm-gold)' }} />
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--sm-fD)', color: 'var(--sm-navy)' }}>Wait! Don't Leave Yet!</h3>
          <p style={{ color: 'var(--sm-gray)' }}>Get <span style={{ color: 'var(--sm-gold-dk)', fontWeight: 700 }}>10% OFF</span> your first cleaning service</p>
        </div>

        <div className="p-8">
          <p className="text-center mb-6 text-sm" style={{ color: 'var(--sm-gray)' }}>
            Enter your email below and we'll send you a special discount code for your first booking with Self-Maid Cleaning.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--sm-gray-lt)' }} />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                style={{ background: 'var(--sm-cream)', border: '1px solid var(--sm-border)', color: 'var(--sm-navy)' }}
                required
                data-testid="exit-popup-email"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold"
              style={{ background: 'var(--sm-gold)', color: 'white', borderRadius: '999px' }}
              disabled={subscribeMutation.isPending}
              data-testid="exit-popup-submit"
            >
              {subscribeMutation.isPending ? 'Sending...' : 'Get My 10% Discount'}
            </Button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: 'var(--sm-gray-lt)' }}>
            No spam, ever. Unsubscribe anytime. By signing up you agree to our terms.
          </p>

          <button
            onClick={() => { setIsVisible(false); localStorage.setItem('exitPopupDismissed', String(Date.now())); }}
            className="w-full text-center text-sm mt-4 underline"
            style={{ color: 'var(--sm-gray-lt)' }}
            data-testid="exit-popup-no-thanks"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
