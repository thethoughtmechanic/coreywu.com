import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';

type Theme = 'warm' | 'cyber' | 'mono';

export default function PostTruthLanding() {
  const [, setLocation] = useLocation();
  const [lampOn, setLampOn] = useState(false);
  const [theme, setTheme] = useState<Theme>('mono');
  const [switchPosition, setSwitchPosition] = useState<'left' | 'right'>('left');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const cycleTheme = () => {
    setSwitchPosition(current => current === 'left' ? 'right' : 'left');
    setTheme(current => {
      if (current === 'mono') return 'cyber';
      if (current === 'cyber') return 'warm';
      return 'mono';
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'reality') {
      setLocation('/newspaper');
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-start overflow-hidden transition-all duration-1000"
      style={{
        background: lampOn
          ? theme === 'warm'
            ? 'radial-gradient(circle at 50% 0%, #1A1612 0%, #000000 50%)'
            : theme === 'cyber'
            ? 'radial-gradient(circle at 50% 0%, #0A0A1A 0%, #000000 50%)'
            : 'radial-gradient(circle at 50% 0%, #0A0A0A 0%, #000000 50%)'
          : '#000000',
      }}
    >
      {/* Theme-specific Grid Background - Only visible when lamp is on */}
      {lampOn && theme === 'cyber' && (
        <>
          {/* Horizontal lines */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(139, 92, 246, 0.15) 39px, rgba(139, 92, 246, 0.15) 40px)',
              animation: 'gridFadeIn 1.5s ease-in',
            }}
          />
          {/* Vertical lines */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(139, 92, 246, 0.1) 39px, rgba(139, 92, 246, 0.1) 40px)',
              animation: 'gridFadeIn 1.5s ease-in',
            }}
          />
          {/* Purple glow overlay */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
              animation: 'gridFadeIn 2s ease-in',
            }}
          />
        </>
      )}

      {/* Theme Toggle Switch - Bottom Right - Only visible when lamp is on */}
      {lampOn && (
        <div className="fixed bottom-8 right-8 z-20">
          <div
            className="relative cursor-pointer group"
            onClick={cycleTheme}
            style={{
              width: '70px',
              height: '85px',
            }}
          >
            {/* Base housing */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: '60px',
                height: '25px',
                background: theme === 'warm'
                  ? 'linear-gradient(to bottom, #3A3A3A, #2A2A2A)'
                  : theme === 'cyber'
                  ? 'linear-gradient(to bottom, #2A2A3A, #1A1A2A)'
                  : 'linear-gradient(to bottom, #353535, #252525)',
                borderRadius: '4px',
                border: '2px solid #4A4A4A',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.05)',
              }}
            />

            {/* Circular mechanism */}
            <div
              className="absolute bottom-[15px] left-1/2 -translate-x-1/2"
              style={{
                width: '28px',
                height: '28px',
                background: 'radial-gradient(circle at 30% 30%, #4A4A4A, #2A2A2A)',
                borderRadius: '50%',
                border: '2px solid #3A3A3A',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Center pivot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#1A1A1A',
                  borderRadius: '50%',
                  border: '1px solid #0A0A0A',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              />
            </div>

            {/* Lever stick - anchored at bottom, pivots from center */}
            <div
              className="absolute transition-all duration-500"
              style={{
                bottom: '29px',
                left: '50%',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${
                  switchPosition === 'left' ? '-30deg' : '30deg'
                })`,
              }}
            >
              {/* Metal stick */}
              <div
                style={{
                  width: '3px',
                  height: '48px',
                  background: 'linear-gradient(to right, #8A8A8A, #CACACA, #8A8A8A)',
                  borderRadius: '1.5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                }}
              />
              {/* Ball handle at top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2"
                style={{
                  width: '14px',
                  height: '14px',
                  background: theme === 'warm'
                    ? 'radial-gradient(circle at 30% 30%, #FFD700, #FFA500)'
                    : theme === 'cyber'
                    ? 'radial-gradient(circle at 30% 30%, #22D3EE, #8B5CF6)'
                    : 'radial-gradient(circle at 30% 30%, #FFFFFF, #A0A0A0)',
                  borderRadius: '50%',
                  boxShadow: theme === 'warm'
                    ? '0 2px 6px rgba(255, 215, 0, 0.4), 0 0 12px rgba(255, 165, 0, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.2)'
                    : theme === 'cyber'
                    ? '0 2px 6px rgba(34, 211, 238, 0.4), 0 0 12px rgba(139, 92, 246, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.2)'
                    : '0 2px 6px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Lamp */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {/* Ceiling mount */}
        <div className="w-2 h-8 bg-gradient-to-b from-gray-700 to-gray-800 mx-auto"></div>

        {/* Lamp fixture */}
        <div
          className="cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={() => setLampOn(!lampOn)}
        >
          {/* Top cap - modern minimal */}
          <div className="w-16 h-2 bg-gradient-to-b from-gray-800 to-gray-900 mx-auto"></div>
          <div className="w-14 h-1 bg-gradient-to-b from-gray-700 to-gray-800 mx-auto"></div>

          {/* Lamp body - sleek cone */}
          <div
            className="w-24 h-20 mx-auto relative transition-all duration-500"
            style={{
              background: lampOn
                ? theme === 'warm'
                  ? 'linear-gradient(to bottom, rgba(250, 200, 100, 0.95), rgba(255, 220, 130, 0.85))'
                  : theme === 'cyber'
                  ? 'linear-gradient(to bottom, rgba(34, 211, 238, 0.95), rgba(139, 92, 246, 0.85))'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(200, 200, 200, 0.8))'
                : 'linear-gradient(to bottom, #1A1A1A, #0F0F0F)',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
              border: lampOn ? 'none' : '1px solid #2A2A2A',
            }}
          >
            {/* Glow effect when on */}
            {lampOn && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                  boxShadow: theme === 'warm'
                    ? '0 0 30px rgba(255, 210, 100, 0.6), 0 0 60px rgba(255, 220, 100, 0.3)'
                    : theme === 'cyber'
                    ? '0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)'
                    : '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)',
                }}
              />
            )}
          </div>

          {/* Pull chain */}
          <div className="flex flex-col items-center mt-1">
            <div
              className="w-0.5 bg-gray-600 transition-all duration-300"
              style={{
                height: lampOn ? '48px' : '32px',
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-full transition-colors duration-300"
              style={{
                background: lampOn
                  ? theme === 'warm'
                    ? '#FFD700'
                    : theme === 'cyber'
                    ? '#22D3EE'
                    : '#FFFFFF'
                  : '#444',
                boxShadow: lampOn
                  ? theme === 'warm'
                    ? '0 0 10px rgba(255, 215, 0, 0.8)'
                    : theme === 'cyber'
                    ? '0 0 10px rgba(34, 211, 238, 0.8)'
                    : '0 0 10px rgba(255, 255, 255, 0.8)'
                  : 'none',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Conical light beam when lamp is on */}
      {lampOn && (
        <>
          {/* Outermost light cone - widest spread */}
          <div
            className="fixed pointer-events-none transition-all duration-1000"
            style={{
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '700px solid transparent',
              borderRight: '700px solid transparent',
              borderTop: theme === 'warm'
                ? '1100px solid rgba(255, 220, 100, 0.05)'
                : theme === 'cyber'
                ? '1100px solid rgba(34, 211, 238, 0.06)'
                : '1100px solid rgba(255, 255, 255, 0.04)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(60px)',
              animation: 'fadeIn 1s ease-in',
            }}
          />
          {/* Medium-wide light cone */}
          <div
            className="fixed pointer-events-none transition-all duration-1000"
            style={{
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '500px solid transparent',
              borderRight: '500px solid transparent',
              borderTop: theme === 'warm'
                ? '950px solid rgba(255, 220, 100, 0.08)'
                : theme === 'cyber'
                ? '950px solid rgba(34, 211, 238, 0.1)'
                : '950px solid rgba(255, 255, 255, 0.06)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(40px)',
              animation: 'fadeIn 1s ease-in',
            }}
          />
          {/* Medium light cone */}
          <div
            className="fixed pointer-events-none transition-all duration-1000"
            style={{
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '350px solid transparent',
              borderRight: '350px solid transparent',
              borderTop: theme === 'warm'
                ? '800px solid rgba(255, 220, 100, 0.12)'
                : theme === 'cyber'
                ? '800px solid rgba(139, 92, 246, 0.08)'
                : '800px solid rgba(255, 255, 255, 0.08)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(25px)',
              animation: 'fadeIn 1s ease-in',
            }}
          />
          {/* Bright center beam */}
          <div
            className="fixed pointer-events-none transition-all duration-1000"
            style={{
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '200px solid transparent',
              borderRight: '200px solid transparent',
              borderTop: theme === 'warm'
                ? '650px solid rgba(255, 220, 100, 0.18)'
                : theme === 'cyber'
                ? '650px solid rgba(34, 211, 238, 0.15)'
                : '650px solid rgba(255, 255, 255, 0.12)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(15px)',
              animation: 'fadeIn 1s ease-in',
            }}
          />
          {/* Brightest center */}
          <div
            className="fixed pointer-events-none transition-all duration-1000"
            style={{
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '100px solid transparent',
              borderRight: '100px solid transparent',
              borderTop: theme === 'warm'
                ? '500px solid rgba(255, 220, 100, 0.22)'
                : theme === 'cyber'
                ? '500px solid rgba(34, 211, 238, 0.2)'
                : '500px solid rgba(255, 255, 255, 0.15)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'blur(8px)',
              animation: 'fadeIn 1s ease-in',
            }}
          />
        </>
      )}

      {/* Content - Only visible when lamp is on */}
      <div
        className="flex flex-col items-center justify-center min-h-screen w-full transition-opacity duration-1000"
        style={{
          opacity: lampOn ? 1 : 0,
          pointerEvents: lampOn ? 'auto' : 'none',
        }}
      >
        <div className="text-center space-y-5 px-6 relative">
          {/* Main Title */}
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight transition-all duration-500 relative z-10"
            style={{
              fontFamily: theme === 'warm'
                ? 'Georgia, "Garamond", "Times New Roman", serif'
                : theme === 'cyber'
                ? 'var(--font-orbitron), monospace'
                : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: theme === 'warm' ? '-0.01em' : theme === 'cyber' ? '0.05em' : '0.02em',
              textShadow: theme === 'cyber' ? '0 0 30px rgba(139, 92, 246, 0.5)' : 'none',
              fontStyle: theme === 'warm' ? 'italic' : 'normal',
            }}
          >
            POST-TRUTH FUTURES
          </h1>

          {/* Author */}
          <p
            className="text-base md:text-lg transition-all duration-500"
            style={{
              fontFamily: theme === 'warm'
                ? 'Georgia, "Garamond", "Times New Roman", serif'
                : theme === 'cyber'
                ? 'var(--font-orbitron), monospace'
                : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: theme === 'warm' ? '#D8D8D8' : theme === 'cyber' ? '#22D3EE' : '#CCCCCC',
              fontWeight: theme === 'warm' ? 300 : theme === 'cyber' ? 400 : 300,
              letterSpacing: theme === 'cyber' ? '0.1em' : '0.05em',
              textShadow: theme === 'cyber' ? '0 0 15px rgba(34, 211, 238, 0.5)' : 'none',
              fontStyle: theme === 'warm' ? 'italic' : 'normal',
            }}
          >
            by Corey Wu
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-56 px-4 py-2 border rounded text-center text-sm transition-all duration-300 focus:outline-none ${
                  error
                    ? 'border-red-500 animate-shake'
                    : theme === 'warm'
                    ? 'border-gray-400 focus:border-yellow-500/70'
                    : theme === 'cyber'
                    ? 'border-purple-500/50 focus:border-cyan-400/80'
                    : 'border-gray-500 focus:border-white/70'
                }`}
                style={{
                  fontFamily: theme === 'warm'
                    ? 'Georgia, "Garamond", "Times New Roman", serif'
                    : theme === 'cyber'
                    ? '"Courier New", Courier, monospace'
                    : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  backgroundColor: theme === 'cyber' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                  boxShadow: error
                    ? '0 0 20px rgba(239, 68, 68, 0.5)'
                    : lampOn
                    ? theme === 'warm'
                      ? '0 4px 20px rgba(255, 223, 0, 0.15)'
                      : theme === 'cyber'
                      ? '0 4px 20px rgba(139, 92, 246, 0.2)'
                      : '0 4px 20px rgba(255, 255, 255, 0.05)'
                    : 'none',
                  color: '#FFFFFF'
                }}
              />
            </div>
            <div className="mt-8">
            <div
              className={`px-8 py-3 text-center transition-all duration-300 tracking-wider ${
                theme === 'warm'
                  ? 'text-gray-300'
                  : theme === 'cyber'
                  ? 'text-purple-400'
                  : 'text-gray-400'
              }`}
              style={{
                fontFamily: theme === 'warm'
                  ? 'Georgia, "Garamond", "Times New Roman", serif'
                  : theme === 'cyber'
                  ? '"Courier New", Courier, monospace'
                  : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: theme === 'cyber' ? 600 : 400,
                fontSize: '0.9rem',
                letterSpacing: theme === 'cyber' ? '0.2em' : '0.15em',
                textShadow: lampOn && theme === 'cyber' ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
                opacity: 0.7
              }}
            >
              COMING SOON
            </div>
          </div>
          </form>

        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gridFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}}></style>
    </div>
  );
}