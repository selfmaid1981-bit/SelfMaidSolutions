# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service operating in Alabama. It provides a comprehensive business website featuring service showcases, an instant quote calculator, online booking with flexible payment options, and secure payment processing. The application aims to attract customers and streamline operations in the Montgomery, Prattville, Selma, Homewood, and Clanton areas, serving both marketing and operational needs for the cleaning business. Key capabilities include lead capture, marketing automation, and customer relationship management through an integrated admin dashboard.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The application features a premium, professional design using a refined slate/blue color palette, serif fonts for headings, and subtle animations. It incorporates realistic stock photography showcasing cleaning scenarios. Key UI components are built with Radix UI and shadcn/ui for accessibility, responsiveness, and dark mode support.

## Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter for routing, Tailwind CSS for styling, Radix UI/shadcn/ui for components, TanStack Query for state management, React Hook Form with Zod for forms, and Vite for building.
- **Backend**: Node.js with Express.js and TypeScript, Drizzle ORM for PostgreSQL (Neon serverless), and a RESTful API design.
- **Data Storage**: PostgreSQL on Neon, managing schemas for `users`, `contact_messages`, `bookings`, `quotes`, `review_requests`, and marketing campaigns.
- **Authentication & Security**: Express sessions with secure cookies, server-side Zod validation, CORS configuration, and input sanitization.
- **Payment Processing**: Stripe integration for secure transactions, utilizing Stripe Elements for PCI-compliant forms and webhooks for payment intent confirmation.
- **Email Communication**: SendGrid handles all transactional and marketing emails (e.g., contact form submissions, booking confirmations, payment receipts, quote notifications, automated review requests, marketing campaigns).
- **Quote Calculator**: A dynamic calculator provides instant pricing based on service type (Residential, Commercial, Airbnb, Move-in/out, Apartment Turnover, Student Dorm), property size/room count, frequency discounts, and add-on services.
- **Content & SEO**: Includes a blog section, comprehensive SEO strategies targeting local keywords, and various marketing content templates (social media, email, Google Ads, video scripts).
- **Marketing Automation**: Strategy for email and social media automation workflows using SendGrid, Buffer, Meta Business Suite, Hootsuite, and Zapier.
- **Admin Dashboard**: Features for managing email marketing campaigns, subscribers (with CSV export), and tracking automated review requests.
- **Automated Review System**: Triggers Google review requests via email and SMS after successful Stripe payments, logging requests in a dedicated table.
- **SMS Notifications**: Twilio integration for business owner notifications on new bookings and automated customer review requests.

## Feature Specifications
- **Service Offerings**: Five distinct cleaning services with dynamic pricing, including a new "Deep Cleaning" service.
- **Online Booking**: A multi-step process with "Book Now (Pay Later)" and "Book & Pay Now" options.
- **Contact Management**: Lead capture via contact forms and "Save My Quote" functionality.
- **Content Marketing**: Blog, SEO-optimized articles, and a complete marketing toolkit (social media templates, door hanger designs, referral program emails, Facebook ad copy).
- **Conversion Optimization**: Homepage enhancements include an interactive Before/After gallery, expanded testimonials, trust badges, and optimized CTAs.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Stripe**: Payment processing.
- **SendGrid**: Email delivery and marketing campaigns.
- **Twilio**: SMS text message notifications.
- **Google Fonts**: Web font delivery (Inter, DM Sans, Fira Code, Geist Mono).
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

# Recent Changes

## December 6, 2025 - Comprehensive Conversion & SEO Optimization
- **Enhanced Static HTML Content**: Added comprehensive static content to index.html for improved SEO crawler visibility
  - Complete "About Self-Maid LLC" section with company history and values
  - "Why Choose Us" section with trust points and guarantees
  - Detailed service descriptions with pricing and what's included for each service type
  - Service areas section listing all Alabama cities served
  - Satisfaction guarantee section
  - FAQ section with common questions and answers
  - Full contact information accessible without JavaScript
- **Homepage Conversion Improvements**:
  - Enhanced hero section with explicit service messaging and type badges
  - Added GoogleReviews component showing 5-star reviews with Google branding
  - Created ExitIntentPopup for email capture with 10% discount offer
  - Improved sticky mobile CTA with dual "Call Now" and "Text Us" buttons
  - Added safe-area padding for modern iOS devices
- **About Page Enhancement**:
  - Added founder story section with family-owned messaging since 2009
  - Created "Our Values" card (Integrity, Excellence, Trust, Community, Reliability)
  - Added certifications grid with 6 trust badges
  - Updated SEO with expanded service area keywords
- **Services Page Improvements**:
  - Added "What's NOT Included" sections to all service types (reduces scope creep expectations)
  - Added "Ideal for:" callouts to help customers self-select
  - Created SocialProofBar component showing key stats (5.0 Rating, 500+ Customers, 16 Years, 100%)
  - Expanded service area cards to include Selma, Homewood, Clanton, and Surrounding Areas
  - Updated all service descriptions with expanded service area cities
- **New Components Created**:
  - `client/src/components/google-reviews.tsx` - Google Reviews display widget
  - `client/src/components/exit-intent-popup.tsx` - Email capture popup
  - `client/src/components/social-proof-bar.tsx` - Reusable social proof stats bar

