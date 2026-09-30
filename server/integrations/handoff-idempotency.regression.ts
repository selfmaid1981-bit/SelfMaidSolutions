import {
  decideHandoffIdempotency,
  type HandoffReceipt,
  type HandoffReceiptStore,
} from "./handoff-idempotency";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

class MemoryReceiptStore implements HandoffReceiptStore {
  constructor(private receipt?: HandoffReceipt) {}

  async find(idempotencyKey: string) {
    return this.receipt?.idempotencyKey === idempotencyKey ? this.receipt : undefined;
  }

  async save(receipt: HandoffReceipt) {
    this.receipt = receipt;
  }
}

const candidate: HandoffReceipt = {
  idempotencyKey: "1.0:leading_edge:lead_123:qualified",
  sourceEventId: "evt_123",
  payloadFingerprint: "fingerprint-a",
  firstReceivedAt: "2026-09-30T15:00:00.000Z",
};

const fresh = await decideHandoffIdempotency(new MemoryReceiptStore(), candidate);
assert(fresh.kind === "accept", "A previously unseen handoff must be accepted.");

const duplicate = await decideHandoffIdempotency(new MemoryReceiptStore(candidate), {
  ...candidate,
  firstReceivedAt: "2026-09-30T15:01:00.000Z",
});
assert(duplicate.kind === "duplicate", "An identical redelivery must be classified as a duplicate.");

const changedPayload = await decideHandoffIdempotency(new MemoryReceiptStore(candidate), {
  ...candidate,
  payloadFingerprint: "fingerprint-b",
});
assert(changedPayload.kind === "conflict", "A reused idempotency key with changed payload must conflict.");

const changedEvent = await decideHandoffIdempotency(new MemoryReceiptStore(candidate), {
  ...candidate,
  sourceEventId: "evt_456",
});
assert(changedEvent.kind === "conflict", "A reused idempotency key with a different event ID must conflict.");
