import { db } from "../db";
import { callTranscripts } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function saveTranscript(data: {
  callLogId: string;
  transcript: string;
  extractedData?: any;
  aiSummary?: string;
  sentiment?: string;
}) {
  const [record] = await db
    .insert(callTranscripts)
    .values({
      callLogId: data.callLogId,
      transcript: data.transcript,
      extractedData: data.extractedData,
      aiSummary: data.aiSummary,
      sentiment: data.sentiment,
    })
    .returning();
  return record;
}

export async function getTranscript(callLogId: string) {
  const [record] = await db.select().from(callTranscripts).where(eq(callTranscripts.callLogId, callLogId));
  return record || undefined;
}

export function extractIntent(transcript: string): { intent: string; confidence: number; entities: Record<string, string> } {
  const lower = transcript.toLowerCase();
  if (lower.includes("book") || lower.includes("schedule") || lower.includes("appointment")) {
    return { intent: "booking", confidence: 0.9, entities: {} };
  }
  if (lower.includes("price") || lower.includes("quote") || lower.includes("cost") || lower.includes("how much")) {
    return { intent: "quote", confidence: 0.85, entities: {} };
  }
  if (lower.includes("cancel")) {
    return { intent: "cancellation", confidence: 0.9, entities: {} };
  }
  if (lower.includes("reschedule") || lower.includes("change")) {
    return { intent: "reschedule", confidence: 0.85, entities: {} };
  }
  return { intent: "general_inquiry", confidence: 0.5, entities: {} };
}
