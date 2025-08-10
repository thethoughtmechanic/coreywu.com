
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Experiments() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  // Status indicator with CORRECT colors: Yellow for WIP (build), Grey for Archive (learn)
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div 
      className={`w-3 h-3 rounded-full ${
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

  // Get status display text with Archive instead of learn
  const getStatusDisplay = (status: string) => {
    return status === 'learn' ? 'Archive' : status === 'build' ? 'WIP' : status;
  };

  // Toggle row expansion for mobile
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
                <div className="col-span-4">Project</div>
                <div className="col-span-3">Tech</div>
                <div className="col-span-2">Timeline</div>
                <div className="col-span-1">Team</div>
              </div>
            </div>
          )}

          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => (
              <div key={experiment.id}>
                {/* Desktop Row */}
                {!isMobile && (
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <StatusDot experiment={experiment} />
                        <span className="text-sm font-medium">{getStatusDisplay(experiment.status)}</span>
                      </div>
                      <div className="col-span-4">
                        <h3 className="font-medium text-warm-brown mb-1">{experiment.title}</h3>
                        <p className="text-sm text-soft-black">{experiment.description}</p>
                      </div>
                      <div className="col-span-3 text-sm text-muted-grey">
                        React, Node.js
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

                {/* Mobile Row - ONLY status, project, description */}
                {isMobile && (
                  <div>
                    <div 
                      className="px-4 py-4 cursor-pointer hover:bg-warm-brown/5 transition-colors"
                      onClick={() => toggleRow(experiment.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status Column */}
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <StatusDot experiment={experiment} />
                          <span className="text-xs font-medium text-warm-brown">{getStatusDisplay(experiment.status)}</span>
                        </div>
                        
                        {/* Project Column */}
                        <div className="flex-shrink-0 w-20">
                          <h3 className="font-medium text-warm-brown text-sm leading-tight">{experiment.title}</h3>
                        </div>
                        
                        {/* Description Column */}
                        <div className="flex-1 flex items-start justify-between">
                          <span className="text-sm text-soft-black leading-tight pr-2">{experiment.description}</span>
                          <span className="text-lg text-muted-grey flex-shrink-0">
                            {expandedRows.has(experiment.id) ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Details - tech, timeline, team on second row */}
                    {expandedRows.has(experiment.id) && (
                      <div className="px-4 py-3 bg-warm-brown/5 border-t border-warm-brown/10">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Tech</span>
                            <span className="text-soft-black">React, Node.js</span>
                          </div>
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Timeline</span>
                            <span className="text-muted-grey">{experiment.timeframe}</span>
                          </div>
                          <div>
                            <span className="font-medium text-warm-brown block mb-1">Team</span>
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
