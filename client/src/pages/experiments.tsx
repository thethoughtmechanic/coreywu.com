import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
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
         experiment.status === 'wip' ? 'Wip' : 
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
  const getExperimentRoute = (experimentId: string) => {
    const routeMap: { [key: string]: string } = {
      'mister-misu-1': '/experiments/mistermisu',
      'boyfriend-material-1': '/experiments/boyfriendmaterial',
      'friday-home-1': '/experiments/fridayhome',
      'prompt-pulse-1': '/experiments/promptpulse',
      'food-for-thought-1': '/experiments/foodforthought',
      'lew-wu-1': '/experiments/lewwu'
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

  // Desktop Table View - Scale Effect
  const DesktopView = () => (
    <div className="bg-light-brown rounded-lg overflow-hidden">
      <div className="px-6 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-warm-brown">
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Project</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Technologies</div>
          <div className="col-span-2">Timeline</div>
          <div className="col-span-1">Team</div>
        </div>
      </div>
      <div className="divide-y divide-warm-brown/10">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);
          const RowContent = () => (
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-2">
                <StatusDot experiment={experiment} />
              </div>
              <div className="col-span-2">
                <h3 className={`font-medium transition-colors duration-300 ${route ? 'text-amber-700 group-hover:text-amber-800' : 'text-warm-brown'}`}>
                  {experiment.title}
                </h3>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-soft-black">{experiment.description}</p>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-grey">
                  {getTechnologiesDisplay(experiment)}
                </div>
              </div>
              <div className="col-span-2 text-sm text-muted-grey">
                {experiment.timeframe}
              </div>
              <div className="col-span-1 text-sm text-muted-grey">
                {getTeamDisplay(experiment)}
              </div>
            </div>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="w-full px-6 py-4 text-left transition-all duration-300 cursor-pointer group transform origin-center hover:scale-105 hover:shadow-xl hover:bg-amber-50"
              data-testid={`button-${experiment.id}-desktop`}
            >
              <RowContent />
            </button>
          ) : (
            <div key={experiment.id} className="px-6 py-4">
              <RowContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  // Mobile Card View - Slide Effect
  const MobileView = () => (
    <div className="space-y-4">
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const CardContent = () => (
          <div className="space-y-3">
            {/* Row 1: Status dot + Project title */}
            <div className="flex items-center gap-3 mb-2">
              <div 
                className={`w-3 h-3 min-w-[12px] min-h-[12px] rounded-full flex-shrink-0 ${
                  experiment.status === 'sunset' ? 'bg-gray-500' : 
                  experiment.status === 'wip' ? 'bg-yellow-500' : 
                  experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
                  experiment.status === 'shipped' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`} 
              />
              <h3 className={`font-medium text-lg ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                {experiment.title}
              </h3>
            </div>

            {/* Row 2: Date and collaborator */}
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-grey">{experiment.timeframe}</span>
              <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
            </div>

            {/* Technologies as pills with improved styling */}
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {experiment.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className="w-full bg-light-brown rounded-lg overflow-hidden cursor-pointer group relative"
            data-testid={`button-${experiment.id}-mobile`}
          >
            <div className="p-4 transform transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2">
              <CardContent />
            </div>
            {/* Accent line that appears on hover/touch */}
            <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0 group-active:translate-x-0"></div>
          </button>
        ) : (
          <div key={experiment.id} className="bg-light-brown rounded-lg p-4">
            <CardContent />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-grey mb-6 max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-yellow-500 flex-shrink-0"></div>
              <span>Work in Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-green-500 flex-shrink-0"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-blue-500 flex-shrink-0"></div>
              <span>Shipped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-gray-500 flex-shrink-0"></div>
              <span>Sunset</span>
            </div>
          </div>
        )}
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