# Overview

Self-Maid Cleaning Solutions is a full-stack web application for a professional cleaning service business operating in Alabama. The application provides a complete business website with service showcases, online booking functionality, payment processing, and contact management. Built as a modern React SPA with Express.js backend, it serves both marketing and operational needs for the cleaning business.

# User Preferences

Preferred communication style: Simple, everyday language.

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
- **Schema**: Three main entities - users, contact_messages, and bookings
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
- **Use Cases**: Contact form submissions, booking confirmations, payment receipts
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