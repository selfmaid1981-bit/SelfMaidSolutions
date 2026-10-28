import { z } from "zod";

export const ecosystemLifecycleStatuses = [
  "new",
  "qualifying",
  "qualified",
  "routed",
  "handed_off",
  "quoted",
  "scheduled",
  "in_progress",
  "completed",
  "qa_pending",
  "qa_complete",
  "follow_up",
  "retained",
  "lost",
  "disqualified",
] as const;

export const ecosystemLifecycleStatusSchema = z.enum(ecosystemLifecycleStatuses);

const contactSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().min(7).optional(),
  preferredMethod: z.enum(["email", "phone", "sms", "none"]).optional(),
}).refine(
  (contact) => Boolean(contact.email || contact.phone),
  { message: "At least one contact method (email or phone) is required." },
);

export const ecosystemHandoffEventSchema = z.object({
  schemaVersion: z.literal("1.0"),
  eventId: z.string().min(1),
  sourceSystem: z.enum(["playhard", "leading_edge", "self_maid"]),
  sourceBrand: z.string().min(1),
  campaign: z.string().optional(),
  channel: z.string().optional(),
  sourceLeadId: z.string().min(1),
  contact: contactSchema,
  consent: z.object({
    contactAllowed: z.boolean(),
    notes: z.string().optional(),
  }),
  service: z.object({
    type: z.string().min(1),
    area: z.object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
    }).optional(),
    requestedDate: z.string().datetime().optional(),
    notes: z.string().optional(),
  }),
  qualification: z.object({
    answers: z.record(z.unknown()).default({}),
    score: z.number().min(0).max(100).optional(),
  }).default({ answers: {} }),
  routing: z.object({
    target: z.string().optional(),
    owner: z.string().optional(),
  }).default({}),
  lifecycleStatus: ecosystemLifecycleStatusSchema,
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  handoffAt: z.string().datetime().optional(),
  history: z.array(z.object({
    status: ecosystemLifecycleStatusSchema,
    at: z.string().datetime(),
    actor: z.string().optional(),
    note: z.string().optional(),
  })).default([]),
});

export type EcosystemHandoffEvent = z.infer<typeof ecosystemHandoffEventSchema>;

export function handoffIdempotencyKey(event: EcosystemHandoffEvent) {
  return `${event.schemaVersion}:${event.sourceSystem}:${event.sourceLeadId}:${event.lifecycleStatus}`;
}
