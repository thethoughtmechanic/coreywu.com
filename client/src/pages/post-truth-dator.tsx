import { useState } from 'react';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

const futures = [
  {
    id: 1,
    title: 'Continued Growth',
    tagline: 'The Verification Industrial Complex',
    description: 'The future continues along current trajectories with incremental improvements',
    pattern: 'Current trends intensify and expand',
    color: '#7B3FF2',
    icon: '↗',
    timeline: [
      { period: '2025-2028', title: 'Early Growth', details: '$50B VC investment, 10K+ startups' },
      { period: '2029-2032', title: 'Mature Industry', details: '$500B market, Big Five dominate' },
      { period: '2033-2037', title: 'Saturation', details: '$2T economy, 50M employed' },
      { period: '2038-2040', title: 'Full Integration', details: '10% of global GDP, ubiquitous' }
    ],
    keyFeatures: [
      'Fastest growing sector globally, new Fortune 500 companies',
      '50+ verification specialties, complex credentialing systems',
      'Quantum verification, neural interfaces, AI-AI systems',
      'Verified life as status symbol, children grow up verified'
    ]
  },
  {
    id: 2,
    title: 'Discipline',
    tagline: 'Constrained Reality',
    description: 'Constraints and regulations shape a more controlled future',
    pattern: 'Constraints accepted, limits embraced, steady-state',
    color: '#FF8C00',
    icon: '⊜',
    timeline: [
      { period: '2027-2029', title: 'Climate Crisis Forces Action', details: 'Energy rationing begins' },
      { period: '2029-2031', title: 'Verification Rationing', details: 'High-stakes only' },
      { period: '2032-2035', title: 'Steady State', details: 'Low-verification society stabilizes' },
      { period: '2036-2040', title: 'New Normal', details: 'Sufficiency culture, analog renaissance' }
    ],
    keyFeatures: [
      'Steady-state economy, local focus, craft-based production',
      'Constrained technology, energy-limited, selective use',
      'Community trust, face-to-face verification, sufficiency culture',
      'Sustainable systems, reduced energy use, climate-first priorities'
    ]
  },
  {
    id: 3,
    title: 'Collapse',
    tagline: 'The Reality Breakdown',
    description: 'Systems break down requiring fundamental rebuilding',
    pattern: 'Systems fail, crisis cascades, breakdown',
    color: '#FF00E5',
    icon: '↯',
    timeline: [
      { period: '2025-2027', title: 'Verification Crisis', details: 'All attempts fail, deepfakes leap ahead' },
      { period: '2027-2028', title: 'Cascade Begins', details: 'Major catastrophe, emergency powers fail' },
      { period: '2028-2030', title: 'System Failure', details: 'Legal/financial/healthcare collapse' },
      { period: '2030-2032', title: 'The Dark Age', details: 'Government illegitimate, "Great Offline"' }
    ],
    keyFeatures: [
      '40% unemployment, global trade collapsed, return to barter',
      'Governments barely functional, regional warlords emerge',
      'Internet abandoned as unusable, return to analog media',
      'No shared reality possible, extreme localism, family-only trust'
    ]
  },
  {
    id: 4,
    title: 'Transformation',
    tagline: 'Post-Human Truth',
    description: 'Radical shifts create entirely new paradigms and possibilities',
    pattern: 'Fundamental paradigm shift, revolutionary change',
    color: '#00D9E8',
    icon: '◈',
    timeline: [
      { period: '?', title: 'Collective Consciousness', details: 'Neural linking, shared reality' },
      { period: '?', title: 'Oracle AGI', details: 'AI as trusted arbiter, 100% accuracy' },
      { period: '?', title: 'Embodied Network', details: 'Quantum presence, post-location society' },
      { period: '?', title: 'Great Acceptance', details: 'Reality pluralism, post-epistemological' }
    ],
    keyFeatures: [
      'Truth redefined entirely, new epistemological frameworks',
      'Breakthrough innovations: quantum, neural linking, AGI',
      'Post-scarcity possibilities, new forms of consciousness',
      'Challenges: identity, privacy, over-reliance on new systems'
    ]
  }
];

