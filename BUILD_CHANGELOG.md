# Ecosystem Build Changelog

## 2026-09-27

### Added
- Defined Ecosystem Handoff Contract v1 for PlayHard -> Leading Edge -> Self-Maid.
- Standardized integration envelope, immutable correlation/idempotency identifiers, service types, attribution fields, lifecycle stages, score normalization, and ownership boundaries.
- Defined the minimum Leading Edge -> Self-Maid qualified-lead payload.
- Documented privacy boundary: marketing attribution may flow across systems, but service-request data does not automatically become PlayHard marketing data.

### Validation
- Compared current Leading Edge `client_requests` / `leads` fields against Self-Maid CRM `leads`, `quotes`, `bookings`, and appointment fields.
- Identified the current 1-10 Leading Edge quality-score vs. Self-Maid generic integer score mismatch and specified a reversible normalization rule.
- No database migration, production deployment, credential change, paid service, or live webhook was performed.

### Next
- Add durable integration-event/idempotency storage and a disabled authenticated Self-Maid receiver; then add contract tests before enabling any live handoff.
