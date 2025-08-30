# Digital Garden Portfolio

## Overview

This is a personal portfolio website designed as a "digital garden" - a space for showcasing thoughts, experiments, and personal timeline. The application presents content through three main sections: an About page with a timeline, a Thoughts page displaying blog-style posts, and an Experiments page showcasing projects. The design emphasizes a warm, earthy aesthetic with a cream and brown color palette.

### Recent Updates (August 2025)
- **Mobile Responsive Redesign**: Comprehensive mobile-first optimization with industry best practices
- **Enhanced Content Expansion**: Fixed 'see more' functionality for thoughts with improved content detection logic
- **Polaroid Tool Enhancement**: Refined layout with left-frame/right-controls positioning and fixed PNG export dimensions
- **Filter System**: Interactive category filters with color inversion and nested sub-filter functionality
- **Server Stability**: Port conflict resolution and graceful shutdown handling

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
- **Content Expansion**: Thoughts cards with 'see more' functionality based on length-based detection
- **Navigation**: Responsive navigation with desktop header and mobile hamburger menu
- **Layout**: Mobile-first responsive design with optimized card layouts and typography scaling

### Content Management Patterns

#### Expandable Content Implementation
For thoughts with preview + 'see more' functionality:

**Data Structure** (`client/src/data/thoughts.ts`):
```typescript
{
  id: "unique-id",
  title: "Content Title",
  description: "Preview text (first paragraph or summary)",
  fullDescription: "Complete content including description + additional paragraphs",
  // ... other fields
}
```

**Detection Logic** (`ThoughtCard` component):
```typescript
const hasMoreContent = thought.fullDescription && 
  thought.fullDescription.trim().length > (thought.description?.trim().length || 0) + 50;
```

**Key Requirements**:
- `fullDescription` must be 50+ characters longer than `description`
- `description` serves as preview text
- `fullDescription` contains complete content
- Toggle state managed with `useState(false)` per card

### Technical Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Shadcn/ui
- **Backend**: Express.js + TypeScript + Drizzle ORM + PostgreSQL
- **Routing**: Wouter for client-side navigation
- **State**: TanStack Query for server state management
- **Development**: Hot reload, type safety, graceful error handling
- **Hosting**: Replit with automatic deployment