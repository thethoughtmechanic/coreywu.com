import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
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
              <rect width="2" height="2" fill="#ec4899"/>
              <path d="M0,0.5 L2,0.5" stroke="#fce7f3" strokeWidth="0.3" opacity="0.8"/>
              <path d="M0,1.5 L2,1.5" stroke="#fbcfe8" strokeWidth="0.3" opacity="0.6"/>
              <path d="M0.5,0 L0.5,2" stroke="#f9a8d4" strokeWidth="0.3" opacity="0.7"/>
              <path d="M1.5,0 L1.5,2" stroke="#f472b6" strokeWidth="0.3" opacity="0.9"/>
              <circle cx="0.5" cy="0.5" r="0.1" fill="#fdf2f8" opacity="0.8"/>
              <circle cx="1.5" cy="1.5" r="0.1" fill="#fef7f3" opacity="0.6"/>
            </pattern>
          </defs>
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill={`url(#redSketch-${experimentId})`} stroke="#ec4899" strokeWidth="0.5"/>
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

  

  // Desktop Card View (3 columns)
  const DesktopView = () => (
    <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
      <div className="grid grid-cols-3 gap-6 items-start">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);

          const CardContent = () => (
            <div className="space-y-4">
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

              {/* Technologies */}
              {experiment.technologies && experiment.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {experiment.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-[10px] px-1.5 py-0.5 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );

          return route ? (
            <button
              key={experiment.id}
              onClick={() => setLocation(route)}
              className="w-full bg-white rounded-lg p-6 text-left hover:bg-warm-brown/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-warm-brown/10 hover:border-warm-brown/20 h-fit"
              data-testid={`button-${experiment.id}-desktop`}
            >
              <CardContent />
            </button>
          ) : (
            <div key={experiment.id} className="bg-white rounded-lg p-6 shadow-sm border border-warm-brown/10 h-fit">
              <CardContent />
            </div>
          );
        })}
      </div>
    </div>
  );

  // Status pill component
  const StatusPill = ({ status, isActive }: { status: string; isActive?: boolean }) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'sunset':
          return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Sunset' };
        case 'wip':
          return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'WIP' };
        case 'shipped':
          return isActive 
            ? { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' }
            : { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Shipped' };
        default:
          return { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
      }
    };

    const config = getStatusConfig();

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} relative overflow-hidden group transition-all duration-300`}>
        {/* Paint Splatter Background - appears on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background: status === 'sunset' ? `
              linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #0891b2 50%, #6366f1 75%, #1e40af 100%),
              radial-gradient(ellipse 80% 60% at 25% 25%, #06b6d4 0%, #3b82f6 40%, rgba(59, 130, 246, 0.8) 80%),
              radial-gradient(ellipse 70% 50% at 75% 20%, #0891b2 0%, #6366f1 50%, rgba(99, 102, 241, 0.7) 90%),
              radial-gradient(ellipse 60% 80% at 5% 90%, #3b82f6 0%, #1e40af 60%, rgba(30, 64, 175, 0.6) 100%),
              radial-gradient(ellipse 85% 40% at 95% 75%, #6366f1 0%, #06b6d4 70%, rgba(6, 182, 212, 0.5) 100%)
            ` : status === 'wip' ? `
              linear-gradient(135deg, #f59e0b 0%, #dc2626 25%, #ea580c 50%, #facc15 75%, #ef4444 100%),
              radial-gradient(ellipse 80% 60% at 30% 20%, #f59e0b 0%, #dc2626 40%, rgba(220, 38, 38, 0.8) 80%),
              radial-gradient(ellipse 70% 50% at 70% 30%, #ea580c 0%, #facc15 50%, rgba(250, 204, 21, 0.7) 90%),
              radial-gradient(ellipse 60% 80% at 20% 75%, #dc2626 0%, #ef4444 60%, rgba(239, 68, 68, 0.6) 100%),
              radial-gradient(ellipse 85% 40% at 80% 85%, #facc15 0%, #f59e0b 70%, rgba(245, 158, 11, 0.5) 100%)
            ` : `
              linear-gradient(135deg, #06b6d4 0%, #0891b2 25%, #0e7490 50%, #22d3ee 75%, #0284c7 100%),
              radial-gradient(ellipse 80% 60% at 35% 25%, #06b6d4 0%, #0891b2 40%, rgba(8, 145, 178, 0.8) 80%),
              radial-gradient(ellipse 70% 50% at 65% 35%, #0e7490 0%, #22d3ee 50%, rgba(34, 211, 238, 0.7) 90%),
              radial-gradient(ellipse 60% 80% at 25% 80%, #0891b2 0%, #0284c7 60%, rgba(2, 132, 199, 0.6) 100%),
              radial-gradient(ellipse 85% 40% at 75% 90%, #22d3ee 0%, #06b6d4 70%, rgba(6, 182, 212, 0.5) 100%)
            `,
            transform: 'scale(2.0) rotate(15deg)'
          }}
        />

        {/* Text with relative positioning for hover effect */}
        <span className="relative z-10 group-hover:text-white group-hover:font-semibold transition-all duration-500">
          {config.label}
        </span>
      </span>
    );
  };

  

  // Mobile Card View
  const MobileView = () => (
    <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
      <div className="space-y-4">
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

            {/* Technologies */}
            {experiment.technologies && experiment.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {experiment.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-[10px] px-1.5 py-0.5 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

        return route ? (
          <button
            key={experiment.id}
            onClick={() => setLocation(route)}
            className="w-full bg-white rounded-lg p-6 text-left hover:bg-warm-brown/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-warm-brown/10 hover:border-warm-brown/20"
            data-testid={`button-${experiment.id}-mobile`}
          >
            <CardContent />
          </button>
        ) : (
          <div key={experiment.id} className="bg-white rounded-lg p-6 shadow-sm border border-warm-brown/10">
            <CardContent />
          </div>
        );
      })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        {/* Title */}
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-experiments-title">
          Experiments
        </h1>

        {/* Description */}
        <p className="text-muted-grey max-w-xl mx-auto mb-8">
          Projects that aim to make the world more meaningful, intentional, and human.
        </p>

        {/* Legend */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-6 bg-light-brown/50 rounded-xl px-6 py-3 text-sm">
            {/* Connect Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <pattern id="pinkSketch-legend" patternUnits="userSpaceOnUse" width="2" height="2">
                    <rect width="2" height="2" fill="#ec4899"/>
                    <path d="M0,0.5 L2,0.5" stroke="#fce7f3" strokeWidth="0.3" opacity="0.8"/>
                    <path d="M0,1.5 L2,1.5" stroke="#fbcfe8" strokeWidth="0.3" opacity="0.6"/>
                    <path d="M0.5,0 L0.5,2" stroke="#f9a8d4" strokeWidth="0.3" opacity="0.7"/>
                    <path d="M1.5,0 L1.5,2" stroke="#f472b6" strokeWidth="0.3" opacity="0.9"/>
                    <circle cx="0.5" cy="0.5" r="0.1" fill="#fdf2f8" opacity="0.8"/>
                    <circle cx="1.5" cy="1.5" r="0.1" fill="#fef7f3" opacity="0.6"/>
                  </pattern>
                </defs>
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill="url(#pinkSketch-legend)" stroke="#ec4899" strokeWidth="0.5"/>
              </svg>
              <span className="text-warm-brown font-medium">Connect</span>
            </div>

            {/* Optimize Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <pattern id="yellowSketch-legend" patternUnits="userSpaceOnUse" width="2" height="2">
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
                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" fill="url(#yellowSketch-legend)" stroke="#ca8a04" strokeWidth="0.5"/>
                <circle cx="12" cy="12" r="3" fill="url(#yellowSketch-legend)" stroke="#d97706" strokeWidth="0.5"/>
              </svg>
              <span className="text-warm-brown font-medium">Optimize</span>
            </div>

            {/* Coordinate Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <pattern id="purpleSketch-legend" patternUnits="userSpaceOnUse" width="2" height="2">
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
                <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" fill="url(#purpleSketch-legend)" stroke="#7c3aed" strokeWidth="0.5"/>
              </svg>
              <span className="text-warm-brown font-medium">Coordinate</span>
            </div>
          </div>
        </div>
      </header>

      {/* Experiments Content */}
      <div>
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>

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