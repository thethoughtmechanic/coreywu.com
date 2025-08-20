import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, X } from "lucide-react";
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
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Mister Misu event data structure - organized by most recent first
  const misterMisuEvents = [
    {
      title: "June 2025 Coffee Experience", 
      images: [fm1, fm2], // 1-2 sequence
      date: "June 2025",
      content: "We leveraged ChatGPT to define personas/personality traits + shape AI prompts to generate images for each coffee we served."
    },
    {
      title: "Frozen Archives",
      images: [fm5, fm6, fm7, fm8, fm9, fm10, fm11], // 01-07 sequence
      date: "December 2024",
      content: "Inspired by Hydrangea Coffee (California-based Roaster), we wanted to leverage AI image generation to visualize the flavour notes of each coffee to help guests better imagine what they are tasting. Beyond the 'Base Menu', I have also been freezing my favourite coffees throughout the year and wanted to allow my guests to experience these coffees as well. We ended up brewing ALL of these coffees and everyone loved being able to taste and compare so many different coffees in one sitting. 'First-timers' noted that being able to taste so many coffees side-by-side was a great way to learn about the different flavours and notes."
    },
  ];

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
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-amber-700 mb-6" data-testid="text-mister-misu-title">
          Mister Misu
        </h1>
        <p className="text-warm-brown/70 max-w-3xl mx-auto leading-relaxed">
          A collection of coffee pop-ups that aim to make specialty coffee more accessible to the masses, exploring how we might talk about tasting and how we might communicate flavours through alternative visuals and storytelling.
        </p>
      </header>

      {/* Main Content - Scrollable Timeline */}
      <main className="space-y-16">
        {misterMisuEvents.map((event, eventIndex) => (
          <section key={eventIndex} className="border-b border-warm-brown/20 pb-12 last:border-b-0">
            {/* Event Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-light text-amber-700 mb-2" data-testid={`text-event-title-${eventIndex}`}>
                {event.date}
              </h2>
              <h3 className="text-xl text-warm-brown mb-4" data-testid={`text-event-subtitle-${eventIndex}`}>
                {event.title}
              </h3>
              <p className="text-warm-brown/70 max-w-3xl leading-relaxed" data-testid={`text-event-content-${eventIndex}`}>
                {event.content}
              </p>
            </div>

            {/* Image Gallery */}
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {event.images.map((image, imageIndex) => (
                <div 
                  key={imageIndex} 
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 aspect-square flex items-center justify-center p-2"
                  onClick={() => setExpandedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${event.title} image ${imageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    data-testid={`img-event-${eventIndex}-${imageIndex}`}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
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