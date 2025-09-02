import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import fourTribesImage from "@assets/image_1755886711758.png";
import { getPaintSplatter } from "@/lib/paint-splatters";
import CopyEmail from "@/components/copy-email";
import { ExperimentalFilterV2 } from "@/components/experimental-filter-v2";

export default function Thoughts() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const [modalSlide, setModalSlide] = useState<string | null>(null); // State for modal slide
  const [expandedThought, setExpandedThought] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  // Get unique tags for filter options in specified order
  const uniqueTags = ["All", "Thought Bite", "Scenario", "POV", "Future Seed"];

  // Sort thoughts by date (most recent first)
  const allSortedThoughts = [...thoughts].sort((a, b) => {
    const dateA = new Date(a.date || "Aug 11, 2025");
    const dateB = new Date(b.date || "Aug 11, 2025");
    return dateB.getTime() - dateA.getTime();
  });

  // Filter thoughts based on selected filters (support for multiple selections)
  const sortedThoughts = selectedFilters.length > 0
    ? allSortedThoughts.filter(thought => selectedFilters.includes(thought.tag))
    : selectedFilter === "All"
      ? allSortedThoughts
      : allSortedThoughts.filter(thought => thought.tag === selectedFilter);



  const getGoogleSlidesUrl = (thoughtId: string) => {
    // Map thought IDs to their respective Google Slides URLs
    const slideUrls: Record<string, string> = {
      "1": "https://docs.google.com/presentation/d/e/2PACX-1vRRURqdZXOqJoW5apKDdfoLQCjxHipqrL3BIWppgfs4Lq4ETCDCuPyVZNSsYr0jUeL845-ymDPYbD6N/embed?start=false&loop=false&delayms=3000"
    };
    return slideUrls[thoughtId] || "";
  };

  const MasonryLayout = () => (
    <div className="md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {sortedThoughts.map((thought, index) => (
        <div key={thought.id} className="break-inside-avoid mb-6 cursor-pointer group/card">
          <div className={`w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative ${
            thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'min-h-[180px]' :
            thought.tag === 'Scenario' ? 'min-h-[260px]' :
            thought.tag === 'Future Seed' || thought.tag === 'POV' ? '' :
            index % 3 === 0 ? 'min-h-[300px]' : 'min-h-[240px]'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Tag pill with specific colors */}
                  {thought.status === 'wip' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-amber-500/60 text-amber-600/80 overflow-hidden group-hover/card:text-white group-hover/card:border-amber-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/80 to-orange-500/80 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
                      <span className="relative z-10">Coming Soon</span>
                    </span>
                  ) : thought.tag === 'Thought Bite' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-blue-500 text-blue-500 overflow-hidden group-hover/card:text-white group-hover/card:border-blue-500">
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'Scenario' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-red-500 text-red-500 overflow-hidden group-hover/card:text-white group-hover/card:border-red-500">
                      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'POV' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-green-500 text-green-500 overflow-hidden group-hover/card:text-white group-hover/card:border-green-500">
                      <div className="absolute inset-0 bg-green-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'Future Seed' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-purple-500 text-purple-500 overflow-hidden group-hover/card:text-white group-hover/card:border-purple-500">
                      <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 text-white overflow-hidden">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={getPaintSplatter(thought.tag)}
                      />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  {thought.date || "Aug 11, 2025"}
                </span>
              </div>

              {thought.tag === 'Scenario' && thought.id === '4' ? (
                <>
                  <h3 className="text-xl font-bold text-warm-brown mb-4 leading-tight group-hover/card:text-hover-brown transition-colors duration-300">
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
              ) : thought.id === '12' ? (
                <>
                  <h3 className="text-xl font-bold text-warm-brown mb-4 leading-tight group-hover/card:text-hover-brown transition-colors duration-300">
                    {thought.title}
                  </h3>
                  <div className="text-sm text-soft-black/80 leading-relaxed">
                    {expandedThought === thought.id ? (
                      <>
                        <p className="mb-4">{thought.fullDescription?.split('\n\n')[0]}</p>
                        <div className="flex items-center justify-center mb-4">
                          <img
                            src={fourTribesImage}
                            alt="Four Tribes of Tomorrow Matrix"
                            className="max-w-full max-h-64 object-contain rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="mb-2"><strong>Cautious Cyborgs</strong>: Safety-first, Risk-mitigation, Guardrails, Defense-oriented</p>
                            <p className="text-xs text-warm-brown/70 italic pl-4 border-l-2 border-warm-brown/20">Blind spot: Over-engineer safety into paralysis</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Augmented Dreamers</strong>: Move-fast, Push-boundaries, Scale-aggressively, Offense-oriented</p>
                            <p className="text-xs text-warm-brown/70 italic pl-4 border-l-2 border-warm-brown/20">Blind spot: Rush past critical safety considerations</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Nostalgic Doomers</strong>: Agency, Protection, Community, Preservation</p>
                            <p className="text-xs text-warm-brown/70 italic pl-4 border-l-2 border-warm-brown/20">Blind spot: Resist beneficial changes from loss aversion</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Analog Champions</strong>: Craft, Authenticity, Sustainability, Locality</p>
                            <p className="text-xs text-warm-brown/70 italic pl-4 border-l-2 border-warm-brown/20">Blind spot: Miss scale problems requiring technological solutions</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedThought(null)}
                          className="text-warm-brown/80 hover:text-warm-brown text-sm font-medium mt-4 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          See less
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center mb-4">
                          <img
                            src={fourTribesImage}
                            alt="Four Tribes of Tomorrow Matrix"
                            className="max-w-full max-h-48 object-contain rounded-lg"
                          />
                        </div>
                        <button
                          onClick={() => setExpandedThought(thought.id)}
                          className="text-warm-brown/80 hover:text-warm-brown text-sm font-medium mt-2 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          See more
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : thought.id === '7' ? (
                <>
                  <h3 className="text-xl font-bold text-warm-brown mb-4 leading-tight group-hover/card:text-hover-brown transition-colors duration-300">
                    {thought.title}
                  </h3>
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
                <>
                  <h3 className="text-xl font-bold text-warm-brown mb-4 leading-tight group-hover/card:text-hover-brown transition-colors duration-300">
                    {thought.id === '8' ? 'AI and Tolerances for Type I & II Errors' : thought.title}
                  </h3>
                  <div className="text-sm text-soft-black/70 leading-relaxed">
                    {(() => {
                      // Check if this thought has expandable content
                      const hasMoreContent = thought.fullDescription &&
                        thought.description &&
                        thought.fullDescription.trim().length > thought.description.trim().length + 50;

                      if (hasMoreContent) {
                        const isExpanded = expandedThought === thought.id;
                        const contentToShow = isExpanded ? thought.fullDescription : thought.description;

                        return (
                          <>
                            <div>
                              {contentToShow?.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{
                                  __html: paragraph
                                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                                    .replace(/<u>/g, '<u>').replace(/<\/u>/g, '</u>')
                                }} />
                              ))}
                            </div>
                            <button
                              onClick={() => setExpandedThought(isExpanded ? null : thought.id)}
                              className="text-warm-brown/80 hover:text-warm-brown text-sm font-medium flex items-center gap-1 mt-2"
                            >
                              <svg className={`w-3 h-3 ${isExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              {isExpanded ? 'See less' : 'See more'}
                            </button>
                          </>
                        );
                      } else {
                        // No expandable content, show description normally with proper paragraph spacing
                        return (
                          <div>
                            {(thought.description || '').split('\n\n').map((paragraph, index) => (
                              <p key={index} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{
                                __html: paragraph
                                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                                  .replace(/<u>/g, '<u>').replace(/<\/u>/g, '</u>')
                              }} />
                            ))}
                          </div>
                        );
                      }
                    })()}
                  </div>
                </>
              )}

              {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && thought.tag !== 'Future Seed' && thought.id !== '12' && (
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-4 h-4 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-warm-brown/60">
                    {thought.readTime || "5 min read"}
                  </span>
                </div>
              )}

              {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && thought.tag !== 'Future Seed' && thought.id !== '12' && (
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

  // This component is no longer used and can be removed or refactored if needed.
  // const MobileLayout = () => (
  //   <div className="grid grid-cols-1 gap-4">
  //     {sortedThoughts.map((thought, index) => (
  //       <div key={thought.id} className="cursor-pointer group/card">
  //         <div className={`w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative ${
  //           thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'min-h-[180px]' :
  //           thought.tag === 'Scenario' ? 'min-h-[260px]' :
  //           index % 3 === 0 ? 'min-h-[300px]' : 'min-h-[240px]'
  //         }`}>
  //           <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
  //             <div
  //               className="absolute inset-0 w-full h-full"
  //               style={{
  //                 background: thought.tag === 'AI Alignment' ? `
  //                   radial-gradient(ellipse 60% 45% at 25% 15%, #f59e0b 0%, #f59e0b 55%, transparent 95%),
  //                   radial-gradient(ellipse 55% 40% at 75% 25%, #dc2626 0%, #dc2626 50%, transparent 90%),
  //                   radial-gradient(ellipse 50% 55% at 15% 80%, #ea580c 0%, #ea580c 60%, transparent 100%),
  //                   radial-gradient(ellipse 55% 35% at 85% 90%, #facc15 0%, #facc15 45%, transparent 85%),
  //                   radial-gradient(ellipse 45% 50% at 50% 60%, #ef4444 0%, #ef4444 50%, transparent 90%)
  //                 ` : `
  //                   radial-gradient(ellipse 60% 50% at 30% 20%, #3b82f6 0%, #3b82f6 50%, transparent 85%),
  //                   radial-gradient(ellipse 50% 60% at 70% 30%, #8b5cf6 0%, #8b5cf6 45%, transparent 80%),
  //                   radial-gradient(ellipse 55% 45% at 20% 80%, #06b6d4 0%, #06b6d4 55%, transparent 90%),
  //                   radial-gradient(ellipse 45% 55% at 80% 85%, #10b981 0%, #10b981 50%, transparent 85%),
  //                   radial-gradient(ellipse 50% 40% at 50% 50%, #f59e0b 0%, #f59e0b 40%, transparent 75%)
  //                 `,
  //                 minHeight: '100%',
  //                 minWidth: '100%'
  //               }}
  //             />
  //           </div>

  //           <div className="relative z-10">
  //             <div className="flex items-center justify-between mb-3">
  //               <div className="flex items-center gap-2">
  //                 {/* Tag pill with specific colors - matching desktop */}
  //                 {thought.status === 'wip' ? (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-amber-500/60 text-amber-600/80 overflow-hidden group-hover/card:text-white group-hover/card:border-amber-500">
  //                     <div className="absolute inset-0 bg-gradient-to-r from-amber-500/80 to-orange-500/80 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">Coming Soon</span>
  //                   </span>
  //                 ) : thought.tag === 'Thought Bite' ? (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-blue-500 text-blue-500 overflow-hidden group-hover/card:text-white group-hover/card:border-blue-500">
  //                     <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">{thought.tag}</span>
  //                   </span>
  //                 ) : thought.tag === 'Scenario' ? (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-orange-500 text-orange-500 overflow-hidden group-hover/card:text-white group-hover/card:border-orange-500">
  //                     <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">{thought.tag}</span>
  //                   </span>
  //                 ) : thought.tag === 'Future Seed' ? (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-purple-500 text-purple-500 overflow-hidden group-hover/card:text-white group-hover/card:border-purple-500">
  //                     <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">{thought.tag}</span>
  //                   </span>
  //                 ) : thought.tag === 'POV' ? (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-green-500 text-green-500 overflow-hidden group-hover/card:text-white group-hover/card:border-green-500">
  //                     <div className="absolute inset-0 bg-green-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">{thought.tag}</span>
  //                   </span>
  //                 ) : (
  //                   <span className="relative text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-500 border border-gray-500 text-gray-500 overflow-hidden group-hover/card:text-white group-hover/card:border-gray-500">
  //                     <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-full" />
  //                     <span className="relative z-10">{thought.tag}</span>
  //                   </span>
  //                 )}
  //               </div>

  //               {/* Date and read time */}
  //               <div className="text-xs text-warm-brown/60 flex items-center gap-2">
  //                 <span>{thought.date}</span>
  //                 {thought.readTime && (
  //                   <>
  //                     <span>•</span>
  //                     <span>{thought.readTime}</span>
  //                   </>
  //                 )}
  //               </div>
  //             </div>

  //             {/* Title */}
  //             <h3 className="text-xl font-bold text-warm-brown mb-4 leading-tight group-hover/card:text-hover-brown transition-colors duration-300">
  //               {thought.title}
  //             </h3>

  //             {/* Content - using same logic as desktop but simplified */}
  //             <div className="text-sm text-soft-black/80 leading-relaxed">
  //               <p>{thought.description}</p>
  //             </div>

  //             {/* Action button - simplified for mobile */}
  //             {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && thought.tag !== 'Future Seed' && thought.id !== '12' && (
  //               thought.status === 'wip' ? (
  //                 <div className="flex items-center justify-center gap-2 py-3">
  //                   <div className="flex items-center gap-2 text-sm text-warm-brown/60">
  //                     <div className="w-2 h-2 bg-warm-brown/40 rounded-full animate-pulse"></div>
  //                     <span className="font-medium">Work in Progress</span>
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <button
  //                   onClick={() => setModalSlide(thought.id)}
  //                   className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown mt-4"
  //                 >
  //                   View slides
  //                 </button>
  //               )
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 thoughts-background-texture">
      {/* View toggles - positioned above header */}
      <div className="flex items-center justify-end gap-2 mb-8">
        <span className="text-sm text-muted-grey font-medium">Views:</span>
        <div className="flex gap-1">
          <button className="group px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-gray-200 text-gray-700 hover:scale-105 transition-all duration-300 ease-out">
            Seeds
          </button>
          <button className="group relative px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-transparent text-gray-700 hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-out cursor-not-allowed">
            <span className="group-hover:opacity-0 transition-opacity duration-200">Blossoms</span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500">WIP</span>
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
          Idea Garden
        </h1>

        {/* Description */}
        <p className="text-muted-grey max-w-xl mx-auto">
          Reflections on design, strategy, and the intersection of technology and humanity
        </p>
      </header>

      {/* Experimental Filter V2 */}
      <ExperimentalFilterV2
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedFilters={selectedFilters}
        onMultiFilterChange={setSelectedFilters}
      />

      {/* Idea Garden Content */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        {/* Mobile: Use same MasonryLayout as desktop for consistent styling */}
        <div className="md:hidden">
          <MasonryLayout />
        </div>
        
        {/* Desktop: Masonry Layout */}
        <div className="hidden md:block">
          <MasonryLayout />
        </div>
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

      {/* Contact Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in discussing any of these ideas? Reach out at{' '}
          <CopyEmail className="text-sm" />
        </p>
      </footer>
    </div>
  );
}