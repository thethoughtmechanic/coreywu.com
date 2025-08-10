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
    timeframe: "Jun-Jul '25 (2 months)",
    collaborators: ["@kennyfung"],
    technologies: ["Node.js", "TensorFlow", "AWS Lambda"],
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
    technologies: ["Python", "LangChain", "React", "Figma"],
    isActive: true
  }
];