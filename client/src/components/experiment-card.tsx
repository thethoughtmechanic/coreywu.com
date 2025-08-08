import { Experiment } from "@shared/schema";

interface ExperimentCardProps {
  experiment: Experiment;
  variant?: 'default' | 'compact';
}

export function ExperimentCard({ experiment, variant = 'default' }: ExperimentCardProps) {
  // Compact variant for dashboard view
  if (variant === 'compact') {
    return (
      <div className={`bg-light-brown rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 h-fit group ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
          <div className="flex-1 min-w-0">
            <h3 
              className="text-sm font-medium text-warm-brown mb-2 leading-tight group-hover:text-hover-brown transition-colors duration-200"
              data-testid={`text-experiment-title-${experiment.id}`}
            >
              {experiment.title}
            </h3>
            <p 
              className="text-xs text-muted-grey mb-2"
              data-testid={`text-experiment-timeframe-${experiment.id}`}
            >
              {experiment.timeframe}
            </p>
            <p 
              className="text-xs text-soft-black mb-3 line-clamp-2 leading-relaxed"
              data-testid={`text-experiment-description-${experiment.id}`}
            >
              {experiment.description}
            </p>
            <div className="flex items-center justify-between">
              {experiment.collaborators && experiment.collaborators.length > 0 && (
                <div className="flex space-x-1" data-testid={`text-experiment-collaborators-${experiment.id}`}>
                  {experiment.collaborators.slice(0, 2).map((collaborator, index) => (
                    <span 
                      key={index}
                      className="text-xs px-1.5 py-0.5 bg-warm-brown/10 text-warm-brown rounded text-[10px]"
                    >
                      {collaborator}
                    </span>
                  ))}
                  {experiment.collaborators.length > 2 && (
                    <span className="text-xs text-muted-grey">+{experiment.collaborators.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (existing full-size layout)
  return (
    <div className={`bg-light-brown rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
              <h3 
                className="text-xl font-medium text-warm-brown"
                data-testid={`text-experiment-title-${experiment.id}`}
              >
                {experiment.title}
              </h3>
            </div>
            <p 
              className="text-sm text-muted-grey mb-3"
              data-testid={`text-experiment-timeframe-${experiment.id}`}
            >
              {experiment.timeframe}
            </p>
            <p 
              className="text-soft-black mb-4"
              data-testid={`text-experiment-description-${experiment.id}`}
            >
              {experiment.description}
            </p>
            <div className="flex items-center space-x-4">
              {experiment.collaborators && experiment.collaborators.length > 0 && (
                <div className="flex space-x-2" data-testid={`text-experiment-collaborators-${experiment.id}`}>
                  {experiment.collaborators.map((collaborator, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-warm-brown/20 text-warm-brown rounded"
                    >
                      {collaborator}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}