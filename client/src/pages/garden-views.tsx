
import { useState } from "react";
import { thoughts } from "@/data/thoughts";
import { ThoughtCard } from "@/components/thought-card";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GardenViews() {
  const [currentView, setCurrentView] = useState<"chronological" | "garden" | "mindmap" | "topic-clusters" | "flow-state">("chronological");
  const isMobile = useIsMobile();

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

  // Chronological View (Current Implementation)
  const ChronologicalView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-warm-brown mb-2">Timeline View</h3>
        <p className="text-sm text-muted-grey">Traditional blog-style chronological organization</p>
      </div>
      <div className="md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {sortedThoughts.map((thought) => (
          <div key={thought.id} className="break-inside-avoid mb-6">
            <ThoughtCard thought={thought} variant="default" />
          </div>
        ))}
      </div>
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
              <ThoughtCard thought={thought} variant="compact" />
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
