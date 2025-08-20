
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function ExperimentsExperimental() {
  const [activeView, setActiveView] = useState<'glow' | 'scale' | 'tilt' | 'slide' | 'reveal' | 'wave'>('glow');
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Simple status indicator with correct colors
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div className="flex items-center gap-2">
      <div 
        className={`w-3 h-3 min-w-[12px] min-h-[12px] rounded-full flex-shrink-0 ${
          experiment.status === 'sunset' ? 'bg-gray-500' : 
          experiment.status === 'wip' ? 'bg-yellow-500' : 
          experiment.status === 'shipped' && experiment.isActive ? 'bg-green-500' :
          experiment.status === 'shipped' ? 'bg-blue-500' :
          'bg-gray-400'
        }`} 
      />
      <span className="text-sm capitalize whitespace-nowrap">
        {experiment.status === 'sunset' ? 'Sunset' : 
         experiment.status === 'wip' ? 'Wip' : 
         experiment.status === 'shipped' && experiment.isActive ? 'Active' :
         experiment.status === 'shipped' ? 'Shipped' : 
         experiment.status}
      </span>
    </div>
  );

  // Get team display text - show all collaborators
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
  };

  // Get technologies display
  const getTechnologiesDisplay = (experiment: Experiment) => {
    if (!experiment.technologies || experiment.technologies.length === 0) {
      return '';
    }
    return experiment.technologies.join(', ');
  };

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

  // 1. Glow Effect - Subtle border glow and shadow
  const GlowView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Glow Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        const CardContent = () => (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <StatusDot experiment={experiment} />
              <h3 className={`font-medium text-lg ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                {experiment.title}
              </h3>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-grey">{experiment.timeframe}</span>
              <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
            </div>
            <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
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
        );

        const baseClasses = "w-full bg-light-brown rounded-lg p-4 text-left transition-all duration-300 cursor-pointer border-2 border-transparent";
        const hoverClasses = "hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/20 hover:bg-warm-brown/5";

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
  );

  // 2. Scale Effect - Card grows on hover
  const ScaleView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Scale Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        const CardContent = () => (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <StatusDot experiment={experiment} />
              <h3 className={`font-medium text-lg transition-colors duration-300 ${route ? 'text-amber-700 group-hover:text-amber-800' : 'text-warm-brown'}`}>
                {experiment.title}
              </h3>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-grey">{experiment.timeframe}</span>
              <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
            </div>
            <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {experiment.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium transition-all duration-300 group-hover:bg-amber-200 group-hover:border-amber-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

        const baseClasses = "w-full bg-light-brown rounded-lg p-4 text-left transition-all duration-300 cursor-pointer group transform origin-center";
        const hoverClasses = "hover:scale-105 hover:shadow-xl hover:bg-amber-50";

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
  );

  // 3. Tilt Effect - Card tilts slightly with perspective
  const TiltView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Tilt Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        const CardContent = () => (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <StatusDot experiment={experiment} />
              <h3 className={`font-medium text-lg ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                {experiment.title}
              </h3>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-grey">{experiment.timeframe}</span>
              <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
            </div>
            <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
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
        );

        const baseClasses = "w-full bg-light-brown rounded-lg p-4 text-left transition-all duration-500 cursor-pointer transform-gpu perspective-1000";
        const hoverClasses = "hover:rotate-x-2 hover:rotate-y-1 hover:shadow-2xl hover:shadow-amber-200/30 hover:-translate-y-1";

        return route ? (
          <div key={experiment.id} className="perspective-1000">
            <button
              onClick={() => setLocation(route)}
              className={`${baseClasses} ${hoverClasses}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <CardContent />
            </button>
          </div>
        ) : (
          <div key={experiment.id} className={baseClasses}>
            <CardContent />
          </div>
        );
      })}
    </div>
  );

  // 4. Slide Effect - Content slides in from the side
  const SlideView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Slide Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const baseClasses = "w-full bg-light-brown rounded-lg overflow-hidden cursor-pointer group relative";

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className={baseClasses}
          >
            <div className="p-4 transform transition-transform duration-300 group-hover:translate-x-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <StatusDot experiment={experiment} />
                  <h3 className="font-medium text-lg text-amber-700">
                    {experiment.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-grey">{experiment.timeframe}</span>
                  <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
                </div>
                <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
              </div>
            </div>
            {/* Accent line that appears on hover */}
            <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
          </button>
        ) : (
          <div key={experiment.id} className={baseClasses}>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <StatusDot experiment={experiment} />
                  <h3 className="font-medium text-lg text-warm-brown">
                    {experiment.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-grey">{experiment.timeframe}</span>
                  <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
                </div>
                <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // 5. Reveal Effect - Hidden content reveals on hover
  const RevealView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Reveal Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const baseClasses = "w-full bg-light-brown rounded-lg overflow-hidden cursor-pointer group relative h-24 hover:h-auto transition-all duration-500";

        const CardContent = () => (
          <>
            {/* Always visible content */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <StatusDot experiment={experiment} />
                <h3 className={`font-medium text-lg ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                  {experiment.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-grey">{experiment.timeframe}</span>
                <span className="text-warm-brown font-medium">{getTeamDisplay(experiment)}</span>
              </div>
            </div>
            
            {/* Hidden content that reveals on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4 pb-4">
              <p className="text-sm text-soft-black leading-relaxed mb-3">{experiment.description}</p>
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
          </>
        );

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className={`${baseClasses} text-left`}
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
  );

  // 6. Wave Effect - Animated gradient wave on hover
  const WaveView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-brown mb-4">Wave Effect</h3>
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const baseClasses = "w-full bg-light-brown rounded-lg p-4 text-left cursor-pointer group relative overflow-hidden";

        const CardContent = () => (
          <>
            {/* Animated wave background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.1), transparent)',
                  transform: 'translateX(-100%)',
                  animation: 'wave 2s infinite linear'
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <StatusDot experiment={experiment} />
                <h3 className={`font-medium text-lg transition-all duration-300 ${route ? 'text-amber-700 group-hover:text-amber-800' : 'text-warm-brown group-hover:text-warm-brown/80'}`}>
                  {experiment.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-grey group-hover:text-muted-grey/80 transition-colors duration-300">{experiment.timeframe}</span>
                <span className="text-warm-brown font-medium group-hover:text-amber-700 transition-colors duration-300">{getTeamDisplay(experiment)}</span>
              </div>
              <p className="text-sm text-soft-black leading-relaxed group-hover:text-soft-black/80 transition-colors duration-300">{experiment.description}</p>
              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {experiment.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2.5 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium transition-all duration-300 group-hover:bg-amber-200/50 group-hover:border-amber-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        );

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className={baseClasses}
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
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Hover Interaction Patterns
        </h1>
        <p className="text-muted-grey mb-6">Different visual feedback approaches for experiment cards</p>
        
        {/* Interaction Toggle */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {[
            { key: 'glow', label: 'Glow' },
            { key: 'scale', label: 'Scale' },
            { key: 'tilt', label: 'Tilt' },
            { key: 'slide', label: 'Slide' },
            { key: 'reveal', label: 'Reveal' },
            { key: 'wave', label: 'Wave' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveView(key as any)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
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
        {activeView === 'glow' && <GlowView />}
        {activeView === 'scale' && <ScaleView />}
        {activeView === 'tilt' && <TiltView />}
        {activeView === 'slide' && <SlideView />}
        {activeView === 'reveal' && <RevealView />}
        {activeView === 'wave' && <WaveView />}
      </main>

      {/* Custom styles for advanced effects */}
      <style>{`
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
