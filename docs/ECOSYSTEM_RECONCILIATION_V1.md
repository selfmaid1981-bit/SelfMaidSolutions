# Ecosystem contract reconciliation v1

This branch reconciles the existing Self-Maid handoff adapter with the canonical PlayHard → Leading Edge → Self-Maid integration contract.

## Validation gap identified

The current adapter previously validated that `service.type` was merely a non-empty string. The canonical ecosystem contract limits integration values to `residential`, `commercial`, `deep_clean`, `move_out`, `post_construction`, and `regular_maintenance`; unknown values must not be guessed.

## Completed

- Replaced free-form handoff service validation with the canonical service-type enum.
- Added a dependency-free regression check that accepts every canonical service type and rejects unsupported values including `airbnb_turnover`, `window_only`, `unknown`, and an empty value.
- Kept the change validation-only: no persistence, production delivery, or customer communication is enabled.

## Next integration step

Reconcile the canonical ecosystem event envelope with the existing Self-Maid adapter before adding durable idempotency storage. Preserve source identifiers and original qualification score during mapping rather than silently rewriting upstream data.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.
