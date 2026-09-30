import { fingerprintHandoffPayload } from "./handoff-fingerprint";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const first = {
  eventId: "evt_123",
  sourceLeadId: "lead_123",
  service: { type: "residential", area: { state: "AL", city: "Montgomery" } },
};

const reordered = {
  service: { area: { city: "Montgomery", state: "AL" }, type: "residential" },
  sourceLeadId: "lead_123",
  eventId: "evt_123",
};

assert(
  fingerprintHandoffPayload(first) === fingerprintHandoffPayload(reordered),
  "Equivalent objects with different key order must produce the same fingerprint.",
);

assert(
  fingerprintHandoffPayload(first) !== fingerprintHandoffPayload({ ...first, sourceLeadId: "lead_456" }),
  "A meaningful payload change must produce a different fingerprint.",
);

assert(
  fingerprintHandoffPayload({ values: ["a", "b"] }) !== fingerprintHandoffPayload({ values: ["b", "a"] }),
  "Array order must remain significant.",
);
