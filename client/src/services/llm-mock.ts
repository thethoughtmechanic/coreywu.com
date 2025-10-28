// Mock LLM service - Replace with real API integration (Claude/GPT) later
import type { 
  ExpertPersona, 
  Signal, 
  ExpertEvaluation, 
  Tension, 
  FutureScenario, 
  Opportunity 
} from "@/types/foresight";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateExperts(topic: string, count: number): Promise<ExpertPersona[]> {
  await delay(2000);
  
  const expertTemplates = [
    {
      name: "Dr. Sarah Chen",
      role: "Technology Futurist",
      perspective: "Optimistic technologist who sees innovation as the solution to most challenges",
      biases: ["Technology solutionism", "Innovation bias"],
      expertise: ["Emerging tech", "Digital transformation", "AI ethics"],
      color: "#3B82F6"
    },
    {
      name: "Marcus Rodriguez",
      role: "Social Systems Analyst",
      perspective: "Critical thinker focused on equity, justice, and systemic impacts",
      biases: ["Skepticism of rapid change", "Equity-focused"],
      expertise: ["Social justice", "Community impact", "Policy analysis"],
      color: "#8B5CF6"
    },
    {
      name: "Aisha Patel",
      role: "Environmental Strategist",
      perspective: "Sustainability-first advocate concerned with ecological boundaries",
      biases: ["Environmental determinism", "Degrowth advocacy"],
      expertise: ["Climate science", "Circular economy", "Regenerative systems"],
      color: "#10B981"
    },
    {
      name: "James O'Connor",
      role: "Economic Pragmatist",
      perspective: "Market-oriented analyst focused on viability and scalability",
      biases: ["Market efficiency belief", "Growth imperative"],
      expertise: ["Market dynamics", "Business models", "Financial systems"],
      color: "#F59E0B"
    },
    {
      name: "Dr. Yuki Tanaka",
      role: "Cultural Anthropologist",
      perspective: "Human-centered researcher examining cultural and behavioral shifts",
      biases: ["Cultural relativism", "Tradition preservation"],
      expertise: ["Human behavior", "Cultural evolution", "Identity formation"],
      color: "#EC4899"
    },
    {
      name: "Alex Kowalski",
      role: "Systems Designer",
      perspective: "Complexity thinker who sees interconnections and emergent properties",
      biases: ["Systems thinking bias", "Emergence optimism"],
      expertise: ["Complex systems", "Network effects", "Emergent behavior"],
      color: "#06B6D4"
    }
  ];

  return expertTemplates.slice(0, count).map((template, index) => ({
    ...template,
    id: `expert-${index + 1}`
  }));
}

export async function scanSignals(topic: string, experts: ExpertPersona[]): Promise<Signal[]> {
  await delay(3000);
  
  const signalTemplates = [
    {
      title: "Widespread Adoption of AI Copilots",
      description: "Major platforms integrating AI assistants across productivity tools, changing how people work",
      source: "Tech industry analysis",
      category: "technology" as const
    },
    {
      title: "4-Day Work Week Experiments",
      description: "Multiple countries and companies testing reduced work hours with maintained productivity",
      source: "Labor research studies",
      category: "social" as const
    },
    {
      title: "Remote-First Legislation",
      description: "Governments creating new frameworks for digital nomadism and remote work taxation",
      source: "Policy analysis",
      category: "political" as const
    },
    {
      title: "Virtual Office Platforms",
      description: "Immersive VR/AR spaces becoming standard for distributed teams",
      source: "Market analysis",
      category: "technology" as const
    },
    {
      title: "Mental Health Crisis in Remote Workers",
      description: "Rising reports of isolation, burnout, and boundary issues among remote employees",
      source: "Healthcare reports",
      category: "social" as const
    },
    {
      title: "Carbon Impact of Digital Infrastructure",
      description: "Growing awareness of energy consumption from cloud computing and video calls",
      source: "Environmental studies",
      category: "environmental" as const
    }
  ];

  return signalTemplates.map((template, index) => ({
    ...template,
    id: `signal-${index + 1}`,
    discoveredBy: experts[index % experts.length].id,
    relevanceScore: Math.floor(Math.random() * 30) + 70
  }));
}

export async function evaluateSignals(
  signals: Signal[], 
  experts: ExpertPersona[]
): Promise<ExpertEvaluation[]> {
  await delay(2500);
  
  const evaluations: ExpertEvaluation[] = [];
  
  signals.forEach(signal => {
    const otherExperts = experts.filter(e => e.id !== signal.discoveredBy);
    const numEvaluators = Math.min(2, otherExperts.length);
    
    for (let i = 0; i < numEvaluators; i++) {
      const expert = otherExperts[i];
      evaluations.push({
        expertId: expert.id,
        expertName: expert.name,
        signalId: signal.id,
        confidenceScore: Math.floor(Math.random() * 40) + 50,
        critique: `${expert.name}'s perspective on ${signal.title}: ${expert.perspective}`,
        supportingEvidence: "Evidence supporting this signal...",
        challenges: "Challenges and counterpoints..."
      });
    }
  });
  
  return evaluations;
}

