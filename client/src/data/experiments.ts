import { Experiment } from "@shared/schema";

export const experiments: Experiment[] = [
  {
    id: "prompt-pulse-1",
    title: "Prompt Pulse",
    description: "An automation tool for AI Prompt Monitoring that sends notifications when key metrics change.",
    status: "sunset",
    collaborationType: "collaboration",
    problemType: "horizontal",
    imageGradient: "from-muted-grey to-soft-black",
    timeframe: "Jun-Jul '25",
    collaborators: ["@kennyfung"],
    technologies: ["Perplexity + Gemini APIs", "Vector Embeddings", "Real-time Web Search", "PostgreSQL with Drizzle ORM", "TypeScript", "Node-cron Scheduling System"],
    isActive: false
  },
  {
    id: "boyfriend-material-1",
    title: "Boyfriend Material",
    description: "An AI-powered app that analyzes and visualizes relationship insights from shared memories to deepen connections.",
    status: "wip",
    collaborationType: "solo",
    problemType: "vertical",
    imageGradient: "from-yellow-200 to-yellow-600",
    timeframe: "Jul '25 - Present",
    collaborators: [],
    technologies: ["Dual RAG Architecture", "OpenAI + Gemini APIs", "Vector Embeddings + ChromaDB", "Zero-Knowledge Encryption", "React + TypeScript", "PostgreSQL + Drizzle ORM"],
    isActive: true
  }
];