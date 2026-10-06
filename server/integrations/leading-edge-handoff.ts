import {
  ecosystemHandoffEventSchema,
  handoffIdempotencyKey,
  type EcosystemHandoffEvent,
} from "../../shared/handoff-contract";

export type SelfMaidInboundLead = {
  idempotencyKey: string;
  sourceEventId: string;
  sourceLeadId: string;
  sourceSystem: "playhard" | "leading_edge" | "self_maid";
  sourceBrand: string;
  campaign?: string;
  channel?: string;
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    preferredContact?: "email" | "phone" | "sms" | "none";
    contactAllowed: boolean;
  };
  service: {
    type: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    requestedDate?: string;
    notes?: string;
  };
  qualificationScore?: number;
  sourceQualificationScore?: {
    value: number;
    scaleMin: number;
    scaleMax: number;
  };
  routingTarget?: string;
  upstreamStatus: EcosystemHandoffEvent["lifecycleStatus"];
  notes?: string;
  receivedAt: string;
};

export function parseLeadingEdgeHandoffEvent(input: unknown): EcosystemHandoffEvent {
  const event = ecosystemHandoffEventSchema.parse(input);

  if (event.sourceSystem !== "leading_edge") {
    throw new Error("Self-Maid inbound adapter only accepts Leading Edge handoffs.");
  }

  if (!["qualified", "routed", "handed_off"].includes(event.lifecycleStatus)) {
    throw new Error(
      `Self-Maid cannot accept lifecycle status '${event.lifecycleStatus}' for a new operational handoff.`,
    );
  }

  return event;
}

export function mapLeadingEdgeEventToInboundLead(event: EcosystemHandoffEvent): SelfMaidInboundLead {

  return {
    idempotencyKey: handoffIdempotencyKey(event),
    sourceEventId: event.eventId,
    sourceLeadId: event.sourceLeadId,
    sourceSystem: event.sourceSystem,
    sourceBrand: event.sourceBrand,
    campaign: event.campaign,
    channel: event.channel,
    customer: {
      name: event.contact.name,
      email: event.contact.email,
      phone: event.contact.phone,
      preferredContact: event.contact.preferredMethod,
      contactAllowed: event.consent.contactAllowed,
    },
    service: {
      type: event.service.type,
      address: event.service.area?.address,
      city: event.service.area?.city,
      state: event.service.area?.state,
      zipCode: event.service.area?.zipCode,
      requestedDate: event.service.requestedDate,
      notes: event.service.notes,
    },
    qualificationScore: event.qualification.score,
    sourceQualificationScore: event.qualification.sourceScore,
    routingTarget: event.routing.target,
    upstreamStatus: event.lifecycleStatus,
    notes: event.notes,
    receivedAt: new Date().toISOString(),
  };
}

export function parseLeadingEdgeHandoff(input: unknown): SelfMaidInboundLead {
  return mapLeadingEdgeEventToInboundLead(parseLeadingEdgeHandoffEvent(input));
}

export function mapInboundLeadToQuoteDraft(lead: SelfMaidInboundLead) {
  return {
    name: lead.customer.name || "Lead",
    email: lead.customer.email,
    phone: lead.customer.phone,
    serviceType: lead.service.type,
    frequency: "one_time",
    estimatedPrice: 0,
  };
}

export function mapInboundLeadToBookingDraft(lead: SelfMaidInboundLead) {
  return {
    firstName: lead.customer.name?.split(" ")[0] || "Lead",
    lastName: lead.customer.name?.split(" ").slice(1).join(" ") || "",
    email: lead.customer.email,
    phone: lead.customer.phone,
    serviceType: lead.service.type,
    address: lead.service.address,
    city: lead.service.city,
    state: lead.service.state,
    zipCode: lead.service.zipCode,
    preferredDate: lead.service.requestedDate?.slice(0, 10),
    specialInstructions: lead.service.notes,
    status: "pending",
  };
}
