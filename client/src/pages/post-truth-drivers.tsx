import { useState } from 'react';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

interface Driver {
  id: string;
  name: string;
  focus: string;
}

interface DriverState {
  status: string;
  tagColor: 'red' | 'amber' | 'green' | 'neutral';
}

interface ClusterConfig {
  id: string;
  name: string;
  archetype: string;
  overview: string;
  loopDynamics: string[];
  stabilizingFactors: string;
  destabilizingFactors: string;
  driverStates: Record<string, DriverState>;
}

const drivers: Driver[] = [
  { id: 'D1', name: 'Verification Cost Asymmetry', focus: 'Economic Imbalance' },
  { id: 'D2', name: 'Cognitive Capacity Limits', focus: 'Human Overwhelm' },
  { id: 'D3', name: 'Trust Infrastructure Decay', focus: 'Institutional Collapse' },
  { id: 'D4', name: 'Tech Capability Curves', focus: 'Generation vs. Detection' },
  { id: 'D5', name: 'Regulatory Capacity', focus: 'Government Speed Gap' },
  { id: 'D6', name: 'Economic Inequality', focus: 'Stratification' },
  { id: 'D7', name: 'Generational Adaptation', focus: 'Cultural Shift' },
  { id: 'D8', name: 'Environmental Constraints', focus: 'Energy Limits' },
  { id: 'D9', name: 'Geopolitical Fragmentation', focus: 'International Divergence' },
  { id: 'D10', name: 'Mental Health Crisis', focus: 'Psychological Burden' },
];

const dotColors = {
  red: '#ff6b6b',
  amber: '#ffaa44',
  green: '#66dd88',
  neutral: '#999999',
};

