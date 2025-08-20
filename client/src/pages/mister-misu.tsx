import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocation } from "wouter";

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

export default function MisterMisu() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Mister Misu event data structure
  const misterMisuEvents = [
    {
      title: "Frozen Archives - Dec 2024",
      images: [fm5, fm6, fm7, fm8, fm9, fm10, fm11], // 01-07 sequence
      description: "December 2024",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "June 2025 Coffee Experience", 
      images: [fm1, fm2], // 1-2 sequence
      description: "June 2025",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper."
    },
  ];

  // Function to handle navigation between events
  const handleNav = (direction: 'prev' | 'next') => {
    const eventCount = misterMisuEvents.length;
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
        <h1 className="text-4xl font-light text-amber-700 mb-6" data-testid="text-mister-misu-title">
          Mister Misu
        </h1>
        
        {/* Event Navigation and Title */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {misterMisuEvents.length > 1 && (
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
            {misterMisuEvents[currentEventIndex].description}
          </h2>
          
          {misterMisuEvents.length > 1 && (
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
          {misterMisuEvents[currentEventIndex].content}
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Image Gallery - Smaller clickable images */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
          {misterMisuEvents[currentEventIndex].images.map((image, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 aspect-square flex items-center justify-center p-2"
              onClick={() => setExpandedImage(image)}
            >
              <img 
                src={image} 
                alt={`Mister Misu event image ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                data-testid={`img-mister-misu-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Event indicator dots */}
        {misterMisuEvents.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {misterMisuEvents.map((_, index) => (
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
          <div className="relative w-full h-full flex items-center justify-center">
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
              className="max-w-full max-h-full object-contain rounded-lg"
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