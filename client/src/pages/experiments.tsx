
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Experiments() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  // Simple status indicator with correct colors
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div 
      className={`w-2 h-2 rounded-full ${
        experiment.status === 'learn' ? 'bg-gray-400' : 
        experiment.status === 'build' ? 'bg-yellow-500' : 
        experiment.status === 'scale' ? 'bg-green-500' :
        'bg-gray-400'
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

  // Get status display text
  const getStatusDisplay = (status: string) => {
    return status === 'learn' ? 'Archive' : status === 'build' ? 'WIP' : status;
  };

  // Toggle row expansion
  const toggleRow = (experimentId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(experimentId)) {
      newExpanded.delete(experimentId);
    } else {
      newExpanded.add(experimentId);
    }
    setExpandedRows(newExpanded);
  };

  // Order experiments: build/scale (active) first, then learn (archived)
  const buildExperiments = experiments.filter(exp => exp.status === 'build');
  const scaleExperiments = experiments.filter(exp => exp.status === 'scale');
  const learnExperiments = experiments.filter(exp => exp.status === 'learn');
  const orderedExperiments = [...buildExperiments, ...scaleExperiments, ...learnExperiments];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        <div className="bg-light-brown rounded-lg overflow-hidden">
          {/* Desktop Header */}
          {!isMobile && (
            <div className="px-6 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-warm-brown">
                <div className="col-span-2">Status</div>
                <div className="col-span-7">Project</div>
                <div className="col-span-2">Timeline</div>
                <div className="col-span-1">Team</div>
              </div>
            </div>
          )}
          
          {/* Mobile Header */}
          {isMobile && (
            <div className="px-4 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-warm-brown">
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Project</div>
                <div className="col-span-7">Description</div>
              </div>
            </div>
          )}

          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => (
              <div key={experiment.id}>
                {/* Desktop Row */}
                {!isMobile && (
                  <div className="px-6 py-3">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 flex items-center gap-2">
                        <StatusDot experiment={experiment} />
                        <span className="text-sm capitalize">{getStatusDisplay(experiment.status)}</span>
                      </div>
                      <div className="col-span-7">
                        <h3 className="font-medium text-warm-brown inline">{experiment.title}</h3>
                        <span className="text-sm text-soft-black ml-2">— {experiment.description}</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-grey">
                        {experiment.timeframe}
                      </div>
                      <div className="col-span-1 text-sm text-muted-grey">
                        {getTeamDisplay(experiment)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Row */}
                {isMobile && (
                  <div>
                    <div 
                      className="px-4 py-3 cursor-pointer hover:bg-warm-brown/5 transition-colors"
                      onClick={() => toggleRow(experiment.id)}
                    >
                      <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-2 flex items-start gap-1 pt-1">
                          <StatusDot experiment={experiment} />
                          <span className="text-xs capitalize leading-tight">{getStatusDisplay(experiment.status)}</span>
                        </div>
                        <div className="col-span-3">
                          <h3 className="font-medium text-warm-brown text-sm leading-tight">{experiment.title}</h3>
                        </div>
                        <div className="col-span-7 flex items-center justify-between">
                          <span className="text-sm text-soft-black leading-tight">{experiment.description}</span>
                          <span className="text-xs text-muted-grey ml-2 flex-shrink-0">
                            {expandedRows.has(experiment.id) ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Details */}
                    {expandedRows.has(experiment.id) && (
                      <div className="px-4 py-3 bg-warm-brown/5 border-t border-warm-brown/10">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Tech:</span>
                            <span className="text-soft-black">-</span>
                          </div>
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Timeline:</span>
                            <span className="text-muted-grey">{experiment.timeframe}</span>
                          </div>
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Team:</span>
                            <span className="text-muted-grey">{getTeamDisplay(experiment)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
