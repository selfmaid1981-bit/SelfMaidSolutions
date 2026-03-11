# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service in Alabama. It provides a comprehensive business website featuring service showcases, an instant quote calculator, online booking with flexible payment options, and secure payment processing. The application aims to attract customers and streamline operations in the Montgomery, Prattville, Selma, Homewood, and Clanton areas, serving both marketing and operational needs. Key capabilities include lead capture, marketing automation, and customer relationship management through an integrated admin dashboard.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The application features a professional design using a slate/blue color palette, serif fonts, and subtle animations. It incorporates realistic stock photography. UI components are built with Radix UI and shadcn/ui for accessibility, responsiveness, and dark mode support.

## Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter, Tailwind CSS, Radix UI/shadcn/ui, TanStack Query, React Hook Form with Zod, and Vite.
- **Backend**: Node.js with Express.js and TypeScript, Drizzle ORM for PostgreSQL (Neon serverless), and a RESTful API.
- **Data Storage**: PostgreSQL on Neon, managing 22 tables across core business, CRM, SaaS, lead discovery, and AI voice modules. Core tables: `users`, `companies`, `sessions`, `contact_messages`, `bookings`, `quotes`, `cleaners`, `recurring_bookings`, `referrals`, `email_campaigns`, `review_requests`. CRM tables: `leads`, `clients`, `appointments`, `jobs`. SaaS tables: `subscriptions`. Lead discovery tables: `local_businesses`, `business_emails`. AI voice tables: `call_logs`, `call_transcripts`. Chat tables: `conversations`, `messages`. All tenant-scoped tables include `company_id` for multi-tenant isolation.
- **Authentication & Security**: Express sessions with secure cookies, server-side Zod validation, CORS, and input sanitization.
- **Payment Processing**: Stripe integration for secure transactions, utilizing Stripe Elements and webhooks.
- **Email Communication**: SendGrid handles all transactional and marketing emails.
- **Quote Calculator**: Dynamic calculator based on service type, property size, frequency discounts, and add-on services.
- **Content & SEO**: Includes a blog, comprehensive SEO strategies targeting local keywords, and various marketing content templates. Dynamic sitemap.xml and robots.txt are generated.
- **Marketing Automation**: Strategy for email and social media automation workflows using SendGrid, Buffer, Meta Business Suite, Hootsuite, and Zapier.
- **Admin Dashboard**: Features for managing email marketing campaigns, subscribers (with CSV export), and tracking automated review requests.
- **Automated Review System**: Triggers Google review requests via email and SMS after successful Stripe payments. Extended with `server/hooks/review-on-complete.ts` module that auto-triggers when a job status changes to "completed" (Job Completed → SMS → Google Review flow).
- **SMS Notifications**: Twilio integration for business owner notifications and customer review requests.
- **Integration Hooks** (`server/hooks/`): Centralized integration modules:
  - `stripe-subscriptions.ts` — SaaS subscription lifecycle (create, cancel, webhook sync)
  - `twilio-sms.ts` — SMS helpers (single, batch, job completion, appointment reminders)
  - `hunter-email.ts` — Hunter.io email discovery (domain search, email finder, verification, business enrichment)
  - `openai-helpers.ts` — AI utilities (text generation, structured extraction, call transcript analysis, outreach email generation, lead intent classification)
  - `review-on-complete.ts` — Automated review request flow triggered on job completion
  - `index.ts` — Barrel export for all hooks
- **Server-Side SEO**: Middleware intercepts HTML responses to inject dynamic meta tags for improved crawler visibility.
- **Service Area Landing Pages**: Dynamically generated, SEO-optimized city-specific pages.

