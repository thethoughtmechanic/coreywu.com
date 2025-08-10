
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExperimentsExperimental() {
  const [activeView, setActiveView] = useState<'minimal' | 'cards' | 'list'>('minimal');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Simple status indicator
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div 
      className={`w-2 h-2 rounded-full ${
        experiment.status === 'sunset' ? 'bg-gray-400' : 
        experiment.status === 'wip' ? 'bg-yellow-500' : 
        'bg-green-500'
      }`} 
    />
  );

  // Get team display text
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
  };

  // Approach 1: Refined Table View with inline expansion
  const MinimalView = () => (
    <div className="space-y-4">
      <div className="bg-light-brown rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-warm-brown/20 bg-warm-brown/5">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-warm-brown">
            <div>Status</div>
            <div>Project Name</div>
            <div>Team</div>
          </div>
        </div>
        <div className="divide-y divide-warm-brown/10">
          {experiments.map((experiment) => (
            <div key={experiment.id}>
              {/* Main row */}
              <div 
                className="px-6 py-4 hover:bg-warm-brown/5 transition-colors cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === experiment.id ? null : experiment.id)}
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <StatusDot experiment={experiment} />
                    <span className="text-sm capitalize">{experiment.status}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
                  </div>
                  <div className="text-sm text-muted-grey">
                    {getTeamDisplay(experiment)}
                  </div>
                </div>
              </div>
              
              {/* Expanded content */}
              {expandedRow === experiment.id && (
                <div className="px-6 py-4 bg-warm-brown/5 border-t border-warm-brown/10">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-warm-brown">Description:</span>
                      <p className="text-soft-black mt-1">{experiment.description}</p>
                    </div>
                    <div>
                      <span className="font-medium text-warm-brown">Timeline:</span>
                      <p className="text-muted-grey mt-1">{experiment.timeframe}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Approach 2: Simple Cards View
  const CardsView = () => (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {experiments.map((experiment) => (
        <div key={experiment.id} className="bg-light-brown rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
            <StatusDot experiment={experiment} />
          </div>
          <p className="text-sm text-soft-black mb-3 line-clamp-2">{experiment.description}</p>
          <div className="flex justify-between items-center text-xs text-muted-grey">
            <span>{experiment.timeframe}</span>
            <span>{getTeamDisplay(experiment)}</span>
          </div>
        </div>
      ))}
    </div>
  );

  // Approach 3: Simple List View
  const ListView = () => (
    <div className="space-y-2">
      {experiments.map((experiment) => (
        <div key={experiment.id} className="bg-light-brown rounded p-4 hover:bg-warm-brown/5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <StatusDot experiment={experiment} />
              <div className="flex-1">
                <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
                <p className="text-sm text-muted-grey">{experiment.description}</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-grey ml-4">
              <div>{experiment.timeframe}</div>
              <div className="text-xs">{getTeamDisplay(experiment)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Experiments (Simplified)
        </h1>
        <p className="text-muted-grey mb-6">Three simple approaches to displaying experiments</p>
        
        {/* View Toggle */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setActiveView('minimal')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeView === 'minimal' 
                ? 'bg-warm-brown text-cream' 
                : 'bg-light-brown text-warm-brown hover:bg-warm-brown/10'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setActiveView('cards')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeView === 'cards' 
                ? 'bg-warm-brown text-cream' 
                : 'bg-light-brown text-warm-brown hover:bg-warm-brown/10'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeView === 'list' 
                ? 'bg-warm-brown text-cream' 
                : 'bg-light-brown text-warm-brown hover:bg-warm-brown/10'
            }`}
          >
            List
          </button>
        </div>
      </header>

      <main>
        {activeView === 'minimal' && <MinimalView />}
        {activeView === 'cards' && <CardsView />}
        {activeView === 'list' && <ListView />}
      </main>
    </div>
  );
}
