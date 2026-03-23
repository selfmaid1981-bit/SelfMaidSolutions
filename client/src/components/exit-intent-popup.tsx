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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300" style={{ background: '#111111', border: '1px solid rgba(245,197,66,0.2)' }}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          data-testid="exit-popup-close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.1), rgba(200,155,45,0.05))' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,197,66,0.15)', border: '1px solid rgba(245,197,66,0.2)' }}>
            <Gift className="w-8 h-8" style={{ color: '#f5c542' }} />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">Wait! Don't Leave Yet!</h3>
          <p className="text-white/70">Get <span style={{ color: '#f5c542' }} className="font-bold">10% OFF</span> your first cleaning service</p>
        </div>

        <div className="p-8">
          <p className="text-white/50 text-center mb-6 text-sm">
            Enter your email below and we'll send you a special discount code for your first booking with Self-Maid Cleaning.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-[#0a0a0d] border-white/10 text-white focus:border-[#f5c542] focus:ring-[#f5c542]/20"
                required
                data-testid="exit-popup-email"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold text-[#0a0a0d]"
              style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)' }}
              disabled={subscribeMutation.isPending}
              data-testid="exit-popup-submit"
            >
              {subscribeMutation.isPending ? 'Sending...' : 'Get My 10% Discount'}
            </Button>
          </form>

          <p className="text-xs text-white/30 text-center mt-4">
            No spam, ever. Unsubscribe anytime. By signing up you agree to our terms.
          </p>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-center text-sm text-white/30 hover:text-white/60 mt-4 underline"
            data-testid="exit-popup-no-thanks"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
