import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { EmailCampaign } from "@shared/schema";
import {
  Mail,
  Send,
  Users,
  Calendar,
  ArrowLeft,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function AdminCampaigns() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [customHtml, setCustomHtml] = useState("");

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<EmailCampaign[]>({
    queryKey: ['/api/marketing/campaigns'],
  });

  const { data: subscribers, isLoading: subscribersLoading } = useQuery<any[]>({
    queryKey: ['/api/marketing/subscribers'],
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (campaign: { name: string; subject: string; htmlContent: string; templateType: string }) => {
      return await apiRequest('POST', '/api/marketing/campaigns', campaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketing/campaigns'] });
      setIsCreating(false);
      setCampaignName("");
      setCampaignSubject("");
      setCustomHtml("");
      setSelectedTemplate("");
      toast({
        title: "Campaign Created!",
        description: "Your email campaign has been created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    },
  });

  const sendCampaignMutation = useMutation({
    mutationFn: async (campaignId: string) => {
      return await apiRequest('POST', `/api/marketing/campaigns/${campaignId}/send`, {});
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketing/campaigns'] });
      toast({
        title: "Campaign Sent!",
        description: `Successfully sent to ${data.sentCount} subscribers`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Send Failed",
        description: error.message || "Failed to send campaign",
        variant: "destructive",
      });
    },
  });

  const templates = {
    reengagement: {
      name: "Win-Back Campaign",
      subject: "We Miss You! Come Back & Save 25% Off 💚",
      description: "Re-engage inactive customers with a special discount offer",
    },
    seasonal: {
      name: "Seasonal Promotion",
      subject: "Spring Cleaning Special - Save 20% This Season! 🍂",
      description: "Promote seasonal discounts and special offers",
    },
    referral: {
      name: "Referral Program",
      subject: "Earn $30 for Every Friend You Refer! 💰",
      description: "Encourage customer referrals with reward incentives",
    },
  };

  const handleCreateCampaign = () => {
    if (!campaignName || !campaignSubject) {
      toast({
        title: "Missing Information",
        description: "Please provide campaign name and subject",
        variant: "destructive",
      });
      return;
    }

    const template = selectedTemplate || "custom";
    const html = customHtml || "<p>Your campaign content here...</p>";

    createCampaignMutation.mutate({
      name: campaignName,
      subject: campaignSubject,
      htmlContent: html,
      templateType: template,
    });
  };

  const handleSendCampaign = (campaignId: string, campaignName: string) => {
    if (window.confirm(`Are you sure you want to send "${campaignName}" to all ${subscribers?.length || 0} subscribers? This action cannot be undone.`)) {
      sendCampaignMutation.mutate(campaignId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'sending':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'sent':
        return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
          {getStatusIcon(status)} Sent
        </span>;
      case 'sending':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
          {getStatusIcon(status)} Sending
        </span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
          {getStatusIcon(status)} Failed
        </span>;
      default:
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
          {getStatusIcon(status)} Draft
        </span>;
    }
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

        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Marketing Campaigns
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Automated email marketing to nurture leads and keep customers engaged
              </p>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Email Campaign</DialogTitle>
                  <DialogDescription>
                    Choose a template or create a custom campaign to send to all {subscribers?.length || 0} subscribers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Campaign Template</Label>
                    <Select value={selectedTemplate} onValueChange={(value) => {
                      setSelectedTemplate(value);
                      if (value && templates[value as keyof typeof templates]) {
                        const t = templates[value as keyof typeof templates];
                        setCampaignName(t.name);
                        setCampaignSubject(t.subject);
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template or create custom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reengagement">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-pink-600" />
                            Win-Back Campaign
                          </div>
                        </SelectItem>
                        <SelectItem value="seasonal">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-orange-600" />
                            Seasonal Promotion
                          </div>
                        </SelectItem>
                        <SelectItem value="referral">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-600" />
                            Referral Program
                          </div>
                        </SelectItem>
                        <SelectItem value="custom">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-600" />
                            Custom Campaign
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedTemplate && templates[selectedTemplate as keyof typeof templates] && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {templates[selectedTemplate as keyof typeof templates].description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Spring Cleaning 2025"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Save 20% on Spring Cleaning!"
                      value={campaignSubject}
                      onChange={(e) => setCampaignSubject(e.target.value)}
                    />
                  </div>

                  {selectedTemplate === 'custom' && (
                    <div className="space-y-2">
                      <Label htmlFor="html">Email HTML Content</Label>
                      <Textarea
                        id="html"
                        placeholder="<p>Your custom HTML email content...</p>"
                        value={customHtml}
                        onChange={(e) => setCustomHtml(e.target.value)}
                        rows={10}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500">
                        For pre-designed templates, leave this blank and we'll use the template content
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCreateCampaign}
                      disabled={createCampaignMutation.isPending}
                      className="flex-1"
                    >
                      {createCampaignMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Campaign
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Subscribers
                </CardTitle>
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {subscribersLoading ? '...' : subscribers?.length || 0}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  From contacts, bookings & quotes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Campaigns
                </CardTitle>
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {campaignsLoading ? '...' : campaigns?.length || 0}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {campaigns?.filter(c => c.status === 'sent').length || 0} sent, {campaigns?.filter(c => c.status === 'draft').length || 0} drafts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Automated Emails
                </CardTitle>
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  Active
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Welcome, follow-ups & reviews
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Email Campaigns</CardTitle>
              <CardDescription>
                Manage and send bulk email campaigns to your subscriber list
              </CardDescription>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400 mt-4">Loading campaigns...</p>
                </div>
              ) : campaigns && campaigns.length > 0 ? (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {campaign.name}
                            </h3>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                            📧 {campaign.subject}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                            {campaign.createdAt && <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>}
                            {campaign.sentAt && (
                              <span>Sent: {new Date(campaign.sentAt).toLocaleDateString()}</span>
                            )}
                            {campaign.recipientCount && campaign.recipientCount > 0 && (
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {campaign.recipientCount} recipients
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {campaign.status === 'draft' && (
                            <Button
                              onClick={() => handleSendCampaign(campaign.id, campaign.name)}
                              disabled={sendCampaignMutation.isPending || (subscribers?.length || 0) === 0}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {sendCampaignMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Now
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No campaigns yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Create your first email campaign to start engaging with your customers
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Campaign
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                Automated Marketing Features
              </CardTitle>
              <CardDescription className="text-slate-700 dark:text-slate-300">
                These emails send automatically - no action needed!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Welcome Emails</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sent automatically when someone fills out your contact form. Includes $20 off first clean offer.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Quote Follow-Ups</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sent after quote requests to encourage booking. Includes limited-time $10 discount.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Review Requests</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sent after every booking completion via email & SMS. Drives Google reviews automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
