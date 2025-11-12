import { useEffect, useRef } from 'react';

interface AIGovernancePatternProps {
  className?: string;
}

export function AIGovernancePattern({ className = '' }: AIGovernancePatternProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Subtle pulse animation for UI elements
    const pulseInterval = setInterval(() => {
      if (canvasRef.current) {
        const panels = canvasRef.current.querySelectorAll('.ui-panel');
        panels.forEach((panel) => {
          (panel as HTMLElement).style.opacity = '0.12';
          setTimeout(() => {
            (panel as HTMLElement).style.opacity = '0.08';
          }, 1000);
        });
      }
    }, 3000);

    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div ref={canvasRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark professional base - slate/navy tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950" />

      {/* Quadrant-inspired layout - representing decision matrix */}
      <div className="absolute inset-0">
        {/* Top-left quadrant overlay */}
        <div
          className="ui-panel absolute w-[45%] h-[45%] top-[5%] left-[5%] border border-cyan-500/10 rounded transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, transparent 50%)',
            opacity: 0.08,
          }}
        />
        
        {/* Top-right quadrant overlay */}
        <div
          className="ui-panel absolute w-[45%] h-[45%] top-[5%] right-[5%] border border-purple-500/10 rounded transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(225deg, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
            opacity: 0.08,
          }}
        />

        {/* Bottom-left quadrant overlay */}
        <div
          className="ui-panel absolute w-[45%] h-[45%] bottom-[5%] left-[5%] border border-teal-600/10 rounded transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(45deg, rgba(13, 148, 136, 0.08) 0%, transparent 50%)',
            opacity: 0.08,
          }}
        />

        {/* Bottom-right quadrant overlay */}
        <div
          className="ui-panel absolute w-[45%] h-[45%] bottom-[5%] right-[5%] border border-emerald-600/10 rounded transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(315deg, rgba(5, 150, 105, 0.08) 0%, transparent 50%)',
            opacity: 0.08,
          }}
        />
      </div>

      {/* Professional grid - dashboard aesthetic */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(6, 182, 212, 0.15) 40px,
              rgba(6, 182, 212, 0.15) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(6, 182, 212, 0.1) 40px,
              rgba(6, 182, 212, 0.1) 41px
            )
          `,
        }}
      />

      {/* Corner accent elements - UI chrome */}
      <div className="absolute top-[8%] left-[8%] w-8 h-8 border-l-2 border-t-2 border-cyan-400/20" />
      <div className="absolute top-[8%] right-[8%] w-8 h-8 border-r-2 border-t-2 border-cyan-400/20" />
      <div className="absolute bottom-[8%] left-[8%] w-8 h-8 border-l-2 border-b-2 border-cyan-400/20" />
      <div className="absolute bottom-[8%] right-[8%] w-8 h-8 border-r-2 border-b-2 border-cyan-400/20" />

      {/* Professional glow accents - less vibrant than cyberpunk */}
      <div
        className="absolute w-[280px] h-[280px] top-[15%] right-[10%] rounded-full opacity-10 blur-[50px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute w-[260px] h-[260px] bottom-[15%] left-[15%] rounded-full opacity-8 blur-[50px]"
        style={{
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Data point indicators */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/25 rounded-full animate-data-flow"
            style={{
              left: `${(i * 17 + 10) % 90}%`,
              top: `${(i * 23 + 15) % 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + i * 0.4}s`,
              boxShadow: '0 0 4px rgba(6, 182, 212, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none animate-scan-slow"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(6, 182, 212, 0.1) 3px, rgba(6, 182, 212, 0.1) 4px)',
        }}
      />

      {/* Centerpoint indicator - decision nexus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2">
        <div className="w-full h-full bg-cyan-400/30 rounded-full blur-sm" />
        <div className="absolute inset-0 w-full h-full bg-cyan-400/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* CSS for animations */}
      <style>{`
        @keyframes data-flow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(8px, -12px) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes scan-slow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        .animate-data-flow {
          animation: data-flow 8s ease-in-out infinite;
        }
        
        .animate-scan-slow {
          animation: scan-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

