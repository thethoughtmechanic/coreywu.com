import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

// Import Mister Misu images - using public folder paths
const grandCoffeeHallImage = "/mister-misu-grand-coffee-hall.png";
const guestListImage = "/mister-misu-guest-list.png";

// Import Mister Misu images for the December 2024 event
import fm1 from "@assets/dec-2024-coffee-event/1.png";
import fm2 from "@assets/dec-2024-coffee-event/2.png";
import fm3 from "@assets/dec-2024-coffee-event/3.png";
import fm4 from "@assets/dec-2024-coffee-event/4.png";
import fm5 from "@assets/dec-2024-coffee-event/5.png";
import fm6 from "@assets/dec-2024-coffee-event/6.png";
import fm7 from "@assets/dec-2024-coffee-event/7.png";

// Import Mister Misu images for the June 2025 event
import fm8 from "@assets/june-2025-coffee-event/1.png";
import fm9 from "@assets/june-2025-coffee-event/2.png";


export default function Experiments() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isMisterMisuModalOpen, setIsMisterMisuModalOpen] = useState(false);
  const [currentMisterMisuEventIndex, setCurrentMisterMisuEventIndex] = useState(0); // State to track current event in modal
  const isMobile = useIsMobile();

  // Mister Misu event data structure
  const misterMisuEvents = [
    {
      title: "Frozen Archives - Dec 2024",
      images: [fm1, fm2, fm3, fm4, fm5, fm6, fm7],
      description: "An exploration of curated coffee experiences from December 2024.",
    },
    {
      title: "June 2025 Coffee Experience",
      images: [fm8, fm9],
      description: "A glimpse into the upcoming coffee event in June 2025.",
    },
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

  // Get team display text - simplified
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators[0]; // Just show the first collaborator
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
                ) : (
                  <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
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
          <div className="flex items-center justify-center gap-4 text-sm text-muted-grey mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 min-w-[12px] min-h-[12px] rounded-full bg-yellow-500 flex-shrink-0"></div>
              <span>Work in Progress</span>
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
          Interested in collaborating on an experiment? Reach out at{' '}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden mx-4">
            {/* Close button */}
            <button
              onClick={() => setIsMisterMisuModalOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-amber-700 mb-2">Mister Misu</h2>
                <p className="text-warm-brown/70">{misterMisuEvents[currentMisterMisuEventIndex].description}</p>
              </div>

              {/* Image Gallery */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} max-h-[60vh] overflow-auto`}>
                {misterMisuEvents[currentMisterMisuEventIndex].images.map((image, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Mister Misu event image ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              {misterMisuEvents.length > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => handleModalNav('prev')}
                    className="px-4 py-2 bg-warm-brown/20 text-warm-brown rounded-full hover:bg-warm-brown/30 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleModalNav('next')}
                    className="px-4 py-2 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}