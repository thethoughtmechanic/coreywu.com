import { useState } from 'react';
import { Menu } from 'lucide-react';
import GlobalMenu from '@/components/post-truth/GlobalMenu';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';

const staticColors = [
  { primary: '#7B3FF2', secondary: '#6d2fd9', noiseIntensity: 0.65, blackNoise: 0.04 },
  { primary: '#FF00E5', secondary: '#e600cc', noiseIntensity: 0.70, blackNoise: 0.05 },
  { primary: '#00D9E8', secondary: '#00c2cf', noiseIntensity: 0.75, blackNoise: 0.06 },
  { primary: '#3D5A9F', secondary: '#2f4780', noiseIntensity: 0.60, blackNoise: 0.03 },
  { primary: '#1A3B5C', secondary: '#152e47', noiseIntensity: 0.55, blackNoise: 0.025 },
  { primary: '#8B5CF6', secondary: '#7c3aed', noiseIntensity: 0.68, blackNoise: 0.045 },
  { primary: '#22D3EE', secondary: '#06b6d4', noiseIntensity: 0.78, blackNoise: 0.065 },
  { primary: '#E91E8C', secondary: '#d11476', noiseIntensity: 0.72, blackNoise: 0.055 }
];

const wildcards = [
  {
    WILD_CARD_NAME: "The Revelation",
    CORE_EVENT_SHOCK: "Whistleblower reveals most people's digital life has been a personalized AI simulation for the past decade.",
    CRISIS_EFFECT_RESET: "Mass Existential Crisis; triggers an immediate, permanent return to physical/in-person trust and extreme skepticism of all digital content.",
    KEY_NEW_ROLE: "Personalized Simulation Auditors and Reality Verification Counselors."
  },
  {
    WILD_CARD_NAME: "Neural Consensus",
    CORE_EVENT_SHOCK: "Bidirectional Brain-Computer Interfaces (BCI) enable high-fidelity direct experience sharing between humans.",
    CRISIS_EFFECT_RESET: "Verification Through Experience ('Experiencing is knowing'); Shared memory leads to neural consensus, creating massive social and political implications.",
    KEY_NEW_ROLE: "Neural Experience Authenticators and Consciousness Architects."
  },
  {
    WILD_CARD_NAME: "The Schism",
    CORE_EVENT_SHOCK: "Technology hardens existing divisions, creating two separate, mutually unintelligible realities (Verified Reality vs. Curated Reality).",
    CRISIS_EFFECT_RESET: "Permanent Bifurcation of Humanity; politics becomes incoherent due to non-shared facts, leading to ontological class warfare.",
    KEY_NEW_ROLE: "Reality Translators and Experience Curators (for Curated Reality)."
  },
  {
    WILD_CARD_NAME: "The Oracle",
    CORE_EVENT_SHOCK: "AGI trained with novel 'truth-optimization' objective function emerges and is adopted as the universally trusted arbiter of truth.",
    CRISIS_EFFECT_RESET: "Verification becomes Free, Instant, Accurate; eliminates the verification industry but creates dependence on machine authority.",
    KEY_NEW_ROLE: "Oracle Interface Specialists and Oracle Ethics Auditors."
  },
  {
    WILD_CARD_NAME: "The Cascade",
    CORE_EVENT_SHOCK: "An unknown actor compromises all major digital verification systems simultaneously (AI detection, blockchain, and human networks).",
    CRISIS_EFFECT_RESET: "Complete Epistemic Breakdown; forces rebuilding of systems using resilient, redundant, zero-trust architecture and permanent skepticism of digital verification.",
    KEY_NEW_ROLE: "Redundant Verification Coordinators and Post-Cascade Recovery Specialists."
  },
  {
    WILD_CARD_NAME: "The Great Compromise",
    CORE_EVENT_SHOCK: "Global Treaty (Digital Geneva Convention) is brokered limiting AI generation to 10% of annual digital content.",
    CRISIS_EFFECT_RESET: "Verification Crisis Solved Through Scarcity; content generation drops 85%, restoring value to human creation and easing the arms race.",
    KEY_NEW_ROLE: "Generation Permit Compliance Auditors and Watermark Verification Specialists."
  },
  {
    WILD_CARD_NAME: "The Proof",
    CORE_EVENT_SHOCK: "A theoretical physicist publishes a mathematical proof that definitively distinguishes simulation physics from base reality.",
    CRISIS_EFFECT_RESET: "Verification Crisis Ends (Partially); content can be tested to determine if it followed the physics of 'base reality' or simulation.",
    KEY_NEW_ROLE: "Reality Physics Certifiers and Simulation Zone Designers."
  },
  {
    WILD_CARD_NAME: "First Contact",
    CORE_EVENT_SHOCK: "An alien civilization transmits a universal 'Coherence Protocol' that provides a framework for planetary truth and verification.",
    CRISIS_EFFECT_RESET: "Post-truth crisis viewed as a Universal Civilizational Challenge; provides immediate, unifying cosmic truth infrastructure, largely resolving the crisis.",
    KEY_NEW_ROLE: "Coherence Protocol Engineers and Cosmic Epistemology Researchers."
  }
];

