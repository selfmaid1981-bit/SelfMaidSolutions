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

## Next integration step

Define the durable receipt-table schema and migration artifact for review, but keep it unapplied. Then wire fingerprint generation and duplicate handling into the preview receiver behind an explicit disabled-by-default persistence flag.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.
