import { useState } from 'react';
import { Menu, AlertTriangle, TrendingUp, TrendingDown, Zap, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

const h3Scenarios = [
  {
    id: '01',
    title: 'Cryptographic Truth',
    subtitle: 'Blockchain-Based Reality',
    years: '2033-2045',
    paradigm: 'Immutable verification infrastructure',
    color: '#00D9E8',
    borderColor: '#00D9E8',
    dominant: 'Universal Verification Ledger',
    keyFeatures: [
      'Reality Auditors as Gatekeepers',
      'Proof-of-Reality Mining',
      'Cryptographic Identity Standard',
      'Verification as Infrastructure'
    ],
    strengths: ['Secure', 'Transparent', 'Decentralized', 'Tamper-proof'],
    weaknesses: ['Expensive', 'Slow', 'Technical barrier', 'Energy intensive'],
    wildcard: 'Quantum computing breaks all cryptography, system collapses overnight',
    howWeGotHere: [
      'Blockchain verification (H2) proved reliable',
      'Governments adopted crypto standards',
      'Network effects locked in dominant ledger',
      'Generation raised with crypto-identity'
    ]
  },
  {
    id: '02',
    title: 'Analog Renaissance',
    subtitle: 'Pre-Digital Verification',
    years: '2033-2045',
    paradigm: 'Return to physical-first truth',
    color: '#FF8C00',
    borderColor: '#FF8C00',
    dominant: 'Physical Media Primacy',
    keyFeatures: [
      'Analog Specialists as Elite',
      'Paper-Based Legal System',
      'Film Photography Renaissance',
      'Physical Libraries as Power Centers'
    ],
    strengths: ['Proven', 'Accessible', 'Human-scale', 'Resilient'],
    weaknesses: ['Slow', 'Limited scale', 'Regressive', 'Stagnant'],
    wildcard: 'Decentralized tech makes censorship impossible, system collapses',
    howWeGotHere: [
      'Digital verification failed repeatedly',
      'Analog media (H2) proved more trustworthy',
      'Regulations mandated physical records',
      'Cultural shift toward tangible proof'
    ]
  },
  {
    id: '03',
    title: 'Reality Archipelago',
    subtitle: 'Fragmented Truth Ecosystems',
    years: '2033-2045',
    paradigm: 'Multiple valid realities, no convergence',
    color: '#FF00E5',
    borderColor: '#FF00E5',
    dominant: 'Reality Layer Infrastructure',
    keyFeatures: [
      'Reality Layer Architects as Top Profession',
      'Explicit reality zones (like time zones)',
      'Layer switching technology standard',
      'Cross-layer translation services'
    ],
    strengths: ['Freedom', 'Peace', 'Innovation', 'Authentic'],
    weaknesses: ['Coordination impossible', 'Inequality', 'Isolation', 'Vulnerability'],
    wildcard: 'External shock requires unified response, layers collapse',
    howWeGotHere: [
      'Reality pluralism (H2) gained acceptance',
      'Verification too expensive to sustain',
      'Communities gave up on convergence',
      'Technology made layers practical'
    ]
  },
  {
    id: '04',
    title: 'The Embodied Real',
    subtitle: 'Physical Grounding',
    years: '2033-2045',
    paradigm: 'Trust only the tangibly present',
    color: '#7B3FF2',
    borderColor: '#7B3FF2',
    dominant: 'Presence-Based Verification',
    keyFeatures: [
      'Presence Certifiers as Essential Workers',
      'Physical co-location required for trust',
      'Digital content presumed false',
      'In-person economy dominates'
    ],
    strengths: ['Grounded', 'Immediate', 'Embodied', 'Secure'],
    weaknesses: ['Exclusionary', 'Regressive', 'Inefficient', 'Unequal'],
    wildcard: 'Synthetic humans indistinguishable from real, embodiment fails',
    howWeGotHere: [
      'All digital verification (H2) failed',
      'Deepfake catastrophe (2029)',
      'Mass rejection of online world',
      'Regulations mandated physical proof'
    ]
  },
  {
    id: '05',
    title: 'The Great Surrender',
    subtitle: 'Post-Epistemological Society',
    years: '2033-2045',
    paradigm: 'Truth doesn\'t matter, only vibes',
    color: '#00FF94',
    borderColor: '#00FF94',
    dominant: 'Affective Consensus',
    keyFeatures: [
      'Experience Curators Replace Truth Seekers',
      'Emotional resonance over factual accuracy',
      '"Does it feel true?" as primary criterion',
      'Mythology replaces history'
    ],
    strengths: ['Peaceful', 'Creative', 'Liberating', 'Adaptive'],
    weaknesses: ['Dangerous', 'Irrational', 'Vulnerable', 'Nihilistic'],
    wildcard: 'Catastrophe requires factual coordination, system inadequate',
    howWeGotHere: [
      'All verification attempts (H2) failed',
      'Society exhausted from truth wars',
      'Younger generation never knew certainty',
      'Economics made verification impossible'
    ]
  }
];

const transitionMoments = [
  {
    period: '2025-2027',
    phase: 'H1 Crisis Acceleration',
    events: [
      'Major news orgs close',
      'Courts reject digital evidence',
      'Platform moderation collapses',
      'Public realizes verification failing'
    ]
  },
  {
    period: '2027-2029',
    phase: 'H2 Innovation Explosion',
    events: [
      'Thousands of verification experiments',
      'Professional standards emerge',
      'Business models tested',
      'Technology rapidly evolves'
    ]
  },
  {
    period: '2029-2031',
    phase: 'Selection Pressure',
    events: [
      'Major failures/successes',
      'Winning approaches clear',
      'Economic viability proven/disproven',
      'Regulation begins'
    ]
  },
  {
    period: '2031-2033',
    phase: 'H3 Emergence',
    events: [
      'Dominant system crystallizes',
      'Infrastructure investment',
      'Cultural acceptance',
      'New normal established'
    ]
  },
  {
    period: '2033-2045',
    phase: 'H3 Stability',
    events: [
      'One scenario becomes dominant',
      'OR: Regional variation (Europe ≠ US ≠ China)',
      'OR: Mosaic (different domains use different approaches)'
    ]
  }
];

export default function PostTruthHorizons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123, 63, 242, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 63, 242, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Scanning Line Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(123, 63, 242, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(123, 63, 242, 0.6), 0 0 40px rgba(123, 63, 242, 0.4)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-gray-800/50 bg-[#0A0A0A]/80 backdrop-blur-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <Breadcrumb />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded hover:bg-gray-900"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <GlobalMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Back Button - Always Visible */}
      <div className="fixed top-[73px] left-8 z-30">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="pt-[73px] min-h-screen px-8 max-w-[1800px] mx-auto py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Three Horizons Framework</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Timeline of transformation: present systems declining, transitional chaos, and emerging futures (2025→2045)
          </p>
        </div>

        {/* How to Use This Framework */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="border border-gray-800 bg-gray-900/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">How to Use This Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <div className="font-semibold text-white mb-2">1. Understand Where We Are</div>
                <p>We're in Horizon 2 (H2) - the messy middle. Traditional systems are failing, new ones are emerging.</p>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">2. Explore Five Futures</div>
                <p>Five possible Horizon 3 scenarios compete for dominance. Each represents a different stable future state.</p>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">3. Make Strategic Choices</div>
                <p>Your decisions today shape which H3 emerges. Prepare for multiple possibilities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Horizon 1 */}
            <div className="border border-red-500/30 bg-red-950/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="text-red-400" size={24} />
                <h3 className="text-2xl font-bold text-red-400">Horizon 1</h3>
              </div>
              <div className="text-sm text-gray-400 mb-2">2025-2027</div>
              <div className="text-lg font-semibold mb-3">Declining Present</div>
              <p className="text-sm text-gray-300 mb-4">
                Traditional verification systems failing. News orgs closing, courts rejecting digital evidence, public trust collapsing.
              </p>
              <div className="text-xs text-red-400 font-mono">STATUS: CRISIS ACCELERATION</div>
            </div>

            {/* Horizon 2 */}
            <div className="border border-yellow-500/30 bg-yellow-950/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-400" size={24} />
                <h3 className="text-2xl font-bold text-yellow-400">Horizon 2</h3>
              </div>
              <div className="text-sm text-gray-400 mb-2">2027-2031</div>
              <div className="text-lg font-semibold mb-3">Transitional Chaos</div>
              <p className="text-sm text-gray-300 mb-4">
                Thousands of verification experiments. Innovation explosion, business model testing, selection pressure determining winners.
              </p>
              <div className="text-xs text-yellow-400 font-mono">STATUS: WE ARE HERE</div>
            </div>

            {/* Horizon 3 */}
            <div className="border border-green-500/30 bg-green-950/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-400" size={24} />
                <h3 className="text-2xl font-bold text-green-400">Horizon 3</h3>
              </div>
              <div className="text-sm text-gray-400 mb-2">2033-2045</div>
              <div className="text-lg font-semibold mb-3">Emerging Futures</div>
              <p className="text-sm text-gray-300 mb-4">
                New paradigms stabilize. Five possible scenarios compete for dominance. Infrastructure investment, cultural acceptance.
              </p>
              <div className="text-xs text-green-400 font-mono">STATUS: CRYSTALLIZING</div>
            </div>
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">The Journey Through Time</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
            
            {/* Timeline Points */}
            <div className="grid grid-cols-5 gap-4 relative">
              {[
                { year: 2025, label: 'Crisis Begins', color: '#EF4444', phase: 'H1' },
                { year: 2027, label: 'Innovation Explosion', color: '#EAB308', phase: 'H2' },
                { year: 2029, label: 'Selection Pressure', color: '#EAB308', phase: 'H2' },
                { year: 2031, label: 'H3 Emergence', color: '#22C55E', phase: 'H3' },
                { year: 2033, label: 'New Stability', color: '#22C55E', phase: 'H3' }
              ].map((point, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col items-center cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredYear(point.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div 
                    className="w-6 h-6 rounded-full border-4 border-[#0A0A0A] transition-all z-10"
                    style={{ 
                      backgroundColor: point.color,
                      boxShadow: hoveredYear === point.year ? `0 0 20px ${point.color}` : 'none',
                      transform: hoveredYear === point.year ? 'scale(1.3)' : 'scale(1)'
                    }}
                  />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: point.color }}>{point.year}</div>
                    <div className="text-xs text-gray-400 mt-1">{point.label}</div>
                    <div className="text-xs font-mono mt-1" style={{ color: point.color }}>{point.phase}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* H3 Scenarios - CLA Style */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Five Horizon 3 Scenarios</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Five possible futures competing for dominance. Each represents a stable end-state that could emerge from today's chaos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {h3Scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:transform hover:scale-[1.02]"
                style={{ 
                  borderColor: scenario.borderColor, 
                  boxShadow: `0 0 20px ${scenario.color}20` 
                }}
                onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
              >
                {/* Scenario Number */}
                <div className="absolute top-3 right-3 text-7xl font-bold opacity-10 z-0" style={{ color: scenario.color }}>
                  {scenario.id}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col relative z-10">
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${scenario.color}B3` }}>
                    Scenario {scenario.id}
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: scenario.color }}>
                    {scenario.title}
                  </h3>
                  
                  <div className="border-l-3 pl-3 py-1" style={{ borderColor: scenario.color, borderLeftWidth: '3px' }}>
                    <div className="text-xs font-medium" style={{ color: scenario.color }}>
                      {scenario.subtitle}
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                    {scenario.paradigm}
                  </p>

                  <div className="text-xs text-gray-500 mb-2">{scenario.years}</div>

                  {selectedScenario !== scenario.id && (
                    <div className="text-xs font-semibold tracking-wider uppercase hover:gap-3 transition-all flex items-center gap-2 pt-2" style={{ color: scenario.color }}>
                      Explore <ArrowRight size={14} />
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {selectedScenario === scenario.id && (
                  <div className="border-t p-6 space-y-4 bg-black/40" style={{ borderColor: `${scenario.color}40` }}>
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `${scenario.color}B3` }}>
                        Dominant System
                      </div>
                      <div className="text-sm font-medium text-white">{scenario.dominant}</div>
                    </div>

                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `${scenario.color}B3` }}>
                        Key Features
                      </div>
                      <ul className="space-y-1">
                        {scenario.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                            <span style={{ color: scenario.color }}>→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `${scenario.color}B3` }}>
                        How We Got Here
                      </div>
                      <ul className="space-y-1">
                        {scenario.howWeGotHere.map((step, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-gray-600">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase mb-1 text-green-400">Strengths</div>
                        <div className="space-y-1">
                          {scenario.strengths.map((strength, idx) => (
                            <div key={idx} className="text-xs text-gray-400">+ {strength}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase mb-1 text-red-400">Weaknesses</div>
                        <div className="space-y-1">
                          {scenario.weaknesses.map((weakness, idx) => (
                            <div key={idx} className="text-xs text-gray-400">- {weakness}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-950/30 border border-red-500/30 rounded p-3 mt-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={12} />
                        <div>
                          <div className="text-[9px] tracking-[0.2em] uppercase text-red-400 font-semibold mb-1">Wild Card</div>
                          <div className="text-xs text-gray-300">{scenario.wildcard}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2 pt-2 cursor-pointer" style={{ color: scenario.color }}>
                      Close <span>×</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Transition Dynamics */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Transition Dynamics: Key Moments</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            The path from today to tomorrow isn't linear. Here are the critical inflection points that will shape which future emerges.
          </p>
          
          <div className="space-y-3">
            {transitionMoments.map((moment, idx) => {
              const colors = ['#EF4444', '#F59E0B', '#EAB308', '#22C55E', '#10B981'];
              const color = colors[idx];
              
              return (
                <div
                  key={idx}
                  className="border-2 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                  style={{ 
                    borderColor: `${color}40`,
                    boxShadow: `0 0 15px ${color}15`
                  }}
                >
                  <div className="flex items-stretch">
                    {/* Left Side - Period */}
                    <div 
                      className="w-48 flex flex-col justify-center items-center p-6 border-r-2"
                      style={{ 
                        borderColor: `${color}40`,
                        background: `linear-gradient(135deg, ${color}15, transparent)`
                      }}
                    >
                      <div className="text-3xl font-bold" style={{ color }}>{moment.period}</div>
                      <div className="text-xs uppercase tracking-wider mt-2 text-gray-400">{moment.phase}</div>
                    </div>
                    
                    {/* Right Side - Events */}
                    <div className="flex-1 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {moment.events.map((event, eventIdx) => (
                          <div key={eventIdx} className="flex items-start gap-3">
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm text-gray-300">{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Implications */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Strategic Implications</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Practical guidance for navigating the transition from H1 to H3
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Organizations */}
            <div 
              className="border-2 bg-black/40 backdrop-blur-sm rounded-lg p-8 transition-all duration-300 hover:scale-[1.01]"
              style={{ 
                borderColor: '#3B82F640',
                boxShadow: '0 0 20px #3B82F615'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F620' }}>
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#3B82F6' }}>For Organizations</h3>
                  <div className="text-xs text-gray-500">2025-2028 Strategy</div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3B82F6B3' }}>
                    Portfolio Approach
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Bet on multiple H2 innovations</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Don't commit to single path</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Maintain optionality</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Watch for signals of H3 emergence</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3B82F6B3' }}>
                    Build Adaptive Capacity
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Skills in multiple verification approaches</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Partnerships across innovations</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Rapid pivot capability</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Scenario-responsive planning</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3B82F6B3' }}>
                    Prepare for Multiple H3s
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Different strategies for each scenario</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Geographic variation strategies</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Domain-specific approaches</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#3B82F6' }}>→</span>
                      <span>Flexibility as core competence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* For Individuals */}
            <div 
              className="border-2 bg-black/40 backdrop-blur-sm rounded-lg p-8 transition-all duration-300 hover:scale-[1.01]"
              style={{ 
                borderColor: '#10B98140',
                boxShadow: '0 0 20px #10B98115'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B98120' }}>
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#10B981' }}>For Individuals</h3>
                  <div className="text-xs text-gray-500">2025-2028 Strategy</div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#10B981B3' }}>
                    Learn Transitional Skills
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Verification techniques</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Critical thinking</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Multiple epistemologies</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Adaptation/resilience</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#10B981B3' }}>
                    Build Networks
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Trusted personal contacts</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Multiple community memberships</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Cross-domain connections</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Reality-bridging relationships</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#10B981B3' }}>
                    Psychological Preparation
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Comfort with uncertainty</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Reality flexibility</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Emotional resilience</span>
                    </li>
                    <li className="text-sm text-gray-300 flex items-start gap-2">
                      <span style={{ color: '#10B981' }}>→</span>
                      <span>Meaning-making beyond truth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div 
          className="border-2 bg-black/40 backdrop-blur-sm rounded-lg p-10"
          style={{ 
            borderColor: '#A855F740',
            boxShadow: '0 0 30px #A855F720'
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#A855F7' }}>Living in H2: Key Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            {[
              { title: 'No going back to H1', desc: 'Traditional verification is declining irreversibly' },
              { title: 'H2 is chaotic by nature', desc: 'Multiple experiments, high uncertainty, rapid change' },
              { title: 'Multiple H3s possible', desc: 'Different regions/domains may diverge' },
              { title: 'Transition takes time', desc: '2025-2033 before clarity emerges' },
              { title: 'Agency matters', desc: 'Our actions shape which H3 becomes dominant' }
            ].map((insight, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  background: 'linear-gradient(135deg, #A855F710, transparent)',
                  border: '1px solid #A855F720'
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                  style={{ 
                    backgroundColor: '#A855F720',
                    color: '#A855F7',
                    border: '2px solid #A855F740'
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{insight.title}</div>
                  <div className="text-sm text-gray-400">{insight.desc}</div>
                </div>
              </div>
            ))}
            
            {/* Empty div for grid alignment */}
            <div className="hidden md:block" />
          </div>
          
          <div className="text-center max-w-2xl mx-auto pt-6 border-t" style={{ borderColor: '#A855F730' }}>
            <div className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: '#A855F7B3' }}>
              The Strategic Question
            </div>
            <div className="text-xl font-semibold text-white mb-2">
              Which H2 innovations should you invest in now to thrive in the H3 that emerges?
            </div>
            <div className="text-sm text-gray-400 italic mt-4">
              Your choices today will determine which future becomes reality
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gridScroll {
          0% {
            transform: perspective(500px) rotateX(65deg) translateY(0) scale(1.8);
          }
          100% {
            transform: perspective(500px) rotateX(65deg) translateY(50px) scale(1.8);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}}></style>
    </div>
  );
}
