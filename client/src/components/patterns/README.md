# Abstract Pattern System

This directory contains abstract pattern components designed for the "Idea Blooms" futures reports. Each pattern captures the thematic essence of its report through abstract visual elements rather than literal illustrations.

## Design Philosophy

Instead of using character-driven narrative illustrations, these patterns use:
- **Color palettes** that evoke the theme
- **Abstract geometric forms** and animations
- **Layered transparency** for depth
- **Subtle motion** for engagement
- **Thematic visual metaphors** (networks, fragments, systems)

## Current Patterns

### 1. PostTruthPattern
**Theme:** Fragmented realities, multiple truths, information distortion

**Visual Elements:**
- Fragmented geometric layers suggesting overlapping realities
- Glitch effects representing information distortion
- Orange/red color palette for urgency and instability
- Floating particles representing information fragments
- Data noise and scanline effects

**Use Case:**
```tsx
import { PostTruthPattern } from "@/components/patterns/post-truth-pattern";

<div className="relative">
  <PostTruthPattern />
  {/* Your content here */}
</div>
```

### 2. AIHumanPattern
**Theme:** The widening gap between AI and human capabilities

**Visual Elements:**
- Neural network connections representing AI systems
- Organic circular forms representing humanity
- Purple/blue color palette for technology and thought
- Flowing data particles showing movement between realms
- Grid patterns representing the interface/gap

**Use Case:**
```tsx
import { AIHumanPattern } from "@/components/patterns/ai-human-pattern";

<div className="relative">
  <AIHumanPattern />
  {/* Your content here */}
</div>
```

### 3. AIGovernancePattern
**Theme:** Frameworks, hierarchy, and systematic approaches to AI governance

**Visual Elements:**
- Concentric circles representing layers of governance
- Rotating elements showing active systems
- Green/teal color palette suggesting growth and regulation
- Orbital pathways representing decision flows
- Structured grid representing systematic approaches

**Use Case:**
```tsx
import { AIGovernancePattern } from "@/components/patterns/ai-governance-pattern";

<div className="relative">
  <AIGovernancePattern />
  {/* Your content here */}
</div>
```

## Creating New Patterns

When creating a new pattern for a futures report, consider:

1. **Theme Analysis** - What core concepts does the report explore?
2. **Visual Metaphors** - What shapes/forms represent these concepts?
3. **Color Psychology** - What colors evoke the right emotional response?
4. **Motion & Life** - How can subtle animation add engagement?
5. **Readability** - Always include overlay gradients for text legibility

### Pattern Structure

All patterns should:
- Accept a `className` prop for flexibility
- Use absolute positioning to fill their container
- Include overlay gradients for text readability
- Use subtle, purposeful animations
- Maintain performance with CSS animations over JS when possible
- Keep opacity levels subtle (0.02-0.20 range typically)

## Color Palettes

- **Post-truth:** Oranges, reds, roses (urgency, instability)
- **AI x Human:** Purples, blues, indigos (technology, thought)
- **AI Governance:** Greens, teals, emeralds (growth, regulation)

## Performance Considerations

- Use CSS animations over JavaScript when possible
- Keep particle counts reasonable (10-15 elements max)
- Use `transform` and `opacity` for smooth 60fps animations
- Leverage `blur` sparingly as it's GPU-intensive
- Test on mobile devices for performance

## Accessibility

- Patterns are purely decorative and don't convey essential information
- All critical content remains in text form
- Animations are subtle enough not to cause motion sickness
- Consider adding `prefers-reduced-motion` support if needed

