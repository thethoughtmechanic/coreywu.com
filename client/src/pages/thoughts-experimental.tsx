
import { useState } from "react";
import { useLocation } from "wouter";
import { thoughts } from "@/data/thoughts";

// Extended sample data for testing card styles
const sampleThoughts = [
  {
    id: "exp-1",
    title: "The Future of Human-AI Collaboration",
    description: "Exploring how humans and AI systems can work together more effectively in creative and analytical tasks.",
    tag: "AI Research",
    readTime: "12 min read",
    imageGradient: "from-blue-500 to-purple-600"
  },
  {
    id: "exp-2", 
    title: "Quick thought on design systems",
    description: "Consistency is key, but flexibility allows for creative expression.",
    tag: "Quick Thought",
    readTime: "2 min read",
    imageGradient: "from-green-400 to-blue-500"
  },
  {
    id: "exp-3",
    title: "Building Sustainable Tech Products",
    description: "A comprehensive guide to creating technology that serves both users and the planet.",
    tag: "Article",
    readTime: "8 min read",
    imageGradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "exp-4",
    title: "Design Thinking Workshop",
    description: "Interactive presentation on human-centered design methodologies.",
    tag: "Slides",
    readTime: "45 min presentation",
    imageGradient: "from-orange-400 to-red-500"
  }
];

