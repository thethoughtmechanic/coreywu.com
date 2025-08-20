import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Mister Misu event data structure
  const misterMisuEvents = [
    {
      title: "Frozen Archives - Dec 2024",
      images: [fm5, fm6, fm7, fm8, fm9, fm10, fm11], // 01-07 sequence
      description: "December 2024",
    },
    {
      title: "June 2025 Coffee Experience", 
      images: [fm1, fm2], // 1-2 sequence
      description: "June 2025",
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
        <h1 className="text-4xl font-light text-amber-700 mb-4" data-testid="text-mister-misu-title">
          Mister Misu
        </h1>
        <p className="text-warm-brown/70 text-lg" data-testid="text-current-event-description">
          {misterMisuEvents[currentEventIndex].description}
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Image Gallery */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} mb-8`}>
          {misterMisuEvents[currentEventIndex].images.map((image, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <img 
                src={image} 
                alt={`Mister Misu event image ${index + 1}`}
                className="w-full h-auto object-contain"
                data-testid={`img-mister-misu-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {misterMisuEvents.length > 1 && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleNav('prev')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-warm-brown/20 text-warm-brown rounded-full hover:bg-warm-brown/30 transition-colors duration-200"
              data-testid="button-prev-event"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => handleNav('next')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors duration-200"
              data-testid="button-next-event"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

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