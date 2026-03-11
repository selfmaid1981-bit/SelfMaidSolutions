import { useQuery } from "@tanstack/react-query";
import { TenantNav } from "@/components/saas/tenant-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";
import { useTenant } from "@/hooks/use-tenant";
import { Users, UserPlus, Calendar, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SaasDashboard() {
  const { companyName, tier } = useTenant();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/crm/stats"],
    queryFn: crmApi.getStats,
  });

  const cards = [
    { label: "Leads", value: stats?.totalLeads || 0, icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Clients", value: stats?.totalClients || 0, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Appointments", value: stats?.totalAppointments || 0, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Jobs", value: stats?.totalJobs || 0, icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <TenantNav>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{companyName || "SaaS Dashboard"}</h1>
            <p className="text-gray-500 text-sm">
              {tier && <Badge variant="secondary" className="capitalize mr-2">{tier} plan</Badge>}
              Welcome to your business operations center
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map(card => (
              <Card key={card.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${card.bg}`}>
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{card.value}</p>
                      <p className="text-xs text-gray-500">{card.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/crm/pipeline">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm">Manage Pipeline</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
              <Link href="/crm/appointments">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm">Schedule Appointment</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
              <Link href="/saas/lead-discovery">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm">Discover Leads</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
              <Link href="/saas/billing">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm">Manage Billing</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {stats && Object.keys(stats.leadsByStage || {}).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(stats.leadsByStage).map(([stage, count]) => (
                    <div key={stage} className="flex items-center justify-between text-sm">
                      <span className="capitalize text-gray-600">{stage.replace(/_/g, " ")}</span>
                      <Badge variant="secondary">{count as number}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No pipeline data yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantNav>
  );
}
