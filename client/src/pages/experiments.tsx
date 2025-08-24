import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Simple status indicator with correct colors
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div className="flex items-center gap-2">
      <div 
        className={`w-3 h-3 min-w-[12px] min-h-[12px] rounded-full flex-shrink-0 ${
          experiment.status === 'sunset' ? 'bg-gray-500' : 
          experiment.status === 'wip' ? 'bg-yellow-500' : 
          experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
          experiment.status === 'shipped' ? 'bg-blue-500' :
          'bg-gray-400'
        }`} 
      />
      <span className="text-sm capitalize whitespace-nowrap">
        {experiment.status === 'sunset' ? 'Sunset' : 
         experiment.status === 'wip' ? 'WIP' : 
         experiment.status === 'shipped' && experiment.isActive ? 'Active' :
         experiment.status === 'shipped' ? 'Shipped' : 
         experiment.status}
      </span>
    </div>
  );

  // Get team display text - show all collaborators
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
  };

  // Get technologies display
  const getTechnologiesDisplay = (experiment: Experiment) => {
    if (!experiment.technologies || experiment.technologies.length === 0) {
      return '';
    }
    return experiment.technologies.join(', ');
  };

  // Helper function to get the route for each experiment
  // Only Mister Misu, Friday Home, and Boyfriend Material are currently linked for viewers
  const getExperimentRoute = (experimentId: string) => {
    const routeMap: { [key: string]: string } = {
      'mister-misu-1': '/experiments/mistermisu',
      'friday-home-1': '/experiments/fridayhome',
      'boyfriend-material-1': '/experiments/boyfriendmaterial'
      // Other routes disabled for viewers but still accessible via direct URL:
      // 'prompt-pulse-1': '/experiments/promptpulse',
      // 'food-for-thought-1': '/experiments/foodforthought',
      // 'lew-wu-1': '/experiments/lewwu'
    };
    return routeMap[experimentId] || null;
  };

  // Toggle card expansion
  const toggleCardExpansion = (experimentId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(experimentId)) {
      newExpanded.delete(experimentId);
    } else {
      newExpanded.add(experimentId);
    }
    setExpandedCards(newExpanded);
  };

  // Order experiments by date (descending order - most recent first)
  const orderedExperiments = [...experiments].sort((a, b) => {
    // Extract year from timeframe for sorting (e.g., "2025 - Present" -> 2025)
    const getYear = (timeframe: string) => {
      const match = timeframe.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };

    const yearA = getYear(a.timeframe || '');
    const yearB = getYear(b.timeframe || '');

    return yearB - yearA; // Descending order
  });

  // Desktop Table View
  const DesktopView = () => (
    <div className="bg-light-brown rounded-lg overflow-hidden border border-warm-brown/20">
      <div className="px-6 py-4 border-b border-warm-brown/20 bg-warm-brown/5">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-warm-brown uppercase tracking-wide">
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Project</div>
          <div className="col-span-3">Overview</div>
          <div className="col-span-2">Tech Stack</div>
          <div className="col-span-1">Timeline</div>
          <div className="col-span-1">Team</div>
        </div>
      </div>
      <div className="divide-y divide-warm-brown/10">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);
          const RowContent = () => (
            <div className="grid grid-cols-12 gap-4 items-start py-1">
              <div className="col-span-2">
                <StatusDot experiment={experiment} />
              </div>
              <div className="col-span-3">
                <h3 className={`text-lg font-bold ${route ? 'text-amber-700' : 'text-warm-brown'} mb-1`}>
                  {experiment.title}
                </h3>
                <div className="text-xs text-muted-grey">
                  {experiment.collaborators && experiment.collaborators.length > 0
                    ? `Collaboration with ${experiment.collaborators.join(', ')}`
                    : 'Solo project'
                  }
                </div>
              </div>
              <div className="col-span-3">
                <div className="bg-warm-brown/5 rounded-md p-3 border border-warm-brown/10">
                  <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-wrap gap-1">
                  {experiment.technologies && experiment.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-white border border-warm-brown/20 text-warm-brown rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {experiment.technologies && experiment.technologies.length > 3 && (
                    <span className="text-xs text-muted-grey self-center">
                      +{experiment.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-xs text-muted-grey font-medium bg-warm-brown/5 px-2 py-1 rounded border border-warm-brown/10 text-center">
                  {experiment.timeframe}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-xs text-center">
                  <div className="w-8 h-8 mx-auto bg-warm-brown/10 rounded-full flex items-center justify-center border border-warm-brown/20">
                    <span className="font-bold text-warm-brown">
                      {experiment.collaborators ? experiment.collaborators.length + 1 : 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="w-full px-6 py-5 text-left hover:bg-warm-brown/5 transition-colors duration-200 cursor-pointer"
              data-testid={`button-${experiment.id}-desktop`}
            >
              <RowContent />
            </button>
          ) : (
            <div key={experiment.id} className="px-6 py-5">
              <RowContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  // Status pill component
  const StatusPill = ({ status, isActive }: { status: string, isActive?: boolean }) => {
    const getStatusText = () => {
      if (status === 'sunset') return 'Sunset';
      if (status === 'wip') return 'WIP';
      if (status === 'shipped' && isActive) return 'Active';
      if (status === 'shipped') return 'Shipped';
      return status;
    };

    const getStatusColor = () => {
      if (status === 'sunset') return 'bg-gray-100 text-gray-600 border-gray-200';
      if (status === 'wip') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      if (status === 'shipped' && isActive) return 'bg-green-100 text-green-700 border-green-200';
      if (status === 'shipped') return 'bg-blue-100 text-blue-700 border-blue-200';
      return 'bg-gray-100 text-gray-600 border-gray-200';
    };

    return (
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    );
  };

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-4">
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const CardContent = () => (
          <div className="space-y-4">
            {/* Project Header - Status and Timeline */}
            <div className="flex items-center justify-between">
              <StatusPill status={experiment.status} isActive={experiment.isActive} />
              <div className="text-xs text-muted-grey font-medium bg-warm-brown/5 px-3 py-1.5 rounded-full border border-warm-brown/10">
                {experiment.timeframe}
              </div>
            </div>

            {/* Project Title */}
            <div>
              <h3 className={`text-xl font-bold ${route ? 'text-amber-700' : 'text-warm-brown'} mb-1`}>
                {experiment.title}
              </h3>
              {/* Team/Collaboration Type */}
              <div className="flex items-center gap-2 text-xs text-muted-grey">
                <div className="w-1.5 h-1.5 bg-muted-grey rounded-full"></div>
                <span className="font-medium">
                  {experiment.collaborators && experiment.collaborators.length > 0
                    ? `${experiment.collaborators.length + 1} person team` 
                    : 'Solo project'
                  }
                </span>
                {experiment.collaborators && experiment.collaborators.length > 0 && (
                  <span className="text-warm-brown/60">
                    ({experiment.collaborators.join(', ')})
                  </span>
                )}
              </div>
            </div>

            {/* Project Overview */}
            <div className="bg-warm-brown/5 rounded-lg p-3 border border-warm-brown/10">
              <p className="text-sm text-soft-black leading-relaxed">
                {experiment.description}
              </p>
            </div>

            {/* Technology Stack */}
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xs font-semibold text-warm-brown uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex-1 h-px bg-warm-brown/20"></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(expandedTech.has(experiment.id) 
                    ? experiment.technologies 
                    : experiment.technologies.slice(0, 4)
                  ).map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2.5 py-1.5 bg-white border border-warm-brown/20 text-warm-brown rounded-md font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {experiment.technologies.length > 4 && !expandedTech.has(experiment.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newExpanded = new Set(expandedTech);
                        newExpanded.add(experiment.id);
                        setExpandedTech(newExpanded);
                      }}
                      className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-md font-medium hover:bg-gray-200 transition-colors"
                    >
                      +{experiment.technologies.length - 4} more
                    </button>
                  )}
                  {expandedTech.has(experiment.id) && experiment.technologies.length > 4 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newExpanded = new Set(expandedTech);
                        newExpanded.delete(experiment.id);
                        setExpandedTech(newExpanded);
                      }}
                      className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-md font-medium hover:bg-gray-200 transition-colors"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className="w-full bg-white rounded-lg p-6 text-left hover:bg-warm-brown/5 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg border border-warm-brown/20 hover:border-warm-brown/30"
            data-testid={`button-${experiment.id}-mobile`}
          >
            <CardContent />
          </button>
        ) : (
          <div key={experiment.id} className="bg-white rounded-lg p-6 shadow-md border border-warm-brown/20">
            <CardContent />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        {isMobile ? <MobileView /> : <DesktopView />}
      </main>

      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in collaborating or just want to chat? Reach out at{' '}
          <a 
            href="mailto:coreydavidwu@gmail.com"
            className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
          >
            coreydavidwu@gmail.com
          </a>
        </p>
      </footer>

    </div>
  );
}