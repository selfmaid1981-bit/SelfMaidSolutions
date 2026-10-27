# Self-Maid quote intake runbook
Prepared by Michelle Corrigan for a REWORK application example on October 27, 2026.

This is a newly prepared operating guide for my own AI-assisted project, not a claim of a prior client acquisition engagement. It documents the implemented quote-intake path; a comprehensive acquisition dashboard and automated failure alerts are proposed work, not demonstrated capabilities.

## Evidence and scope
- Source revision: https://github.com/selfmaid1981-bit/SelfMaidSolutions/tree/099c9f20654d53e29787a6818e81597cc87d0b1a
- Intake adapter: server/trio-intake.mjs; routes api/quotes.js and api/health.js.
- Walkthrough: https://youtu.be/d_MRGVesU_o
- Observed test: 3 bedrooms / 2 bathrooms, standard one-time = $210; pets = $235. A labeled synthetic request returned quote ID 7 and entered booking preferences. No appointment, marketing campaign or payment was submitted.

## What happens
1. The visitor calculates an estimate in the React form.
2. The quote route validates the submitted name and contact details, request format and body size.
3. The server builds a payload with an event identifier, contact, service details and explicit contactAllowed flag.
4. The adapter sends the request to the configured receiving hub using its server-side integration credential.
5. It reports success only if the receiver returns a lead ID; that ID becomes the quote ID.
6. The browser carries the quote into booking preferences. Staff still confirms service scope, availability and final price.

## Daily checks for an operator
- Open /api/health: a 200 'configured' response confirms the two required environment settings are present. It does NOT prove the downstream hub is healthy.
- Check recent receiving records against actual submissions. Use the event/lead reference and timestamps; do not copy personal data into a public issue.
- Look for failed quote requests, unusual duplicate contacts and missing confirmations in the hosting logs.
- Compare totals by stage: received, validated, receiver-confirmed, failed and staff-reviewed. These are the recommended monitoring measures, not a claim that a dashboard already exists.
- Escalate failures to the integration owner. Never invent a successful customer notification or booking.

## Debug a failed run
| Symptom | First check | Action |
|---|---|---|
| 405 | Request method | Use the intended POST quote flow; GET is for health only. |
| 400 | Body format, size, name and contact validation | Correct the input; do not retry the same invalid payload. |
| 503 / unavailable | Configuration, receiving-service availability, timeout | Check settings and redacted hosting logs; determine whether the receiver created a record before replay. |
| Receiver non-success status | Rate limit, credentials or receiver validation | Inspect the receiver response and its documentation; honor retry guidance and avoid uncontrolled retries. |
| 502 / missing confirmation | Receiver returned no lead ID | Reconcile with the receiving hub; do not show success or fabricate an ID. |

The adapter has a 15-second receiving-request timeout. It generates a new event ID for each incoming request. Durable idempotency across browser retries and automatic retries are not established by this code. After an ambiguous timeout, check the receiver before replaying; otherwise a duplicate lead may be created.

## Add or change a workflow step
1. Describe the new input, output, owner, error behavior and acceptance test.
2. Confirm API permission, data fields, rate limits and contact eligibility.
3. Change an isolated branch/staging environment; keep production routes and receiving schemas compatible.
4. Test valid input, invalid input, downstream failure and missing-confirmation behavior using labeled synthetic data.
5. Have the owner approve the change and release plan; record the deployed revision.
6. Observe the first runs and retain a known-good rollback revision.

## Rotate the integration credential
Only the authorized owner performs rotation through the hosting and receiving-system secret controls.
1. Identify the receiving credential owner and whether overlapping keys are supported.
2. Issue a replacement at the receiver and update the corresponding server-side TRIO_HUB_KEY setting through the approved secret workflow. Do not place values in code, messages, screenshots or this guide.
3. Redeploy/restart as the hosting provider requires; test a labeled quote and confirm the receiver's real reference ID.
4. Revoke the old credential after verification. If overlap is unsupported, agree a maintenance window and rollback plan first.
5. Record the date, owner and verification result, never the credential itself.

TRIO_HUB_URL and TRIO_HUB_KEY are configuration names only; no values are included here.

## Rollback and incident handoff
Pause affected downstream steps and keep the existing customer process available. Record the time, deployed revision, redacted error, affected event references and whether records were confirmed. Roll back to the known-good deployment if the new release caused the fault. Reconcile ambiguous or duplicate records before replaying.

## Consent, provenance and outcomes
Retain the source and timestamp of each lead and the basis for contact. The adapter forwards contactAllowed only when the incoming value is explicitly true; it does not establish that any campaign or outbound delivery occurs. Do not treat missing permission as approval. For Rhanta, confirm what 'engaged' means and who executes approved outreach: the brief includes engagement but excludes direct campaign execution.

The Rhanta target of at least 50 eligible leads in the first deployment week depends on approved source volume and client-defined engagement. A 20% booking increase over three months is an objective to measure against an agreed baseline, not an existing or guaranteed result.
