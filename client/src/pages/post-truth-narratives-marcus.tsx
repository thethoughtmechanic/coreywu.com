import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Share2, Layers } from 'lucide-react';
import BackButton from '@/components/post-truth/BackButton';

export default function PostTruthNarrativesMarcus() {
  const [activeLayer, setActiveLayer] = useState<'alpha' | 'beta' | 'gamma' | 'delta'>('alpha');
  const [showGlitch, setShowGlitch] = useState(false);

  const layers = {
    alpha: {
      name: 'Consensus Prime',
      color: '#4A5568',
      bgColor: '#1A202C',
      description: 'Conservative verification. Boring but trusted.',
    },
    beta: {
      name: 'Community Witness',
      color: '#9333EA',
      bgColor: '#1E1B4B',
      description: 'Trust networks. Your community, your reality.',
    },
    gamma: {
      name: 'Full Synthetic',
      color: '#EC4899',
      bgColor: '#4A044E',
      description: 'No pretense. Openly constructed. Most popular.',
    },
    delta: {
      name: 'Physical Only',
      color: '#8B7355',
      bgColor: '#1C1917',
      description: 'Analog verification. No digital accepted.',
    },
  };

  const triggerGlitch = () => {
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), 300);
  };

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: layers[activeLayer].bgColor }}
    >
      {/* Digital Grid Background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `
            linear-gradient(${layers[activeLayer].color}40 1px, transparent 1px),
            linear-gradient(90deg, ${layers[activeLayer].color}40 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glitch Effect */}
      {showGlitch && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 animate-pulse" />
      )}

      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-40">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-[#00D9E8] font-semibold">
            THE CREATOR
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            The Architect of Dreams
          </h1>
          <div className="text-xl text-[#00D9E8]">
            Marcus Webb
          </div>
          <div className="pt-8 text-sm text-gray-400">
            3-5 minute read
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-3xl mx-auto px-8 py-24 space-y-16">
        
        {/* ACT I: THE BUILDER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#00D9E8]">
            ACT I: THE BUILDER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2025:</strong> Marcus Webb, 31, software architect. Built the verification layer for a major social platform.
            </p>

            <p>
              He sees the problem clearly: verification is failing. Not because tech is bad—because reality is too complex for binary verification.
            </p>

            <p>
              His solution: Don't verify reality. Build explicit reality layers. Let people choose their layer.
            </p>

            {/* Layer Selector */}
            <div className="my-12 p-8 border-2 rounded-lg" style={{ borderColor: layers[activeLayer].color }}>
              <div className="text-center space-y-4">
                <p className="font-semibold text-xl mb-6">Choose Your Reality Layer:</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(layers).map(([key, layer]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveLayer(key as typeof activeLayer);
                        triggerGlitch();
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        activeLayer === key ? 'ring-4 ring-white/50' : ''
                      }`}
                      style={{
                        borderColor: layer.color,
                        backgroundColor: activeLayer === key ? `${layer.color}20` : 'transparent',
                      }}
                    >
                      <div className="text-lg font-bold mb-2" style={{ color: layer.color }}>
                        {layer.name}
                      </div>
                      <div className="text-sm text-gray-300">{layer.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p>
              <strong>2027:</strong> His platform launches. Four reality layers. Users choose. No more fighting about what's "real."
            </p>

            <p>
              Critics call it "reality segregation." Marcus calls it "reality pluralism."
            </p>
          </div>
        </section>

        {/* ACT II: THE ARCHITECT */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#00D9E8]">
            ACT II: THE ARCHITECT
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2030:</strong> 2 billion users across all layers. The platform works. People adapt.
            </p>

            <p>
              But Marcus sees a problem: Layer switching is hard. People get stuck. Communities fragment.
            </p>

            <p>
              He builds bridges. Cross-layer translation. Layer-agnostic spaces. Reality fluidity.
            </p>

            <p className="text-xl font-semibold text-[#00D9E8]">
              "Reality isn't fixed. It's a choice. Make it easy to choose."
            </p>
          </div>
        </section>

        {/* ACT III: THE VISIONARY */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#00D9E8]">
            ACT III: THE VISIONARY
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2035:</strong> Marcus at 41. His platform is infrastructure. Governments use it. Corporations use it. Communities use it.
            </p>

            <p>
              He's built a new way to organize reality. Not one truth. Multiple truths. Explicitly constructed. Voluntarily chosen.
            </p>

            <p className="text-2xl font-bold text-[#00D9E8]">
              "We didn't solve verification. We transcended it."
            </p>
          </div>
        </section>

        {/* Related Stories */}
        <section className="border-t-2 pt-16 mt-24" style={{ borderColor: layers[activeLayer].color }}>
          <h3 className="text-2xl font-bold mb-8 text-center">
            Explore Other Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/post-truth/narratives/sarah">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#8B7355] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-[#F5F1E8]">
                <div className="relative z-10">
                  <div className="text-sm text-[#8B7355] font-semibold mb-2">THE GUARDIAN</div>
                  <div className="text-xl font-bold mb-2 text-[#1A1A1A]">Sarah Chen</div>
                  <div className="text-sm text-[#1A1A1A]/80">The Last Witness</div>
                </div>
              </a>
            </Link>
            
            <Link href="/post-truth/narratives/zero">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#E91E8C] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-black">
                <div className="relative z-10">
                  <div className="text-sm text-[#E91E8C] font-semibold mb-2">THE TRICKSTER</div>
                  <div className="text-xl font-bold mb-2 text-white">Zara "Zero" Chen</div>
                  <div className="text-sm text-white/80">The Weaver</div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* Share Section */}
        <section className="text-center py-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 text-[#00D9E8] hover:bg-[#00D9E8] hover:text-black transition-colors uppercase tracking-wider text-sm font-semibold" style={{ borderColor: '#00D9E8' }}>
            <Share2 size={16} />
            Share This Story
          </button>
        </section>
      </article>
    </div>
  );
}

