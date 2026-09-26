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
