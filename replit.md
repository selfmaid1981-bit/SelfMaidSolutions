# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service operating in Alabama. It provides a comprehensive business website featuring service showcases, an instant quote calculator, online booking with flexible payment options, and secure payment processing. The application aims to attract customers and streamline operations in the Montgomery, Prattville, and Selma areas, serving both marketing and operational needs for the cleaning business. Key capabilities include lead capture, marketing automation, and customer relationship management through an integrated admin dashboard.

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