# Ecosystem contract reconciliation v1

This branch reconciles the existing Self-Maid handoff adapter with the canonical PlayHard → Leading Edge → Self-Maid integration contract.

## Validation gap identified

The current adapter previously validated that `service.type` was merely a non-empty string. The canonical ecosystem contract limits integration values to `residential`, `commercial`, `deep_clean`, `move_out`, `post_construction`, and `regular_maintenance`; unknown values must not be guessed.

## Completed

- Replaced free-form handoff service validation with the canonical service-type enum.
- Added a dependency-free regression check that accepts every canonical service type and rejects unsupported values including `airbnb_turnover`, `window_only`, `unknown`, and an empty value.
- Kept the change validation-only: no persistence, production delivery, or customer communication is enabled.

## Envelope reconciliation completed

- Self-Maid now preserves both `eventId` and `sourceLeadId` from the upstream handoff.
- The canonical qualification score remains on a 0–100 ecosystem scale.
- The original source score is preserved separately with its declared minimum and maximum. For Leading Edge, the expected source scale is 1–10; a sender can therefore transmit a canonical score such as 80 alongside the untouched source score 8/10.
- Preview responses expose both canonical and source qualification values so mapping can be inspected without persistence.
- Invalid source scores outside their declared range are rejected.

## Idempotency policy prepared

- Added a persistence-agnostic handoff receipt interface; it performs no database access by itself.
- An unseen idempotency key is classified as `accept`.
- An exact redelivery with the same event ID and payload fingerprint is classified as `duplicate`.
- Reuse of an idempotency key with a different event ID or payload fingerprint is classified as `conflict` rather than silently overwriting prior data.
- Added dependency-free regression coverage for all three outcomes.
- No database table, migration, or live write path has been activated.

## Durable-storage boundary prepared

- Added an explicitly unapplied SQL review artifact for a future `ecosystem_handoff_receipts` table. It is outside Drizzle's configured migration path and cannot be applied by the existing `db:push` command.
- Added deterministic SHA-256 payload fingerprinting with stable object-key ordering.
- Added regression coverage proving key-order independence, meaningful-change detection, and array-order sensitivity.
- Preview responses now expose the payload fingerprint for integration inspection.
- `SELFMAID_HANDOFF_PERSISTENCE_ENABLED` is recognized only as requested state; persistence remains hard-disabled because no durable store is wired. The receiver reports `persistenceAvailable: false` and `persisted: false`.

## Next integration step

Add preview-only in-memory duplicate classification so repeated test deliveries can exercise the accept/duplicate/conflict policy without a database. Then standardize the outbound Leading Edge envelope builder against the same contract before any durable persistence is considered.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.
