
import React from 'react';

// Geometric shape variants with different styles
const ShapeVariants = {
  // Filled shapes
  filledCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
    </svg>
  ),
  
  filledTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <polygon points="10,2 18,16 2,16" fill="currentColor" />
    </svg>
  ),
  
  filledSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <rect x="3" y="3" width="14" height="14" fill="currentColor" />
    </svg>
  ),
  
  // Dotted/dashed shapes
  dottedCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  ),
  
  dottedTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <polygon points="10,3 17,15 3,15" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  ),
  
  dottedSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  ),
  
  // Shaded/gradient shapes
  shadedCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <radialGradient id="circleGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <circle cx="10" cy="10" r="8" fill="url(#circleGrad)" />
    </svg>
  ),
  
  shadedTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <polygon points="10,2 18,16 2,16" fill="url(#triangleGrad)" />
    </svg>
  ),
  
  shadedSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <linearGradient id="squareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="14" height="14" fill="url(#squareGrad)" />
    </svg>
  ),
  
  // Small accent shapes
  smallCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <circle cx="10" cy="10" r="4" fill="currentColor" />
    </svg>
  ),
  
  smallTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <polygon points="10,6 14,14 6,14" fill="currentColor" />
    </svg>
  ),
  
  smallSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <rect x="7" y="7" width="6" height="6" fill="currentColor" />
    </svg>
  ),
  
  // Outlined shapes
  outlinedCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  
  outlinedTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <polygon points="10,3 17,15 3,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  
  outlinedSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
};

interface ShapeIconProps {
  variant: keyof typeof ShapeVariants;
  className?: string;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ variant, className = "" }) => {
  return (
    <div className={`text-warm-brown/30 ${className}`}>
      {ShapeVariants[variant]}
    </div>
  );
};

interface GeometricFieldProps {
  count?: number;
}

export const GeometricField: React.FC<GeometricFieldProps> = ({ count = 20 }) => {
  const variants = Object.keys(ShapeVariants) as (keyof typeof ShapeVariants)[];
  
  const shapeElements = Array.from({ length: count }, (_, i) => {
    const variant = variants[i % variants.length];
    const size = Math.random() * 20 + 10; // Random size between 10-30px
    const rotation = (Math.random() - 0.5) * 45; // Random rotation between -22.5 to 22.5 degrees
    
    // Position shapes only at edges and corners to avoid text overlap
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
          height: `${size}px`,
          transform: `rotate(${rotation}deg)`,
          opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1-0.5
        }}
      >
        <ShapeIcon variant={variant} className="w-full h-full" />
      </div>
    );
  });

  return (
    <>
      {shapeElements}
    </>
  );
};

export default ShapeIcon;