export async function extractTensions(
  signals: Signal[],
  evaluations: ExpertEvaluation[],
  experts: ExpertPersona[]
): Promise<Tension[]> {
  await delay(2000);
  
  const tensions: Tension[] = [
    {
      id: "tension-1",
      title: "Freedom vs. Isolation",
      description: "The tension between individual autonomy in remote work and human need for connection",
      expertsPro: [experts[0]?.id, experts[3]?.id].filter(Boolean),
      expertsCon: [experts[1]?.id, experts[4]?.id].filter(Boolean),
      signalsInvolved: [signals[1]?.id, signals[4]?.id].filter(Boolean),
      intensity: 85
    },
    {
      id: "tension-2",
      title: "Efficiency vs. Sustainability",
      description: "Digital infrastructure growth creating environmental impact despite efficiency gains",
      expertsPro: [experts[0]?.id, experts[3]?.id].filter(Boolean),
      expertsCon: [experts[2]?.id].filter(Boolean),
      signalsInvolved: [signals[0]?.id, signals[5]?.id].filter(Boolean),
      intensity: 72
    },
    {
      id: "tension-3",
      title: "Productivity vs. Well-being",
      description: "Pressure for constant availability vs. need for work-life boundaries",
      expertsPro: [experts[3]?.id].filter(Boolean),
      expertsCon: [experts[1]?.id, experts[4]?.id].filter(Boolean),
      signalsInvolved: [signals[1]?.id, signals[4]?.id].filter(Boolean),
      intensity: 78
    }
  ];
  
  return tensions;
}

export async function buildScenarios(
  topic: string,
  tensions: Tension[],
  timeHorizon: number
): Promise<FutureScenario[]> {
  await delay(3000);
  
  const scenarios: FutureScenario[] = [
    {
      id: "scenario-1",
      title: "Hyperconnected Nomads",
      tagline: "Work from anywhere, belong everywhere",
      year: timeHorizon,
      narrative: `By ${timeHorizon}, the digital infrastructure has evolved to seamlessly support a globally distributed workforce. Advanced VR/AR technologies create immersive collaboration spaces that rival physical presence. Digital nomadism is normalized with streamlined international frameworks for taxation and healthcare. However, this freedom comes with new challenges around identity, belonging, and digital equity.`,
      keyDrivers: [
        "Mature VR/AR collaboration platforms",
        "International digital nomad frameworks",
        "5G/6G universal coverage",
        "Portable benefits and healthcare"
      ],
      tensions: tensions.slice(0, 2).map(t => t.id),
      probability: 35,
      desirability: 70
    },
    {
      id: "scenario-2",
      title: "The Great Re-Localization",
      tagline: "Communities reimagined, cities transformed",
      year: timeHorizon,
      narrative: `The remote work revolution catalyzes a mass migration from mega-cities to smaller communities. People prioritize quality of life, affordability, and connection to place. Urban centers transform into innovation hubs visited periodically while residential areas become vibrant, self-sufficient ecosystems. Local economies flourish but global collaboration becomes more challenging.`,
      keyDrivers: [
        "Urban exodus accelerates",
        "Rural broadband universal",
        "Local governance innovation",
        "Hybrid work becomes permanent"
      ],
      tensions: [tensions[0]?.id, tensions[2]?.id].filter(Boolean),
      probability: 40,
      desirability: 65
    },
    {
      id: "scenario-3",
      title: "Corporate Metaverses",
      tagline: "Your company, your world",
      year: timeHorizon,
      narrative: `Large corporations create proprietary virtual worlds that serve as both workspaces and social hubs. Employees 'clock in' to richly designed digital environments with gamified productivity systems. While these metaverses offer unprecedented flexibility and engagement, they also create new forms of corporate control and surveillance. Work-life boundaries effectively dissolve.`,
      keyDrivers: [
        "Corporate investment in metaverse platforms",
        "Sophisticated monitoring systems",
        "Gamification of all work",
        "Digital wellbeing crisis"
      ],
      tensions: [tensions[0]?.id, tensions[2]?.id].filter(Boolean),
      probability: 25,
      desirability: 40
    },
    {
      id: "scenario-4",
      title: "Regulated Balance",
      tagline: "Policy-driven equilibrium",
      year: timeHorizon,
      narrative: `Governments and unions establish strong frameworks regulating remote work to prevent exploitation and ensure wellbeing. Mandatory offline hours, 'right to disconnect' laws, and required in-person collaboration time create a carefully balanced hybrid model. Innovation slows but social cohesion and mental health metrics improve. Companies adapt to more structured remote work environments.`,
      keyDrivers: [
        "Strong labor protections",
        "Right to disconnect laws",
        "Mandatory hybrid schedules",
        "Focus on wellbeing over productivity"
      ],
      tensions: tensions.map(t => t.id),
      probability: 30,
      desirability: 75
    }
  ];
  
  return scenarios;
}

