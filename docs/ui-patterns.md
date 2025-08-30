
# UI Patterns & Components

## Design Principles

### Visual Hierarchy
- **Typography scale**: Clear distinction between headings, body text, and metadata
- **Color hierarchy**: Warm brown for primary elements, soft black for content
- **Spacing hierarchy**: Generous whitespace creates breathing room

### Interaction Design
- **Touch-first**: 44px minimum touch targets on mobile
- **Feedback**: Immediate visual response to user actions
- **Accessibility**: Keyboard navigation and screen reader support

## Component Library

### Navigation Patterns

#### Desktop Navigation
```
Header: Fixed, horizontal, cream background
- Logo: Left-aligned, warm brown
- Nav items: Center-aligned, active states
- Contact: Right-aligned CTA button
```

#### Mobile Navigation
```
Header: Hamburger menu icon
Drawer: Slide-out navigation
- Full-height overlay
- Large touch targets
- Clear close button
```

### Content Cards

#### Thought Cards
- **Background**: Topic-specific gradient
- **Typography**: White text for contrast
- **Metadata**: Read time, date, content type
- **Hover states**: Subtle scale/shadow changes
- **Layout**: Title, description, metadata footer

#### Experiment Cards  
- **Status indicators**: Color-coded by project status
- **Technology tags**: Pill-shaped, muted styling
- **Collaboration**: Clear attribution to collaborators
- **Visual hierarchy**: Title → description → metadata

#### Timeline Cards
- **Chronological layout**: Vertical timeline with markers
- **Date prominence**: Clear temporal anchors
- **Content preview**: Expandable descriptions
- **Visual connection**: Lines connecting timeline points

### Filter Patterns

#### Multi-Select Filtering
- **Button groups**: Toggle-based selection
- **Visual feedback**: Active/inactive states
- **Clear functionality**: Easy way to reset filters
- **Mobile optimization**: Touch-friendly spacing

#### Filter Categories
- **Type filtering**: Content type (Thought Bite, POV, etc.)
- **Topic filtering**: Subject area (AI & Tech, Society, etc.)
- **Status filtering**: For experiments (shipped, WIP, sunset)

### Layout Patterns

#### Card Grid System
```
Mobile: Single column, full width
Tablet: 2 columns with gutters
Desktop: 3 columns maximum, left-aligned
```

#### Content Layout
```
Mobile: Stack all elements vertically
Desktop: Sidebar navigation + main content
Responsive: Breakpoints at 768px and 1024px
```

## Responsive Behavior

### Mobile-First Approach
1. **Design for 375px width minimum**
2. **Enhance progressively for larger screens**
3. **Touch-friendly interactions throughout**
4. **Readable text without zooming**

### Breakpoint Strategy
- **Small (< 768px)**: Mobile phones
- **Medium (768px - 1024px)**: Tablets
- **Large (> 1024px)**: Desktop/laptop

### Component Scaling
- **Typography**: Scales with viewport size
- **Spacing**: Proportional adjustments
- **Touch targets**: Always minimum 44px
- **Images**: Responsive with proper aspect ratios

## Animation Guidelines

### Performance
- **Hardware acceleration**: Use transform and opacity
- **Frame rate**: Target 60fps
- **Duration**: 200-300ms for most transitions
- **Easing**: Natural curves (ease-out, ease-in-out)

### Common Animations
- **Hover effects**: Scale 1.02x, slight shadow increase
- **Page transitions**: Fade between routes
- **Filter updates**: Smooth content swapping
- **Loading states**: Skeleton screens, fade-ins

## Accessibility Standards

### Keyboard Navigation
- **Tab order**: Logical sequence through interface
- **Focus indicators**: Visible outline on focus
- **Escape functionality**: Close modals/dropdowns
- **Enter/Space**: Activate buttons and links

### Screen Readers
- **Semantic HTML**: Proper heading hierarchy
- **Alt text**: Descriptive image alternatives  
- **Labels**: Form inputs properly labeled
- **Landmarks**: Navigation, main, footer regions

### Color & Contrast
- **WCAG AA compliance**: 4.5:1 contrast minimum
- **Color independence**: Don't rely solely on color
- **Focus indicators**: High contrast, visible outlines

## Content Presentation

### Typography Patterns
- **Headings**: Clear hierarchy (h1 → h6)
- **Body text**: Readable line length (45-75 characters)
- **Line height**: 1.5x for body text, 1.2x for headings
- **Letter spacing**: Subtle adjustments for readability

### Content Formatting
- **Paragraphs**: Short, scannable blocks
- **Lists**: Proper markup with clear hierarchy
- **Links**: Underlined in content, styled in navigation
- **Code**: Monospace font, background highlighting

### Image Guidelines
- **Aspect ratios**: Consistent within component types
- **Optimization**: WebP format when possible
- **Responsive**: Scale properly across devices
- **Loading**: Proper fallbacks and lazy loading

## Error States & Edge Cases

### Loading States
- **Skeleton screens**: Content-shaped placeholders
- **Progressive loading**: Critical content first
- **Feedback**: Clear indication of loading status

### Empty States
- **Helpful messaging**: Explain why content is empty
- **Action guidance**: Clear next steps for users
- **Visual consistency**: Match overall design language

### Error Handling
- **User-friendly messages**: Avoid technical jargon
- **Recovery options**: Clear paths to resolution
- **Graceful degradation**: Core functionality remains available
