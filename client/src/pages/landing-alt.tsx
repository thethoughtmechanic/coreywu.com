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
import headshotImage from "@assets/0X5A2925_2_pp_1756229624864.jpg";

export default function LandingAlt() {
  const [, setLocation] = useLocation();

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-screen flex flex-col relative">
      <GeometricField count={25} onNavigate={handleNavigation} />
      <div className="text-center w-full flex flex-col items-center justify-center flex-1 py-8">
        {/* Draggable Headshot - positioned above the welcome text */}
        <div className="mb-10 flex justify-center">
          <SpringElement>
            <div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl transition-all duration-300"
            >
              <img 
                src={headshotImage}
                alt="Corey Wu - Draggable headshot"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 20%', transform: 'scale(1.2)' }}
                draggable={false}
                data-testid="img-headshot"
              />
            </div>
          </SpringElement>
        </div>

        {/* Welcome Title - Mobile Optimized */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-warm-brown leading-tight px-2" data-testid="text-home-title">
            <TypingText 
              text="Welcome to my digital garden."
              duration={80}
              delay={500}
              cursor={false}
              className="inline"
            />
          </h1>
        </div>

        <p className="text-sm md:text-base text-soft-black/60 leading-relaxed max-w-2xl mx-auto px-4">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more meaningful, intentional, and human. Let's tend to these ideas and see what they grow into.
        </p>
      </div>

      {/* Contact Footer */}
      <footer className="text-center pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto pt-8 border-t border-warm-brown/20">
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