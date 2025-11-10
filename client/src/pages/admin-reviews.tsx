import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  Star,
  ExternalLink,
  QrCode,
  Copy,
  Mail,
  MessageSquare,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

const GOOGLE_PLACE_ID = 'ChIJYTN_j1CYcYgR8KT7e-8y0Vw';
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export default function AdminReviews() {
  const { toast } = useToast();
  const [qrCodeUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(GOOGLE_REVIEW_URL)}`);

  const copyReviewLink = () => {
    navigator.clipboard.writeText(GOOGLE_REVIEW_URL);
    toast({
      title: "Link Copied!",
      description: "Google review link copied to clipboard",
    });
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'selfmaid-google-review-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "QR Code Downloaded!",
      description: "You can now print this on business cards, flyers, or leave-behind cards",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Google Review System
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Get more 5-star reviews automatically - Tools and links to boost your online reputation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Review Link Clicks
                </CardTitle>
                <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  Track in Google
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Monitor via Google Business Profile
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Automated Requests
                </CardTitle>
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  Active
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Sent after every completed booking
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Response Rate
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  10-15%
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Industry standard conversion
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Target Rating
                </CardTitle>
                <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  4.8+ ⭐
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Goal: 50+ reviews
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <QrCode className="h-5 w-5" />
                  QR Code for Physical Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                    <img 
                      src={qrCodeUrl} 
                      alt="Google Review QR Code" 
                      className="w-64 h-64 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Print this QR code on:
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 text-left max-w-md mx-auto">
                    <li>• Business cards</li>
                    <li>• Thank-you cards left after service</li>
                    <li>• Invoices and receipts</li>
                    <li>• Flyers and door hangers</li>
                    <li>• Vehicle magnets</li>
                  </ul>
                  <Button onClick={downloadQRCode} className="w-full" data-testid="button-download-qr">
                    <QrCode className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <ExternalLink className="h-5 w-5" />
                  Direct Review Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="review-link" className="text-slate-700 dark:text-slate-300">
                    Share This Link Anywhere
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="review-link"
                      value={GOOGLE_REVIEW_URL}
                      readOnly
                      className="font-mono text-xs"
                      data-testid="input-review-link"
                    />
                    <Button onClick={copyReviewLink} variant="outline" data-testid="button-copy-link">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Where to Use This Link:
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-0.5 text-blue-600" />
                      <span><strong>Email Signature:</strong> Add to every email you send</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-0.5 text-green-600" />
                      <span><strong>Text Messages:</strong> Send after completing service</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 mt-0.5 text-yellow-600" />
                      <span><strong>Social Media:</strong> Instagram, Facebook bio links</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 mt-0.5 text-purple-600" />
                      <span><strong>Website:</strong> Add "Review Us" button</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => window.open(GOOGLE_REVIEW_URL, '_blank')} 
                  variant="outline" 
                  className="w-full"
                  data-testid="button-test-link"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Test the Link (Opens Google)
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">
                📧 Automated Review Requests - Active!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300">
                Your system is already configured to automatically send review requests after every completed booking:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-slate-900 dark:text-white">Email Request</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sent 2-4 hours after service completion with beautiful HTML template and direct link
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-slate-900 dark:text-white">SMS Request</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Text message with review link sent to customer's phone for instant access
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-green-500 dark:border-green-600">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  ✅ Best Practices Being Followed:
                </h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Requests sent at peak satisfaction (right after service)</li>
                  <li>• Dual channel approach (email + SMS) for maximum reach</li>
                  <li>• Direct Google link - no extra steps for customers</li>
                  <li>• Professional, friendly messaging that encourages action</li>
                  <li>• Non-intrusive timing (respects customer schedule)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-3">
              💡 Pro Tips to Get Even More Reviews:
            </h3>
            <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
              <li><strong>1. Ask in Person:</strong> Train your team to say "If you're happy, we'd love a Google review!" before they leave</li>
              <li><strong>2. Perfect Timing:</strong> Ask immediately after compliments or positive feedback</li>
              <li><strong>3. Make It Easy:</strong> Show customers the QR code - they can scan and review in 30 seconds</li>
              <li><strong>4. Respond to All Reviews:</strong> Thank positive reviewers within 24 hours - it encourages others to review</li>
              <li><strong>5. Feature Reviews:</strong> Share 5-star reviews on social media to create social proof</li>
              <li><strong>6. Track Progress:</strong> Set a goal (e.g., 5 new reviews per month) and celebrate when you hit it</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
