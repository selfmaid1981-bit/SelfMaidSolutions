import { useState } from 'react';
import { Gift, Copy, Check, Share2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const referralCode = 'SELFMAID25';
  const referralLink = `https://selfmaidllc.com/quote?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: 'Link Copied!',
      description: 'Share this link with friends and family.',
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Get $25 Off Cleaning Services',
          text: 'Use my referral link to get $25 off your first cleaning with Self-Maid!',
          url: referralLink,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-foreground">
              Give $25, Get $25!
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Share the gift of a clean home with friends and family
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  1
                </div>
                <h4 className="font-semibold text-foreground">Share Your Link</h4>
                <p className="text-sm text-muted-foreground">Send to friends who need cleaning</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  2
                </div>
                <h4 className="font-semibold text-foreground">They Book & Save</h4>
                <p className="text-sm text-muted-foreground">They get $25 off first cleaning</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  3
                </div>
                <h4 className="font-semibold text-foreground">You Get Rewarded</h4>
                <p className="text-sm text-muted-foreground">$25 credit on your next clean</p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Referral Link
              </label>
              <div className="flex gap-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="bg-white"
                  data-testid="referral-link-input"
                />
                <Button 
                  onClick={handleCopy}
                  variant="outline"
                  className="shrink-0"
                  data-testid="copy-referral-button"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleShare}
                className="bg-primary hover:bg-primary/90"
                data-testid="share-referral-button"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share with Friends
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(`mailto:?subject=Get $25 Off Cleaning!&body=Use my referral link to get $25 off your first cleaning with Self-Maid: ${referralLink}`, '_blank')}
                data-testid="email-referral-button"
              >
                Send via Email
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  <strong className="text-foreground">127 customers</strong> have earned referral rewards this month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function ReferralBanner() {
  return (
    <div 
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg shadow-lg"
      data-testid="referral-banner"
    >
      <div className="flex items-center justify-center gap-3">
        <Gift className="w-5 h-5" />
        <div className="text-center">
          <p className="font-bold text-sm md:text-base">
            Refer a Friend, Get $25 Off Your Next Cleaning!
          </p>
          <a href="/referral" className="text-xs md:text-sm underline opacity-90 hover:opacity-100">
            Learn more about our referral program
          </a>
        </div>
      </div>
    </div>
  );
}
