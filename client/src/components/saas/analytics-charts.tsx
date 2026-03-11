import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsChartsProps {
  data: {
    leadsByStage?: Record<string, number>;
    jobsByStatus?: Record<string, number>;
    totalLeads?: number;
    totalClients?: number;
    totalJobs?: number;
  };
}

const COLORS = ["#3B82F6", "#8B5CF6", "#EAB308", "#F97316", "#EC4899", "#22C55E", "#EF4444", "#10B981"];

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const stages = Object.entries(data.leadsByStage || {});
  const statuses = Object.entries(data.jobsByStatus || {});
  const maxStageVal = Math.max(...stages.map(([, v]) => v as number), 1);
  const maxStatusVal = Math.max(...statuses.map(([, v]) => v as number), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leads by Stage</CardTitle>
        </CardHeader>
        <CardContent>
          {stages.length > 0 ? (
            <div className="space-y-2">
              {stages.map(([stage, count], i) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className="text-xs w-24 text-right capitalize truncate">{stage.replace(/_/g, " ")}</span>
                  <div className="flex-1 bg-gray-100 rounded h-6 relative">
                    <div
                      className="h-6 rounded flex items-center justify-end pr-2 text-xs text-white font-medium"
                      style={{
                        width: `${Math.max(((count as number) / maxStageVal) * 100, 10)}%`,
                        backgroundColor: COLORS[i % COLORS.length],
                      }}
                    >
                      {count as number}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Jobs by Status</CardTitle>
        </CardHeader>
        <CardContent>
          {statuses.length > 0 ? (
            <div className="space-y-2">
              {statuses.map(([status, count], i) => (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-xs w-24 text-right capitalize truncate">{status.replace(/_/g, " ")}</span>
                  <div className="flex-1 bg-gray-100 rounded h-6 relative">
                    <div
                      className="h-6 rounded flex items-center justify-end pr-2 text-xs text-white font-medium"
                      style={{
                        width: `${Math.max(((count as number) / maxStatusVal) * 100, 10)}%`,
                        backgroundColor: COLORS[(i + 3) % COLORS.length],
                      }}
                    >
                      {count as number}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
