import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { MetricsCards } from "@/components/crm/metrics-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";
import { format } from "date-fns";
import { Link } from "wouter";
import { ArrowRight, ArrowDown, Clock, UserPlus, MessageSquare, Mail, Tag, TrendingUp, Calculator, CheckCircle2, Percent } from "lucide-react";
import { QueryErrorState } from "@/components/error-boundary";

export default function CrmDashboard() {
  const { data: stats, isLoading, isError, refetch } = useQuery({
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
        ) : isError ? (
          <QueryErrorState message="Failed to load dashboard stats" onRetry={() => refetch()} />
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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Follow-Up Automation Pipeline</CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col lg:flex-row items-stretch gap-0">
                <div className="flex-1 relative">
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-xl p-5 text-center h-full flex flex-col justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-sm border border-cyan-200">
                      <Calculator className="h-5 w-5 text-cyan-600" />
                    </div>
                    <p className="text-3xl font-bold text-cyan-700">{followUpStats.totalQuoteLeads}</p>
                    <p className="text-xs font-medium text-cyan-600 mt-1">Quotes Created</p>
                    <p className="text-[10px] text-cyan-500 mt-0.5">Immediately</p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:px-1 py-2 lg:py-0">
                  <ArrowDown className="h-5 w-5 text-gray-300 lg:hidden" />
                  <ArrowRight className="h-5 w-5 text-gray-300 hidden lg:block" />
                </div>

                <div className="flex-1 relative">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-5 text-center h-full flex flex-col justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-sm border border-blue-200">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-700">{followUpStats.smsReminders}</p>
                    <p className="text-xs font-medium text-blue-600 mt-1">SMS Sent</p>
                    <p className="text-[10px] text-blue-500 mt-0.5">After 10 min</p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:px-1 py-2 lg:py-0">
                  <ArrowDown className="h-5 w-5 text-gray-300 lg:hidden" />
                  <ArrowRight className="h-5 w-5 text-gray-300 hidden lg:block" />
                </div>

                <div className="flex-1 relative">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-5 text-center h-full flex flex-col justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-sm border border-purple-200">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-700">{followUpStats.emailReminders}</p>
                    <p className="text-xs font-medium text-purple-600 mt-1">Email Reminders</p>
                    <p className="text-[10px] text-purple-500 mt-0.5">After 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:px-1 py-2 lg:py-0">
                  <ArrowDown className="h-5 w-5 text-gray-300 lg:hidden" />
                  <ArrowRight className="h-5 w-5 text-gray-300 hidden lg:block" />
                </div>

                <div className="flex-1 relative">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5 text-center h-full flex flex-col justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-sm border border-red-200">
                      <Tag className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-700">{followUpStats.discountOffers}</p>
                    <p className="text-xs font-medium text-red-600 mt-1">15% Discount Offers</p>
                    <p className="text-[10px] text-red-500 mt-0.5">After 3 days</p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:px-1 py-2 lg:py-0">
                  <ArrowDown className="h-5 w-5 text-gray-300 lg:hidden" />
                  <ArrowRight className="h-5 w-5 text-gray-300 hidden lg:block" />
                </div>

                <div className="flex-1 relative">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl p-5 text-center h-full flex flex-col justify-center">
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-sm border border-green-300">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-700">{followUpStats.convertedFromFollowUp}</p>
                    <p className="text-xs font-medium text-green-600 mt-1">Booked</p>
                    <p className="text-[10px] text-green-500 mt-0.5">Converted</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{followUpStats.pendingFollowUps}</p>
                    <p className="text-xs text-gray-500">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{followUpStats.completedFollowUps}</p>
                    <p className="text-xs text-gray-500">Sequences Done</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="bg-emerald-100 rounded-full p-2">
                    <Percent className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {followUpStats.totalQuoteLeads > 0
                        ? Math.round((followUpStats.convertedFromFollowUp / followUpStats.totalQuoteLeads) * 100)
                        : 0}%
                    </p>
                    <p className="text-xs text-gray-500">Conversion Rate</p>
                  </div>
                </div>
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
