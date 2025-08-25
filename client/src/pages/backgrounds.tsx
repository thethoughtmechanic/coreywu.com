
import { useState } from "react";

export default function Backgrounds() {
  const [selectedSection, setSelectedSection] = useState<string>("experiments");

  // Background texture configurations for different sections
  const backgroundOptions = {
    experiments: [
      {
        name: "Blueprint Grid (Current)",
        description: "Rotated grid pattern suggesting technical blueprints and engineering",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: 
            linear-gradient(rgba(139, 115, 85, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 115, 85, 0.06) 1px, transparent 1px),
            linear-gradient(rgba(139, 115, 85, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 115, 85, 0.04) 1px, transparent 1px);
          background-size: 40px 40px, 40px 40px, 8px 8px, 8px 8px;
          transform: rotate(12deg) scale(1.4);
          transform-origin: center;
          pointer-events: none;
        `
      },
      {
        name: "Circuit Board",
        description: "Tech-inspired circuit patterns for digital innovation",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10,10 L30,10 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70' stroke='rgba(139,115,85,0.08)' stroke-width='1' fill='none'/%3E%3Cpath d='M10,50 L20,50 L20,20 L40,20 L40,40 L60,40 L60,80 L80,80' stroke='rgba(139,115,85,0.06)' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='30' r='2' fill='rgba(139,115,85,0.1)'/%3E%3Ccircle cx='50' cy='50' r='2' fill='rgba(139,115,85,0.1)'/%3E%3Ccircle cx='70' cy='70' r='2' fill='rgba(139,115,85,0.1)'/%3E%3C/svg%3E");
          background-size: 60px 60px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Hexagon Pattern",
        description: "Geometric hexagons for structured innovation",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='25,20 35,15 45,20 45,30 35,35 25,30' stroke='rgba(139,115,85,0.06)' stroke-width='0.5' fill='none'/%3E%3Cpolygon points='55,35 65,30 75,35 75,45 65,50 55,45' stroke='rgba(139,115,85,0.08)' stroke-width='0.5' fill='none'/%3E%3Cpolygon points='25,50 35,45 45,50 45,60 35,65 25,60' stroke='rgba(139,115,85,0.05)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Dot Matrix",
        description: "Simple dot pattern for clean, minimal tech aesthetic",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: radial-gradient(circle, rgba(139,115,85,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-repeat: repeat;
          pointer-events: none;
        `
      }
    ],
    thoughts: [
      {
        name: "Organic Scribbles (Current)",
        description: "Hand-drawn flowing lines suggesting natural creativity",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M20,50 Q40,30 60,50 T100,50 Q120,30 140,50 T180,50' stroke='rgba(139,115,85,0.08)' stroke-width='1.5' fill='none'/%3E%3Cpath d='M30,80 Q50,60 70,80 T110,80 Q130,60 150,80 T190,80' stroke='rgba(139,115,85,0.06)' stroke-width='1' fill='none'/%3E%3Cpath d='M10,110 Q30,90 50,110 T90,110 Q110,90 130,110 T170,110' stroke='rgba(139,115,85,0.1)' stroke-width='1.2' fill='none'/%3E%3Cpath d='M40,140 Q60,120 80,140 T120,140 Q140,120 160,140 T200,140' stroke='rgba(139,115,85,0.05)' stroke-width='0.8' fill='none'/%3E%3Cpath d='M15,170 Q35,150 55,170 T95,170 Q115,150 135,170 T175,170' stroke='rgba(139,115,85,0.08)' stroke-width='1.3' fill='none'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Vine Growth",
        description: "Growing vines and leaves for garden metaphor",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Cpath d='M10,20 Q30,10 50,25 Q70,40 90,30 Q110,20 130,35' stroke='rgba(139,115,85,0.06)' stroke-width='2' fill='none'/%3E%3Cellipse cx='25' cy='18' rx='3' ry='6' fill='rgba(139,115,85,0.08)' transform='rotate(30 25 18)'/%3E%3Cellipse cx='65' cy='35' rx='3' ry='6' fill='rgba(139,115,85,0.06)' transform='rotate(-20 65 35)'/%3E%3Cellipse cx='105' cy='25' rx='3' ry='6' fill='rgba(139,115,85,0.08)' transform='rotate(45 105 25)'/%3E%3Cpath d='M20,80 Q40,70 60,85 Q80,100 100,90 Q120,80 140,95' stroke='rgba(139,115,85,0.05)' stroke-width='2' fill='none'/%3E%3C/svg%3E");
          background-size: 120px 120px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Brain Neurons",
        description: "Neural network patterns for thought connections",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='50' cy='50' r='3' fill='rgba(139,115,85,0.08)'/%3E%3Ccircle cx='150' cy='80' r='2' fill='rgba(139,115,85,0.06)'/%3E%3Ccircle cx='80' cy='150' r='2.5' fill='rgba(139,115,85,0.07)'/%3E%3Cpath d='M50,50 Q100,30 150,80' stroke='rgba(139,115,85,0.05)' stroke-width='1' fill='none'/%3E%3Cpath d='M150,80 Q120,120 80,150' stroke='rgba(139,115,85,0.04)' stroke-width='1' fill='none'/%3E%3Cpath d='M80,150 Q40,120 50,50' stroke='rgba(139,115,85,0.06)' stroke-width='1' fill='none'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Paper Texture",
        description: "Subtle paper grain for writing and journaling feel",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='paper'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          background-repeat: repeat;
          pointer-events: none;
        `
      }
    ],
    about: [
      {
        name: "Clean Minimal",
        description: "No texture - clean focus on content",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
        `
      },
      {
        name: "Subtle Grain",
        description: "Very light texture for warmth without distraction",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='grain'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='2' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23grain)' opacity='0.015'/%3E%3C/svg%3E");
          background-size: 50px 50px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Connect Dots",
        description: "Connection points suggesting network and collaboration",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='50' cy='50' r='1.5' fill='rgba(139,115,85,0.06)'/%3E%3Ccircle cx='150' cy='50' r='1' fill='rgba(139,115,85,0.04)'/%3E%3Ccircle cx='100' cy='150' r='1.2' fill='rgba(139,115,85,0.05)'/%3E%3Cpath d='M50,50 L150,50 L100,150 L50,50' stroke='rgba(139,115,85,0.02)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
          background-size: 150px 150px;
          background-repeat: repeat;
          pointer-events: none;
        `
      },
      {
        name: "Timeline Marks",
        description: "Subtle timeline-inspired marks for professional context",
        css: `
          position: relative;
        `,
        before: `
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cline x1='10' y1='20' x2='15' y2='20' stroke='rgba(139,115,85,0.04)' stroke-width='1'/%3E%3Cline x1='10' y1='40' x2='20' y2='40' stroke='rgba(139,115,85,0.06)' stroke-width='1'/%3E%3Cline x1='10' y1='60' x2='15' y2='60' stroke='rgba(139,115,85,0.05)' stroke-width='1'/%3E%3Cline x1='10' y1='80' x2='18' y2='80' stroke='rgba(139,115,85,0.04)' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          background-repeat: repeat;
          pointer-events: none;
        `
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Background Texture Explorer
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto mb-8">
          Explore different background texture options for each section of your site. 
          Each texture is designed to reinforce the section's purpose and mood.
        </p>
      </header>

      {/* Section Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex rounded-lg bg-light-brown/50 p-1">
          {Object.keys(backgroundOptions).map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedSection === section
                  ? 'bg-warm-brown text-cream shadow-sm'
                  : 'text-warm-brown hover:bg-warm-brown/10'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Background Options Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {backgroundOptions[selectedSection as keyof typeof backgroundOptions].map((option, index) => (
          <div key={index} className="group">
            {/* Preview Card */}
            <div className="bg-white rounded-lg border border-warm-brown/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Background Preview */}
              <div 
                className="h-48 relative bg-gradient-to-br from-cream/30 to-light-brown/20"
                style={{
                  backgroundImage: option.before ? undefined : 'none'
                }}
              >
                {/* Apply the background texture */}
                <div 
                  className={option.css}
                  style={{
                    position: 'absolute',
                    inset: 0,
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: -1,
                      ...(() => {
                        // Parse the before pseudo-element CSS
                        const rules = option.before.split(';').reduce((acc: any, rule) => {
                          const [prop, value] = rule.split(':').map(s => s.trim());
                          if (prop && value && prop !== 'content' && prop !== 'pointer-events') {
                            const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                            acc[camelProp] = value;
                          }
                          return acc;
                        }, {});
                        return rules;
                      })()
                    }}
                  />
                </div>

                {/* Sample Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-warm-brown/10">
                    <h4 className="text-lg font-medium text-warm-brown mb-2">
                      Sample {selectedSection} content
                    </h4>
                    <p className="text-sm text-soft-black/70">
                      This shows how content would appear over the background texture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option Details */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-warm-brown mb-2">
                  {option.name}
                </h3>
                <p className="text-sm text-soft-black/70 mb-4">
                  {option.description}
                </p>

                {/* CSS Preview */}
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-warm-brown hover:text-hover-brown">
                    View CSS Code
                  </summary>
                  <div className="mt-3 p-3 bg-gray-50 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-gray-600 mb-2">/* Container */</div>
                    <div className="whitespace-pre-wrap">{option.css}</div>
                    <div className="text-gray-600 mt-3 mb-2">/* ::before pseudo-element */</div>
                    <div className="whitespace-pre-wrap">{option.before}</div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Notes */}
      <div className="mt-12 bg-light-brown/30 rounded-xl p-6">
        <h3 className="text-lg font-medium text-warm-brown mb-4">Implementation Notes</h3>
        <div className="space-y-3 text-sm text-soft-black/80">
          <p>
            <strong>Experiments:</strong> Technical patterns reinforce innovation and systematic building.
          </p>
          <p>
            <strong>Thoughts:</strong> Organic, flowing patterns support creative expression and idea development.
          </p>
          <p>
            <strong>About:</strong> Minimal patterns keep focus on personal narrative and professional content.
          </p>
          <p className="text-warm-brown/70 italic">
            All textures use CSS-only implementations for optimal performance and maintainability.
          </p>
        </div>
      </div>

      {/* Contact Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Want to discuss these background options? Reach out at{' '}
          <a 
            href="mailto:coreydavidwu@gmail.com"
            className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
          >
            coreydavidwu@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
