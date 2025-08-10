import { useState } from "react";
import { useLocation } from "wouter";
import { ThoughtCard } from "@/components/thought-card";
import { thoughts } from "@/data/thoughts";
import { useIsMobile } from "@/hooks/use-mobile";
import democracyImage from "@assets/image_1754686959251.png";

export default function Thoughts() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const [modalSlide, setModalSlide] = useState<string | null>(null);

  const handleSlideExpansion = (thoughtId: string) => {
    setExpandedSlide(expandedSlide === thoughtId ? null : thoughtId);
  };

  const getGoogleSlidesUrl = (thoughtId: string) => {
    const slideUrls: Record<string, string> = {
      "1": "https://docs.google.com/presentation/d/e/2PACX-1vRRURqdZXOqJoW5apKDdfoLQCjxHipqrL3BIWppgfs4Lq4ETCDCuPyVZNSsYr0jUeL845-ymDPYbD6N/embed?start=false&loop=false&delayms=3000"
    };
    return slideUrls[thoughtId] || "";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-thoughts-title">
          Idea Garden
        </h1>
        <p className="text-muted-grey max-w-xl mx-auto">
          Reflections on design, strategy, and the intersection of technology and humanity
        </p>
      </header>

      <div className="min-h-[80vh] bg-gradient-to-br from-cream/30 to-light-brown/20 rounded-xl p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thoughts.map((thought) => (
            <div key={thought.id} className="bg-light-brown rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-warm-brown">{thought.tag}</span>
                <span className="text-xs text-warm-brown/60">{thought.date || "Aug 7, 2025"}</span>
              </div>
              
              {thought.tag === 'Scenario' && (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-warm-brown mb-4">{thought.title}</h3>
                  <img 
                    src={democracyImage}
                    alt="Democracy's Last Voter illustration"
                    className="max-w-full max-h-64 object-contain rounded-lg mx-auto"
                  />
                </div>
              )}
              
              {thought.tag !== 'Scenario' && (
                <>
                  <h3 className="text-sm font-medium text-warm-brown mb-2">{thought.title}</h3>
                  <p className="text-xs text-soft-black/70 mb-3 leading-relaxed">
                    {thought.description || 'Exploring fundamental questions about what makes us human in an era where artificial intelligence increasingly mirrors human capabilities.'}
                  </p>
                  
                  {thought.readTime && (
                    <div className="flex items-center gap-1 mb-3">
                      <svg className="w-3 h-3 text-warm-brown/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-warm-brown/60">{thought.readTime}</span>
                    </div>
                  )}
                  
                  {thought.status === 'published' && (
                    <button
                      onClick={() => setModalSlide(thought.id)}
                      className="w-full text-xs py-2 px-3 rounded-xl transition-colors duration-200 font-medium bg-warm-brown text-cream hover:bg-hover-brown"
                    >
                      View slides
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {modalSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-xl p-8 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-warm-brown">
                  {thoughts.find(t => t.id === modalSlide)?.title}
                </h3>
                <button
                  onClick={() => setModalSlide(null)}
                  className="text-warm-brown hover:text-hover-brown transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="w-full h-[60vh] bg-light-brown rounded-lg overflow-hidden mb-4">
                <iframe
                  src={getGoogleSlidesUrl(modalSlide)}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  frameBorder="0"
                  className="rounded-lg"
                  title={`${thoughts.find(t => t.id === modalSlide)?.title} Presentation`}
                />
              </div>
              <div className="flex justify-center">
                <a 
                  href="https://docs.google.com/presentation/d/13caT7YIdBzGhW89Wv2a0RxOFCgxq1m0swQpde1wzEOo/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-brown hover:text-hover-brown text-sm font-medium flex items-center gap-2"
                >
                  <span>Open in Google Slides</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}