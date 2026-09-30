export type HandoffReceipt = {
  idempotencyKey: string;
  sourceEventId: string;
  payloadFingerprint: string;
  firstReceivedAt: string;
};

export type IdempotencyDecision =
  | { kind: "accept"; receipt: HandoffReceipt }
  | { kind: "duplicate"; receipt: HandoffReceipt }
  | { kind: "conflict"; receipt: HandoffReceipt };

export interface HandoffReceiptStore {
  find(idempotencyKey: string): Promise<HandoffReceipt | undefined>;
  save(receipt: HandoffReceipt): Promise<void>;
}

/**
 * Persistence-agnostic duplicate policy.
 *
 * This module intentionally performs no database writes itself. A durable store can
 * implement HandoffReceiptStore after its migration is reviewed and explicitly enabled.
 */
export async function decideHandoffIdempotency(
  store: HandoffReceiptStore,
  candidate: HandoffReceipt,
): Promise<IdempotencyDecision> {
  const existing = await store.find(candidate.idempotencyKey);

  if (!existing) {
    return { kind: "accept", receipt: candidate };
  }

  if (
    existing.sourceEventId === candidate.sourceEventId
    && existing.payloadFingerprint === candidate.payloadFingerprint
  ) {
    return { kind: "duplicate", receipt: existing };
  }

  return { kind: "conflict", receipt: existing };
}
