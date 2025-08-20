import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocation } from "wouter";

// Import Friday Home assets
import fridayHome1 from "@assets/WCS08751_1755656112838.jpg";
import fridayHome2 from "@assets/WCS08762_1755656112839.jpg";
import fridayHome3 from "@assets/WCS08732_1755656112839.jpg";
import fridayHomePDF from "@assets/Friday-Home_F_1755656112839.pdf";
import fridayHomeAudio from "@assets/Moonlight_1755656112839.mp3";

export default function FridayHome() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Project event data structure
  const projectEvents = [
    {
      title: "June 11, 2023 Performance",
      images: [fridayHome1, fridayHome2, fridayHome3], // Performance photos
      description: "June 11, 2023",
      content: "A cozy pop/funk/R&B band performance at a secret location. Friday Home brought together guitar, bass, drums, and vocals for an intimate house concert experience, showcasing original songwriting and live performance energy in a beautiful residential setting.",
      additionalAssets: [
        { type: 'pdf', name: 'Event Flyer', url: fridayHomePDF },
        { type: 'audio', name: 'Moonlight (Audio Track)', url: fridayHomeAudio }
      ]
    },
  ];

  // Function to handle navigation between events
  const handleNav = (direction: 'prev' | 'next') => {
    const eventCount = projectEvents.length;
    if (direction === 'prev') {
      setCurrentEventIndex((prevIndex) => (prevIndex - 1 + eventCount) % eventCount);
    } else {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % eventCount);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back button */}
      <button
        onClick={() => setLocation('/experiments')}
        className="inline-flex items-center gap-2 text-warm-brown hover:text-hover-brown transition-colors duration-200 mb-8"
        data-testid="button-back-experiments"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Experiments
      </button>

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-amber-700 mb-6" data-testid="text-project-title">
          Friday Home
        </h1>
        
        {/* Event Navigation and Title */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {projectEvents.length > 1 && (
            <button
              onClick={() => handleNav('prev')}
              className="w-8 h-8 flex items-center justify-center text-warm-brown hover:text-amber-700 transition-colors duration-200"
              data-testid="button-prev-event-top"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          
          <h2 className="text-2xl font-light text-warm-brown" data-testid="text-current-event-title">
            {projectEvents[currentEventIndex].description}
          </h2>
          
          {projectEvents.length > 1 && (
            <button
              onClick={() => handleNav('next')}
              className="w-8 h-8 flex items-center justify-center text-warm-brown hover:text-amber-700 transition-colors duration-200"
              data-testid="button-next-event-top"
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Description */}
        <p className="text-warm-brown/70 max-w-3xl mx-auto leading-relaxed" data-testid="text-event-content">
          {projectEvents[currentEventIndex].content}
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Image Gallery - Smaller clickable images */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
          {projectEvents[currentEventIndex].images.map((image, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 aspect-square flex items-center justify-center p-2"
              onClick={() => setExpandedImage(image)}
            >
              <img 
                src={image} 
                alt={`Friday Home performance image ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                data-testid={`img-project-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Additional Assets Section */}
        {projectEvents[currentEventIndex].additionalAssets && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Additional Materials</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {projectEvents[currentEventIndex].additionalAssets.map((asset, index) => (
                <div key={index} className="bg-light-brown rounded-lg p-4 border border-warm-brown/20">
                  <div className="flex items-center gap-3">
                    {asset.type === 'pdf' && (
                      <>
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 font-semibold text-xs">PDF</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-warm-brown">{asset.name}</p>
                          <a 
                            href={asset.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-amber-700 hover:text-amber-800 underline"
                            data-testid={`link-pdf-${index}`}
                          >
                            View PDF
                          </a>
                        </div>
                      </>
                    )}
                    {asset.type === 'audio' && (
                      <>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-xs">♪</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-warm-brown">{asset.name}</p>
                          <audio 
                            controls 
                            className="w-full mt-2 h-8"
                            data-testid={`audio-${index}`}
                          >
                            <source src={asset.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event indicator dots */}
        {projectEvents.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {projectEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEventIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentEventIndex 
                    ? 'bg-amber-700' 
                    : 'bg-warm-brown/30 hover:bg-warm-brown/50'
                }`}
                data-testid={`button-event-${index}`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        )}
      </main>

      {/* Full-screen image modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
              data-testid="button-close-expanded"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={expandedImage} 
              alt="Expanded view"
              className="w-full h-full object-contain rounded-lg"
              data-testid="img-expanded"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-16 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in collaborating or just want to chat? Reach out at{' '}
          <a 
            href="mailto:coreydavidwu@gmail.com"
            className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
            data-testid="link-contact-email"
          >
            coreydavidwu@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}