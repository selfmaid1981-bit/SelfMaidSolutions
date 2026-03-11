import { db } from "../db";
import { subscriptions } from "@shared/schema";
import { eq } from "drizzle-orm";

export const TIERS = {
  starter: { name: "Starter", priceMonthly: 4900, features: ["CRM", "Up to 50 leads", "Basic analytics"] },
  professional: { name: "Professional", priceMonthly: 9900, features: ["CRM", "Unlimited leads", "Advanced analytics", "SMS automation", "Email campaigns"] },
  enterprise: { name: "Enterprise", priceMonthly: 19900, features: ["Everything in Professional", "AI Receptionist", "Lead Discovery", "Multi-location", "Priority support"] },
} as const;

export type TierKey = keyof typeof TIERS;

export async function getSubscription(companyId: string) {
  const [sub] = await db.select().from(subscriptions).where(eq(subscriptions.companyId, companyId));
  return sub || undefined;
}

export async function createSubscription(data: {
  companyId: string;
  tier: TierKey;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  status?: string;
}) {
  const [sub] = await db
    .insert(subscriptions)
    .values({
      companyId: data.companyId,
      tier: data.tier,
      stripeSubscriptionId: data.stripeSubscriptionId,
      stripePriceId: data.stripePriceId,
      status: data.status || "trialing",
    })
    .returning();
  return sub;
}

export async function updateSubscription(id: string, data: Partial<typeof subscriptions.$inferSelect>) {
  const [sub] = await db
    .update(subscriptions)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(subscriptions.id, id))
    .returning();
  return sub || undefined;
}

export async function cancelSubscription(id: string) {
  return updateSubscription(id, { status: "canceled", cancelAt: new Date() });
}
