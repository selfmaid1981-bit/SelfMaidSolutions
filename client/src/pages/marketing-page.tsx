import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Users, Send, Clock, CheckCircle, XCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { EmailCampaign } from "@shared/schema";

const EMAIL_TEMPLATES = {
  newsletter: {
    name: "Monthly Newsletter",
    subject: "Your Monthly Cleaning Tips from Self-Maid",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">This Month's Cleaning Tips</h1>
        <p>Hi there!</p>
        <p>We hope this message finds you well! Here are some quick cleaning tips to keep your home sparkling:</p>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0f172a;">Tip #1: Deep Clean Your Kitchen</h2>
          <p>Don't forget to clean behind your appliances! Pull out your fridge and stove to clean those hidden spots where dust and grime accumulate.</p>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #92400e;">Special Offer This Month</h2>
          <p><strong>15% OFF your next cleaning!</strong> Book before the end of the month and mention this email.</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="tel:3348779513" style="background-color: #0369a1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Call (334) 877-9513</a>
          </p>
        </div>

        <p>Thank you for being a valued customer!</p>
        <p>Best regards,<br>Self-Maid Cleaning Solutions</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
          Montgomery, Prattville & Selma, Alabama<br>
          (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    `,
  },
  seasonal: {
    name: "Seasonal Cleaning Reminder",
    subject: "Spring Cleaning Season is Here! ✨",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">It's Spring Cleaning Time!</h1>
        <p>Hi there!</p>
        <p>Spring is the perfect time for a deep clean to refresh your home after the winter months.</p>
        
        <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #166534;">Why Spring Clean?</h2>
          <ul>
            <li>Remove winter dust and allergens</li>
            <li>Prepare your home for warmer weather</li>
            <li>Create a fresh, healthy living environment</li>
          </ul>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #92400e;">Limited Time Spring Special</h2>
          <p><strong>Book now and get 20% OFF</strong> your spring deep cleaning!</p>
          <p>Available for a limited time only.</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="tel:3348779513" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Schedule Now</a>
          </p>
        </div>

        <p>Let us handle the hard work so you can enjoy your spring!</p>
        <p>Best regards,<br>Self-Maid Cleaning Solutions</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
          Montgomery, Prattville & Selma, Alabama<br>
          (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    `,
  },
  reengagement: {
    name: "Re-Engagement (Win Back Customers)",
    subject: "We Miss You! Come Back for 25% OFF",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">We Miss You!</h1>
        <p>Hi there!</p>
        <p>It's been a while since we last cleaned your home, and we wanted to reach out.</p>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #92400e;">Welcome Back Special</h2>
          <p><strong>Get 25% OFF</strong> your next cleaning as our welcome back gift!</p>
          <p>We'd love to have you back and show you the same great service you remember.</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="tel:3348779513" style="background-color: #0369a1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Book Your Cleaning</a>
          </p>
        </div>

        <p><strong>What's New at Self-Maid:</strong></p>
        <ul>
          <li>Now offering same-day service</li>
          <li>New eco-friendly cleaning products</li>
          <li>Expanded service area</li>
        </ul>

        <p>We hope to see you again soon!</p>
        <p>Best regards,<br>Self-Maid Cleaning Solutions</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
          Montgomery, Prattville & Selma, Alabama<br>
          (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    `,
  },
  referral: {
    name: "Referral Request",
    subject: "Love Our Service? Share It & Get $20!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">Refer a Friend, Both Save!</h1>
        <p>Hi there!</p>
        <p>We're so glad you've been happy with our cleaning services!</p>
        
        <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #166534;">Our Referral Program</h2>
          <p>When you refer a friend who books a cleaning:</p>
          <ul>
            <li><strong>You get $20 off</strong> your next cleaning</li>
            <li><strong>They get $20 off</strong> their first cleaning</li>
            <li>No limit on referrals!</li>
          </ul>
          <p><em>Refer 5 friends = $100 in free cleaning!</em></p>
        </div>

        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>How It Works:</h3>
          <p>1. Tell your friends about Self-Maid<br>
          2. Have them mention your name when they call<br>
          3. After they book, you both get $20 off!</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="tel:3348779513" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Call (334) 877-9513</a>
          </p>
        </div>

        <p>Thank you for spreading the word!</p>
        <p>Best regards,<br>Self-Maid Cleaning Solutions</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
          Montgomery, Prattville & Selma, Alabama<br>
          (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    `,
  },
  review: {
    name: "Review Request",
    subject: "How Did We Do? Leave a Review & Get $10 OFF",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">We'd Love Your Feedback!</h1>
        <p>Hi there!</p>
        <p>Thank you for choosing Self-Maid Cleaning Solutions! We hope you loved our service.</p>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #92400e;">Leave a Review, Get $10 OFF</h2>
          <p>Your feedback helps us improve and helps others find great cleaning services!</p>
          <p><strong>Leave a Google review and get $10 off your next cleaning.</strong></p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="https://g.page/r/YOUR_GOOGLE_PROFILE_ID/review" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Leave a Review</a>
          </p>
        </div>

        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>It only takes 2 minutes:</strong></p>
          <ol>
            <li>Click the button above</li>
            <li>Rate your experience (we hope it's 5 stars! ⭐⭐⭐⭐⭐)</li>
            <li>Write a few words about your experience</li>
            <li>Get your $10 off code via email</li>
          </ol>
        </div>

        <p>Thank you for your support!</p>
        <p>Best regards,<br>Self-Maid Cleaning Solutions</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
          Montgomery, Prattville & Selma, Alabama<br>
          (334) 877-9513 | selfmaidclean@outlook.com
        </p>
      </div>
    `,
  },
};

export default function MarketingPage() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof EMAIL_TEMPLATES | "custom">("newsletter");
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const { data: subscribers = [], isLoading: loadingSubscribers } = useQuery<{ email: string; name: string; source: string }[]>({
    queryKey: ["/api/marketing/subscribers"],
  });

  const { data: campaigns = [], isLoading: loadingCampaigns } = useQuery<EmailCampaign[]>({
    queryKey: ["/api/marketing/campaigns"],
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/marketing/campaigns", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/campaigns"] });
      toast({
        title: "Campaign created",
        description: "Your email campaign has been saved as a draft.",
      });
      setCampaignName("");
      setSubject("");
      setHtmlContent("");
      setSelectedTemplate("newsletter");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    },
  });

  const sendCampaignMutation = useMutation({
    mutationFn: async (campaignId: string) => {
      return apiRequest(`/api/marketing/campaigns/${campaignId}/send`, "POST", {});
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketing/campaigns"] });
      toast({
        title: "Campaign sent!",
        description: `Successfully sent to ${data.sentCount} subscribers.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send campaign",
        variant: "destructive",
      });
    },
  });

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value as keyof typeof EMAIL_TEMPLATES | "custom");
    if (value !== "custom" && value in EMAIL_TEMPLATES) {
      const template = EMAIL_TEMPLATES[value as keyof typeof EMAIL_TEMPLATES];
      setCampaignName(template.name);
      setSubject(template.subject);
      setHtmlContent(template.html);
    } else {
      setCampaignName("");
      setSubject("");
      setHtmlContent("");
    }
  };

  const handleCreateCampaign = () => {
    if (!campaignName || !subject || !htmlContent) {
      toast({
        title: "Missing fields",
        description: "Please fill in campaign name, subject, and content.",
        variant: "destructive",
      });
      return;
    }

    createCampaignMutation.mutate({
      name: campaignName,
      subject,
      htmlContent,
      templateType: selectedTemplate,
      status: "draft",
      recipientCount: 0,
    });
  };

  const handleSendCampaign = (campaignId: string) => {
    if (window.confirm("Are you sure you want to send this campaign to all subscribers?")) {
      sendCampaignMutation.mutate(campaignId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" data-testid={`status-draft`}><Clock className="w-3 h-3 mr-1" />Draft</Badge>;
      case "sending":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" data-testid={`status-sending`}><Send className="w-3 h-3 mr-1" />Sending</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" data-testid={`status-sent`}><CheckCircle className="w-3 h-3 mr-1" />Sent</Badge>;
      case "failed":
        return <Badge variant="destructive" data-testid={`status-failed`}><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
            Email Marketing Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your customer email list and send marketing campaigns
          </p>
        </div>

        <Tabs defaultValue="subscribers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-8" data-testid="tabs-list">
            <TabsTrigger value="subscribers" data-testid="tab-subscribers">
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="create" data-testid="tab-create">
              <Mail className="w-4 h-4 mr-2" />
              Create
            </TabsTrigger>
            <TabsTrigger value="campaigns" data-testid="tab-campaigns">
              <Send className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Email Subscribers ({subscribers?.length || 0})</CardTitle>
                <CardDescription>
                  All unique email addresses collected from contact forms, bookings, and quote requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSubscribers ? (
                  <p className="text-slate-600 dark:text-slate-400">Loading subscribers...</p>
                ) : subscribers && subscribers.length > 0 ? (
                  <div className="space-y-2">
                    {subscribers.map((subscriber: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        data-testid={`subscriber-${index}`}
                      >
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white" data-testid={`subscriber-name-${index}`}>{subscriber.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`subscriber-email-${index}`}>{subscriber.email}</p>
                        </div>
                        <Badge variant="outline" data-testid={`subscriber-source-${index}`}>{subscriber.source}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">
                    No subscribers yet. Subscribers will be added automatically when customers submit contact forms, bookings, or quote requests.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create Email Campaign</CardTitle>
                <CardDescription>
                  Use a pre-built template or create a custom email campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="template-select">Template</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                    <SelectTrigger id="template-select" data-testid="select-template">
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newsletter">Monthly Newsletter</SelectItem>
                      <SelectItem value="seasonal">Seasonal Cleaning Reminder</SelectItem>
                      <SelectItem value="reengagement">Re-Engagement (Win Back)</SelectItem>
                      <SelectItem value="referral">Referral Request</SelectItem>
                      <SelectItem value="review">Review Request</SelectItem>
                      <SelectItem value="custom">Custom Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    data-testid="input-campaign-name"
                    placeholder="e.g., March 2025 Newsletter"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    data-testid="input-subject"
                    placeholder="e.g., Spring Cleaning Special - 20% OFF!"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="html-content">Email Content (HTML)</Label>
                  <Textarea
                    id="html-content"
                    data-testid="textarea-html-content"
                    placeholder="Enter your email HTML content here..."
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <Button
                  onClick={handleCreateCampaign}
                  disabled={createCampaignMutation.isPending}
                  className="w-full"
                  data-testid="button-create-campaign"
                >
                  {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  View and manage your email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCampaigns ? (
                  <p className="text-slate-600 dark:text-slate-400">Loading campaigns...</p>
                ) : campaigns && campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        data-testid={`campaign-${campaign.id}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white" data-testid={`campaign-name-${campaign.id}`}>
                              {campaign.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`campaign-subject-${campaign.id}`}>
                              {campaign.subject}
                            </p>
                          </div>
                          {getStatusBadge(campaign.status)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {campaign.recipientCount && campaign.recipientCount > 0 && (
                            <span data-testid={`campaign-recipients-${campaign.id}`}>
                              {campaign.recipientCount} recipients
                            </span>
                          )}
                          {campaign.sentAt && (
                            <span data-testid={`campaign-sent-date-${campaign.id}`}>
                              Sent: {new Date(campaign.sentAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {campaign.status === "draft" && (
                          <Button
                            onClick={() => handleSendCampaign(campaign.id)}
                            disabled={sendCampaignMutation.isPending}
                            size="sm"
                            data-testid={`button-send-campaign-${campaign.id}`}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {sendCampaignMutation.isPending ? "Sending..." : "Send Now"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">
                    No campaigns yet. Create your first campaign using the "Create" tab.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
