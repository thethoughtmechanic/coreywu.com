import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import { ImageGallery } from "@/components/image-gallery";

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
      title: "Personifying Coffees", 
      images: [fm1, fm2],
      date: "June 2025",
      content: "We leveraged ChatGPT to define personas/personality traits + shape AI prompts to generate images for each coffee we served."
    },
    {
      title: "Flavour Notes Illustrations + Frozen Archives",
      images: [fm5, fm6, fm7, fm8, fm9, fm10, fm11],
      date: "December 2024",
      content: "Inspired by Hydrangea Coffee (a California-based roaster), we experimented with AI image generation to visualize the flavor notes of each coffee, helping guests better imagine what they were tasting. Beyond the Base Menu, I had also been freezing my favorite coffees throughout the year and wanted to share those with my guests. We brewed all of them, creating a unique chance to taste and compare a wide range of coffees side by side. Many first-time tasters said that experiencing so many coffees in one sitting was a fun and memorable way to learn about different flavors and notes."
    }
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
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-amber-700 mb-3" data-testid="text-mister-misu-title">
          Mister Misu
        </h1>
        <p className="text-warm-brown/70 max-w-3xl mx-auto leading-relaxed mb-8">
          A collection of coffee pop-ups that aim to make specialty coffee more accessible to the masses, exploring how we might talk about tasting and how we might communicate flavours through alternative visuals and storytelling.
        </p>
      </header>

      {/* Main Content - Scrollable Timeline */}
      <main className="space-y-section">
        {misterMisuEvents.map((event, eventIndex) => (
          <section key={eventIndex} className="border-b border-warm-brown/20 pb-12 last:border-b-0 last:pb-0">
            {/* Event Header */}
            <div className="mb-6">
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
            <ImageGallery images={event.images} />
          </section>
        ))}
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