// Data models for the Future Scenarios Debate Arena

export interface ExpertPersona {
  id: string;
  name: string;
  role: string;
  perspective: string;
  biases: string[];
  expertise: string[];
  color: string; // For UI visualization
}

export interface Signal {
  id: string;
  title: string;
  description: string;
  source: string;
  discoveredBy: string; // Expert ID
  relevanceScore: number;
  category: 'technology' | 'social' | 'economic' | 'environmental' | 'political';
}

export interface ExpertEvaluation {
  expertId: string;
  expertName: string;
  signalId: string;
  confidenceScore: number; // 0-100
  critique: string;
  supportingEvidence?: string;
  challenges?: string;
}

export interface Tension {
  id: string;
  title: string;
  description: string;
  expertsPro: string[]; // Expert IDs
  expertsCon: string[]; // Expert IDs
  signalsInvolved: string[]; // Signal IDs
  intensity: number; // 0-100
}

export interface FutureScenario {
  id: string;
  title: string;
  tagline: string;
  year: number; // e.g., 2030, 2035
  narrative: string;
  keyDrivers: string[];
  tensions: string[]; // Tension IDs
  probability: number; // 0-100
  desirability: number; // 0-100
  imagePrompt?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  scenario: string; // Scenario ID
  actionableSteps: string[];
  implementationTriggers: string[];
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  impactPotential: number; // 0-100
  feasibility: number; // 0-100
}

export interface Report {
  topic: string;
  timeHorizon: number;
  generatedAt: string;
  experts: ExpertPersona[];
  signals: Signal[];
  evaluations: ExpertEvaluation[];
  tensions: Tension[];
  scenarios: FutureScenario[];
  opportunities: Opportunity[];
  executiveSummary: string;
}

export type WorkflowStage = 
  | 'input' 
  | 'expert-generation' 
  | 'signal-scanning' 
  | 'cross-evaluation' 
  | 'world-building' 
  | 'opportunity-mapping' 
  | 'report';

export interface WorkflowState {
  currentStage: WorkflowStage;
  completedStages: WorkflowStage[];
  topic: string;
  timeHorizon: number;
  numExperts: number;
  isGenerating: boolean;
  report?: Partial<Report>;
}