export default function PostTruthDator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61, 90, 159, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61, 90, 159, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(61, 90, 159, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(61, 90, 159, 0.6), 0 0 40px rgba(61, 90, 159, 0.4)',
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
      <div className="pt-20 lg:pt-[73px] min-h-screen px-3 lg:px-6 xl:px-8 max-w-[1400px] mx-auto flex flex-col justify-center py-4 lg:py-8 relative z-10">
        <div className="text-center mb-6 lg:mb-12 relative z-10">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4 tracking-tight">Dator's Four Futures</h1>
          <p className="text-gray-400 text-sm lg:text-base xl:text-lg">Four archetypal pathways: Continued Growth, Discipline, Collapse, or Transformation</p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full max-w-[1400px] mx-auto">
          {futures.map((future) => (
            <div
              key={future.id}
              className="relative w-full h-[380px] cursor-pointer perspective-1000"
              onClick={() => setFlippedCard(flippedCard === future.id ? null : future.id)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flippedCard === future.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 backface-hidden bg-white border-2 p-6 lg:p-8 shadow-lg"
                  style={{
                    borderColor: future.color,
                    boxShadow: `0 0 30px ${future.color}40`
                  }}
                >
                  <div className="text-xs font-mono text-black/40 mb-3">
                    DF-{future.id.toString().padStart(2, '0')}
                  </div>

                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: future.color }} />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: future.color }} />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: future.color }} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: future.color }} />

                  <div className="flex flex-col justify-center items-center h-full text-center px-4">
                    <div 
                      className="text-6xl lg:text-7xl mb-4 font-bold"
                      style={{ color: future.color }}
                    >
                      {future.icon}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: future.color }}>
                      {future.title}
                    </h2>
                    <p className="text-base lg:text-lg font-semibold mb-4" style={{ color: future.color }}>
                      {future.tagline}
                    </p>
                    <p className="text-sm lg:text-base text-black/70 leading-relaxed">
                      {future.pattern}
                    </p>
                    <div className="mt-6 text-xs text-black/50 italic">
                      Click to explore →
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 border-2 p-4 lg:p-6 shadow-lg overflow-y-auto"
                  style={{
                    borderColor: future.color,
                    boxShadow: `0 0 30px ${future.color}40`,
                    backgroundColor: '#0A0A0A'
                  }}
                >
                  <button
                    className="absolute top-3 right-3 text-white/60 hover:text-white text-2xl leading-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlippedCard(null);
                    }}
                  >
                    ×
                  </button>

                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: future.color }} />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: future.color }} />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: future.color }} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: future.color }} />

                  <div className="h-full flex flex-col">
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl" style={{ color: future.color }}>{future.icon}</span>
                        <h3 className="text-lg lg:text-xl font-bold" style={{ color: future.color }}>
                          {future.title}
                        </h3>
                      </div>
                      <p className="text-xs lg:text-sm text-white/70 italic">
                        {future.pattern}
                      </p>
                    </div>

                    <div className="flex-1 flex gap-3">
                      <div className="w-[35%] relative">
                        <h4 className="text-xs font-bold uppercase mb-2" style={{ color: future.color }}>
                          {future.id === 4 ? 'Scenarios' : 'Timeline'}
                        </h4>
                        <div 
                          className="absolute left-2 top-8 bottom-0 w-0.5"
                          style={{ backgroundColor: `${future.color}40` }}
                        />
                        <div className="relative space-y-3">
                          {future.timeline.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                              <div 
                                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center bg-[#0A0A0A] z-10 mt-0.5"
                                style={{ borderColor: future.color }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: future.color }} />
                              </div>
                              <div className="flex-1">
                                <div className="text-[10px] font-bold mb-0.5" style={{ color: future.color }}>
                                  {item.period}
                                </div>
                                <div className="text-xs text-white/90 font-semibold mb-0.5">{item.title}</div>
                                <div className="text-[10px] text-white/60 leading-tight">{item.details}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase mb-2" style={{ color: future.color }}>
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {future.keyFeatures.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="border p-2 rounded"
                              style={{ 
                                borderColor: `${future.color}40`,
                                backgroundColor: `${future.color}15`
                              }}
                            >
                              <p className="text-xs text-white/90 leading-relaxed">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}}></style>
    </div>
  );
}

