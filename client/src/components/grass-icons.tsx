import React from 'react';

// Geometric shape variants with background textures from experiments, thoughts, and about pages
const ShapeVariants = {
  // Grid pattern shapes (from experiments page)
  gridCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="gridPattern1" patternUnits="userSpaceOnUse" width="3" height="3">
          <rect width="3" height="3" fill="none"/>
          <path d="M0,0.5 L3,0.5 M0,1.5 L3,1.5 M0,2.5 L3,2.5" stroke="currentColor" strokeWidth="0.15" opacity="0.8"/>
          <path d="M0.5,0 L0.5,3 M1.5,0 L1.5,3 M2.5,0 L2.5,3" stroke="currentColor" strokeWidth="0.15" opacity="0.6"/>
        </pattern>
      </defs>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="7" fill="url(#gridPattern1)" opacity="0.7" />
    </svg>
  ),

  gridTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="gridPattern2" patternUnits="userSpaceOnUse" width="2.5" height="2.5">
          <rect width="2.5" height="2.5" fill="none"/>
          <path d="M0,0.5 L2.5,0.5 M0,1.5 L2.5,1.5 M0,2 L2.5,2" stroke="currentColor" strokeWidth="0.12" opacity="0.9"/>
          <path d="M0.5,0 L0.5,2.5 M1.5,0 L1.5,2.5 M2,0 L2,2.5" stroke="currentColor" strokeWidth="0.12" opacity="0.7"/>
        </pattern>
      </defs>
      <polygon points="10,2 18,16 2,16" fill="none" stroke="currentColor" strokeWidth="1" />
      <polygon points="10,3 17,15 3,15" fill="url(#gridPattern2)" opacity="0.6" />
    </svg>
  ),

  gridSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="gridPattern3" patternUnits="userSpaceOnUse" width="2" height="2">
          <rect width="2" height="2" fill="none"/>
          <path d="M0,0.5 L2,0.5 M0,1.5 L2,1.5" stroke="currentColor" strokeWidth="0.1" opacity="0.8"/>
          <path d="M0.5,0 L0.5,2 M1.5,0 L1.5,2" stroke="currentColor" strokeWidth="0.1" opacity="0.6"/>
        </pattern>
      </defs>
      <rect x="3" y="3" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="12" height="12" fill="url(#gridPattern3)" opacity="0.7" />
    </svg>
  ),

  // Scribble pattern shapes (from thoughts page)
  scribbleCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="scribblePattern1" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="none"/>
          <path d="M0.5,1 Q1.5,0.5 2.5,1.5 Q3,2 3.5,1.5" stroke="currentColor" strokeWidth="0.15" opacity="0.8" fill="none"/>
          <path d="M1,3 Q2,2.5 3,3 Q3.5,3.5 4,3" stroke="currentColor" strokeWidth="0.12" opacity="0.6" fill="none"/>
          <path d="M0,2.5 Q0.5,2 1,2.5 Q1.5,3 2,2.5" stroke="currentColor" strokeWidth="0.1" opacity="0.7" fill="none"/>
        </pattern>
      </defs>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="7" fill="url(#scribblePattern1)" opacity="0.6" />
    </svg>
  ),

  scribbleTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="scribblePattern2" patternUnits="userSpaceOnUse" width="3.5" height="3.5">
          <rect width="3.5" height="3.5" fill="none"/>
          <path d="M0.5,1.5 Q1.5,1 2.5,1.8 Q3,2.5 3.5,2" stroke="currentColor" strokeWidth="0.12" opacity="0.9" fill="none"/>
          <path d="M1,3 Q2,2.3 3,3.2" stroke="currentColor" strokeWidth="0.1" opacity="0.7" fill="none"/>
          <path d="M0,2.8 Q1,2.2 1.5,2.8" stroke="currentColor" strokeWidth="0.08" opacity="0.6" fill="none"/>
        </pattern>
      </defs>
      <polygon points="10,2 18,16 2,16" fill="none" stroke="currentColor" strokeWidth="1" />
      <polygon points="10,3 17,15 3,15" fill="url(#scribblePattern2)" opacity="0.5" />
    </svg>
  ),

  scribbleSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="scribblePattern3" patternUnits="userSpaceOnUse" width="3" height="3">
          <rect width="3" height="3" fill="none"/>
          <path d="M0.3,1.2 Q1.2,0.8 2.1,1.4 Q2.7,2 3,1.6" stroke="currentColor" strokeWidth="0.1" opacity="0.8" fill="none"/>
          <path d="M0.8,2.5 Q1.5,2.1 2.3,2.6" stroke="currentColor" strokeWidth="0.08" opacity="0.6" fill="none"/>
        </pattern>
      </defs>
      <rect x="3" y="3" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="12" height="12" fill="url(#scribblePattern3)" opacity="0.6" />
    </svg>
  ),

  // Outline shapes (from about page - paint splatter inspired)
  outlineCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="outlinePattern1" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="none"/>
          <circle cx="1" cy="1" r="0.3" fill="none" stroke="currentColor" strokeWidth="0.1" opacity="0.6"/>
          <circle cx="3" cy="2.5" r="0.2" fill="none" stroke="currentColor" strokeWidth="0.08" opacity="0.7"/>
          <circle cx="2" cy="3.5" r="0.25" fill="none" stroke="currentColor" strokeWidth="0.09" opacity="0.5"/>
        </pattern>
      </defs>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="7" fill="url(#outlinePattern1)" opacity="0.6" />
    </svg>
  ),

  outlineTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="outlinePattern2" patternUnits="userSpaceOnUse" width="3.5" height="3.5">
          <rect width="3.5" height="3.5" fill="none"/>
          <rect x="0.5" y="0.5" width="0.8" height="0.8" fill="none" stroke="currentColor" strokeWidth="0.08" opacity="0.6"/>
          <polygon points="2.5,1 3,1.5 2.5,2 2,1.5" fill="none" stroke="currentColor" strokeWidth="0.06" opacity="0.7"/>
          <rect x="1.2" y="2.5" width="0.6" height="0.6" fill="none" stroke="currentColor" strokeWidth="0.07" opacity="0.5"/>
        </pattern>
      </defs>
      <polygon points="10,2 18,16 2,16" fill="none" stroke="currentColor" strokeWidth="1" />
      <polygon points="10,3 17,15 3,15" fill="url(#outlinePattern2)" opacity="0.5" />
    </svg>
  ),

  outlineSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="outlinePattern3" patternUnits="userSpaceOnUse" width="3" height="3">
          <rect width="3" height="3" fill="none"/>
          <polygon points="1,0.5 1.5,1 1,1.5 0.5,1" fill="none" stroke="currentColor" strokeWidth="0.06" opacity="0.6"/>
          <circle cx="2.3" cy="2.3" r="0.2" fill="none" stroke="currentColor" strokeWidth="0.05" opacity="0.7"/>
          <rect x="0.2" y="2" width="0.5" height="0.5" fill="none" stroke="currentColor" strokeWidth="0.04" opacity="0.5"/>
        </pattern>
      </defs>
      <rect x="3" y="3" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="12" height="12" fill="url(#outlinePattern3)" opacity="0.6" />
    </svg>
  ),

  // Small accent shapes with mixed patterns
  smallGridCircle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="smallGrid1" patternUnits="userSpaceOnUse" width="1.5" height="1.5">
          <rect width="1.5" height="1.5" fill="none"/>
          <path d="M0,0.5 L1.5,0.5 M0,1 L1.5,1" stroke="currentColor" strokeWidth="0.08" opacity="0.8"/>
          <path d="M0.5,0 L0.5,1.5 M1,0 L1,1.5" stroke="currentColor" strokeWidth="0.08" opacity="0.6"/>
        </pattern>
      </defs>
      <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="10" cy="10" r="3.2" fill="url(#smallGrid1)" opacity="0.7" />
    </svg>
  ),

  smallScribbleTriangle: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="smallScribble1" patternUnits="userSpaceOnUse" width="2" height="2">
          <rect width="2" height="2" fill="none"/>
          <path d="M0.3,0.8 Q1,0.5 1.7,1.2" stroke="currentColor" strokeWidth="0.06" opacity="0.8" fill="none"/>
          <path d="M0.8,1.6 Q1.3,1.3 1.8,1.8" stroke="currentColor" strokeWidth="0.05" opacity="0.6" fill="none"/>
        </pattern>
      </defs>
      <polygon points="10,6 14,14 6,14" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="10,6.8 13.2,13.2 6.8,13.2" fill="url(#smallScribble1)" opacity="0.6" />
    </svg>
  ),

  smallOutlineSquare: (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <pattern id="smallOutline1" patternUnits="userSpaceOnUse" width="1.8" height="1.8">
          <rect width="1.8" height="1.8" fill="none"/>
          <circle cx="0.5" cy="0.5" r="0.15" fill="none" stroke="currentColor" strokeWidth="0.04" opacity="0.6"/>
          <rect x="1" y="1" width="0.3" height="0.3" fill="none" stroke="currentColor" strokeWidth="0.03" opacity="0.7"/>
        </pattern>
      </defs>
      <rect x="7" y="7" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <rect x="7.5" y="7.5" width="5" height="5" fill="url(#smallOutline1)" opacity="0.6" />
    </svg>
  ),

  // Email icon shape
  emailIcon: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M22 6a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

