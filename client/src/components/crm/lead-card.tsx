import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";

const stageColors: Record<string, string> = {
  new_lead: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  proposal_sent: "bg-orange-100 text-orange-800",
  negotiation: "bg-pink-100 text-pink-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  converted: "bg-emerald-100 text-emerald-800",
};

export function LeadCard({ lead, onClick }: { lead: any; onClick?: () => void }) {
  const stageLabel = (lead.pipelineStage || "new_lead").replace(/_/g, " ");
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">{lead.firstName} {lead.lastName}</p>
          <Badge className={stageColors[lead.pipelineStage] || "bg-gray-100 text-gray-800"}>
            {stageLabel}
          </Badge>
        </div>
        {lead.serviceType && (
          <p className="text-xs text-gray-500">{lead.serviceType}</p>
        )}
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          {lead.email && (
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
          )}
          {lead.phone && (
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
          )}
          {lead.city && (
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {lead.city}, {lead.state}</span>
          )}
        </div>
        {lead.score != null && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min(lead.score, 100)}%` }} />
            </div>
            <span className="text-xs text-gray-500">{lead.score}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
