# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service business operating in Alabama. The application provides a complete business website with service showcases, online booking functionality, payment processing, and contact management. Built as a modern React SPA with Express.js backend, it serves both marketing and operational needs for the cleaning business.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## October 1, 2025 - Dynamic Quote Calculator
- **Quote Page**: Created new /quote page with instant quote calculator based on service type and property size
- **Flexible Pricing**: Supports both preset size categories and custom square footage input for accurate quotes
- **Service Options**: All five cleaning services (Residential, Commercial, Airbnb, Move-in/out, Student Dorm) with service-specific pricing rates
- **Frequency Discounts**: Weekly (15%), Bi-weekly (10%), and Monthly (5%) recurring service discounts
- **Add-on Services**: Optional extras including Deep Cleaning, Carpet Cleaning, Window Cleaning, and Appliance Cleaning
- **Smart Logic**: Custom square footage overrides size selection for precise pricing
- **Call to Action**: Direct phone call and contact form links from quote display
- **Navigation**: Added "Get Quote" link to main navigation menu

## October 2, 2025 - JotForm Agent Integration & Updates
- **JotForm Agent**: Integrated JotForm AI chat agent as floating widget on all pages for instant customer support
- **Experience Update**: Changed company experience from 5 years to 16 years in About page statistics
- **Contact Section Updates**: Added new Shyne superhero mascot holding phone to contact section
- **Mobile Optimization**: Fixed services page mascot images to display properly on mobile devices with responsive sizing

## December 12, 2025 - Complete Mascot Branding Integration
- **Hero Section**: Replaced homepage banner with "We Make Your World Shine" mascot design featuring superhero sponge character
- **Navigation Header**: Added company logo (Super Sponge Cleaning Hero) to navigation with responsive behavior
- **Contact Section**: Complete redesign with "Get in Touch with the Clean Team" layout, mascot character with phone, and tagline "Questions? Ready to book? We're just a sponge-swipe away"
- **Services Section**: Integrated individual mascot poses for each service card using CSS sprite technique (thumbs up, running, flexing, pointing poses)
- **Recruitment Banner**: Added "JOIN THE CLEAN TEAM!" section with three mascots and recruitment modal functionality
- **Visual Consistency**: Maintained responsive design, dark mode support, and consistent branding throughout all sections
- **Functionality Preserved**: All existing booking, contact, and payment functionality maintained while enhancing visual appeal

## October 5, 2025 - Save My Quote Feature
- **Quote Persistence**: Added "Save My Quote" functionality allowing customers to save their quote calculations to the database
- **Customer Information Form**: Collects name, email, and phone number before saving quote for follow-up
- **Dual Email Notifications**: Automatically sends quote details to customer and business owner (selfmaidclean@outlook.com) via SendGrid
- **Contact Form Pre-fill**: "Request This Quote" link includes URL parameters to auto-populate contact form with service type and quote amount
- **Database Schema**: Added quotes table with fields for customer info, service details, property size, frequency, add-ons, and estimated price
- **Storage Interface**: Extended IStorage with saveQuote method for data persistence
- **API Endpoint**: Created POST /api/quotes route with validation and email dispatch functionality

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables for consistent theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: In-memory storage with PostgreSQL session store option
- **API Design**: RESTful endpoints with JSON responses

## Data Storage
- **Primary Database**: PostgreSQL hosted on Neon (serverless)
- **Schema**: Four main entities - users, contact_messages, bookings, and quotes
- **Data Validation**: Zod schemas shared between frontend and backend
- **Storage Pattern**: Repository pattern with interface abstraction allowing for memory or database storage

## Authentication & Security
- **Session Management**: Express sessions with secure cookie configuration
- **Data Validation**: Server-side validation using Zod schemas
- **CORS**: Configured for production deployment
- **Input Sanitization**: Built-in through Zod validation and TypeScript types

## Payment Processing
- **Payment Provider**: Stripe for secure payment processing
- **Integration**: Stripe Elements for PCI-compliant payment forms
- **Webhook Support**: Payment intent confirmation handling
- **Booking Flow**: Integration between booking system and payment processing

## Email Communication
- **Email Service**: SendGrid for transactional emails
- **Use Cases**: Contact form submissions, booking confirmations, payment receipts, quote notifications
- **Quote Notifications**: Dual email dispatch to both customer and business owner with detailed quote information
- **Fallback**: Graceful degradation when email service is unavailable

## Service Architecture
- **Service Types**: Five distinct cleaning services (residential, commercial, Airbnb, move-in/out, student dorms)
- **Pricing Structure**: Dynamic pricing based on service type with base rates
- **Booking System**: Multi-step booking process with payment integration
- **Contact Management**: Lead capture through contact forms

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Stripe**: Payment processing platform for secure transactions
- **SendGrid**: Email delivery service for transactional communications
- **Google Fonts**: Web font delivery (Inter, DM Sans, Fira Code, Geist Mono)

## Development Tools
- **Replit Integration**: Development environment support with runtime error overlay
- **TypeScript Compiler**: Type checking and transpilation
- **ESBuild**: Production bundling for server code
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Lucide React icons, React Icons
- **Form Handling**: React Hook Form, Hookform Resolvers
- **Validation**: Zod for runtime type validation
- **Styling**: Tailwind CSS, Class Variance Authority, clsx
- **Data Fetching**: TanStack React Query
- **Payment UI**: Stripe React components

## Backend Dependencies
- **Core Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, PostgreSQL driver, connection pooling
- **Session Management**: Express session with PostgreSQL store
- **Validation**: Zod schemas
- **Email**: SendGrid Mail API
- **Payment**: Stripe Node.js SDK
- **Development**: TSX for development server, Nodemon alternative