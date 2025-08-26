
import React from 'react';

interface GrassIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GrassIcon1: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path 
      d="M12 22 C10 18, 8 14, 9 10 C10 6, 11 4, 12 2 C13 4, 14 6, 15 10 C16 14, 14 18, 12 22 Z" 
      fill="url(#grass1)" 
      stroke="#15803d" 
      strokeWidth="0.5"
    />
    <path 
      d="M8 20 C7 17, 6 15, 7 12 C8 9, 9 8, 10 6" 
      fill="none" 
      stroke="#22c55e" 
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const GrassIcon2: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path 
      d="M6 22 C5 19, 4 16, 5 13 C6 10, 7 8, 8 6 C9 8, 10 10, 11 13 C12 16, 10 19, 8 22 Z" 
      fill="url(#grass2)" 
      stroke="#047857" 
      strokeWidth="0.5"
    />
    <path 
      d="M12 22 C11 18, 10 14, 11 10 C12 6, 13 4, 14 2 C15 4, 16 6, 17 10 C18 14, 16 18, 14 22 Z" 
      fill="url(#grass2)" 
      stroke="#047857" 
      strokeWidth="0.5"
    />
    <path 
      d="M18 20 C17 17, 16 15, 17 12 C18 9, 19 8, 20 6" 
      fill="none" 
      stroke="#10b981" 
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const GrassIcon3: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#65a30d" />
        <stop offset="100%" stopColor="#4d7c0f" />
      </linearGradient>
    </defs>
    <path 
      d="M12 22 C11 19, 9 16, 10 12 C11 8, 12 5, 13 3 C14 5, 15 8, 16 12 C17 16, 15 19, 13 22 Z" 
      fill="url(#grass3)" 
      stroke="#365314" 
      strokeWidth="0.5"
    />
    <path 
      d="M7 21 C6 18, 5 15, 6 11 C7 7, 8 5, 9 3" 
      fill="none" 
      stroke="#84cc16" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path 
      d="M17 21 C18 18, 19 15, 18 11 C17 7, 16 5, 15 3" 
      fill="none" 
      stroke="#84cc16" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const GrassIcon4: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass4" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path 
      d="M9 22 C8 20, 7 18, 8 15 C9 12, 10 10, 11 8 C12 10, 13 12, 14 15 C15 18, 13 20, 12 22 Z" 
      fill="url(#grass4)" 
      stroke="#14532d" 
      strokeWidth="0.5"
    />
    <path 
      d="M12 22 C12 19, 11 16, 12 13 C13 10, 14 8, 15 6 C16 8, 17 10, 18 13 C19 16, 17 19, 16 22 Z" 
      fill="url(#grass4)" 
      stroke="#14532d" 
      strokeWidth="0.5"
    />
    <path 
      d="M5 20 C4 18, 3 16, 4 14 C5 12, 6 11, 7 10" 
      fill="none" 
      stroke="#22c55e" 
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const GrassIcon5: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass5" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <path 
      d="M12 22 C10 19, 8 15, 9 11 C10 7, 11 4, 12 2 C13 4, 14 7, 15 11 C16 15, 14 19, 12 22 Z" 
      fill="url(#grass5)" 
      stroke="#064e3b" 
      strokeWidth="0.5"
    />
    <ellipse cx="12" cy="8" rx="1" ry="2" fill="#34d399" opacity="0.6" />
    <ellipse cx="12" cy="14" rx="0.8" ry="1.5" fill="#6ee7b7" opacity="0.4" />
  </svg>
);

export const GrassIcon6: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass6" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#84cc16" />
        <stop offset="100%" stopColor="#65a30d" />
      </linearGradient>
    </defs>
    <path 
      d="M8 22 C7 20, 6 18, 7 15 C8 12, 9 10, 10 8" 
      fill="none" 
      stroke="url(#grass6)" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path 
      d="M12 22 C11 19, 10 16, 11 12 C12 8, 13 5, 14 3" 
      fill="none" 
      stroke="url(#grass6)" 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path 
      d="M16 22 C15 20, 14 18, 15 15 C16 12, 17 10, 18 8" 
      fill="none" 
      stroke="url(#grass6)" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="10" cy="12" r="0.5" fill="#a3e635" />
    <circle cx="14" cy="10" r="0.5" fill="#a3e635" />
  </svg>
);

export const GrassIcon7: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass7" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <path 
      d="M12 22 C11 20, 9 18, 10 15 C11 12, 12 9, 13 7 C14 9, 15 12, 16 15 C17 18, 15 20, 13 22 Z" 
      fill="url(#grass7)" 
      stroke="#064e3b" 
      strokeWidth="0.5"
    />
    <path 
      d="M6 21 C5 19, 4 17, 5 14 C6 11, 7 9, 8 7" 
      fill="none" 
      stroke="#10b981" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path 
      d="M18 21 C19 19, 20 17, 19 14 C18 11, 17 9, 16 7" 
      fill="none" 
      stroke="#10b981" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path 
      d="M10 18 C9 16, 8 14, 9 12" 
      fill="none" 
      stroke="#34d399" 
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path 
      d="M16 18 C17 16, 18 14, 17 12" 
      fill="none" 
      stroke="#34d399" 
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const GrassIcon8: React.FC<GrassIconProps> = ({ className = "w-4 h-4", style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grass8" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="50%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path 
      d="M5 22 C4 20, 3 18, 4 16 C5 14, 6 12, 7 10" 
      fill="none" 
      stroke="url(#grass8)" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path 
      d="M9 22 C8 19, 7 16, 8 13 C9 10, 10 7, 11 5" 
      fill="none" 
      stroke="url(#grass8)" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path 
      d="M13 22 C12 19, 11 16, 12 13 C13 10, 14 7, 15 5" 
      fill="none" 
      stroke="url(#grass8)" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path 
      d="M17 22 C16 20, 15 18, 16 16 C17 14, 18 12, 19 10" 
      fill="none" 
      stroke="url(#grass8)" 
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="7" cy="15" r="0.3" fill="#4ade80" />
    <circle cx="11" cy="12" r="0.3" fill="#4ade80" />
    <circle cx="15" cy="12" r="0.3" fill="#4ade80" />
    <circle cx="17" cy="15" r="0.3" fill="#4ade80" />
  </svg>
);

// Component to randomly disperse grass icons
interface GrassFieldProps {
  count?: number;
  className?: string;
}

export const GrassField: React.FC<GrassFieldProps> = ({ count = 20, className = "" }) => {
  const grassIcons = [GrassIcon1, GrassIcon2, GrassIcon3, GrassIcon4, GrassIcon5, GrassIcon6, GrassIcon7, GrassIcon8];
  
  // Generate random positions and icons
  const grassElements = Array.from({ length: count }, (_, i) => {
    const GrassComponent = grassIcons[Math.floor(Math.random() * grassIcons.length)];
    const left = Math.random() * 100; // 0-100%
    const bottom = Math.random() * 30; // 0-30% from bottom
    const size = 12 + Math.random() * 16; // 12-28px
    const opacity = 0.3 + Math.random() * 0.5; // 0.3-0.8
    const rotation = -15 + Math.random() * 30; // -15deg to 15deg
    
    return {
      id: i,
      Component: GrassComponent,
      style: {
        position: 'absolute' as const,
        left: `${left}%`,
        bottom: `${bottom}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none' as const,
        zIndex: -1,
      }
    };
  });

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {grassElements.map(({ id, Component, style }) => (
        <Component key={id} style={style} />
      ))}
    </div>
  );
};
