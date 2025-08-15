import { Thought } from "@shared/schema";

// Extended interface for frontend data with additional optional properties
interface ExtendedThought extends Thought {
  stackedOn?: string;
  version?: string;
  edit?: string;
}

export const thoughts: ExtendedThought[] = [
  {
    id: "1",
    title: "Addressing The AI x Human Gap",
    description: "Exploring 3 critical human breakdowns when AI continues to evolve and where humans need to recalibrate to stay relevant and thrive alongside intelligent systems.",
    fullDescription: null,
    tag: "POV",
    readTime: "8 min read",
    imageGradient: "from-purple-600 to-purple-400",
    status: "published",
    date: "Aug 5, 2025"
  },
  {
    id: "2", 
    title: "Human-of-the-Gaps",
    description: "What makes us human when AI can increasingly complete more of our 'uniquely human tasks'?",
    fullDescription: null,
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400", 
    status: "published",
    date: "Aug 7, 2025"
  },
  {
    id: "3",
    title: "Families Are The Root of Inequality",
    description: "Equality of opportunity is impossible when resources accumulate within family lines.",
    fullDescription: null,
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400",
    status: "published",
    date: "Aug 8, 2025"
  },
  {
    id: "4",
    title: "Democracy's Last Voter",
    description: "A future scenario where manual voting becomes obsolete, leaving one person standing alone at the polling station while digital systems take over democratic participation.",
    fullDescription: null,
    tag: "Scenario",
    readTime: "6 min read",
    imageGradient: "from-orange-600 to-orange-400", 
    status: "published",
    date: "Aug 9, 2025"
  },
  {
    id: "5-v2",
    title: "Regulation Through Code, Not Policy",
    description: "As AI agents interact within spaces, these locations should have rules as limitations, similar to countries.",
    fullDescription: null,
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400",
    status: "published",
    date: "Aug 15, 2025",
    stackedOn: "5",
    version: "2.0",
    edit: "I recently read about 'Constitutional AI' concept from Anthropic, and it really resonates with me."
  },
  {
    id: "6",
    title: "Social Web | Digital Gardens | Cozy Webs",
    description: "Social web is an editor's curated menu of trending dishes. Digital gardens are curated dinner parties. Cozy webs are the after-party conversations that last until 4 a.m. One feeds the brain, one feeds the heart, one feeds the soul.",
    fullDescription: null,
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400",
    status: "published",
    date: "Aug 10, 2025"
  },
  {
    id: "7",
    title: "Mind Your Manners, Human",
    description: "The AI Babysitter\nEmployee Courtesy Score\nThe Rudeness Penalty\nMy AI God-Parent",
    fullDescription: null,
    tag: "Scenario",
    readTime: "4 min read",
    imageGradient: "from-orange-600 to-orange-400",
    status: "wip",
    date: "Aug 11, 2025"
  },
  {
    id: "8",
    title: "AI Tolerances for Type I & II Errors",
    description: "The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).",
    fullDescription: "The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).\n\nOptimists see missed breakthroughs as moral failures—every delayed cure costs lives. Pessimists see rushed deployments as existential risks—one bad AI launch undermines decades of progress.\n\nShort-term, reversible decisions favour Type 1 tolerance (try fast, fail fast). Long-term, irreversible ones favour Type 2 tolerance (genetic modifications, climate interventions can't be easily undone).\n\nThe question isn't which error type to avoid, but developing better mechanisms to adjust our tolerance based on context, stakes, and reversibility.",
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400",
    status: "published",
    date: "Aug 13, 2025"
  },
  {
    id: "9",
    title: "We Need to Defend Flow for Meaning",
    description: "What if flow is one of the deepest sources of human meaning—that sweet spot where challenges match your skills? Too easy and you're bored, too hard and you're anxious.",
    fullDescription: "What if flow is one of the deepest sources of human meaning—that sweet spot where challenges match your skills? Too easy and you're bored, too hard and you're anxious.\n\nAI promises to reduce complexity and improve our lives. But it may just as easily generate problems so intricate that we need AI to guide us through them. We risk shifting into intern mode—not leveraging technology, but being leveraged by it.\n\nThe flow window is shrinking. More and more, tasks are either trivial (repetitive work AI completes instantly) or out of reach (complex work where AI is the only true expert in the room).\n\nIn that narrowing gap, human meaning becomes harder to find.",
    tag: "Thought Bite",
    readTime: "2 min read",
    imageGradient: "from-teal-600 to-teal-400",
    status: "published",
    date: "Aug 15, 2025"
  }
];