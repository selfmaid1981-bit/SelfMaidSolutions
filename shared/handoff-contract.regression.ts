import { ecosystemHandoffEventSchema } from "./handoff-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const baseEvent = {
  schemaVersion: "1.0" as const,
  eventId: "evt_lead_123",
  sourceSystem: "leading_edge" as const,
  sourceBrand: "Leading Edge",
  sourceLeadId: "lead_123",
  contact: {
    email: "lead@example.com",
  },
  consent: {
    contactAllowed: true,
  },
  service: {
    type: "residential" as const,
    area: {
      city: "Montgomery",
      state: "AL",
    },
  },
  qualification: {
    answers: {},
    score: 80,
    sourceScore: {
      value: 8,
      scaleMin: 1,
      scaleMax: 10,
    },
  },
  routing: {
    target: "self_maid",
  },
  lifecycleStatus: "qualified" as const,
  createdAt: "2026-09-30T12:00:00.000Z",
  updatedAt: "2026-09-30T12:00:00.000Z",
  history: [],
};

const valid = ecosystemHandoffEventSchema.safeParse(baseEvent);
assert(valid.success, "Expected canonical 80/100 score with preserved Leading Edge 8/10 source score to be accepted.");

const invalidScale = ecosystemHandoffEventSchema.safeParse({
  ...baseEvent,
  qualification: {
    ...baseEvent.qualification,
    sourceScore: {
      value: 11,
      scaleMin: 1,
      scaleMax: 10,
    },
  },
});
assert(!invalidScale.success, "Expected source score outside its declared scale to be rejected.");

const invalidRange = ecosystemHandoffEventSchema.safeParse({
  ...baseEvent,
  qualification: {
    ...baseEvent.qualification,
    sourceScore: {
      value: 8,
      scaleMin: 10,
      scaleMax: 1,
    },
  },
});
assert(!invalidRange.success, "Expected an inverted source score scale to be rejected.");
