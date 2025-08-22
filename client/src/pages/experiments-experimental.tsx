import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function ExperimentsExperimental() {
  const [, setLocation] = useLocation();
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

  const CategorySection = ({
    title,
    description,
    icon,
    experiments,
    bgColor
  }: {
    title: string;
    description: string;
    icon: string;
    experiments: Experiment[];
    bgColor: string;
  }) => (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">{icon}</div>
        <h2 className="text-2xl font-medium text-warm-brown mb-2">{title}</h2>
        <p className="text-muted-grey max-w-md mx-auto">{description}</p>
      </div>

      <div className="space-y-4">
        {experiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);

          const CardContent = () => (
            <div className={`${bgColor} rounded-lg p-6 transition-all duration-300 hover:shadow-md`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      experiment.status === 'sunset' ? 'bg-gray-500' :
                      experiment.status === 'wip' ? 'bg-yellow-500' :
                      experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
                      experiment.status === 'shipped' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}
                  />
                  <h3 className={`text-xl font-medium ${route ? 'text-amber-700 hover:text-amber-800' : 'text-warm-brown'} transition-colors`}>
                    {experiment.title}
                  </h3>
                </div>
                <span className="text-sm text-muted-grey">{experiment.timeframe}</span>
              </div>

              <p className="text-soft-black leading-relaxed mb-4">
                {experiment.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-warm-brown font-medium">
                  {experiment.collaborators && experiment.collaborators.length > 0
                    ? `Team: ${experiment.collaborators.join(', ')}`
                    : 'Solo'
                  }
                </div>

                {route && (
                  <span className="text-sm text-amber-700 font-medium">
                    View Details →
                  </span>
                )}
              </div>

              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {experiment.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {experiment.technologies.length > 4 && (
                    <span className="text-xs px-2.5 py-1 text-muted-grey">
                      +{experiment.technologies.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="w-full text-left group"
            >
              <CardContent />
            </button>
          ) : (
            <div key={experiment.id}>
              <CardContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Our Theses
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed">
          My work is an exploration of three core theses that define the future I want to build.
          Each project is an experiment, a test of a hypothesis about how we can create a more intentional world.
        </p>
      </header>

      <main className="space-y-16">
        <CategorySection
          title="The Individual"
          description="Projects empowering individuals to make authentic choices and act with purpose."
          icon="🧠"
          experiments={categorizedExperiments.individual}
          bgColor="bg-blue-50"
        />

        <CategorySection
          title="The Team"
          description="Projects helping groups become more effective and wise together."
          icon="🤝"
          experiments={categorizedExperiments.team}
          bgColor="bg-amber-50"
        />

        <CategorySection
          title="The Community"
          description="Projects fostering a shared sense of time, emotion, and belonging."
          icon="🎵"
          experiments={categorizedExperiments.relationships}
          bgColor="bg-purple-50"
        />
      </main>
    </div>
  );
}