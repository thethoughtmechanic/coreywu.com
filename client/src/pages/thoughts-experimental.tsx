import { useState } from "react";
import { useLocation } from "wouter";
import { thoughts } from "@/data/thoughts";

// Extended sample data for testing card styles
const sampleThoughts = [
 {
   id: "exp-1",
   title: "The Future of Human-AI Collaboration",
   description: "Exploring how humans and AI systems can work together more effectively in creative and analytical tasks.",
   tag: "AI Research",
   readTime: "12 min read",
   imageGradient: "from-blue-500 to-purple-600",
   date: "2023-10-26" // Added for consistency
 },
 {
   id: "exp-2", 
   title: "Quick thought on design systems",
   description: "Consistency is key, but flexibility allows for creative expression.",
   tag: "Quick Thought",
   readTime: "2 min read",
   imageGradient: "from-green-400 to-blue-500",
   date: "2023-10-25" // Added for consistency
 },
 {
   id: "exp-3",
   title: "Building Sustainable Tech Products",
   description: "A comprehensive guide to creating technology that serves both users and the planet.",
   tag: "Article",
   readTime: "8 min read",
   imageGradient: "from-emerald-500 to-teal-600",
   date: "2023-10-24" // Added for consistency
 },
 {
   id: "exp-4",
   title: "Design Thinking Workshop",
   description: "Interactive presentation on human-centered design methodologies.",
   tag: "Slides",
   readTime: "45 min presentation",
   imageGradient: "from-orange-400 to-red-500",
   date: "2023-10-23" // Added for consistency
 }
];

