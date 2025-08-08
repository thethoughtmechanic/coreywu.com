
import { Experiment } from "@shared/schema";

export const experiments: Experiment[] = [
  {
    id: "1",
    title: "AI-Powered Content Curation",
    timeframe: "Aug '24 - Present",
    description: "Exploring machine learning techniques to automatically curate and recommend personalized content based on user behavior and preferences.",
    collaborators: ["@alexchen", "@sarahkim"],
    isActive: true,
    status: 'learn',
    collabType: 'collaboration',
    problemType: 'horizontal'
  },
  {
    id: "2",
    title: "Sustainable Web Architecture",
    timeframe: "Nov '24 - Present",
    description: "Researching and implementing energy-efficient web development practices to reduce carbon footprint of digital products.",
    collaborators: ["@greentech"],
    isActive: true,
    status: 'build',
    collabType: 'collaboration',
    problemType: 'vertical'
  },
  {
    id: "3",
    title: "Voice-First Design Patterns",
    timeframe: "Oct '24 - Present",
    description: "Investigating optimal interaction patterns for voice-controlled interfaces and their impact on accessibility.",
    collaborators: [],
    isActive: true,
    status: 'learn',
    collabType: 'individual',
    problemType: 'horizontal'
  },
  {
    id: "4",
    title: "Progressive Web App Optimization",
    timeframe: "Mar '24 - Jul '24",
    description: "Optimized loading performance and offline capabilities for web applications, achieving 90+ Lighthouse scores across all metrics.",
    collaborators: ["@devteam"],
    isActive: false,
    status: 'scale',
    collabType: 'collaboration',
    problemType: 'vertical'
  },
  {
    id: "5",
    title: "Micro-Interaction Animation Library",
    timeframe: "Jan '24 - Apr '24",
    description: "Created a lightweight CSS and JavaScript library for common UI micro-interactions to enhance user experience.",
    collaborators: ["@designsys", "@frontend"],
    isActive: false,
    status: 'build',
    collabType: 'collaboration',
    problemType: 'horizontal'
  },
  {
    id: "6",
    title: "Color Psychology in UI Design",
    timeframe: "Aug '23 - Dec '23",
    description: "Analyzed the impact of color choices on user behavior and conversion rates across different cultural contexts.",
    collaborators: ["@uxresearch", "@analytics"],
    isActive: false,
    status: 'scale',
    collabType: 'collaboration',
    problemType: 'horizontal'
  },
  {
    id: "7",
    title: "Collaborative Code Review Tool",
    timeframe: "May '23 - Aug '23",
    description: "Built a real-time collaborative platform for code reviews with integrated AI suggestions and team workflows.",
    collaborators: [],
    isActive: false,
    status: 'build',
    collabType: 'individual',
    problemType: 'vertical'
  }
];
