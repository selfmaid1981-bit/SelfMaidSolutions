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
- **Content Marketing**: Blog, SEO-optimized articles, and a complete marketing toolkit.
- **Conversion Optimization**: Homepage enhancements including an interactive Before/After gallery, expanded testimonials, trust badges, and optimized CTAs. New components like Google Reviews display widget and Exit-Intent Popups.

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