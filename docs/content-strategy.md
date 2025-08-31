
# Content Strategy

## Content Philosophy

The digital garden serves as a space for authentic exploration of technology's impact on humanity. Content should feel personal, thoughtful, and accessible while tackling complex subjects.

## Content Types & Guidelines

### Thought Bite (2-3 min read)
**Purpose**: Quick insights, observations, provocative questions
**Length**: 200-400 words
**Tone**: Conversational, punchy, thought-provoking
**Structure**: 
- Hook opening
- Core insight
- Implication or question to ponder

**Example Topics**:
- "Creativity Is a Construct of Human Ego"
- "We Need to Defend Flow for Meaning"
- "Did AI make that?"

### POV (4-8 min read)
**Purpose**: Deeper exploration of themes, structured arguments
**Length**: 800-1500 words  
**Tone**: Thoughtful, analytical, accessible
**Structure**:
- Context setting
- Core argument with supporting points
- Implications and conclusions

**Example Topics**:
- "Addressing The AI x Human Gap"
- "Four Tribes of Tomorrow"

### Scenario (4-6 min read)
**Purpose**: Speculative futures, thought experiments
**Length**: 600-1000 words
**Tone**: Imaginative, cautionary, or optimistic
**Structure**:
- Future scenario setup
- Implications exploration
- Present-day connections

**Example Topics**:
- "Democracy's Last Voter"
- "Mind Your Manners, Human"

### Article (8+ min read)
**Purpose**: Comprehensive analysis, detailed explorations
**Length**: 1500+ words
**Tone**: Authoritative yet accessible
**Structure**:
- Introduction with thesis
- Multiple supporting sections
- Conclusion with actionable insights

## Topic Categories

### AI & Tech
Focus on artificial intelligence, technology systems, and their implications

**Content Themes**:
- Human-AI collaboration gaps
- Technology ethics and governance
- AI development philosophies
- Technical implementation impacts

**Audience**: Tech professionals, AI researchers, policy makers

### Society & Power
Examine structures, institutions, and power dynamics

**Content Themes**:
- Inequality and systemic issues
- Governance and democracy
- Economic systems
- Social structures

**Audience**: Policy makers, social scientists, engaged citizens

### Identity & Meaning
Personal, cultural, and existential questions in technological age

**Content Themes**:
- Human purpose and meaning
- Cultural identity shifts
- Personal adaptation strategies
- Philosophical implications

**Audience**: General readers interested in human experience

### Futures & Experiments
Speculation, prototyping, long-term imagination

**Content Themes**:
- Speculative scenarios
- Prototype concepts
- Future planning strategies
- Experimental approaches

**Audience**: Futurists, designers, innovators

## Editorial Guidelines

### Voice & Tone
- **Conversational**: Write like you're explaining to a smart friend
- **Curious**: Ask questions, explore uncertainties
- **Grounded**: Connect abstract ideas to concrete examples
- **Personal**: Share authentic perspectives and experiences
- **Accessible**: Avoid jargon, explain technical concepts

### Structure Best Practices
- **Hook readers early**: Start with compelling questions or observations
- **Use concrete examples**: Abstract concepts need real-world anchors
- **Break up text**: Headers, bullets, short paragraphs
- **End with resonance**: Questions, implications, or calls to action

### SEO & Discoverability
- **Descriptive titles**: Clear, searchable, intriguing
- **Meta descriptions**: Compelling 1-2 sentence summaries
- **Topic tags**: Consistent categorization for filtering
- **Internal linking**: Connect related content

## Content Planning

### Ideation Sources
- Daily observations about technology use
- Industry news and developments
- Academic research and studies  
- Personal experiences with AI tools
- Conversations with others in the field

### Content Calendar Approach
- **Evergreen content**: Timeless insights that remain relevant
- **Reactive content**: Responses to current events or trends
- **Experimental content**: New formats or approaches
- **Series content**: Multi-part explorations of complex topics

### Quality Standards
- **Accuracy**: Fact-check claims, cite sources when appropriate
- **Originality**: Unique perspectives, not rehashing common points
- **Value**: Each piece should offer genuine insight or provoke thought
- **Clarity**: Ideas should be understandable to intended audience

### Expandable Content Implementation

**Required Data Structure**:
- `description`: First paragraph or opening sentences only (preview text)
- `fullDescription`: Complete content including all paragraphs
- Both fields must be populated with `fullDescription` being significantly longer (50+ characters more)

**Content Formatting Rules**:
- Use `\n\n` to separate paragraphs in `fullDescription`
- `description` must contain ONLY the opening content (first paragraph or opening sentences)
- `fullDescription` must contain the COMPLETE content (including the opening content from description)
- Length difference must be > 50 characters to trigger expand/collapse functionality

**Technical Implementation Rules**:
- **ALWAYS use ThoughtCard component** for consistent behavior across desktop and mobile
- **NEVER implement custom expand/collapse logic** in page layouts
- **ALL layouts (desktop, mobile, masonry)** must use ThoughtCard component
- **ThoughtCard component handles all expand/collapse logic automatically** based on data structure

**Implementation Checklist**:
1. ✅ Populate both `description` and `fullDescription` fields
2. ✅ Ensure `fullDescription.length > description.length + 50` (triggers expand/collapse)  
3. ✅ `description` should be the opening content only
4. ✅ `fullDescription` should include opening content + additional paragraphs
5. ✅ **Use ThoughtCard component in ALL layouts** (desktop, mobile, masonry)
6. ✅ Test "See more" button appears and functions correctly on both desktop AND mobile
7. ✅ Verify expansion shows full content, collapse shows preview only
8. ✅ **NO custom expand/collapse implementations in page layouts**

**Correct Layout Implementation**:
```typescript
// ✅ CORRECT - Use ThoughtCard component
const MobileLayout = () => (
  <div className="grid grid-cols-1 gap-4">
    {thoughts.map((thought) => (
      <ThoughtCard key={thought.id} thought={thought} variant="default" />
    ))}
  </div>
);

// ❌ WRONG - Custom implementation in layout
const MobileLayout = () => (
  <div className="grid grid-cols-1 gap-4">
    {thoughts.map((thought) => (
      <div key={thought.id}>
        {/* Custom rendering logic */}
      </div>
    ))}
  </div>
);
```

**Data Structure Example**:
```typescript
{
  description: "Opening paragraph only...",
  fullDescription: "Opening paragraph only...\n\nSecond paragraph...\n\nThird paragraph...",
  // This ensures fullDescription.length > description.length + 50
}
```

## Metadata Management

### Required Fields
- **Title**: Clear, descriptive, searchable
- **Description**: 1-2 sentence summary for cards and SEO
- **Tag**: Content type (Thought Bite, POV, Scenario, Article)
- **Topic**: Primary category, can be multiple
- **Date**: Publication date
- **Status**: published, wip, draft

### Optional Fields
- **Read Time**: Estimated reading time
- **Full Description**: Extended content for longer pieces
- **Image Gradient**: Visual branding for content type

### Topic Assignment Guidelines
- **Single topic**: Most content fits one primary category
- **Multiple topics**: Use sparingly for truly cross-cutting content
- **Consistency**: Use existing topic IDs, don't create new ones casually

## Content Maintenance

### Regular Reviews
- **Quarterly**: Review all content for accuracy and relevance
- **Annual**: Assess topic balance and content gaps
- **Ongoing**: Update outdated information or broken links

### Archive Strategy
- **Sunset outdated content**: Mark as draft if no longer relevant
- **Update evergreen pieces**: Refresh with new insights or examples
- **Preserve historical perspectives**: Keep some content as time capsules
