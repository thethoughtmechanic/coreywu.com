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

      {/* 3. Tag Color Coordination - Hover Flash Effects */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">3. Tag Color Flash Effects</h2>
        <p className="text-sm text-muted-grey mb-8">Color-coordinated tag hover treatments for category organization</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.slice(0, 3).map((thought, index) => {
            // Define color schemes for each tag type
            const getTagColors = (tag: string) => {
              switch (tag) {
                case 'AI Alignment':
                  return {
                    bg: 'bg-purple-500',
                    text: 'text-white',
                    shadow: 'shadow-purple-500/50',
                    glow: 'shadow-purple-400/30',
                    border: 'border-purple-400'
                  };
                case 'Philosophizing':
                  return {
                    bg: 'bg-rose-500',
                    text: 'text-white',
                    shadow: 'shadow-rose-500/50',
                    glow: 'shadow-rose-400/30',
                    border: 'border-rose-400'
                  };
                case 'Thought Bite':
                  return {
                    bg: 'bg-emerald-500',
                    text: 'text-white',
                    shadow: 'shadow-emerald-500/50',
                    glow: 'shadow-emerald-400/30',
                    border: 'border-emerald-400'
                  };
                default:
                  return {
                    bg: 'bg-blue-500',
                    text: 'text-white',
                    shadow: 'shadow-blue-500/50',
                    glow: 'shadow-blue-400/30',
                    border: 'border-blue-400'
                  };
              }
            };

            const colors = getTagColors(thought.tag);

            return (
              <div key={`tag-flash-${thought.id}`}>
                <h3 className="text-sm font-medium text-warm-brown mb-3">
                  {index === 0 ? 'Background Flash' : index === 1 ? 'Glow + Scale' : 'Border Pulse'}
                </h3>
                <div 
                  className="bg-soft-cream rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer border border-warm-brown/10 min-h-[220px] flex flex-col group"
                  onClick={() => handleCardClick(thought.id)}
                >
                  <div className={`bg-gradient-to-br ${thought.imageGradient} h-16 rounded mb-3`}></div>
                  <div className="flex items-center justify-between mb-2">
                    {/* Different tag hover effects */}
                    {index === 0 ? (
                      // Background flash effect
                      <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-300 ${colors.bg} ${colors.text} opacity-0 group-hover:opacity-100 absolute`}>
                        {thought.tag}
                      </span>
                    ) : index === 1 ? (
                      // Glow + scale effect  
                      <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-500 border-2 ${colors.border} text-warm-brown group-hover:${colors.bg} group-hover:${colors.text} group-hover:scale-110 group-hover:shadow-lg group-hover:${colors.glow}`}>
                        {thought.tag}
                      </span>
                    ) : (
                      // Border pulse effect
                      <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-300 border-2 text-warm-brown group-hover:${colors.border} group-hover:animate-pulse`}>
                        {thought.tag}
                      </span>
                    )}

                    {/* Show default tag underneath for background flash */}
                    {index === 0 && (
                      <span className="text-xs text-warm-brown font-medium px-2 py-1">
                        {thought.tag}
                      </span>
                    )}

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
            );
          })}
        </div>
      </section>

      {/* 4. Advanced Tag Color Treatments */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">4. Advanced Tag Color Treatments</h2>
        <p className="text-sm text-muted-grey mb-8">More sophisticated color coordination approaches</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {thoughts.slice(0, 3).map((thought, index) => {
            const getTagColors = (tag: string) => {
              switch (tag) {
                case 'AI Alignment':
                  return {
                    from: 'from-purple-400',
                    to: 'to-purple-600',
                    text: 'text-purple-600',
                    hoverText: 'group-hover:text-white',
                    shadow: 'group-hover:shadow-purple-400/40'
                  };
                case 'Philosophizing':
                  return {
                    from: 'from-rose-400',
                    to: 'to-rose-600',
                    text: 'text-rose-600',
                    hoverText: 'group-hover:text-white',
                    shadow: 'group-hover:shadow-rose-400/40'
                  };
                case 'Thought Bite':
                  return {
                    from: 'from-emerald-400',
                    to: 'to-emerald-600',
                    text: 'text-emerald-600',
                    hoverText: 'group-hover:text-white',
                    shadow: 'group-hover:shadow-emerald-400/40'
                  };
                default:
                  return {
                    from: 'from-blue-400',
                    to: 'to-blue-600',
                    text: 'text-blue-600',
                    hoverText: 'group-hover:text-white',
                    shadow: 'group-hover:shadow-blue-400/40'
                  };
              }
            };

            const colors = getTagColors(thought.tag);

            return (
              <div key={`advanced-tag-${thought.id}`}>
                <h3 className="text-sm font-medium text-warm-brown mb-3">
                  {index === 0 ? 'Gradient Fill' : index === 1 ? 'Slide In Color' : 'Morphing Background'}
                </h3>
                <div 
                  className="bg-soft-cream rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer border border-warm-brown/10 min-h-[220px] flex flex-col group"
                  onClick={() => handleCardClick(thought.id)}
                >
                  <div className={`bg-gradient-to-br ${thought.imageGradient} h-16 rounded mb-3`}></div>
                  <div className="flex items-center justify-between mb-2">
                    {/* Different advanced tag effects */}
                    {index === 0 ? (
                      // Gradient fill effect
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full border border-warm-brown/20 transition-all duration-500 ${colors.text} ${colors.hoverText} group-hover:bg-gradient-to-r group-hover:${colors.from} group-hover:${colors.to} group-hover:border-transparent ${colors.shadow}`}>
                        {thought.tag}
                      </span>
                    ) : index === 1 ? (
                      // Slide in color effect
                      <span className={`relative text-xs font-medium px-3 py-1.5 rounded-full border border-warm-brown/20 transition-all duration-500 ${colors.text} ${colors.hoverText} overflow-hidden group-hover:border-transparent ${colors.shadow}`}>
                        <span className={`absolute inset-0 bg-gradient-to-r ${colors.from} ${colors.to} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-full`}></span>
                        <span className="relative z-10">{thought.tag}</span>
                      </span>
                    ) : (
                      // Morphing background
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full border-2 border-warm-brown/20 transition-all duration-700 ${colors.text} ${colors.hoverText} group-hover:bg-gradient-to-br group-hover:${colors.from} group-hover:${colors.to} group-hover:border-transparent group-hover:transform group-hover:rotate-3 ${colors.shadow}`}>
                        {thought.tag}
                      </span>
                    )}

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
            );
          })}
        </div>
      </section>

      {/* 5. Thought Bite Size & Treatment Experiments */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">5. Thought Bite Differentiation</h2>
        <p className="text-sm text-muted-grey mb-8">Smaller, distinct treatments for bite-sized thoughts</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Find the thought bite */}
          {(() => {
            const thoughtBite = thoughts.find(t => t.tag === 'Thought Bite');
            if (!thoughtBite) return null;

            return Array.from({ length: 4 }, (_, index) => (
              <div key={`bite-${index}`}>
                <h3 className="text-sm font-medium text-warm-brown mb-3">
                  {index === 0 ? 'Compact Card' : index === 1 ? 'Quote Style' : index === 2 ? 'Pill Shape' : 'Minimal Box'}
                </h3>

                {index === 0 ? (
                  // Compact card style
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300 min-h-[140px] flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-medium text-emerald-700">{thoughtBite.tag}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 leading-tight flex-1">
                      {thoughtBite.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {thoughtBite.description}
                    </p>
                  </div>
                ) : index === 1 ? (
                  // Quote style
                  <div className="bg-white border-l-4 border-emerald-400 rounded-r-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 min-h-[140px] flex flex-col relative">
                    <div className="absolute top-2 right-2 text-emerald-300 text-xl font-serif">"</div>
                    <span className="text-xs font-medium text-emerald-600 mb-2">{thoughtBite.tag}</span>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 leading-tight flex-1 italic">
                      {thoughtBite.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {thoughtBite.description}
                    </p>
                  </div>
                ) : index === 2 ? (
                  // Pill shape
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 min-h-[140px] flex flex-col text-white">
                    <span className="text-xs font-medium opacity-90 mb-2">{thoughtBite.tag}</span>
                    <h4 className="text-sm font-semibold mb-2 leading-tight flex-1">
                      {thoughtBite.title}
                    </h4>
                    <p className="text-xs opacity-90 leading-relaxed line-clamp-2">
                      {thoughtBite.description}
                    </p>
                  </div>
                ) : (
                  // Minimal box
                  <div className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 min-h-[140px] flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-emerald-600 font-medium">{thoughtBite.tag}</span>
                      <span className="text-xs text-gray-400">{thoughtBite.readTime}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 leading-tight flex-1">
                      {thoughtBite.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {thoughtBite.description}
                    </p>
                  </div>
                )}
              </div>
            ));
          })()}
        </div>

        {/* Mixed layout showing size comparison */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-warm-brown mb-3">Size Comparison: Regular vs Thought Bite</h3>
          <div className="grid grid-cols-12 gap-4">
            {/* Regular thought cards - span 4 columns each */}
            {thoughts.filter(t => t.tag !== 'Thought Bite').slice(0, 2).map((thought) => (
              <div key={`regular-${thought.id}`} className="col-span-4">
                <div className="bg-soft-cream rounded-2xl p-6 shadow-soft border border-warm-brown/10 min-h-[220px] flex flex-col">
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
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-warm-brown/60">{thought.readTime}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Thought bite cards - span 2 columns each */}
            {Array.from({ length: 2 }, (_, index) => {
              const thoughtBite = thoughts.find(t => t.tag === 'Thought Bite');
              if (!thoughtBite) return null;

              return (
                <div key={`bite-comparison-${index}`} className="col-span-2">
                  <div className={`rounded-xl p-3 shadow-sm border cursor-pointer hover:shadow-md transition-all duration-300 min-h-[160px] flex flex-col ${
                    index === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-emerald-300'
                  }`}>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-medium text-emerald-700">{thoughtBite.tag}</span>
                    </div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 leading-tight flex-1">
                      {thoughtBite.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
                      {thoughtBite.description}
                    </p>
                    <span className="text-xs text-gray-400">{thoughtBite.readTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Your Current Treatment + Tag Colors */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">6. Your Current Treatment + Tag Colors</h2>
        <p className="text-sm text-muted-grey mb-8">Combining your paint splatter effect with tag color coordination</p>

        <div className="grid grid-cols-3 gap-6">
          {thoughts.map((thought) => {
            const getTagColors = (tag: string) => {
              switch (tag) {
                case 'AI Alignment':
                  return { bg: 'group-hover/card:bg-purple-500', text: 'group-hover/card:text-white', glow: 'group-hover/card:shadow-purple-400/60' };
                case 'Philosophizing':
                  return { bg: 'group-hover/card:bg-rose-500', text: 'group-hover/card:text-white', glow: 'group-hover/card:shadow-rose-400/60' };
                case 'Thought Bite':
                  return { bg: 'group-hover/card:bg-emerald-500', text: 'group-hover/card:text-white', glow: 'group-hover/card:shadow-emerald-400/60' };
                default:
                  return { bg: 'group-hover/card:bg-blue-500', text: 'group-hover/card:text-white', glow: 'group-hover/card:shadow-blue-400/60' };
              }
            };

            const tagColors = getTagColors(thought.tag);

            return (
              <div key={`enhanced-current-${thought.id}`} className="cursor-pointer group/card">
                <div className="w-full bg-soft-cream backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative flex flex-col min-h-[220px]">
                  {/* Paint Splatter Background - appears on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl"
                    style={{
                      background: thought.tag === 'AI Alignment' ? `
                        radial-gradient(ellipse 50% 40% at 25% 15%, #7c3aed 0%, #7c3aed 50%, transparent 90%),
                        radial-gradient(ellipse 45% 35% at 75% 25%, #a855f7 0%, #a855f7 45%, transparent 85%),
                        radial-gradient(ellipse 40% 50% at 15% 85%, #8b5cf6 0%, #8b5cf6 55%, transparent 95%),
                        radial-gradient(ellipse 50% 30% at 85% 80%, #9333ea 0%, #9333ea 40%, transparent 80%),
                        radial-gradient(ellipse 45% 45% at 50% 50%, #c084fc 0%, #c084fc 45%, transparent 85%)
                      ` : thought.tag === 'Thought Bite' ? `
                        radial-gradient(ellipse 50% 40% at 25% 15%, #059669 0%, #059669 50%, transparent 90%),
                        radial-gradient(ellipse 45% 35% at 75% 25%, #0891b2 0%, #0891b2 45%, transparent 85%),
                        radial-gradient(ellipse 40% 50% at 15% 85%, #0d9488 0%, #0d9488 55%, transparent 95%),
                        radial-gradient(ellipse 50% 30% at 85% 80%, #0284c7 0%, #0284c7 40%, transparent 80%),
                        radial-gradient(ellipse 45% 45% at 50% 50%, #0ea5e9 0%, #0ea5e9 45%, transparent 85%)
                      ` : thought.tag === 'Philosophizing' ? `
                        radial-gradient(ellipse 50% 40% at 25% 15%, #db2777 0%, #db2777 50%, transparent 90%),
                        radial-gradient(ellipse 45% 35% at 75% 25%, #e11d48 0%, #e11d48 45%, transparent 85%),
                        radial-gradient(ellipse 40% 50% at 15% 85%, #f43f5e 0%, #f43f5e 55%, transparent 95%),
                        radial-gradient(ellipse 50% 30% at 85% 80%, #ec4899 0%, #ec4899 40%, transparent 80%),
                        radial-gradient(ellipse 45% 45% at 50% 50%, #f472b6 0%, #f472b6 45%, transparent 85%)
                      ` : `
                        radial-gradient(ellipse 50% 40% at 25% 15%, #6366f1 0%, #6366f1 50%, transparent 90%),
                        radial-gradient(ellipse 45% 35% at 75% 25%, #4f46e5 0%, #4f46e5 45%, transparent 85%),
                        radial-gradient(ellipse 40% 50% at 15% 85%, #5b21b6 0%, #5b21b6 55%, transparent 95%),
                        radial-gradient(ellipse 50% 30% at 85% 80%, #7c2d12 0%, #7c2d12 40%, transparent 80%),
                        radial-gradient(ellipse 45% 45% at 50% 50%, #8b5a3c 0%, #8b5a3c 45%, transparent 85%)
                      `,
                      transform: 'scale(1.8) rotate(25deg)'
                    }}
                  />

                  {/* Text Background for better readability when splatter is visible */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      {/* Enhanced tag with color flash */}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border transition-all duration-500 text-warm-brown border-warm-brown/20 ${tagColors.bg} ${tagColors.text} ${tagColors.glow} group-hover/card:border-transparent`}>
                        {thought.tag}
                      </span>
                      <span className="text-xs text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">{thought.date || "Aug 7, 2025"}</span>
                    </div>
                    <h3 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2 group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500">
                      {thought.title}
                    </h3>
                    <p className="text-xs text-soft-black/70 mb-3 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-1">
                      {thought.description}
                    </p>

                    {/* Read time indicator */}
                    <div className="flex items-center gap-1 mb-3">
                      <svg className="w-3 h-3 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                        {thought.readTime || "5 min read"}
                      </span>
                    </div>

                    {/* CTA Button */}
                    {thought.status === 'wip' ? (
                      <div className="flex items-center justify-center gap-2 py-2">
                        <div className="flex items-center gap-2 text-xs text-warm-brown/60 group-hover/card:text-white/70">
                          <div className="w-1.5 h-1.5 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                          <span className="font-medium">Work in Progress</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setLocation("/thoughts/1")}
                        className="w-full text-xs py-2 px-3 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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