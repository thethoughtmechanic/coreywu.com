
import { useState } from "react";
import { useLocation } from "wouter";
import CopyEmail from "@/components/copy-email";

export default function ThoughtsBlossoms() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 thoughts-background-texture">
      {/* View toggles - positioned above header */}
      <div className="flex items-center justify-end gap-2 mb-8">
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
          Idea Garden
        </h1>

        {/* Description */}
        <p className="text-muted-grey max-w-xl mx-auto">
          Reflections on design, strategy, and the intersection of technology and humanity
        </p>
      </header>

      {/* Empty content area - to be built later */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-warm-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-warm-brown/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-warm-brown mb-2">Blossoms Coming Soon</h3>
            <p className="text-muted-grey text-sm">This view is currently under development</p>
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
  );
}
