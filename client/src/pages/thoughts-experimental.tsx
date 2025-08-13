import { useState } from "react";
import { useLocation } from "wouter";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import { getPaintSplatter } from "@/lib/paint-splatters";

// Written notes data - matches thought IDs to handwritten notes
const writtenNotes: Record<string, string> = {
  "8": "Inspired by convo with Mel Y"
};

export default function ThoughtsExperimental() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [expandedThought, setExpandedThought] = useState<string | null>(null);

  // Sort thoughts by date (most recent first)
  const sortedThoughts = [...thoughts].sort((a, b) => {
    const dateA = new Date(a.date || "Aug 11, 2025");
    const dateB = new Date(b.date || "Aug 11, 2025");
    return dateB.getTime() - dateA.getTime();
  });

  // Get paint splatter for pill hover background
  const getPillHoverStyle = (tag: string) => {
    const splatter = getPaintSplatter(tag);
    return {
      background: splatter.background
    };
  };

  const MasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {sortedThoughts.map((thought, index) => {
        const isExpanded = expandedThought === thought.id;
        const descriptionLines = (thought.description || '').split('\n');
        const shortDescription = descriptionLines.slice(0, 1).join('\n');
        const fullDescription = descriptionLines.join('\n');

        return (
          <div key={thought.id} className="break-inside-avoid mb-6 cursor-pointer group/card" onClick={() => thought.id === '8' && setExpandedThought(isExpanded ? null : thought.id)}>
            <div className={`w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative ${
              thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'min-h-[180px]' :
              thought.tag === 'Scenario' ? 'min-h-[260px]' :
              index % 3 === 0 ? 'min-h-[300px]' : 'min-h-[240px]'
            }`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {/* Tag pill with border default and paint splatter hover */}
                    <span className="relative text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-500 border border-warm-brown/30 text-warm-brown overflow-hidden">
                      {/* Default border state - visible by default */}
                      <span className="relative z-10 transition-colors duration-500 group-hover/card:text-white">
                        {thought.tag}
                      </span>
                      {/* Paint splatter background - appears on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full"
                        style={getPillHoverStyle(thought.tag)}
                      />
                    </span>
                    {thought.status === 'wip' && (
                      <span className="text-xs px-2 py-0.5 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                        WIP
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-warm-brown/60">
                    {thought.date || "Aug 11, 2025"}
                  </span>
                </div>

                {thought.tag === 'Scenario' && thought.id === '4' ? (
                  <>
                    <h3 className="text-lg font-medium text-warm-brown mb-4">
                      {thought.title}
                    </h3>
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={democracyImage}
                        alt="Democracy's Last Voter illustration"
                        className="max-w-full max-h-48 object-contain rounded-lg"
                      />
                    </div>
                    <div className="space-y-3 text-sm text-soft-black/70 leading-relaxed mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-warm-brown font-medium">•</span>
                        <p>Will AI know what we believe better than we do?</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-warm-brown font-medium">•</span>
                        <p>Is human voting unethical if AI governs better?</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-warm-brown font-medium">•</span>
                        <p>Will AI discover our beliefs or shape them?</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-warm-brown mb-4">
                      {thought.title}
                    </h3>
                    <div className="text-sm text-soft-black/70 mb-6 leading-relaxed">
                      {(thought.id === '8' ? (isExpanded ? fullDescription : shortDescription) : fullDescription).split('\n').map((line, idx) => (
                        <p key={idx} className="mb-1">{line}</p>
                      ))}
                    </div>
                    {thought.id === '8' && (
                      <div className="text-center">
                        <button className="text-sm font-medium text-warm-brown hover:underline">
                          {isExpanded ? "See less" : "See more"}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Written Notes - appears like pencil handwriting */}
                {writtenNotes[thought.id] && (
                  <div className="mt-4 mb-4">
                    <div 
                      className="relative inline-block transform -rotate-1 px-3 py-2 rounded-lg border-2 border-dashed opacity-80"
                      style={{
                        borderColor: getPaintSplatter(thought.tag).className.includes('green') ? '#22c55e' :
                                   getPaintSplatter(thought.tag).className.includes('blue') ? '#06b6d4' :
                                   getPaintSplatter(thought.tag).className.includes('purple') ? '#a855f7' :
                                   getPaintSplatter(thought.tag).className.includes('red') ? '#ef4444' :
                                   getPaintSplatter(thought.tag).className.includes('orange') ? '#f97316' :
                                   getPaintSplatter(thought.tag).className.includes('amber') ? '#f59e0b' :
                                   getPaintSplatter(thought.tag).className.includes('pink') ? '#ec4899' :
                                   getPaintSplatter(thought.tag).className.includes('slate') ? '#64748b' :
                                   '#22c55e'
                      }}
                    >
                      <p 
                        className="text-sm font-mono tracking-wide transform rotate-1"
                        style={{
                          fontFamily: "'Kalam', 'Comic Sans MS', cursive",
                          color: getPaintSplatter(thought.tag).className.includes('green') ? '#166534' :
                                getPaintSplatter(thought.tag).className.includes('blue') ? '#0e7490' :
                                getPaintSplatter(thought.tag).className.includes('purple') ? '#7c2d12' :
                                getPaintSplatter(thought.tag).className.includes('red') ? '#991b1b' :
                                getPaintSplatter(thought.tag).className.includes('orange') ? '#c2410c' :
                                getPaintSplatter(thought.tag).className.includes('amber') ? '#d97706' :
                                getPaintSplatter(thought.tag).className.includes('pink') ? '#be185d' :
                                getPaintSplatter(thought.tag).className.includes('slate') ? '#475569' :
                                '#166534',
                          textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {writtenNotes[thought.id]}
                      </p>
                      {/* Small pencil icon */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 opacity-60">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-600">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-4 h-4 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-warm-brown/60">
                      {thought.readTime || "5 min read"}
                    </span>
                  </div>
                )}

                {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                  thought.status === 'wip' ? (
                    <div className="flex items-center justify-center gap-2 py-3">
                      <div className="flex items-center gap-2 text-sm text-warm-brown/60">
                        <div className="w-2 h-2 bg-warm-brown/40 rounded-full animate-pulse"></div>
                        <span className="font-medium">Work in Progress</span>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown">
                      Read more
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6">Idea Garden - Masonry Layout</h1>
        <p className="text-muted-grey max-w-2xl mx-auto mb-8">
          A Pinterest-style flowing grid layout organized chronologically with thematic color coding
        </p>
      </header>

      {/* Layout Content */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-6 md:p-8">
        {!isMobile ? (
          <MasonryLayout />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-light text-warm-brown mb-4">Mobile View</h3>
            <p className="text-muted-grey">
              Layout exploration is optimized for desktop viewing.
              The mobile experience uses a single-column layout for optimal readability.
            </p>
          </div>
        )}
      </div>

      {/* Back to main thoughts */}
      <div className="text-center pt-8 border-t border-warm-brown/10 mt-12">
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