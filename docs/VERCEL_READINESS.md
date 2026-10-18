# Vercel Readiness Notes

This branch contains migration-safety changes only. It does not deploy or alter production.

## Changes

- Replit-managed Stripe webhook initialization is skipped when `VERCEL=1`.
- Long-lived quote follow-up and reporting/schedule timers are skipped when `VERCEL=1`.
- Existing Replit behavior is preserved when the application is not running on Vercel.

## Why

Vercel runtimes are ephemeral. Application boot must not create external webhooks or rely on `setInterval`/long-lived timers for operational jobs.

## Follow-up migration work

The disabled Vercel-side jobs must be converted to explicit function/cron entry points before production cutover:

1. quote follow-up processing
2. weekly report
3. daily visitor report
4. weekly schedule email

Stripe webhook configuration must be recreated intentionally for the Vercel deployment using the appropriate Vercel URL and secret configuration; startup must not create or mutate that webhook automatically.

## Preview gate

Before production:
- run TypeScript/build checks
- configure required Preview environment variables
- verify database connectivity
- validate auth behavior independent of Replit
- test Stripe in a non-production environment
- verify the Contract v1 handoff receiver
- keep production domains unchanged until all checks pass

## Portable service credentials

Stripe, SendGrid, and Twilio now accept complete server-side environment variable groups, without requiring a Replit connector token:

- Stripe: `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`
- SendGrid: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`
- Twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY`, `TWILIO_API_KEY_SECRET`, `TWILIO_PHONE_NUMBER`

Configure these in Vercel, never in browser-prefixed variables or git. On Vercel a missing credential group produces an explicit missing-variable error rather than attempting Replit credentials. Outside Vercel, existing connector behavior remains when no direct variables are supplied. Partial groups fail rather than mixing credentials from different accounts. This does not send messages or create payments.

## Remaining deployment work

The successful Vercel commit status only confirms a build/deployment was produced; it does not establish working API routes, authentication, cron jobs, or a production domain cutover. The app currently starts a persistent Express listener and does not define a serverless API entrypoint in this branch. Authentication still requires Replit OIDC configuration. Before cutover, inspect the actual Vercel project configuration, database access, service secrets, API runtime, scheduler replacement, handoff contract, and domain settings. Do not disable the Replit deployment until those checks pass.

## Validation

- `npm run build`
- `npm run check`
- `node --import tsx --test tests/environment-credentials.test.ts`

TypeScript validation also exposed and corrected an undefined subscription webhook variable, an outdated p-retry AbortError reference, and missing image-response guards. No client layout or styles are changed.