## December 1, 2025 - Comprehensive SEO & AI Crawler Optimization
- **Service Areas Expanded**: Added Clanton, Selma, and Homewood to all service area references across the site
- **AI Crawler Optimization**: Added support for AI search engines and LLM crawlers
  - robots.txt updated with GPTBot, ChatGPT-User, CCBot, Google-Extended, PerplexityBot, ClaudeBot permissions
  - Comprehensive JSON-LD structured data for AI understanding
- **Enhanced Structured Data**: Complete schema.org markup in index.html and home.tsx
  - LocalBusiness schema with full service catalog, reviews, and areaServed
  - FAQPage schema with common questions and answers
  - WebSite and WebPage schemas with publisher and search action
  - GeoCoordinates for local SEO
- **Directory Backlinks**: Footer now includes links to Google Maps, Yelp, BBB, Angi, Thumbtack, HomeAdvisor with proper rel attributes
- **Google Maps Integration**: Embedded Google Maps iframe in contact section for local SEO and user convenience
- **Sitemap & Robots**: Updated sitemap.xml with correct domain and all pages, robots.txt with AI crawler permissions
- **Meta Tags Cleanup**: Removed nonstandard meta tags, kept only recognized SEO-relevant tags

## November 25, 2025 - Stripe Integration Upgrade (Replit Connector)
- **Migrated to Replit's Official Stripe Connector**: Upgraded from environment variable-based Stripe configuration to use `stripe-replit-sync` for automatic key management
  - Created `server/stripeClient.ts` with Replit connection API integration
  - Automatically fetches Stripe keys from Replit's secure connection system
  - Supports both development and production environments
  - Uses `getUncachableStripeClient()` for fresh API credentials on each request
- **Managed Webhook System**: Implemented secure webhook handling with UUID-based routing
  - Webhook endpoint: `/api/stripe/webhook/:uuid` (registered before express.json() middleware)
  - Created `server/webhookHandlers.ts` for centralized webhook processing
  - Automatic signature verification via stripe-replit-sync
  - Handles `payment_intent.succeeded` events with full business logic (booking confirmation, email/SMS notifications, review requests)
- **Dynamic Publishable Key Retrieval**: Frontend fetches Stripe publishable key from `/api/stripe/public-key` endpoint instead of environment variables
  - Checkout page (`client/src/pages/checkout.tsx`) updated for dynamic key loading
  - Removes need for `VITE_STRIPE_PUBLIC_KEY` environment variable
- **Database Sync**: Stripe data automatically synced to PostgreSQL `stripe` schema
  - Products, prices, customers, subscriptions, invoices, charges, payment intents tracked
  - Schema managed by stripe-replit-sync (never modify `stripe` schema manually)
- **Important Notes**:
  - Webhook route must be registered BEFORE `express.json()` middleware to receive raw Buffer
  - Never create tables in the `stripe` schema - stripe-replit-sync manages this automatically
  - Use `getUncachableStripeClient()` for all Stripe API calls to ensure fresh credentials

## November 20, 2025 - Server-Side SEO Meta Tags & Crawler Optimization
- **Fixed Blank Page Issue**: Added comprehensive server-side SEO meta tags to `client/index.html` to ensure crawlers and social media platforms can read site information before JavaScript loads
  - Added title, description, keywords, author, robots, and canonical URL tags
  - Added Open Graph tags for social media sharing (Facebook, LinkedIn)
  - Added Twitter Card tags for Twitter/X sharing
  - Added geographic meta tags for local SEO (Montgomery/Prattville coordinates)
  - Added noscript fallback with contact information and services for users without JavaScript
- **Dependency Updates**: Reinstalled `tsx` package after security-related `glob` dependency update to restore application functionality
- **Future Enhancement**: Add custom Open Graph image (1200x630px) to `client/public/og-image.jpg` for improved social media previews

## November 11, 2025 - SEO & Google Business Profile Optimization
- **Local Keyword Optimization**: Enhanced all pages with 120+ targeted Alabama cleaning keywords for maximum local search visibility
  - Home, Services, Quote, About, FAQ, and Blog pages optimized
  - Targets Montgomery, Prattville, Selma, Millbrook, Wetumpka + all service types
  - Includes pricing terms, trust factors, and common customer questions
- **Google Business Profile Guide**: Complete optimization playbook in `GOOGLE_BUSINESS_PROFILE_OPTIMIZATION.md`
  - 30-day action plan for dominating local search rankings
  - Photo strategy (50+ photos), video content guidelines
  - Google Posts calendar (2-3x weekly posting schedule)
  - Review collection strategies (automated + manual)
  - Q&A pre-seeding with location-rich answers
  - Expected results: Top 3 Local Pack within 3-6 months

## November 11, 2025 - Marketing Campaigns Admin Dashboard
- **Email Marketing Hub**: Full-featured dashboard at `/admin/campaigns` for campaign management
  - Subscriber list with email, name, source, date (from contacts/bookings/quotes)
  - CSV export with security (prevents CSV injection attacks)
  - Campaign builder with templates (Win-Back, Seasonal, Referral, Custom)
  - Bulk email sending with batch processing for rate limits
  - Campaign tracking with status badges and metrics
  - Real-time statistics dashboard