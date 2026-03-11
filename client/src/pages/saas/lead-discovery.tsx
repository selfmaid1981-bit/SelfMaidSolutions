import { useQuery } from "@tanstack/react-query";
import { TenantNav } from "@/components/saas/tenant-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, Globe, Phone } from "lucide-react";

export default function SaasLeadDiscovery() {
  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ["/api/saas/lead-discovery"],
    queryFn: async () => {
      const res = await fetch("/api/saas/lead-discovery", {
        headers: { "x-admin-api-key": import.meta.env.VITE_ADMIN_API_KEY || "" },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  });

  const statusColors: Record<string, string> = {
    discovered: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    interested: "bg-green-100 text-green-800",
    not_interested: "bg-red-100 text-red-800",
  };

  return (
    <TenantNav>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Lead Discovery</h1>
            <p className="text-gray-500 text-sm">Find local businesses that could become SaaS customers</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Search className="h-3 w-3" /> {businesses.length} businesses found
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48" />)}
          </div>
        ) : businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((biz: any) => (
              <Card key={biz.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm">{biz.businessName}</h3>
                    <Badge className={statusColors[biz.status] || "bg-gray-100 text-gray-800"} >
                      {(biz.status || "discovered").replace(/_/g, " ")}
                    </Badge>
                  </div>
                  {biz.category && <p className="text-xs text-gray-500">{biz.category}</p>}
                  {biz.address && <p className="text-xs text-gray-400">{biz.address}, {biz.city}, {biz.state}</p>}
                  <div className="flex gap-3 text-xs text-gray-500">
                    {biz.rating && (
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" /> {biz.rating}</span>
                    )}
                    {biz.reviewCount != null && <span>{biz.reviewCount} reviews</span>}
                    {biz.website && (
                      <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Website</span>
                    )}
                    {biz.phone && (
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {biz.phone}</span>
                    )}
                  </div>
                  {biz.leadScore != null && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min(biz.leadScore, 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">Score: {biz.leadScore}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No businesses discovered yet</h3>
              <p className="text-sm text-gray-400 mt-2">The lead discovery engine will populate this page as it finds local businesses in your area.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </TenantNav>
  );
}
