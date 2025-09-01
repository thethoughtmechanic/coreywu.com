import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import CopyEmail from "@/components/copy-email";
import { ExperimentalFilterV2 } from "@/components/experimental-filter-v2";

export default function Thoughts() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);



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




  const MasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {sortedThoughts.map((thought, index) => (
        <div key={thought.id} className="break-inside-avoid mb-6">
          <ThoughtCard thought={thought} variant="default" />
        </div>
      ))}
    </div>
  );


  return (
    <div className="max-w-7xl mx-auto px-6 py-8 thoughts-background-texture">
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

      {/* Experimental Filter V2 */}
      <ExperimentalFilterV2
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedFilters={selectedFilters}
        onMultiFilterChange={setSelectedFilters}
      />

      {/* Idea Garden Content */}
      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        {/* Mobile: Instagram-style vertical feed */}
        {isMobile ? (
          <div className="space-y-4">
            {sortedThoughts.map((thought, index) => (
              <div key={thought.id} className="group/card cursor-pointer">
                <ThoughtCard thought={thought} variant="default" />
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Masonry Layout */
          <MasonryLayout />
        )}
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