# Excellence Academy School Website

## Overview

Excellence Academy is a modern school website built as a full-stack application featuring a public-facing website for students, parents, and staff, along with an admin dashboard for content management. The application showcases academic programs, faculty members, upcoming events, photo galleries, and provides contact functionality. Built with React, Express, and PostgreSQL, it follows a clean architecture pattern with clear separation between client, server, and shared code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Framer Motion for animations
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for styling

**Design System:**
- Custom theme provider supporting light/dark modes
- Design tokens managed through CSS variables
- Typography system using Inter font family with Playfair Display for accents
- Responsive layout system with container strategies (max-w-7xl, max-w-6xl, max-w-4xl)
- Consistent spacing primitives (4, 8, 12, 16, 20, 24, 32px)

**Component Organization:**
- UI components in `client/src/components/ui/` (atomic design pattern)
- Feature components in `client/src/components/` (Navigation, Footer, HeroSection, ThemeProvider)
- Page components in `client/src/pages/` (Home, Academics, Faculty, Events, Gallery, Contact, Admin)
- Shared hooks in `client/src/hooks/`

**State Management Strategy:**
- Server state handled by TanStack Query with custom queryClient configuration
- Local UI state managed with React hooks
- Form state managed by React Hook Form with Zod validation
- Theme state persisted to localStorage

### Backend Architecture

**Technology Stack:**
- Express.js with TypeScript
- Node.js runtime (ESM modules)
- Drizzle ORM for database interactions
- Zod for schema validation
- Custom in-memory storage layer with database interface abstraction

**API Design:**
- RESTful API endpoints under `/api` prefix
- CRUD operations for: faculty, events, programs, gallery images, contacts, announcements
- Consistent error handling with appropriate HTTP status codes
- Request logging middleware for API routes
- JSON-based request/response format

**Storage Layer Abstraction:**
- `IStorage` interface defines contract for data operations
- `MemStorage` class provides in-memory implementation
- Design allows easy swap to database-backed storage (Drizzle + PostgreSQL)
- UUID-based primary keys for all entities

**Server Configuration:**
- Development: Hot module replacement via Vite middleware
- Production: Static file serving from dist/public
- Custom error overlay for development
- Express middleware for JSON parsing and URL encoding

### Data Layer

**Database Schema (PostgreSQL via Drizzle):**
- `faculty`: Staff profiles with name, title, department, email, bio, image
- `events`: Calendar events with title, description, date, time, location, category, image
- `programs`: Academic programs with name, description, icon, faculty count
- `announcements`: School announcements with title, content, date, priority
- `gallery_images`: Photo gallery with title, category, image URL
- `contacts`: Contact form submissions with name, email, phone, inquiry type, message

**Schema Validation:**
- Drizzle-Zod integration generates type-safe validators from database schema
- All API endpoints validate input using generated schemas
- Type safety maintained from database to API to frontend

### Routing Architecture

**Frontend Routes:**
- `/` - Homepage with hero, welcome section, featured programs/events
- `/academics` - Academic programs listing
- `/faculty` - Faculty directory with department filtering
- `/events` - Events calendar with category filtering
- `/gallery` - Photo gallery with category filtering
- `/contact` - Contact form
- `/admin` - Admin dashboard landing
- `/admin/faculty`, `/admin/events`, `/admin/programs`, `/admin/gallery`, `/admin/contacts` - Admin CRUD interfaces

**Backend Routes:**
- `GET /api/faculty` - List all faculty
- `GET /api/faculty/:id` - Get single faculty member
- `POST /api/faculty` - Create faculty member
- `PATCH /api/faculty/:id` - Update faculty member
- `DELETE /api/faculty/:id` - Delete faculty member
- Similar CRUD patterns for events, programs, gallery, contacts, announcements

### Build & Development Strategy

**Development Workflow:**
- Vite dev server with HMR for instant feedback
- Express server runs alongside Vite in middleware mode
- TypeScript type checking via `tsc --noEmit`
- Path aliases for clean imports (@/, @shared/, @assets/)

**Production Build:**
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Single deployment artifact with both frontend and backend
- Static assets served by Express in production

**Database Migrations:**
- Drizzle Kit manages schema migrations
- `db:push` command for schema synchronization
- Migration files stored in `migrations/` directory

## External Dependencies

### UI & Component Libraries
- **Radix UI Primitives** - Accessible, unstyled component primitives for building the design system (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, and 15+ more)
- **Shadcn UI** - Pre-built component library built on Radix UI with Tailwind CSS styling
- **Framer Motion** - Animation library for smooth page transitions and micro-interactions
- **Embla Carousel** - Carousel/slider functionality
- **Lucide React** - Icon library for UI elements

### Form Management & Validation
- **React Hook Form** - Form state management with validation
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Data Fetching & State
- **TanStack Query (React Query)** - Server state management, caching, and synchronization
- **Wouter** - Lightweight client-side routing library

### Database & ORM
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **Drizzle-Zod** - Generate Zod schemas from Drizzle schemas
- **@neondatabase/serverless** - PostgreSQL driver for Neon serverless database
- **PostgreSQL** - Primary database (configured for Neon serverless platform)

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing pipeline
- **Autoprefixer** - Automatic vendor prefixing
- **class-variance-authority** - Utility for building type-safe variant APIs
- **clsx** & **tailwind-merge** - Class name utilities

### Development Tools
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety across the stack
- **esbuild** - Fast JavaScript bundler for production backend
- **tsx** - TypeScript execution for development server
- **@replit/vite-plugin-runtime-error-modal** - Error overlay for Replit environment
- **@replit/vite-plugin-cartographer** & **@replit/vite-plugin-dev-banner** - Replit-specific development enhancements

### Utilities
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation
- **cmdk** - Command palette functionality