import { Link } from "wouter";
import { Lightbulb, Flask } from "lucide-react";

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

        <p className="text-sm md:text-base text-soft-black/60 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto mt-4 md:mt-6">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more humane and more intentional. Let's tend to these ideas and see what they grow into.
        </p>

        {/* Three Card Navigation - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* About Me Card */}
          <Link href="/about" className="group block">
            <div className="bg-white backdrop-blur-none rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-warm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
              </div>
              <h3 className="text-xl font-medium text-warm-brown mb-4 text-center">About Me</h3>
              <p className="text-soft-black text-center leading-relaxed">
                Learn who I am through my system prompts and journey
              </p>
            </div>
          </Link>

          {/* Thoughts Card */}
          <Link href="/thoughts" className="group block">
            <div className="bg-white backdrop-blur-none rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <Lightbulb className="w-12 h-12 text-warm-brown" />
              </div>
              <h3 className="text-xl font-medium text-warm-brown mb-4 text-center">Thoughts</h3>
              <p className="text-soft-black text-center leading-relaxed">
                Reflections on design, strategy, and the intersection of technology and humanity
              </p>
            </div>
          </Link>

          {/* Experiments Card */}
          <Link href="/experiments" className="group block">
            <div className="bg-white backdrop-blur-none rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-warm-brown/10 group-hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <Flask className="w-12 h-12 text-warm-brown" />
              </div>
              <h3 className="text-xl font-medium text-warm-brown mb-4 text-center">Experiments</h3>
              <p className="text-soft-black text-center leading-relaxed">
                Projects and prototypes exploring the future of user experience
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}