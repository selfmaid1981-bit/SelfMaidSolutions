import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Check, Mail, Phone, MessageSquare, Building2, Home, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OutreachTemplates() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const propertyManagerTemplates = [
    {
      id: "pm-intro",
      title: "Initial Outreach - Property Manager",
      type: "LinkedIn/Email",
      subject: "Reliable Turnover Cleaning for Your Properties",
      body: `Hi [Name],

I'm Michelle with Self-Maid Cleaning Solutions. With 16 years serving Central Alabama, we specialize in turnover cleaning for property managers in [Prattville/Clanton].

I know unreliable cleaning can delay move-ins and frustrate tenants. We offer:
• Same-week availability
• Photo documentation before/after
• 100% satisfaction guarantee
• Property manager volume pricing

Would you be open to a quick call to discuss how we can support your properties?

Best,
Michelle
Self-Maid Cleaning Solutions
334-XXX-XXXX`
    },
    {
      id: "pm-followup1",
      title: "Follow-Up #1 (3 days later)",
      type: "Email",
      subject: "Quick follow-up - turnover cleaning",
      body: `Hi [Name],

Just following up on my message about turnover cleaning services. 

I wanted to share that we recently helped [similar PM company] reduce their turnover time by 2 days with our same-day scheduling.

Do you have 10 minutes this week to chat about your cleaning needs?

Best,
Michelle`
    },
    {
      id: "pm-followup2",
      title: "Follow-Up #2 (7 days later)",
      type: "Email",
      subject: "One more thought...",
      body: `Hi [Name],

I'll keep this short - I know you're busy managing properties.

If you ever have a last-minute turnover where your regular cleaner cancels, we offer emergency same-day service. Keep our number handy: 334-XXX-XXXX.

No pressure - just wanted you to know we're here when you need us.

Michelle`
    },
    {
      id: "pm-phone",
      title: "Cold Call Script - Property Manager",
      type: "Phone",
      body: `"Hi, this is Michelle with Self-Maid Cleaning Solutions. I'm reaching out to property managers in [Prattville/Clanton] who need reliable turnover cleaning.

Do you currently have a cleaning company you're happy with?"

[If yes]: "That's great! We'd love to be your backup option. Can I send you our property manager pricing in case you ever need emergency coverage?"

[If no/maybe]: "I hear that a lot - finding reliable cleaners is tough. We specialize in turnovers with same-week availability and photo documentation. Would you be open to trying us on your next vacancy?"

[Close]: "Great, what's the best email to send our pricing sheet?"`
    }
  ];

  const realtorTemplates = [
    {
      id: "re-intro",
      title: "Initial Outreach - Real Estate Agent",
      type: "LinkedIn/Email",
      subject: "Move-In Ready Homes for Your Buyers",
      body: `Hi [Name],

Congratulations on your recent success in the [Prattville/Clanton] market! 

I'm Michelle with Self-Maid Cleaning Solutions. We help real estate agents deliver move-in ready homes with our professional cleaning services.

For your sellers: We make homes show-ready before listing
For your buyers: We provide move-in cleaning after closing

Many agents in the area partner with us as their go-to cleaning referral. Would you be interested in our real estate agent pricing?

Best,
Michelle
Self-Maid Cleaning Solutions`
    },
    {
      id: "re-followup1",
      title: "Follow-Up #1 - Add Value",
      type: "Email",
      subject: "A gift for your next closing",
      body: `Hi [Name],

I have an idea that might help you stand out with clients.

Many agents offer a "Move-In Cleaning" as a closing gift - it's memorable, practical, and shows you care about their home.

We offer a special rate for agent-referred cleanings. Want me to send you details you can share with clients?

Michelle`
    },
    {
      id: "re-phone",
      title: "Cold Call Script - Realtor",
      type: "Phone",
      body: `"Hi [Name], this is Michelle with Self-Maid Cleaning Solutions. I work with real estate agents in [city] who need reliable cleaning for their listings and closings.

Quick question - when your sellers need their home cleaned before showings, who do you usually recommend?"

[Listen]

"Got it. Many agents I work with like having a go-to cleaning company they can refer. We offer agent pricing and can usually get homes ready within 48 hours.

Would it be helpful if I sent you our services sheet to keep on hand for clients?"`
    }
  ];

  const smsTemplates = [
    {
      id: "sms-intro",
      title: "Initial Text - Warm Lead",
      type: "SMS",
      body: `Hi [Name], this is Michelle from Self-Maid Cleaning Solutions. I help property managers in [city] with turnover cleaning. Would you be open to a quick call about your cleaning needs?`
    },
    {
      id: "sms-followup",
      title: "Follow-Up Text",
      type: "SMS",
      body: `Hi [Name], just following up! We have availability this week if you need any turnovers cleaned. Let me know if I can help. - Michelle, Self-Maid`
    },
    {
      id: "sms-referral",
      title: "Referral Request",
      type: "SMS",
      body: `Hi [Name], thanks for using Self-Maid! If you know any other property managers or realtors who need reliable cleaning, we'd love an introduction. We offer a $50 referral bonus!`
    }
  ];

  const TemplateCard = ({ template }: { template: any }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <Badge variant="outline">{template.type}</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(template.body, template.id)}
          >
            {copiedId === template.id ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        {template.subject && (
          <CardDescription>Subject: {template.subject}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded-lg font-sans">
          {template.body}
        </pre>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin/leads">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Leads
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Outreach Templates
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Copy and customize these proven templates for your lead outreach
          </p>
        </div>

        <Tabs defaultValue="property-managers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="property-managers" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Property Managers
            </TabsTrigger>
            <TabsTrigger value="realtors" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Realtors
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property-managers" className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Property Manager Outreach Strategy
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Day 1: Send initial LinkedIn message or email</li>
                <li>• Day 3: Follow-up #1 with social proof</li>
                <li>• Day 7: Follow-up #2 with value add</li>
                <li>• Day 14: Phone call if no response</li>
              </ul>
            </div>
            {propertyManagerTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </TabsContent>

          <TabsContent value="realtors" className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Realtor Outreach Strategy
              </h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Focus on how you help THEIR clients</li>
                <li>• Offer closing gift partnership</li>
                <li>• Provide referral commission structure</li>
                <li>• Connect on LinkedIn first, then email</li>
              </ul>
            </div>
            {realtorTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                SMS Best Practices
              </h3>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• Keep messages under 160 characters when possible</li>
                <li>• Only text leads who've shown interest or opted in</li>
                <li>• Best times: Tue-Thu, 10am-2pm</li>
                <li>• Always identify yourself and company</li>
              </ul>
            </div>
            {smsTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Users className="h-5 w-5" />
              Follow-Up Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">Day 1</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Initial Outreach</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">Day 3</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Follow-Up #1</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">Day 7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Follow-Up #2</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">Day 14</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Phone Call</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
