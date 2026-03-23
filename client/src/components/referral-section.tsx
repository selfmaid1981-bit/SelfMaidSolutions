import { Gift, Share2, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ReferralSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = 'SELFMAID25';

  const handleCopy = () => {
    navigator.clipboard.writeText(`Get $25 off your first cleaning with Self-Maid! Use code: ${referralCode} — selfmaidllc.com`);
    setCopied(true);
    toast({ title: "Copied!", description: "Share this with your friends for $25 off!" });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-20 section-warm" style={{ borderTop: '1px solid rgba(245,197,66,0.1)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl p-8 lg:p-12 text-center" style={{ background: 'rgba(17,17,17,0.6)', border: '1px solid rgba(245,197,66,0.15)' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.15), rgba(200,155,45,0.05))' }}>
            <Gift className="w-8 h-8" style={{ color: '#f5c542' }} />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif mb-3">
            Refer a Friend, <span className="gold-shine-text">Get $25 Off</span>
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-lg mx-auto">
            Love our service? Share the sparkle! When your friend books their first cleaning, you both get $25 off.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-6 text-left">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4" style={{ color: '#f5c542' }} />
                <span className="text-white/60 text-sm">Share code</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: '#f5c542' }} />
                <span className="text-white/60 text-sm">Both save $25</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="px-6 py-3 rounded-lg text-lg font-mono font-bold tracking-[3px]" style={{ background: 'rgba(245,197,66,0.1)', border: '1px dashed rgba(245,197,66,0.4)', color: '#f5c542' }}>
              {referralCode}
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-3 rounded-lg font-bold text-sm transition-all"
              style={{ background: 'linear-gradient(135deg, #f5c542, #c89b2d)', color: '#0a0a0d' }}
            >
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
