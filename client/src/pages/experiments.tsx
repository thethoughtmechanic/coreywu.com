import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<string>>(new Set());
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
         experiment.status === 'wip' ? 'WIP' : 
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

  // Get category icon for experiment
  const getCategoryIcon = (experimentId: string) => {
    // Heart: boyfriend material, mister misu, friday home, lew + wu
    if (['boyfriend-material-1', 'mister-misu-1', 'friday-home-1', 'lew-wu-1'].includes(experimentId)) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <defs>
            <pattern id={`redSketch-${experimentId}`} patternUnits="userSpaceOnUse" width="2" height="2">
              <rect width="2" height="2" fill="#dc2626"/>
              <path d="M0,0.5 L2,0.5" stroke="#fecaca" strokeWidth="0.3" opacity="0.8"/>
              <path d="M0,1.5 L2,1.5" stroke="#fca5a5" strokeWidth="0.3" opacity="0.6"/>
              <path d="M0.5,0 L0.5,2" stroke="#f87171" strokeWidth="0.3" opacity="0.7"/>
              <path d="M1.5,0 L1.5,2" stroke="#ef4444" strokeWidth="0.3" opacity="0.9"/>
              <circle cx="0.5" cy="0.5" r="0.1" fill="#fee2e2" opacity="0.8"/>
              <circle cx="1.5" cy="1.5" r="0.1" fill="#fef2f2" opacity="0.6"/>
            </pattern>
          </defs>
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill={`url(#redSketch-${experimentId})`} stroke="#dc2626" strokeWidth="0.5"/>
        </svg>
      );
    }
    
    // Gear: prompt pulse
    if (experimentId === 'prompt-pulse-1') {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <defs>
            <pattern id={`yellowSketch-${experimentId}`} patternUnits="userSpaceOnUse" width="2" height="2">
              <rect width="2" height="2" fill="#ca8a04"/>
              <path d="M0.2,0.2 L1.8,1.8" stroke="#fef3c7" strokeWidth="0.3" opacity="0.8"/>
              <path d="M0.2,1.8 L1.8,0.2" stroke="#fde68a" strokeWidth="0.3" opacity="0.7"/>
              <path d="M0,1 L2,1" stroke="#facc15" strokeWidth="0.3" opacity="0.6"/>
              <path d="M1,0 L1,2" stroke="#eab308" strokeWidth="0.3" opacity="0.9"/>
              <circle cx="0.3" cy="0.3" r="0.15" fill="#fffbeb" opacity="0.7"/>
              <circle cx="1.7" cy="1.7" r="0.1" fill="#fefce8" opacity="0.8"/>
              <rect x="0.8" y="0.8" width="0.4" height="0.4" fill="#fbbf24" opacity="0.5"/>
            </pattern>
          </defs>
          <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" fill={`url(#yellowSketch-${experimentId})`} stroke="#ca8a04" strokeWidth="0.5"/>
          <circle cx="12" cy="12" r="3" fill={`url(#yellowSketch-${experimentId})`} stroke="#d97706" strokeWidth="0.5"/>
        </svg>
      );
    }
    
    // Handshake: food for thought
    if (experimentId === 'food-for-thought-1') {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <defs>
            <pattern id={`purpleSketch-${experimentId}`} patternUnits="userSpaceOnUse" width="2" height="2">
              <rect width="2" height="2" fill="#7c3aed"/>
              <circle cx="0.5" cy="0.5" r="0.2" fill="#f3e8ff" opacity="0.8"/>
              <circle cx="1.5" cy="1.5" r="0.15" fill="#e9d5ff" opacity="0.7"/>
              <path d="M0,0.5 L2,0.5" stroke="#ddd6fe" strokeWidth="0.3" opacity="0.6"/>
              <path d="M0,1.5 L2,1.5" stroke="#c4b5fd" strokeWidth="0.3" opacity="0.8"/>
              <path d="M0.5,0 L0.5,2" stroke="#a78bfa" strokeWidth="0.3" opacity="0.7"/>
              <path d="M1.5,0 L1.5,2" stroke="#8b5cf6" strokeWidth="0.3" opacity="0.9"/>
              <path d="M0,0 L2,2" stroke="#a855f7" strokeWidth="0.2" opacity="0.5"/>
              <path d="M2,0 L0,2" stroke="#9333ea" strokeWidth="0.2" opacity="0.4"/>
            </pattern>
          </defs>
          <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" fill={`url(#purpleSketch-${experimentId})`} stroke="#7c3aed" strokeWidth="0.5"/>
        </svg>
      );
    }
    
    return null;
  };

  // Helper function to get the route for each experiment
  // Only Mister Misu, Friday Home, and Boyfriend Material are currently linked for viewers
  const getExperimentRoute = (experimentId: string) => {
    const routeMap: { [key: string]: string } = {
      'mister-misu-1': '/experiments/mistermisu',
      'friday-home-1': '/experiments/fridayhome',
      'boyfriend-material-1': '/experiments/boyfriendmaterial'
      // Other routes disabled for viewers but still accessible via direct URL:
      // 'prompt-pulse-1': '/experiments/promptpulse',
      // 'food-for-thought-1': '/experiments/foodforthought',
      // 'lew-wu-1': '/experiments/lewwu'
    };
    return routeMap[experimentId] || null;
  };

  // Toggle card expansion
  const toggleCardExpansion = (experimentId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(experimentId)) {
      newExpanded.delete(experimentId);
    } else {
      newExpanded.add(experimentId);
    }
    setExpandedCards(newExpanded);
  };

  // Order experiments by date (descending order - most recent first)
  const orderedExperiments = [...experiments].sort((a, b) => {
    // Extract year from timeframe for sorting (e.g., "2025 - Present" -> 2025)
    const getYear = (timeframe: string) => {
      const match = timeframe.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };

    const yearA = getYear(a.timeframe || '');
    const yearB = getYear(b.timeframe || '');

    return yearB - yearA; // Descending order
  });

  // Desktop Table View
  const DesktopView = () => (
    <div className="bg-light-brown rounded-lg overflow-hidden">
      <div className="px-6 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-warm-brown">
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Project</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Technologies</div>
          <div className="col-span-2">Timeline</div>
          <div className="col-span-1">Team</div>
        </div>
      </div>
      <div className="divide-y divide-warm-brown/10">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);
          const RowContent = () => (
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-2">
                <StatusDot experiment={experiment} />
              </div>
              <div className="col-span-2">
                <h3 className={`text-xl font-bold ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                  {experiment.title}
                </h3>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-soft-black">{experiment.description}</p>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-grey">
                  {getTechnologiesDisplay(experiment)}
                </div>
              </div>
              <div className="col-span-2 text-sm text-muted-grey">
                {experiment.timeframe}
              </div>
              <div className="col-span-1 text-sm text-muted-grey">
                {getTeamDisplay(experiment)}
              </div>
            </div>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="w-full px-6 py-4 text-left hover:bg-warm-brown/5 transition-colors duration-200 cursor-pointer"
              data-testid={`button-${experiment.id}-desktop`}
            >
              <RowContent />
            </button>
          ) : (
            <div key={experiment.id} className="px-6 py-4">
              <RowContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  // Status pill component
  const StatusPill = ({ status, isActive }: { status: string, isActive?: boolean }) => {
    const getStatusText = () => {
      if (status === 'sunset') return 'Sunset';
      if (status === 'wip') return 'WIP';
      if (status === 'shipped' && isActive) return 'Active';
      if (status === 'shipped') return 'Shipped';
      return status;
    };

    const getStatusColor = () => {
      if (status === 'sunset') return 'border-gray-400 text-gray-600 hover:bg-gray-100';
      if (status === 'wip') return 'border-yellow-500 text-yellow-700 hover:bg-yellow-100';
      if (status === 'shipped' && isActive) return 'border-green-500 text-green-700 hover:bg-green-100';
      if (status === 'shipped') return 'border-blue-500 text-blue-700 hover:bg-blue-100';
      return 'border-gray-400 text-gray-600 hover:bg-gray-100';
    };

    return (
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border-2 transition-colors duration-200 ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    );
  };

  // Mobile Overview Section
  const MobileOverview = () => (
    <div className="mb-8 pb-6 border-b border-warm-brown/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-warm-brown mb-3">
          Building Better Things
        </h2>
        <p className="text-soft-black/80 leading-relaxed text-sm max-w-md mx-auto">
          Each project is an experiment in making the world a little more intentional, 
          meaningful, and human. From AI tools to coffee experiences to music.
        </p>
      </div>
      
      <div className="flex justify-center items-center gap-6 mb-4">
        <div className="flex flex-col items-center gap-1 text-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <defs>
              <pattern id="redSketch" patternUnits="userSpaceOnUse" width="2" height="2">
                <rect width="2" height="2" fill="#dc2626"/>
                <path d="M0,0.5 L2,0.5" stroke="#fecaca" strokeWidth="0.3" opacity="0.8"/>
                <path d="M0,1.5 L2,1.5" stroke="#fca5a5" strokeWidth="0.3" opacity="0.6"/>
                <path d="M0.5,0 L0.5,2" stroke="#f87171" strokeWidth="0.3" opacity="0.7"/>
                <path d="M1.5,0 L1.5,2" stroke="#ef4444" strokeWidth="0.3" opacity="0.9"/>
                <circle cx="0.5" cy="0.5" r="0.1" fill="#fee2e2" opacity="0.8"/>
                <circle cx="1.5" cy="1.5" r="0.1" fill="#fef2f2" opacity="0.6"/>
              </pattern>
            </defs>
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill="url(#redSketch)" stroke="#dc2626" strokeWidth="0.5"/>
          </svg>
          <span className="text-muted-grey">Connect</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <defs>
              <pattern id="yellowSketch" patternUnits="userSpaceOnUse" width="2" height="2">
                <rect width="2" height="2" fill="#ca8a04"/>
                <path d="M0.2,0.2 L1.8,1.8" stroke="#fef3c7" strokeWidth="0.3" opacity="0.8"/>
                <path d="M0.2,1.8 L1.8,0.2" stroke="#fde68a" strokeWidth="0.3" opacity="0.7"/>
                <path d="M0,1 L2,1" stroke="#facc15" strokeWidth="0.3" opacity="0.6"/>
                <path d="M1,0 L1,2" stroke="#eab308" strokeWidth="0.3" opacity="0.9"/>
                <circle cx="0.3" cy="0.3" r="0.15" fill="#fffbeb" opacity="0.7"/>
                <circle cx="1.7" cy="1.7" r="0.1" fill="#fefce8" opacity="0.8"/>
                <rect x="0.8" y="0.8" width="0.4" height="0.4" fill="#fbbf24" opacity="0.5"/>
              </pattern>
            </defs>
            <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" fill="url(#yellowSketch)" stroke="#ca8a04" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="3" fill="url(#yellowSketch)" stroke="#d97706" strokeWidth="0.5"/>
          </svg>
          <span className="text-muted-grey">Optimize</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <defs>
              <pattern id="purpleSketch" patternUnits="userSpaceOnUse" width="2" height="2">
                <rect width="2" height="2" fill="#7c3aed"/>
                <circle cx="0.5" cy="0.5" r="0.2" fill="#f3e8ff" opacity="0.8"/>
                <circle cx="1.5" cy="1.5" r="0.15" fill="#e9d5ff" opacity="0.7"/>
                <path d="M0,0.5 L2,0.5" stroke="#ddd6fe" strokeWidth="0.3" opacity="0.6"/>
                <path d="M0,1.5 L2,1.5" stroke="#c4b5fd" strokeWidth="0.3" opacity="0.8"/>
                <path d="M0.5,0 L0.5,2" stroke="#a78bfa" strokeWidth="0.3" opacity="0.7"/>
                <path d="M1.5,0 L1.5,2" stroke="#8b5cf6" strokeWidth="0.3" opacity="0.9"/>
                <path d="M0,0 L2,2" stroke="#a855f7" strokeWidth="0.2" opacity="0.5"/>
                <path d="M2,0 L0,2" stroke="#9333ea" strokeWidth="0.2" opacity="0.4"/>
              </pattern>
            </defs>
            <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" fill="url(#purpleSketch)" stroke="#7c3aed" strokeWidth="0.5"/>
          </svg>
          <span className="text-muted-grey">Coordinate</span>
        </div>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center gap-1 text-xs text-muted-grey animate-bounce">
          <span>Scroll to explore</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-4">
      <MobileOverview />
      {orderedExperiments.map((experiment) => {
        const route = getExperimentRoute(experiment.id);
        
        const CardContent = () => (
          <div className="space-y-3">
            {/* Title and Status Pill Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl font-bold ${route ? 'text-amber-700' : 'text-warm-brown'}`}>
                  {experiment.title}
                </h3>
                <StatusPill status={experiment.status || 'unknown'} isActive={experiment.isActive} />
              </div>
              {getCategoryIcon(experiment.id)}
            </div>

            {/* Timeframe and Team on one line */}
            <div className="text-sm text-gray-400">
              {experiment.timeframe} | {experiment.collaborators && experiment.collaborators.length > 0
                ? experiment.collaborators.join(', ')
                : 'Solo'
              }
            </div>

            {/* Description */}
            <p className="text-sm text-soft-black leading-relaxed">
              {experiment.description}
            </p>

            {/* Technologies - max 2 lines, smaller pills */}
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(expandedTech.has(experiment.id) 
                  ? experiment.technologies 
                  : experiment.technologies.slice(0, 6)
                ).map((tech, index) => (
                  <span 
                    key={index}
                    className="text-[10px] px-1.5 py-0.5 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {experiment.technologies.length > 6 && !expandedTech.has(experiment.id) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      const newExpanded = new Set(expandedTech);
                      newExpanded.add(experiment.id);
                      setExpandedTech(newExpanded);
                    }}
                    className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    +{experiment.technologies.length - 6} More
                  </span>
                )}
                {expandedTech.has(experiment.id) && experiment.technologies.length > 6 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      const newExpanded = new Set(expandedTech);
                      newExpanded.delete(experiment.id);
                      setExpandedTech(newExpanded);
                    }}
                    className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Show Less
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
            className="w-full bg-light-brown rounded-lg p-6 text-left hover:bg-warm-brown/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-warm-brown/10 hover:border-warm-brown/20"
            data-testid={`button-${experiment.id}-mobile`}
          >
            <CardContent />
          </button>
        ) : (
          <div key={experiment.id} className="bg-light-brown rounded-lg p-6 shadow-sm border border-warm-brown/10">
            <CardContent />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        {isMobile ? <MobileView /> : <DesktopView />}
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