
import { useState } from "react";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import fourTribesImage from "@assets/image_1755886711758.png";
import { getPaintSplatter } from "@/lib/paint-splatters";

export default function GardenViews() {
  const [currentView, setCurrentView] = useState<"chronological" | "garden" | "mindmap" | "topic-clusters" | "flow-state">("chronological");
  const isMobile = useIsMobile();
  const [expandedThought, setExpandedThought] = useState<string | null>(null);

  // Sort thoughts by date (most recent first)
  const sortedThoughts = [...thoughts].sort((a, b) => {
    const dateA = new Date(a.date || "Aug 11, 2025");
    const dateB = new Date(b.date || "Aug 11, 2025");
    return dateB.getTime() - dateA.getTime();
  });

  // Group by topics for clustering
  const thoughtsByTopic = thoughts.reduce((acc, thought) => {
    const topics = Array.isArray(thought.topic) ? thought.topic : [thought.topic];
    topics.forEach(topic => {
      if (!acc[topic]) acc[topic] = [];
      acc[topic].push(thought);
    });
    return acc;
  }, {} as Record<string, typeof thoughts>);

  // Masonry Layout (from your main thoughts page)
  const MasonryLayout = () => (
    <div className="md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
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
                            <div className="mb-4">
                              {contentToShow?.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-3" dangerouslySetInnerHTML={{
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
                        // No expandable content, show description normally
                        return (
                          <div>
                            {(thought.description || '').split('\n').map((line, index) => {
                              // Handle image markdown
                              if (line.startsWith('![') && line.includes('](')) {
                                const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                                if (imageMatch) {
                                  return (
                                    <img
                                      key={index}
                                      src={imageMatch[2]}
                                      alt={imageMatch[1]}
                                      className="max-w-full h-auto rounded-lg mb-4"
                                    />
                                  );
                                }
                              }

                              // Handle bold and italic formatting
                              let formattedLine = line
                                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*([^*]+)\*/g, '<em>$1</em>');

                              return (
                                <p
                                  key={index}
                                  className="mb-1"
                                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                                />
                              );
                            })}
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
                  <button className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown">
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

  // Chronological View (Now uses masonry layout)
  const ChronologicalView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Timeline View</h3>
        <p className="text-sm text-muted-grey">Traditional blog-style chronological organization</p>
      </div>
      <MasonryLayout />
    </div>
  );

  // Garden View (Spatial, Non-linear)
  const GardenView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Spatial Garden</h3>
        <p className="text-sm text-muted-grey">Ideas scattered organically like plants in a garden</p>
      </div>
      <div className="relative min-h-[800px] bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 overflow-hidden">
        {/* Prototype: Scattered positioning */}
        {sortedThoughts.slice(0, 8).map((thought, index) => {
          const positions = [
            { top: '10%', left: '15%', transform: 'rotate(-2deg)' },
            { top: '25%', left: '60%', transform: 'rotate(1deg)' },
            { top: '45%', left: '20%', transform: 'rotate(-1deg)' },
            { top: '15%', left: '80%', transform: 'rotate(2deg)' },
            { top: '65%', left: '70%', transform: 'rotate(-1deg)' },
            { top: '70%', left: '25%', transform: 'rotate(1deg)' },
            { top: '35%', left: '45%', transform: 'rotate(-2deg)' },
            { top: '85%', left: '55%', transform: 'rotate(1deg)' },
          ];
          
          return (
            <div
              key={thought.id}
              className="absolute w-64 hover:z-10 transition-all duration-300 hover:scale-105"
              style={positions[index] || { top: '50%', left: '50%' }}
            >
              <div className="bg-light-brown rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className={`bg-gradient-to-br ${thought.imageGradient} h-24 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-warm-brown/10 text-warm-brown rounded-full font-medium">
                      {thought.tag}
                    </span>
                    <span className="text-xs text-muted-grey">
                      {thought.readTime}
                    </span>
                  </div>
                  <h3 className="font-light text-warm-brown mb-2 leading-tight text-sm group-hover:text-hover-brown transition-colors duration-200">
                    {thought.title}
                  </h3>
                  <p className="text-xs text-soft-black/80 leading-relaxed line-clamp-2">
                    {thought.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Mind Map View (Hierarchical connections)
  const MindMapView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Mind Map</h3>
        <p className="text-sm text-muted-grey">Hierarchical connections between related ideas</p>
      </div>
      <div className="bg-slate-50 rounded-xl p-8 min-h-[600px]">
        <div className="text-center text-warm-brown/60">
          <p>Mind map visualization prototype</p>
          <p className="text-sm">Could show thought relationships, themes, and idea evolution</p>
        </div>
      </div>
    </div>
  );

  // Topic Clusters View
  const TopicClustersView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Topic Clusters</h3>
        <p className="text-sm text-muted-grey">Ideas grouped by thematic relationships</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(thoughtsByTopic).map(([topic, topicThoughts]) => (
          <div key={topic} className="bg-white rounded-xl p-6 border border-warm-brown/10">
            <h4 className="text-lg font-medium text-warm-brown mb-4 capitalize">
              {topic.replace('-', ' & ')}
            </h4>
            <div className="space-y-4">
              {topicThoughts.slice(0, 3).map((thought) => (
                <div key={thought.id} className="border-l-2 border-warm-brown/20 pl-4">
                  <h5 className="font-medium text-sm text-warm-brown">{thought.title}</h5>
                  <p className="text-xs text-muted-grey mt-1">{thought.tag} • {thought.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Flow State View (Reading progression)
  const FlowStateView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Flow State</h3>
        <p className="text-sm text-muted-grey">Curated reading paths and progressive complexity</p>
      </div>
      <div className="space-y-8">
        {/* Entry Points */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h4 className="text-lg font-medium text-warm-brown mb-4">🌱 Entry Points (Start Here)</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {thoughts.filter(t => t.tag === "Thought Bite").slice(0, 4).map((thought) => (
              <div key={thought.id} className="bg-white rounded-lg p-4 border border-warm-brown/10">
                <h5 className="font-medium text-sm text-warm-brown">{thought.title}</h5>
                <p className="text-xs text-muted-grey mt-1">{thought.readTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dives */}
        <div className="bg-amber-50 rounded-xl p-6">
          <h4 className="text-lg font-medium text-warm-brown mb-4">🌳 Deep Dives</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {thoughts.filter(t => t.tag === "POV").map((thought) => (
              <div key={thought.id} className="bg-white rounded-lg p-4 border border-warm-brown/10">
                <h5 className="font-medium text-sm text-warm-brown">{thought.title}</h5>
                <p className="text-xs text-muted-grey mt-1">{thought.readTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Explorations */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h4 className="text-lg font-medium text-warm-brown mb-4">🔮 Future Explorations</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {thoughts.filter(t => t.tag === "Scenario" || t.tag === "Future Seed").map((thought) => (
              <div key={thought.id} className="bg-white rounded-lg p-4 border border-warm-brown/10">
                <h5 className="font-medium text-sm text-warm-brown">{thought.title}</h5>
                <p className="text-xs text-muted-grey mt-1">{thought.readTime || thought.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const views = {
    chronological: ChronologicalView,
    garden: GardenView,
    mindmap: MindMapView,
    "topic-clusters": TopicClustersView,
    "flow-state": FlowStateView
  };

  const ViewComponent = views[currentView];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Garden View Experiments
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto mb-8">
          Exploring different ways to organize and navigate your idea garden. 
          Use this as a sandbox for ChatGPT collaboration on view structures.
        </p>

        {/* View Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setCurrentView("chronological")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === "chronological"
                ? "bg-warm-brown text-cream"
                : "border border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
            }`}
          >
            Chronological
          </button>
          <button
            onClick={() => setCurrentView("garden")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === "garden"
                ? "bg-warm-brown text-cream"
                : "border border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
            }`}
          >
            Spatial Garden
          </button>
          <button
            onClick={() => setCurrentView("mindmap")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === "mindmap"
                ? "bg-warm-brown text-cream"
                : "border border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
            }`}
          >
            Mind Map
          </button>
          <button
            onClick={() => setCurrentView("topic-clusters")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === "topic-clusters"
                ? "bg-warm-brown text-cream"
                : "border border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
            }`}
          >
            Topic Clusters
          </button>
          <button
            onClick={() => setCurrentView("flow-state")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === "flow-state"
                ? "bg-warm-brown text-cream"
                : "border border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
            }`}
          >
            Flow State
          </button>
        </div>
      </header>

      {/* Current View */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        <ViewComponent />
      </div>

      {/* Design Notes for ChatGPT Collaboration */}
      <footer className="mt-12 bg-white rounded-xl p-6 border border-warm-brown/10">
        <h3 className="text-lg font-medium text-warm-brown mb-4">Design Notes for ChatGPT Collaboration</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-warm-brown mb-2">Current Data Structure</h4>
            <ul className="space-y-1 text-muted-grey">
              <li>• {thoughts.length} total thoughts</li>
              <li>• 4 content types: {Array.from(new Set(thoughts.map(t => t.tag))).join(", ")}</li>
              <li>• 4 topic categories: ai-tech, identity-meaning, society-power, futures-experiments</li>
              <li>• Expandable content with description/fullDescription</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warm-brown mb-2">Potential View Concepts</h4>
            <ul className="space-y-1 text-muted-grey">
              <li>• Connection-based (related thoughts linked)</li>
              <li>• Complexity-based (entry → intermediate → advanced)</li>
              <li>• Mood-based (reflective, provocative, optimistic)</li>
              <li>• Journey-based (problem → exploration → solution)</li>
              <li>• Network graph (nodes and edges)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-cream/50 rounded-lg">
          <p className="text-xs text-muted-grey">
            <strong>For ChatGPT:</strong> This page serves as a playground for testing different organizational paradigms. 
            Current thoughts data structure supports topic, tag, date, and content relationships. 
            Consider: How might readers want to discover and navigate ideas? What mental models resonate?
          </p>
        </div>
      </footer>
    </div>
  );
}
