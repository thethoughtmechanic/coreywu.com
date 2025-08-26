
import React from 'react';

// Detailed grass icon variants based on the reference image
const GrassVariants = {
  // Simple tall grass blades
  tall1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M8,20 Q7,16 8,12 Q6,8 9,4 Q8,2 10,0 M12,20 Q13,17 11,13 Q12,9 14,5 Q13,3 15,0 M16,20 Q15,16 16,11 Q14,7 17,3 Q16,1 18,0 M20,20 Q21,18 19,14 Q20,10 22,6 Q21,4 23,0 M24,20 Q23,17 24,12 Q22,8 25,4 Q24,2 26,0 M28,20 Q29,16 27,11 Q28,7 30,3 Q29,1 31,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Dense grass clump with varied heights
  clump1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 L5,15 Q4,12 6,8 Q5,5 7,2 Q6,1 8,0 M9,20 L9,18 Q8,15 10,11 Q9,8 11,5 Q10,3 12,0 M13,20 L13,16 Q12,13 14,9 Q13,6 15,3 Q14,1 16,0 M17,20 L17,19 Q16,16 18,12 Q17,9 19,6 Q18,4 20,0 M21,20 L21,17 Q20,14 22,10 Q21,7 23,4 Q22,2 24,0 M25,20 L25,18 Q24,15 26,11 Q25,8 27,5 Q26,3 28,0 M29,20 L29,19 Q28,16 30,13 Q29,10 31,7 Q30,5 32,2 M33,20 L33,18 Q32,15 34,12 Q33,9 35,6 Q34,4 36,1" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Wide grass patch
  wide1: (
    <svg viewBox="0 0 50 20" className="w-full h-full">
      <path d="M2,20 L48,20 L46,18 Q45,15 47,12 Q44,9 46,6 Q43,3 45,0 M4,20 Q3,17 5,13 Q4,10 6,6 Q5,3 7,0 M10,20 Q9,18 11,14 Q10,11 12,7 Q11,4 13,1 M16,20 Q15,17 17,13 Q16,10 18,6 Q17,3 19,0 M22,20 Q21,18 23,14 Q22,11 24,7 Q23,4 25,1 M28,20 Q27,17 29,13 Q28,10 30,6 Q29,3 31,0 M34,20 Q33,18 35,14 Q34,11 36,7 Q35,4 37,1 M40,20 Q39,17 41,13 Q40,10 42,6 Q41,3 43,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Sparse individual blades
  sparse1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M6,20 Q5,17 7,13 Q6,9 8,5 Q7,2 9,0 M18,20 Q17,16 19,12 Q18,8 20,4 Q19,1 21,0 M30,20 Q29,18 31,14 Q30,10 32,6 Q31,3 33,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Curved artistic grass
  curved1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M8,20 Q12,18 10,14 Q15,12 9,8 Q13,6 11,2 Q15,1 12,0 M20,20 Q24,19 22,15 Q27,13 21,9 Q25,7 23,3 Q27,2 24,0 M32,20 Q36,18 34,14 Q39,12 33,8 Q37,6 35,2 Q39,1 36,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Feathery grass with fine details
  feathery1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M5,20 L5,16 Q4,14 6,12 L5,12 Q3,10 5,8 L4,8 Q2,6 4,4 L3,4 Q1,2 3,0 M8,20 L8,17 Q7,15 9,13 L8,13 Q6,11 8,9 L7,9 Q5,7 7,5 L6,5 Q4,3 6,1 M11,20 L11,18 Q10,16 12,14 L11,14 Q9,12 11,10 L10,10 Q8,8 10,6 L9,6 Q7,4 9,2 M14,20 L14,17 Q13,15 15,13 L14,13 Q12,11 14,9 L13,9 Q11,7 13,5 L12,5 Q10,3 12,1 M17,20 L17,18 Q16,16 18,14 L17,14 Q15,12 17,10 L16,10 Q14,8 16,6 L15,6 Q13,4 15,2 M20,20 L20,16 Q19,14 21,12 L20,12 Q18,10 20,8 L19,8 Q17,6 19,4 L18,4 Q16,2 18,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Bushy thick grass
  bushy1: (
    <svg viewBox="0 0 45 20" className="w-full h-full">
      <path d="M2,20 L43,20 L41,19 Q40,17 42,15 Q39,13 41,11 Q38,9 40,7 Q37,5 39,3 Q36,1 38,0 M5,20 Q4,18 6,16 Q3,14 5,12 Q2,10 4,8 Q1,6 3,4 Q0,2 2,0 M8,20 Q7,17 9,15 Q6,13 8,11 Q5,9 7,7 Q4,5 6,3 Q3,1 5,0 M11,20 Q10,18 12,16 Q9,14 11,12 Q8,10 10,8 Q7,6 9,4 Q6,2 8,0 M14,20 Q13,17 15,15 Q12,13 14,11 Q11,9 13,7 Q10,5 12,3 Q9,1 11,0 M17,20 Q16,18 18,16 Q15,14 17,12 Q14,10 16,8 Q13,6 15,4 Q12,2 14,0 M20,20 Q19,17 21,15 Q18,13 20,11 Q17,9 19,7 Q16,5 18,3 Q15,1 17,0 M23,20 Q22,18 24,16 Q21,14 23,12 Q20,10 22,8 Q19,6 21,4 Q18,2 20,0 M26,20 Q25,17 27,15 Q24,13 26,11 Q23,9 25,7 Q22,5 24,3 Q21,1 23,0 M29,20 Q28,18 30,16 Q27,14 29,12 Q26,10 28,8 Q25,6 27,4 Q24,2 26,0 M32,20 Q31,17 33,15 Q30,13 32,11 Q29,9 31,7 Q28,5 30,3 Q27,1 29,0 M35,20 Q34,18 36,16 Q33,14 35,12 Q32,10 34,8 Q31,6 33,4 Q30,2 32,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Spiky detailed grass
  spiky1: (
    <svg viewBox="0 0 40 20" className="w-full h-full">
      <path d="M6,20 L6,18 L5,18 L5,16 L7,16 L7,14 L4,14 L4,12 L8,12 L8,10 L3,10 L3,8 L9,8 L9,6 L2,6 L2,4 L10,4 L10,2 L1,2 L1,0 L11,0 M14,20 L14,17 L13,17 L13,15 L15,15 L15,13 L12,13 L12,11 L16,11 L16,9 L11,9 L11,7 L17,7 L17,5 L10,5 L10,3 L18,3 L18,1 L9,1 L9,0 L19,0 M22,20 L22,19 L21,19 L21,17 L23,17 L23,15 L20,15 L20,13 L24,13 L24,11 L19,11 L19,9 L25,9 L25,7 L18,7 L18,5 L26,5 L26,3 L17,3 L17,1 L27,1 L27,0 M30,20 L30,18 L29,18 L29,16 L31,16 L31,14 L28,14 L28,12 L32,12 L32,10 L27,10 L27,8 L33,8 L33,6 L26,6 L26,4 L34,4 L34,2 L25,2 L25,0 L35,0" 
            fill="currentColor"/>
    </svg>
  ),
  
  // Wispy thin grass
  wispy1: (
    <svg viewBox="0 0 35 20" className="w-full h-full">
      <path d="M7,20 Q6,18 7,16 Q5,14 8,12 Q6,10 9,8 Q7,6 10,4 Q8,2 11,0 M12,20 Q11,17 12,15 Q10,13 13,11 Q11,9 14,7 Q12,5 15,3 Q13,1 16,0 M17,20 Q16,18 17,16 Q15,14 18,12 Q16,10 19,8 Q17,6 20,4 Q18,2 21,0 M22,20 Q21,17 22,15 Q20,13 23,11 Q21,9 24,7 Q22,5 25,3 Q23,1 26,0 M27,20 Q26,18 27,16 Q25,14 28,12 Q26,10 29,8 Q27,6 30,4 Q28,2 31,0" 
            stroke="currentColor" strokeWidth="0.8" fill="none"/>
    </svg>
  ),
  
  // Mixed height cluster
  mixed1: (
    <svg viewBox="0 0 45 20" className="w-full h-full">
      <path d="M5,20 L5,14 Q4,11 6,8 Q5,5 7,2 Q6,1 8,0 M10,20 L10,18 Q9,15 11,12 Q10,9 12,6 Q11,4 13,0 M15,20 L15,16 Q14,13 16,10 Q15,7 17,4 Q16,2 18,0 M20,20 L20,19 Q19,17 21,15 Q20,13 22,11 Q21,9 23,7 Q22,5 24,3 Q23,1 25,0 M27,20 L27,17 Q26,14 28,11 Q27,8 29,5 Q28,3 30,0 M32,20 L32,18 Q31,15 33,12 Q32,9 34,6 Q33,4 35,1 M37,20 L37,19 Q36,17 38,15 Q37,13 39,11 Q38,9 40,7 Q39,5 41,3 Q40,1 42,0" 
            fill="currentColor"/>
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
    const size = Math.random() * 25 + 15; // Random size between 15-40px
    const rotation = (Math.random() - 0.5) * 15; // Random rotation between -7.5 to 7.5 degrees
    
    // Position grass only at bottom edges and corners to avoid text overlap
    const isBottomRow = Math.random() < 0.8; // 80% chance for bottom positioning
    const x = isBottomRow 
      ? Math.random() * 100 // Full width for bottom
      : Math.random() < 0.5 
        ? Math.random() * 12 // Left edge (0-12%)
        : 88 + Math.random() * 12; // Right edge (88-100%)
    
    const y = isBottomRow
      ? 80 + Math.random() * 20 // Bottom area (80-100%)
      : 60 + Math.random() * 30; // Middle to bottom for edges (60-90%)
    
    return (
      <div
        key={i}
        className="absolute pointer-events-none z-0"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size * 0.6}px`,
          transform: `rotate(${rotation}deg)`,
          opacity: Math.random() * 0.3 + 0.15, // Random opacity between 0.15-0.45
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
