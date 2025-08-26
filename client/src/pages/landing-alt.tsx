import { Link } from "wouter";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import CopyEmail from "@/components/copy-email";
import { TypingText } from "@/components/typing-text";
import { SpringElement } from "@/components/spring-element";
import headshotImage from "@assets/0X5A2925_2_pp_1756229624864.jpg";

export default function LandingAlt() {

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-6 md:py-8">
      <div className="text-center w-full flex flex-col items-center justify-center flex-1">
        {/* Draggable Headshot - positioned above the welcome text */}
        <div className="mb-16 flex justify-center">
          <SpringElement>
            <div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl transition-all duration-300"
            >
              <img 
                src={headshotImage}
                alt="Corey Wu - Draggable headshot"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 40%', transform: 'scale(1.2)' }}
                draggable={false}
                data-testid="img-headshot"
                onError={(e) => {
                  // Fallback to the SVG avatar if the image fails to load
                  e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%">
                          <stop offset="0%" style="stop-color:#F5E6D3;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#E8D5C0;stop-opacity:1" />
                        </radialGradient>
                        <radialGradient id="hairGradient" cx="50%" cy="30%" r="70%">
                          <stop offset="0%" style="stop-color:#3D2914;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#2C1810;stop-opacity:1" />
                        </radialGradient>
                      </defs>
                      <!-- Hair -->
                      <ellipse cx="64" cy="45" rx="40" ry="35" fill="url(#hairGradient)"/>
                      <!-- Face -->
                      <ellipse cx="64" cy="70" rx="32" ry="38" fill="url(#faceGradient)"/>
                      <!-- Glasses -->
                      <circle cx="54" cy="65" r="8" fill="none" stroke="#4A4A4A" stroke-width="2"/>
                      <circle cx="74" cy="65" r="8" fill="none" stroke="#4A4A4A" stroke-width="2"/>
                      <line x1="62" y1="65" x2="66" y2="65" stroke="#4A4A4A" stroke-width="2"/>
                      <!-- Eyes -->
                      <circle cx="54" cy="65" r="3" fill="#2C1810"/>
                      <circle cx="74" cy="65" r="3" fill="#2C1810"/>
                      <circle cx="55" cy="64" r="1" fill="#FFFFFF"/>
                      <circle cx="75" cy="64" r="1" fill="#FFFFFF"/>
                      <!-- Smile -->
                      <path d="M 52 80 Q 64 88 76 80" stroke="#D4AF37" stroke-width="2" fill="none"/>
                      <!-- Sweater -->
                      <ellipse cx="64" cy="115" rx="45" ry="20" fill="#F0E68C"/>
                    </svg>
                  `)}`;
                }}
              />
            </div>
          </SpringElement>
        </div>

        {/* Welcome Title - Mobile Optimized */}
        <div className="mb-8 md:mb-12">
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

        <p className="text-sm md:text-base text-soft-black/60 mb-20 md:mb-24 leading-relaxed max-w-2xl mx-auto">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more meaningful, intentional, and human. Let's tend to these ideas and see what they grow into.
        </p>

        {/* Contact Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
          <p className="text-sm text-muted-grey">
            Interested in collaborating or just want to chat? Reach out at{' '}
            <CopyEmail className="text-warm-brown hover:text-hover-brown transition-colors duration-200 no-underline" email="coreydavidwu@gmail.com">
              coreydavidwu@gmail.com
            </CopyEmail>
          </p>
        </footer>
      </div>
    </div>
  );
}