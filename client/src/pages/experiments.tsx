
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Experiments() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Helper function to get the route for each experiment
  const getExperimentRoute = (experimentId: string) => {
    const routeMap: { [key: string]: string } = {
      'mister-misu-1': '/experiments/mistermisu',
      'friday-home-1': '/experiments/fridayhome',
      'boyfriend-material-1': '/experiments/boyfriendmaterial'
    };
    return routeMap[experimentId] || null;
  };

  // Get team display text
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
  };

  // Order experiments by date (descending order - most recent first)
  const orderedExperiments = [...experiments].sort((a, b) => {
    const getYear = (timeframe: string) => {
      const match = timeframe.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };

    const yearA = getYear(a.timeframe || '');
    const yearB = getYear(b.timeframe || '');

    return yearB - yearA;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {orderedExperiments.map((experiment) => {
            const route = getExperimentRoute(experiment.id);
            
            const CardContent = () => (
              <article className="bg-light-brown rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 group h-full">
                <div className="space-y-4 h-full flex flex-col">
                  {/* Row 1: Status pill and date */}
                  <div className="flex items-center justify-between">
                    <span 
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 group relative overflow-hidden cursor-pointer ${
                        experiment.status === 'sunset' ? 'bg-gray-100 text-gray-700 hover:text-white' : 
                        experiment.status === 'wip' ? 'bg-yellow-100 text-yellow-700 hover:text-white' : 
                        experiment.status === 'shipped' && experiment.isActive ? 'bg-green-100 text-green-700 hover:text-white' :
                        experiment.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:text-white' :
                        'bg-gray-100 text-gray-700 hover:text-white'
                      }`}
                    >
                      {/* Paint splatter background for status pill */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-full overflow-hidden"
                        style={{
                          background: experiment.status === 'sunset' ? `
                            radial-gradient(ellipse 80% 60% at 30% 20%, #6b7280 0%, #6b7280 40%, transparent 80%),
                            radial-gradient(ellipse 70% 50% at 70% 30%, #4b5563 0%, #4b5563 50%, transparent 90%),
                            radial-gradient(ellipse 60% 80% at 20% 75%, #374151 0%, #374151 60%, transparent 100%),
                            radial-gradient(ellipse 85% 40% at 80% 85%, #9ca3af 0%, #9ca3af 35%, transparent 75%),
                            radial-gradient(ellipse 45% 50% at 50% 60%, #1f2937 0%, #1f2937 50%, transparent 90%)
                          ` : experiment.status === 'wip' ? `
                            radial-gradient(ellipse 80% 60% at 30% 20%, #f59e0b 0%, #f59e0b 40%, transparent 80%),
                            radial-gradient(ellipse 70% 50% at 70% 30%, #dc2626 0%, #dc2626 50%, transparent 90%),
                            radial-gradient(ellipse 60% 80% at 20% 75%, #ea580c 0%, #ea580c 60%, transparent 100%),
                            radial-gradient(ellipse 85% 40% at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
                            radial-gradient(ellipse 45% 50% at 50% 60%, #ef4444 0%, #ef4444 50%, transparent 90%)
                          ` : experiment.status === 'shipped' && experiment.isActive ? `
                            radial-gradient(ellipse 80% 60% at 30% 20%, #10b981 0%, #10b981 40%, transparent 80%),
                            radial-gradient(ellipse 70% 50% at 70% 30%, #059669 0%, #059669 50%, transparent 90%),
                            radial-gradient(ellipse 60% 80% at 20% 75%, #047857 0%, #047857 60%, transparent 100%),
                            radial-gradient(ellipse 85% 40% at 80% 85%, #34d399 0%, #34d399 35%, transparent 75%),
                            radial-gradient(ellipse 45% 50% at 50% 60%, #065f46 0%, #065f46 50%, transparent 90%)
                          ` : `
                            radial-gradient(ellipse 80% 60% at 30% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                            radial-gradient(ellipse 70% 50% at 70% 30%, #2563eb 0%, #2563eb 50%, transparent 90%),
                            radial-gradient(ellipse 60% 80% at 20% 75%, #1d4ed8 0%, #1d4ed8 60%, transparent 100%),
                            radial-gradient(ellipse 85% 40% at 80% 85%, #60a5fa 0%, #60a5fa 35%, transparent 75%),
                            radial-gradient(ellipse 45% 50% at 50% 60%, #1e40af 0%, #1e40af 50%, transparent 90%)
                          `,
                          transform: 'scale(3)'
                        }}
                      />
                      <span className="relative z-10">
                        {experiment.status === 'sunset' ? 'Sunset' : 
                         experiment.status === 'wip' ? 'WIP' : 
                         experiment.status === 'shipped' && experiment.isActive ? 'Active' :
                         experiment.status === 'shipped' ? 'Shipped' : 
                         experiment.status}
                      </span>
                    </span>
                    <span className="text-sm text-muted-grey group-hover:text-white/70 transition-colors duration-300">
                      {experiment.timeframe}
                    </span>
                  </div>

                  {/* Row 2: Project title */}
                  <div>
                    <h3 className={`text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300 ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                      {experiment.title}
                    </h3>
                  </div>

                  {/* Row 3: Team info */}
                  <div>
                    <span className="text-sm text-warm-brown font-medium group-hover:text-white/90 transition-colors duration-300">
                      {getTeamDisplay(experiment)}
                    </span>
                  </div>

                  {/* Row 4: Description */}
                  <div className="flex-grow">
                    <p className="text-sm text-soft-black leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {experiment.description}
                    </p>
                  </div>

                  {/* Row 5: Technologies */}
                  {experiment.technologies && experiment.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                      {experiment.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );

            return route ? (
              <button
                key={experiment.id}
                onClick={() => setLocation(route)}
                className="text-left group/card cursor-pointer"
                data-testid={`button-${experiment.id}`}
              >
                <CardContent />
              </button>
            ) : (
              <div key={experiment.id} className="group/card">
                <CardContent />
              </div>
            );
          })}
        </div>
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
