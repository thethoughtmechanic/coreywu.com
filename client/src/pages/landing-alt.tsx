
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
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center py-6 md:py-8">
      <div className="text-center w-full">
        {/* Draggable Headshot - positioned above the welcome text */}
        <div className="mb-8 flex justify-center">
          <SpringElement 
            className="flex items-center justify-center"
            springClassName="stroke-2 stroke-warm-brown/60 fill-none"
            springConfig={{ stiffness: 150, damping: 12 }}
            springPathConfig={{
              coilCount: 6,
              amplitudeMin: 12,
              amplitudeMax: 25,
              curveRatioMin: 0.6,
              curveRatioMax: 1.2,
              bezierOffset: 10
            }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white/80 hover:border-warm-brown/60 transition-all duration-300">
              <img 
                src={headshotImage}
                alt="Corey Wu - Draggable headshot"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: '50% 20%', transform: 'scale(1.2)' }}
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
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-warm-brown leading-tight px-2 whitespace-nowrap" data-testid="text-home-title">
            <TypingText 
              text="Welcome to my digital garden."
              duration={80}
              delay={500}
              cursor={false}
              className="inline whitespace-nowrap"
            />
          </h1>
        </div>

        <p className="text-sm md:text-base text-soft-black/60 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more meaningful, intentional, and human. Let's tend to these ideas and see what they grow into.
        </p>

        {/* Fun interaction hint */}
        <p className="text-xs text-warm-brown/60 mb-8 italic">
          ✨ Try dragging my head around for some fun!
        </p>

        {/* Three Card Navigation - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 max-w-xs lg:max-w-none mx-auto">
          {/* About Me Card */}
          <Link href="/about">
            <div 
              className="relative bg-light-brown rounded-xl p-4 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-32 lg:h-64 flex flex-col overflow-hidden"
              data-testid="card-about"
            >
              {/* Paint Splatter Background for About Me */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl overflow-hidden"
                style={{
                  background: `
                    radial-gradient(ellipse 120% 100% at 25% 15%, #8b5cf6 0%, #8b5cf6 50%, transparent 90%),
                    radial-gradient(ellipse 110% 85% at 75% 25%, #ec4899 0%, #ec4899 45%, transparent 85%),
                    radial-gradient(ellipse 100% 120% at 15% 85%, #a855f7 0%, #a855f7 55%, transparent 95%),
                    radial-gradient(ellipse 120% 75% at 85% 80%, #d946ef 0%, #d946ef 40%, transparent 80%),
                    radial-gradient(ellipse 110% 110% at 50% 50%, #9333ea 0%, #9333ea 45%, transparent 85%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 lg:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-lg lg:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">About Me</h2>
                <p className="hidden lg:block text-soft-black/70 text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500">
                  Learn who I am through my system prompts and journey
                </p>
              </div>
            </div>
          </Link>

          {/* Thoughts Card */}
          <Link href="/thoughts">
            <div 
              className="relative bg-light-brown rounded-xl p-4 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-32 lg:h-64 flex flex-col overflow-hidden"
              data-testid="card-thoughts"
            >
              {/* Paint Splatter Background for Thoughts */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl overflow-hidden"
                style={{
                  background: `
                    radial-gradient(ellipse 120% 100% at 25% 15%, #f59e0b 0%, #f59e0b 55%, transparent 95%),
                    radial-gradient(ellipse 110% 90% at 75% 25%, #dc2626 0%, #dc2626 50%, transparent 90%),
                    radial-gradient(ellipse 100% 120% at 15% 80%, #ea580c 0%, #ea580c 60%, transparent 100%),
                    radial-gradient(ellipse 110% 85% at 85% 90%, #facc15 0%, #facc15 45%, transparent 85%),
                    radial-gradient(ellipse 105% 110% at 50% 60%, #ef4444 0%, #ef4444 50%, transparent 90%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 lg:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-lg lg:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">Thoughts</h2>
                <p className="hidden lg:block text-soft-black/70 text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500">
                  Reflections on design, strategy, and the intersection of technology and humanity
                </p>
              </div>
            </div>
          </Link>

          {/* Experiments Card */}
          <Link href="/experiments">
            <div 
              className="relative bg-light-brown rounded-xl p-4 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer group border border-warm-brown/10 hover:border-warm-brown/30 h-32 lg:h-64 flex flex-col overflow-hidden"
              data-testid="card-experiments"
            >
              {/* Paint Splatter Background for Experiments */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl overflow-hidden"
                style={{
                  background: `
                    radial-gradient(ellipse 115% 105% at 35% 25%, #06b6d4 0%, #06b6d4 50%, transparent 90%),
                    radial-gradient(ellipse 105% 80% at 75% 20%, #0891b2 0%, #0891b2 45%, transparent 85%),
                    radial-gradient(ellipse 95% 115% at 15% 80%, #0e7490 0%, #0e7490 55%, transparent 95%),
                    radial-gradient(ellipse 115% 85% at 85% 75%, #22d3ee 0%, #22d3ee 40%, transparent 80%),
                    radial-gradient(ellipse 90% 100% at 50% 45%, #0284c7 0%, #0284c7 45%, transparent 85%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-xl" />

              <div className="relative z-10 text-center space-y-2 lg:space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 group-hover:bg-white/90">
                  <svg className="w-5 h-5 lg:w-8 lg:h-8 text-cream group-hover:text-warm-brown transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-lg lg:text-xl font-medium text-warm-brown group-hover:text-white group-hover:font-semibold transition-all duration-500">Experiments</h2>
                <p className="hidden lg:block text-soft-black/70 text-sm leading-relaxed group-hover:text-white/90 transition-all duration-500">
                  Projects and prototypes exploring how to make things better
                </p>
              </div>
            </div>
          </Link>
        </div>

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
