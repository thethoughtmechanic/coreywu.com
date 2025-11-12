import { useState } from 'react';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

const steepvForces = [
  { letter: 'S', title: 'Social', color: '#FF6B6B' },
  { letter: 'T', title: 'Technological', color: '#4ECDC4' },
  { letter: 'E', title: 'Economic', color: '#FFD93D' },
  { letter: 'E', title: 'Environmental', color: '#6BCF7F' },
  { letter: 'P', title: 'Political', color: '#A770EF' },
  { letter: 'V', title: 'Values', color: '#FF8C42' },
];

export default function PostTruthSteepv() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedForce, setSelectedForce] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 232, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 232, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 217, 232, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(0, 217, 232, 0.6), 0 0 40px rgba(0, 217, 232, 0.4)',
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
      <div className="pt-[73px] min-h-screen px-8 max-w-[1400px] mx-auto flex flex-col justify-center py-4 relative z-10">
        <div className="text-center mb-6 relative z-10">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">STEEPV Lenses</h1>
          <p className="text-gray-400 text-sm">View through multiple domains: Social, Technological, Economic, Environmental, Political, and Values</p>
        </div>

        {/* STEEPV Cards */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          {steepvForces.map((force, index) => (
            <div
              key={index}
              onClick={() => setSelectedForce(selectedForce === index ? null : index)}
              className={`bg-white border-2 p-4 shadow-lg transition-all cursor-pointer hover:scale-105 ${
                selectedForce === index ? 'ring-4 ring-white/50' : ''
              }`}
              style={{
                borderColor: force.color,
                boxShadow: `0 0 20px ${force.color}40`,
                height: '140px'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: force.color }}>
                  {force.letter}
                </div>
                <div className="text-xs font-semibold text-black/80 uppercase tracking-wider">
                  {force.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div 
          className="border-4 border-white p-8 min-h-[280px] flex items-center justify-center"
          style={{
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
          }}
        >
          {selectedForce !== null ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3" style={{ color: steepvForces[selectedForce].color }}>
                {steepvForces[selectedForce].title}
              </h2>
              <p className="text-gray-400 text-base">
                Content for {steepvForces[selectedForce].title} scenarios will appear here...
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
              Select a force above to view scenarios
            </p>
          )}
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

