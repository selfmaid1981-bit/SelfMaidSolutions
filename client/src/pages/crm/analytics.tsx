import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";
import { MessageSquare, Mail, Tag, TrendingUp } from "lucide-react";

const STAGE_COLORS: Record<string, string> = {
  new_lead: "#3B82F6",
  quote_requested: "#06B6D4",
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

  const { data: followUpStats } = useQuery({
    queryKey: ["/api/crm/followup-stats"],
    queryFn: crmApi.getFollowUpStats,
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
                    <p className="text-sm text-purple-600">Lead → Client Rate</p>
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
                <CardTitle className="text-base">Quote Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                    <span className="text-sm text-cyan-700 font-medium">Total Quotes</span>
                    <span className="text-lg font-bold text-cyan-800">{stats.totalQuotes ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                    <span className="text-sm text-cyan-700 font-medium">Quote Leads (Pipeline)</span>
                    <span className="text-lg font-bold text-cyan-800">{stats.leadsByStage?.quote_requested || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-emerald-700 font-medium">Quote → Booking Rate</span>
                    <span className="text-lg font-bold text-emerald-800">{stats.quoteConversionRate ?? 0}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Appointments Scheduled</span>
                    <span className="text-lg font-bold">{stats.totalAppointments}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Completed Jobs</span>
                    <span className="text-lg font-bold">{stats.jobsByStatus?.completed || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {followUpStats && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Follow-Up Automation Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-blue-700">{followUpStats.smsReminders}</p>
                        <p className="text-xs text-blue-600">SMS Reminders Sent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <Mail className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold text-purple-700">{followUpStats.emailReminders}</p>
                        <p className="text-xs text-purple-600">Email Reminders Sent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <Tag className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="text-2xl font-bold text-red-700">{followUpStats.discountOffers}</p>
                        <p className="text-xs text-red-600">Discount Offers Sent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold text-green-700">{followUpStats.convertedFromFollowUp}</p>
                        <p className="text-xs text-green-600">Bookings from Follow-Ups</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold">{followUpStats.totalQuoteLeads}</p>
                      <p className="text-xs text-gray-500">Total Quote Leads</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-lg font-bold text-yellow-700">{followUpStats.pendingFollowUps}</p>
                      <p className="text-xs text-gray-500">Pending Sequences</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-700">{followUpStats.completedFollowUps}</p>
                      <p className="text-xs text-gray-500">Completed Sequences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
