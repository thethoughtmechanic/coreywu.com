import { Experiment } from "@shared/schema";

export const experiments: Experiment[] = [
  {
    id: "prompt-pulse-1",
    title: "Prompt Pulse",
    description: "Automate AI Prompt Monitoring and Get Notified When It Matters",
    status: "sunset",
    collaborationType: "collaboration",
    problemType: "Horizontal", 
    imageGradient: "from-muted-grey to-soft-black",
    timeframe: "Jun-Jul '25",
    collaborators: ["@kennyfung"],
    isActive: false
  },
  {
    id: "boyfriend-material-1",
    title: "Boyfriend Material",
    description: "AI-powered relationship insights and chat, rooted in your shared memories",
    status: "wip",
    collaborationType: "solo",
    problemType: "Vertical",
    imageGradient: "from-yellow-200 to-yellow-600",
    timeframe: "Jul '25 - Present",
    collaborators: [],
    isActive: true
  }
];