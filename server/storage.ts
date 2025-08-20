
import { Experiment, Thought } from "@shared/schema";

export class Storage {
  private experiments = new Map<string, Experiment>();
  private thoughts = new Map<string, Thought>();

  constructor() {
    // Experiments
    const mockExperiments: Experiment[] = [
      {
        id: "4",
        title: "AI-Powered Code Review",
        description: "Machine learning system for automated code quality analysis",
        status: "build",
        collaborationType: "Collaboration",
        problemType: "Horizontal",
        imageGradient: "from-hoverBrown to-warmBrown",
        timeframe: "4 months",
        collaborators: ["ML Engineer", "UX Designer"],
        isActive: false
      },
      {
        id: "5",
        title: "Blockchain Identity Verification",
        description: "Decentralized identity management for secure authentication",
        status: "build",
        collaborationType: "Individual",
        problemType: "Horizontal",
        imageGradient: "from-mutedGrey via-warmBrown to-hoverBrown",
        timeframe: "5 months",
        collaborators: null,
        isActive: false
      },
      {
        id: "6",
        title: "IoT Home Automation",
        description: "Smart home ecosystem with predictive automation",
        status: "scale",
        collaborationType: "Collaboration",
        problemType: "Vertical",
        imageGradient: "from-activeGreen/20 via-warmBrown to-hoverBrown",
        timeframe: "7 months",
        collaborators: ["IoT Specialist", "Backend Dev"],
        isActive: true
      }
    ];

    // Thoughts
    const mockThoughts: Thought[] = [
      {
        id: "1",
        title: "Addressing The AI x Human Gap",
        description: "Exploring 3 critical human breakdowns when AI continues to evolve...",
        tag: "Technology",
        readTime: "8 min read",
        imageGradient: "from-warmBrown to-hoverBrown"
      }
    ];

    mockExperiments.forEach(experiment => this.experiments.set(experiment.id, experiment));
    mockThoughts.forEach(thought => this.thoughts.set(thought.id, thought));
  }

  // Experiments
  getExperiments(): Experiment[] {
    return Array.from(this.experiments.values());
  }

  getExperiment(id: string): Experiment | undefined {
    return this.experiments.get(id);
  }

  createExperiment(experiment: Omit<Experiment, 'id'>): Experiment {
    const id = Date.now().toString();
    const newExperiment = { ...experiment, id };
    this.experiments.set(id, newExperiment);
    return newExperiment;
  }

  updateExperiment(id: string, experiment: Partial<Experiment>): Experiment | null {
    const existing = this.experiments.get(id);
    if (!existing) return null;
    
    const updated = { ...existing, ...experiment };
    this.experiments.set(id, updated);
    return updated;
  }

  deleteExperiment(id: string): boolean {
    return this.experiments.delete(id);
  }

  // Thoughts
  getThoughts(): Thought[] {
    return Array.from(this.thoughts.values());
  }

  getThought(id: string): Thought | undefined {
    return this.thoughts.get(id);
  }

  createThought(thought: Omit<Thought, 'id'>): Thought {
    const id = Date.now().toString();
    const newThought = { ...thought, id };
    this.thoughts.set(id, newThought);
    return newThought;
  }

  updateThought(id: string, thought: Partial<Thought>): Thought | null {
    const existing = this.thoughts.get(id);
    if (!existing) return null;
    
    const updated = { ...existing, ...thought };
    this.thoughts.set(id, updated);
    return updated;
  }

  deleteThought(id: string): boolean {
    return this.thoughts.delete(id);
  }
}

export const storage = new Storage();
