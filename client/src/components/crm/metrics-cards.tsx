import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Calendar, Briefcase, TrendingUp, DollarSign, Calculator, ArrowUpRight, BookOpen, Tag } from "lucide-react";

interface MetricsCardsProps {
  stats: {
    totalLeads: number;
    totalClients: number;
    totalAppointments: number;
    totalJobs: number;
    totalQuotes?: number;
    totalBookings?: number;
    quoteConversionRate?: number;
    discountBookings?: number;
    discountConversionRate?: number;
    leadsByStage: Record<string, number>;
    jobsByStatus: Record<string, number>;
  };
}

export function MetricsCards({ stats }: MetricsCardsProps) {
  const cards = [
    { label: "Quotes Generated", value: stats.totalQuotes ?? (stats.leadsByStage?.quote_requested || 0), icon: Calculator, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Bookings", value: stats.totalBookings ?? 0, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Quote → Booking", value: `${stats.quoteConversionRate ?? 0}%`, icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Discount Bookings", value: stats.discountBookings ?? 0, icon: Tag, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Discount Conv. Rate", value: `${stats.discountConversionRate ?? 0}%`, icon: TrendingUp, color: "text-red-600", bg: "bg-red-50" },
    { label: "Active Clients", value: stats.totalClients, icon: Users, color: "text-green-600", bg: "bg-green-50" },
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
