import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import CopyEmail from "@/components/copy-email";
import { TypingText } from "@/components/typing-text";
import { SpringElement } from "@/components/spring-element";
import { HyperText } from "@/components/hyper-text";
import { GeometricField } from "@/components/grass-icons";
import headshotImage from "@/assets/illustrated-headshot-portrait.jpg";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Assuming mobile is < 768px

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  // Effect to update isMobile state on window resize
  // Not strictly necessary for this change, but good practice if isMobile is used elsewhere
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-screen flex flex-col relative">
      <GeometricField count={33} onNavigate={handleNavigation} />

      {/* Experiments Icon - Triangle */}
        <div 
          className={`absolute transition-all duration-300 cursor-pointer z-20 ${
            isMobile 
              ? 'top-[65%] right-8 transform -translate-y-1/2' 
              : 'top-1/2 right-12 transform -translate-y-1/2'
          }`}
          onClick={() => setLocation('/experiments')}
        ></div>

      {/* Main Content Area - Constrained height to leave room for footer */}
      <main className="flex flex-col items-center justify-center py-8 md:py-12" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Draggable Headshot - positioned above the welcome text */}
        <div className="mb-8 md:mb-10 flex justify-center relative">
          <SpringElement>
            <div 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl transition-all duration-300"
            >
              <img 
                src={headshotImage}
                alt="Corey Wu - Draggable headshot"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 10%' }}
                draggable={false}
                data-testid="img-headshot"
              />
            </div>
          </SpringElement>
          
          {/* Pink Heart Anchor Icon - positioned at the exact center where spring attaches */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <defs>
                <pattern id="pinkSketch-anchor" patternUnits="userSpaceOnUse" width="2" height="2">
                  <rect width="2" height="2" fill="#ec4899"/>
                  <path d="M0,0.5 L2,0.5" stroke="#fce7f3" strokeWidth="0.3" opacity="0.8"/>
                  <path d="M0,1.5 L2,1.5" stroke="#fbcfe8" strokeWidth="0.3" opacity="0.6"/>
                  <path d="M0.5,0 L0.5,2" stroke="#f9a8d4" strokeWidth="0.3" opacity="0.7"/>
                  <path d="M1.5,0 L1.5,2" stroke="#f472b6" strokeWidth="0.3" opacity="0.9"/>
                  <circle cx="0.5" cy="0.5" r="0.1" fill="#fdf2f8" opacity="0.8"/>
                  <circle cx="1.5" cy="1.5" r="0.1" fill="#fef7f3" opacity="0.6"/>
                </pattern>
              </defs>
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" fill="url(#pinkSketch-anchor)" stroke="#ec4899" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>

        {/* Welcome Title - Better Mobile Sizing */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-warm-brown leading-tight px-6 text-center" data-testid="text-home-title">
            <TypingText 
              text="Welcome to my digital garden."
              duration={80}
              delay={500}
              cursor={false}
              className="inline"
            />
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-soft-black/60 leading-relaxed max-w-2xl mx-auto px-6 text-center">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more meaningful, intentional, and human. Let's tend to these ideas and see what they grow into.
        </p>
      </main>

      {/* Contact Footer - Always visible with guaranteed space */}
      <footer className="text-center py-6 px-6 mt-auto flex-shrink-0">
        <div className="max-w-4xl mx-auto pt-4 border-t border-warm-brown/20">
          <p className="text-sm text-muted-grey">
            Interested in collaborating or just want to chat? Reach out at{' '}
            <CopyEmail className="text-warm-brown hover:text-hover-brown transition-colors duration-200 no-underline" email="coreydavidwu@gmail.com">
              coreydavidwu@gmail.com
            </CopyEmail>
          </p>
        </div>
      </footer>
    </div>
  );
}