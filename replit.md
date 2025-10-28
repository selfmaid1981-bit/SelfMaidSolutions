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

## October 22, 2025 - Student Dorm Room-Based Pricing
- **New Pricing Model**: Added Student Dorm/Apartment Turnover service with $45 per room pricing
- **Dynamic Form**: Quote calculator shows room count input for student dorm, hides square footage fields
- **Calculation Logic**: Room-based pricing (rooms × $45) with frequency discounts applied
- **Quote Display**: Shows room count in quote details instead of property size for student dorm service
- **Services Page Update**: Updated pricing display to "$45 per room" with clear explanation

## October 23, 2025 - Content Marketing & SEO Enhancement
- **Blog Section**: Created comprehensive blog with SEO-optimized articles targeting Montgomery/Prattville keywords
- **Blog Posts**: Added detailed guides including "Ultimate Guide to Home Cleaning in Montgomery, AL" and "Complete Airbnb Cleaning Checklist for Prattville Hosts"
- **Navigation Update**: Added "Blog" link to main navigation menu
- **Footer Enhancement**: Expanded footer with Quick Links section, service areas, and improved local SEO
- **SEO Strategy Document**: Created comprehensive SEO_BACKLINK_STRATEGY.md with actionable steps for:
  - Google Business Profile optimization
  - Local citation building (30+ directories)
  - Backlink acquisition strategies
  - Social media marketing plan
  - Review generation system
  - Partnership opportunities
  - 90-day action plan
- **Content Focus**: All content optimized for Montgomery and Prattville local search visibility

## October 23, 2025 - Premium Design Transformation & Free Traffic Guide
- **Typography Upgrade**: Implemented Playfair Display serif font for all headings with refined letter-spacing and line-height
- **Premium Color Palette**: Refined HSL color values for cleaner, more professional appearance
- **Advanced Animations**: Added fade-in, float, shimmer, and glass-effect animations with cubic-bezier easing
- **Hero Section Polish**: 
  - Premium gradient background with decorative blur elements
  - Glass-effect CTAs with micro-interactions (icon rotations, scale on hover)
  - Enhanced trust badges with translucent backgrounds and high-contrast dark text
  - Improved spacing and visual hierarchy
- **Navigation Enhancement**:
  - Glass-effect with backdrop blur and subtle shadow
  - Larger logo (h-12) with serif brand text
  - Premium gradient buttons with hover effects
  - Increased navigation height for better proportions
- **Button Styling**: Gradient buttons with smooth transitions, shadows, and transform effects
- **Service Cards**: Gradient backgrounds, elevated hover states with scale and shadow effects
- **Glass Effects**: Translucent backgrounds with backdrop blur for modern aesthetic
- **Immediate Traffic Guide**: Created IMMEDIATE_FREE_TRAFFIC_WINS.md with:
  - 10 quick-win strategies (30 minutes each)
  - Google Business Profile setup (critical #1 priority)
  - Social media platform guides (Facebook, Instagram, Nextdoor, LinkedIn, Pinterest)
  - Craigslist posting templates
  - Review generation system
  - 30-day free traffic challenge
  - Success checklist for first 48 hours

## October 28, 2025 - Apartment Turnover Service Addition
- **New Service**: Added Apartment Turnover as standalone service option
- **Pricing**: $108 starting price (average between Airbnb $65 and Move-out $150)
- **Features**: Same-day service, make-ready cleaning, volume discounts for property managers
- **Quote Calculator**: Integrated with square footage-based pricing (baseRate: 0.171, minCharge: 108)
- **Target Market**: Property managers, landlords, and apartment complexes in Montgomery/Prattville/Selma

## October 27, 2025 - Complete SEO Content Marketing Library
- **SEO Content Library**: Created comprehensive SEO_CONTENT_LIBRARY.md with ready-to-use marketing content:
  - 2 additional SEO-optimized blog posts (Spring Cleaning Checklist 850 words, Office Cleaning Benefits 900 words)
  - Social media templates for Facebook (5 post types), Instagram (3 formats), LinkedIn (2 B2B posts)
  - Email marketing sequences (welcome, follow-up, re-engagement)
  - Google Ads copy templates for 3 service categories
  - Press release template for local media and backlinks
  - Nextdoor community engagement templates
  - 30-day content calendar for consistent posting
  - Backlink building strategies and guest post pitches
- **Video Content Scripts**: Created VIDEO_CONTENT_SCRIPTS.md with video marketing assets:
  - 5 short-form video scripts (15-60 seconds) for TikTok/Instagram Reels/YouTube Shorts
  - 2 long-form YouTube video scripts (6-10 minutes) with full production details
  - TikTok series ideas for follower growth
  - Content repurposing guide (turn 1 blog into 20+ pieces)
  - Video SEO optimization checklist
  - Weekly posting schedule with best times for Montgomery/Prattville timezone
  - 15 evergreen video content ideas
  - Performance tracking metrics and goals
- **Marketing Impact**: All content optimized for Montgomery/Prattville local keywords to drive targeted organic traffic and quality backlinks

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