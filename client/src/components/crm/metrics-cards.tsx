import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Calendar, Briefcase, TrendingUp, DollarSign } from "lucide-react";

interface MetricsCardsProps {
  stats: {
    totalLeads: number;
    totalClients: number;
    totalAppointments: number;
    totalJobs: number;
    leadsByStage: Record<string, number>;
    jobsByStatus: Record<string, number>;
  };
}

export function MetricsCards({ stats }: MetricsCardsProps) {
  const cards = [
    { label: "Total Leads", value: stats.totalLeads, icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Clients", value: stats.totalClients, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Appointments", value: stats.totalAppointments, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Jobs", value: stats.totalJobs, icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Conversion Rate", value: stats.totalLeads > 0 ? `${Math.round((stats.totalClients / stats.totalLeads) * 100)}%` : "0%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Completed Jobs", value: stats.jobsByStatus?.completed || 0, icon: DollarSign, color: "text-cyan-600", bg: "bg-cyan-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
  );
}
