import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { PostTruthPattern } from "@/components/patterns/post-truth-pattern";
import { AIHumanPattern } from "@/components/patterns/ai-human-pattern";
import { AIGovernancePattern } from "@/components/patterns/ai-governance-pattern";

export default function ThoughtsBlooms() {
  const [location] = useLocation();
  
  // Determine active tab
  const isBloomsActive = location === "/thoughts" || location === "/thoughts/blooms";
  const isSeedsActive = location === "/thoughts/seeds";

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 thoughts-background-texture">
      {/* Tab Navigation */}
      <div className="flex items-center justify-center gap-8 mb-12">
        <Link href="/thoughts/blooms">
          <a className={cn(
            "text-base font-medium transition-colors duration-200 pb-1 cursor-pointer",
            isBloomsActive 
              ? "text-warm-brown border-b-2 border-warm-brown" 
              : "text-muted-grey hover:text-warm-brown"
          )}>
            Blooms
          </a>
        </Link>
        <Link href="/thoughts/seeds">
          <a className={cn(
            "text-base font-medium transition-colors duration-200 pb-1 cursor-pointer",
            isSeedsActive 
              ? "text-warm-brown border-b-2 border-warm-brown" 
              : "text-muted-grey hover:text-warm-brown"
          )}>
            Seeds
          </a>
        </Link>
      </div>

      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Idea Blooms
        </h1>
        <p className="text-muted-grey max-w-xl mx-auto">
          Fully formed ideas and deeper explorations that have grown from seeds
        </p>
      </header>

      {/* Hero Cards */}
      <div className="max-w-5xl mx-auto">
        {/* Card 1: Post-Truth Futures */}
        <Link href="/post-truth">
          <a className="block group relative overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer">
            {/* Abstract pattern background */}
            <PostTruthPattern />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 min-h-[280px] flex flex-col justify-end">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl md:text-5xl font-semibold text-white" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)' }}>
                  Post-Truth Futures
                </h2>
                <span className="text-sm text-white/80 font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Nov 2025</span>
              </div>
              <p className="text-white/95 text-lg leading-relaxed max-w-2xl" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>
                Navigating a world where truth becomes increasingly malleable and verification becomes critical
              </p>
            </div>
          </a>
        </Link>

        {/* Card 2: AI Governance Futures Explorer */}
        <Link href="/thoughts/ai-governance-explorer" className="block mt-12">
          <a className="block group relative overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer">
            {/* Abstract pattern background */}
            <AIGovernancePattern />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 min-h-[280px] flex flex-col justify-end">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl md:text-5xl font-semibold text-white" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)' }}>
                  AI Governance Futures Explorer
                </h2>
                <span className="text-sm text-white/80 font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Nov 2025</span>
              </div>
              <p className="text-white/95 text-lg leading-relaxed max-w-2xl" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>
                Explore how different decisions and drivers shape future scenarios for AI governance
              </p>
            </div>
          </a>
        </Link>

        {/* Card 3: Addressing the AI x Human Gap */}
        <Link href="/thoughts/ai-human-gap" className="block mt-12">
          <a className="block group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200/60">
            {/* Abstract pattern background */}
            <AIHumanPattern />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 min-h-[280px] flex flex-col justify-end">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl md:text-5xl font-semibold text-warm-brown">
                  Addressing the AI x Human Gap
                </h2>
                <span className="text-sm text-muted-grey font-medium">Jul 2025</span>
              </div>
              <p className="text-soft-black text-lg leading-relaxed max-w-2xl">
                Exploring 3 critical human breakdowns when AI continues to evolve and where humans need to recalibrate to stay relevant and thrive
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

