
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import CopyEmail from '../components/copy-email';

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

// Approach 1: Arrow Navigation
const ArrowNavigationCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">
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
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
        >
          <svg className="w-4 h-4 text-warm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <motion.div
          ref={containerRef}
          className="mx-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ willChange: "transform" }}
        >
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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

        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
        >
          <svg className="w-4 h-4 text-warm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="pt-4 border-t border-warm-brown/10 mt-6">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Use arrows to scroll</p>
      </div>
    </div>
  );
};

// Approach 2: Auto-scroll on edge hover
const AutoScrollCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && scrollRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const containerWidth = containerRect.width;

      mouseLeft.set(relativeX);

      // Auto-scroll logic
      const edgeThreshold = 50;
      if (relativeX < edgeThreshold) {
        startAutoScroll('left');
      } else if (relativeX > containerWidth - edgeThreshold) {
        startAutoScroll('right');
      } else {
        stopAutoScroll();
      }
    }
  };

  const startAutoScroll = (direction: 'left' | 'right') => {
    if (isScrolling) return;
    setIsScrolling(true);

    scrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -5 : 5;
        scrollRef.current.scrollBy({ left: scrollAmount });
      }
    }, 16);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsScrolling(false);
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
    stopAutoScroll();
  };

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">
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
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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

      <div className="pt-4 border-t border-warm-brown/10 mt-6">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Hover near edges to auto-scroll</p>
      </div>
    </div>
  );
};

// Approach 3: Snap scrolling
const SnapScrollCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
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
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">
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
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2" style={{ scrollBehavior: 'smooth' }}>
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

      <div className="pt-4 border-t border-warm-brown/10 mt-6">
        <p className="text-xs text-muted-grey">{seeds.length} thoughts • Smooth snap scrolling</p>
      </div>
    </div>
  );
};

// Approach 4: Fade overflow with "..." indicator
const FadeOverflowCollection = ({ seeds, title, description }: { seeds: typeof aiSeeds, title: string, description: string }) => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
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

  const visibleSeeds = showAll ? seeds : seeds.slice(0, 4);
  const hasMore = seeds.length > 4;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">
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
        <div className="flex gap-3 flex-wrap pb-2">
          {visibleSeeds.map((seed, index) => (
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
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex-shrink-0 w-24 h-16 rounded-lg border border-warm-brown/30 bg-warm-brown/10 hover:bg-warm-brown/20 transition-colors duration-200 flex items-center justify-center"
            >
              <span className="text-warm-brown font-medium">+{seeds.length - 4}</span>
            </button>
          )}
        </div>
      </motion.div>

      <div className="pt-4 border-t border-warm-brown/10 mt-6">
        <p className="text-xs text-muted-grey">
          {seeds.length} thoughts • {showAll ? 'Showing all' : `Click +${seeds.length - 4} to see more`}
        </p>
      </div>
    </div>
  );
};

const ThoughtBlossoms = () => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);

  return (
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

          {/* Approach 1: Arrow Navigation */}
          <div className="group cursor-pointer">
            <ArrowNavigationCollection 
              seeds={aiSeeds}
              title="AI & Human Futures"
              description="Exploring the evolving relationship between artificial intelligence and humanity."
            />
          </div>

          {/* Approach 2: Auto-scroll on edge hover */}
          <div className="group cursor-pointer">
            <AutoScrollCollection 
              seeds={societySeeds}
              title="Society & Power Structures"
              description="Examining how systems of power, community, and governance evolve."
            />
          </div>

          {/* Approach 3: Snap scrolling */}
          <div className="group cursor-pointer">
            <SnapScrollCollection 
              seeds={designSeeds}
              title="Design & User Experience"
              description="Thoughts on creating meaningful experiences in digital and physical spaces."
            />
          </div>

          {/* Approach 4: Fade overflow with "..." indicator */}
          <div className="group cursor-pointer">
            <FadeOverflowCollection 
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
    </div>
  );
};

export default ThoughtBlossoms;
