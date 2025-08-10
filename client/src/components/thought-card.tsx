import { Thought } from "@shared/schema";
import { useLocation } from "wouter";

interface ThoughtCardProps {
  thought: Thought;
  variant?: 'default' | 'large' | 'featured' | 'compact' | 'micro' | 'media';
}

export function ThoughtCard({ thought, variant = 'default' }: ThoughtCardProps) {
  const [, setLocation] = useLocation();

  const handleSeeMoreClick = () => {
    setLocation("/thoughts/ai-alignment-presentation");
  };

  // Micro variant for quick thoughts
  if (variant === 'micro') {
    return (
      <article className="bg-light-brown rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 group border border-warm-brown/10">
        <div className="flex items-start gap-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${thought.imageGradient} flex-shrink-0 mt-1`}></div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 bg-warm-brown/10 text-warm-brown rounded-full font-medium" data-testid={`text-thought-tag-${thought.id}`}>
                {thought.tag}
              </span>
              <span className="text-xs text-muted-grey" data-testid={`text-thought-readtime-${thought.id}`}>
                {thought.readTime}
              </span>
            </div>
            <p className="text-sm text-soft-black leading-relaxed" data-testid={`text-thought-description-${thought.id}`}>
              {thought.description}
            </p>
          </div>
        </div>
      </article>
    );
  }

  // Compact variant for secondary content
  if (variant === 'compact') {
    return (
      <article className="bg-light-brown rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className={`bg-gradient-to-br ${thought.imageGradient} h-24 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 bg-warm-brown/10 text-warm-brown rounded-full font-medium" data-testid={`text-thought-tag-${thought.id}`}>
              {thought.tag}
            </span>
            <span className="text-xs text-muted-grey" data-testid={`text-thought-readtime-${thought.id}`}>
              {thought.readTime}
            </span>
          </div>
          <h3 className="font-light text-warm-brown mb-2 leading-tight text-sm group-hover:text-hover-brown transition-colors duration-200" data-testid={`text-thought-title-${thought.id}`}>
            {thought.title}
          </h3>
          <p className="text-xs text-soft-black/80 leading-relaxed line-clamp-2" data-testid={`text-thought-description-${thought.id}`}>
            {thought.description}
          </p>
        </div>
      </article>
    );
  }

  // Featured variant for hero content
  if (variant === 'featured') {
    return (
      <article className="bg-light-brown rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className={`bg-gradient-to-br ${thought.imageGradient} h-48 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
          {/* Content Type Icon */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-warm-brown" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs px-3 py-1.5 bg-warm-brown text-cream rounded-full font-medium" data-testid={`text-thought-tag-${thought.id}`}>
              {thought.tag}
            </span>
            <span className="text-sm text-muted-grey" data-testid={`text-thought-readtime-${thought.id}`}>
              {thought.readTime}
            </span>
          </div>
          <h3 className="font-light text-warm-brown mb-3 leading-tight text-xl group-hover:text-hover-brown transition-colors duration-200" data-testid={`text-thought-title-${thought.id}`}>
            {thought.title}
          </h3>
          <p className="text-soft-black/80 leading-relaxed mb-4 text-sm" data-testid={`text-thought-description-${thought.id}`}>
            {thought.description}
          </p>
          {thought.status === 'wip' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-grey">
                <div className="w-2 h-2 bg-warm-brown/40 rounded-full animate-pulse"></div>
                <span className="font-medium">Work in Progress</span>
              </div>
            </div>
          ) : (
            <button className="text-warm-brown hover:text-hover-brown transition-colors duration-200 text-sm font-medium flex items-center gap-2 group/btn" data-testid={`button-read-more-${thought.id}`} onClick={handleSeeMoreClick}>
              <span>See more</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
      </article>
    );
  }

  // Media variant for video/audio/slides
  if (variant === 'media') {
    const getMediaIcon = () => {
      if (thought.tag === 'Video') return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
        </svg>
      );
      if (thought.tag === 'Audio') return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zM12.828 10.657a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.415 1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      );
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
        </svg>
      );
    };

    return (
      <article className="bg-light-brown rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className={`bg-gradient-to-br ${thought.imageGradient} h-32 relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
          <div className="relative text-white">
            {getMediaIcon()}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-warm-brown text-cream rounded-full font-medium" data-testid={`text-thought-tag-${thought.id}`}>
              {thought.tag}
            </span>
            <span className="text-xs text-muted-grey" data-testid={`text-thought-readtime-${thought.id}`}>
              {thought.readTime}
            </span>
          </div>
          <h3 className="font-light text-warm-brown mb-2 leading-tight text-lg group-hover:text-hover-brown transition-colors duration-200" data-testid={`text-thought-title-${thought.id}`}>
            {thought.title}
          </h3>
          <p className="text-soft-black/80 leading-relaxed text-sm mb-4" data-testid={`text-thought-description-${thought.id}`}>
            {thought.description}
          </p>
          <button className="w-full bg-warm-brown text-cream py-2 px-4 rounded-lg hover:bg-hover-brown transition-colors duration-200 text-sm font-medium" data-testid={`button-read-more-${thought.id}`} onClick={handleSeeMoreClick}>
            {thought.tag === 'Video' ? 'Watch' : thought.tag === 'Audio' ? 'Listen' : 'View'}
          </button>
        </div>
      </article>
    );
  }

  // Default and large variants (existing logic)
  const isLarge = variant === 'large';

  return (
    <article className="bg-light-brown rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full">
      <div className={`bg-gradient-to-br ${thought.imageGradient} ${isLarge ? 'h-64' : 'h-48'} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `
                      radial-gradient(ellipse 60% 45% at 25% 15%, #f59e0b 0%, #f59e0b 55%, transparent 95%),
                      radial-gradient(ellipse 55% 40% at 75% 25%, #dc2626 0%, #dc2626 50%, transparent 90%),
                      radial-gradient(ellipse 50% 55% at 15% 80%, #ea580c 0%, #ea580c 60%, transparent 100%),
                      radial-gradient(ellipse 55% 35% at 85% 90%, #facc15 0%, #facc15 45%, transparent 85%),
                      radial-gradient(ellipse 45% 50% at 50% 60%, #ef4444 0%, #ef4444 50%, transparent 90%)
                    `,
                    minHeight: '100%',
                    minWidth: '100%'
                  }}
                />
              </div>

              <div className="relative z-10">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      <div className={`${isLarge ? 'p-8' : 'p-6'} flex flex-col h-full`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-3 py-1.5 bg-warm-brown/10 text-warm-brown rounded-full font-medium" data-testid={`text-thought-tag-${thought.id}`}>
            {thought.tag === 'AI Alignment' ? 'AI Alignment' : thought.tag}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-grey">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span data-testid={`text-thought-readtime-${thought.id}`}>
              {thought.readTime}
            </span>
          </div>
        </div>

        <h3 className={`font-light text-warm-brown mb-4 leading-tight group-hover:text-hover-brown transition-colors duration-200 ${
            isLarge ? 'text-2xl' : 'text-xl'
          }`} data-testid={`text-thought-title-${thought.id}`}>
          {thought.title}
        </h3>

        <p className={`text-soft-black/80 leading-relaxed mb-6 flex-grow ${
            isLarge ? 'text-base' : 'text-sm'
          }`} data-testid={`text-thought-description-${thought.id}`}>
          {thought.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {thought.status === 'wip' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-grey">
                <div className="w-1.5 h-1.5 bg-warm-brown/40 rounded-full animate-pulse"></div>
                <span className="font-medium">Work in Progress</span>
              </div>
            </div>
          ) : (
            <button className="text-warm-brown hover:text-hover-brown transition-colors duration-200 text-sm font-medium flex items-center gap-2 group/btn" data-testid={`button-read-more-${thought.id}`} onClick={handleSeeMoreClick}>
              <span>See more</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-1 w-6 rounded-full ${
                  i === 0 ? 'bg-warm-brown' : 'bg-warm-brown/20'
                }`}></div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}