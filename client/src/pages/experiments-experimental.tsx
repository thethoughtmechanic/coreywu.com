import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function ExperimentsExperimental() {
  const [activeView, setActiveView] = useState<'cards-with-pills' | 'mobile-style'>('cards-with-pills');
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

  // Get team display text - show all collaborators
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
  };

  // 1. Cards with Pills (like thoughts page)
  const CardsWithPillsView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Cards with Status Pills (Thoughts-style)</h3>
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);

          const CardContent = () => (
            <article className="bg-light-brown rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full">
              <div className={`bg-gradient-to-br ${experiment.imageGradient} h-48 relative overflow-hidden`}>
                {/* Paint splatter background that appears on hover */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out rounded-2xl overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: experiment.status === 'sunset' ? `
                        radial-gradient(ellipse 60% 45% at 25% 15%, #06b6d4 0%, #06b6d4 55%, transparent 95%),
                        radial-gradient(ellipse 55% 40% at 75% 25%, #3b82f6 0%, #3b82f6 50%, transparent 90%),
                        radial-gradient(ellipse 50% 55% at 15% 80%, #0891b2 0%, #0891b2 60%, transparent 100%),
                        radial-gradient(ellipse 55% 35% at 85% 90%, #6366f1 0%, #6366f1 45%, transparent 85%),
                        radial-gradient(ellipse 45% 50% at 50% 60%, #1e40af 0%, #1e40af 50%, transparent 90%)
                      ` : experiment.status === 'wip' ? `
                        radial-gradient(ellipse 60% 45% at 25% 15%, #f59e0b 0%, #f59e0b 55%, transparent 95%),
                        radial-gradient(ellipse 55% 40% at 75% 25%, #dc2626 0%, #dc2626 50%, transparent 90%),
                        radial-gradient(ellipse 50% 55% at 15% 80%, #ea580c 0%, #ea580c 60%, transparent 100%),
                        radial-gradient(ellipse 55% 35% at 85% 90%, #facc15 0%, #facc15 45%, transparent 85%),
                        radial-gradient(ellipse 45% 50% at 50% 60%, #ef4444 0%, #ef4444 50%, transparent 90%)
                      ` : `
                        radial-gradient(ellipse 60% 45% at 25% 15%, #06b6d4 0%, #06b6d4 55%, transparent 95%),
                        radial-gradient(ellipse 55% 40% at 75% 25%, #0891b2 0%, #0891b2 50%, transparent 90%),
                        radial-gradient(ellipse 50% 55% at 15% 80%, #0e7490 0%, #0e7490 60%, transparent 100%),
                        radial-gradient(ellipse 55% 35% at 85% 90%, #22d3ee 0%, #22d3ee 45%, transparent 85%),
                        radial-gradient(ellipse 45% 50% at 50% 60%, #0284c7 0%, #0284c7 50%, transparent 90%)
                      `,
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
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
                          radial-gradient(ellipse 60% 80% at 20% 75%, #374151 0%, #374151 60%, transparent 100%)
                        ` : experiment.status === 'wip' ? `
                          radial-gradient(ellipse 80% 60% at 30% 20%, #f59e0b 0%, #f59e0b 40%, transparent 80%),
                          radial-gradient(ellipse 70% 50% at 70% 30%, #dc2626 0%, #dc2626 50%, transparent 90%),
                          radial-gradient(ellipse 60% 80% at 20% 75%, #ea580c 0%, #ea580c 60%, transparent 100%)
                        ` : experiment.status === 'shipped' && experiment.isActive ? `
                          radial-gradient(ellipse 80% 60% at 30% 20%, #10b981 0%, #10b981 40%, transparent 80%),
                          radial-gradient(ellipse 70% 50% at 70% 30%, #059669 0%, #059669 50%, transparent 90%),
                          radial-gradient(ellipse 60% 80% at 20% 75%, #047857 0%, #047857 60%, transparent 100%)
                        ` : `
                          radial-gradient(ellipse 80% 60% at 30% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                          radial-gradient(ellipse 70% 50% at 70% 30%, #2563eb 0%, #2563eb 50%, transparent 90%),
                          radial-gradient(ellipse 60% 80% at 20% 75%, #1d4ed8 0%, #1d4ed8 60%, transparent 100%)
                        `,
                        transform: 'scale(3) rotate(25deg)'
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

                  <span className="text-xs text-muted-grey">{experiment.timeframe}</span>
                </div>

                <h3 className={`font-light text-warm-brown mb-3 leading-tight text-xl group-hover:text-hover-brown transition-colors duration-200 ${route ? 'cursor-pointer' : ''}`}>
                  {experiment.title}
                </h3>

                <p className="text-soft-black/80 leading-relaxed mb-4 text-sm flex-grow">
                  {experiment.description}
                </p>

                <div className="space-y-3">
                  <div className="text-xs text-warm-brown font-medium">
                    Team: {getTeamDisplay(experiment)}
                  </div>

                  {experiment.technologies && experiment.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {experiment.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="text-left group/card"
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
    </div>
  );

  // 2. Mobile-style view for all screen sizes
  const MobileStyleView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Mobile-style Layout (All Devices)</h3>

      {/* Legend */}
      <div className="bg-light-brown rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-warm-brown mb-3">Status Legend:</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>WIP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>Sunset</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);

          const CardContent = () => (
            <div className="space-y-3">
              {/* Row 1: Status dot + Project title */}
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className={`w-3 h-3 min-w-[12px] min-h-[12px] rounded-full flex-shrink-0 ${
                    experiment.status === 'sunset' ? 'bg-gray-500' : 
                    experiment.status === 'wip' ? 'bg-yellow-500' : 
                    experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
                    experiment.status === 'shipped' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`} 
                />
                <h3 className={`font-medium text-lg ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                  {experiment.title}
                </h3>
              </div>

              {/* Row 2: Date and collaborator */}
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-grey">{experiment.timeframe}</span>
                <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
              </div>

              {/* Technologies */}
              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {experiment.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );

          const baseClasses = "w-full bg-light-brown rounded-lg p-4 text-left transition-all duration-300 cursor-pointer";
          const hoverClasses = route ? "hover:bg-amber-50 hover:shadow-md hover:border hover:border-amber-200" : "";

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className={`${baseClasses} ${hoverClasses}`}
            >
              <CardContent />
            </button>
          ) : (
            <div key={experiment.id} className={baseClasses}>
              <CardContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Experiments Layout Testing
        </h1>
        <p className="text-muted-grey mb-6">Two different approaches to experiment card layouts</p>

        {/* Layout Toggle */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {[
            { key: 'cards-with-pills', label: 'Cards with Pills' },
            { key: 'mobile-style', label: 'Mobile Style' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveView(key as any)}
              className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                activeView === key 
                  ? 'bg-warm-brown text-cream' 
                  : 'bg-light-brown text-warm-brown hover:bg-warm-brown/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main>
        {activeView === 'cards-with-pills' && <CardsWithPillsView />}
        {activeView === 'mobile-style' && <MobileStyleView />}
      </main>
    </div>
  );
}