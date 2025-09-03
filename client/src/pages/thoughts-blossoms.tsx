
<div className="max-w-7xl mx-auto px-6 py-4 thoughts-background-texture">
      {/* View toggles - positioned above header */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-sm text-muted-grey font-medium">Views:</span>
        <div className="flex gap-1">
          <button 
            onClick={() => setLocation('/thoughts')}
            className="group px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-transparent text-gray-700 hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-out"
          >
            Seeds
          </button>
          <button className="group px-4 py-2 text-xs font-medium rounded-full border border-gray-300 bg-gray-200 text-gray-700 hover:scale-105 transition-all duration-300 ease-out">
            Blossoms
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
          Thought Blossoms
        </h1>

        {/* Description */}
        <p className="text-muted-grey max-w-xl mx-auto">
          Reflections on design, strategy, and the intersection of technology and humanity
        </p>
      </header>

      {/* Blossoms Grid - 2 wide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Left Blossom - Standard Collection Card */}
        <div className="group cursor-pointer">
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] min-h-[600px]">
            
            {/* Collection Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                AI & Human Futures
              </h2>
              <p className="text-muted-grey text-sm leading-relaxed">
                Exploring the evolving relationship between artificial intelligence and humanity. These thoughts examine how we adapt, collaborate, and find meaning alongside intelligent systems.
              </p>
            </div>

            {/* Seed Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Individual seed cards - small and title-only */}
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">Curious Companions</h3>
              </div>
              
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">Clock Speeds</h3>
              </div>
              
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">The Plight of Modern Managers</h3>
              </div>
              
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">Human-of-the-Gaps</h3>
              </div>
              
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">We Need to Defend Flow</h3>
              </div>
              
              <div className="bg-cream/50 rounded-lg p-3 border border-warm-brown/10 hover:bg-cream transition-colors duration-200">
                <h3 className="text-sm font-medium text-warm-brown">"Did AI make that?"</h3>
              </div>
            </div>

            {/* Collection Footer */}
            <div className="mt-6 pt-4 border-t border-warm-brown/10">
              <p className="text-xs text-muted-grey">6 thoughts • Click any card to explore</p>
            </div>

          </div>
        </div>

        {/* Right Blossom - Stacked/Preview Style */}
        <div className="group cursor-pointer">
          <div className="relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-[1.02] min-h-[600px] overflow-hidden">
            
            {/* Collection Header */}
            <div className="mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-warm-brown mb-3 group-hover:text-hover-brown transition-colors duration-300">
                Society & Power Structures
              </h2>
              <p className="text-muted-grey text-sm leading-relaxed">
                Examining how systems of power, community, and governance evolve in our rapidly changing world. These explorations challenge conventional wisdom about democracy, equality, and social organization.
              </p>
            </div>

            {/* Stacked Preview Cards */}
            <div className="relative h-80">
              
              {/* Background cards - stacked effect */}
              <div className="absolute inset-0 space-y-2">
                <div className="absolute top-0 left-0 right-2 bg-cream/30 rounded-lg p-3 border border-warm-brown/5 transform rotate-1 translate-x-1">
                  <h3 className="text-sm font-medium text-warm-brown/60">Four Tribes of Tomorrow</h3>
                </div>
                
                <div className="absolute top-6 left-1 right-1 bg-cream/40 rounded-lg p-3 border border-warm-brown/8 transform -rotate-1">
                  <h3 className="text-sm font-medium text-warm-brown/70">Real Estate as Community</h3>
                </div>
                
                <div className="absolute top-12 left-0 right-3 bg-cream/50 rounded-lg p-3 border border-warm-brown/10 transform rotate-0.5 translate-x-0.5">
                  <h3 className="text-sm font-medium text-warm-brown/80">Democracy's Last Voter</h3>
                </div>
              </div>

              {/* Front card - main focus */}
              <div className="absolute top-16 left-0 right-0 bg-white rounded-lg p-4 border border-warm-brown/15 shadow-md z-10 group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-sm font-medium text-warm-brown mb-2">Families Are The Root of Inequality</h3>
                <p className="text-xs text-muted-grey">Equality of opportunity is impossible when resources accumulate within family lines.</p>
              </div>

              {/* More cards indicator */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent h-20 flex items-end justify-center pb-4">
                <span className="text-xs text-muted-grey bg-white px-3 py-1 rounded-full border border-warm-brown/10">
                  +2 more thoughts
                </span>
              </div>

            </div>

            {/* Collection Footer */}
            <div className="mt-6 pt-4 border-t border-warm-brown/10 relative z-10">
              <p className="text-xs text-muted-grey">5 thoughts • Click to explore collection</p>
            </div>

          </div>
        </div>

      </div>

      {/* Contact Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in discussing any of these ideas? Reach out at{' '}
          <CopyEmail className="text-sm" />
        </p>
      </footer>
    </div>
