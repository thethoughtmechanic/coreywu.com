import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import fourTribesImage from "@assets/image_1755886711758.png";
import { getPaintSplatter } from "@/lib/paint-splatters";

export default function ThoughtsAlt() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const [modalSlide, setModalSlide] = useState<string | null>(null); // State for modal slide
  const [expandedThought, setExpandedThought] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

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

  // Filter thoughts based on selected filter
  const sortedThoughts = selectedFilter === "All" 
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
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {sortedThoughts.map((thought, index) => (
        <div key={thought.id} className="break-inside-avoid mb-6 cursor-pointer group/card">
          <div className={`w-full bg-card backdrop-blur-none rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border group-hover/card:scale-105 overflow-hidden relative ${
            thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'min-h-[180px]' :
            thought.tag === 'Scenario' ? 'min-h-[260px]' :
            index % 3 === 0 ? 'min-h-[300px]' : 'min-h-[240px]'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Tag pill with vibrant OKLCH colors */}
                  {thought.status === 'wip' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 border border-[oklch(0.7830_0.1500_45.0000)] text-[oklch(0.6830_0.1300_45.0000)] overflow-hidden group-hover/card:text-white group-hover/card:border-[oklch(0.7830_0.1500_45.0000)]">
                      <div className="absolute inset-0 bg-[oklch(0.7830_0.1500_45.0000)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg" />
                      <span className="relative z-10">Coming Soon</span>
                    </span>
                  ) : thought.tag === 'Thought Bite' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 border border-[oklch(0.6500_0.2000_220.0000)] text-[oklch(0.5500_0.1800_220.0000)] overflow-hidden group-hover/card:text-white group-hover/card:border-[oklch(0.6500_0.2000_220.0000)]">
                      <div className="absolute inset-0 bg-[oklch(0.6500_0.2000_220.0000)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'Scenario' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 border border-[oklch(0.7000_0.1800_25.0000)] text-[oklch(0.6000_0.1600_25.0000)] overflow-hidden group-hover/card:text-white group-hover/card:border-[oklch(0.7000_0.1800_25.0000)]">
                      <div className="absolute inset-0 bg-[oklch(0.7000_0.1800_25.0000)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'POV' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 border border-[oklch(0.6800_0.1600_160.0000)] text-[oklch(0.5800_0.1400_160.0000)] overflow-hidden group-hover/card:text-white group-hover/card:border-[oklch(0.6800_0.1600_160.0000)]">
                      <div className="absolute inset-0 bg-[oklch(0.6800_0.1600_160.0000)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : thought.tag === 'Future Seed' ? (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 border border-[oklch(0.7200_0.1700_280.0000)] text-[oklch(0.6200_0.1500_280.0000)] overflow-hidden group-hover/card:text-white group-hover/card:border-[oklch(0.7200_0.1700_280.0000)]">
                      <div className="absolute inset-0 bg-[oklch(0.7200_0.1700_280.0000)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg" />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  ) : (
                    <span className="relative text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-500 text-white overflow-hidden">
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={getPaintSplatter(thought.tag)}
                      />
                      <span className="relative z-10">{thought.tag}</span>
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {thought.date || "Aug 11, 2025"}
                </span>
              </div>

              {thought.tag === 'Scenario' && thought.id === '4' ? (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300">
                    {thought.title}
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={democracyImage}
                      alt="Democracy's Last Voter illustration"
                      className="max-w-full max-h-48 object-contain rounded-lg"
                    />
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">1.</span>
                      <p>Will AI know what we believe better than we do?</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">2.</span>
                      <p>Is human voting unethical if AI governs better?</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">3.</span>
                      <p>Will AI discover our beliefs or shape them?</p>
                    </div>
                  </div>
                </>
              ) : thought.id === '12' ? (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300">
                    {thought.title}
                  </h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
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
                            <p className="text-xs text-muted-foreground italic pl-4 border-l-2 border-border">Blind spot: Over-engineer safety into paralysis</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Augmented Dreamers</strong>: Move-fast, Push-boundaries, Scale-aggressively, Offense-oriented</p>
                            <p className="text-xs text-muted-foreground italic pl-4 border-l-2 border-border">Blind spot: Rush past critical safety considerations</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Nostalgic Doomers</strong>: Agency, Protection, Community, Preservation</p>
                            <p className="text-xs text-muted-foreground italic pl-4 border-l-2 border-border">Blind spot: Resist beneficial changes from loss aversion</p>
                          </div>

                          <div>
                            <p className="mb-2"><strong>Analog Champions</strong>: Craft, Authenticity, Sustainability, Locality</p>
                            <p className="text-xs text-muted-foreground italic pl-4 border-l-2 border-border">Blind spot: Miss scale problems requiring technological solutions</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedThought(null)}
                          className="text-primary/80 hover:text-primary text-sm font-medium mt-4 flex items-center gap-1"
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
                          className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
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
                  <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300">
                    {thought.title}
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <p>The AI Babysitter</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <p>Employee Courtesy Score</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <p>The Rudeness Penalty</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <p>My AI God-Parent</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300">
                    {thought.id === '8' ? 'AI and Tolerances for Type I & II Errors' : thought.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-6 leading-relaxed">
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
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
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
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See more
                            </button>
                          </>
                        )}
                      </>
                    ) : thought.id === '9' ? (
                      <>
                        {expandedThought === thought.id ? (
                          <>
                            {thought.fullDescription?.split('\n').map((line, index) => (
                              <p key={index} className="mb-3" dangerouslySetInnerHTML={{
                                __html: line.replace(/<u>/g, '<u>').replace(/<\/u>/g, '</u>')
                              }} />
                            ))}
                            <button
                              onClick={() => setExpandedThought(null)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See less
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="mb-2">{thought.description}</p>
                            <button
                              onClick={() => setExpandedThought(thought.id)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See more
                            </button>
                          </>
                        )}
                      </>
                    ) : thought.id === '10' ? (
                      <>
                        {expandedThought === thought.id ? (
                          <>
                            {thought.fullDescription?.split('\n').map((line, index) => (
                              line.trim() ? <p key={index} className="mb-3">{line}</p> : <div key={index} className="mb-3"></div>
                            ))}
                            <button
                              onClick={() => setExpandedThought(null)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See less
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="mb-2">{thought.description?.split('\n').map((line, index) => (
                              line.trim() ? <p key={index} className="mb-3">{line}</p> : <div key={index} className="mb-3"></div>
                            ))}</div>
                            <button
                              onClick={() => setExpandedThought(thought.id)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See more
                            </button>
                          </>
                        )}
                      </>
                    ) : thought.id === '11' ? (
                      <>
                        {expandedThought === thought.id ? (
                          <>
                            <p className="mb-3">What if buildings stopped trying to be everything—mini gyms, bland lounges, half-working jacuzzis—and instead focused on connecting residents with their neighborhood?</p>
                            <p className="mb-3">Imagine if your rent or condo fees came with community credits to spend at local studios, restaurants, shops, and experiences. Real estate as a community platform, weaving residents into the city rather than isolating them inside four walls.</p>
                            <p className="mb-3">When a building joins a neighborhood, it should connect, not isolate. It should bring people together, strengthen local businesses, and make community the true amenity.</p>
                            <button
                              onClick={() => setExpandedThought(null)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See less
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="mb-3">What if buildings stopped trying to be everything—mini gyms, bland lounges, half-working jacuzzis—and instead focused on connecting residents with their neighborhood?</p>
                            <button
                              onClick={() => setExpandedThought(thought.id)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See more
                            </button>
                          </>
                        )}
                      </>
                    ) : thought.tag === 'Future Seed' ? (
                      <>
                        {expandedThought === thought.id ? (
                          <>
                            {thought.description?.split('\n').map((line, index) => (
                              line.trim() ? <p key={index} className="mb-3">{line}</p> : <div key={index} className="mb-3"></div>
                            ))}
                            <button
                              onClick={() => setExpandedThought(null)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
                            >
                              <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              See less
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{thought.description?.split('\n')[0]}</p>
                            <button
                              onClick={() => setExpandedThought(thought.id)}
                              className="text-primary/80 hover:text-primary text-sm font-medium mt-2 flex items-center gap-1"
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
                      <p>{thought.description}</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {thought.status === 'wip' ? (
                    <span className="text-xs text-muted-foreground">In progress</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Published</span>
                  )}
                </div>
                
                {thought.readTime && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    {thought.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="thoughts-alt-container min-h-screen bg-background text-foreground font-[var(--font-sans)]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4" data-testid="text-thoughts-title">
            Thoughts (Notebook Theme)
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of ideas, scenarios, and perspectives on AI, society, and the future.
          </p>
        </header>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              data-testid={`filter-${tag.toLowerCase().replace(' ', '-')}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <main>
          <MasonryLayout />
        </main>

        <footer className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            These thoughts are works in progress. They evolve, contradict, and sometimes disappear entirely.
          </p>
        </footer>
      </div>

      <style jsx>{`
        .thoughts-alt-container {
          /* Apply the refined OKLCH notebook theme */
          --background: oklch(0.9821 0 0);
          --foreground: oklch(0.3485 0 0);
          --card: oklch(1.0000 0 0);
          --card-foreground: oklch(0.3485 0 0);
          --popover: oklch(1.0000 0 0);
          --popover-foreground: oklch(0.3485 0 0);
          --primary: oklch(0.4891 0 0);
          --primary-foreground: oklch(0.9551 0 0);
          --secondary: oklch(0.9006 0 0);
          --secondary-foreground: oklch(0.3485 0 0);
          --muted: oklch(0.9158 0 0);
          --muted-foreground: oklch(0.4313 0 0);
          --accent: oklch(0.9354 0.0456 94.8549);
          --accent-foreground: oklch(0.4015 0.0436 37.9587);
          --destructive: oklch(0.6627 0.0978 20.0041);
          --destructive-foreground: oklch(1.0000 0 0);
          --border: oklch(0.5538 0.0025 17.2320);
          --input: oklch(1.0000 0 0);
          --ring: oklch(0.7058 0 0);
          --chart-1: oklch(0.3211 0 0);
          --chart-2: oklch(0.4495 0 0);
          --chart-3: oklch(0.5693 0 0);
          --chart-4: oklch(0.6830 0 0);
          --chart-5: oklch(0.7921 0 0);
          --sidebar: oklch(0.9551 0 0);
          --sidebar-foreground: oklch(0.3485 0 0);
          --sidebar-primary: oklch(0.4891 0 0);
          --sidebar-primary-foreground: oklch(0.9551 0 0);
          --sidebar-accent: oklch(0.9354 0.0456 94.8549);
          --sidebar-accent-foreground: oklch(0.4015 0.0436 37.9587);
          --sidebar-border: oklch(0.8078 0 0);
          --sidebar-ring: oklch(0.7058 0 0);
          --font-sans: Architects Daughter, sans-serif;
          --font-serif: "Times New Roman", Times, serif;
          --font-mono: "Courier New", Courier, monospace;
          --radius: 0.625rem;
          --shadow-2xs: 1px 4px 5px 0px hsl(0 0% 0% / 0.01);
          --shadow-xs: 1px 4px 5px 0px hsl(0 0% 0% / 0.01);
          --shadow-sm: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03);
          --shadow: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03);
          --shadow-md: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 2px 4px -1px hsl(0 0% 0% / 0.03);
          --shadow-lg: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 4px 6px -1px hsl(0 0% 0% / 0.03);
          --shadow-xl: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 8px 10px -1px hsl(0 0% 0% / 0.03);
          --shadow-2xl: 1px 4px 5px 0px hsl(0 0% 0% / 0.07);
          --tracking-normal: 0.5px;
          --spacing: 0.25rem;

          letter-spacing: var(--tracking-normal);
          font-family: var(--font-sans);
        }

        .thoughts-alt-container .dark {
          --background: oklch(0.2891 0 0);
          --foreground: oklch(0.8945 0 0);
          --card: oklch(0.3211 0 0);
          --card-foreground: oklch(0.8945 0 0);
          --popover: oklch(0.3211 0 0);
          --popover-foreground: oklch(0.8945 0 0);
          --primary: oklch(0.7572 0 0);
          --primary-foreground: oklch(0.2891 0 0);
          --secondary: oklch(0.4676 0 0);
          --secondary-foreground: oklch(0.8078 0 0);
          --muted: oklch(0.3904 0 0);
          --muted-foreground: oklch(0.7058 0 0);
          --accent: oklch(0.9067 0 0);
          --accent-foreground: oklch(0.3211 0 0);
          --destructive: oklch(0.7915 0.0491 18.2410);
          --destructive-foreground: oklch(0.2891 0 0);
          --border: oklch(0.4276 0 0);
          --input: oklch(0.3211 0 0);
          --ring: oklch(0.8078 0 0);
          --chart-1: oklch(0.9521 0 0);
          --chart-2: oklch(0.8576 0 0);
          --chart-3: oklch(0.7572 0 0);
          --chart-4: oklch(0.6534 0 0);
          --chart-5: oklch(0.5452 0 0);
          --sidebar: oklch(0.2478 0 0);
          --sidebar-foreground: oklch(0.8945 0 0);
          --sidebar-primary: oklch(0.7572 0 0);
          --sidebar-primary-foreground: oklch(0.2478 0 0);
          --sidebar-accent: oklch(0.9067 0 0);
          --sidebar-accent-foreground: oklch(0.3211 0 0);
          --sidebar-border: oklch(0.4276 0 0);
          --sidebar-ring: oklch(0.8078 0 0);
          --font-sans: Architects Daughter, sans-serif;
          --font-serif: Georgia, serif;
          --font-mono: "Fira Code", "Courier New", monospace;
          --radius: 0.625rem;
          --shadow-2xs: 1px 4px 5px 0px hsl(0 0% 0% / 0.01);
          --shadow-xs: 1px 4px 5px 0px hsl(0 0% 0% / 0.01);
          --shadow-sm: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03);
          --shadow: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03);
          --shadow-md: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 2px 4px -1px hsl(0 0% 0% / 0.03);
          --shadow-lg: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 4px 6px -1px hsl(0 0% 0% / 0.03);
          --shadow-xl: 1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 8px 10px -1px hsl(0 0% 0% / 0.03);
          --shadow-2xl: 1px 4px 5px 0px hsl(0 0% 0% / 0.07);
        }
      `}</style>
    </div>
  );
}