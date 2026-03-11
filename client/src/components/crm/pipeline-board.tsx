import { LeadCard } from "./lead-card";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  { key: "new_lead", label: "New Leads", color: "bg-blue-500" },
  { key: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { key: "qualified", label: "Qualified", color: "bg-purple-500" },
  { key: "proposal_sent", label: "Proposal Sent", color: "bg-orange-500" },
  { key: "negotiation", label: "Negotiation", color: "bg-pink-500" },
  { key: "won", label: "Won", color: "bg-green-500" },
];

interface PipelineBoardProps {
  leads: any[];
  onLeadClick?: (lead: any) => void;
}

export function PipelineBoard({ leads, onLeadClick }: PipelineBoardProps) {
  const grouped = STAGES.map(stage => ({
    ...stage,
    leads: leads.filter(l => l.pipelineStage === stage.key),
  }));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {grouped.map(stage => (
        <div key={stage.key} className="min-w-[280px] max-w-[280px] flex-shrink-0">
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
            <span className="font-semibold text-sm">{stage.label}</span>
            <Badge variant="secondary" className="ml-auto text-xs">{stage.leads.length}</Badge>
          </div>
          <div className="space-y-2 min-h-[200px] bg-gray-50 rounded-lg p-2">
            {stage.leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} onClick={() => onLeadClick?.(lead)} />
            ))}
            {stage.leads.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-8">No leads</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
