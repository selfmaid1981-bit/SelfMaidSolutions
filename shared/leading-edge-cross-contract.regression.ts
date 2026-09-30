import { ecosystemHandoffEventSchema } from "./handoff-contract";

/**
 * Mirrors the Leading Edge integration fixture so receiver compatibility can be
 * checked without network delivery or production data.
 */
const leadingEdgeFixture = {
  schemaVersion: "1.0",
  eventId: "evt_cross_validation_001",
  sourceSystem: "leading_edge",
  sourceBrand: "Leading Edge",
  campaign: "ecosystem-contract-validation",
  channel: "preview_fixture",
  sourceLeadId: "lead_cross_validation_001",
  contact: {
    name: "Preview Lead",
    email: "preview@example.com",
    preferredMethod: "email",
  },
  consent: { contactAllowed: true },
  service: {
    type: "residential",
    area: {
      address: "100 Test St",
      city: "Montgomery",
      state: "AL",
      zipCode: "36104",
    },
    requestedDate: "2026-10-02T15:00:00.000Z",
    notes: "Contract validation fixture only",
  },
  qualification: {
    answers: {},
    score: 80,
    sourceScore: { value: 8, scaleMin: 1, scaleMax: 10 },
  },
  routing: { target: "self_maid" },
  lifecycleStatus: "qualified",
  notes: "Non-production cross-contract validation fixture.",
  createdAt: "2026-09-30T15:00:00.000Z",
  updatedAt: "2026-09-30T16:00:00.000Z",
  handoffAt: "2026-09-30T16:00:00.000Z",
  history: [{
    status: "qualified",
    at: "2026-09-30T16:00:00.000Z",
    actor: "leading_edge",
    note: "Prepared for Self-Maid handoff.",
  }],
};

const result = ecosystemHandoffEventSchema.safeParse(leadingEdgeFixture);
if (!result.success) {
  throw new Error(`Leading Edge v1 fixture failed Self-Maid contract validation: ${result.error.message}`);
}
