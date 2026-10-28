# Leading Edge → Self-Maid Handoff Receiver v1

This branch adds a non-live receiver adapter for the shared ecosystem handoff contract.

## Scope

The adapter:

- validates Contract v1 payloads
- accepts only Leading Edge as the operational upstream
- accepts qualified, routed, or handed-off leads
- creates a deterministic idempotency key
- normalizes customer/service data
- prepares quote and booking draft shapes without writing to the database

## Deliberately not included

- no HTTP endpoint
- no database insert/update
- no production webhook
- no secrets
- no deployment
- no domain changes
- no automatic customer communication

## Operational ownership

Leading Edge retains qualification, scoring, routing, and upstream lifecycle tracking.

Self-Maid begins operational ownership after a valid handoff, then handles quoting, scheduling, fulfillment, QA, follow-up, and retention.

## Validation

Run:

`npm run handoff:validate`

The synthetic tests cover valid routing, optional fields, deterministic duplicate handling, direct PlayHard rejection, unsupported lifecycle rejection, and missing-contact rejection.

## Next step

After both repositories validate, add a preview-only HTTP receiver in Self-Maid protected by an integration secret, and point a Leading Edge preview adapter at that endpoint. Production delivery remains disabled until explicit approval.