const clusters: ClusterConfig[] = [
  {
    id: 'C1',
    name: 'THE ECONOMIC DEATH SPIRAL',
    archetype: 'Collapse Archetype',
    overview: "This is the fundamental **failure mode** leading to the **Collapse archetype**, driven by unsustainable cost asymmetry and cognitive burden. It leads to **system failure** and **institutional breakdown**.",
    loopDynamics: [
      'Verification becomes expensive (D1)',
      'Only wealthy can afford it (D6)',
      'Mass market verification fails economically',
      'Verification businesses collapse (D3)',
      'No verification infrastructure remains',
      'Everyone overwhelmed (D2)',
      'Give up on verification entirely',
      'System collapse'
    ],
    stabilizingFactors: 'Government intervention (public utility model), Technological breakthrough (free AI verification), Acceptance (Kenji\'s path).',
    destabilizingFactors: 'Economic recession, Major catastrophe (panic, breakdown), Adversarial acceleration.',
    driverStates: {
      D1: { status: 'CRITICAL GAP', tagColor: 'red' },
      D2: { status: 'OVERWHELMED', tagColor: 'red' },
      D3: { status: 'COLLAPSED', tagColor: 'red' },
      D6: { status: 'AMPLIFYING', tagColor: 'amber' },
      D10: { status: 'EPIDEMIC', tagColor: 'red' },
      D4: { status: 'Inactive/Background', tagColor: 'neutral' },
      D5: { status: 'Inactive/Background', tagColor: 'neutral' },
      D7: { status: 'Inactive/Background', tagColor: 'neutral' },
      D8: { status: 'Inactive/Background', tagColor: 'neutral' },
      D9: { status: 'Inactive/Background', tagColor: 'neutral' },
    },
  },
  {
    id: 'C2',
    name: 'THE INNOVATION RACE',
    archetype: 'Continued Growth Archetype',
    overview: "This **Continued Growth** loop results in the **Verification Industrial Complex**, where continuous investment attempts to match the arms race. The verification industry grows exponentially, potentially becoming the **world\'s largest economic sector**.",
    loopDynamics: [
      'Tech advances faster than regulation (D5/D4)',
      'New verification tools emerge constantly',
      'Markets develop',
      'Wealthy get best tools (D6)',
      'Arms race continues (D4)',
      'More sophisticated approaches needed',
      'Investment pours in',
      'Industry grows exponentially'
    ],
    stabilizingFactors: 'Breakthrough technology (quantum verification), International cooperation (standards, treaties), Market maturation.',
    destabilizingFactors: 'Adversarial breakthrough (perfect fakes), Market crash (bubble burst), Regulatory backlash.',
    driverStates: {
      D1: { status: 'PERSISTENT', tagColor: 'neutral' },
      D4: { status: 'OUTPACING', tagColor: 'amber' },
      D5: { status: 'LAGGING', tagColor: 'amber' },
      D6: { status: 'INTENSIFYING', tagColor: 'amber' },
      D2: { status: 'Inactive/Background', tagColor: 'neutral' },
      D3: { status: 'Inactive/Background', tagColor: 'neutral' },
      D7: { status: 'Inactive/Background', tagColor: 'neutral' },
      D8: { status: 'Inactive/Background', tagColor: 'neutral' },
      D9: { status: 'Inactive/Background', tagColor: 'neutral' },
      D10: { status: 'Inactive/Background', tagColor: 'neutral' },
    },
  },
  {
    id: 'C3',
    name: 'THE GENERATIONAL TRANSITION',
    archetype: 'Transformation/Acceptance',
    overview: "This **Transformation** cluster is driven by **cultural adaptation** rather than technical fixes. Younger generations design systems for **uncertainty** and **fluidity** (e.g., Reality Layers), easing the burden imposed by Cognitive Capacity Limits.",
    loopDynamics: [
      'Younger generation comfortable with synthetic reality',
      'Design systems for uncertainty (layers, fluidity)',
      'Older generation resistant, anxious (D10)',
      'Intergenerational conflict',
      'Institutions evolve toward youth norms',
      'Over time, youth become majority',
      'New normal: Uncertainty is baseline'
    ],
    stabilizingFactors: 'Education (teaching epistemic humility), Therapeutic support (help elders adapt), Gradual transition.',
    destabilizingFactors: 'Rapid change (no time to adapt), Elder revolt (political backlash), Loss of wisdom.',
    driverStates: {
      D7: { status: 'DOMINANT', tagColor: 'neutral' },
      D2: { status: 'MANAGED', tagColor: 'green' },
      D10: { status: 'CATALYZING', tagColor: 'amber' },
      D3: { status: 'REBUILT', tagColor: 'green' },
      D1: { status: 'Inactive/Background', tagColor: 'neutral' },
      D4: { status: 'Inactive/Background', tagColor: 'neutral' },
      D5: { status: 'Inactive/Background', tagColor: 'neutral' },
      D6: { status: 'Inactive/Background', tagColor: 'neutral' },
      D8: { status: 'Inactive/Background', tagColor: 'neutral' },
      D9: { status: 'Inactive/Background', tagColor: 'neutral' },
    },
  },
  {
    id: 'C4',
    name: 'THE ENVIRONMENTAL FORCING FUNCTION',
    archetype: 'Discipline Archetype',
    overview: "This **Discipline** scenario, often called **The Brownout Future**, occurs when **Environmental Constraints** force governments to impose strict limits on AI generation, naturally solving the verification crisis through **content scarcity**.",
    loopDynamics: [
      'Climate crisis demands energy reduction (D8)',
      'Verification infrastructure too energy-intensive',
      'Can\'t verify everything (rationing)',
      'High-stakes verification only',
      'Elite maintain access (D6)',
      'Mass unverified',
      'Political pressure for equity',
      'Forced simplification (Discipline)'
    ],
    stabilizingFactors: 'Energy breakthrough (renewable, fusion), Efficiency gains, Voluntary limits (cultural shift), Alternative methods (analog, low-tech).',
    destabilizingFactors: 'Climate catastrophe, Resource wars (conflict over compute), System breakdown.',
    driverStates: {
      D8: { status: 'HARD LIMITS HIT', tagColor: 'red' },
      D5: { status: 'EMERGENCY', tagColor: 'neutral' },
      D1: { status: 'REVERSED', tagColor: 'green' },
      D6: { status: 'STRATIFIED', tagColor: 'neutral' },
      D2: { status: 'Inactive/Background', tagColor: 'neutral' },
      D3: { status: 'Inactive/Background', tagColor: 'neutral' },
      D4: { status: 'Inactive/Background', tagColor: 'neutral' },
      D7: { status: 'Inactive/Background', tagColor: 'neutral' },
      D9: { status: 'Inactive/Background', tagColor: 'neutral' },
      D10: { status: 'Inactive/Background', tagColor: 'neutral' },
    },
  },
  {
    id: 'C5',
    name: 'THE GEOPOLITICAL MOSAIC',
    archetype: 'Fragmentation Archetype',
    overview: "This leads to **Fragmentation** where the failure of global cooperation results in multiple, incompatible reality frameworks (**The Reality Archipelago**). Divergent national approaches (D9) and the enabling effects of new technologies (D4) create **permanent division**.",
    loopDynamics: [
      'Different regions choose different approaches (D9)',
      'No international coordination',
      'Cross-border information conflicts',
      '"Verification arbitrage" (jurisdiction shopping)',
      'Regional divergence increases',
      'Global fragmentation permanent',
      'Multiple incompatible reality frameworks'
    ],
    stabilizingFactors: 'International crisis (forces cooperation), Economic integration (common standards needed), Cultural exchange.',
    destabilizingFactors: 'Great power competition (verification as weapon), Digital imperialism, Information warfare.',
    driverStates: {
      D9: { status: 'FRAGMENTING', tagColor: 'amber' },
      D6: { status: 'POLARIZED', tagColor: 'neutral' },
      D3: { status: 'ERODING', tagColor: 'amber' },
      D7: { status: 'DIVERGING', tagColor: 'amber' },
      D1: { status: 'Inactive/Background', tagColor: 'neutral' },
      D2: { status: 'Inactive/Background', tagColor: 'neutral' },
      D4: { status: 'Inactive/Background', tagColor: 'neutral' },
      D5: { status: 'Inactive/Background', tagColor: 'neutral' },
      D8: { status: 'Inactive/Background', tagColor: 'neutral' },
      D10: { status: 'Inactive/Background', tagColor: 'neutral' },
    },
  },
];

