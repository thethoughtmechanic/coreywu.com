
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import CopyEmail from '../components/copy-email';

// Global scrollbar hiding styles
const globalStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Animation constants for collection behavior
const SCALE = 1.2;
const DISTANCE = 80;
const NUDGE = 16;
const SPRING_CONFIG = () => ({
  mass: 0.1,
  stiffness: 300,
  damping: 20,
});

// Seed card data for different collections
const aiSeeds = [
  { id: 'curious-companions', title: 'Curious Companions' },
  { id: 'clock-speeds', title: 'Clock Speeds' },
  { id: 'modern-managers', title: 'The Plight of Modern Managers' },
  { id: 'human-gaps', title: 'Human-of-the-Gaps' },
  { id: 'defend-flow', title: 'We Need to Defend Flow' },
  { id: 'ai-made-that', title: '"Did AI make that?"' }
];

const societySeeds = [
  { id: 'four-tribes', title: 'Four Tribes of Tomorrow' },
  { id: 'real-estate-community', title: 'Real Estate as Community' },
  { id: 'families-inequality', title: 'Families Are The Root of Inequality' },
  { id: 'democracy-last-voter', title: "Democracy's Last Voter" },
  { id: 'regulation-code', title: 'Regulation Through Code, Not Policy' }
];

const designSeeds = [
  { id: 'design-thinking', title: 'Design Thinking Evolution' },
  { id: 'user-centered', title: 'User-Centered Future' },
  { id: 'aesthetic-function', title: 'Aesthetic vs Function' },
  { id: 'digital-physical', title: 'Digital-Physical Bridge' },
  { id: 'inclusive-design', title: 'Inclusive Design Principles' },
  { id: 'design-ethics', title: 'Design Ethics Framework' }
];

const techSeeds = [
  { id: 'quantum-leap', title: 'Quantum Computing Leap' },
  { id: 'privacy-future', title: 'Privacy in Connected World' },
  { id: 'automation-jobs', title: 'Automation & Job Evolution' },
  { id: 'tech-wellness', title: 'Technology & Human Wellness' },
  { id: 'digital-divide', title: 'Bridging Digital Divide' }
];

const SeedCard = ({ seed, mouseLeft, isExpanded = false }: { seed: typeof aiSeeds[0], mouseLeft?: any, isExpanded?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(() => {
    if (!isExpanded || !mouseLeft) return -Infinity;

    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };
    return (mouseLeft?.get() ?? 0) - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);

  const calculateOffset = (currentDistance: number, currentScale: number) => {
    if (currentDistance === -Infinity) {
      return 0;
    }

    if (currentDistance < -DISTANCE || currentDistance > DISTANCE) {
      return Math.sign(currentDistance) * -1 * NUDGE;
    }

    return (-currentDistance / DISTANCE) * NUDGE * currentScale;
  };

  const x = useTransform(() => {
    const currentDistance = distance.get();
    const currentScale = scale.get();
    return calculateOffset(currentDistance, currentScale);
  });

  const springConfig = SPRING_CONFIG();
  const scaleSpring = useSpring(scale, springConfig);
  const xSpring = useSpring(x, springConfig);

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 w-24 h-16 rounded-lg border border-warm-brown/30 overflow-hidden cursor-pointer bg-cream/50 hover:bg-cream transition-colors duration-200"
      style={{
        ...(isExpanded && { x: xSpring, scale: scaleSpring }),
      }}
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <h3 className="text-xs font-medium text-warm-brown text-center leading-tight">
          {seed.title}
        </h3>
      </div>
      <div className="absolute inset-0 border border-warm-brown/40 rounded-lg pointer-events-none" />
    </motion.div>
  );
};

