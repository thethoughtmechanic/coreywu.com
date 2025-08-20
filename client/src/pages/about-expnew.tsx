
import { useState } from "react";
import { X } from "lucide-react";

export default function AboutExpNew() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>("shake");

  const systemPromptRoles = [
    "Product Manager",
    "Strategic Futurist",
    "Service Designer", 
    "Game Designer",
    "Guitarist",
    "Foodie",
    "Husband + Father",
    "Human"
  ];

  const treatments = [
    { id: "shake", name: "Shake Animation", description: "Cards shake when hovered" },
    { id: "glow", name: "Special Glow Border", description: "Unique glowing border effect" },
    { id: "click-icon", name: "Click Icon", description: "Shows click indicator on special cards" },
    { id: "pulse", name: "Pulse Effect", description: "Gentle pulsing animation" },
    { id: "scale-rotate", name: "Scale + Rotate", description: "Combined scale and rotation effect" },
    { id: "neon", name: "Neon Outline", description: "Animated neon border effect" },
    { id: "floating", name: "Floating Effect", description: "Subtle floating animation" },
    { id: "spotlight", name: "Spotlight", description: "Special spotlight effect" }
  ];

  const isSpecialCard = (role: string) => {
    return role === "Strategic Futurist" || role === "Game Designer";
  };

  const getCardClasses = (role: string, index: number) => {
    const baseClasses = "relative group bg-light-brown rounded-lg p-4 text-center text-sm text-soft-black/80 leading-relaxed hover:shadow-xl transition-all duration-500 border border-warm-brown/20 hover:border-warm-brown/30 overflow-hidden cursor-pointer";
    
    if (!isSpecialCard(role)) return baseClasses;

    switch (selectedTreatment) {
      case "shake":
        return `${baseClasses} hover:animate-pulse group-hover:animate-shake`;
      case "glow":
        return `${baseClasses} hover:shadow-2xl hover:shadow-purple-500/50`;
      case "click-icon":
        return baseClasses;
      case "pulse":
        return `${baseClasses} animate-pulse`;
      case "scale-rotate":
        return `${baseClasses} hover:scale-110 hover:rotate-2`;
      case "neon":
        return `${baseClasses} hover:shadow-neon`;
      case "floating":
        return `${baseClasses} animate-float`;
      case "spotlight":
        return `${baseClasses} hover:shadow-spotlight`;
      default:
        return baseClasses;
    }
  };

  const getSpecialStyles = (role: string) => {
    if (!isSpecialCard(role)) return {};

    switch (selectedTreatment) {
      case "glow":
        return {
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)"
        };
      case "neon":
        return {
          border: "2px solid transparent",
          background: "linear-gradient(45deg, #a855f7, #ec4899) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "subtract"
        };
      case "spotlight":
        return {
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
        };
      default:
        return {};
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="text-center mb-8 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Special Card Treatment Showcase
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed mb-8">
          Exploring different visual treatments for Strategic Futurist and Game Designer cards
        </p>

        {/* Treatment Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {treatments.map((treatment) => (
            <button
              key={treatment.id}
              onClick={() => setSelectedTreatment(treatment.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTreatment === treatment.id
                  ? "bg-warm-brown text-cream shadow-lg"
                  : "bg-light-brown text-warm-brown hover:bg-warm-brown/20"
              }`}
            >
              {treatment.name}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-warm-brown mb-2">
            Current Treatment: {treatments.find(t => t.id === selectedTreatment)?.name}
          </h3>
          <p className="text-sm text-muted-grey">
            {treatments.find(t => t.id === selectedTreatment)?.description}
          </p>
        </div>
      </header>

      {/* System Prompt Role Cards */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {systemPromptRoles.map((role, index) => (
            <div
              key={index}
              className={getCardClasses(role, index)}
              style={isSpecialCard(role) ? getSpecialStyles(role) : {}}
              data-testid={`card-role-${index}`}
            >
              {/* Paint Splatter Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"
                style={{
                  background: index === 0 ? `
                    radial-gradient(ellipse 240px 180px at 25% 15%, #22c55e 0%, #22c55e 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 75% 25%, #16a34a 0%, #16a34a 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 15% 85%, #15803d 0%, #15803d 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 85% 80%, #84cc16 0%, #84cc16 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #65a30d 0%, #65a30d 40%, transparent 80%)
                  ` : index === 1 ? `
                    radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
                  ` : index === 2 ? `
                    radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
                    radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
                    radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
                    radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
                  ` : index === 3 ? `
                    radial-gradient(ellipse 235px 175px at 20% 15%, #a855f7 0%, #a855f7 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 80% 25%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 10% 85%, #9333ea 0%, #9333ea 50%, transparent 90%),
                    radial-gradient(ellipse 225px 135px at 90% 80%, #d946ef 0%, #d946ef 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 40% 45%, #7c3aed 0%, #7c3aed 40%, transparent 80%)
                  ` : index === 4 ? `
                    radial-gradient(ellipse 240px 180px at 15% 20%, #ef4444 0%, #ef4444 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 85% 30%, #eab308 0%, #eab308 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 10% 90%, #dc2626 0%, #dc2626 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 90% 70%, #22c55e 0%, #22c55e 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 40%, #f97316 0%, #f97316 40%, transparent 80%)
                  ` : index === 5 ? `
                    radial-gradient(ellipse 230px 170px at 25% 25%, #3b82f6 0%, #3b82f6 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 75% 15%, #6366f1 0%, #6366f1 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 5% 85%, #1d4ed8 0%, #1d4ed8 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 95% 90%, #8b5cf6 0%, #8b5cf6 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 35%, #2563eb 0%, #2563eb 40%, transparent 80%)
                  ` : index === 6 ? `
                    radial-gradient(ellipse 245px 185px at 20% 10%, #f97316 0%, #f97316 45%, transparent 85%),
                    radial-gradient(ellipse 215px 165px at 80% 30%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 195px 225px at 10% 85%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 225px 145px at 90% 80%, #a855f7 0%, #a855f7 35%, transparent 75%),
                    radial-gradient(ellipse 185px 195px at 50% 45%, #d946ef 0%, #d946ef 40%, transparent 80%)
                  ` : `
                    radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
                    radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

              {/* Special Glow Effects for Special Cards */}
              {isSpecialCard(role) && selectedTreatment === "glow" && (
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20 blur-sm" />
              )}

              {/* Neon Border Effect */}
              {isSpecialCard(role) && selectedTreatment === "neon" && (
                <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "subtract"}} />
              )}

              {/* Content */}
              <span className={`relative z-10 transition-all duration-500 ${
                isSpecialCard(role) ? "group-hover:text-white group-hover:font-bold group-hover:scale-110" :
                "group-hover:text-white group-hover:font-semibold"
              }`}>
                {role}
              </span>

              {/* Click Icon for Special Cards */}
              {isSpecialCard(role) && selectedTreatment === "click-icon" && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-warm-brown" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Floating Animation Dots */}
              {isSpecialCard(role) && selectedTreatment === "floating" && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
                  <div className="absolute top-3 right-3 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
                  <div className="absolute bottom-2 left-3 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '1s'}} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-light-brown rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium text-warm-brown mb-4">About This Showcase</h3>
        <p className="text-sm text-soft-black/80 mb-4">
          This page demonstrates various visual treatments that can be applied to special cards (Strategic Futurist and Game Designer) 
          to make them stand out from regular cards. Each treatment combines the existing paint splatter effect with additional special effects.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-soft-black/70">
          <div>
            <h4 className="font-medium text-warm-brown mb-2">Special Cards:</h4>
            <ul className="space-y-1">
              <li>• Strategic Futurist</li>
              <li>• Game Designer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warm-brown mb-2">Regular Cards:</h4>
            <ul className="space-y-1">
              <li>• All other role cards</li>
              <li>• Standard hover effects only</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}
