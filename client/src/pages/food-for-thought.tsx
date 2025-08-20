import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { ImageGallery } from "@/components/image-gallery";
import { useLocation } from "wouter";

export default function FoodForThought() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Project event data structure
  const projectEvents = [
    {
      title: "TITLE",
      images: [], // Placeholder for assets
      description: "TITLE",
      content: "DESCRIPTION"
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
          Food for Thought
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
        <ImageGallery 
          images={projectEvents[currentEventIndex].images}
          isMobile={isMobile}
          setExpandedImage={setExpandedImage}
        />

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