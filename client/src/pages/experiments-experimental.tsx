
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

  // Folder icon component
  const FolderIcon = ({ experiment, isExpanded }: { experiment: Experiment; isExpanded: boolean }) => {
    const getStatusColor = () => {
      if (experiment.status === 'sunset') return 'text-gray-500';
      if (experiment.status === 'wip') return 'text-yellow-600';
      if (experiment.status === 'shipped' && experiment.isActive) return 'text-green-600';
      if (experiment.status === 'shipped') return 'text-blue-600';
      return 'text-gray-400';
    };

    return (
      <div className={`w-16 h-16 ${getStatusColor()} transition-transform duration-200 ${isExpanded ? 'scale-110' : 'hover:scale-105'}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
          {/* Folder tab */}
          <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" 
                opacity="0.7"/>
          {/* Status indicator dot */}
          <circle cx="18" cy="8" r="2" fill="currentColor" opacity="0.9"/>
        </svg>
      </div>
    );
  };

  const ExperimentFolder = ({ experiment }: { experiment: Experiment }) => {
    const route = getExperimentRoute(experiment.id);
    const isExpanded = expandedExperiment === experiment.id;

    const handleFolderClick = () => {
      if (route) {
        setLocation(route);
      } else {
        setExpandedExperiment(isExpanded ? null : experiment.id);
      }
    };

    return (
      <div className="flex flex-col items-center space-y-2 group">
        {/* Folder Icon */}
        <button
          onClick={handleFolderClick}
          className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-warm-brown/10 transition-all duration-200 cursor-pointer"
        >
          <FolderIcon experiment={experiment} isExpanded={isExpanded} />
          
          {/* Folder Label */}
          <div className="text-center max-w-[100px]">
            <div className={`text-xs font-medium leading-tight ${route ? 'text-amber-700' : 'text-warm-brown'} group-hover:text-amber-800`}>
              {experiment.title}
            </div>
            <div className="text-[10px] text-muted-grey mt-0.5">
              {experiment.timeframe}
            </div>
          </div>
        </button>

        {/* Expanded Details - appears below folder when expanded */}
        {isExpanded && !route && (
          <div className="w-64 bg-white border border-warm-brown/20 rounded-lg p-3 shadow-lg z-10 mt-2">
            <p className="text-xs text-soft-black leading-relaxed mb-2">
              {experiment.description}
            </p>

            <div className="space-y-1">
              <div className="text-[10px] text-warm-brown font-medium">
                {experiment.collaborators && experiment.collaborators.length > 0
                  ? `Team: ${experiment.collaborators.join(', ')}`
                  : 'Solo'
                }
              </div>

              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {experiment.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="text-[9px] px-1.5 py-0.5 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {experiment.technologies.length > 2 && (
                    <span className="text-[9px] px-1.5 py-0.5 text-muted-grey">
                      +{experiment.technologies.length - 2}
                    </span>
                  )}
                </div>
              )}

              <button
                onClick={() => setExpandedExperiment(null)}
                className="text-[10px] text-muted-grey hover:text-warm-brown font-medium mt-1"
              >
                Close ×
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CategoryDesktop = ({
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
    <div className="space-y-6">
      {/* Category Header */}
      <div className="text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <h2 className="text-lg font-medium text-warm-brown mb-1">{title}</h2>
        <p className="text-sm text-muted-grey leading-relaxed">{description}</p>
      </div>

      {/* Desktop-style folder grid */}
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        {experiments.map((experiment) => (
          <ExperimentFolder key={experiment.id} experiment={experiment} />
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
        <CategoryDesktop
          title="The Individual"
          description="Projects empowering individuals to make authentic choices and act with purpose."
          icon="🧠"
          experiments={categorizedExperiments.individual}
        />

        <CategoryDesktop
          title="The Team"
          description="Projects helping groups become more effective and wise together."
          icon="🤝"
          experiments={categorizedExperiments.team}
        />

        <CategoryDesktop
          title="The Community"
          description="Projects fostering a shared sense of time, emotion, and belonging."
          icon="🎵"
          experiments={categorizedExperiments.relationships}
        />
      </main>
    </div>
  );
}
