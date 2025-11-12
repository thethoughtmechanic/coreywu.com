import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Check, TrendingUp, Eye, HelpCircle, Target, Bell, Download, Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

const noRegretActions = [
  {
    id: 1,
    title: 'Build Verification Networks',
    description: 'Create trusted circles for reality checking',
    details: [
      'Inner circle: 5-8 people you verify face-to-face',
      'Middle circle: 20-40 strong ties vouched personally',
      'Outer circle: 100-200 with provenance chains',
      'Cross-domain bridges to different reality bubbles'
    ],
    howToStart: 'Map your current network and identify trust gaps',
    timeline: 'Start now, build over 6-12 months'
  },
  {
    id: 2,
    title: 'Develop Analog Skills',
    description: 'Maintain tangible connection to reality',
    details: [
      'At least one physical practice/hobby (photography, woodworking, cooking)',
      'Maintain one deeply-known physical place',
      'Regular digital detox protocols',
      'Physical journaling practice'
    ],
    howToStart: 'Choose one analog skill to develop this month',
    timeline: 'Ongoing practice, lifelong skill'
  },
  {
    id: 3,
    title: 'Psychological Preparation',
    description: 'Build resilience for epistemic uncertainty',
    details: [
      'Daily meditation/mindfulness practice (70% of Gen Z already doing this)',
      'Uncertainty tolerance training',
      'Meaning-making beyond verification',
      'Reality anxiety management techniques'
    ],
    howToStart: 'Start with 5 minutes daily meditation',
    timeline: '3-6 months to establish habit'
  },
  {
    id: 4,
    title: 'Generational Integration',
    description: 'Learn from digital natives',
    details: [
      'Hire Gen Z/Alpha advisors NOW',
      'Reverse mentorship programs',
      'Cross-generational project teams',
      'Cultural translation capacity'
    ],
    howToStart: 'Identify one Gen Z person to learn from',
    timeline: 'Immediate start, ongoing relationship'
  },
  {
    id: 5,
    title: 'Portfolio Strategy',
    description: 'Prepare for multiple scenarios',
    details: [
      'Build capabilities for 3-4 scenarios simultaneously',
      'Monitor signals across domains',
      'Rapid pivot capacity',
      'Partnerships across different paradigms'
    ],
    howToStart: 'Run scenario planning workshop with your team',
    timeline: '1-3 months to develop initial portfolio'
  }
];

const smartBets = [
  {
    category: 'Professional Bets',
    options: [
      { name: 'Train as Reality Auditor', probability: 35, investment: 'High', timeline: '2-3 years' },
      { name: 'Specialize in analog verification', probability: 30, investment: 'Medium', timeline: '1-2 years' },
      { name: 'Build provenance infrastructure', probability: 25, investment: 'High', timeline: '3-5 years' },
      { name: 'Reality layer architecture', probability: 40, investment: 'Medium', timeline: '1-2 years' }
    ]
  },
  {
    category: 'Organizational Bets',
    options: [
      { name: 'Invest in verification tech', probability: 30, investment: 'High', timeline: '3-5 years' },
      { name: 'Build discipline infrastructure', probability: 35, investment: 'High', timeline: '2-4 years' },
      { name: 'Community epistemology', probability: 40, investment: 'Medium', timeline: '1-3 years' },
      { name: 'Therapeutic services', probability: 45, investment: 'Medium', timeline: '1-2 years' }
    ]
  },
  {
    category: 'Regional Bets',
    options: [
      { name: 'Europe: Regulation approach', probability: 50, investment: 'Medium', timeline: '2-4 years' },
      { name: 'US: Market fragmentation', probability: 60, investment: 'High', timeline: '1-3 years' },
      { name: 'China: State control', probability: 70, investment: 'High', timeline: '1-2 years' },
      { name: 'Global South: Radical adaptation', probability: 40, investment: 'Medium', timeline: '2-5 years' }
    ]
  }
];

