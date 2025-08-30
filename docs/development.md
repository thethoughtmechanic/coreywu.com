
# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm or preferred package manager
- Replit account with Core subscription

### Setup
1. Clone/fork the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Open `http://localhost:3000` to view the application

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Static data files
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
├── shared/                # Shared TypeScript schemas
└── docs/                  # Project documentation
```

## Key Components

### Content Management
- **thoughts.ts**: All thought content with metadata
- **experiments.ts**: Project showcase data
- **timeline.ts**: Personal/professional timeline events

### UI Components
- **thought-card.tsx**: Displays individual thoughts
- **experiment-card.tsx**: Project showcase cards
- **experimental-filter-v2.tsx**: Advanced filtering system
- **navigation.tsx**: Responsive navigation component

## Data Schema

### Thoughts
```typescript
interface Thought {
  id: string
  title: string
  description: string
  fullDescription?: string
  tag: 'Thought Bite' | 'POV' | 'Scenario' | 'Article'
  topic: string | string[]  // Can be single or multiple topics
  readTime?: string
  imageGradient: string
  status: 'published' | 'wip' | 'draft'
  date: string
}
```

### Experiments
```typescript
interface Experiment {
  id: string
  title: string
  description: string
  status: 'shipped' | 'wip' | 'sunset'
  collaborationType: 'solo' | 'collaboration'
  problemType: 'vertical' | 'horizontal'
  imageGradient: string
  timeframe: string
  collaborators?: string[]
  technologies: string[]
  isActive: boolean
}
```

## Development Workflow

### Adding New Content

#### New Thought
1. Add entry to `client/src/data/thoughts.ts`
2. Include all required metadata
3. Choose appropriate topic(s) from existing categories
4. Test filtering functionality

#### New Experiment
1. Add entry to `client/src/data/experiments.ts`
2. Include technology stack and collaborator info
3. Create dedicated page if needed

#### New Page
1. Create component in `client/src/pages/`
2. Add route to `App.tsx`
3. Update navigation if needed
4. Ensure mobile responsiveness

### Code Style

#### TypeScript
- Use strict typing
- Define interfaces for all data structures
- Prefer explicit types over `any`

#### React
- Functional components with hooks
- Extract custom hooks for reusable logic
- Keep components focused and single-purpose

#### CSS/Tailwind
- Mobile-first responsive design
- Use design system tokens consistently
- Leverage Tailwind's utility classes

## Testing

### Manual Testing Checklist
- [ ] Mobile responsiveness across devices
- [ ] Navigation works on all screen sizes
- [ ] Filtering system functions correctly
- [ ] Content displays properly
- [ ] Images load and scale correctly
- [ ] Typography is readable at all sizes

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Form labels are properly associated
- [ ] Focus indicators are visible

## Deployment

### Replit Deployment
1. Ensure all changes are committed
2. Click "Deploy" button in Replit
3. Choose recommended deployment option
4. Test deployed version
5. Update custom domain if needed

### Performance Optimization
- Optimize images before adding to `/public`
- Minimize bundle size with tree shaking
- Use lazy loading for large components
- Implement proper caching headers

## Common Patterns

### Adding Filtering
1. Update data schema if needed
2. Modify filter component logic
3. Test filter combinations
4. Ensure mobile usability

### Responsive Design
1. Start with mobile layout
2. Use Tailwind responsive prefixes
3. Test on actual devices
4. Optimize touch targets

### Content Creation
1. Follow established voice/tone guidelines
2. Use consistent metadata structure
3. Optimize for scan-reading
4. Include proper topic categorization
