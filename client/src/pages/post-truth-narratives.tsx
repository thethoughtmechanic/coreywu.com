import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

export default function PostTruthNarratives() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const narratives = [
    {
      id: 1,
      name: 'Sarah Chen',
      storyTitle: 'The Last Witness',
      archetype: 'THE GUARDIAN',
      color: '#7B3FF2',
      image: '/narratives - Sarah Chen.jpeg',
      description: 'Preserving Truth using physical evidence and protecting memory in the ruins',
    },
    {
      id: 2,
      name: 'Marcus Webb',
      storyTitle: 'The Architect of Dreams',
      archetype: 'THE CREATOR',
      color: '#00D9E8',
      image: '/narratives - Marcus Webb.jpeg',
      description: 'Building New Realities by designing explicit reality layers and maintaining their consistency',
    },
    {
      id: 3,
      name: 'Justice Amara Okonkwo',
      storyTitle: 'The Arbitrator',
      archetype: 'THE SAGE',
      color: '#FF00E5',
      image: '/narratives -  justice amara.jpeg',
      description: 'Imposing Order through Judicial Authority by arbitrating truth claims and serving with wisdom',
    },
    {
      id: 4,
      name: 'Dr. Kenji Tanaka',
      storyTitle: 'The Surrender',
      archetype: 'THE MYSTIC',
      color: '#22D3EE',
      image: '/narratives - dr kenji.jpeg',
      description: 'Transcending the Question by accepting uncertainty and prioritizing peace beyond answers',
    },
    {
      id: 5,
      name: 'Zara "Zero" Chen',
      storyTitle: 'The Weaver',
      archetype: 'THE TRICKSTER',
      color: '#E91E8C',
      image: '/narratives - zero chen.jpeg',
      description: 'Adapting Through Ironic Play and embracing chaos to force cultural adaptation through acknowledged fiction',
    },
  ];

  const routes: Record<number, string> = {
    1: '/post-truth/narratives/sarah',
    2: '/post-truth/narratives/marcus',
    3: '/post-truth/narratives/amara',
    4: '/post-truth/narratives/kenji',
    5: '/post-truth/narratives/zero',
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-gray-800/50 bg-[#0A0A0A]/80 backdrop-blur-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <Breadcrumb />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-400 hover:text-[#9933FF] transition-colors rounded hover:bg-gray-900"
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
      <div className="pt-[73px] min-h-screen px-8 max-w-[1800px] mx-auto flex flex-col justify-center py-8 relative z-10">
        <div className="text-center mb-6 relative z-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Five Archetypal Narratives</h1>
          <p className="text-gray-400 text-base">
            Story-based futures through the lives of those who navigate them
          </p>
        </div>

        {/* Narratives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
          {narratives.map((narrative) => {
            const href = routes[narrative.id] || '#';
            
            return (
              <Link key={narrative.id} href={href}>
                <a className="group relative border-2 border-white/30 transition-all duration-300 hover:scale-[1.02] hover:border-white overflow-hidden cursor-pointer block"
                  style={{ height: '480px' }}
                >
                  {/* Portrait Image */}
                  <img
                    src={narrative.image}
                    alt={narrative.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Number overlay - always visible */}
                  <div
                    className="absolute top-4 right-4 text-6xl font-bold opacity-10 text-white transition-opacity duration-300 group-hover:opacity-5"
                  >
                    {narrative.id.toString().padStart(2, '0')}
                  </div>

                  {/* Hover Overlay with Content */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/85 transition-all duration-300 flex flex-col justify-center items-center p-8 opacity-0 group-hover:opacity-100">
                    <div className="text-center space-y-4">
                      <div
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: narrative.color }}
                      >
                        {narrative.archetype}
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-white">
                        {narrative.name}
                      </h2>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {narrative.description}
                      </p>
                      <div
                        className="mt-6 px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-2 border-white/50 group-hover:border-white group-hover:bg-white/10 text-white inline-block"
                      >
                        Read Story →
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
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
