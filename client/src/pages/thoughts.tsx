import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";

export default function Thoughts() {
  const [viewMode, setViewMode] = useState<'editorial' | 'garden'>('garden');
  const [, setLocation] = useLocation();

  // Group thoughts by content type for mixed layout
  const articles = thoughts.filter(t => t.tag === 'Article' || t.readTime.includes('min')) || [];
  const quickThoughts = thoughts.filter(t => t.tag === 'Quick Thought' || t.tag === 'Shower Thought') || [];
  const mediaContent = thoughts.filter(t => ['Video', 'Audio', 'Slides'].includes(t.tag)) || [];
  const categories = Array.from(new Set(thoughts.map(t => t.tag) || []));

  // Group thoughts into collections for garden view (mock data structure)
  const collections = [
    {
      id: 'ai-alignment',
      title: 'AI Alignment',
      thoughts: articles.slice(0, 1),
      connections: ['human-identity'],
      position: { x: 30, y: 45 }
    },
    {
      id: 'human-identity',
      title: 'Human Identity',
      thoughts: [thoughts.find(t => t.id === "2")].filter(Boolean),
      connections: ['ai-alignment'],
      position: { x: 70, y: 45 }
    }
  ];

  const renderEditorialView = () => (
    <div className="space-y-12">
      {/* Featured Article Section */}
      {articles.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-medium text-warm-brown">Featured Articles</h2>
            <div className="flex-1 h-px bg-warm-brown/20"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ThoughtCard thought={articles[0]} variant="featured" />
            <div className="grid gap-4">
              {articles.slice(1, 3).map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Thoughts Stream */}
      {quickThoughts.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-medium text-warm-brown">Quick Thoughts</h2>
            <div className="flex-1 h-px bg-warm-brown/20"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickThoughts.map((thought) => (
              <ThoughtCard key={thought.id} thought={thought} variant="micro" />
            ))}
          </div>
        </section>
      )}

      {/* Media Content */}
      {mediaContent.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-medium text-warm-brown">Media & Presentations</h2>
            <div className="flex-1 h-px bg-warm-brown/20"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaContent.map((thought) => (
              <ThoughtCard key={thought.id} thought={thought} variant="media" />
            ))}
          </div>
        </section>
      )}

      {/* All Other Content */}
      {thoughts && thoughts.length > articles.length + quickThoughts.length + mediaContent.length && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-medium text-warm-brown">More Thoughts</h2>
            <div className="flex-1 h-px bg-warm-brown/20"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="thoughts-grid">
            {thoughts
              .filter(t => !articles.includes(t) && !quickThoughts.includes(t) && !mediaContent.includes(t))
              .map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} variant="compact" />
              ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderGardenView = () => (
    <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-8">
      {/* Garden Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Main Thought Cards */}
        {thoughts.map((thought, index) => (
          <div
            key={thought.id}
            className="cursor-pointer group/card"
          >
            <div className={`w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative flex flex-col ${thought.tag === 'Thought Bite' ? 'min-h-[180px]' : 'min-h-[220px]'}`}>
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
                  <span className="text-xs text-warm-brown font-medium group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500">{thought.tag}</span>
                  <span className="text-xs text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">{thought.date || "Aug 7, 2025"}</span>
                </div>
                <h3 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2 group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500">
                  {thought.title}
                </h3>
                <p className="text-xs text-soft-black/70 mb-3 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-1">
                  {thought.description || 'Exploring fundamental questions about what makes us human in an era where artificial intelligence increasingly mirrors human capabilities.'}
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

                {/* CTA Button - Only show if not Thought Bite */}
                {thought.tag !== 'Thought Bite' && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* View Toggle - Just below nav */}
      <div className="absolute top-20 right-6">
        <div className="flex items-center gap-2 bg-light-brown rounded-lg p-1">
          <button
            onClick={() => setViewMode('garden')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
              viewMode === 'garden'
                ? 'bg-warm-brown text-cream shadow-sm'
                : 'text-warm-brown hover:bg-warm-brown/10'
            }`}
          >
            Garden
          </button>
          <button
            onClick={() => setViewMode('editorial')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
              viewMode === 'editorial'
                ? 'bg-warm-brown text-cream shadow-sm'
                : 'text-warm-brown hover:bg-warm-brown/10'
            }`}
          >
            Editorial
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="text-center mb-12 pt-4">
        {/* Title */}
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
          {viewMode === 'garden' ? 'Garden View' : 'Editorial View'}
        </h1>

        {/* Description based on view mode */}
        {viewMode === 'garden' ? (
          <p className="text-muted-grey max-w-xl mx-auto">
            A collection of my thoughts, ideas, and experiments organized in a non-linear, interconnected layout
          </p>
        ) : (
          <p className="text-muted-grey max-w-xl mx-auto">
            A collection of my thoughts, ideas, and experiments organized in a linear, editorial layout
          </p>
        )}
      </header>

      {/* Category Filter Tabs - Only show in editorial mode */}
      {viewMode === 'editorial' && categories.length > 0 && (
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-3 py-1.5 text-xs bg-warm-brown text-cream rounded-full">
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-3 py-1.5 text-xs border border-warm-brown/30 text-warm-brown rounded-full hover:bg-warm-brown hover:text-cream transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Content based on view mode */}
      {viewMode === 'editorial' ? renderEditorialView() : renderGardenView()}

      {/* Load More - Only show in editorial mode */}
      {viewMode === 'editorial' && (
        <div className="text-center mt-12">
          <button className="border border-warm-brown/30 text-warm-brown px-6 py-2 rounded-lg hover:bg-warm-brown hover:text-cream transition-colors duration-200 text-sm">
            Load More Content
          </button>
        </div>
      )}
    </div>
  );
}