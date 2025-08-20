# Digital Garden Portfolio

## Overview

This is a personal portfolio website designed as a "digital garden" - a space for showcasing thoughts, experiments, and personal timeline. The application presents content through three main sections: an About page with a timeline, a Thoughts page displaying blog-style posts, and an Experiments page showcasing projects. The design emphasizes a warm, earthy aesthetic with a cream and brown color palette.

### Recent Updates (August 2025)
- **Mobile Responsive Redesign**: Comprehensive mobile-first optimization with industry best practices
- **Mobile Navigation**: Replaced top navigation bar with hamburger menu for mobile devices
- **Card Layout Optimization**: Redesigned 3-card landing page layout for better mobile viewing
- **Typography Scaling**: Implemented responsive text sizes that scale appropriately across devices
- **Touch-Friendly Interface**: Enhanced touch targets and mobile interaction patterns
- **Mister Misu Page Conversion**: Converted modal experience to dedicated page at `/experiments/mistermisu` for cleaner routing and better user experience

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom color variables for consistent theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management

### Component Structure
- **Page Components**: Home, About, Thoughts, Experiments, Mister Misu, and NotFound pages
- **UI Components**: Reusable cards for timeline events, thoughts, and experiments
- **Navigation**: Responsive navigation with desktop header and mobile hamburger menu with slide-out drawer
- **Layout**: Mobile-first responsive design with optimized card layouts and typography scaling
- **Mobile Features**: Touch-friendly interfaces, proper spacing, and viewport-aware layouts
- **Dedicated Pages**: Individual project pages with clean routing structure (e.g., /experiments/mistermisu)

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful endpoints for timeline events, thoughts, and experiments
- **Development**: Hot module replacement with Vite integration
- **Error Handling**: Centralized error middleware with JSON responses

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless driver
- **Schema**: Defined schemas for users, timeline events, thoughts, and experiments
- **Storage Interface**: Abstract storage interface with in-memory implementation for development

### Development Setup
- **Build System**: Vite for frontend, esbuild for backend compilation
- **Environment**: Separate development and production configurations
- **Type Safety**: Strict TypeScript configuration across client, server, and shared modules

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe styling variants

### Backend Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Express**: Web framework for API endpoints
- **Drizzle Kit**: Database migrations and schema management

### Development Tools
- **Vite**: Frontend build tool with hot reload
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library
- **TypeScript**: Type safety across the entire application

### Hosting and Deployment
- **Replit**: Development environment with built-in deployment
- **Environment Variables**: Database connection and configuration management