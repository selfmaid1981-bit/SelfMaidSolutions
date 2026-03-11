export const PIPELINE_STAGES = [
  { key: "new_lead", label: "New Lead", color: "#3B82F6" },
  { key: "quote_requested", label: "Quote Requested", color: "#06B6D4" },
  { key: "contacted", label: "Contacted", color: "#EAB308" },
  { key: "qualified", label: "Qualified", color: "#8B5CF6" },
  { key: "proposal_sent", label: "Proposal Sent", color: "#F97316" },
  { key: "negotiation", label: "Negotiation", color: "#EC4899" },
  { key: "won", label: "Won", color: "#22C55E" },
  { key: "lost", label: "Lost", color: "#EF4444" },
  { key: "converted", label: "Converted", color: "#10B981" },
] as const;

export const JOB_STATUSES = [
  { key: "assigned", label: "Assigned", color: "#3B82F6" },
  { key: "en_route", label: "En Route", color: "#6366F1" },
  { key: "in_progress", label: "In Progress", color: "#EAB308" },
  { key: "completed", label: "Completed", color: "#22C55E" },
  { key: "cancelled", label: "Cancelled", color: "#EF4444" },
] as const;

export const APPOINTMENT_STATUSES = [
  { key: "scheduled", label: "Scheduled", color: "#3B82F6" },
  { key: "confirmed", label: "Confirmed", color: "#22C55E" },
  { key: "in_progress", label: "In Progress", color: "#EAB308" },
  { key: "completed", label: "Completed", color: "#6B7280" },
  { key: "cancelled", label: "Cancelled", color: "#EF4444" },
  { key: "no_show", label: "No Show", color: "#F97316" },
] as const;

export const SERVICE_TYPES = [
  { value: "standard_cleaning", label: "Standard Cleaning", basePrice: 12000 },
  { value: "deep_cleaning", label: "Deep Cleaning", basePrice: 20000 },
  { value: "move_in_out", label: "Move In/Out Cleaning", basePrice: 25000 },
  { value: "airbnb_turnover", label: "Airbnb Turnover", basePrice: 15000 },
  { value: "commercial", label: "Commercial Cleaning", basePrice: 30000 },
] as const;

export const LEAD_SOURCES = [
  "website", "referral", "google", "facebook", "phone", "email", "door_hanger", "flyer", "other"
] as const;
