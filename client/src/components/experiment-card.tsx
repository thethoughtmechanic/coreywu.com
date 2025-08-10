import { Experiment } from "@shared/schema";

interface ExperimentCardProps {
  experiment: Experiment;
  variant?: 'default' | 'compact';
  showStatusIndicator?: boolean;
}

export function ExperimentCard({ experiment, variant = 'default', showStatusIndicator = false }: ExperimentCardProps) {
  // Compact variant for dashboard view
  if (variant === 'compact') {
    return (
      <div className={`bg-light-brown rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 h-fit group relative overflow-hidden ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
        {/* Paint Splatter Background - appears on hover or when status is highlighted */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out rounded-lg ${showStatusIndicator ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{
            background: experiment.status === 'sunset' ? `
              radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
              radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
              radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
              radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
              radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
            ` : experiment.status === 'wip' ? `
              radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
              radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
              radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
              radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
              radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
            ` : `
              radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
              radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
              radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
              radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
              radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
            `,
            transform: 'scale(2.5) rotate(25deg)'
          }}
        />

        {/* Text Background for better readability when splatter is visible */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ease-out rounded-lg ${showStatusIndicator ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

        <div className="flex items-start relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${experiment.status === 'sunset' ? 'bg-gray-400' : experiment.status === 'wip' ? 'bg-yellow-500' : experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
              <h3 
                className={`text-sm font-medium text-warm-brown leading-tight group-hover:text-white group-hover:font-semibold transition-all duration-500 ${showStatusIndicator ? 'text-white font-semibold' : ''}`}
                data-testid={`text-experiment-title-${experiment.id}`}
              >
                {experiment.title}
              </h3>
            </div>
            <p 
              className={`text-xs text-muted-grey mb-2 group-hover:text-white/70 transition-all duration-500 ${showStatusIndicator ? 'text-white/70' : ''}`}
              data-testid={`text-experiment-timeframe-${experiment.id}`}
            >
              {experiment.timeframe}
            </p>
            <p 
              className={`text-xs text-soft-black mb-3 line-clamp-2 leading-relaxed group-hover:text-white/90 transition-all duration-500 ${showStatusIndicator ? 'text-white/90' : ''}`}
              data-testid={`text-experiment-description-${experiment.id}`}
            >
              {experiment.description}
            </p>
            <div className="flex items-center justify-between min-h-[20px]">
              <div className="flex space-x-1" data-testid={`text-experiment-collaborators-${experiment.id}`}>
                {experiment.collaborators && experiment.collaborators.length > 0 ? (
                  <>
                    {experiment.collaborators.slice(0, 2).map((collaborator, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-1.5 py-0.5 bg-warm-brown/10 text-warm-brown rounded text-[10px] group-hover:bg-white/20 group-hover:text-white transition-all duration-500 ${showStatusIndicator ? 'bg-white/20 text-white' : ''}`}
                      >
                        {collaborator}
                      </span>
                    ))}
                    {experiment.collaborators.length > 2 && (
                      <span className={`text-xs text-muted-grey group-hover:text-white/70 transition-all duration-500 ${showStatusIndicator ? 'text-white/70' : ''}`}>+{experiment.collaborators.length - 2}</span>
                    )}
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (existing full-size layout)
  return (
    <div className={`bg-light-brown rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group ${!experiment.isActive ? 'opacity-75 hover:opacity-100' : ''}`}>
      {/* Paint Splatter Background - appears on hover or when status is highlighted */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out rounded-lg ${showStatusIndicator ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: experiment.status === 'sunset' ? `
            radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
            radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
            radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
            radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
            radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
          ` : experiment.status === 'wip' ? `
            radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
            radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
            radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
            radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
            radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
          ` : `
            radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
            radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
            radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
            radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
            radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
          `,
          transform: 'scale(4.0) rotate(45deg)'
        }}
      />

      {/* Text Background for better readability when splatter is visible */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ease-out rounded-lg ${showStatusIndicator ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${experiment.status === 'sunset' ? 'bg-gray-400' : experiment.status === 'wip' ? 'bg-yellow-500' : experiment.isActive ? 'bg-active-green' : 'bg-muted-grey'}`}></div>
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