import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AdCampaign } from "@shared/schema";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  Megaphone,
  Zap,
  Eye,
  Hash,
  Target,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube, SiTiktok } from "react-icons/si";

const PLATFORM_ICONS: Record<string, any> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  youtube: SiYoutube,
  tiktok: SiTiktok,
};

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "bg-blue-600",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  youtube: "bg-red-600",
  tiktok: "bg-black",
};

const STATUS_CONFIG: Record<string, { color: string; icon: any }> = {
  draft: { color: "bg-gray-100 text-gray-700", icon: Clock },
  ready: { color: "bg-blue-100 text-blue-700", icon: Eye },
  published: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  scheduled: { color: "bg-amber-100 text-amber-700", icon: Clock },
};

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

export default function AdAutomation() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(getAdminApiKey());
  const [isAuthed, setIsAuthed] = useState(!!getAdminApiKey());

  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [selectedAdType, setSelectedAdType] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [promoOffer, setPromoOffer] = useState("");
  const [previewAd, setPreviewAd] = useState<any>(null);
  const [batchPlatforms, setBatchPlatforms] = useState<string[]>([]);

  const handleLogin = () => {
    localStorage.setItem("adminApiKey", apiKey);
    setIsAuthed(true);
  };

  const { data: platformData } = useQuery<{ platforms: any[]; services: string[] }>({
    queryKey: ["/api/admin/ads/platforms"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ads/platforms");
      if (!res.ok) throw new Error("Failed to load platforms");
      return res.json();
    },
    enabled: isAuthed,
  });

  const { data: ads, isLoading: adsLoading } = useQuery<AdCampaign[]>({
    queryKey: ["/api/admin/ads"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ads");
      if (!res.ok) throw new Error("Failed to load ads");
      return res.json();
    },
    enabled: isAuthed,
  });

  const generateMutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await adminFetch("/api/admin/ads/generate", {
        method: "POST",
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Generation failed");
      return res.json();
    },
    onSuccess: (data) => {
      setPreviewAd({ ...data, platform: selectedPlatform, adType: selectedAdType });
      toast({ title: "Ad generated!", description: "Review and save below." });
    },
    onError: () => {
      toast({ title: "Generation failed", description: "Try again.", variant: "destructive" });
    },
  });

  const batchMutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await adminFetch("/api/admin/ads/generate-batch", {
        method: "POST",
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Batch generation failed");
      return res.json();
    },
    onSuccess: async (results: any[]) => {
      let saved = 0;
      for (const r of results) {
        try {
          await adminFetch("/api/admin/ads", {
            method: "POST",
            body: JSON.stringify({
              platform: r.platform,
              adType: r.adType,
              serviceType: selectedService || undefined,
              headline: r.content.headline,
              primaryText: r.content.primaryText,
              description: r.content.description,
              callToAction: r.content.callToAction,
              hashtags: r.content.hashtags,
              targetAudience: r.content.targetAudience,
            }),
          });
          saved++;
        } catch {}
      }
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
      toast({ title: `${saved} ads generated and saved!` });
    },
    onError: () => {
      toast({ title: "Batch generation failed", variant: "destructive" });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (ad: any) => {
      const res = await adminFetch("/api/admin/ads", {
        method: "POST",
        body: JSON.stringify(ad),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
      setPreviewAd(null);
      toast({ title: "Ad saved!" });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await adminFetch(`/api/admin/ads/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/ads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
      toast({ title: "Ad deleted" });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const currentPlatform = platformData?.platforms?.find((p) => p.id === selectedPlatform);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Megaphone className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <CardTitle>Ad Automation</CardTitle>
            <p className="text-sm text-muted-foreground">Enter admin API key</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Admin API Key" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            <Button className="w-full" onClick={handleLogin}>Access Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleBatchPlatform = (id: string) => {
    setBatchPlatforms((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Megaphone className="w-6 h-6 text-amber-500" />
                Ad Automation
              </h1>
              <p className="text-sm text-muted-foreground">AI-powered ad content for Facebook, Instagram, YouTube & TikTok</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {ads?.length || 0} ads created
          </Badge>
        </div>

        <Tabs defaultValue="generate">
          <TabsList className="mb-6">
            <TabsTrigger value="generate"><Sparkles className="w-4 h-4 mr-1" /> Generate</TabsTrigger>
            <TabsTrigger value="batch"><Zap className="w-4 h-4 mr-1" /> Batch Generate</TabsTrigger>
            <TabsTrigger value="library"><Megaphone className="w-4 h-4 mr-1" /> Ad Library ({ads?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create Single Ad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform</label>
                    <div className="grid grid-cols-4 gap-2">
                      {platformData?.platforms?.map((p) => {
                        const Icon = PLATFORM_ICONS[p.id];
                        return (
                          <button
                            key={p.id}
                            onClick={() => { setSelectedPlatform(p.id); setSelectedAdType(""); }}
                            className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                              selectedPlatform === p.id ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {Icon && <Icon className="w-5 h-5" />}
                            <span className="text-xs font-medium">{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Ad Type</label>
                    <Select value={selectedAdType} onValueChange={setSelectedAdType}>
                      <SelectTrigger><SelectValue placeholder="Select ad type" /></SelectTrigger>
                      <SelectContent>
                        {currentPlatform?.adTypes?.map((t: any) => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Service (optional)</label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger><SelectValue placeholder="All services" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General / All Services</SelectItem>
                        {platformData?.services?.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Promo Offer (optional)</label>
                    <Input
                      value={promoOffer}
                      onChange={(e) => setPromoOffer(e.target.value)}
                      placeholder="e.g. 20% off first clean"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    onClick={() => generateMutation.mutate({
                      platform: selectedPlatform,
                      adType: selectedAdType,
                      serviceType: selectedService === "general" ? undefined : selectedService,
                      promoOffer: promoOffer || undefined,
                    })}
                    disabled={!selectedAdType || generateMutation.isPending}
                  >
                    {generateMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-4 h-4 mr-2" /> Generate Ad</>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {previewAd && (
                <Card className="border-amber-200 bg-amber-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="w-5 h-5" /> Preview
                      </CardTitle>
                      <Badge className={`${PLATFORM_COLORS[previewAd.platform]} text-white text-xs`}>
                        {previewAd.platform} · {previewAd.adType?.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Headline</label>
                      <div className="flex items-start justify-between mt-1">
                        <p className="font-bold text-lg">{previewAd.headline}</p>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(previewAd.headline)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Primary Text</label>
                      <div className="flex items-start justify-between mt-1">
                        <p className="text-sm whitespace-pre-wrap">{previewAd.primaryText}</p>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(previewAd.primaryText)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {previewAd.description && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                        <p className="text-sm text-gray-600 mt-1">{previewAd.description}</p>
                      </div>
                    )}

                    <div className="flex gap-4 text-xs text-gray-500">
                      {previewAd.callToAction && (
                        <span className="flex items-center gap-1"><Send className="w-3 h-3" /> {previewAd.callToAction}</span>
                      )}
                      {previewAd.targetAudience && (
                        <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {previewAd.targetAudience}</span>
                      )}
                    </div>

                    {previewAd.hashtags && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                          <Hash className="w-3 h-3" /> Hashtags
                        </label>
                        <p className="text-xs text-blue-600 mt-1">{previewAd.hashtags}</p>
                        <Button variant="ghost" size="sm" className="mt-1" onClick={() => copyToClipboard(previewAd.hashtags)}>
                          <Copy className="w-3 h-3 mr-1" /> Copy hashtags
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          saveMutation.mutate({
                            platform: previewAd.platform,
                            adType: previewAd.adType,
                            serviceType: selectedService === "general" ? undefined : selectedService,
                            headline: previewAd.headline,
                            primaryText: previewAd.primaryText,
                            description: previewAd.description,
                            callToAction: previewAd.callToAction,
                            hashtags: previewAd.hashtags,
                            targetAudience: previewAd.targetAudience,
                          });
                        }}
                        disabled={saveMutation.isPending}
                      >
                        {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save to Library"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(`${previewAd.headline}\n\n${previewAd.primaryText}\n\n${previewAd.hashtags || ""}`)}
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="batch">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Batch Generate — All Platforms at Once
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Platforms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {platformData?.platforms?.map((p) => {
                      const Icon = PLATFORM_ICONS[p.id];
                      const selected = batchPlatforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleBatchPlatform(p.id)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                            selected ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {Icon && <Icon className="w-5 h-5" />}
                          <span className="text-xs font-medium">{p.name}</span>
                          {selected && <CheckCircle2 className="w-3 h-3 text-amber-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Service (optional)</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger><SelectValue placeholder="All services" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General / All Services</SelectItem>
                      {platformData?.services?.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Promo Offer (optional)</label>
                  <Input
                    value={promoOffer}
                    onChange={(e) => setPromoOffer(e.target.value)}
                    placeholder="e.g. Book 3, get 1 free"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  onClick={() => batchMutation.mutate({
                    platforms: batchPlatforms,
                    serviceType: selectedService === "general" ? undefined : selectedService,
                    promoOffer: promoOffer || undefined,
                  })}
                  disabled={batchPlatforms.length === 0 || batchMutation.isPending}
                >
                  {batchMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating {batchPlatforms.length} platform(s)...</>
                  ) : (
                    <><Zap className="w-4 h-4 mr-2" /> Generate for {batchPlatforms.length} Platform(s)</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            {adsLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading ads...
              </div>
            ) : !ads?.length ? (
              <div className="text-center py-12">
                <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-muted-foreground">No ads yet. Generate your first one!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ads.map((ad) => {
                  const Icon = PLATFORM_ICONS[ad.platform];
                  const statusConf = STATUS_CONFIG[ad.status] || STATUS_CONFIG.draft;
                  const StatusIcon = statusConf.icon;
                  return (
                    <Card key={ad.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-md flex items-center justify-center text-white ${PLATFORM_COLORS[ad.platform]}`}>
                              {Icon && <Icon className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <span className="text-xs font-medium capitalize">{ad.platform}</span>
                              <span className="text-xs text-gray-400 ml-1">· {ad.adType?.replace(/_/g, " ")}</span>
                            </div>
                          </div>
                          <Badge className={`text-[10px] ${statusConf.color}`}>
                            <StatusIcon className="w-3 h-3 mr-0.5" />
                            {ad.status}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2">{ad.headline}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-3">{ad.primaryText}</p>
                        </div>

                        {ad.hashtags && (
                          <p className="text-[10px] text-blue-500 line-clamp-1">{ad.hashtags}</p>
                        )}

                        {ad.serviceType && (
                          <Badge variant="outline" className="text-[10px]">{ad.serviceType}</Badge>
                        )}

                        <div className="flex gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.primaryText}\n\n${ad.hashtags || ""}`)}
                          >
                            <Copy className="w-3 h-3 mr-1" /> Copy
                          </Button>
                          {ad.status === "draft" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-green-600"
                              onClick={() => statusMutation.mutate({ id: ad.id, status: "ready" })}
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                            </Button>
                          )}
                          {ad.status === "ready" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-blue-600"
                              onClick={() => statusMutation.mutate({ id: ad.id, status: "published" })}
                            >
                              <Send className="w-3 h-3 mr-1" /> Published
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-red-500 ml-auto"
                            onClick={() => deleteMutation.mutate(ad.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
