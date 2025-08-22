
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function ExperimentsExperimental() {
  const [, setLocation] = useLocation();
  const [expandedExperiment, setExpandedExperiment] = useState<string | null>(null);
  const isMobile = useIsMobile();

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

  // Categorize experiments
  const categorizedExperiments = {
    individual: experiments.filter(exp => exp.id === 'prompt-pulse-1'),
    team: experiments.filter(exp => exp.id === 'food-for-thought-1'),
    relationships: experiments.filter(exp =>
      ['boyfriend-material-1', 'mister-misu-1', 'friday-home-1', 'lew-wu-1'].includes(exp.id)
    )
  };

  // Sort each category by timeframe (most recent first)
  Object.keys(categorizedExperiments).forEach(category => {
    categorizedExperiments[category as keyof typeof categorizedExperiments].sort((a, b) => {
      const getYear = (timeframe: string) => {
        const match = timeframe.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      };

      const yearA = getYear(a.timeframe || '');
      const yearB = getYear(b.timeframe || '');

      return yearB - yearA;
    });
  });

  const ExperimentItem = ({ experiment }: { experiment: Experiment }) => {
    const route = getExperimentRoute(experiment.id);
    const isExpanded = expandedExperiment === experiment.id;

    return (
      <div className="bg-white rounded-lg border border-warm-brown/20 hover:border-warm-brown/40 transition-all duration-200">
        {/* Compact Header - Always Visible */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                experiment.status === 'sunset' ? 'bg-gray-500' :
                experiment.status === 'wip' ? 'bg-yellow-500' :
                experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
                experiment.status === 'shipped' ? 'bg-blue-500' :
                'bg-gray-400'
              }`}
            />
            <h3 className={`font-medium text-sm ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
              {experiment.title}
            </h3>
          </div>
          
          <div className="text-xs text-muted-grey mb-2">
            {experiment.timeframe}
          </div>

          <button
            onClick={() => setExpandedExperiment(isExpanded ? null : experiment.id)}
            className="text-xs text-warm-brown hover:text-amber-700 font-medium"
          >
            {isExpanded ? 'Show Less ↑' : 'See More ↓'}
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-warm-brown/10">
            <p className="text-sm text-soft-black leading-relaxed mb-3 mt-3">
              {experiment.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs text-warm-brown font-medium">
                {experiment.collaborators && experiment.collaborators.length > 0
                  ? `Team: ${experiment.collaborators.join(', ')}`
                  : 'Solo'
                }
              </div>

              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {experiment.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {experiment.technologies.length > 3 && (
                    <span className="text-xs px-2 py-0.5 text-muted-grey">
                      +{experiment.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}

              {route && (
                <button
                  onClick={() => setLocation(route)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-medium mt-2"
                >
                  View Details →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CategorySection = ({
    title,
    description,
    icon,
    experiments
  }: {
    title: string;
    description: string;
    icon: string;
    experiments: Experiment[];
  }) => (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <h2 className="text-lg font-medium text-warm-brown mb-1">{title}</h2>
        <p className="text-sm text-muted-grey leading-relaxed">{description}</p>
      </div>

      {/* Experiments List */}
      <div className="space-y-3">
        {experiments.map((experiment) => (
          <ExperimentItem key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-light text-warm-brown mb-3">
          Our Theses
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed text-sm">
          My work is an exploration of three core theses that define the future I want to build.
          Each project is an experiment, a test of a hypothesis about how we can create a more intentional world.
        </p>
      </header>

      <main className={`${isMobile ? 'space-y-8' : 'grid grid-cols-3 gap-8'}`}>
        <CategorySection
          title="The Individual"
          description="Projects empowering individuals to make authentic choices and act with purpose."
          icon="🧠"
          experiments={categorizedExperiments.individual}
        />

        <CategorySection
          title="The Team"
          description="Projects helping groups become more effective and wise together."
          icon="🤝"
          experiments={categorizedExperiments.team}
        />

        <CategorySection
          title="The Community"
          description="Projects fostering a shared sense of time, emotion, and belonging."
          icon="🎵"
          experiments={categorizedExperiments.relationships}
        />
      </main>
    </div>
  );
}
