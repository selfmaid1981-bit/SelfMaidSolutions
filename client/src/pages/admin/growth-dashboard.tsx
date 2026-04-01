import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { queryClient } from "@/lib/queryClient";
import type { BlogArticle, SocialPost } from "@shared/schema";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  TrendingUp,
  FileText,
  Share2,
  Star,
  Users,
  CalendarDays,
  Globe,
  Send,
  BookOpen,
  PenTool,
  BarChart3,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiGoogle } from "react-icons/si";

function getAdminApiKey() {
  return localStorage.getItem("adminApiKey") || "";
}

function adminFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-api-key": getAdminApiKey(),
      ...(options.headers || {}),
    },
  });
}

const PLATFORM_ICONS: Record<string, any> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  google_business: SiGoogle,
};

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  google_business: "Google Business",
};

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  scheduled: "bg-amber-100 text-amber-700",
  posted: "bg-blue-100 text-blue-700",
};

export default function GrowthDashboard() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(getAdminApiKey());
  const [isAuthed, setIsAuthed] = useState(!!getAdminApiKey());
  const [blogTopic, setBlogTopic] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialTheme, setSocialTheme] = useState("");

  const handleLogin = () => {
    localStorage.setItem("adminApiKey", apiKey);
    setIsAuthed(true);
  };

  const overviewQuery = useQuery<any>({
    queryKey: ["/api/admin/growth/overview"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/growth/overview");
      if (!res.ok) throw new Error("Failed to load overview");
      return res.json();
    },
    enabled: isAuthed,
  });

  const blogQuery = useQuery<BlogArticle[]>({
    queryKey: ["/api/admin/blog/articles"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/blog/articles");
      if (!res.ok) throw new Error("Failed to load articles");
      return res.json();
    },
    enabled: isAuthed,
  });

  const socialQuery = useQuery<SocialPost[]>({
    queryKey: ["/api/admin/social/posts"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/social/posts");
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    },
    enabled: isAuthed,
  });

  const generateBlog = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/blog/generate", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate article");
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Article Generated", description: `"${data.title}" created as draft` });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
      setBlogTopic("");
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const publishBlog = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/blog/articles/${id}/publish`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to publish");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Published" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
  });

  const unpublishBlog = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/blog/articles/${id}/unpublish`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to unpublish");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Unpublished" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/articles"] });
    },
  });

  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/blog/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
  });

  const generateSocial = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/social/generate", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate post");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Post Generated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const generateWeek = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/social/generate-week", { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate weekly batch");
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Weekly Batch Generated", description: `${data.generated} posts created` });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateSocialStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await adminFetch(`/api/admin/social/posts/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
  });

  const deleteSocial = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/social/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/growth/overview"] });
    },
  });

  const overview = overviewQuery.data;

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1a24] via-[#1a2938] to-[#0f1a24] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#C6A969]" />
              Organic Growth Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Button onClick={handleLogin} className="w-full bg-[#C6A969] hover:bg-[#b8994f] text-[#1F2A37] font-bold">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1a24] via-[#1a2938] to-[#0f1a24]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/marketing">
            <Button variant="ghost" className="text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#C6A969]" />
              Organic Growth Engine
            </h1>
            <p className="text-white/60 mt-1">AI-powered content, social scheduling, reviews & referrals</p>
          </div>
        </div>

        {overview && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <StatCard icon={FileText} label="Blog Posts" value={overview.blog?.total || 0} sub={`${overview.blog?.published || 0} published`} />
            <StatCard icon={Share2} label="Social Posts" value={overview.social?.total || 0} sub={`${overview.social?.scheduled || 0} scheduled`} />
            <StatCard icon={Star} label="Reviews" value={overview.reviews?.total || 0} sub={`${overview.reviews?.completed || 0} completed`} />
            <StatCard icon={Users} label="Referrals" value={overview.referrals?.total || 0} sub="total referrals" />
            <StatCard icon={Globe} label="Leads" value={overview.leads?.total || 0} sub="captured" />
            <StatCard icon={CalendarDays} label="Bookings" value={overview.bookings?.total || 0} sub="total" />
          </div>
        )}

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="bg-white/10 border border-white/20 p-1">
            <TabsTrigger value="blog" className="data-[state=active]:bg-[#C6A969] data-[state=active]:text-[#1F2A37] text-white/70">
              <BookOpen className="w-4 h-4 mr-2" />
              SEO Blog
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-[#C6A969] data-[state=active]:text-[#1F2A37] text-white/70">
              <Share2 className="w-4 h-4 mr-2" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#C6A969] data-[state=active]:text-[#1F2A37] text-white/70">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-[#C6A969] data-[state=active]:text-[#1F2A37] text-white/70">
              <Users className="w-4 h-4 mr-2" />
              Referrals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C6A969]" />
                  AI Blog Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Topic (optional — AI picks if blank)"
                    value={blogTopic}
                    onChange={(e) => setBlogTopic(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <Select value={blogCategory} onValueChange={setBlogCategory}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cleaning Tips">Cleaning Tips</SelectItem>
                      <SelectItem value="Pricing Guide">Pricing Guide</SelectItem>
                      <SelectItem value="Airbnb Tips">Airbnb Tips</SelectItem>
                      <SelectItem value="Seasonal Cleaning">Seasonal Cleaning</SelectItem>
                      <SelectItem value="Moving Tips">Moving Tips</SelectItem>
                      <SelectItem value="Green Cleaning">Green Cleaning</SelectItem>
                      <SelectItem value="Expert Tips">Expert Tips</SelectItem>
                      <SelectItem value="Business Tips">Business Tips</SelectItem>
                      <SelectItem value="Home Maintenance">Home Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => generateBlog.mutate({ topic: blogTopic || undefined, category: blogCategory || undefined })}
                    disabled={generateBlog.isPending}
                    className="bg-[#C6A969] hover:bg-[#b8994f] text-[#1F2A37] font-bold"
                  >
                    {generateBlog.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PenTool className="w-4 h-4 mr-2" />}
                    Generate Article
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {blogQuery.isLoading ? (
                <div className="text-center py-12 text-white/60"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading articles...</div>
              ) : !blogQuery.data?.length ? (
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="py-12 text-center text-white/50">
                    No blog articles yet. Generate your first one above!
                  </CardContent>
                </Card>
              ) : (
                blogQuery.data.map((article) => (
                  <Card key={article.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={STATUS_STYLES[article.status]}>{article.status}</Badge>
                            <Badge variant="outline" className="text-white/60 border-white/20">{article.category}</Badge>
                            <span className="text-white/40 text-xs">{article.readTime}</span>
                          </div>
                          <h3 className="text-white font-semibold text-lg mb-1 truncate">{article.title}</h3>
                          <p className="text-white/50 text-sm line-clamp-2">{article.excerpt}</p>
                          {article.keywords && (
                            <p className="text-white/30 text-xs mt-2">Keywords: {article.keywords}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {article.status === "draft" ? (
                            <Button
                              size="sm"
                              onClick={() => publishBlog.mutate(article.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Publish
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unpublishBlog.mutate(article.id)}
                              className="border-white/20 text-white/70"
                            >
                              Unpublish
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              navigator.clipboard.writeText(article.content);
                              toast({ title: "Copied to clipboard" });
                            }}
                            className="text-white/50 hover:text-white"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteBlog.mutate(article.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#C6A969]" />
                  Social Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Platform (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="google_business">Google Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Theme (optional — AI picks)"
                    value={socialTheme}
                    onChange={(e) => setSocialTheme(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => generateSocial.mutate({ platform: socialPlatform || undefined, theme: socialTheme || undefined })}
                      disabled={generateSocial.isPending}
                      className="bg-[#C6A969] hover:bg-[#b8994f] text-[#1F2A37] font-bold flex-1"
                    >
                      {generateSocial.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                      Generate 1
                    </Button>
                    <Button
                      onClick={() => generateWeek.mutate()}
                      disabled={generateWeek.isPending}
                      variant="outline"
                      className="border-[#C6A969] text-[#C6A969] hover:bg-[#C6A969]/10"
                    >
                      {generateWeek.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CalendarDays className="w-4 h-4 mr-2" />}
                      Full Week
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {socialQuery.isLoading ? (
                <div className="text-center py-12 text-white/60"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading posts...</div>
              ) : !socialQuery.data?.length ? (
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="py-12 text-center text-white/50">
                    No social posts yet. Generate content above!
                  </CardContent>
                </Card>
              ) : (
                socialQuery.data.map((post) => {
                  const PlatformIcon = PLATFORM_ICONS[post.platform] || Globe;
                  return (
                    <Card key={post.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <PlatformIcon className="w-5 h-5 text-white/80" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-white/80 font-medium text-sm">{PLATFORM_LABELS[post.platform] || post.platform}</span>
                              <Badge className={STATUS_STYLES[post.status] || "bg-gray-100 text-gray-700"}>{post.status}</Badge>
                              <span className="text-white/30 text-xs">{post.postType.replace(/_/g, " ")}</span>
                              {post.scheduledFor && (
                                <span className="text-white/40 text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(post.scheduledFor).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 text-sm whitespace-pre-line">{post.content}</p>
                            {post.hashtags && (
                              <p className="text-[#C6A969]/60 text-xs mt-2">{post.hashtags}</p>
                            )}
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            {post.status === "draft" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateSocialStatus.mutate({ id: post.id, status: "posted" })}
                                className="text-green-400 hover:text-green-300"
                                title="Mark as posted"
                              >
                                <Send className="w-3 h-3" />
                              </Button>
                            )}
                            {post.status === "scheduled" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateSocialStatus.mutate({ id: post.id, status: "posted" })}
                                className="text-green-400 hover:text-green-300"
                                title="Mark as posted"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                navigator.clipboard.writeText(post.content + (post.hashtags ? "\n\n" + post.hashtags : ""));
                                toast({ title: "Copied!" });
                              }}
                              className="text-white/50 hover:text-white"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteSocial.mutate(post.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Automated Review Requests</h3>
                    <p className="text-white/50 text-sm">Reviews are automatically requested via SMS + Email after each completed job</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white">{overview?.reviews?.total || 0}</p>
                    <p className="text-white/50 text-sm">Requests Sent</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{overview?.reviews?.completed || 0}</p>
                    <p className="text-white/50 text-sm">Reviews Received</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#C6A969]">
                      {overview?.reviews?.total ? Math.round((overview.reviews.completed / overview.reviews.total) * 100) : 0}%
                    </p>
                    <p className="text-white/50 text-sm">Conversion Rate</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Review automation is active. Requests are sent automatically when a job is marked complete in the CRM.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">How It Works</h4>
                <div className="space-y-3">
                  {[
                    "Job is marked 'Completed' in the CRM",
                    "SMS is sent with Google Review link (within seconds)",
                    "Follow-up email is sent with review link + thank you",
                    "Review completion is tracked automatically",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C6A969]/20 flex items-center justify-center text-[#C6A969] text-sm font-bold">{i + 1}</div>
                      <p className="text-white/70 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Give $25, Get $25 Referral Program</h3>
                    <p className="text-white/50 text-sm">Customers share code SELFMAID25 — both get $25 off</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white">{overview?.referrals?.total || 0}</p>
                    <p className="text-white/50 text-sm">Total Referrals</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#C6A969]">${(overview?.referrals?.total || 0) * 25}</p>
                    <p className="text-white/50 text-sm">Potential Rewards</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-400 text-sm">Referral program is live on the website. Customers can share their referral link from any page.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h4 className="text-white font-semibold mb-3">Referral Link</h4>
                <div className="flex items-center gap-2">
                  <Input
                    value={`${window.location.origin}/quote?ref=SELFMAID25`}
                    readOnly
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/quote?ref=SELFMAID25`);
                      toast({ title: "Copied referral link!" });
                    }}
                    className="bg-[#C6A969] hover:bg-[#b8994f] text-[#1F2A37]"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: number; sub: string }) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4 text-center">
        <Icon className="w-5 h-5 text-[#C6A969] mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-white/80 text-xs font-medium">{label}</p>
        <p className="text-white/40 text-[10px] mt-1">{sub}</p>
      </CardContent>
    </Card>
  );
}
