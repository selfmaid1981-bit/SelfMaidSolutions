# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service in Alabama. It provides a comprehensive business website with service showcases, an instant quote calculator, online booking, and secure payment processing. The application aims to attract customers and streamline operations, serving both marketing and operational needs. Key capabilities include lead capture, marketing automation, and customer relationship management through an integrated admin dashboard. The project seeks to expand market reach in Alabama cities and enhance operational efficiency.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The application uses a bold, premium design with a deep navy/purple/red-black palette and neon yellow accents (#0A0E1A Deep Navy, #6B21A8 Royal Purple, #4C1D95 Deeper Purple, #3B0A0A Rich Red-Black, #E5FF00 Neon Yellow), serif fonts, and subtle animations. It incorporates realistic stock photography. UI components are built with Radix UI and shadcn/ui for accessibility, responsiveness, and dark mode support.

## Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter, Tailwind CSS, Radix UI/shadcn/ui, TanStack Query, React Hook Form with Zod, and Vite.
- **Backend**: Node.js with Express.js and TypeScript, Drizzle ORM for PostgreSQL (Neon serverless), and a RESTful API.
- **Data Storage**: PostgreSQL on Neon, managing 22 tables across core business, CRM, SaaS, lead discovery, and AI voice modules. All tenant-scoped tables include `company_id` for multi-tenant isolation.
- **Authentication & Security**: Express sessions with secure cookies, server-side Zod validation, CORS, input sanitization, and PATCH route field whitelisting.
- **Payment Processing**: Stripe integration for secure transactions, utilizing Stripe Elements and webhooks. Payment intent creation uses the booking's stored amount for integrity.
- **Email Communication**: SendGrid for transactional and marketing emails.
- **SMS Notifications**: Twilio integration for business owner notifications and customer review requests.
- **Quote Calculator**: Unified pricing engine in `client/src/lib/services.ts` (`calculateQuotePrice()`) used by all calculators (homepage, booking modal, full quote page). Service types, rates, and frequency discounts are defined once. Homepage and full quote page use `sqFtServiceTypes` (excludes dorm); booking modal uses full `quoteServiceTypes` with room-count input for dorm.
- **Content & SEO**: Blog, local SEO strategies, dynamic sitemap.xml and robots.txt, server-side meta injection, and dynamically generated, SEO-optimized city-specific landing pages and city+service pages. Includes SEO slug aliases for redirects.
- **Marketing Automation**: Strategies for email and social media automation workflows.
- **Admin Dashboard**: Features for managing email marketing campaigns, subscribers, and automated review requests.
- **Automated Review System**: Triggers Google review requests via email and SMS after job completion.
- **CSV Lead Generation Pipeline**: Upload Google Maps CSV exports (from Instant Data Scraper etc.) at `/admin/lead-gen`. System cleans, deduplicates (name+phone / name+address, cross-checked against DB and Google Sheet), enriches via free website email scraping (with SSRF protection), scores leads 0-3, and pushes to Google Sheet. No paid APIs required. Endpoint: `POST /api/admin/lead-gen/upload-csv` (multipart form, `file` field). Module: `server/lead-gen/csv-processor.ts`.
- **Integration Hooks**: Centralized modules for Stripe subscriptions, Twilio SMS, Hunter.io email discovery, OpenAI utilities (text generation, extraction, call analysis, lead intent), automated review requests, and a 3-step automated follow-up sequence for unbooked quotes.
- **CRM Module**: Full CRM backend with routes, pipeline management, scheduling, lead-to-client conversion, and dashboard metrics.
- **SaaS Module**: Multi-tenant SaaS backend with company management, subscription tiers, and lead discovery engine.
- **Voice Module**: AI receptionist backend with Twilio TwiML integration, call logging, transcript storage, and intent extraction.
- **Centralized Configuration**: `server/config.ts` for all business constants.

## Feature Specifications
- **Service Offerings**: Five distinct cleaning services with dynamic pricing.
- **Online Booking**: Multi-step process with "Book Now (Pay Later)" and "Book & Pay Now" options, and an integrated quote calculator.
- **Contact Management**: Lead capture via contact forms and "Save My Quote".
- **Content Marketing**: Blog with SEO-optimized articles, Airbnb/STR Landing Page, and neighborhood-specific SEO pages.
- **Conversion Optimization**: Homepage enhancements including Exit-Intent Popup (active on homepage, 10% discount offer with email capture) and Booking Incentive Engine. Mascot (Self-Maid superhero sponge character with transparent background) appears in hero section, contact section, and elsewhere to guide users. Quote-to-booking flow passes frequency + propertySize via URL params for richer pre-fill and quote summary on booking page. Post-first-cleaning recurring upsell email sent 2 hours after job completion via `server/hooks/recurring-upsell.ts` (biweekly 10% / monthly 5% offers). Homepage section order: Hero → Why Choose (AboutSection) → Services → How It Works → Quote Calculator → Testimonials → Final CTA → Contact → Footer. Hero uses white marble kitchen image with dark overlay and gold CTA. Services use icon-style cards (not photos) with gold-accented borders (Standard, Deep, Move-Out, Airbnb, Office). Brand colors: #1F2A37 (Deep Navy), #1E8E6A (Emerald), #C6A969 (Champagne Gold). Marble background (#f5f0eb) used across page.
- **Admin Features**: CRUD operations for Cleaners, Recurring Bookings, and Referrals.
- **Navigation**: Desktop and mobile navigation with dropdowns for services and service areas.
- **Brand Positioning**: Clear brand messaging with a city-targeted tagline.
- **SEO Enhancements**: Blog Article Schema (JSON-LD), Image SEO (lazy loading, dimensions, alt tags).
- **Analytics**: Google Analytics 4 integration.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Stripe**: Payment processing.
- **SendGrid**: Email delivery and marketing campaigns.
- **Twilio**: SMS text message notifications.
- **Google Fonts**: Web font delivery.
- **Google Place ID**: For direct Google review links.
- **Hunter.io**: Email discovery and verification.
- **OpenAI**: AI services.

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
- **AI**: OpenAI SDK.