import { Router } from "express";
import { timingSafeEqual } from "crypto";
import { parseLeadingEdgeHandoffEvent, mapLeadingEdgeEventToInboundLead, mapInboundLeadToQuoteDraft, mapInboundLeadToBookingDraft } from "./leading-edge-handoff";
import { fingerprintHandoffPayload } from "./handoff-fingerprint";
import { decideHandoffIdempotency } from "./handoff-idempotency";
import { PreviewMemoryHandoffReceiptStore } from "./preview-memory-handoff-store";

function safeSecretMatch(actual: unknown, expected: string) {
  if (typeof actual !== "string" || actual.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
  } catch {
    return false;
  }
}

export const leadingEdgeHandoffPreviewRouter = Router();
const previewReceiptStore = new PreviewMemoryHandoffReceiptStore();

leadingEdgeHandoffPreviewRouter.post("/preview", async (req, res) => {
  // Never expose this validation receiver as a production handoff endpoint.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "preview") {
    return res.status(404).json({ message: "Not found" });
  }

  const secret = process.env.SELFMAID_HANDOFF_SECRET;
  if (!secret) {
    return res.status(503).json({
      message: "Preview handoff receiver is disabled until SELFMAID_HANDOFF_SECRET is configured.",
    });
  }

  if (!safeSecretMatch(req.header("x-ecosystem-secret"), secret)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const canonicalEvent = parseLeadingEdgeHandoffEvent(req.body);
    const lead = mapLeadingEdgeEventToInboundLead(canonicalEvent);
    const payloadFingerprint = fingerprintHandoffPayload(canonicalEvent);
    const persistenceEnabled = process.env.SELFMAID_HANDOFF_PERSISTENCE_ENABLED === "true";
    const idempotency = await decideHandoffIdempotency(previewReceiptStore, {
      idempotencyKey: lead.idempotencyKey,
      sourceEventId: lead.sourceEventId,
      payloadFingerprint,
      firstReceivedAt: lead.receivedAt,
    });

    if (idempotency.kind === "accept") {
      await previewReceiptStore.save(idempotency.receipt);
    }

    // Persistence remains intentionally disabled. Duplicate classification uses
    // process-local preview memory only and is cleared on server restart.
    const statusCode = idempotency.kind === "conflict" ? 409 : 200;
    return res.status(statusCode).json({
      accepted: true,
      mode: "preview-validation-only",
      idempotencyKey: lead.idempotencyKey,
      payloadFingerprint,
      idempotencyStatus: idempotency.kind,
      sourceEventId: lead.sourceEventId,
      sourceLeadId: lead.sourceLeadId,
      upstreamStatus: lead.upstreamStatus,
      qualification: {
        canonicalScore: lead.qualificationScore,
        sourceScore: lead.sourceQualificationScore,
      },
      quoteDraft: mapInboundLeadToQuoteDraft(lead),
      bookingDraft: mapInboundLeadToBookingDraft(lead),
      persistenceRequested: persistenceEnabled,
      persistenceAvailable: false,
      persisted: false,
      previewReceiptStored: idempotency.kind === "accept",
    });
  } catch (error) {
    return res.status(400).json({
      accepted: false,
      message: error instanceof Error ? error.message : "Invalid handoff payload",
    });
  }
});
