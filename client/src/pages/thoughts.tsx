import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import { getPaintSplatter } from "@/lib/paint-splatters";

export default function Thoughts() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const [modalSlide, setModalSlide] = useState<string | null>(null); // State for modal slide
  const [expandedThought, setExpandedThought] = useState<string | null>(null);

  // Group thoughts by content type for mixed layout
  const articles = thoughts?.filter(t => t.tag === 'Article' || (t.readTime && typeof t.readTime === 'string' && t.readTime.includes('min'))) || [];
  const quickThoughts = thoughts?.filter(t => t.tag === 'Quick Thought' || t.tag === 'Shower Thought') || [];
  const mediaContent = thoughts?.filter(t => ['Video', 'Audio', 'Slides'].includes(t.tag)) || [];
  const categories = Array.from(new Set(thoughts?.map(t => t.tag) || []));

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

  const handleSlideExpansion = (thoughtId: string) => {
    setExpandedSlide(expandedSlide === thoughtId ? null : thoughtId);
  };

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

  const getGoogleSlidesUrl = (thoughtId: string) => {
    // Map thought IDs to their respective Google Slides URLs
    const slideUrls: Record<string, string> = {
      "1": "https://docs.google.com/presentation/d/e/2PACX-1vRRURqdZXOqJoW5apKDdfoLQCjxHipqrL3BIWppgfs4Lq4ETCDCuPyVZNSsYr0jUeL845-ymDPYbD6N/embed?start=false&loop=false&delayms=3000"
    };
    return slideUrls[thoughtId] || "";
  };

  const MasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {sortedThoughts.map((thought, index) => (
        <div key={thought.id} className="break-inside-avoid mb-6 cursor-pointer group/card">
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
                  <div className="space-y-3 text-sm text-soft-black/80 leading-relaxed mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-warm-brown font-medium">1.</span>
                      <p>Will AI know what we believe better than we do?</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-warm-brown font-medium">2.</span>
                      <p>Is human voting unethical if AI governs better?</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-warm-brown font-medium">3.</span>
                      <p>Will AI discover our beliefs or shape them?</p>
                    </div>
                  </div>
                </>
              ) : thought.tag === 'Scenario' && thought.id === '5' ? (
                <>
                  <h3 className="text-lg font-medium text-warm-brown mb-4">
                    {thought.title}
                  </h3>
                  <div className="text-sm text-soft-black/70 mb-4 leading-relaxed">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-warm-brown font-medium">•</span>
                      <p>The AI Babysitter</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-warm-brown font-medium">•</span>
                      <p>Employee Courtesy Score</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-warm-brown font-medium">•</span>
                      <p>The Rudeness Penalty</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-warm-brown font-medium">•</span>
                      <p>My AI God-Parent</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-warm-brown mb-4">
                    {thought.title}
                  </h3>
                  <div className="text-sm text-soft-black/70 mb-6 leading-relaxed">
                    {thought.id === '8' ? (
                      <>
                        {expandedThought === thought.id ? (
                          <>
                            <p className="mb-3">The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).</p>
                            <p className="mb-3">Optimists see missed breakthroughs as moral failures—every delayed cure costs lives. Pessimists see rushed deployments as existential risks—one bad AI launch undermines decades of progress.</p>
                            <p className="mb-3">Short-term, reversible decisions favour Type 1 tolerance (try fast, fail fast). Long-term, irreversible ones favour Type 2 tolerance (genetic modifications, climate interventions can't be easily undone).</p>
                            <p className="mb-3">The question isn't which error type to avoid, but developing better mechanisms to adjust our tolerance based on context, stakes, and reversibility.</p>
                            <button
                              onClick={() => setExpandedThought(null)}
                              className="text-warm-brown/80 hover:text-warm-brown text-xs font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See less
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="mb-2">The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).</p>
                            <button
                              onClick={() => setExpandedThought(thought.id)}
                              className="text-warm-brown/80 hover:text-warm-brown text-xs font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See more
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {(thought.description || '').split('\n').map((line, idx) => (
                          <p key={idx} className="mb-1">{line}</p>
                        ))}
                      </>
                    )}
                  </div>
                </>
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
                  <button
                    onClick={() => setModalSlide(thought.id)}
                    className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown"
                  >
                    View slides
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        {/* Title */}
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
          Idea Garden
        </h1>

        {/* Description */}
        <p className="text-muted-grey max-w-xl mx-auto">
          Reflections on design, strategy, and the intersection of technology and humanity
        </p>
      </header>

      {/* Idea Garden Content */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        {/* Mobile: Instagram-style vertical feed */}
        {isMobile ? (
          <div className="space-y-4">
            {sortedThoughts.map((thought, index) => (
              <div key={thought.id} className="group/card cursor-pointer">
                <div className="w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 overflow-hidden relative">
                  {/* Paint Splatter Background - only for non-scenario cards */}
                  {thought.tag !== 'Scenario' && (
                    <>
                      <div
                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl"
                        style={{
                          background: thought.tag === 'POV' ? `
                            radial-gradient(ellipse 280px 220px at 15% 25%, #84cc16 0%, #84cc16 50%, transparent 90%),
                            radial-gradient(ellipse 250px 190px at 85% 15%, #22c55e 0%, #22c55e 45%, transparent 85%),
                            radial-gradient(ellipse 220px 260px at 25% 85%, #16a34a 0%, #16a34a 55%, transparent 95%),
                            radial-gradient(ellipse 290px 180px at 75% 90%, #65a30d 0%, #65a30d 40%, transparent 80%),
                            radial-gradient(ellipse 210px 230px at 55% 45%, #15803d 0%, #15803d 50%, transparent 90%)
                          ` : thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? `
                            radial-gradient(ellipse 270px 210px at 20% 30%, #0ea5e9 0%, #0ea5e9 50%, transparent 90%),
                            radial-gradient(ellipse 240px 180px at 80% 20%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                            radial-gradient(ellipse 210px 250px at 10% 80%, #0891b2 0%, #0891b2 55%, transparent 95%),
                            radial-gradient(ellipse 280px 170px at 90% 85%, #22d3ee 0%, #22d3ee 40%, transparent 80%),
                            radial-gradient(ellipse 200px 220px at 50% 50%, #0284c7 0%, #0284c7 50%, transparent 90%)
                          ` : thought.tag === 'Scenario' ? `
                            radial-gradient(ellipse 260px 200px at 25% 20%, #f97316 0%, #f97316 50%, transparent 90%),
                            radial-gradient(ellipse 230px 170px at 75% 30%, #ea580c 0%, #ea580c 45%, transparent 85%),
                            radial-gradient(ellipse 200px 240px at 15% 75%, #dc2626 0%, #dc2626 55%, transparent 95%),
                            radial-gradient(ellipse 270px 160px at 85% 80%, #fb923c 0%, #fb923c 40%, transparent 80%),
                            radial-gradient(ellipse 190px 210px at 45% 55%, #ef4444 0%, #ef4444 50%, transparent 90%)
                          ` : `
                            radial-gradient(ellipse 275px 215px at 30% 25%, #a855f7 0%, #a855f7 50%, transparent 90%),
                            radial-gradient(ellipse 245px 185px at 70% 15%, #8b5cf6 0%, #8b5cf6 45%, transparent 85%),
                            radial-gradient(ellipse 215px 255px at 20% 80%, #9333ea 0%, #9333ea 55%, transparent 95%),
                            radial-gradient(ellipse 285px 175px at 80% 90%, #d946ef 0%, #d946ef 40%, transparent 80%),
                            radial-gradient(ellipse 205px 225px at 50% 40%, #7c3aed 0%, #7c3aed 50%, transparent 90%)
                          `,
                          transform: 'scale(1.8) rotate(25deg)'
                        }}
                      />
                      {/* Text Background for better readability when splatter is visible */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />
                    </>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium transition-all duration-500 ${
                          thought.tag === 'Scenario' ? 'text-warm-brown' : 'text-warm-brown group-hover/card:text-white group-hover/card:font-semibold'
                        }`}>{thought.tag}</span>
                        {thought.status === 'wip' && (
                          <span className="text-xs px-2 py-0.5 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                            WIP
                          </span>
                        )}
                      </div>
                      <span className={`text-sm transition-all duration-500 ${
                        thought.tag === 'Scenario' ? 'text-warm-brown/60' : 'text-warm-brown/60 group-hover/card:text-white/70'
                      }`}>{thought.date || "Aug 11, 2025"}</span>
                    </div>

                    {/* Special treatment for Scenario - just title and image */}
                    {thought.tag === 'Scenario' ? (
                      <>
                        <h3 className="text-lg font-medium text-warm-brown mb-4 text-left">
                          {thought.title}
                        </h3>
                        {thought.id === '4' ? (
                          <>
                            <div className="flex items-center justify-center mb-4">
                              <img
                                src={democracyImage}
                                alt="Democracy's Last Voter illustration"
                                className="max-w-full max-h-64 object-contain rounded-lg"
                              />
                            </div>
                            <div className="space-y-3 text-sm text-soft-black/80 leading-relaxed">
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">1.</span>
                                <p>Will AI know what we believe better than we do?</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">2.</span>
                                <p>Is human voting unethical if AI governs better?</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">3.</span>
                                <p>Will AI discover our beliefs or shape them?</p>
                              </div>
                            </div>
                          </>
                        ) : thought.id === '5' ? (
                          <>
                            <div className="space-y-3 text-sm text-soft-black/80 leading-relaxed">
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">•</span>
                                <p>The AI Babysitter</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">•</span>
                                <p>Employee Courtesy Score</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">•</span>
                                <p>The Rudeness Penalty</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-warm-brown font-medium">•</span>
                                <p>My AI God-Parent</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-soft-black/70 mb-4 leading-relaxed">
                            {(thought.description || '').split('\n').map((line, index) => (
                              <p key={index} className="mb-1">{line}</p>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className={`text-lg font-medium text-warm-brown mb-4 group-hover/card:text-white group-hover/card:font-semibold transition-all duration-500`}>
                          {thought.title}
                        </h3>
                        <div className="text-sm text-soft-black/70 mb-6 leading-relaxed">
                          {thought.id === '8' ? (
                            <>
                              {expandedThought === thought.id ? (
                                <>
                                  <p className="mb-3">The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).</p>
                                  <p className="mb-3">Optimists see missed breakthroughs as moral failures—every delayed cure costs lives. Pessimists see rushed deployments as existential risks—one bad AI launch undermines decades of progress.</p>
                                  <p className="mb-3">Short-term, reversible decisions favour Type 1 tolerance (try fast, fail fast). Long-term, irreversible ones favour Type 2 tolerance (genetic modifications, climate interventions can't be easily undone).</p>
                                  <p className="mb-3">The question isn't which error type to avoid, but developing better mechanisms to adjust our tolerance based on context, stakes, and reversibility.</p>
                                  <button
                                    onClick={() => setExpandedThought(null)}
                                    className="text-warm-brown/80 hover:text-warm-brown text-xs font-medium mt-2 flex items-center gap-1"
                                  >
                                    <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    See less
                                  </button>
                                </>
                              ) : (
                                <>
                                  <p className="mb-2">The discourse around AI development seems to come back to Type 1 and Type 2 error tolerances (like politics).</p>
                                  <button
                                    onClick={() => setExpandedThought(thought.id)}
                                    className="text-warm-brown/80 hover:text-warm-brown text-xs font-medium mt-2 flex items-center gap-1"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    See more
                                  </button>
                                </>
                              )}
                            </>
                          ) : thought.id === '7' ? (
                            <div className="text-sm text-soft-black/70 mb-6 leading-relaxed">
                              {thought.description?.split('\n').map((line, index) => (
                                <div key={index} className="flex items-start gap-2 mb-2">
                                  <span className="text-warm-brown font-medium">•</span>
                                  <p>{line}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-soft-black/70 mb-6 leading-relaxed">
                              {thought.description?.split('\n').map((line, index) => (
                                <p key={index} className="mb-1">{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Read time indicator - Skip for Thought Bite, Philosophizing, and Scenario */}
                    {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-4 h-4 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                          {thought.readTime || "5 min read"}
                        </span>
                      </div>
                    )}

                    {/* CTA Button - Only show if not Thought Bite, Philosophizing, or Scenario */}
                    {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                      <>
                        {thought.status === 'wip' ? (
                          <div className="flex items-center justify-center gap-2 py-3">
                            <div className="flex items-center gap-2 text-sm text-warm-brown/60 group-hover/card:text-white/70">
                              <div className="w-2 h-2 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                              <span className="font-medium">Work in Progress</span>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setModalSlide(thought.id)}
                            className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown"
                          >
                            {expandedSlide === thought.id ? 'Hide slides' : 'View slides'}
                          </button>
                        )}
                      </>
                    )}

                    {/* Inline Google Slides - Mobile */}
                    {expandedSlide === thought.id && getGoogleSlidesUrl(thought.id) && (
                      <div className="mt-4 bg-light-brown rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-warm-brown">Presentation</h4>
                          <button
                            onClick={() => setExpandedSlide(null)}
                            className="text-warm-brown hover:text-hover-brown"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-full h-[400px] bg-light-brown rounded-lg overflow-hidden">
                          <iframe
                            src={getGoogleSlidesUrl(thought.id)}
                            width="100%"
                            height="100%"
                            allowFullScreen
                            frameBorder="0"
                            className="rounded-lg"
                            title={`${thought.title} Presentation`}
                          />
                        </div>
                        <div className="mt-3 flex justify-center">
                          <a
                            href="https://docs.google.com/presentation/d/13caT7YIdBzGhW89Wv2a0RxOFCgxq1m0swQpde1wzEOo/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-warm-brown hover:text-hover-brown text-xs font-medium flex items-center gap-2"
                          >
                            <span>Open in Google Slides</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Masonry Layout */
          <MasonryLayout />
        )}
      </div>

      {/* Modal for Desktop Slide Expansion */}
      {modalSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-xl p-8 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-warm-brown">
                {thoughts.find(t => t.id === modalSlide)?.title}
              </h3>
              <button
                onClick={() => setModalSlide(null)}
                className="text-warm-brown hover:text-hover-brown transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full h-[60vh] bg-light-brown rounded-lg overflow-hidden mb-4">
              <iframe
                src={getGoogleSlidesUrl(modalSlide)}
                width="100%"
                height="100%"
                allowFullScreen
                frameBorder="0"
                className="rounded-lg"
                title={`${thoughts.find(t => t.id === modalSlide)?.title} Presentation`}
              />
            </div>
            <div className="flex justify-center">
              <a
                href="https://docs.google.com/presentation/d/13caT7YIdBzGhW89Wv2a0RxOFCgxq1m0swQpde1wzEOo/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-brown hover:text-hover-brown text-sm font-medium flex items-center gap-2"
              >
                <span>Open in Google Slides</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}