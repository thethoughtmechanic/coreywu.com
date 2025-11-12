import { useState } from 'react';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

export default function PostTruthCla() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 59, 92, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 59, 92, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(26, 59, 92, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(26, 59, 92, 0.6), 0 0 40px rgba(26, 59, 92, 0.4)',
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
      <div className="pt-[73px] min-h-screen px-8 max-w-[1800px] mx-auto flex flex-col justify-center py-8 relative z-10">
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Five Myth-Anchored Scenarios</h1>
          <p className="text-gray-400 text-lg">Alternative futures for navigating the post-truth landscape</p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 relative z-10">
          {/* Scenario 01 */}
          <div className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col" style={{ borderColor: '#00D9E8', boxShadow: '0 0 20px rgba(0, 217, 232, 0.2)' }}>
            <div className="relative h-56 bg-gradient-to-b from-black/40 to-black overflow-hidden border-b" style={{ borderColor: 'rgba(0, 217, 232, 0.3)' }}>
              <img src="/CLA 1.png" alt="Technological Salvation" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-3 right-3 text-7xl font-bold opacity-10" style={{ color: '#00D9E8' }}>01</div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(0, 217, 232, 0.7)' }}>Scenario 01</div>
              <h2 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#00D9E8' }}>Technological Salvation</h2>
              <div className="border-l-3 pl-3 py-1" style={{ borderColor: '#00D9E8', borderLeftWidth: '3px' }}>
                <div className="text-xs font-medium" style={{ color: '#00D9E8' }}>
                  Myth: Prometheus the Fire-Bringer
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                "Technology created this problem, technology will solve it."
              </p>
            </div>
          </div>

          {/* Scenario 02 */}
          <div className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col" style={{ borderColor: '#7B3FF2', boxShadow: '0 0 20px rgba(123, 63, 242, 0.2)' }}>
            <div className="relative h-56 bg-gradient-to-b from-black/40 to-black overflow-hidden border-b" style={{ borderColor: 'rgba(123, 63, 242, 0.3)' }}>
              <img src="/CLA 2.png" alt="Guardian State" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-3 right-3 text-7xl font-bold opacity-10" style={{ color: '#7B3FF2' }}>02</div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(123, 63, 242, 0.7)' }}>Scenario 02</div>
              <h2 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#7B3FF2' }}>Guardian State</h2>
              <div className="border-l-3 pl-3 py-1" style={{ borderColor: '#7B3FF2', borderLeftWidth: '3px' }}>
                <div className="text-xs font-medium" style={{ color: '#7B3FF2' }}>
                  Myth: Leviathan the Protector
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                "Order requires authority, chaos requires control."
              </p>
            </div>
          </div>

          {/* Scenario 03 */}
          <div className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col" style={{ borderColor: '#FF00E5', boxShadow: '0 0 20px rgba(255, 0, 229, 0.2)' }}>
            <div className="relative h-56 bg-gradient-to-b from-black/40 to-black overflow-hidden border-b" style={{ borderColor: 'rgba(255, 0, 229, 0.3)' }}>
              <img src="/CLA 3.png" alt="The Great Fragmentation" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-3 right-3 text-7xl font-bold opacity-10" style={{ color: '#FF00E5' }}>03</div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255, 0, 229, 0.7)' }}>Scenario 03</div>
              <h2 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#FF00E5' }}>The Great Fragmentation</h2>
              <div className="border-l-3 pl-3 py-1" style={{ borderColor: '#FF00E5', borderLeftWidth: '3px' }}>
                <div className="text-xs font-medium" style={{ color: '#FF00E5' }}>
                  Myth: Tower of Babel Reimagined
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                "There is no singular truth, only valid perspectives."
              </p>
            </div>
          </div>

          {/* Scenario 04 */}
          <div className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col" style={{ borderColor: '#22D3EE', boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
            <div className="relative h-56 bg-gradient-to-b from-black/40 to-black overflow-hidden border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.3)' }}>
              <img src="/CLA 4.png" alt="Return to the Body" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-3 right-3 text-7xl font-bold opacity-10" style={{ color: '#22D3EE' }}>04</div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(34, 211, 238, 0.7)' }}>Scenario 04</div>
              <h2 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#22D3EE' }}>Return to the Body</h2>
              <div className="border-l-3 pl-3 py-1" style={{ borderColor: '#22D3EE', borderLeftWidth: '3px' }}>
                <div className="text-xs font-medium" style={{ color: '#22D3EE' }}>
                  Myth: Icarus Falls Back to Earth
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                "Only the body is real, the digital is illusion."
              </p>
            </div>
          </div>

          {/* Scenario 05 */}
          <div className="group relative border-2 bg-black/60 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col" style={{ borderColor: '#E91E8C', boxShadow: '0 0 20px rgba(233, 30, 140, 0.2)' }}>
            <div className="relative h-56 bg-gradient-to-b from-black/40 to-black overflow-hidden border-b" style={{ borderColor: 'rgba(233, 30, 140, 0.3)' }}>
              <img src="/CLA 5.png" alt="Post-Truth Acceptance" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-3 right-3 text-7xl font-bold opacity-10" style={{ color: '#E91E8C' }}>05</div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(233, 30, 140, 0.7)' }}>Scenario 05</div>
              <h2 className="text-xl font-bold tracking-tight uppercase leading-tight" style={{ color: '#E91E8C' }}>Post-Truth Acceptance</h2>
              <div className="border-l-3 pl-3 py-1" style={{ borderColor: '#E91E8C', borderLeftWidth: '3px' }}>
                <div className="text-xs font-medium" style={{ color: '#E91E8C' }}>
                  Myth: The Death of the Oracle
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 italic flex-1">
                "Truth is irrelevant, only meaning matters."
              </p>
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