// Approach 1: Smart Arrow Navigation (only show when needed)
const ArrowNavigationCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScrollPosition();
      scrollElement.addEventListener('scroll', checkScrollPosition);
      return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[320px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-grey text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <h3 className="text-sm font-semibold text-warm-brown mb-4">Relevant Seeds</h3>

      <div className="relative">
        {canScrollLeft && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-warm-brown/60 hover:text-warm-brown transition-all duration-200 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <motion.div
          ref={containerRef}
          className="mx-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ willChange: "transform" }}
        >
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}>
            {seeds.map((seed, index) => (
              <motion.div 
                key={seed.id}
                onClick={() => setExpandedSeed(seed.id)}
              >
                <SeedCard 
                  seed={seed} 
                  mouseLeft={mouseLeft} 
                  isExpanded={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {canScrollRight && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-warm-brown/60 hover:text-warm-brown transition-all duration-200 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="pt-4 border-t border-warm-brown/10 mt-6">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Smart arrow navigation</p>
      </div>
    </div>
  );
};

// Approach 2: Dots indicator with hidden scrollbar
const DotsIndicatorCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[320px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-grey text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <h3 className="text-sm font-semibold text-warm-brown mb-4">Relevant Seeds</h3>

      <motion.div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <div 
          ref={scrollRef} 
          className="flex gap-3 overflow-x-auto pb-2" 
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {seeds.map((seed, index) => (
            <motion.div 
              key={seed.id}
              onClick={() => setExpandedSeed(seed.id)}
            >
              <SeedCard 
                seed={seed} 
                mouseLeft={mouseLeft} 
                isExpanded={true}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-3 gap-1">
          {Array.from({ length: Math.max(1, seeds.length - 3) }).map((_, index) => {
            const dotProgress = index / Math.max(1, seeds.length - 4);
            const isActive = Math.abs(scrollProgress - dotProgress) < 0.25;
            return (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-warm-brown' : 'bg-warm-brown/30'
                }`}
              />
            );
          })}
        </div>
      </motion.div>

      <div className="pt-4 border-t border-warm-brown/10 mt-4">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Scroll to explore with dots indicator</p>
      </div>
    </div>
  );
};

// Approach 3: Thin custom scrollbar
const ThinScrollbarCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[320px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-grey text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <h3 className="text-sm font-semibold text-warm-brown mb-4">Relevant Seeds</h3>

      <motion.div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <div 
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 thin-scrollbar" 
          style={{ scrollBehavior: 'smooth' }}
        >
          {seeds.map((seed, index) => (
            <motion.div 
              key={seed.id}
              className="snap-center"
              onClick={() => setExpandedSeed(seed.id)}
            >
              <SeedCard 
                seed={seed} 
                mouseLeft={mouseLeft} 
                isExpanded={true}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="pt-4 border-t border-warm-brown/10 mt-4">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Thin scrollbar with snap</p>
      </div>

      <style jsx>{`
        .thin-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 109, 92, 0.3);
          border-radius: 3px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 109, 92, 0.5);
        }
      `}</style>
    </div>
  );
};

// Approach 4: Progress bar indicator
const ProgressBarCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[320px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-grey text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <h3 className="text-sm font-semibold text-warm-brown mb-4">Relevant Seeds</h3>

      <motion.div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <div 
          ref={scrollRef} 
          className="flex gap-3 overflow-x-auto pb-2" 
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {seeds.map((seed, index) => (
            <motion.div 
              key={seed.id}
              onClick={() => setExpandedSeed(seed.id)}
            >
              <SeedCard 
                seed={seed} 
                mouseLeft={mouseLeft} 
                isExpanded={true}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full h-0.5 bg-warm-brown/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-warm-brown transition-all duration-150 rounded-full"
            style={{ width: `${Math.min(100, Math.max(25, scrollProgress + 25))}%` }}
          />
        </div>
      </motion.div>

      <div className="pt-4 border-t border-warm-brown/10 mt-4">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Progress bar shows scroll position</p>
      </div>
    </div>
  );
};

const ThoughtBlossoms = () => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="min-h-screen bg-gradient-to-br from-cream/30 to-light-brown/20">
      <div className="max-w-7xl mx-auto px-6 py-4 thoughts-background-texture">
        {/* View toggles */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm text-muted-grey font-medium">Views:</span>
          <div className="flex gap-1">
            <button 
              onClick={() => setLocation('/thoughts')}
              className="group px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-transparent text-gray-700 hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-out"
            >
              Seeds
            </button>
            <button className="group px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-gray-200 text-gray-700 hover:scale-105 transition-all duration-300 ease-out">
              Blossoms
            </button>
            <button className="group relative px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-transparent text-gray-700 hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-out cursor-not-allowed">
              <span className="group-hover:opacity-0 transition-opacity duration-200">Garden</span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500">WIP</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
            Thought Blossoms
          </h1>
          <p className="text-muted-grey max-w-xl mx-auto">
            Reflections on design, strategy, and the intersection of technology and humanity
          </p>
        </header>

        {/* Blossoms Grid - 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Approach 1: Smart Arrow Navigation */}
          <div className="group cursor-pointer">
            <ArrowNavigationCollection 
              seeds={aiSeeds}
              title="AI & Human Futures"
              description="Exploring the evolving relationship between artificial intelligence and humanity."
            />
          </div>

          {/* Approach 2: Dots indicator */}
          <div className="group cursor-pointer">
            <DotsIndicatorCollection 
              seeds={societySeeds}
              title="Society & Power Structures"
              description="Examining how systems of power, community, and governance evolve."
            />
          </div>

          {/* Approach 3: Thin custom scrollbar */}
          <div className="group cursor-pointer">
            <ThinScrollbarCollection 
              seeds={designSeeds}
              title="Design & User Experience"
              description="Thoughts on creating meaningful experiences in digital and physical spaces."
            />
          </div>

          {/* Approach 4: Progress bar indicator */}
          <div className="group cursor-pointer">
            <ProgressBarCollection 
              seeds={techSeeds}
              title="Technology & Society"
              description="Understanding the broader implications of technological advancement."
            />
          </div>

        </div>

        {/* Modal for expanded seed */}
        {expandedSeed && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-warm-brown">
                  {/* Find the seed title from all collections */}
                  {[...aiSeeds, ...societySeeds, ...designSeeds, ...techSeeds].find(seed => seed.id === expandedSeed)?.title || 'Seed Title'}
                </h2>
                <button 
                  onClick={() => setExpandedSeed(null)}
                  className="text-muted-grey hover:text-warm-brown transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="text-muted-grey">
                <p>[Placeholder for expanded thought content]</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
          <p className="text-sm text-muted-grey">
            Interested in discussing any of these ideas? Reach out at{' '}
            <CopyEmail className="text-sm" />
          </p>
        </footer>
      </div>
    </>
  );
};

export default ThoughtBlossoms;
