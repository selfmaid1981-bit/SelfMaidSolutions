# Ecosystem contract reconciliation v1

This branch reconciles the existing Self-Maid handoff adapter with the canonical PlayHard → Leading Edge → Self-Maid integration contract.

## Validation gap identified

The current adapter validates that `service.type` is a non-empty string. The canonical ecosystem contract limits integration values to `residential`, `commercial`, `deep_clean`, `move_out`, `post_construction`, and `regular_maintenance`; unknown values must not be guessed.

## Safe next code change

Replace free-form service validation with the canonical enum and add a regression fixture proving an unknown service type is rejected. This is validation-only and does not enable persistence, production delivery, or customer communication.

## Branch safety

No deployment, database migration, secret provisioning, billing change, domain change, or live webhook activation is part of this branch.
