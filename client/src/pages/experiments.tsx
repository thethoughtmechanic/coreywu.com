import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

// Import Mister Misu images - using public folder paths
const grandCoffeeHallImage = "/mister-misu-grand-coffee-hall.png";
const guestListImage = "/mister-misu-guest-list.png";

// Import Mister Misu images using available assets
import fm1 from "@assets/1_1755009695189.png";
import fm2 from "@assets/2_1755009695190.png";
import fm3 from "@assets/1_1755012742431.png";
import fm4 from "@assets/2_1755012742432.png";
import fm5 from "@assets/01_1755014357426.png";
import fm6 from "@assets/02_1755014357425.png";
import fm7 from "@assets/03_1755014357425.png";

// Import remaining December images
import fm8 from "@assets/04_1755014357427.png";
import fm9 from "@assets/05_1755014357426.png";
import fm10 from "@assets/06_1755014357426.jpg";
import fm11 from "@assets/07_1755014357426.png";

export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  // Mister Misu Modal State
  const [isMisterMisuModalOpen, setIsMisterMisuModalOpen] = useState(false);
  const [currentMisterMisuEventIndex, setCurrentMisterMisuEventIndex] = useState(0);

  // Friday Home Modal State
  const [isFridayHomeModalOpen, setIsFridayHomeModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mister Misu event data structure
  const misterMisuEvents = [
    {
      id: 'dec-2024',
      title: 'December 2024 - Grand Coffee Hall',
      description: 'Our first pop-up featuring specialty coffee drinks and desserts in an intimate setting.',
      images: [
        '/mister-misu-dec-2024-coffee-collage.jpg',
        '/mister-misu-dec-2024-clean-menu.png',
        '/mister-misu-dec-2024-fruity-menu.png',
        '/mister-misu-dec-2024-weird-menu.png',
        '/mister-misu-dec-2024-strawberry-cards.png',
        '/mister-misu-dec-2024-frozen-archives.png',
        '/mister-misu-dec-2024-sold-out.png'
      ]
    }
  ];

  const fridayHomePortfolio = [
    {
      id: 'concert-poster',
      title: 'Concert Poster',
      type: 'pdf',
      src: '/friday-home-concert-poster.pdf',
      description: 'Official concert poster design'
    },
    {
      id: 'photo-1',
      title: 'Performance Photo 1',
      type: 'image',
      src: '/friday-home-photo-1.jpg',
      description: 'Live performance capture'
    },
    {
      id: 'photo-2',
      title: 'Performance Photo 2',
      type: 'image',
      src: '/friday-home-photo-2.jpg',
      description: 'Band in action'
    },
    {
      id: 'photo-3',
      title: 'Performance Photo 3',
      type: 'image',
      src: '/friday-home-photo-3.jpg',
      description: 'Concert atmosphere'
    },
    {
      id: 'moonlight-audio',
      title: 'Moonlight',
      type: 'audio',
      src: '/friday-home-moonlight.mp3',
      description: 'Original song recording'
    }
  ];

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
        {orderedExperiments.map((experiment) => (
          <div key={experiment.id} className="px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-2">
                <StatusDot experiment={experiment} />
              </div>
              <div className="col-span-2">
                {experiment.id === 'mister-misu-1' ? (
                  <button
                    onClick={() => {
                      setIsMisterMisuModalOpen(true);
                      setCurrentMisterMisuEventIndex(0); // Set to the first event (Dec 2024)
                    }}
                    className="font-medium text-amber-700 hover:text-amber-800 transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-2"
                  >
                    {experiment.title}
                  </button>
                ) : experiment.id === 'friday-home-1' ? (
                      <button
                        onClick={() => setIsFridayHomeModalOpen(true)}
                        className="font-medium text-purple-700 hover:text-purple-800 transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-2"
                      >
                        {experiment.title}
                      </button>
                    ) : (
                      <span className="font-medium">{experiment.title}</span>
                    )}
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
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-4">
      {orderedExperiments.map((experiment) => (
        <div key={experiment.id} className="bg-light-brown rounded-lg p-4">
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
              {experiment.id === 'mister-misu-1' ? (
                <button
                  onClick={() => {
                    setIsMisterMisuModalOpen(true);
                    setCurrentMisterMisuEventIndex(0); // Set to the first event (Dec 2024)
                  }}
                  className="font-medium text-amber-700 hover:text-amber-800 transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-2 text-lg"
                >
                  {experiment.title}
                </button>
              ) : (
                <h3 className="font-medium text-warm-brown text-lg">{experiment.title}</h3>
              )}
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

            {/* Technologies as pills with improved styling */}
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
      ))}
    </div>
  );

  // Function to handle navigation within the modal
  const handleModalNav = (direction: 'prev' | 'next') => {
    const eventCount = misterMisuEvents.length;
    if (direction === 'prev') {
      setCurrentMisterMisuEventIndex((prevIndex) => (prevIndex - 1 + eventCount) % eventCount);
    } else {
      setCurrentMisterMisuEventIndex((prevIndex) => (prevIndex + 1) % eventCount);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-grey mb-6 max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-yellow-500 flex-shrink-0"></div>
              <span>Work in Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-green-500 flex-shrink-0"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-blue-500 flex-shrink-0"></div>
              <span>Shipped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-gray-500 flex-shrink-0"></div>
              <span>Sunset</span>
            </div>
          </div>
        )}
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

      {/* Mister Misu Modal */}
      {isMisterMisuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-warm-brown/20">
              <div>
                <h3 className="text-2xl font-medium text-warm-brown mb-2">
                  Mister Misu
                </h3>
                <p className="text-sm text-soft-black/70">
                  Pop-up coffee and dessert experiences
                </p>
              </div>
              <button
                onClick={() => setIsMisterMisuModalOpen(false)}
                className="text-warm-brown hover:text-hover-brown transition-colors duration-200 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {misterMisuEvents.map((event, index) => (
                <div key={event.id} className="p-6">
                  <div className="mb-6">
                    <h4 className="text-xl font-medium text-warm-brown mb-2">{event.title}</h4>
                    <p className="text-soft-black/70">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="aspect-square overflow-hidden rounded-lg bg-light-brown">
                        <img
                          src={image}
                          alt={`${event.title} - Image ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Friday Home Modal */}
      {isFridayHomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-warm-brown/20">
              <div>
                <h3 className="text-2xl font-medium text-warm-brown mb-2">
                  Friday Home
                </h3>
                <p className="text-sm text-soft-black/70">
                  Band portfolio and media collection
                </p>
              </div>
              <button
                onClick={() => setIsFridayHomeModalOpen(false)}
                className="text-warm-brown hover:text-hover-brown transition-colors duration-200 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
              <div className="space-y-8">
                {fridayHomePortfolio.map((item, index) => (
                  <div key={item.id} className="border-b border-warm-brown/10 pb-6 last:border-b-0">
                    <h4 className="text-lg font-medium text-warm-brown mb-2">{item.title}</h4>
                    <p className="text-sm text-soft-black/70 mb-4">{item.description}</p>

                    {item.type === 'pdf' && (
                      <div className="bg-light-brown rounded-lg p-6 text-center">
                        <div className="mb-4">
                          <svg className="w-16 h-16 mx-auto text-warm-brown" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <a
                          href={item.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-warm-brown text-cream px-6 py-3 rounded-lg hover:bg-hover-brown transition-colors duration-200 font-medium"
                        >
                          View Concert Poster (PDF)
                        </a>
                      </div>
                    )}

                    {item.type === 'image' && (
                      <div className="rounded-lg overflow-hidden bg-light-brown">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {item.type === 'audio' && (
                      <div className="bg-light-brown rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-warm-brown rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M13.828 8.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 3.828 1 1 0 11-1.414-1.414A3.983 3.983 0 0015 12a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-warm-brown">{item.title}</h5>
                            <p className="text-sm text-soft-black/70">Original recording</p>
                          </div>
                        </div>
                        <audio controls className="w-full">
                          <source src={item.src} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}