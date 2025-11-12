import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';
import { methodologies } from '@/lib/post-truth-navigation';

export default function PostTruthExplore() {
  const [, setLocation] = useLocation();
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSliceClick = (id: string) => {
    setLocation(`/post-truth/${id}`);
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.35) 1px, transparent 1px)
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(0, 200, 255, 0.6), 0 0 40px rgba(0, 200, 255, 0.4)',
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

      {/* Main Content - 3D Stacked Cards + Grid */}
      <div className="pt-[73px] min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 max-w-[1600px] mx-auto gap-8 lg:gap-12 xl:gap-16 relative z-10">
        {/* Left Side - 3D Stack */}
        <div className="flex-shrink-0 hidden lg:block">
          <div
            className="layer-stack relative"
            style={{
              perspective: '2000px',
              perspectiveOrigin: '50% 50%',
              width: '350px',
              height: '150px',
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-15deg)',
              }}
            >
              {methodologies.map((method, index) => {
                const isHovered = hoveredSlice === method.id;
                const hoveredIndex = methodologies.findIndex(m => m.id === hoveredSlice);

                const baseY = index * -4;
                const baseZ = index * 10;
                const separationDistance = 80;
                let zOffset = baseZ;

                if (hoveredSlice !== null) {
                  if (index < hoveredIndex) {
                    zOffset = baseZ - separationDistance;
                  } else if (index > hoveredIndex) {
                    zOffset = baseZ + separationDistance;
                  }
                }

                const transformString = `
                  rotateX(78deg)
                  rotateZ(-2deg)
                  translateY(${baseY}px)
                  translateZ(${zOffset}px)
                `;

                return (
                  <div
                    key={method.id}
                    className="layer-card absolute left-0 cursor-pointer"
                    style={{
                      top: 0,
                      width: '350px',
                      height: '220px',
                      transform: transformString,
                      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transformStyle: 'preserve-3d',
                      zIndex: isHovered ? 100 : undefined,
                      background: `linear-gradient(135deg, rgba(${method.colorRgb}, 0.25) 0%, rgba(${method.colorRgb}, 0.15) 100%)`,
                      border: isHovered ? `2px solid ${method.color}` : `1.5px solid ${method.color}`,
                      borderRadius: '2px',
                      boxShadow: isHovered
                        ? `
                          0 20px 50px rgba(0, 0, 0, 0.95),
                          0 0 0 2px ${method.color},
                          0 0 40px rgba(${method.colorRgb}, 0.5),
                          0 0 80px rgba(${method.colorRgb}, 0.3)
                        `
                        : `
                          0 15px 35px rgba(0, 0, 0, 0.9),
                          inset 0 1px 0 rgba(255, 255, 255, 0.05),
                          0 0 20px rgba(${method.colorRgb}, 0.15)
                        `,
                      animation: `cardDropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s backwards`,
                    }}
                    onMouseEnter={() => setHoveredSlice(method.id)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => handleSliceClick(method.id)}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 pointer-events-none"
                      style={{
                        height: isHovered ? '10px' : '6px',
                        background: method.color,
                        opacity: isHovered ? 0.9 : 0.6,
                        borderRadius: '2px 2px 0 0',
                        boxShadow: isHovered
                          ? `0 0 25px ${method.color}, 0 0 50px rgba(${method.colorRgb}, 0.6)`
                          : `0 0 15px ${method.color}, 0 0 30px rgba(${method.colorRgb}, 0.3)`,
                        transition: 'all 0.4s ease',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Simple Card Grid */}
        <div className="flex-1 max-w-[800px]">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            8 futures lenses to explore post-truth:
          </h2>
          <div className="grid grid-cols-2 gap-4">
          {methodologies.map((method) => {
            const isHovered = hoveredSlice === method.id;
            return (
              <div
                key={method.id}
                className="cursor-pointer p-5 rounded border-2 transition-all duration-300 bg-white"
                style={{
                  borderColor: isHovered ? method.color : '#e5e5e5',
                  boxShadow: isHovered
                    ? `0 8px 24px rgba(0, 0, 0, 0.2), 0 0 30px rgba(${method.colorRgb}, 0.4)`
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
                }}
                onMouseEnter={() => setHoveredSlice(method.id)}
                onMouseLeave={() => setHoveredSlice(null)}
                onClick={() => handleSliceClick(method.id)}
              >
                <h3
                  className="text-lg font-bold tracking-wider mb-2 transition-colors duration-300"
                  style={{
                    color: isHovered ? method.color : '#000000',
                  }}
                >
                  {method.title.toUpperCase()}
                </h3>
                <p className="text-xs leading-relaxed text-black/70">
                  {method.description}
                </p>
              </div>
            );
          })}
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

        @keyframes cardDropIn {
          from {
            opacity: 0;
            transform:
              rotateX(78deg)
              rotateZ(-2deg)
              translateZ(-100px)
              translateY(-50px);
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}}></style>
    </div>
  );
}
