
import React, { useState, useRef } from 'react';
import { useLocation } from "wouter";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionConfig } from "framer-motion";
import CopyEmail from '../components/copy-email';

// Animation constants for collection hover effect
const SCALE = 1.2;
const DISTANCE = 80;
const NUDGE = 16;
const SPRING_CONFIG = () => ({
  mass: 0.1,
  stiffness: 300,
  damping: 20,
});

interface SeedCardProps {
  title: string;
  width: number;
  height: number;
  isExpanded?: boolean;
  mouseLeft?: any;
  onClick: () => void;
}

const SeedCard = ({ title, width, height, isExpanded = false, mouseLeft, onClick }: SeedCardProps) => {
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
      className="group/card relative flex-shrink-0 bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
      style={{
        width,
        height,
        ...(isExpanded && { x: xSpring, scale: scaleSpring }),
      }}
      onClick={onClick}
    >
      <h3 className="text-xs font-medium text-warm-brown text-center leading-tight group-hover/card:text-hover-brown transition-colors duration-200">
        {title}
      </h3>
      <div className="absolute inset-0 bg-warm-brown/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

const ThoughtBlossoms = () => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [isRightCollectionExpanded, setIsRightCollectionExpanded] = useState(false);
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && isRightCollectionExpanded) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && isRightCollectionExpanded) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseLeft.set(touch.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/30 to-light-brown/20">
      <div className="max-w-7xl mx-auto px-6 py-4 thoughts-background-texture">
        {/* View toggles - positioned above header */}
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
          {/* Title */}
          <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
            Thought Blossoms
          </h1>

          {/* Description */}
          <p className="text-muted-grey max-w-xl mx-auto">
            Reflections on design, strategy, and the intersection of technology and humanity
          </p>
        </header>

        {/* Blossoms Grid - 2 wide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Blossom - Standard Collection Card */}
          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] min-h-[480px]">
              
              {/* Collection Header */}
              <div className="mb-4"></div>
                <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                  AI & Human Futures
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed">
                  Exploring the evolving relationship between artificial intelligence and humanity. These thoughts examine how we adapt, collaborate, and find meaning alongside intelligent systems.
                </p>
              </div>

              {/* Seed Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Individual seed cards - small and title-only */}
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('curious-companions')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">Curious Companions</h3>
                </div>
                
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('clock-speeds')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">Clock Speeds</h3>
                </div>
                
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('modern-managers')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">The Plight of Modern Managers</h3>
                </div>
                
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('human-gaps')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">Human-of-the-Gaps</h3>
                </div>
                
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('defend-flow')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">We Need to Defend Flow</h3>
                </div>
                
                <div 
                  className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200 cursor-pointer"
                  onClick={() => setExpandedSeed('ai-made-that')}
                >
                  <h3 className="text-sm font-medium text-warm-brown">"Did AI make that?"</h3>
                </div>
              </div>

              {/* Collection Footer */}
              <div className="mt-4 pt-3 border-t border-warm-brown/10"></div>
                <p className="text-xs text-muted-grey">6 thoughts • Click any card to explore</p>
              </div>

            </div>
          </div>

          {/* Right Blossom - Collection with Hover Effect */}
          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] min-h-[480px]">
              
              {/* Collection Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                  Society & Power Structures
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed">
                  Examining how systems of power, community, and governance evolve in our rapidly changing world. These explorations challenge conventional wisdom about democracy, equality, and social organization.
                </p>
              </div>

              {/* Relevant Seeds Subtitle */}
              <div className="mb-3">
                <h3 className="text-sm font-medium text-warm-brown/80">Relevant Seeds</h3>
              </div>

              {/* Collection Preview with Hover Effect */}
              <MotionConfig transition={{ type: "spring", duration: 0.4, bounce: 0 }}>
                <div className="mb-4">
                  {!isRightCollectionExpanded ? (
                    // Collapsed State - Stacked preview
                    <div 
                      className="relative flex items-center justify-start cursor-pointer"
                      onClick={() => setIsRightCollectionExpanded(true)}
                      onMouseEnter={() => {}}
                      onMouseLeave={() => {}}
                    >
                      <div className="relative">
                        {/* Base card */}
                        <motion.div layoutId="society-card-1">
                          <SeedCard
                            title="Four Tribes of Tomorrow"
                            width={120}
                            height={80}
                            onClick={() => {}}
                          />
                        </motion.div>
                        
                        {/* Stacked cards behind */}
                        <motion.div 
                          layoutId="society-card-2"
                          className="absolute top-0 left-0"
                          style={{ rotate: 8, x: 24, y: -4, zIndex: -1 }}
                        >
                          <SeedCard
                            title=""
                            width={120}
                            height={80}
                            onClick={() => {}}
                          />
                        </motion.div>
                        
                        <motion.div 
                          layoutId="society-card-3"
                          className="absolute top-0 left-0"
                          style={{ rotate: -6, x: -20, y: -8, zIndex: -2 }}
                        >
                          <SeedCard
                            title=""
                            width={120}
                            height={80}
                            onClick={() => {}}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="ml-4">
                        <p className="text-sm text-warm-brown font-medium">5 thoughts</p>
                        <p className="text-xs text-muted-grey">Click to explore →</p>
                      </div>
                    </div>
                  ) : (
                    // Expanded State - Horizontal layout with hover effects
                    <div 
                      ref={containerRef}
                      className="space-y-3"
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseLeave={handleMouseLeave}
                      onTouchEnd={handleMouseLeave}
                    >
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <motion.div layoutId="society-card-1">
                          <SeedCard
                            title="Four Tribes of Tomorrow"
                            width={120}
                            height={80}
                            isExpanded={true}
                            mouseLeft={mouseLeft}
                            onClick={() => setExpandedSeed('four-tribes')}
                          />
                        </motion.div>
                        
                        <motion.div layoutId="society-card-2">
                          <SeedCard
                            title="Real Estate as Community"
                            width={120}
                            height={80}
                            isExpanded={true}
                            mouseLeft={mouseLeft}
                            onClick={() => setExpandedSeed('real-estate-community')}
                          />
                        </motion.div>
                        
                        <motion.div layoutId="society-card-3">
                          <SeedCard
                            title="Families Are The Root"
                            width={120}
                            height={80}
                            isExpanded={true}
                            mouseLeft={mouseLeft}
                            onClick={() => setExpandedSeed('families-inequality')}
                          />
                        </motion.div>
                        
                        <SeedCard
                          title="Democracy's Last Voter"
                          width={120}
                          height={80}
                          isExpanded={true}
                          mouseLeft={mouseLeft}
                          onClick={() => setExpandedSeed('democracy-last-voter')}
                        />
                        
                        <SeedCard
                          title="Regulation Through Code"
                          width={120}
                          height={80}
                          isExpanded={true}
                          mouseLeft={mouseLeft}
                          onClick={() => setExpandedSeed('regulation-code')}
                        />
                      </div>
                      
                      <motion.button
                        className="text-xs text-warm-brown hover:text-hover-brown transition-colors duration-200"
                        onClick={() => setIsRightCollectionExpanded(false)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        ← Collapse view
                      </motion.button>
                    </div>
                  )}
                </div>
              </MotionConfig>

              {/* Collection Footer */}
              <div className="mt-4 pt-3 border-t border-warm-brown/10">
                <p className="text-xs text-muted-grey">5 thoughts • Click any card to explore</p>
              </div>

            </div>
          </div>

        </div>

        {/* Modal for expanded seed */}
        {expandedSeed && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-warm-brown">
                  {expandedSeed === 'curious-companions' && 'Curious Companions'}
                  {expandedSeed === 'clock-speeds' && 'Clock Speeds'}
                  {expandedSeed === 'modern-managers' && 'The Plight of Modern Managers'}
                  {expandedSeed === 'human-gaps' && 'Human-of-the-Gaps'}
                  {expandedSeed === 'defend-flow' && 'We Need to Defend Flow for Meaning'}
                  {expandedSeed === 'ai-made-that' && '"Did AI make that?"'}
                  {expandedSeed === 'four-tribes' && 'Four Tribes of Tomorrow'}
                  {expandedSeed === 'real-estate-community' && 'Real Estate as a Community Platform'}
                  {expandedSeed === 'families-inequality' && 'Families Are The Root of Inequality'}
                  {expandedSeed === 'democracy-last-voter' && "Democracy's Last Voter"}
                  {expandedSeed === 'regulation-code' && 'Regulation Through Code, Not Policy'}
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
