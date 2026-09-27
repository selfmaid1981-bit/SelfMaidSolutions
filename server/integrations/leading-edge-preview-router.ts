import { Router } from "express";
import { timingSafeEqual } from "crypto";
import { parseLeadingEdgeHandoff, mapInboundLeadToQuoteDraft, mapInboundLeadToBookingDraft } from "./leading-edge-handoff";

function safeSecretMatch(actual: unknown, expected: string) {
  if (typeof actual !== "string" || actual.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
  } catch {
    return false;
  }
}

export const leadingEdgeHandoffPreviewRouter = Router();

leadingEdgeHandoffPreviewRouter.post("/preview", (req, res) => {
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
    const lead = parseLeadingEdgeHandoff(req.body);
    return res.status(200).json({
      accepted: true,
      mode: "preview-validation-only",
      idempotencyKey: lead.idempotencyKey,
      upstreamStatus: lead.upstreamStatus,
      quoteDraft: mapInboundLeadToQuoteDraft(lead),
      bookingDraft: mapInboundLeadToBookingDraft(lead),
      persisted: false,
    });
  } catch (error) {
    return res.status(400).json({
      accepted: false,
      message: error instanceof Error ? error.message : "Invalid handoff payload",
    });
  }
});
