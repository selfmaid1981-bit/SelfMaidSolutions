# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service business operating in Alabama. The application provides a complete business website with service showcases, online booking functionality, payment processing, and contact management. Built as a modern React SPA with an Express.js backend, it serves both marketing and operational needs for the cleaning business, aiming to attract customers and streamline operations in the Montgomery/Prattville/Selma area.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## UI/UX Decisions
The application features a premium design with a consistent brand identity based on a "Super Sponge Cleaning Hero" mascot. It utilizes Playfair Display serif font for headings, a refined HSL color palette, and advanced animations (fade-in, float, shimmer, glass-effect) for a modern, professional appearance. Key UI components are built with Radix UI and shadcn/ui for accessibility and customizability, ensuring responsive design across devices and dark mode support.

## Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter for routing, Tailwind CSS for styling, Radix UI/shadcn/ui for components, TanStack Query for state management, React Hook Form with Zod for forms, and Vite for building.
- **Backend**: Node.js with Express.js and TypeScript, Drizzle ORM for PostgreSQL (Neon serverless), RESTful API design.
- **Data Storage**: PostgreSQL on Neon, using Drizzle ORM for type-safe operations. Schema includes `users`, `contact_messages`, `bookings`, and `quotes`.
- **Authentication & Security**: Express sessions with secure cookies, server-side Zod validation, CORS configuration, and input sanitization.
- **Payment Processing**: Stripe integration for secure transactions, using Stripe Elements for PCI-compliant forms and webhooks for payment intent confirmation.
- **Email Communication**: SendGrid handles all transactional and marketing emails, including contact form submissions, booking confirmations, payment receipts, and dual quote notifications to customers and the business owner.
- **Quote Calculator**: A dynamic quote calculator provides instant pricing based on service type (Residential, Commercial, Airbnb, Move-in/out, Apartment Turnover, Student Dorm - "Call for pricing"), property size/room count, frequency discounts, and add-on services.
- **Content & SEO**: Integrated blog section and comprehensive SEO strategies targeting local keywords (Montgomery, Prattville). Marketing content includes blog posts, social media templates, email sequences, Google Ads copy, and video scripts.

## Feature Specifications
- **Service Offerings**: Five distinct cleaning services with dynamic pricing structures.
- **Online Booking**: Multi-step booking process integrated with payment.
- **Contact Management**: Lead capture through contact forms, "Save My Quote" functionality that collects customer info and sends email notifications.
- **Content Marketing**: Blog, SEO-optimized articles, and various marketing content templates (social media, email, video).
- **Marketing Automation**: Strategy document outlining email and social media automation workflows using SendGrid, Buffer, Meta Business Suite, Hootsuite, and Zapier.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Stripe**: Payment processing.
- **SendGrid**: Email delivery and marketing campaigns.
- **Google Fonts**: Web font delivery (Inter, DM Sans, Fira Code, Geist Mono).

## Frontend Libraries
- **React Ecosystem**: React, React DOM, Wouter.
- **UI Framework**: Radix UI, Lucide React, React Icons.
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
- **Payment**: Stripe Node.js SDK.