import { db } from "../db";
import { callLogs } from "@shared/schema";
import { eq } from "drizzle-orm";
import { BUSINESS_NAME, BUSINESS_PHONE } from "../config";

export function generateGreeting(businessName?: string): string {
  const name = businessName || BUSINESS_NAME;
  return `Thank you for calling ${name}! I'm our AI assistant. I can help you schedule a cleaning, get a quote, or answer questions about our services. How can I help you today?`;
}

export async function createCallLog(data: {
  companyId?: string;
  twilioCallSid: string;
  callerPhone?: string;
  direction?: string;
}) {
  const [log] = await db
    .insert(callLogs)
    .values({
      companyId: data.companyId,
      twilioCallSid: data.twilioCallSid,
      callerPhone: data.callerPhone,
      direction: data.direction || "inbound",
      status: "ringing",
    })
    .returning();
  return log;
}

export async function updateCallStatus(callSid: string, status: string, durationSeconds?: number) {
  const [log] = await db
    .update(callLogs)
    .set({
      status,
      durationSeconds: durationSeconds || undefined,
      updatedAt: new Date(),
    })
    .where(eq(callLogs.twilioCallSid, callSid))
    .returning();
  return log || undefined;
}

export async function getCallLog(callSid: string) {
  const [log] = await db.select().from(callLogs).where(eq(callLogs.twilioCallSid, callSid));
  return log || undefined;
}
