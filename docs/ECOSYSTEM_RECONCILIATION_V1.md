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

## Preview duplicate classification completed

- Added a process-local preview receipt store; it is intentionally erased on server restart and is not production durability.
- Preview deliveries now exercise the existing `accept / duplicate / conflict` policy.
- First valid delivery is stored only in preview memory, exact redelivery is classified as `duplicate`, and conflicting reuse returns HTTP 409.
- Durable persistence remains unavailable and no database writes were enabled.
- Leading Edge outbound-envelope work now lives separately on `integration/ecosystem-outbound-v1`, keeping source and receiver changes independently reviewable.

## Next integration step

Cross-validate a Leading Edge-generated fixture against Self-Maid's shared v1 schema, then prepare a non-production delivery adapter with a fail-closed endpoint/secret configuration.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.


## Canonical fingerprint hardening

- The preview receiver now parses the shared v1 envelope first and fingerprints the canonical validated event rather than raw request JSON.
- Unknown transport-only fields therefore cannot create false idempotency conflicts.
- Meaningful fields retained by the shared contract still change the fingerprint.
- Regression coverage records both behaviors.
- No persistence, production routing, or live customer handoff was enabled by this change.
