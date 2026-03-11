export const SUBSCRIPTION_TIERS = {
  starter: {
    name: "Starter",
    priceMonthly: 4900,
    features: ["CRM Dashboard", "Up to 50 leads/month", "Basic analytics", "Email notifications"],
    limits: { maxLeads: 50, maxClients: 100, smsEnabled: false, aiReceptionist: false, leadDiscovery: false },
  },
  professional: {
    name: "Professional",
    priceMonthly: 9900,
    features: ["Everything in Starter", "Unlimited leads", "Advanced analytics", "SMS automation", "Email campaigns", "Pipeline management"],
    limits: { maxLeads: -1, maxClients: -1, smsEnabled: true, aiReceptionist: false, leadDiscovery: false },
  },
  enterprise: {
    name: "Enterprise",
    priceMonthly: 19900,
    features: ["Everything in Professional", "AI Receptionist", "Lead Discovery Engine", "Multi-location support", "Priority support", "Custom integrations"],
    limits: { maxLeads: -1, maxClients: -1, smsEnabled: true, aiReceptionist: true, leadDiscovery: true },
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const SUBSCRIPTION_STATUSES = [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "paused",
] as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];