export async function identifyOpportunities(
  scenarios: FutureScenario[]
): Promise<Opportunity[]> {
  await delay(2000);
  
  const opportunities: Opportunity[] = [
    {
      id: "opp-1",
      title: "Digital Nomad Infrastructure Platform",
      description: "Build an integrated platform handling visas, healthcare, banking, and community connections for remote workers globally",
      scenario: scenarios[0]?.id || "",
      actionableSteps: [
        "Partner with governments on digital nomad visas",
        "Integrate with international healthcare providers",
        "Create community matching algorithm",
        "Develop portable benefits system"
      ],
      implementationTriggers: [
        "3+ countries adopt digital nomad frameworks",
        "Remote work exceeds 50% of knowledge workers",
        "User acquisition cost drops below $50"
      ],
      timeframe: "medium-term",
      impactPotential: 85,
      feasibility: 70
    },
    {
      id: "opp-2",
      title: "Reimagined Co-Working Networks",
      description: "Create community-centered spaces that blend work, social connection, and local engagement in smaller cities",
      scenario: scenarios[1]?.id || "",
      actionableSteps: [
        "Identify migration destination cities",
        "Design community-first spaces",
        "Partner with local governments",
        "Build membership model with local perks"
      ],
      implementationTriggers: [
        "Urban rent prices exceed regional costs by 200%+",
        "Local governments offer relocation incentives",
        "Remote work permanence confirmed by major employers"
      ],
      timeframe: "short-term",
      impactPotential: 75,
      feasibility: 85
    },
    {
      id: "opp-3",
      title: "Virtual Collaboration Therapy",
      description: "Consulting service helping organizations design humane, effective remote/hybrid cultures",
      scenario: scenarios[2]?.id || "",
      actionableSteps: [
        "Develop assessment frameworks",
        "Train consultants in digital wellbeing",
        "Create implementation playbooks",
        "Build measurement tools"
      ],
      implementationTriggers: [
        "Mental health crisis reaches critical mass",
        "Companies face retention crisis",
        "Regulations require wellbeing audits"
      ],
      timeframe: "immediate",
      impactPotential: 70,
      feasibility: 90
    },
    {
      id: "opp-4",
      title: "Policy Innovation Lab",
      description: "Think tank developing and piloting 'right to disconnect' and hybrid work frameworks for governments",
      scenario: scenarios[3]?.id || "",
      actionableSteps: [
        "Research best practices globally",
        "Run pilot programs with progressive cities",
        "Build policy templates and toolkits",
        "Create measurement frameworks"
      ],
      implementationTriggers: [
        "Labor unions demand regulation",
        "Wellbeing crisis drives political pressure",
        "Early-adopter policies show success"
      ],
      timeframe: "medium-term",
      impactPotential: 90,
      feasibility: 60
    }
  ];
  
  return opportunities;
}

export async function generateReport(
  topic: string,
  experts: ExpertPersona[],
  signals: Signal[],
  evaluations: ExpertEvaluation[],
  tensions: Tension[],
  scenarios: FutureScenario[],
  opportunities: Opportunity[]
): Promise<string> {
  await delay(1500);
  
  return `
# Future Scenarios Analysis: ${topic}

## Executive Summary

This strategic foresight analysis examined "${topic}" through the perspectives of ${experts.length} diverse expert personas. Through multi-agent scanning, we identified ${signals.length} key signals, extracted ${tensions.length} core tensions, and developed ${scenarios.length} distinct future scenarios.

### Key Insights:

1. **Cognitive Diversity Revealed**: Our expert committee surfaced critical blind spots through productive disagreement, particularly around the tension between efficiency and wellbeing.

2. **Core Tensions**: The primary tensions shaping this space are:
${tensions.map(t => `   - ${t.title}: ${t.description}`).join('\n')}

3. **Scenario Landscape**: Four plausible futures emerged, ranging from radical decentralization to strong regulatory frameworks. No single scenario dominates probability.

4. **Strategic Opportunities**: ${opportunities.length} high-potential opportunities identified, with implementation triggers clearly defined.

### Recommended Next Steps:

1. **Immediate**: ${opportunities.find(o => o.timeframe === 'immediate')?.title || 'Monitor key signals'}
2. **Short-term (6-18 months)**: ${opportunities.find(o => o.timeframe === 'short-term')?.title || 'Develop strategy'}
3. **Medium-term (2-3 years)**: ${opportunities.find(o => o.timeframe === 'medium-term')?.title || 'Position for scenarios'}

---

*Generated by Future Scenarios Debate Arena*
*Date: ${new Date().toLocaleDateString()}*
`;
}
