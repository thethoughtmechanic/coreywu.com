import { Experiment } from "@shared/schema";

interface ExperimentCardProps {
  experiment: Experiment;
  variant?: 'default' | 'compact';
}

export function ExperimentCard({ experiment, variant = 'default' }: ExperimentCardProps) {
  // Compact variant for dashboard view
  if (variant === 'compact') {
    return (
      <div className={`bg-light-brown rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 h-fit group relative overflow-hidden ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
        {/* Paint Splatter Background - appears on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"
          style={{
            background: experiment.status === 'sunset' ? `
              radial-gradient(ellipse 50% 40% at 25% 15%, #6b7280 0%, #6b7280 50%, transparent 90%),
              radial-gradient(ellipse 45% 35% at 75% 25%, #9ca3af 0%, #9ca3af 45%, transparent 85%),
              radial-gradient(ellipse 40% 50% at 15% 85%, #4b5563 0%, #4b5563 55%, transparent 95%),
              radial-gradient(ellipse 50% 30% at 85% 80%, #374151 0%, #374151 40%, transparent 80%),
              radial-gradient(ellipse 45% 45% at 50% 50%, #d1d5db 0%, #d1d5db 45%, transparent 85%)
            ` : `
              radial-gradient(ellipse 50% 40% at 25% 15%, #06b6d4 0%, #06b6d4 50%, transparent 90%),
              radial-gradient(ellipse 45% 35% at 75% 25%, #0891b2 0%, #0891b2 45%, transparent 85%),
              radial-gradient(ellipse 40% 50% at 15% 85%, #0e7490 0%, #0e7490 55%, transparent 95%),
              radial-gradient(ellipse 50% 30% at 85% 80%, #22d3ee 0%, #22d3ee 40%, transparent 80%),
              radial-gradient(ellipse 45% 45% at 50% 50%, #0284c7 0%, #0284c7 45%, transparent 85%)
            `,
            transform: 'scale(1.8) rotate(25deg)'
          }}
        />

        {/* Text Background for better readability when splatter is visible */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

        <div className="flex items-start relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
              <h3 
                className="text-sm font-medium text-warm-brown leading-tight group-hover:text-white group-hover:font-semibold transition-all duration-500"
                data-testid={`text-experiment-title-${experiment.id}`}
              >
                {experiment.title}
              </h3>
            </div>
            <p 
              className="text-xs text-muted-grey mb-2 group-hover:text-white/70 transition-all duration-500"
              data-testid={`text-experiment-timeframe-${experiment.id}`}
            >
              {experiment.timeframe}
            </p>
            <p 
              className="text-xs text-soft-black mb-3 line-clamp-2 leading-relaxed group-hover:text-white/90 transition-all duration-500"
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
                      className="text-xs px-1.5 py-0.5 bg-warm-brown/10 text-warm-brown rounded text-[10px] group-hover:bg-white/20 group-hover:text-white transition-all duration-500"
                    >
                      {collaborator}
                    </span>
                  ))}
                  {experiment.collaborators.length > 2 && (
                    <span className="text-xs text-muted-grey group-hover:text-white/70 transition-all duration-500">+{experiment.collaborators.length - 2}</span>
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
    <div className={`bg-light-brown rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
      {/* Paint Splatter Background - appears on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"
        style={{
          background: experiment.status === 'sunset' ? `
            radial-gradient(ellipse 50% 40% at 25% 15%, #6b7280 0%, #6b7280 50%, transparent 90%),
            radial-gradient(ellipse 45% 35% at 75% 25%, #9ca3af 0%, #9ca3af 45%, transparent 85%),
            radial-gradient(ellipse 40% 50% at 15% 85%, #4b5563 0%, #4b5563 55%, transparent 95%),
            radial-gradient(ellipse 50% 30% at 85% 80%, #374151 0%, #374151 40%, transparent 80%),
            radial-gradient(ellipse 45% 45% at 50% 50%, #d1d5db 0%, #d1d5db 45%, transparent 85%)
          ` : `
            radial-gradient(ellipse 50% 40% at 25% 15%, #06b6d4 0%, #06b6d4 50%, transparent 90%),
            radial-gradient(ellipse 45% 35% at 75% 25%, #0891b2 0%, #0891b2 45%, transparent 85%),
            radial-gradient(ellipse 40% 50% at 15% 85%, #0e7490 0%, #0e7490 55%, transparent 95%),
            radial-gradient(ellipse 50% 30% at 85% 80%, #22d3ee 0%, #22d3ee 40%, transparent 80%),
            radial-gradient(ellipse 45% 45% at 50% 50%, #0284c7 0%, #0284c7 45%, transparent 85%)
          `,
          transform: 'scale(1.8) rotate(45deg)'
        }}
      />

      {/* Text Background for better readability when splatter is visible */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
              <h3 
                className="text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500"
                data-testid={`text-experiment-title-${experiment.id}`}
              >
                {experiment.title}
              </h3>
            </div>
            <p 
              className="text-sm text-muted-grey mb-3 group-hover:text-white/70 transition-all duration-500"
              data-testid={`text-experiment-timeframe-${experiment.id}`}
            >
              {experiment.timeframe}
            </p>
            <p 
              className="text-soft-black mb-4 group-hover:text-white/90 transition-all duration-500"
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
                      className="text-xs px-2 py-1 bg-warm-brown/20 text-warm-brown rounded group-hover:bg-white/20 group-hover:text-white transition-all duration-500"
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