import { Link } from "wouter";

export default function Home() {

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center py-6 md:py-8">
      <div className="text-center w-full">
        {/* Welcome Title - Mobile Optimized */}
        <div className="mb-6 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-warm-brown leading-tight px-2" data-testid="text-home-title">
            Welcome to my digital garden.
          </h1>
        </div>

        {/* Three Card Navigation - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 max-w-xs sm:max-w-lg lg:max-w-none mx-auto">
          {/* About Me Card */}
          <Link href="/about">
            <div className="relative bg-light-brown rounded-xl p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-40 md:h-56 lg:h-64 flex flex-col overflow-hidden">
              {/* Paint Splatter Background for About Me */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                style={{
                  background: `
                    radial-gradient(ellipse 50% 40% at 25% 15%, #8b5cf6 0%, #8b5cf6 50%, transparent 90%),
                    radial-gradient(ellipse 45% 35% at 75% 25%, #ec4899 0%, #ec4899 45%, transparent 85%),
                    radial-gradient(ellipse 40% 50% at 15% 85%, #a855f7 0%, #a855f7 55%, transparent 95%),
                    radial-gradient(ellipse 50% 30% at 85% 80%, #d946ef 0%, #d946ef 40%, transparent 80%),
                    radial-gradient(ellipse 45% 45% at 50% 50%, #9333ea 0%, #9333ea 45%, transparent 85%)
                  `,
                  transform: 'scale(1.8) rotate(25deg)',
                  borderRadius: '24px'
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">About Me</h2>
                <p className="text-soft-black/70 text-xs md:text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500 px-2 md:px-0">
                  Learn who I am through my system prompts and journey
                </p>
              </div>
            </div>
          </Link>

          {/* Thoughts Card */}
          <Link href="/thoughts">
            <div className="relative bg-light-brown rounded-xl p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-40 md:h-56 lg:h-64 flex flex-col overflow-hidden">
              {/* Paint Splatter Background for Thoughts */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl overflow-hidden">
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
                    minWidth: '100%',
                    transform: 'scale(1.2)'
                  }}
                />
              </div>

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">Thoughts</h2>
                <p className="text-soft-black/70 text-xs md:text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500 px-2 md:px-0">
                  Reflections on design, strategy, and the intersection of technology and humanity
                </p>
              </div>
            </div>
          </Link>

          {/* Experiments Card */}
          <Link href="/experiments">
            <div className="relative bg-light-brown rounded-xl p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-40 md:h-56 lg:h-64 flex flex-col overflow-hidden">
              {/* Paint Splatter Background for Experiments */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                style={{
                  background: `
                    radial-gradient(ellipse 48% 42% at 35% 25%, #06b6d4 0%, #06b6d4 50%, transparent 90%),
                    radial-gradient(ellipse 42% 30% at 75% 20%, #0891b2 0%, #0891b2 45%, transparent 85%),
                    radial-gradient(ellipse 38% 46% at 15% 80%, #0e7490 0%, #0e7490 55%, transparent 95%),
                    radial-gradient(ellipse 46% 32% at 85% 75%, #22d3ee 0%, #22d3ee 40%, transparent 80%),
                    radial-gradient(ellipse 36% 40% at 50% 45%, #0284c7 0%, #0284c7 45%, transparent 85%)
                  `,
                  transform: 'scale(1.8) rotate(45deg)',
                  borderRadius: '24px'
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">Experiments</h2>
                <p className="text-soft-black/70 text-xs md:text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500 px-2 md:px-0">
                  Projects and prototypes exploring the future of user experience
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}