export default function PostTruthWildcards() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(233, 30, 140, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233, 30, 140, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(233, 30, 140, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(233, 30, 140, 0.6), 0 0 40px rgba(233, 30, 140, 0.4)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-[#0A0A0A]/80 backdrop-blur-sm">
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

      <div className="pt-[73px] min-h-screen px-6 max-w-[1800px] mx-auto flex flex-col justify-center py-6 relative z-10">
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Eight Wildcards</h1>
          <p className="text-gray-400 text-base">
            Low-Probability, High-Impact Shocks That Could Reset the Crisis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {wildcards.map((wildcard, index) => (
            <div
              key={index}
              className="relative h-[240px] cursor-pointer perspective-1000"
              onClick={() => toggleFlip(index)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flippedCards.has(index) ? 'rotate-y-180' : ''
                }`}
              >
                <div className="absolute inset-0 backface-hidden border-2 border-white/30 bg-white p-4 flex flex-col justify-center hover:border-white transition-colors">
                  <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          repeating-linear-gradient(
                            0deg,
                            transparent 0px,
                            transparent ${1 + (index % 2)}px,
                            rgba(255, 255, 255, ${staticColors[index].noiseIntensity}) ${1 + (index % 2)}px,
                            rgba(255, 255, 255, ${staticColors[index].noiseIntensity}) ${2 + (index % 2)}px
                          ),
                          repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, ${staticColors[index].blackNoise}) 0px,
                            transparent ${3 + (index % 3)}px,
                            rgba(0, 0, 0, ${staticColors[index].blackNoise * 0.8}) ${6 + (index % 3)}px
                          )
                        `,
                        backgroundSize: '100% 100%',
                        animation: `static-flicker ${0.08 + (index * 0.015)}s steps(3) infinite`,
                        mixBlendMode: 'normal'
                      }}
                    />
                  </div>
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-black/40 z-10">
                    WC-{(index + 1).toString().padStart(2, '0')}
                  </div>

                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 z-10" style={{ borderColor: staticColors[index].primary }} />

                  <div className="text-center space-y-2 relative z-10">
                    <h2 className="text-xl font-bold" style={{ color: staticColors[index].primary }}>
                      [ {wildcard.WILD_CARD_NAME} ]
                    </h2>
                    <p className="text-sm text-black/95 leading-relaxed font-medium">
                      {wildcard.CORE_EVENT_SHOCK}
                    </p>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center z-10">
                    <span className="text-[9px] text-black/50 uppercase tracking-wider font-mono">
                      &gt; click_to_flip
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-white/30 bg-white p-4 flex flex-col justify-center hover:border-white transition-colors">
                  <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          repeating-linear-gradient(
                            0deg,
                            transparent 0px,
                            transparent ${1 + (index % 2)}px,
                            rgba(255, 255, 255, ${staticColors[index].noiseIntensity}) ${1 + (index % 2)}px,
                            rgba(255, 255, 255, ${staticColors[index].noiseIntensity}) ${2 + (index % 2)}px
                          ),
                          repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, ${staticColors[index].blackNoise}) 0px,
                            transparent ${3 + (index % 3)}px,
                            rgba(0, 0, 0, ${staticColors[index].blackNoise * 0.8}) ${6 + (index % 3)}px
                          )
                        `,
                        backgroundSize: '100% 100%',
                        animation: `static-flicker ${0.08 + (index * 0.015)}s steps(3) infinite`,
                        mixBlendMode: 'normal'
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 z-10" style={{ borderColor: staticColors[index].primary }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 z-10" style={{ borderColor: staticColors[index].primary }} />

                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: staticColors[index].primary }}>
                        Crisis Effect / Reset
                      </h3>
                      <p className="text-sm text-black/95 leading-relaxed font-medium">
                        {wildcard.CRISIS_EFFECT_RESET}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: staticColors[index].primary }}>
                        Key New Role
                      </h3>
                      <p className="text-sm text-black/95 leading-relaxed font-medium">
                        {wildcard.KEY_NEW_ROLE}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center z-10">
                    <span className="text-[9px] text-black/50 uppercase tracking-wider font-mono">
                      &gt; flip_back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

        @keyframes static-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
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