export default function ThoughtsExperimental() {
  const [, setLocation] = useLocation();

  const handleCardClick = (id: string) => {
    setLocation(`/thoughts/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Garden View Card Style Lab
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto">
          Testing different card styles and color treatments for the network diagram garden view. Each section explores various approaches optimized for node-based layouts.
        </p>
      </header>

      {/* 1. Background Color Alternatives */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">1. Card Background Colors</h2>
        <p className="text-sm text-muted-grey mb-8">Alternative background colors to light-brown</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1A. Pure White */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">1A. Pure White</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[0].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[0].description}
              </p>
            </div>
          </div>

          {/* 1B. Soft Cream */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">1B. Soft Cream</h3>
            <div 
              className="bg-cream rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-warm-brown/20"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-cream rounded-full">
                  {sampleThoughts[0].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-warm-brown mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
              <p className="text-xs text-soft-black/70 line-clamp-2">
                {sampleThoughts[0].description}
              </p>
            </div>
          </div>

          {/* 1C. Light Gray */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">1C. Light Gray</h3>
            <div 
              className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-gray-700 text-white rounded-full">
                  {sampleThoughts[0].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[0].description}
              </p>
            </div>
          </div>

          {/* 1D. Off-White with Tint */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">1D. Off-White Tint</h3>
            <div 
              className="bg-stone-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-stone-200"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-stone-700 text-white rounded-full">
                  {sampleThoughts[0].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-stone-900 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2">
                {sampleThoughts[0].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Card Shape and Shadow Variations */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">2. Card Shape & Shadow Styles</h2>
        <p className="text-sm text-muted-grey mb-8">Different visual treatments for network nodes</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 2A. Rounded Rectangle (Current) */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">2A. Rounded Rectangle</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCardClick(sampleThoughts[1].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[1].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[1].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[1].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[1].description}
              </p>
            </div>
          </div>

          {/* 2B. Circular/Pill Shape */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">2B. Pill Shape</h3>
            <div 
              className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer aspect-square flex flex-col items-center justify-center text-center"
              onClick={() => handleCardClick(sampleThoughts[1].id)}
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${sampleThoughts[1].imageGradient} rounded-full mb-2`}></div>
              <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full mb-1">
                {sampleThoughts[1].tag}
              </span>
              <h4 className="text-xs font-medium text-gray-900 line-clamp-2">
                {sampleThoughts[1].title}
              </h4>
            </div>
          </div>

          {/* 2C. Sharp Rectangle */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">2C. Sharp Rectangle</h3>
            <div 
              className="bg-white p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCardClick(sampleThoughts[1].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[1].imageGradient} h-16 mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white">
                  {sampleThoughts[1].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[1].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[1].description}
              </p>
            </div>
          </div>

          {/* 2D. Soft Drop Shadow */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">2D. Soft Drop Shadow</h3>
            <div 
              className="bg-white rounded-lg p-4 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              onClick={() => handleCardClick(sampleThoughts[1].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[1].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[1].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[1].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[1].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Border and Accent Treatments */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">3. Border & Accent Treatments</h2>
        <p className="text-sm text-muted-grey mb-8">Different ways to add visual hierarchy and connection points</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 3A. Colored Border */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">3A. Colored Left Border</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-blue-500"
              onClick={() => handleCardClick(sampleThoughts[2].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[2].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
                  {sampleThoughts[2].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[2].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[2].description}
              </p>
            </div>
          </div>

          {/* 3B. Full Border */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">3B. Full Color Border</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-emerald-400"
              onClick={() => handleCardClick(sampleThoughts[2].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[2].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-emerald-500 text-white rounded-full">
                  {sampleThoughts[2].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[2].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[2].description}
              </p>
            </div>
          </div>

          {/* 3C. Corner Accent */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">3C. Corner Accent</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => handleCardClick(sampleThoughts[2].id)}
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-400 rounded-bl-lg"></div>
              <div className={`bg-gradient-to-br ${sampleThoughts[2].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-orange-500 text-white rounded-full">
                  {sampleThoughts[2].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[2].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[2].description}
              </p>
            </div>
          </div>

          {/* 3D. Subtle Border */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">3D. Subtle Border</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-warm-brown/20 hover:border-warm-brown/40"
              onClick={() => handleCardClick(sampleThoughts[2].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[2].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[2].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[2].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Size Variations for Network Hierarchy */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">4. Size Variations for Network Hierarchy</h2>
        <p className="text-sm text-muted-grey mb-8">Different card sizes for importance/centrality in network</p>
        
        <div className="flex items-end gap-6 justify-center">
          {/* 4A. Small Node */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3 text-center">4A. Small Node</h3>
            <div 
              className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-20 aspect-square flex flex-col items-center justify-center"
              onClick={() => handleCardClick(sampleThoughts[3].id)}
            >
              <div className={`w-4 h-4 bg-gradient-to-br ${sampleThoughts[3].imageGradient} rounded mb-1`}></div>
              <span className="text-xs px-1 py-0.5 bg-warm-brown text-white rounded text-center">
                {sampleThoughts[3].tag}
              </span>
            </div>
          </div>

          {/* 4B. Medium Node */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3 text-center">4B. Medium Node</h3>
            <div 
              className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-32"
              onClick={() => handleCardClick(sampleThoughts[3].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[3].imageGradient} h-12 rounded mb-2`}></div>
              <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full block text-center">
                {sampleThoughts[3].tag}
              </span>
              <h4 className="text-xs font-medium text-gray-900 mt-1 line-clamp-2 text-center">
                {sampleThoughts[3].title}
              </h4>
            </div>
          </div>

          {/* 4C. Large Node (Current) */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3 text-center">4C. Large Node</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-48"
              onClick={() => handleCardClick(sampleThoughts[3].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[3].imageGradient} h-16 rounded mb-3`}></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[3].tag}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {sampleThoughts[3].title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {sampleThoughts[3].description}
              </p>
            </div>
          </div>

          {/* 4D. Extra Large Node */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3 text-center">4D. Extra Large</h3>
            <div 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-64"
              onClick={() => handleCardClick(sampleThoughts[3].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[3].imageGradient} h-20 rounded mb-4`}></div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm px-3 py-1.5 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[3].tag}
                </span>
              </div>
              <h4 className="text-base font-medium text-gray-900 mb-3">
                {sampleThoughts[3].title}
              </h4>
              <p className="text-sm text-gray-600">
                {sampleThoughts[3].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Connection Points and States */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-2">5. Connection Points & States</h2>
        <p className="text-sm text-muted-grey mb-8">Visual indicators for network connections and states</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 5A. Connection Dots */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">5A. Connection Dots</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              {/* Connection dots */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/4 w-2 h-2 bg-orange-500 rounded-full"></div>
              
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                {sampleThoughts[0].tag}
              </span>
              <h4 className="text-sm font-medium text-gray-900 mt-2 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
            </div>
          </div>

          {/* 5B. Active State */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">5B. Active State</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-lg transition-all duration-300 cursor-pointer ring-2 ring-blue-400 ring-opacity-75"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
                {sampleThoughts[0].tag}
              </span>
              <h4 className="text-sm font-medium text-blue-900 mt-2 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
            </div>
          </div>

          {/* 5C. Pulse Animation */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">5C. Pulse Animation</h3>
            <div 
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative animate-pulse"
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg"></div>
              <div className="relative">
                <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
                <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                  {sampleThoughts[0].tag}
                </span>
                <h4 className="text-sm font-medium text-gray-900 mt-2 mb-2 line-clamp-2">
                  {sampleThoughts[0].title}
                </h4>
              </div>
            </div>
          </div>

          {/* 5D. Glow Effect */}
          <div>
            <h3 className="text-sm font-medium text-warm-brown mb-3">5D. Glow Effect</h3>
            <div 
              className="bg-white rounded-lg p-4 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => handleCardClick(sampleThoughts[0].id)}
            >
              <div className={`bg-gradient-to-br ${sampleThoughts[0].imageGradient} h-16 rounded mb-3`}></div>
              <span className="text-xs px-2 py-1 bg-warm-brown text-white rounded-full">
                {sampleThoughts[0].tag}
              </span>
              <h4 className="text-sm font-medium text-gray-900 mt-2 mb-2 line-clamp-2">
                {sampleThoughts[0].title}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Back to main thoughts */}
      <div className="text-center pt-8 border-t border-warm-brown/10">
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
