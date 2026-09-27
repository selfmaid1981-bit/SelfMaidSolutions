# Ecosystem Handoff Contract v1

Status: additive integration contract; no production behavior is changed by this document.

## Ownership boundaries

| System | Owns |
|---|---|
| PlayHard | campaign/brand intake, attribution metadata, demand-generation context |
| Leading Edge | lead capture, validation, qualification, scoring, routing, marketplace status |
| Self-Maid | quote, schedule, fulfillment, QA, follow-up, retention |

The handoff must preserve upstream identifiers. Systems do not overwrite another system's canonical record.

## Canonical envelope

Every cross-system event should use this envelope:

```json
{
  "schemaVersion": "1.0",
  "eventId": "uuid",
  "eventType": "lead.qualified",
  "occurredAt": "ISO-8601 UTC",
  "sourceSystem": "leading_edge",
  "destinationSystem": "self_maid",
  "correlationId": "stable lifecycle id",
  "sourceRecordId": "upstream canonical id",
  "idempotencyKey": "event-specific unique key",
  "payload": {}
}
```

Required invariants:
- `eventId`, `correlationId`, `sourceRecordId`, and `idempotencyKey` are immutable.
- Receivers must treat a repeated `idempotencyKey` as a retry, not a new customer/lead.
- Timestamps are UTC ISO-8601.
- Monetary values are integer cents at integration boundaries.
- Phone numbers should be E.164 where available.
- UTM values are copied forward unchanged.

## Shared lead fields

| Canonical field | PlayHard | Leading Edge | Self-Maid |
|---|---|---|---|
| source | campaign/channel | client_requests.source | leads.source |
| utmSource | generated attribution | client_requests.utmSource | integration metadata |
| utmMedium | generated attribution | client_requests.utmMedium | integration metadata |
| utmCampaign | generated attribution | client_requests.utmCampaign | integration metadata |
| firstName / lastName | optional intake | name currently combined | leads.firstName / lastName |
| email | optional intake | client_requests.email | leads.email |
| phone | optional intake | client_requests.phone | leads.phone |
| serviceType | campaign/intake intent | client_requests.serviceType | leads.serviceType |
| address | optional | client_requests.address | leads.address |
| city/state/zipCode | targeting/intake | client_requests | leads |
| requestedDate | optional | client_requests.requestedDate | appointment/booking target |
| propertySize | optional | client_requests.propertySize | quote input |
| notes | campaign/intake context | specialRequests | leads.notes |
| score | n/a | qualityScore (1-10) | leads.score (normalized 0-100) |

### Score normalization

Until a shared scoring model replaces both scales:

`selfMaidScore = clamp(leadingEdgeQualityScore * 10, 0, 100)`

Preserve the original Leading Edge score in integration metadata. Do not silently rescore historical records.

## Canonical service types

Integration values:

- `residential`
- `commercial`
- `deep_clean`
- `move_out`
- `post_construction`
- `regular_maintenance`

Self-Maid may maintain additional internal service labels, but adapters must map them to/from these canonical values. Unknown values must be quarantined for review rather than guessed.

## Lifecycle statuses

The three systems have different operational responsibilities, so one universal status enum would lose information. Use a canonical lifecycle stage plus the system-native status.

Canonical stages:

1. `demand_created`
2. `captured`
3. `qualified`
4. `routed`
5. `quote_pending`
6. `quoted`
7. `scheduled`
8. `in_service`
9. `completed`
10. `qa_followup`
11. `retained`
12. `lost`
13. `rejected`

Examples:
- Leading Edge `available` -> `qualified` or `routed` depending on qualification/routing evidence.
- Leading Edge `purchased` -> `routed`.
- Self-Maid CRM `new_lead` -> `quote_pending`.
- Self-Maid booking `confirmed` -> `scheduled`.
- Self-Maid booking `completed` -> `completed`.

Never infer `completed` from payment or quote acceptance alone.

## Initial Leading Edge -> Self-Maid handoff

Recommended event: `lead.qualified`.

Minimum payload:

```json
{
  "lead": {
    "firstName": "string",
    "lastName": "string",
    "email": "string|null",
    "phone": "string|null",
    "serviceType": "canonical service type",
    "address": "string|null",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "requestedDate": "ISO-8601|null",
    "propertySize": "number|null",
    "notes": "string|null",
    "score": 80
  },
  "attribution": {
    "source": "string|null",
    "utmSource": "string|null",
    "utmMedium": "string|null",
    "utmCampaign": "string|null"
  },
  "upstream": {
    "leadingEdgeLeadId": "uuid",
    "leadingEdgeClientRequestId": "uuid|null",
    "leadingEdgeQualityScore": 8
  }
}
```

## Idempotency and retry behavior

Before a live receiver is enabled, Self-Maid must have durable storage for:
- upstream system;
- upstream record ID;
- correlation ID;
- idempotency key;
- received timestamp;
- processing status/error.

Do not implement the live webhook by matching only on email or phone. Those are mutable and may legitimately recur.

## Privacy boundary

Only operationally necessary customer data should cross systems. Marketing consent is not implied by a service request. PlayHard must not receive Self-Maid customer details merely because it generated the campaign. Cross-brand analytics should prefer campaign/event IDs and aggregated conversion outcomes.

## Next implementation step

Add an additive Self-Maid integration-event table plus a disabled/authenticated receiver that validates this envelope and records idempotency before creating or updating CRM leads. Keep the receiver disabled until a shared secret is provisioned in both environments and contract tests pass.
