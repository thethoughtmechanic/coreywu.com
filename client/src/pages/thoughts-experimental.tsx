import { useState } from "react";
import { useLocation } from "wouter";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";
import { getPaintSplatter } from "@/lib/paint-splatters";

export default function ThoughtsExperimental() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'masonry' | 'balanced' | 'density'>('masonry');

  const tabs = [
    { id: 'masonry', label: 'Masonry Layout', description: 'Pinterest-style flowing grid' },
    { id: 'balanced', label: 'Balanced Grid', description: 'Harmonious proportions' },
    { id: 'density', label: 'Content Density', description: 'Information-rich cards' }
  ];

  // Version 1: Masonry-style layout with varied heights
  const MasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {thoughts.map((thought, index) => (
        <div key={thought.id} className="break-inside-avoid mb-6 cursor-pointer group/card">
          <div className={`w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative ${
            thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'min-h-[160px]' :
            thought.tag === 'Scenario' ? 'min-h-[240px]' :
            index % 3 === 0 ? 'min-h-[280px]' : 'min-h-[220px]'
          }`}>
            {/* Paint Splatter Background - only for non-scenario cards */}
            {thought.tag !== 'Scenario' && (
              <>
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: getPaintSplatter(thought.tag).background,
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />
              </>
            )}

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-500 ${
                    thought.tag === 'Scenario' ? 'bg-orange-100 text-orange-700' :
                    thought.tag === 'Thought Bite' ? 'bg-blue-100 text-blue-700 group-hover/card:bg-white group-hover/card:text-blue-800' :
                    thought.tag === 'Philosophizing' ? 'bg-purple-100 text-purple-700 group-hover/card:bg-white group-hover/card:text-purple-800' :
                    'bg-warm-brown/10 text-warm-brown group-hover/card:bg-white group-hover/card:text-warm-brown'
                  }`}>
                    {thought.tag}
                  </span>
                  {thought.status === 'wip' && (
                    <span className="text-xs px-2 py-0.5 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                      WIP
                    </span>
                  )}
                </div>
                <span className="text-sm text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                  {thought.date || "Aug 11, 2025"}
                </span>
              </div>

              {thought.tag === 'Scenario' && thought.id === '4' ? (
                <>
                  <h3 className="text-lg font-medium text-warm-brown mb-3">{thought.title}</h3>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={democracyImage}
                      alt="Democracy's Last Voter illustration"
                      className="max-w-full max-h-48 object-contain rounded-lg"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-warm-brown mb-3 group-hover/card:text-white transition-all duration-500">
                    {thought.title}
                  </h3>
                  <div className="text-sm text-soft-black/70 mb-4 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed">
                    {(thought.description || '').split('\n').map((line, idx) => (
                      <p key={idx} className="mb-1">{line}</p>
                    ))}
                  </div>
                </>
              )}

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

              {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                thought.status === 'wip' ? (
                  <div className="flex items-center justify-center gap-2 py-3">
                    <div className="flex items-center gap-2 text-sm text-warm-brown/60 group-hover/card:text-white/70">
                      <div className="w-2 h-2 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                      <span className="font-medium">Work in Progress</span>
                    </div>
                  </div>
                ) : (
                  <button className="w-full text-sm py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown">
                    Read more
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Version 2: Balanced grid with optimal proportions
  const BalancedLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
      {thoughts.map((thought, index) => (
        <div
          key={thought.id}
          className={`group/card cursor-pointer ${
            thought.tag === 'Scenario' ? 'md:col-span-3 lg:col-span-4' :
            thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'md:col-span-2 lg:col-span-3' :
            index % 3 === 0 ? 'md:col-span-6 lg:col-span-6' : 'md:col-span-3 lg:col-span-4'
          }`}
        >
          <div className={`w-full bg-white backdrop-blur-none rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative flex flex-col ${
            thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'p-4 min-h-[200px]' :
            thought.tag === 'Scenario' ? 'p-5 min-h-[280px]' :
            index % 3 === 0 ? 'p-8 min-h-[320px]' : 'p-6 min-h-[260px]'
          }`}>
            {thought.tag !== 'Scenario' && (
              <>
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: getPaintSplatter(thought.tag).background,
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />
              </>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1.5 rounded-full font-medium transition-all duration-500 ${
                  thought.tag === 'Scenario' ? 'bg-orange-100 text-orange-700' :
                  thought.tag === 'Thought Bite' ? 'text-xs bg-blue-100 text-blue-700 group-hover/card:bg-white group-hover/card:text-blue-800' :
                  thought.tag === 'Philosophizing' ? 'text-xs bg-purple-100 text-purple-700 group-hover/card:bg-white group-hover/card:text-purple-800' :
                  index % 3 === 0 ? 'text-base bg-warm-brown text-cream group-hover/card:bg-white group-hover/card:text-warm-brown' :
                  'text-sm bg-warm-brown/10 text-warm-brown group-hover/card:bg-white group-hover/card:text-warm-brown'
                }`}>
                  {thought.tag}
                </span>
                {thought.status === 'wip' && (
                  <span className="text-xs px-2 py-0.5 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                    WIP
                  </span>
                )}
              </div>

              <h3 className={`font-medium text-warm-brown mb-4 group-hover/card:text-white transition-all duration-500 ${
                thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'text-sm' :
                index % 3 === 0 ? 'text-xl' : 'text-lg'
              }`}>
                {thought.title}
              </h3>

              <div className={`text-soft-black/70 mb-6 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-grow ${
                thought.tag === 'Thought Bite' || thought.tag === 'Philosophizing' ? 'text-xs' :
                index % 3 === 0 ? 'text-base' : 'text-sm'
              }`}>
                {thought.tag === 'Scenario' && thought.id === '4' ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={democracyImage}
                      alt="Democracy's Last Voter illustration"
                      className="max-w-full max-h-40 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  (thought.description || '').split('\n').map((line, idx) => (
                    <p key={idx} className="mb-1">{line}</p>
                  ))
                )}
              </div>

              {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                <div className="flex items-center gap-2 mb-4 mt-auto">
                  <svg className="w-4 h-4 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                    {thought.readTime || "5 min read"}
                  </span>
                </div>
              )}

              {thought.tag !== 'Thought Bite' && thought.tag !== 'Philosophizing' && thought.tag !== 'Scenario' && (
                thought.status === 'wip' ? (
                  <div className="flex items-center justify-center gap-2 py-3">
                    <div className="flex items-center gap-2 text-sm text-warm-brown/60 group-hover/card:text-white/70">
                      <div className="w-2 h-2 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                      <span className="font-medium">Work in Progress</span>
                    </div>
                  </div>
                ) : (
                  <button className="w-full py-3 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown">
                    Read more
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Version 3: Content density focused layout
  const DensityLayout = () => (
    <div className="space-y-6">
      {/* Featured large cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {thoughts.filter(t => t.tag !== 'Thought Bite' && t.tag !== 'Philosophizing').slice(0, 2).map((thought) => (
          <div key={thought.id} className="group/card cursor-pointer">
            <div className="w-full bg-white backdrop-blur-none rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative min-h-[340px] flex flex-col">
              {thought.tag !== 'Scenario' && (
                <>
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background: getPaintSplatter(thought.tag).background,
                        minHeight: '100%',
                        minWidth: '100%'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />
                </>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-base px-4 py-2 bg-warm-brown text-cream rounded-full font-medium group-hover/card:bg-white group-hover/card:text-warm-brown transition-all duration-500">
                      {thought.tag}
                    </span>
                    {thought.status === 'wip' && (
                      <span className="text-sm px-3 py-1 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                        WIP
                      </span>
                    )}
                  </div>
                  <span className="text-base text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                    {thought.date || "Aug 11, 2025"}
                  </span>
                </div>

                <h3 className="text-2xl font-medium text-warm-brown mb-4 group-hover/card:text-white transition-all duration-500">
                  {thought.title}
                </h3>

                <div className="text-base text-soft-black/70 mb-6 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-grow">
                  {thought.tag === 'Scenario' && thought.id === '4' ? (
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={democracyImage}
                        alt="Democracy's Last Voter illustration"
                        className="max-w-full max-h-48 object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    (thought.description || '').split('\n').map((line, idx) => (
                      <p key={idx} className="mb-2">{line}</p>
                    ))
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                      {thought.readTime || "5 min read"}
                    </span>
                  </div>

                  {thought.status === 'wip' ? (
                    <div className="flex items-center gap-2 text-base text-warm-brown/60 group-hover/card:text-white/70">
                      <div className="w-2 h-2 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                      <span className="font-medium">Work in Progress</span>
                    </div>
                  ) : (
                    <button className="py-3 px-6 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown">
                      Read more
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compact grid for bite-sized thoughts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {thoughts.filter(t => t.tag === 'Thought Bite' || t.tag === 'Philosophizing').map((thought) => (
          <div key={thought.id} className="group/card cursor-pointer">
            <div className="w-full bg-white backdrop-blur-none rounded-xl p-4 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative min-h-[140px] flex flex-col">
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: getPaintSplatter(thought.tag).background,
                    minHeight: '100%',
                    minWidth: '100%'
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    thought.tag === 'Thought Bite' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-xs font-medium text-warm-brown group-hover/card:text-white transition-all duration-500">
                    {thought.tag}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-warm-brown mb-2 group-hover/card:text-white transition-all duration-500 leading-tight flex-grow">
                  {thought.title}
                </h4>

                <p className="text-xs text-soft-black/70 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed line-clamp-3">
                  {thought.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Medium grid for remaining content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {thoughts.filter(t => t.tag !== 'Thought Bite' && t.tag !== 'Philosophizing').slice(2).map((thought) => (
          <div key={thought.id} className="group/card cursor-pointer">
            <div className="w-full bg-white backdrop-blur-none rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover/card:scale-105 overflow-hidden relative min-h-[240px] flex flex-col">
              {thought.tag !== 'Scenario' && (
                <>
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background: getPaintSplatter(thought.tag).background,
                        minHeight: '100%',
                        minWidth: '100%'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl" />
                </>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm px-3 py-1 bg-warm-brown/10 text-warm-brown rounded-full font-medium group-hover/card:bg-white group-hover/card:text-warm-brown transition-all duration-500">
                    {thought.tag}
                  </span>
                  {thought.status === 'wip' && (
                    <span className="text-xs px-2 py-0.5 border border-warm-brown/30 text-warm-brown rounded-full font-medium">
                      WIP
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-medium text-warm-brown mb-3 group-hover/card:text-white transition-all duration-500">
                  {thought.title}
                </h3>

                <div className="text-sm text-soft-black/70 mb-4 group-hover/card:text-white/90 transition-all duration-500 leading-relaxed flex-grow">
                  {thought.tag === 'Scenario' && thought.id === '4' ? (
                    <div className="flex items-center justify-center">
                      <img
                        src={democracyImage}
                        alt="Democracy's Last Voter illustration"
                        className="max-w-full max-h-32 object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    (thought.description || '').split('\n').map((line, idx) => (
                      <p key={idx} className="mb-1">{line}</p>
                    ))
                  )}
                </div>

                {thought.tag !== 'Scenario' && (
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-warm-brown/60 group-hover/card:text-white/70 transition-all duration-500">
                      {thought.readTime || "5 min read"}
                    </span>
                  </div>
                )}

                {thought.tag !== 'Scenario' && (
                  thought.status === 'wip' ? (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="flex items-center gap-2 text-sm text-warm-brown/60 group-hover/card:text-white/70">
                        <div className="w-2 h-2 bg-warm-brown/40 group-hover/card:bg-white/50 rounded-full animate-pulse"></div>
                        <span className="font-medium">Work in Progress</span>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full text-sm py-2 px-4 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown group-hover/card:bg-white/90 group-hover/card:text-warm-brown">
                      Read more
                    </button>
                  )
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
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6">Layout Exploration Lab</h1>
        <p className="text-muted-grey max-w-2xl mx-auto mb-8">
          Three different approaches to organizing the Idea Garden with varied card sizes, spacing, and information density
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                activeTab === tab.id
                  ? 'bg-warm-brown text-cream shadow-lg'
                  : 'bg-white text-warm-brown hover:bg-warm-brown/5 border border-warm-brown/20'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </header>

      {/* Layout Content */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-6 md:p-8">
        {!isMobile ? (
          <>
            {activeTab === 'masonry' && <MasonryLayout />}
            {activeTab === 'balanced' && <BalancedLayout />}
            {activeTab === 'density' && <DensityLayout />}
          </>
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