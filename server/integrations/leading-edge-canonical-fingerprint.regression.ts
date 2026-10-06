import { parseLeadingEdgeHandoffEvent } from "./leading-edge-handoff";
import { fingerprintHandoffPayload } from "./handoff-fingerprint";

const base = {
  schemaVersion: "1.0",
  eventId: "evt_semantic_fingerprint",
  sourceSystem: "leading_edge",
  sourceBrand: "Leading Edge",
  sourceLeadId: "lead_semantic_fingerprint",
  contact: { email: "preview@example.com" },
  consent: { contactAllowed: true },
  service: { type: "residential" },
  qualification: { answers: {}, score: 80, sourceScore: { value: 8, scaleMin: 1, scaleMax: 10 } },
  routing: { target: "self_maid" },
  lifecycleStatus: "qualified",
  createdAt: "2026-10-01T12:00:00.000Z",
  updatedAt: "2026-10-01T12:00:00.000Z",
  history: [],
};

const withUnknownTransportNoise = {
  ...base,
  ignoredTransportField: "must-not-change-semantic-fingerprint",
};

const canonicalBase = parseLeadingEdgeHandoffEvent(base);
const canonicalNoisy = parseLeadingEdgeHandoffEvent(withUnknownTransportNoise);

if (fingerprintHandoffPayload(canonicalBase) !== fingerprintHandoffPayload(canonicalNoisy)) {
  throw new Error("Unknown transport fields must not change the canonical handoff fingerprint.");
}

const changed = parseLeadingEdgeHandoffEvent({ ...base, notes: "meaningful contract change" });
if (fingerprintHandoffPayload(canonicalBase) === fingerprintHandoffPayload(changed)) {
  throw new Error("Meaningful contract fields must change the canonical handoff fingerprint.");
}