## Feature Specifications
- **Service Offerings**: Five distinct cleaning services with dynamic pricing.
- **Online Booking**: Multi-step process with "Book Now (Pay Later)" and "Book & Pay Now" options.
- **Contact Management**: Lead capture via contact forms and "Save My Quote" functionality.
- **Content Marketing**: Blog with 9 SEO-optimized articles targeting high-intent keywords. New posts: house cleaning cost guide, Alabama humidity deep clean guide, Airbnb host complete guide.
- **Conversion Optimization**: Homepage enhancements including an interactive Before/After gallery, expanded testimonials, trust badges, and optimized CTAs. New components like Google Reviews display widget and Exit-Intent Popups.
- **How It Works Section**: 3-step visual guide (Quote → Book → Enjoy) with CTA banner to reduce booking friction.
- **Promo Section**: First-time customer 15% discount section with pricing breakdown and urgency messaging.
- **Satisfaction Guarantee Banner**: Prominent 100% satisfaction guarantee above the contact form.
- **Hero Urgency Chip**: "Only 3 Spots Left This Week!" pulsing badge for scarcity-driven conversion.
- **Gradient Consistency**: All homepage sections (Google Reviews, footer, services) use cohesive section-gradient system.
- **Quote Page Visual Upgrade**: Gradient quote result panel with "No hidden fees" badge; styled CTA button.
- **Pricing Transparency Section**: Homepage pricing grid showing all 6 service types with realistic price ranges ($65–$450). Includes "most popular" and "fastest growing" callouts.
- **Airbnb/STR Landing Page**: Dedicated page at `/airbnb-cleaning` targeting Airbnb hosts and property managers. Features: same-day turnover selling points, 3-tier pricing, turnover checklist, host testimonials.
- **Airbnb Teaser on Homepage**: Dark teal/blue section linking to the Airbnb page with stats (4.9 rating, same-day, $65+).
- **Recurring Plans Section**: Homepage section showcasing weekly/bi-weekly/monthly subscription plans with 10–20% savings. Includes satisfaction guarantee callout.
- **Expanded Sitemap**: All 9 blog posts, /airbnb-cleaning, /get-started, all city pages, and 25 city+service keyword pages included in sitemap.xml.
- **Server-Side Meta Injection**: /airbnb-cleaning, /get-started, all service areas, and city+service pages added to SSR meta injection for SEO crawler compatibility.
- **City+Service Landing Pages**: 25 SEO-optimized pages at URLs like `/house-cleaning-montgomery-al`, `/deep-cleaning-prattville-al` etc. targeting high-traffic local keywords (5 services × 5 cities). Each has unique content, JSON-LD structured data, and internal cross-links.
- **Navigation Dropdowns**: Desktop nav has hover-triggered dropdowns for "Services" (6 service types) and "Service Areas" (9 cities). Mobile nav has expandable sections.
- **Brand Positioning**: Hero headline changed to "Self-Maid Cleaning Solutions" with tagline "Montgomery's Most Trusted Cleaning Service Since 2009". Includes city-targeted subheadline.
- **Blog Article Schema**: BlogPosting JSON-LD with author (Michelle), publisher, datePublished, speakable schema for AI discoverability. Author byline on all blog posts.
- **Image SEO**: All below-fold images have lazy loading, explicit width/height dimensions, and keyword-rich alt tags.
- **Google Analytics 4**: GA4 tag (G-BHKLJVML78) installed directly in index.html alongside GTM container.
- **Integrated Quote Calculator in Booking**: The booking modal now has a 4-step flow: Service Selection → Property Details (size/sq ft/frequency/add-ons with live price) → Schedule → Contact/Address with full summary. Pricing logic shared via `client/src/lib/services.ts` (calculateQuotePrice, quoteServiceTypes, propertySizeOptions, frequencyOptions, addOnServices). No more flat $80 default.
- **Server-Side Payment Integrity**: Payment intent creation uses the booking's stored amount (from DB), not client-provided amount. Prevents URL parameter tampering on checkout.
- **City-Service Page Routing Fix**: Wouter's `regexparam` doesn't support named params after non-slash characters. Routes like `/house-cleaning-:slug` replaced with `/:cityServiceSlug` catch-all validated against `allCityServiceCombinations` set.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Stripe**: Payment processing.
- **SendGrid**: Email delivery and marketing campaigns.
- **Twilio**: SMS text message notifications.
- **Google Fonts**: Web font delivery.
- **Google Place ID**: For direct Google review links.

## Frontend Libraries
- **React Ecosystem**: React, React DOM, Wouter.
- **UI Framework**: Radix UI, shadcn/ui, Lucide React, React Icons.
- **Form Handling**: React Hook Form, Hookform Resolvers.
- **Validation**: Zod.
- **Styling**: Tailwind CSS, Class Variance Authority, clsx.
- **Data Fetching**: TanStack React Query.
- **Payment UI**: Stripe React components.

## Backend Dependencies
- **Core Framework**: Express.js.
- **Database**: Drizzle ORM, node-postgres.
- **Session Management**: express-session, connect-pg-simple.
- **Validation**: Zod.
- **Email**: SendGrid Mail API.
- **SMS**: Twilio Node.js SDK.
- **Payment**: Stripe Node.js SDK.
- **AI**: OpenAI SDK (via Replit AI Integrations).

- **Centralized Config**: `server/config.ts` — All business constants (name, phone, email, owner emails, Google Place ID, review URL) centralized in one file. All server modules import from this file.

## Documentation

- **ER Diagram**: `.local/er-diagram.md` — Full database entity relationship diagram (Mermaid syntax) with all 22 tables, 280 columns, 78 indexes.
- **API Documentation**: `.local/api-documentation.md` — Complete REST API reference for all current endpoints.
- **Architecture Plan**: `.local/architecture-plan.md` — System architecture, folder structure, and integration map.
- **API Specification**: `.local/api-specification.md` — Detailed request/response schemas for planned endpoints.
- **Codebase Audit**: `.local/codebase-audit.md` — Full audit report covering duplicates, DB migrations, routes, folder structure, and architecture diagram.