const monitoringSignals = [
  {
    category: 'Economic Signals',
    signals: [
      {
        name: 'Verification Cost Ratio',
        current: '100:1',
        threshold: '>1000:1 = collapse likely, <10:1 = consolidation',
        updateFrequency: 'Quarterly'
      },
      {
        name: 'Industry Funding Levels',
        current: '$2.3B in verification startups',
        threshold: '>$10B = institutional commitment',
        updateFrequency: 'Quarterly'
      },
      {
        name: 'Reality Auditor Job Postings',
        current: '5,000 globally',
        threshold: '>50,000 = professionalization',
        updateFrequency: 'Monthly'
      }
    ]
  },
  {
    category: 'Generational Signals',
    signals: [
      {
        name: 'Gen Z Leadership Share',
        current: '~15% of decision-makers',
        threshold: '>30% = cultural shift accelerates',
        updateFrequency: 'Annual'
      },
      {
        name: 'Reality Anxiety Prevalence',
        current: '65% of Gen Z reports symptoms',
        threshold: '>75% = therapeutic turn dominant',
        updateFrequency: 'Quarterly'
      }
    ]
  },
  {
    category: 'Technical Signals',
    signals: [
      {
        name: 'Detection Capability Gap',
        current: '30% accuracy on deepfake detection',
        threshold: '>90% = tech salvation viable',
        updateFrequency: 'Monthly'
      },
      {
        name: 'Blockchain Adoption',
        current: 'Early stage provenance pilots',
        threshold: '>1M daily active users = mainstream',
        updateFrequency: 'Quarterly'
      }
    ]
  },
  {
    category: 'Regulatory Signals',
    signals: [
      {
        name: 'International Coordination',
        current: 'Fragmented national approaches',
        threshold: '3+ major powers align = discipline path',
        updateFrequency: 'Quarterly'
      },
      {
        name: 'AI Content Restrictions',
        current: 'Voluntary labeling only',
        threshold: 'Mandatory limits = constraint regime',
        updateFrequency: 'Quarterly'
      }
    ]
  }
];

const bigQuestions = [
  {
    question: 'Scale vs. Trust',
    description: 'Can verification work at billions of people/pieces? Or is trust only possible in small networks?',
    positions: ['Small Networks Only', 'Can Scale', 'Hybrid Approach', 'Unsure']
  },
  {
    question: 'Freedom vs. Order',
    description: 'Does verification require constraining speech? Or can it emerge from voluntary cooperation?',
    positions: ['Constraints Needed', 'Freedom Works', 'Depends on Context', 'Unsure']
  },
  {
    question: 'Technology vs. Humanity',
    description: 'Is this a technical problem with technical solutions? Or a human problem requiring cultural adaptation?',
    positions: ['Tech Solution', 'Cultural Shift', 'Both Required', 'Neither Works']
  },
  {
    question: 'Equality vs. Efficiency',
    description: 'Can everyone afford verification? Or does it create two-tier society?',
    positions: ['Must Be Universal', 'Inequality Inevitable', 'Market Will Solve', 'Unsure']
  },
  {
    question: 'Truth vs. Vibes',
    description: 'Do humans need factual accuracy? Or is emotional coherence sufficient?',
    positions: ['Truth Matters', 'Vibes Enough', 'Depends on Domain', 'Unsure']
  }
];

