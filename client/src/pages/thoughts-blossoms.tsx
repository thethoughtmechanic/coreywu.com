import React, { useState } from 'react';
import { useLocation } from "wouter";
import CopyEmail from '../components/copy-email';

const ThoughtBlossoms = () => {
  const [, setLocation] = useLocation();
  const [expandedSeed, setExpandedSeed] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
            Thought Blossoms
          </h1>
          <p className="text-muted-grey max-w-xl mx-auto">
            Reflections on design, strategy, and the intersection of technology and humanity
          </p>
        </header>

        {/* Blossoms Grid - 2 wide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Left Blossom - Standard Collection Card */}
          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">

              {/* Collection Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                  AI & Human Futures
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed">
                  Exploring the evolving relationship between artificial intelligence and humanity. These thoughts examine how we adapt, collaborate, and find meaning alongside intelligent systems.
                </p>
              </div>

              {/* Seed Cards Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
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
              <div className="pt-4 border-t border-warm-brown/10">
                <p className="text-xs text-muted-grey">6 thoughts • Click any card to explore</p>
              </div>

            </div>
          </div>

          {/* Right Blossom - Collection with Hover Effect */}
          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] h-[350px]">

              {/* Collection Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                  Society & Power Structures
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed mb-4">
                  Examining how systems of power, community, and governance evolve in our rapidly changing world.
                </p>
              </div>

              {/* Relevant Seeds Subtitle */}
              <h3 className="text-sm font-semibold text-warm-brown mb-3">Relevant Seeds</h3>

              {/* Horizontal Cards with Collection Hover Effect */}
              <div className="relative mb-4">
                <div className="flex gap-2 overflow-x-hidden">
                  {[
                    { id: 'four-tribes', title: 'Four Tribes of Tomorrow' },
                    { id: 'real-estate-community', title: 'Real Estate as Community' },
                    { id: 'families-inequality', title: 'Families Are The Root' },
                    { id: 'democracy-last-voter', title: "Democracy's Last Voter" },
                    { id: 'regulation-code', title: 'Regulation Through Code' }
                  ].map((seed, index) => (
                    <div
                      key={seed.id}
                      className="relative flex-shrink-0 w-28 h-16 bg-cream/50 rounded-lg p-2 border border-warm-brown/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                      style={{
                        transform: hoveredIndex !== null ? 
                          `translateX(${(index - hoveredIndex) * -2}px) scale(${index === hoveredIndex ? 1.05 : 0.95})` : 
                          'translateX(0px) scale(1)',
                        zIndex: index === hoveredIndex ? 10 : 1
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setExpandedSeed(seed.id)}
                    >
                      <h3 className="text-xs font-medium text-warm-brown text-center leading-tight">
                        {seed.title}
                      </h3>
                      {index === hoveredIndex && (
                        <div className="absolute inset-0 bg-warm-brown/10 rounded-lg transition-opacity duration-300"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Visual indicator for more content */}
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none flex items-center justify-end pr-1">
                  <div className="text-warm-brown/60 text-xs">⋯</div>
                </div>
              </div>

              {/* Collection Footer */}
              <div className="pt-4 border-t border-warm-brown/10">
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