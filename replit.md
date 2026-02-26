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
- **Data Storage**: PostgreSQL on Neon, managing schemas for `users`, `contact_messages`, `bookings`, `quotes`, `review_requests`, and marketing campaigns.
- **Authentication & Security**: Express sessions with secure cookies, server-side Zod validation, CORS, and input sanitization.
- **Payment Processing**: Stripe integration for secure transactions, utilizing Stripe Elements and webhooks.
- **Email Communication**: SendGrid handles all transactional and marketing emails.
- **Quote Calculator**: Dynamic calculator based on service type, property size, frequency discounts, and add-on services.
- **Content & SEO**: Includes a blog, comprehensive SEO strategies targeting local keywords, and various marketing content templates. Dynamic sitemap.xml and robots.txt are generated.
- **Marketing Automation**: Strategy for email and social media automation workflows using SendGrid, Buffer, Meta Business Suite, Hootsuite, and Zapier.
- **Admin Dashboard**: Features for managing email marketing campaigns, subscribers (with CSV export), and tracking automated review requests.
- **Automated Review System**: Triggers Google review requests via email and SMS after successful Stripe payments.
- **SMS Notifications**: Twilio integration for business owner notifications and customer review requests.
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
- **Pricing Transparency Section**: Homepage pricing grid showing all 6 service types with realistic price ranges ($65–$450). Includes "most popular" and "highest margin" callouts.
- **Airbnb/STR Landing Page**: Dedicated page at `/airbnb-cleaning` targeting Airbnb hosts and property managers. Features: same-day turnover selling points, 3-tier pricing, turnover checklist, host testimonials.
- **Airbnb Teaser on Homepage**: Dark teal/blue section linking to the Airbnb page with stats (4.9 rating, same-day, $65+).
- **Recurring Plans Section**: Homepage section showcasing weekly/bi-weekly/monthly subscription plans with 10–20% savings. Includes satisfaction guarantee callout.
- **Expanded Sitemap**: All 9 blog posts, /airbnb-cleaning, /get-started, and all city pages included in sitemap.xml.
- **Server-Side Meta Injection**: /airbnb-cleaning and /get-started added to SSR meta injection for SEO crawler compatibility.

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