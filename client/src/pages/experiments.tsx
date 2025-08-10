
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  // Simple status indicator with correct colors
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div className="flex items-center gap-2">
      <div 
        className={`w-3 h-3 rounded-full ${
          experiment.status === 'sunset' ? 'bg-red-500' : 
          experiment.status === 'wip' ? 'bg-green-500' : 
          'bg-gray-400'
        }`} 
      />
      <span className="text-sm capitalize">
        {experiment.status === 'sunset' ? 'Sunset' : experiment.status === 'wip' ? 'Wip' : experiment.status}
      </span>
    </div>
  );

  // Get team display text - simplified
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators[0]; // Just show the first collaborator
  };

  // Get technologies display
  const getTechnologiesDisplay = (experiment: Experiment) => {
    if (!experiment.technologies || experiment.technologies.length === 0) {
      return '';
    }
    return experiment.technologies.join(', ');
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

  // Order experiments with WIP first, then Sunset
  const wipExperiments = experiments.filter(exp => exp.status === 'wip');
  const sunsetExperiments = experiments.filter(exp => exp.status === 'sunset');
  const orderedExperiments = [...wipExperiments, ...sunsetExperiments];

  // Desktop Table View
  const DesktopView = () => (
    <div className="bg-light-brown rounded-lg overflow-hidden">
      <div className="px-6 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-warm-brown">
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Project</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Technologies</div>
          <div className="col-span-2">Timeline</div>
          <div className="col-span-1">Team</div>
        </div>
      </div>
      <div className="divide-y divide-warm-brown/10">
        {orderedExperiments.map((experiment) => (
          <div key={experiment.id} className="px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-1">
                <StatusDot experiment={experiment} />
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
              </div>
              <div className="col-span-4">
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
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-4">
      {orderedExperiments.map((experiment) => (
        <div key={experiment.id} className="bg-light-brown rounded-lg p-4">
          <div className="space-y-3">
            {/* Project title with status dot */}
            <div className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  experiment.status === 'sunset' ? 'bg-red-500' : 
                  experiment.status === 'wip' ? 'bg-green-500' : 
                  'bg-gray-400'
                }`} 
              />
              <h3 className="font-medium text-warm-brown text-lg">{experiment.title}</h3>
            </div>
            
            {/* Description */}
            <div>
              <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
            </div>

            {/* Technologies as pills */}
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {experiment.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-warm-brown/10 text-warm-brown rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            {/* Timeline and Team on same line */}
            <div className="flex justify-between items-center text-xs text-muted-grey">
              <span>{experiment.timeframe}</span>
              <span>{getTeamDisplay(experiment)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        {isMobile ? <MobileView /> : <DesktopView />}
      </main>
    </div>
  );
}
