-- REVIEW ARTIFACT ONLY — DO NOT APPLY
-- Proposed durable receipt table for PlayHard → Leading Edge → Self-Maid handoffs.
-- This file is intentionally outside Drizzle's configured migration output because
-- the repository currently uses db:push and durable persistence is not authorized.

CREATE TABLE ecosystem_handoff_receipts (
  idempotency_key text PRIMARY KEY,
  source_event_id text NOT NULL,
  source_system text NOT NULL,
  source_lead_id text NOT NULL,
  lifecycle_status text NOT NULL,
  payload_fingerprint text NOT NULL,
  first_received_at timestamp NOT NULL DEFAULT now(),
  last_received_at timestamp NOT NULL DEFAULT now(),
  delivery_count integer NOT NULL DEFAULT 1,
  CONSTRAINT ecosystem_handoff_receipts_delivery_count_positive
    CHECK (delivery_count >= 1)
);

CREATE UNIQUE INDEX ecosystem_handoff_receipts_source_event_id_uq
  ON ecosystem_handoff_receipts (source_event_id);

CREATE INDEX ecosystem_handoff_receipts_source_lead_idx
  ON ecosystem_handoff_receipts (source_system, source_lead_id);
