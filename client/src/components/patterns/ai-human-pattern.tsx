import { useEffect, useRef } from 'react';

interface AIHumanPatternProps {
  className?: string;
}

export function AIHumanPattern({ className = '' }: AIHumanPatternProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Subtle floating animation
    const floatInterval = setInterval(() => {
      if (canvasRef.current) {
        const illustrations = canvasRef.current.querySelectorAll('.illustration-element');
        illustrations.forEach((el, index) => {
          const currentY = parseFloat((el as HTMLElement).dataset.y || '0');
          const newY = Math.sin(Date.now() / 2000 + index) * 3;
          (el as HTMLElement).style.transform = `translateY(${newY}px)`;
          (el as HTMLElement).dataset.y = newY.toString();
        });
      }
    }, 50);

    return () => clearInterval(floatInterval);
  }, []);

  return (
    <div ref={canvasRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Clean light background - editorial style */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Illustrated elements - minimalist style */}
      <div className="absolute inset-0">
        {/* Simple line art illustration elements - abstract geometric shapes representing concepts */}
        
        {/* Left side - Human element representation */}
        <div className="illustration-element absolute left-[8%] top-[20%] transition-transform duration-100">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple human-like circle */}
            <circle cx="40" cy="40" r="25" stroke="#374151" strokeWidth="2" fill="none" opacity="0.15"/>
            <circle cx="40" cy="40" r="15" stroke="#374151" strokeWidth="1.5" fill="none" opacity="0.2"/>
          </svg>
        </div>

        {/* Center - Connection representation */}
        <div className="illustration-element absolute left-[45%] top-[30%] transition-transform duration-100">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="30" x2="50" y2="30" stroke="#0891B2" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3"/>
            <circle cx="30" cy="30" r="4" fill="#0891B2" opacity="0.4"/>
          </svg>
        </div>

        {/* Right side - AI element representation */}
        <div className="illustration-element absolute right-[12%] top-[35%] transition-transform duration-100">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Abstract tech shapes */}
            <rect x="15" y="15" width="40" height="40" stroke="#0891B2" strokeWidth="2" fill="none" opacity="0.15"/>
            <rect x="25" y="25" width="20" height="20" stroke="#0891B2" strokeWidth="1.5" fill="none" opacity="0.25"/>
          </svg>
        </div>

        {/* Bottom illustration - scenario/concept */}
        <div className="illustration-element absolute left-[25%] bottom-[20%] transition-transform duration-100">
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple scene representation */}
            <line x1="20" y1="40" x2="80" y2="40" stroke="#374151" strokeWidth="1.5" opacity="0.2"/>
            <circle cx="35" cy="30" r="8" stroke="#374151" strokeWidth="1.5" fill="none" opacity="0.15"/>
            <rect x="55" y="22" width="15" height="18" stroke="#0891B2" strokeWidth="1.5" fill="none" opacity="0.15"/>
          </svg>
        </div>
      </div>

      {/* Subtle accent shapes in background */}
      <div className="absolute top-[10%] right-[25%] w-32 h-32 border border-cyan-200/20 rounded-full" />
      <div className="absolute bottom-[15%] left-[15%] w-40 h-40 border border-gray-200/30 rounded-full" />

      {/* Question mark or insight indicators - editorial style */}
      <div className="absolute top-[18%] right-[18%]">
        <div className="text-cyan-400/15 text-6xl font-light">?</div>
      </div>

      {/* Minimal color accents */}
      <div
        className="absolute w-[200px] h-[200px] top-[25%] left-[20%] rounded-full opacity-[0.04] blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute w-[180px] h-[180px] bottom-[25%] right-[20%] rounded-full opacity-[0.04] blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(55, 65, 81, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Subtle overlay gradient for text area */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

      {/* Clean line separators - editorial design element */}
      <div className="absolute top-[15%] left-[10%] w-16 h-px bg-cyan-300/20" />
      <div className="absolute bottom-[30%] right-[15%] w-20 h-px bg-gray-300/20" />
    </div>
  );
}