export default function ThoughtsExperimental() {
  const [, setLocation] = useLocation();

  const handleCardClick = (id: string) => {
    setLocation(`/thoughts/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Garden View Card Style Lab
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto">
          Testing different card styles using your actual content to help refine the garden view UI.
        </p>
      </header>

      {/* 1. Background & Color Variations */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">1. Background & Color Treatments</h2>
        <p className="text-sm text-muted-grey mb-8">Different background colors and text treatments</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.slice(0, 3).map((thought, index) => (
            <div key={`bg-${thought.id}`}>
              <h3 className="text-sm font-medium text-warm-brown mb-3">
                {index === 0 ? 'Pure White' : index === 1 ? 'Soft Cream' : 'Light Gray'}
              </h3>
              <div 
                className={`${
                  index === 0 ? 'bg-white border-gray-200' : 
                  index === 1 ? 'bg-cream border-warm-brown/20' : 
                  'bg-gray-50 border-gray-200'
                } rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer border min-h-[220px] flex flex-col`}
                onClick={() => handleCardClick(thought.id)}
              >
                <div className={`bg-gradient-to-br ${thought.imageGradient} h-16 rounded mb-3`}></div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${
                    index === 0 ? 'text-gray-700' :
                    index === 1 ? 'text-warm-brown' :
                    'text-gray-600'
                  }`}>
                    {thought.tag}
                  </span>
                  <span className={`text-xs ${
                    index === 0 ? 'text-gray-500' :
                    index === 1 ? 'text-warm-brown/60' :
                    'text-gray-500'
                  }`}>
                    {thought.date}
                  </span>
                </div>
                <h4 className={`text-sm font-medium mb-2 line-clamp-2 flex-1 ${
                  index === 0 ? 'text-gray-900' :
                  index === 1 ? 'text-warm-brown' :
                  'text-gray-900'
                }`}>
                  {thought.title}
                </h4>
                <p className={`text-xs mb-3 leading-relaxed line-clamp-3 ${
                  index === 0 ? 'text-gray-600' :
                  index === 1 ? 'text-soft-black/70' :
                  'text-gray-600'
                }`}>
                  {thought.description}
                </p>
                <div className="flex items-center gap-1 mt-auto">
                  <svg className={`w-3 h-3 ${
                    index === 0 ? 'text-gray-500' :
                    index === 1 ? 'text-warm-brown/60' :
                    'text-gray-500'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-xs ${
                    index === 0 ? 'text-gray-500' :
                    index === 1 ? 'text-warm-brown/60' :
                    'text-gray-500'
                  }`}>
                    {thought.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Border & Shadow Treatments */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">2. Border & Shadow Styles</h2>
        <p className="text-sm text-muted-grey mb-8">Different visual emphasis and depth treatments</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.slice(0, 3).map((thought, index) => (
            <div key={`border-${thought.id}`}>
              <h3 className="text-sm font-medium text-warm-brown mb-3">
                {index === 0 ? 'Colored Left Border' : index === 1 ? 'Full Color Border' : 'Soft Glow Shadow'}
              </h3>
              <div 
                className={`bg-soft-cream rounded-2xl p-6 transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col ${
                  index === 0 ? 'border-l-4 border-purple-500 shadow-soft hover:shadow-lg' :
                  index === 1 ? 'border-2 border-emerald-400 shadow-soft hover:shadow-lg' :
                  'shadow-soft hover:shadow-lg'
                }`}
                style={index === 2 ? {
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                } : undefined}
                onClick={() => handleCardClick(thought.id)}
              >
                <div className={`bg-gradient-to-br ${thought.imageGradient} h-16 rounded mb-3`}></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-warm-brown font-medium">{thought.tag}</span>
                  <span className="text-xs text-warm-brown/60">{thought.date}</span>
                </div>
                <h4 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2 flex-1">
                  {thought.title}
                </h4>
                <p className="text-xs text-soft-black/70 mb-3 leading-relaxed line-clamp-3">
                  {thought.description}
                </p>
                <div className="flex items-center gap-1 mt-auto">
                  <svg className="w-3 h-3 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-warm-brown/60">{thought.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hover Effects & Interactions */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">3. Hover Effects & Interactions</h2>
        <p className="text-sm text-muted-grey mb-8">Different hover states and interactive feedback</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.slice(0, 3).map((thought, index) => (
            <div key={`hover-${thought.id}`}>
              <h3 className="text-sm font-medium text-warm-brown mb-3">
                {index === 0 ? 'Scale & Shadow' : index === 1 ? 'Color Shift' : 'Glow Pulse'}
              </h3>
              <div 
                className={`bg-soft-cream rounded-2xl p-6 shadow-soft transition-all duration-300 cursor-pointer border border-warm-brown/10 min-h-[220px] flex flex-col group ${
                  index === 0 ? 'hover:scale-105 hover:shadow-lg' :
                  index === 1 ? 'hover:bg-light-brown hover:border-warm-brown/30' :
                  'hover:shadow-lg animate-pulse'
                }`}
                onClick={() => handleCardClick(thought.id)}
              >
                <div className={`bg-gradient-to-br ${thought.imageGradient} h-16 rounded mb-3 transition-all duration-300 ${
                  index === 1 ? 'group-hover:opacity-90' : ''
                }`}></div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    index === 1 ? 'text-warm-brown group-hover:text-hover-brown' : 'text-warm-brown'
                  }`}>
                    {thought.tag}
                  </span>
                  <span className={`text-xs transition-colors duration-300 ${
                    index === 1 ? 'text-warm-brown/60 group-hover:text-hover-brown/70' : 'text-warm-brown/60'
                  }`}>
                    {thought.date}
                  </span>
                </div>
                <h4 className={`text-sm font-medium mb-2 line-clamp-2 flex-1 transition-colors duration-300 ${
                  index === 1 ? 'text-warm-brown group-hover:text-hover-brown' : 'text-warm-brown'
                }`}>
                  {thought.title}
                </h4>
                <p className={`text-xs mb-3 leading-relaxed line-clamp-3 transition-colors duration-300 ${
                  index === 1 ? 'text-soft-black/70 group-hover:text-soft-black' : 'text-soft-black/70'
                }`}>
                  {thought.description}
                </p>
                <div className="flex items-center gap-1 mt-auto">
                  <svg className={`w-3 h-3 transition-colors duration-300 ${
                    index === 1 ? 'text-warm-brown/60 group-hover:text-hover-brown/70' : 'text-warm-brown/60'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-xs transition-colors duration-300 ${
                    index === 1 ? 'text-warm-brown/60 group-hover:text-hover-brown/70' : 'text-warm-brown/60'
                  }`}>
                    {thought.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Layout & Content Density */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">4. Layout & Content Density</h2>
        <p className="text-sm text-muted-grey mb-8">Different information hierarchies and content layouts</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.map((thought, index) => (
            <div key={`layout-${thought.id}`}>
              <h3 className="text-sm font-medium text-warm-brown mb-3">
                {index === 0 ? 'Minimal' : index === 1 ? 'Standard' : 'Rich Detail'}
              </h3>
              <div 
                className="bg-soft-cream rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer border border-warm-brown/10 flex flex-col"
                style={{ minHeight: index === 0 ? '180px' : index === 1 ? '220px' : '280px' }}
                onClick={() => handleCardClick(thought.id)}
              >
                <div className={`bg-gradient-to-br ${thought.imageGradient} rounded mb-3 ${
                  index === 0 ? 'h-12' : index === 1 ? 'h-16' : 'h-20'
                }`}></div>

                {index === 0 ? (
                  // Minimal layout
                  <>
                    <span className="text-xs text-warm-brown font-medium mb-2">{thought.tag}</span>
                    <h4 className="text-sm font-medium text-warm-brown line-clamp-2 flex-1">
                      {thought.title}
                    </h4>
                  </>
                ) : index === 1 ? (
                  // Standard layout
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-warm-brown font-medium">{thought.tag}</span>
                      <span className="text-xs text-warm-brown/60">{thought.date}</span>
                    </div>
                    <h4 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2">
                      {thought.title}
                    </h4>
                    <p className="text-xs text-soft-black/70 mb-3 leading-relaxed line-clamp-3 flex-1">
                      {thought.description}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-warm-brown/60">{thought.readTime}</span>
                    </div>
                  </>
                ) : (
                  // Rich detail layout
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-warm-brown text-cream rounded-full font-medium">
                        {thought.tag}
                      </span>
                      <span className="text-xs text-warm-brown/60">{thought.date}</span>
                    </div>
                    <h4 className="text-base font-medium text-warm-brown mb-3 leading-tight">
                      {thought.title}
                    </h4>
                    <p className="text-sm text-soft-black/80 mb-4 leading-relaxed flex-1">
                      {thought.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-warm-brown/60">{thought.readTime}</span>
                      </div>
                      {thought.status === 'wip' ? (
                        <div className="flex items-center gap-2 text-xs text-warm-brown/60">
                          <div className="w-1.5 h-1.5 bg-warm-brown/40 rounded-full animate-pulse"></div>
                          <span>WIP</span>
                        </div>
                      ) : (
                        <button className="text-xs text-warm-brown hover:text-hover-brown font-medium">
                          Read more →
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Current Garden Style (for reference) */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">5. Current Garden Style (Reference)</h2>
        <p className="text-sm text-muted-grey mb-8">Your current implementation for comparison</p>

        <div className="grid grid-cols-3 gap-6">
          {thoughts.map((thought) => (
            <div key={`current-${thought.id}`} className="cursor-pointer group/card">
              <div className="w-full bg-soft-cream backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative flex flex-col min-h-[220px]">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-warm-brown font-medium group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500">
                      {thought.tag}
                    </span>
                    <span className="text-xs text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                      {thought.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2 group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500">
                    {thought.title}
                  </h3>
                  <p className="text-xs text-soft-black/70 mb-3 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-1">
                    {thought.description}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    <svg className="w-3 h-3 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                      {thought.readTime}
                    </span>
                  </div>
                  {thought.status === 'wip' ? (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="flex items-center gap-2 text-xs text-warm-brown/60 group-hover/card:text-white/70">
                        <div className="w-1.5 h-1.5 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                        <span className="font-medium">Work in Progress</span>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full text-xs py-2 px-3 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown">
                      Read more
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to main thoughts */}
      <div className="text-center pt-8 border-t border-warm-brown/10">
        <button 
          onClick={() => setLocation('/thoughts')}
          className="bg-warm-brown text-cream px-6 py-3 rounded-lg hover:bg-hover-brown transition-colors duration-200"
        >
          Back to Main Thoughts Page
        </button>
      </div>
    </div>
  );
}