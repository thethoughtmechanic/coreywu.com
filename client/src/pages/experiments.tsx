import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import CopyEmail from "@/components/copy-email";
import { cn } from "@/lib/utils";
import { experimentContentMap } from "@/data/experiment-content";
import { ImageGallery } from "@/components/image-gallery";

export default function Experiments() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

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

  // Auto-select first experiment on desktop load
  useEffect(() => {
    if (!isMobile && orderedExperiments.length > 0 && !selectedExperimentId) {
      setSelectedExperimentId(orderedExperiments[0].id);
    }
  }, [isMobile, orderedExperiments.length]);

  // Reset image and audio state when experiment changes
  useEffect(() => {
    setExpandedImage(null);
    setCurrentTrack(0);
    setIsPlaying(false);
    setShouldAutoPlay(false);
  }, [selectedExperimentId]);

  // Get category for experiment (Connect/Optimize/Coordinate)
  const getExperimentCategory = (experimentId: string): string | null => {
    if (['boyfriend-material-1', 'mister-misu-1', 'friday-home-1', 'lew-wu-1'].includes(experimentId)) {
      return 'Connect';
    }
    if (experimentId === 'prompt-pulse-1') {
      return 'Optimize';
    }
    if (experimentId === 'food-for-thought-1') {
      return 'Coordinate';
    }
    return null;
  };

  // Get category icon for experiment (used in detail panel only)
  const getCategoryIcon = (experimentId: string) => {
    if (['boyfriend-material-1', 'mister-misu-1', 'friday-home-1', 'lew-wu-1'].includes(experimentId)) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
    if (experimentId === 'prompt-pulse-1') {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
    if (experimentId === 'food-for-thought-1') {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
  const getExperimentRoute = (experimentId: string) => {
    const routeMap: { [key: string]: string } = {
      'mister-misu-1': '/experiments/mistermisu',
      'friday-home-1': '/experiments/fridayhome',
      'boyfriend-material-1': '/experiments/boyfriendmaterial'
    };
    return routeMap[experimentId] || null;
  };

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Status dot component for log view
  const StatusDot = ({ status, isActive }: { status: string; isActive?: boolean }) => {
    const getStatusColor = () => {
      if (status === 'sunset') return 'bg-gray-500';
      if (status === 'wip') return 'bg-yellow-500';
      if (status === 'shipped' && isActive) return 'bg-green-500';
      if (status === 'shipped') return 'bg-blue-500';
      return 'bg-gray-400';
    };
    return <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />;
  };

  // Get status label
  const getStatusLabel = (status: string, isActive?: boolean) => {
    if (status === 'sunset') return 'Sunset';
    if (status === 'wip') return 'WIP';
    if (status === 'shipped' && isActive) return 'Active';
    if (status === 'shipped') return 'Shipped';
    return status;
  };

  // Left Panel - Experiment Log
  const ExperimentLog = () => {
    const handleExperimentClick = (experimentId: string) => {
      if (isMobile) {
        const route = getExperimentRoute(experimentId);
        if (route) {
          setLocation(route);
        }
      } else {
        setSelectedExperimentId(experimentId);
      }
    };

    return (
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-warm-brown/20 bg-white/50">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-warm-brown/20 px-4 py-3 z-10">
          <h2 className="text-lg font-semibold text-warm-brown mb-3">Experiments Log</h2>
          {/* Status Dots Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-grey pt-2 border-t border-warm-brown/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>WIP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Shipped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span>Sunset</span>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => {
              const isSelected = selectedExperimentId === experiment.id;
              const category = getExperimentCategory(experiment.id);
              return (
                <button
                  key={experiment.id}
                  onClick={() => handleExperimentClick(experiment.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-light-brown/30 transition-colors duration-200",
                    isSelected && "bg-light-brown/50 border-l-4 border-warm-brown"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <StatusDot status={experiment.status || 'unknown'} isActive={experiment.isActive} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={cn(
                          "text-sm font-semibold truncate",
                          isSelected ? "text-warm-brown" : "text-soft-black"
                        )}>
                          {experiment.title}
                        </h3>
                        {category && (
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-light-brown/40 text-warm-brown/70 flex-shrink-0">
                            {category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-grey">
                        <span>{getStatusLabel(experiment.status || 'unknown', experiment.isActive)}</span>
                        <span>•</span>
                        <span>{experiment.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Right Panel - Detail View
  const DetailPanel = () => {
    const selectedExperiment = orderedExperiments.find(exp => exp.id === selectedExperimentId);

    if (!selectedExperiment) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-muted-grey text-lg">Select an experiment to view details</p>
          </div>
        </div>
      );
    }

    const content = experimentContentMap[selectedExperiment.id];
    const fullDescription = content?.fullDescription || selectedExperiment.description;
    const events = content?.events || [];
    const playlist = content?.playlist || [];

    return (
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl font-bold text-warm-brown">{selectedExperiment.title}</h2>
                <StatusPill status={selectedExperiment.status || 'unknown'} isActive={selectedExperiment.isActive} />
              </div>
              <div className="text-sm text-muted-grey">
                {selectedExperiment.timeframe} {selectedExperiment.collaborators && selectedExperiment.collaborators.length > 0 && `• ${selectedExperiment.collaborators.join(', ')}`}
              </div>
            </div>
          </div>

          {/* Full Description */}
          <p className="text-soft-black text-lg leading-relaxed mb-6">
            {fullDescription}
          </p>

          {/* Technologies */}
          {selectedExperiment.technologies && selectedExperiment.technologies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-warm-brown mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedExperiment.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-warm-brown/20 border border-warm-brown/30 text-warm-brown rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Events Timeline */}
          {events.length > 0 && (
            <div className="space-y-8 mb-8">
              {events.map((event, eventIndex) => (
                <section key={eventIndex} className="border-b border-warm-brown/20 pb-8 last:border-b-0">
                  {/* Event Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-light text-amber-700 mb-2">{event.date}</h3>
                    <h4 className="text-xl text-warm-brown mb-4">{event.title}</h4>
                    <p className="text-warm-brown/70 leading-relaxed">{event.content}</p>
                  </div>

                  {/* Image Gallery */}
                  {event.images && event.images.length > 0 && (
                    <div className="mb-6">
                      <ImageGallery 
                        images={event.images}
                        altPrefix={`${event.title} image`}
                        onImageClick={(image) => setExpandedImage(image)}
                        expandedImage={expandedImage}
                        onClose={() => setExpandedImage(null)}
                        galleryId={`${selectedExperiment.id}-${eventIndex}`}
                      />
                    </div>
                  )}

                  {/* Playlist Player (for Friday Home) */}
                  {playlist.length > 0 && eventIndex === 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-warm-brown mb-4">Live at Mel's (June 11th, 2023)</h4>
                      <div className="bg-light-brown rounded-lg p-6 border border-warm-brown/20">
                        {/* Current Track Display */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-lg">♪</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-warm-brown text-lg">
                              {playlist[currentTrack]?.title}
                            </h5>
                            <p className="text-warm-brown/70 text-sm">Friday Home</p>
                          </div>
                        </div>

                        {/* Audio Element */}
                        {playlist[currentTrack] && (
                          <audio 
                            key={currentTrack}
                            controls 
                            className="w-full mb-4 h-10"
                            onLoadedMetadata={(e) => {
                              const audio = e.target as HTMLAudioElement;
                              if (shouldAutoPlay) {
                                audio.play();
                                setShouldAutoPlay(false);
                              }
                            }}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => {
                              setShouldAutoPlay(true);
                              setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
                            }}
                          >
                            <source src={playlist[currentTrack].url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        )}

                        {/* Playlist */}
                        <div className="space-y-2">
                          <h6 className="text-sm font-medium text-warm-brown/80 mb-3">Playlist</h6>
                          {playlist.map((track, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentTrack(index)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                                index === currentTrack 
                                  ? 'bg-warm-brown/10 border border-warm-brown/30' 
                                  : 'hover:bg-warm-brown/5'
                              }`}
                            >
                              <div className="flex items-center justify-center w-6 h-6">
                                {index === currentTrack && isPlaying ? (
                                  <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-purple-600 animate-pulse"></div>
                                    <div className="w-1 h-4 bg-purple-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1 h-4 bg-purple-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                  </div>
                                ) : (
                                  <span className="text-warm-brown/60 text-sm font-medium">
                                    {(index + 1).toString().padStart(2, '0')}
                                  </span>
                                )}
                              </div>
                              <span className={`font-medium ${
                                index === currentTrack ? 'text-warm-brown' : 'text-warm-brown/70'
                              }`}>
                                {track.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Mobile View - Single column table/list
  const MobileView = () => (
    <div className="w-full">
      <div className="divide-y divide-warm-brown/10 bg-white/50 rounded-xl overflow-hidden">
        {orderedExperiments.map((experiment) => {
          const route = getExperimentRoute(experiment.id);
          const category = getExperimentCategory(experiment.id);
          return (
            <button
              key={experiment.id}
              onClick={() => route && setLocation(route)}
              className={cn(
                "w-full text-left px-4 py-4 hover:bg-light-brown/30 transition-colors duration-200",
                route && "cursor-pointer"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <StatusDot status={experiment.status || 'unknown'} isActive={experiment.isActive} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={cn(
                      "text-base font-semibold",
                      route ? "text-amber-700" : "text-warm-brown"
                    )}>
                      {experiment.title}
                    </h3>
                    {category && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-light-brown/50 text-warm-brown flex-shrink-0">
                        {category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-soft-black mb-2 line-clamp-2">
                    {experiment.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-grey">
                    <span>{getStatusLabel(experiment.status || 'unknown', experiment.isActive)}</span>
                    <span>•</span>
                    <span>{experiment.timeframe}</span>
                    {experiment.collaborators && experiment.collaborators.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{experiment.collaborators.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-6 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-experiments-title">
          Experiments
        </h1>
        <p className="text-muted-grey max-w-xl mx-auto">
          Projects that aim to make the world more meaningful, intentional, and human.
        </p>
      </header>

      {/* Main Content */}
      <div className="experiments-background-texture">
        {isMobile ? (
          <MobileView />
        ) : (
          <div className="flex gap-0 bg-white/50 rounded-xl overflow-hidden shadow-sm border border-warm-brown/10 min-h-[600px]">
            <ExperimentLog />
            <DetailPanel />
          </div>
        )}
      </div>

      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in collaborating or just want to chat? Reach out at{' '}
          <CopyEmail className="text-sm" />
        </p>
      </footer>
    </div>
  );
}
