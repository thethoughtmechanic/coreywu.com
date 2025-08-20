import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { ImageGallery } from "@/components/image-gallery";

// Import Friday Home assets
import fridayHome1 from "@assets/WCS08751_1755656112838.jpg";
import fridayHome2 from "@assets/WCS08762_1755656112839.jpg";
import fridayHome3 from "@assets/WCS08732_1755656112839.jpg";
import fridayHomePoster from "@assets/Friday-Home_F_1755656751713.jpg";
import fridayHomeAudio from "@assets/Moonlight_1755656112839.mp3";
import girlInGreyAudio from "@assets/girl-in-grey_1755666353648.mp3";
import butterfliesAudio from "@assets/butterflies_1755666353648.mp3";

export default function FridayHome() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Playlist state
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  // Playlist data
  const playlist = [
    { title: "Girl in Grey (Live at Mel's)", url: girlInGreyAudio },
    { title: "Butterflies (Live at Mel's)", url: butterfliesAudio },
    { title: "Moonlight (Live at Mel's)", url: fridayHomeAudio }
  ];

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
          Tony and I had an idea for a band that was about more than just the music. Sure, we drew from our favourites—Daniel Caesar, Theo Katzman, Lizzy McAlpine, John Mayer, Anderson .Paak, and many more. But what we really wanted was to capture a feeling: the kind of night where you stay in with friends, share a cozy dinner, sink into the couch for long conversations, sing a few songs, play games, and suddenly realize it's 4 a.m. This is Friday Home.
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
            <ImageGallery 
              images={event.images}
              altPrefix={`${event.title} image`}
              onImageClick={(image) => setExpandedImage(image)}
              expandedImage={expandedImage}
              onClose={() => setExpandedImage(null)}
            />

            {/* Playlist Player Section */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-warm-brown mb-4">Live at Mel's (June 11th, 2023) </h4>
              <div className="bg-light-brown rounded-lg p-6 border border-warm-brown/20">
                {/* Current Track Display */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">♪</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-warm-brown text-lg">
                      {playlist[currentTrack].title}
                    </h5>
                    <p className="text-warm-brown/70 text-sm">Friday Home</p>
                  </div>
                </div>

                {/* Audio Element */}
                <audio 
                  key={currentTrack}
                  controls 
                  className="w-full mb-4 h-10"
                  data-testid={`playlist-audio-${eventIndex}`}
                  onLoadedMetadata={(e) => {
                    const audio = e.target as HTMLAudioElement;
                    setDuration(audio.duration);
                    // Auto-play when new track loads if we should auto-play
                    if (shouldAutoPlay) {
                      audio.play();
                      setShouldAutoPlay(false);
                    }
                  }}
                  onTimeUpdate={(e) => {
                    const audio = e.target as HTMLAudioElement;
                    setCurrentTime(audio.currentTime);
                  }}
                  onPlay={() => {
                    setIsPlaying(true);
                    // Track audio play
                    console.log(`Audio play tracked: ${playlist[currentTrack].title} on friday-home`);
                  }}
                  onPause={() => {
                    setIsPlaying(false);
                    // Track audio pause
                    console.log(`Audio pause tracked: ${playlist[currentTrack].title} on friday-home`);
                  }}
                  onEnded={() => {
                    // Track audio completion
                    console.log(`Audio complete tracked: ${playlist[currentTrack].title} on friday-home`);

                    // Set flag to auto-play next track
                    setShouldAutoPlay(true);
                    // Auto advance to next track, loop back to start if at end
                    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
                  }}
                >
                  <source src={playlist[currentTrack].url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                {/* Playlist */}
                <div className="space-y-2">
                  <h6 className="text-sm font-medium text-warm-brown/80 mb-3">Playlist</h6>
                  {playlist.map((track, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTrack(index);
                        // Track track selection
                        console.log(`Track selected: ${playlist[index].title} on friday-home`);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                        index === currentTrack 
                          ? 'bg-warm-brown/10 border border-warm-brown/30' 
                          : 'hover:bg-warm-brown/5'
                      }`}
                      data-testid={`playlist-track-${index}`}
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
          </section>
        ))}
      </main>

      {/* Full-screen image modal - Handled by ImageGallery */}
      
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