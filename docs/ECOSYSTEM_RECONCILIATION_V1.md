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

## Next integration step

Add disabled, durable idempotency-event storage behind the preview receiver contract, but do not apply a production database migration or enable live writes until explicitly approved.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.
