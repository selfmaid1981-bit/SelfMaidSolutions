import { db } from "../db";
import { subscriptions, companies } from "@shared/schema";
import { eq } from "drizzle-orm";
import { getUncachableStripeClient } from "../stripeClient";

export interface CreateSubscriptionParams {
  companyId: string;
  priceId: string;
  customerId?: string;
  trialDays?: number;
}

export interface SubscriptionResult {
  subscriptionId: string;
  stripeSubscriptionId: string;
  clientSecret?: string;
  status: string;
}

export async function createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult> {
  const stripe = await getUncachableStripeClient();

  let stripeCustomerId = params.customerId;

  if (!stripeCustomerId) {
    const [company] = await db
      .select()
      .from(companies)
      .where(eq(companies.id, params.companyId))
      .limit(1);

    if (company?.stripeCustomerId) {
      stripeCustomerId = company.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        metadata: { companyId: params.companyId },
      });
      stripeCustomerId = customer.id;

      await db
        .update(companies)
        .set({ stripeCustomerId: customer.id, updatedAt: new Date() })
        .where(eq(companies.id, params.companyId));
    }
  }

  const subscriptionParams: any = {
    customer: stripeCustomerId,
    items: [{ price: params.priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
    metadata: { companyId: params.companyId },
  };

  if (params.trialDays) {
    subscriptionParams.trial_period_days = params.trialDays;
  }

  const stripeSubscription = await stripe.subscriptions.create(subscriptionParams);

  const tier = determineTier(params.priceId);
  const subData = stripeSubscription as any;

  const [sub] = await db
    .insert(subscriptions)
    .values({
      companyId: params.companyId,
      stripeSubscriptionId: stripeSubscription.id,
      stripePriceId: params.priceId,
      tier,
      status: stripeSubscription.status,
      currentPeriodStart: subData.current_period_start
        ? new Date(subData.current_period_start * 1000)
        : null,
      currentPeriodEnd: subData.current_period_end
        ? new Date(subData.current_period_end * 1000)
        : null,
    })
    .returning();

  await db
    .update(companies)
    .set({
      subscriptionTier: tier,
      subscriptionStatus: stripeSubscription.status,
      updatedAt: new Date(),
    })
    .where(eq(companies.id, params.companyId));

  const invoice = stripeSubscription.latest_invoice as any;
  const clientSecret = invoice?.payment_intent?.client_secret;

  return {
    subscriptionId: sub.id,
    stripeSubscriptionId: stripeSubscription.id,
    clientSecret,
    status: stripeSubscription.status,
  };
}

export async function cancelSubscription(stripeSubscriptionId: string): Promise<void> {
  const stripe = await getUncachableStripeClient();
  await stripe.subscriptions.cancel(stripeSubscriptionId);
}

export async function handleSubscriptionWebhook(event: any): Promise<void> {
  const sub = event.data.object;
  const companyId = sub.metadata?.companyId;

  if (!companyId) return;

  const tier = determineTier(sub.items?.data?.[0]?.price?.id);

  await db
    .update(subscriptions)
    .set({
      status: sub.status,
      currentPeriodStart: sub.current_period_start
        ? new Date(sub.current_period_start * 1000)
        : null,
      currentPeriodEnd: sub.current_period_end
        ? new Date(sub.current_period_end * 1000)
        : null,
      cancelAt: sub.cancel_at
        ? new Date(sub.cancel_at * 1000)
        : null,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, sub.id));

  await db
    .update(companies)
    .set({
      subscriptionTier: tier,
      subscriptionStatus: stripeSubscription.status,
      updatedAt: new Date(),
    })
    .where(eq(companies.id, companyId));
}

function determineTier(priceId?: string): string {
  if (!priceId) return "starter";
  const tierMap: Record<string, string> = {
    price_starter_monthly: "starter",
    price_professional_monthly: "professional",
    price_enterprise_monthly: "enterprise",
  };
  return tierMap[priceId] || "starter";
}
