import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { MetricsCards } from "@/components/crm/metrics-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { crmApi } from "@/lib/crm-api";
import { format } from "date-fns";
import { Link } from "wouter";
import { ArrowRight, Clock, UserPlus } from "lucide-react";

export default function CrmDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/crm/stats"],
    queryFn: crmApi.getStats,
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
