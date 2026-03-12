import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { MetricsCards } from "@/components/crm/metrics-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";
import { format } from "date-fns";
import { Link } from "wouter";
import { ArrowRight, Clock, UserPlus, MessageSquare, Mail, Tag, TrendingUp, Calculator } from "lucide-react";

export default function CrmDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/crm/stats"],
    queryFn: crmApi.getStats,
  });

  const { data: followUpStats } = useQuery({
    queryKey: ["/api/crm/followup-stats"],
    queryFn: crmApi.getFollowUpStats,
    refetchInterval: 30_000,
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm">Overview of your cleaning business operations</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : stats ? (
          <MetricsCards stats={stats} />
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Leads</CardTitle>
              <Link href="/crm/pipeline">
                <span className="text-sm text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
                  View all <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
              ) : stats?.recentLeads?.length ? (
                <div className="space-y-3">
                  {stats.recentLeads.map((lead: any) => (
                    <div key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{lead.firstName} {lead.lastName}</p>
                          <p className="text-xs text-gray-500">{lead.source || "website"} - {lead.serviceType || "General"}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {(lead.pipelineStage || "new_lead").replace(/_/g, " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No leads yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Jobs</CardTitle>
              <Link href="/crm/jobs">
                <span className="text-sm text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
                  View all <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
              ) : stats?.recentJobs?.length ? (
                <div className="space-y-3">
                  {stats.recentJobs.map((job: any) => (
                    <div key={job.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-50 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm font-mono">{job.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-500">
                            {job.createdAt ? format(new Date(job.createdAt), "MMM d, yyyy") : "-"}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {(job.status || "assigned").replace(/_/g, " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No jobs yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {followUpStats && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Follow-Up Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <Calculator className="h-5 w-5 text-cyan-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-cyan-700">{followUpStats.totalQuoteLeads}</p>
                  <p className="text-xs text-gray-500">Quotes Sent</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <Clock className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-yellow-700">{followUpStats.pendingFollowUps}</p>
                  <p className="text-xs text-gray-500">Pending Follow-Ups</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <MessageSquare className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-blue-700">{followUpStats.smsReminders}</p>
                  <p className="text-xs text-gray-500">SMS Reminders</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Mail className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-purple-700">{followUpStats.emailReminders}</p>
                  <p className="text-xs text-gray-500">Email Reminders</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <Tag className="h-5 w-5 text-red-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-red-700">{followUpStats.discountOffers}</p>
                  <p className="text-xs text-gray-500">Discount Offers</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-700">{followUpStats.convertedFromFollowUp}</p>
                  <p className="text-xs text-gray-500">Bookings from Follow-Ups</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Auto-running
                </div>
                <span>10min SMS → 24hr Email → 3-day Discount</span>
              </div>
            </CardContent>
          </Card>
        )}

        {stats && Object.keys(stats.leadsByStage || {}).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Pipeline Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(stats.leadsByStage).map(([stage, count]) => (
                  <div key={stage} className="bg-gray-50 rounded-lg p-3 min-w-[120px]">
                    <p className="text-lg font-bold">{count as number}</p>
                    <p className="text-xs text-gray-500 capitalize">{stage.replace(/_/g, " ")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