interface ShapeIconProps {
  variant: keyof typeof ShapeVariants;
  className?: string;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ variant, className = "" }) => {
  return (
    <div className={`text-warm-brown/40 ${className}`}>
      {ShapeVariants[variant]}
    </div>
  );
};

interface GeometricFieldProps {
  count?: number;
  onNavigate?: (path: string) => void;
}



// Navigation shape component to handle hooks properly
const NavigationShapeComponent: React.FC<{
  shape: any;
  onNavigate: (path: string) => void;
}> = ({ shape, onNavigate }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [emailCopied, setEmailCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Detect if the current environment is mobile for responsive adjustments
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleClick = async () => {
    if (shape.path === 'email') {
      try {
        await navigator.clipboard.writeText('coreydavidwu@gmail.com');
        setEmailCopied(true);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Reset after 2.5 seconds (reduced from 3)
        timeoutRef.current = setTimeout(() => {
          setEmailCopied(false);
        }, 2500);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    } else {
      onNavigate(shape.path);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Determine size and rotation for navigation shapes
  const size = 46; // Fixed size for navigation shapes
  const rotation = 0; // No rotation for navigation shapes to keep labels aligned

  // Determine current variant and label based on email state
  const currentVariant = shape.path === 'email' && emailCopied ? 'gridSquare' : shape.variant;
  const currentLabel = shape.path === 'email' && emailCopied ? 'Copied!' : shape.label;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300 z-10 group"
      style={{
        left: `${shape.position.x}%`,
        top: `${shape.position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Desktop Tooltip */}
      <div className={`hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded whitespace-nowrap transition-all duration-200 ${
        emailCopied 
          ? 'bg-green-600 text-white opacity-100' 
          : isHovered 
            ? 'bg-warm-brown text-cream opacity-100' 
            : 'bg-warm-brown text-cream opacity-0'
      } pointer-events-none z-20`}>
        {shape.path === 'email' && emailCopied ? (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <path d="m9 14 2 2 4-4"/>
            </svg>
            Copied!
          </span>
        ) : (
          currentLabel
        )}
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${emailCopied ? 'border-t-green-600' : 'border-t-warm-brown'}`}></div>
      </div>

      {/* Mobile Tooltip - Always visible with arrow, positioned closer to shape */}
      <div className={`md:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded whitespace-nowrap z-20 font-medium ${emailCopied ? 'bg-green-600 text-white' : 'bg-warm-brown text-cream'} text-xs`}>
        {shape.path === 'email' && emailCopied ? (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <path d="m9 14 2 2 4-4"/>
            </svg>
            Copied!
          </span>
        ) : (
          currentLabel
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-warm-brown"></div>
      </div>

      {/* Shape with animations */}
      <div
        className={`w-full h-full transition-all duration-300 ${
          isHovered && !emailCopied
            ? 'transform scale-110 drop-shadow-lg'
            : emailCopied
            ? 'transform scale-100' // No pulse when clicked
            : 'animate-pulse' // Subtle shake/pulse when not hovered
        }`}
        style={{
          filter: isHovered && !emailCopied ? 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3))' : 'none',
          animation: !isHovered && !emailCopied ? 'gentle-shake 3s infinite' : 'none',
        }}
      >
        {shape.path === 'email' && emailCopied ? (
          // Clipboard icon when email is copied
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-green-600">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        ) : (
          <ShapeIcon variant={currentVariant} className="w-full h-full text-warm-brown/60 hover:text-warm-brown/80 transition-colors duration-300" />
        )}
      </div>
    </div>
  );
};

export const GeometricField: React.FC<GeometricFieldProps> = ({ count = 20, onNavigate }) => {
  const variants = Object.keys(ShapeVariants) as (keyof typeof ShapeVariants)[];

  // Navigation shapes configuration - positioned to avoid text content area
  const navigationShapes = [
    {
      variant: 'outlineCircle' as keyof typeof ShapeVariants, // About me - outline pattern
      label: 'about me',
      path: '/about',
      position: { x: 8, y: 20 } // Far left, clear of text
    },
    {
      variant: 'scribbleSquare' as keyof typeof ShapeVariants, // Thoughts - scribble pattern
      label: 'thoughts',
      path: '/thoughts',
      position: { x: 68, y: 8 } // Moved left and up for better mobile positioning
    },
    {
      variant: 'gridTriangle' as keyof typeof ShapeVariants, // Experiments - grid pattern
      label: 'experiments',
      path: '/experiments',
      position: { x: 75, y: 70 } // Moved down and left for mobile positioning
    },
    {
      variant: 'emailIcon' as keyof typeof ShapeVariants, // Email - grid pattern
      label: 'email me',
      path: 'email', // Special path for email functionality
      position: { x: 12, y: 75 } // Moved up slightly
    }
  ];

  // Create navigation shapes mixed in with regular shapes
  const allShapes = [];

  // Add regular shapes
  for (let i = 0; i < count; i++) {
    const variant = variants[i % variants.length];
    const size = Math.random() * 15 + 8; // Random size between 8-23px
    const rotation = (Math.random() - 0.5) * 45; // Random rotation between -22.5 to 22.5 degrees

    // Better distribution avoiding center content area and navigation shapes
    let x, y;
    do {
      x = Math.random() * 100;
      y = Math.random() * 100;
      // Avoid center content area (25-75% width, 15-85% height) and navigation shape areas
    } while (
      (x > 25 && x < 75 && y > 15 && y < 85) || // Expanded center content area
      (x > 3 && x < 13 && y > 15 && y < 25) ||  // About me nav area (far left)
      (x > 63 && x < 73 && y > 3 && y < 13) ||  // Thoughts nav area (moved left and up)
      (x > 73 && x < 83 && y > 50 && y < 60) || // Experiments nav area (moved higher)
      (x > 3 && x < 13 && y > 80 && y < 90)     // Email nav area (bottom left)
    );

    allShapes.push(
      <div
        key={`regular-${i}`}
        className="absolute pointer-events-none z-0"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${rotation}deg)`,
          opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1-0.4
        }}
      >
        <ShapeIcon variant={variant} className="w-full h-full" />
      </div>
    );
  }

  // Add navigation shapes integrated with regular shapes
  if (onNavigate) {
    allShapes.push(
      ...navigationShapes.map((shape) => (
        <NavigationShapeComponent 
          key={`nav-${shape.label}`} 
          shape={shape} 
          onNavigate={onNavigate} 
        />
      ))
    );
  }

  return (
    <>
      {allShapes}
    </>
  );
};

export default ShapeIcon;