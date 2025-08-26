
import React from 'react';

// Grass icon variants inspired by the reference image
const GrassVariants = {
  tall1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 Q6,15 4,10 Q5,5 7,0 M10,20 Q11,14 9,8 Q10,3 12,0 M15,20 Q16,16 14,12 Q15,6 17,0 M20,20 Q21,15 19,9 Q20,4 22,0 M25,20 Q26,17 24,13 Q25,7 27,0 M30,20 Q31,16 29,11 Q30,5 32,0 M35,20 Q36,18 34,14 Q35,8 37,0" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  
  clump1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 Q6,15 4,8 Q5,3 7,0 M10,20 Q11,16 9,10 Q10,4 12,0 M15,20 Q16,18 14,14 Q15,8 17,0 M20,20 Q21,17 19,12 Q20,6 22,0 M25,20 Q26,19 24,15 Q25,9 27,0 M30,20 Q31,18 29,13 Q30,7 32,0" 
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="18" cy="18" r="1" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  
  short1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 Q6,18 4,15 Q5,12 7,8 M10,20 Q11,19 9,16 Q10,13 12,9 M15,20 Q16,19 14,16 Q15,13 17,10 M20,20 Q21,18 19,15 Q20,12 22,8 M25,20 Q26,19 24,16 Q25,13 27,9 M30,20 Q31,19 29,16 Q30,13 32,10 M35,20 Q36,19 34,17 Q35,14 37,12" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  
  wide1: (
    <svg viewBox="0 0 50 20" className="w-full h-full">
      <path d="M2,20 L8,20 L6,15 L4,12 L3,8 L5,4 L7,0 M12,20 L18,20 L16,16 L14,13 L13,9 L15,5 L17,0 M22,20 L28,20 L26,17 L24,14 L23,10 L25,6 L27,0 M32,20 L38,20 L36,18 L34,15 L33,11 L35,7 L37,0 M42,20 L48,20 L46,19 L44,16 L43,12 L45,8 L47,0" 
            stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.8"/>
    </svg>
  ),
  
  sparse1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M8,20 Q9,16 7,10 Q8,4 10,0 M20,20 Q21,17 19,12 Q20,6 22,0 M32,20 Q33,18 31,13 Q32,7 34,0" 
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  
  dense1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M3,20 L9,20 L7,16 L5,12 L4,8 L6,4 L8,0 M13,20 L19,20 L17,17 L15,13 L14,9 L16,5 L18,0 M23,20 L29,20 L27,18 L25,14 L24,10 L26,6 L28,0 M33,20 L39,20 L37,19 L35,15 L34,11 L36,7 L38,0" 
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.7"/>
    </svg>
  ),
  
  curved1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 Q8,18 6,14 Q9,10 5,6 Q8,2 10,0 M15,20 Q18,19 16,15 Q19,11 15,7 Q18,3 20,0 M25,20 Q28,18 26,14 Q29,10 25,6 Q28,2 30,0 M35,20 Q38,19 36,15 Q39,11 35,7 Q38,3 40,0" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  
  mixed1: (
    <svg viewBox="0 0 45 20" className="w-full h-full">
      <path d="M5,20 Q6,15 4,9 Q5,3 7,0 M12,20 L18,20 L16,17 L14,13 L13,9 L15,5 L17,0 M25,20 Q26,18 24,13 Q25,7 27,0 M32,20 Q35,19 33,15 Q36,11 32,7 Q35,3 37,0 M42,20 Q43,19 41,16 Q42,13 44,10" 
            stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M12,20 L18,20 L16,17 L14,13" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  ),
  
  tiny1: (
    <svg viewBox="0 0 30 20" className="w-full h-full">
      <path d="M8,20 Q9,19 7,17 Q8,15 10,12 M15,20 Q16,19 14,17 Q15,15 17,13 M22,20 Q23,19 21,18 Q22,16 24,14" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  
  bushy1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 L11,20 L9,18 L7,15 L6,11 L8,7 L10,3 L12,0 M15,20 L21,20 L19,19 L17,16 L16,12 L18,8 L20,4 L22,0 M25,20 L31,20 L29,19 L27,16 L26,12 L28,8 L30,4 L32,0" 
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  )
};

interface GrassIconProps {
  variant: keyof typeof GrassVariants;
  className?: string;
}

const GrassIcon: React.FC<GrassIconProps> = ({ variant, className = "" }) => {
  return (
    <div className={`text-warm-brown/30 ${className}`}>
      {GrassVariants[variant]}
    </div>
  );
};

interface GrassFieldProps {
  count?: number;
}

export const GrassField: React.FC<GrassFieldProps> = ({ count = 25 }) => {
  const variants = Object.keys(GrassVariants) as (keyof typeof GrassVariants)[];
  
  const grassElements = Array.from({ length: count }, (_, i) => {
    const variant = variants[i % variants.length];
    const size = Math.random() * 30 + 20; // Random size between 20-50px
    const rotation = (Math.random() - 0.5) * 20; // Random rotation between -10 to 10 degrees
    
    // Position grass only at bottom edges and corners to avoid text overlap
    const isBottomRow = Math.random() < 0.7; // 70% chance for bottom positioning
    const x = isBottomRow 
      ? Math.random() * 100 // Full width for bottom
      : Math.random() < 0.5 
        ? Math.random() * 15 // Left edge (0-15%)
        : 85 + Math.random() * 15; // Right edge (85-100%)
    
    const y = isBottomRow
      ? 75 + Math.random() * 25 // Bottom area (75-100%)
      : 50 + Math.random() * 40; // Middle to bottom for edges (50-90%)
    
    return (
      <div
        key={i}
        className="absolute pointer-events-none z-0"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size * 0.5}px`,
          transform: `rotate(${rotation}deg)`,
          opacity: Math.random() * 0.4 + 0.2, // Random opacity between 0.2-0.6
        }}
      >
        <GrassIcon variant={variant} className="w-full h-full" />
      </div>
    );
  });

  return (
    <>
      {grassElements}
    </>
  );
};

export default GrassIcon;