export default function PostTruthDrivers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const currentCluster = clusters[selectedCluster];

  const getCirclePosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90;
    const radians = (angle * Math.PI) / 180;
    const radius = 45;
    return {
      x: 50 + radius * Math.cos(radians),
      y: 50 + radius * Math.sin(radians),
    };
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 229, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 229, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 0, 229, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(255, 0, 229, 0.6), 0 0 40px rgba(255, 0, 229, 0.4)',
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
      <div className="pt-20 lg:pt-[73px] min-h-screen px-2 lg:px-4 xl:px-8 max-w-[1600px] mx-auto flex flex-col py-2 lg:py-2 relative z-10">
        <div className="text-center mb-1 lg:mb-2 relative z-10">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-0.5 lg:mb-1 tracking-tight">Scenario Explorer Dashboard</h1>
          <p className="text-gray-400 text-[10px] lg:text-xs xl:text-sm">Interactive analysis of five critical feedback loops shaping future outcomes</p>
        </div>

        {/* Cluster Selection Section */}
        <div className="mb-1 lg:mb-2 p-1.5 lg:p-2 xl:p-3 bg-gradient-to-b from-black/40 to-black/20 border border-gray-800/50 rounded-lg relative z-10">
          <div className="text-center mb-1.5 lg:mb-2">
            <p className="text-xs lg:text-sm xl:text-base font-semibold text-white">Select a Scenario to Explore</p>
          </div>

          {/* Cluster Selection Buttons */}
          <div className="grid grid-cols-5 gap-1.5 lg:gap-2">
            {clusters.map((cluster, index) => {
              const clusterColors = [
                { title: '#7B3FF2', rgb: '123, 63, 242' },
                { title: '#FF00E5', rgb: '255, 0, 229' },
                { title: '#00D9E8', rgb: '0, 217, 232' },
                { title: '#FF8C00', rgb: '255, 140, 0' },
                { title: '#E91E8C', rgb: '233, 30, 140' },
              ];
              const color = clusterColors[index];
              const isSelected = selectedCluster === index;

              return (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedCluster(index)}
                  className={`relative p-1.5 lg:p-2 xl:p-3 transition-all duration-300 text-left overflow-hidden group ${
                    isSelected
                      ? 'scale-105 bg-white border-2'
                      : 'bg-black/80 hover:bg-black hover:scale-102 border'
                  }`}
                  style={{
                    borderColor: isSelected ? color.title : '#3a3a3a',
                    boxShadow: isSelected 
                      ? `0 0 30px rgba(${color.rgb}, 0.6), 0 0 60px rgba(${color.rgb}, 0.3), inset 0 0 30px rgba(${color.rgb}, 0.1)` 
                      : 'none',
                  }}
                >
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all" style={{ borderColor: color.title }} />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all" style={{ borderColor: color.title }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all" style={{ borderColor: color.title }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all" style={{ borderColor: color.title }} />

                  <div className="relative z-10">
                    <div 
                      className="text-[8px] lg:text-[10px] font-mono font-bold mb-0.5 lg:mb-1"
                      style={{ color: isSelected ? color.title : `rgba(${color.rgb}, 0.6)` }}
                    >
                      [{cluster.id}]
                    </div>
                    <div 
                      className="text-xs lg:text-sm font-bold uppercase leading-tight transition-all"
                      style={{ 
                        color: color.title,
                      }}
                    >
                      {cluster.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenario Analysis Divider */}
        <div className="relative mb-1.5 lg:mb-2 xl:mb-3 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div 
              className="w-full border-t-2" 
              style={{
                borderColor: selectedCluster === 0 ? 'rgba(123, 63, 242, 0.3)' :
                             selectedCluster === 1 ? 'rgba(255, 0, 229, 0.3)' :
                             selectedCluster === 2 ? 'rgba(0, 217, 232, 0.3)' :
                             selectedCluster === 3 ? 'rgba(255, 140, 0, 0.3)' :
                             'rgba(233, 30, 140, 0.3)',
              }}
            ></div>
          </div>
          <div className="relative px-4 bg-[#0A0A0A]">
            <div 
              className="flex items-center gap-2 font-bold text-xs lg:text-sm xl:text-base"
              style={{
                color: selectedCluster === 0 ? '#7B3FF2' :
                       selectedCluster === 1 ? '#FF00E5' :
                       selectedCluster === 2 ? '#00D9E8' :
                       selectedCluster === 3 ? '#FF8C00' :
                       '#E91E8C'
              }}
            >
              <span className="animate-pulse">↓</span>
              <span className="tracking-wider">SCENARIO ANALYSIS</span>
              <span className="animate-pulse">↓</span>
            </div>
          </div>
        </div>

        {/* Main Layout: Left Column (Overview + Loop) and Right Column (Drivers) */}
        <div className="p-1.5 lg:p-2 xl:p-3 bg-gradient-to-b from-black/20 to-black/40 border border-gray-700/30 rounded-lg">
          <div className="grid grid-cols-12 gap-1.5 lg:gap-2 xl:gap-3">
            {/* Left Column: Overview + Loop Dynamics */}
            <div className="col-span-5 flex flex-col gap-1.5 lg:gap-2">
              {/* SCENARIO OVERVIEW */}
              <div className="border border-[#2a2a2a] bg-black/80 backdrop-blur-sm p-1.5 lg:p-2 xl:p-3">
                <h2 className="text-[10px] lg:text-xs xl:text-sm font-bold mb-1.5 lg:mb-2 uppercase border-b border-gray-700 pb-1.5 lg:pb-2">Scenario Overview</h2>
                
                <div className="text-[9px] lg:text-[10px] xl:text-xs leading-relaxed text-gray-300 mb-2 lg:mb-3">
                  {currentCluster.overview.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                  )}
                </div>

                {/* Stabilizing and Destabilizing Forces */}
                <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
                  <div className="p-1.5 lg:p-2 rounded" style={{ background: 'rgba(26, 74, 42, 0.1)' }}>
                    <h3 className="text-[9px] lg:text-[10px] xl:text-xs font-bold mb-0.5 lg:mb-1 text-green-400">Stabilizing Forces:</h3>
                    <ul className="text-[8px] lg:text-[9px] xl:text-[10px] leading-relaxed text-gray-300 space-y-0.5">
                      {currentCluster.stabilizingFactors.split(',').map((factor, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>{factor.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-1.5 lg:p-2 rounded" style={{ background: 'rgba(74, 26, 26, 0.1)' }}>
                    <h3 className="text-[9px] lg:text-[10px] xl:text-xs font-bold mb-0.5 lg:mb-1 text-red-400">Destabilizing Forces:</h3>
                    <ul className="text-[8px] lg:text-[9px] xl:text-[10px] leading-relaxed text-gray-300 space-y-0.5">
                      {currentCluster.destabilizingFactors.split(',').map((factor, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>{factor.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FEEDBACK LOOP */}
              <div className="border border-[#2a2a2a] bg-black/80 backdrop-blur-sm p-1.5 lg:p-2 xl:p-3 flex-grow flex flex-col">
                <h2 className="text-[10px] lg:text-xs xl:text-sm font-bold mb-1.5 lg:mb-2 uppercase">Feedback Loop</h2>

                <div className="flex gap-1.5 lg:gap-2 xl:gap-3">
                  {/* Visual Loop */}
                  <div className="flex-shrink-0" style={{ width: '140px', height: '140px' }}>
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center px-2">
                          <div className="text-[10px] lg:text-xs xl:text-sm font-bold text-center leading-tight"
                            style={{
                              color: selectedCluster === 0 ? '#7B3FF2' :
                                     selectedCluster === 1 ? '#FF00E5' :
                                     selectedCluster === 2 ? '#00D9E8' :
                                     selectedCluster === 3 ? '#FF8C00' :
                                     '#E91E8C'
                            }}
                          >
                            {selectedCluster === 0 && <>COLLAPSE<br/>SPIRAL</>}
                            {selectedCluster === 1 && <>GROWTH<br/>CYCLE</>}
                            {selectedCluster === 2 && <>TRANSITION<br/>PATHWAY</>}
                            {selectedCluster === 3 && <>DISCIPLINE<br/>MECHANISM</>}
                            {selectedCluster === 4 && <>FRAGMENTATION<br/>PATTERN</>}
                          </div>
                        </div>
                      </div>

                      <svg
                        className="absolute inset-0 pointer-events-none"
                        viewBox="0 0 100 100"
                        style={{ width: '100%', height: '100%' }}
                      >
                        <defs>
                          <marker
                            id={`arrowhead-${selectedCluster}`}
                            markerWidth="10"
                            markerHeight="10"
                            refX="8"
                            refY="3"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill={
                              selectedCluster === 0 ? '#7B3FF2' :
                              selectedCluster === 1 ? '#FF00E5' :
                              selectedCluster === 2 ? '#00D9E8' :
                              selectedCluster === 3 ? '#FF8C00' :
                              '#E91E8C'
                            } />
                          </marker>
                        </defs>

                        {currentCluster.loopDynamics.map((step, index) => {
                          const pos = getCirclePosition(index, currentCluster.loopDynamics.length);
                          const nextPos = getCirclePosition(
                            (index + 1) % currentCluster.loopDynamics.length,
                            currentCluster.loopDynamics.length
                          );

                          const clusterColor = selectedCluster === 0 ? '123, 63, 242' :
                                             selectedCluster === 1 ? '255, 0, 229' :
                                             selectedCluster === 2 ? '0, 217, 232' :
                                             selectedCluster === 3 ? '255, 140, 0' :
                                             '233, 30, 140';

                          return (
                            <g key={index}>
                              <line
                                x1={pos.x}
                                y1={pos.y}
                                x2={nextPos.x}
                                y2={nextPos.y}
                                stroke={`rgba(${clusterColor}, 0.5)`}
                                strokeWidth="0.5"
                                markerEnd={`url(#arrowhead-${selectedCluster})`}
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {currentCluster.loopDynamics.map((step, index) => {
                        const pos = getCirclePosition(index, currentCluster.loopDynamics.length);
                        const isHovered = hoveredStep === index;

                        const clusterColor = selectedCluster === 0 ? '#7B3FF2' :
                                           selectedCluster === 1 ? '#FF00E5' :
                                           selectedCluster === 2 ? '#00D9E8' :
                                           selectedCluster === 3 ? '#FF8C00' :
                                           '#E91E8C';

                        return (
                          <div
                            key={index}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                            style={{
                              left: `${pos.x}%`,
                              top: `${pos.y}%`,
                            }}
                            onMouseEnter={() => setHoveredStep(index)}
                            onMouseLeave={() => setHoveredStep(null)}
                          >
                            <div 
                              className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-all border-2"
                              style={{
                                backgroundColor: isHovered ? clusterColor : 'rgba(0, 0, 0, 0.8)',
                                borderColor: clusterColor,
                                boxShadow: isHovered ? `0 0 12px ${clusterColor}80` : 'none'
                              }}
                            >
                              <span className="text-[8px] lg:text-[10px] font-bold text-white">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Loop Text */}
                  <div className="flex-1 space-y-0.5 text-[8px] lg:text-[9px] xl:text-[10px]">
                    {currentCluster.loopDynamics.map((step, index) => {
                      const isHovered = hoveredStep === index;
                      const clusterColor = selectedCluster === 0 ? '#7B3FF2' :
                                         selectedCluster === 1 ? '#FF00E5' :
                                         selectedCluster === 2 ? '#00D9E8' :
                                         selectedCluster === 3 ? '#FF8C00' :
                                         '#E91E8C';

                      return (
                        <div 
                          key={index} 
                          className="flex items-start gap-1 lg:gap-2 transition-all"
                          style={{
                            backgroundColor: isHovered ? `${clusterColor}20` : 'transparent',
                            marginLeft: isHovered ? '-8px' : '0',
                            marginRight: isHovered ? '-8px' : '0',
                            paddingLeft: isHovered ? '8px' : '0',
                            paddingRight: isHovered ? '8px' : '0',
                            paddingTop: isHovered ? '4px' : '0',
                            paddingBottom: isHovered ? '4px' : '0',
                            borderRadius: isHovered ? '4px' : '0'
                          }}
                          onMouseEnter={() => setHoveredStep(index)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          <span className="font-bold flex-shrink-0" style={{ color: clusterColor }}>
                            {index + 1}.
                          </span>
                          <span className={`leading-tight ${isHovered ? 'text-white font-medium' : 'text-gray-300'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Drivers Dashboard */}
            <div className="col-span-7 border border-[#2a2a2a] bg-black/80 backdrop-blur-sm p-1.5 lg:p-2 xl:p-3">
              <div className="mb-1.5 lg:mb-2">
                <h2 className="text-[10px] lg:text-xs xl:text-sm font-bold uppercase">Core Drivers</h2>
              </div>

              <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
                {drivers.map((driver) => {
                  const state = currentCluster.driverStates[driver.id];
                  const isInactive = state.status === 'Inactive/Background';
                  const dotColor = dotColors[state.tagColor];

                  return (
                    <div
                      key={driver.id}
                      className={`border p-1.5 lg:p-2 transition-all relative ${isInactive ? 'opacity-30' : 'opacity-100'}`}
                      style={{
                        borderColor: '#2a2a2a',
                        borderLeftWidth: '3px',
                        borderLeftColor: isInactive ? '#2a2a2a' : '#FFFFFF',
                        backgroundColor: isInactive ? '#00000040' : '#00000060',
                      }}
                    >
                      {!isInactive && (
                        <div className="absolute top-0.5 lg:top-1 right-0.5 lg:right-1 flex items-center gap-1 lg:gap-1.5 text-[6px] lg:text-[7px] xl:text-[8px] font-semibold uppercase">
                          <span style={{ color: dotColor, fontSize: '12px', lineHeight: 1 }}>●</span>
                          <span style={{ color: dotColor }}>{state.status}</span>
                        </div>
                      )}

                      <div className="space-y-0.5 pr-12 lg:pr-16 xl:pr-20">
                        <div className="text-[8px] lg:text-[9px] xl:text-[10px] font-bold text-gray-400">{driver.id}</div>
                        <div className="text-[10px] lg:text-xs xl:text-sm font-bold uppercase leading-tight">{driver.name}</div>
                        <div className="text-[7px] lg:text-[8px] xl:text-[10px] text-gray-500">{driver.focus}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
            top: -2px;
          }
          100% {
            top: 100%;
          }
        }
      `}}></style>
    </div>
  );
}
