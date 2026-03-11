import { db } from "../db";
import { leads } from "@shared/schema";
import { eq } from "drizzle-orm";

const PIPELINE_STAGES = [
  "new_lead",
  "contacted",
  "qualified",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
  "converted",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export function isValidStage(stage: string): stage is PipelineStage {
  return PIPELINE_STAGES.includes(stage as PipelineStage);
}

export async function moveLeadToStage(leadId: string, stage: PipelineStage) {
  if (!isValidStage(stage)) throw new Error(`Invalid pipeline stage: ${stage}`);
  const [updated] = await db
    .update(leads)
    .set({ pipelineStage: stage, updatedAt: new Date() })
    .where(eq(leads.id, leadId))
    .returning();
  return updated;
}

export function scoreLead(lead: { email?: string | null; phone?: string | null; serviceType?: string | null; source?: string | null; address?: string | null }): number {
  let score = 0;
  if (lead.email) score += 20;
  if (lead.phone) score += 25;
  if (lead.serviceType) score += 15;
  if (lead.address) score += 10;
  if (lead.source === "referral") score += 20;
  else if (lead.source === "google") score += 15;
  else if (lead.source === "website") score += 10;
  else if (lead.source === "facebook") score += 10;
  return Math.min(score, 100);
}
