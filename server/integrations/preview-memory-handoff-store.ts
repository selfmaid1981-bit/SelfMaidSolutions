import type { HandoffReceipt, HandoffReceiptStore } from "./handoff-idempotency";

/**
 * Preview-process-only receipt store.
 * It is intentionally ephemeral: restarting the server clears all receipts.
 * Never use this as production durability.
 */
export class PreviewMemoryHandoffReceiptStore implements HandoffReceiptStore {
  private readonly receipts = new Map<string, HandoffReceipt>();

  async find(idempotencyKey: string) {
    return this.receipts.get(idempotencyKey);
  }

  async save(receipt: HandoffReceipt) {
    this.receipts.set(receipt.idempotencyKey, receipt);
  }
}
