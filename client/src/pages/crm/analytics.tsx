import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";

const STAGE_COLORS: Record<string, string> = {
  new_lead: "#3B82F6",
  contacted: "#EAB308",
  qualified: "#8B5CF6",
  proposal_sent: "#F97316",
  negotiation: "#EC4899",
  won: "#22C55E",
  lost: "#EF4444",
  converted: "#10B981",
};

const JOB_COLORS: Record<string, string> = {
  assigned: "#3B82F6",
  en_route: "#6366F1",
  in_progress: "#EAB308",
  completed: "#22C55E",
  cancelled: "#EF4444",
};

export default function CrmAnalytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/crm/stats"],
    queryFn: crmApi.getStats,
  });

  const conversionRate = stats && stats.totalLeads > 0
    ? ((stats.totalClients / stats.totalLeads) * 100).toFixed(1)
    : "0";

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500 text-sm">Business performance and pipeline analytics</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[300px]" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pipeline Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.leadsByStage || {}).map(([stage, count]) => {
                    const total = stats.totalLeads || 1;
                    const pct = ((count as number) / total) * 100;
                    return (
                      <div key={stage}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{stage.replace(/_/g, " ")}</span>
                          <span className="font-medium">{count as number}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: STAGE_COLORS[stage] || "#6B7280" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(stats.leadsByStage || {}).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No pipeline data yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.jobsByStatus || {}).map(([status, count]) => {
                    const total = stats.totalJobs || 1;
                    const pct = ((count as number) / total) * 100;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{status.replace(/_/g, " ")}</span>
                          <span className="font-medium">{count as number}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: JOB_COLORS[status] || "#6B7280" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(stats.jobsByStatus || {}).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No job data yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-700">{stats.totalLeads}</p>
                    <p className="text-sm text-blue-600">Total Leads</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-700">{stats.totalClients}</p>
                    <p className="text-sm text-green-600">Active Clients</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-purple-700">{conversionRate}%</p>
                    <p className="text-sm text-purple-600">Conversion Rate</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-orange-700">{stats.totalJobs}</p>
                    <p className="text-sm text-orange-600">Total Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Appointments Scheduled</span>
                    <span className="text-lg font-bold">{stats.totalAppointments}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Completed Jobs</span>
                    <span className="text-lg font-bold">{stats.jobsByStatus?.completed || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">In Progress Jobs</span>
                    <span className="text-lg font-bold">{stats.jobsByStatus?.in_progress || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">New Leads</span>
                    <span className="text-lg font-bold">{stats.leadsByStage?.new_lead || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
