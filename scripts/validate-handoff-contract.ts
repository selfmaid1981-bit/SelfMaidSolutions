import assert from "node:assert/strict";
import { parseLeadingEdgeHandoff, mapInboundLeadToQuoteDraft } from "../server/integrations/leading-edge-handoff";

function mustThrow(fn: () => unknown, message: string) {
  let threw = false;
  try { fn(); } catch { threw = true; }
  assert.equal(threw, true, message);
}

const fixture = {
  schemaVersion: "1.0",
  eventId: "leading-edge:lead-test-001:routed",
  sourceSystem: "leading_edge",
  sourceBrand: "Leading Edge",
  campaign: "playhard-test",
  channel: "landing_page",
  sourceLeadId: "lead-test-001",
  contact: {
    name: "Test Customer",
    email: "test@example.com",
    preferredMethod: "email",
  },
  consent: { contactAllowed: true },
  service: {
    type: "residential",
    area: {
      address: "1 Test St",
      city: "Selma",
      state: "AL",
      zipCode: "36701",
    },
  },
  qualification: { answers: {}, score: 80 },
  routing: { target: "self_maid" },
  lifecycleStatus: "routed",
  createdAt: "2026-09-26T12:00:00.000Z",
  updatedAt: "2026-09-26T12:05:00.000Z",
  handoffAt: "2026-09-26T12:05:00.000Z",
  history: [],
};

const parsed = parseLeadingEdgeHandoff(fixture);
assert.equal(parsed.sourceLeadId, "lead-test-001");
assert.equal(parsed.qualificationScore, 80);
assert.equal(parsed.routingTarget, "self_maid");

const duplicate = parseLeadingEdgeHandoff(fixture);
assert.equal(parsed.idempotencyKey, duplicate.idempotencyKey);

const quote = mapInboundLeadToQuoteDraft(parsed);
assert.equal(quote.serviceType, "residential");
assert.equal(quote.email, "test@example.com");

const optionalFixture = {
  ...fixture,
  eventId: "leading-edge:lead-test-002:qualified",
  sourceLeadId: "lead-test-002",
  lifecycleStatus: "qualified",
  contact: { phone: "3345550100", preferredMethod: "phone" },
  service: { type: "deep_clean" },
  routing: {},
};
const optionalParsed = parseLeadingEdgeHandoff(optionalFixture);
assert.equal(optionalParsed.customer.phone, "3345550100");

mustThrow(
  () => parseLeadingEdgeHandoff({ ...fixture, sourceSystem: "playhard" }),
  "Receiver should reject direct PlayHard operational handoffs",
);

mustThrow(
  () => parseLeadingEdgeHandoff({ ...fixture, lifecycleStatus: "completed" }),
  "Receiver should reject completed leads as new operational handoffs",
);

mustThrow(
  () => parseLeadingEdgeHandoff({
    ...fixture,
    contact: {},
  }),
  "Receiver should reject payloads with no contact method",
);

console.log("self-maid handoff receiver validation passed");
