import { useEffect, useRef } from 'react';

interface PostTruthPatternProps {
  className?: string;
}

export function PostTruthPattern({ className = '' }: PostTruthPatternProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // More aggressive glitch effect
    const glitchInterval = setInterval(() => {
      if (canvasRef.current) {
        const glitchElements = canvasRef.current.querySelectorAll('.glitch-layer');
        glitchElements.forEach((el) => {
          if (Math.random() > 0.5) {
            const shift = Math.random() * 20 - 10;
            (el as HTMLElement).style.transform = `translateX(${shift}px)`;
            (el as HTMLElement).style.filter = `hue-rotate(${Math.random() * 30}deg)`;
            setTimeout(() => {
              (el as HTMLElement).style.transform = 'translateX(0)';
              (el as HTMLElement).style.filter = 'none';
            }, 80);
          }
        });
      }
    }, 1500);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div ref={canvasRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark cyberpunk base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-950" />

      {/* Vibrant neon fragmented layers */}
      <div className="absolute inset-0">
        {/* Cyan glitch layer */}
        <div
          className="glitch-layer absolute w-[70%] h-[45%] top-[15%] left-[10%] transition-all duration-75"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 5%, 98% 100%, 3% 95%)',
            mixBlendMode: 'screen',
            opacity: 0.4,
          }}
        />
        
        {/* Magenta glitch layer - overlapping */}
        <div
          className="glitch-layer absolute w-[65%] h-[50%] top-[20%] left-[25%] transition-all duration-75"
          style={{
            background: 'linear-gradient(225deg, rgba(236, 72, 153, 0.7) 0%, rgba(219, 39, 119, 0.4) 50%, transparent 65%)',
            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)',
            mixBlendMode: 'screen',
            opacity: 0.5,
          }}
        />

        {/* Purple accent layer */}
        <div
          className="glitch-layer absolute w-[55%] h-[40%] top-[45%] left-[35%] transition-all duration-75"
          style={{
            background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 60%)',
            clipPath: 'polygon(8% 15%, 92% 0, 100% 85%, 0% 100%)',
            mixBlendMode: 'screen',
            opacity: 0.45,
          }}
        />

        {/* Red/pink accent */}
        <div
          className="glitch-layer absolute w-[45%] h-[35%] top-[55%] left-[5%] transition-all duration-75"
          style={{
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.5) 0%, rgba(220, 38, 38, 0.3) 40%, transparent 55%)',
            clipPath: 'polygon(0 20%, 95% 5%, 100% 80%, 5% 100%)',
            mixBlendMode: 'screen',
            opacity: 0.35,
          }}
        />
      </div>

      {/* Digital grid - more visible */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(34, 211, 238, 0.3) 1px,
              rgba(34, 211, 238, 0.3) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(236, 72, 153, 0.2) 1px,
              rgba(236, 72, 153, 0.2) 2px
            )
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Scanlines - more prominent */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none animate-scanline"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.15) 2px, rgba(34, 211, 238, 0.15) 3px)',
        }}
      />

      {/* Neon glow accents */}
      <div
        className="absolute w-[300px] h-[300px] top-[10%] right-[5%] rounded-full opacity-25 blur-[60px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, transparent 70%)',
          animationDuration: '4s',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] bottom-[10%] left-[10%] rounded-full opacity-20 blur-[70px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, transparent 70%)',
          animationDuration: '5s',
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Floating neon particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-cyberpunk"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 19 + 10) % 85}%`,
              background: i % 3 === 0 
                ? 'rgba(34, 211, 238, 0.6)' 
                : i % 3 === 1 
                ? 'rgba(236, 72, 153, 0.6)' 
                : 'rgba(168, 85, 247, 0.5)',
              boxShadow: i % 3 === 0 
                ? '0 0 8px rgba(34, 211, 238, 0.8)' 
                : i % 3 === 1 
                ? '0 0 8px rgba(236, 72, 153, 0.8)' 
                : '0 0 8px rgba(168, 85, 247, 0.7)',
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Digital noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-noise"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* CSS for animations */}
      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes float-cyberpunk {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          33% {
            transform: translate(15px, -25px);
            opacity: 0.7;
          }
          66% {
            transform: translate(-10px, 15px);
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes noise {
          0%, 100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(-10%, 5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          40% {
            transform: translate(-5%, 15%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          60% {
            transform: translate(15%, 0);
          }
          70% {
            transform: translate(0, 10%);
          }
          80% {
            transform: translate(-15%, 0);
          }
          90% {
            transform: translate(10%, 5%);
          }
        }
        
        .animate-scanline {
          animation: scanline 6s linear infinite;
        }
        
        .animate-float-cyberpunk {
          animation: float-cyberpunk 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-noise {
          animation: noise 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
}