export default function PostTruthAct() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<Record<number, string>>({});
  const [checkedActions, setCheckedActions] = useState<Set<number>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAction = (id: number) => {
    const newChecked = new Set(checkedActions);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedActions(newChecked);
  };

  return (
    <div className="fixed inset-0 bg-black text-gray-100 overflow-y-auto">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Breadcrumb />
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded hover:bg-gray-900"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <GlobalMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Back Button - Always Visible */}
      <div className="fixed top-[73px] left-8 z-30">
        <BackButton />
      </div>

      {/* Hero */}
      <div className="border-b border-gray-800 px-6 py-12 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Now What?</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Translate research into action. Four strategic perspectives to navigate post-truth futures.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="px-4 py-2 bg-gray-900 rounded-full border border-gray-800">
              <span className="text-cyan-400 font-semibold">{checkedActions.size}</span>
              <span className="text-gray-500 ml-2">actions taken</span>
            </div>
            <div className="px-4 py-2 bg-gray-900 rounded-full border border-gray-800">
              <span className="text-cyan-400 font-semibold">{Object.keys(selectedPositions).length}</span>
              <span className="text-gray-500 ml-2">positions chosen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Four Quadrants Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quadrant 1: No-Regret Actions */}
          <div 
            className="border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors cursor-pointer"
            onClick={() => setActiveQuadrant(activeQuadrant === 'no-regret' ? null : 'no-regret')}
          >
            <div className="p-6 bg-gradient-to-br from-green-900/20 to-green-950/20">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-green-400" size={32} />
                <h2 className="text-2xl font-bold">No-Regret Actions</h2>
              </div>
              <p className="text-gray-400">Actions valuable across ALL scenarios</p>
              <div className="mt-4 text-3xl font-bold text-green-400">
                {noRegretActions.length} Actions
              </div>
            </div>
          </div>

          {/* Quadrant 2: Smart Bets */}
          <div 
            className="border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors cursor-pointer"
            onClick={() => setActiveQuadrant(activeQuadrant === 'smart-bets' ? null : 'smart-bets')}
          >
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-950/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-blue-400" size={32} />
                <h2 className="text-2xl font-bold">Smart Bets</h2>
              </div>
              <p className="text-gray-400">Higher risk, higher reward—choose your lane</p>
              <div className="mt-4 text-3xl font-bold text-blue-400">
                {smartBets.length} Categories
              </div>
            </div>
          </div>

          {/* Quadrant 3: Monitor These */}
          <div 
            className="border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors cursor-pointer"
            onClick={() => setActiveQuadrant(activeQuadrant === 'monitor' ? null : 'monitor')}
          >
            <div className="p-6 bg-gradient-to-br from-orange-900/20 to-orange-950/20">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="text-orange-400" size={32} />
                <h2 className="text-2xl font-bold">Monitor These</h2>
              </div>
              <p className="text-gray-400">Critical tipping points that signal which future is emerging</p>
              <div className="mt-4 text-3xl font-bold text-orange-400">
                {monitoringSignals.reduce((acc, cat) => acc + cat.signals.length, 0)} Signals
              </div>
            </div>
          </div>

          {/* Quadrant 4: Big Questions */}
          <div 
            className="border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors cursor-pointer"
            onClick={() => setActiveQuadrant(activeQuadrant === 'big-questions' ? null : 'big-questions')}
          >
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-950/20">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="text-purple-400" size={32} />
                <h2 className="text-2xl font-bold">Big Questions</h2>
              </div>
              <p className="text-gray-400">Tensions without resolution—choose your position</p>
              <div className="mt-4 text-3xl font-bold text-purple-400">
                {bigQuestions.length} Questions
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Quadrant Content */}
        {activeQuadrant && (
          <div className="mt-6 border border-cyan-500 rounded-lg bg-gray-950 p-8">
            <button
              onClick={() => setActiveQuadrant(null)}
              className="float-right text-gray-500 hover:text-gray-300"
            >
              Close ✕
            </button>

            {/* No-Regret Actions Content */}
            {activeQuadrant === 'no-regret' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-green-400">No-Regret Actions</h2>
                <p className="text-gray-400 mb-8">
                  These actions are valuable regardless of which future emerges. Start here.
                </p>
                
                <div className="space-y-4">
                  {noRegretActions.map((action) => (
                    <div 
                      key={action.id}
                      className="border border-gray-800 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-6 bg-gray-900 cursor-pointer hover:bg-gray-850 transition-colors"
                        onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAction(action.id);
                            }}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              checkedActions.has(action.id)
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-600 hover:border-green-500'
                            }`}
                          >
                            {checkedActions.has(action.id) && <Check size={16} className="text-black" />}
                          </button>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                            <p className="text-gray-400">{action.description}</p>
                            {expandedAction === action.id && (
                              <div className="mt-4 space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2 text-green-400">Details:</h4>
                                  <ul className="space-y-2">
                                    {action.details.map((detail, i) => (
                                      <li key={i} className="text-gray-300 flex gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="p-3 bg-gray-950 rounded border border-gray-800">
                                    <div className="text-sm text-gray-500 mb-1">How to Start</div>
                                    <div className="text-gray-300">{action.howToStart}</div>
                                  </div>
                                  <div className="p-3 bg-gray-950 rounded border border-gray-800">
                                    <div className="text-sm text-gray-500 mb-1">Timeline</div>
                                    <div className="text-gray-300">{action.timeline}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-green-900/10 border border-green-800 rounded-lg">
                  <h3 className="font-bold mb-2 text-green-400">✓ Next Step</h3>
                  <p className="text-gray-300">
                    Pick ONE action to start this week. Don't try to do all five at once. Build momentum through small wins.
                  </p>
                </div>
              </div>
            )}

            {/* Smart Bets Content */}
            {activeQuadrant === 'smart-bets' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">Smart Bets</h2>
                <p className="text-gray-400 mb-8">
                  Choose 1-2 based on your context. These are higher risk but higher potential reward.
                </p>
                
                <div className="space-y-8">
                  {smartBets.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                      <div className="space-y-3">
                        {category.options.map((option, i) => (
                          <div 
                            key={i}
                            className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-lg">{option.name}</span>
                              <span className="text-sm px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                                {option.probability}% likely
                              </span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-400">
                              <span>Investment: <span className="text-gray-300">{option.investment}</span></span>
                              <span>•</span>
                              <span>Timeline: <span className="text-gray-300">{option.timeline}</span></span>
                            </div>
                            <div className="mt-3 h-1 bg-gray-800 rounded-full">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${option.probability}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-900/10 border border-blue-800 rounded-lg">
                  <h3 className="font-bold mb-2 text-blue-400">⚠️ Risk Notice</h3>
                  <p className="text-gray-300">
                    These bets assume specific scenarios emerge. If you're wrong, you'll need pivot strategies. Build optionality.
                  </p>
                </div>
              </div>
            )}

            {/* Monitor These Content */}
            {activeQuadrant === 'monitor' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-orange-400">Monitor These Signals</h2>
                <p className="text-gray-400 mb-8">
                  Watch these thresholds—they predict which future is emerging.
                </p>
                
                <div className="space-y-8">
                  {monitoringSignals.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Bell className="text-orange-400" size={20} />
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.signals.map((signal, i) => (
                          <div 
                            key={i}
                            className="p-4 bg-gray-900 rounded-lg border border-gray-800"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg">{signal.name}</h4>
                              <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                                {signal.updateFrequency}
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-500">Current: </span>
                                <span className="text-gray-300 font-mono">{signal.current}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Threshold: </span>
                                <span className="text-gray-300">{signal.threshold}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Bell size={20} />
                    Set Up Alerts
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download size={20} />
                    Download Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* Big Questions Content */}
            {activeQuadrant === 'big-questions' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-purple-400">Big Questions</h2>
                <p className="text-gray-400 mb-8">
                  These tensions won't be resolved—they define the terrain. Where do you stand?
                </p>
                
                <div className="space-y-6">
                  {bigQuestions.map((question, idx) => (
                    <div 
                      key={idx}
                      className="p-6 bg-gray-900 rounded-lg border border-gray-800"
                    >
                      <h3 className="text-xl font-bold mb-2">{question.question}</h3>
                      <p className="text-gray-400 mb-4">{question.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {question.positions.map((position, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedPositions({
                                ...selectedPositions,
                                [idx]: position
                              });
                            }}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedPositions[idx] === position
                                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                                : 'border-gray-700 hover:border-gray-600 text-gray-400'
                            }`}
                          >
                            {position}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {Object.keys(selectedPositions).length === bigQuestions.length && (
                  <div className="mt-8 p-6 bg-purple-900/10 border border-purple-800 rounded-lg">
                    <h3 className="font-bold mb-3 text-purple-400">Your Worldview Profile</h3>
                    <p className="text-gray-300 mb-4">
                      Based on your positions, you lean toward: <span className="text-cyan-400 font-semibold">[Worldview Analysis]</span>
                    </p>
                    <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-black font-semibold rounded-lg transition-colors">
                      See Recommended Strategy
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-gray-800 mt-12 px-6 py-12 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Go Deeper?</h2>
          <p className="text-gray-400 text-lg">
            Explore the full research across 8 methodologies and 60+ scenarios
          </p>
          <Link href="/post-truth/explore">
            <a className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors text-lg">
              Explore the Research
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
