import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, X } from "lucide-react";
import { useLocation } from "wouter";

// Import Friday Home assets
import fridayHome1 from "@assets/WCS08751_1755656112838.jpg";
import fridayHome2 from "@assets/WCS08762_1755656112839.jpg";
import fridayHome3 from "@assets/WCS08732_1755656112839.jpg";
import fridayHomePoster from "@assets/Friday-Home_F_1755656751713.jpg";
import fridayHomeAudio from "@assets/Moonlight_1755656112839.mp3";

export default function FridayHome() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Project event data structure - organized by most recent first
  const projectEvents = [
    {
      title: "Our First Live Show",
      images: [fridayHomePoster, fridayHome1, fridayHome2, fridayHome3],
      date: "June 11, 2023",
      content: "We performed a house concert for close friends and family, debuting 2 sets of original music.",
      additionalAssets: [
        { type: 'audio', name: 'Moonlight (Live June 11, 2023)', url: fridayHomeAudio }
      ]
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
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-amber-700 mb-6" data-testid="text-project-title">
          Friday Home
        </h1>
        <p className="text-warm-brown/70 max-w-3xl mx-auto leading-relaxed">
          Tony and I dreamed up a band that was more than just music. Sure, we drew from our favourites—Daniel Caesar, Theo Katzman, Lizzy McAlpine, John Mayer, Anderson .Paak, and many more. But what we really wanted was to capture a feeling: the kind of night where you stay in with friends, share a cozy dinner, sink into the couch for long conversations, sing a few songs, play games, and suddenly realize it's 4 a.m. This is Friday Home.
        </p>
      </header>

      {/* Main Content - Scrollable Timeline */}
      <main className="space-y-16">
        {projectEvents.map((event, eventIndex) => (
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
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
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

            {/* Audio Track Section */}
            {event.additionalAssets && event.additionalAssets.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-warm-brown mb-4">Listen</h4>
                <div className="bg-light-brown rounded-lg p-4 border border-warm-brown/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-xs">♪</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-warm-brown">{event.additionalAssets[0].name}</p>
                      <audio 
                        controls 
                        className="w-full mt-2 h-8"
                        data-testid={`audio-${eventIndex}`}
                      >
                        <source src={event.additionalAssets[0].url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            )}
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