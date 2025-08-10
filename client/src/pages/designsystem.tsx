
import React, { useState } from 'react';

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState('colors');

  const paintSplatters = [
    {
      name: 'Product Manager Splatter',
      colors: ['#4A7C59', '#6B9080', '#A4C3A2'],
      className: 'bg-gradient-to-br from-green-600 via-green-500 to-green-400',
      shape: 'irregular-blob-1'
    },
    {
      name: 'Guitarist Splatter',
      colors: ['#8B4513', '#CD853F', '#D2691E'],
      className: 'bg-gradient-to-br from-amber-700 via-amber-600 to-orange-500',
      shape: 'irregular-blob-2'
    },
    {
      name: 'Developer Splatter',
      colors: ['#4169E1', '#6495ED', '#87CEEB'],
      className: 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400',
      shape: 'irregular-blob-3'
    },
    {
      name: 'Designer Splatter',
      colors: ['#9370DB', '#BA55D3', '#DA70D6'],
      className: 'bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400',
      shape: 'irregular-blob-4'
    },
    {
      name: 'Entrepreneur Splatter',
      colors: ['#FF6347', '#FF7F50', '#FFA07A'],
      className: 'bg-gradient-to-br from-red-500 via-orange-500 to-orange-400',
      shape: 'irregular-blob-5'
    },
    {
      name: 'Strategist Splatter',
      colors: ['#2E8B57', '#3CB371', '#90EE90'],
      className: 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400',
      shape: 'irregular-blob-6'
    },
    {
      name: 'Creative Splatter',
      colors: ['#FF1493', '#FF69B4', '#FFB6C1'],
      className: 'bg-gradient-to-br from-pink-600 via-pink-500 to-pink-400',
      shape: 'irregular-blob-7'
    },
    {
      name: 'Analyst Splatter',
      colors: ['#4682B4', '#5F9EA0', '#87CEEB'],
      className: 'bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400',
      shape: 'irregular-blob-8'
    }
  ];

  const sections = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'components', label: 'Components' },
    { id: 'splatters', label: 'Paint Splatters' },
    { id: 'patterns', label: 'Design Patterns' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">Design System</h1>
        <p className="text-muted-grey max-w-2xl mx-auto">
          A comprehensive guide to the visual language, components, and design patterns that make up this digital garden experience.
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center mb-12">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-warm-brown text-cream'
                  : 'bg-light-brown text-warm-brown hover:bg-warm-brown/10'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Colors Section */}
      {activeSection === 'colors' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Color Palette</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Primary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cream border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Cream</div>
                    <div className="text-xs text-muted-grey">hsl(35, 80%, 99%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-warm-brown border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Warm Brown</div>
                    <div className="text-xs text-muted-grey">hsl(28, 30%, 55%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-soft-black border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Soft Black</div>
                    <div className="text-xs text-muted-grey">hsl(25, 25%, 22%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Secondary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-light-brown border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Light Brown</div>
                    <div className="text-xs text-muted-grey">hsl(35, 20%, 94%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-hover-brown border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Hover Brown</div>
                    <div className="text-xs text-muted-grey">hsl(28, 28%, 43%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted-grey border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Muted Grey</div>
                    <div className="text-xs text-muted-grey">hsl(220, 13%, 64%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garden View Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Garden View</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-soft-cream border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Soft Cream</div>
                    <div className="text-xs text-muted-grey">hsl(42, 15%, 97%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border-2 border-warm-brown/30" style={{ backgroundColor: '#8B7355' }}></div>
                  <div>
                    <div className="font-medium text-sm">Connection Brown</div>
                    <div className="text-xs text-muted-grey">#8B7355</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Accent</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-active-green border-2 border-warm-brown/30"></div>
                  <div>
                    <div className="font-medium text-sm">Active Green</div>
                    <div className="text-xs text-muted-grey">hsl(142, 71%, 45%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Colors Section */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-warm-brown mb-6">Gradient Colors</h3>
            <p className="text-sm text-muted-grey mb-6">Colors used in thought card gradients and visual elements</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Green Family */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Green Family</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#059669' }}></div>
                    <span className="text-xs">#059669</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#0891b2' }}></div>
                    <span className="text-xs">#0891b2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#0d9488' }}></div>
                    <span className="text-xs">#0d9488</span>
                  </div>
                </div>
              </div>

              {/* Blue Family */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Blue Family</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#0284c7' }}></div>
                    <span className="text-xs">#0284c7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#0ea5e9' }}></div>
                    <span className="text-xs">#0ea5e9</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#06b6d4' }}></div>
                    <span className="text-xs">#06b6d4</span>
                  </div>
                </div>
              </div>

              {/* Orange/Red Family */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Orange/Red</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span className="text-xs">#f59e0b</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#dc2626' }}></div>
                    <span className="text-xs">#dc2626</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#ea580c' }}></div>
                    <span className="text-xs">#ea580c</span>
                  </div>
                </div>
              </div>

              {/* Yellow Family */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Yellow</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#facc15' }}></div>
                    <span className="text-xs">#facc15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#ef4444' }}></div>
                    <span className="text-xs">#ef4444</span>
                  </div>
                </div>
              </div>

              {/* Purple Family */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Purple</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#a855f7' }}></div>
                    <span className="text-xs">#a855f7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#ec4899' }}></div>
                    <span className="text-xs">#ec4899</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border border-warm-brown/30" style={{ backgroundColor: '#9333ea' }}></div>
                    <span className="text-xs">#9333ea</span>
                  </div>
                </div>
              </div>

              {/* Neutral Variants */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-warm-brown">Neutrals</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-white border-2 border-warm-brown/30"></div>
                    <span className="text-xs">White</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-stone-50 border-2 border-warm-brown/30"></div>
                    <span className="text-xs">Stone 50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gray-400 border border-warm-brown/30"></div>
                    <span className="text-xs">Gray 400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shadow Colors */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-warm-brown mb-6">Shadow & Effects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-warm-brown mb-3">Shadow Variants</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg shadow-soft border border-warm-brown/10"></div>
                    <div>
                      <div className="text-sm font-medium">Soft Shadow</div>
                      <div className="text-xs text-muted-grey">Used on garden cards</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg shadow-md"></div>
                    <div>
                      <div className="text-sm font-medium">Medium Shadow</div>
                      <div className="text-xs text-muted-grey">Default card shadow</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg shadow-lg"></div>
                    <div>
                      <div className="text-sm font-medium">Large Shadow</div>
                      <div className="text-xs text-muted-grey">Hover state shadow</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-warm-brown mb-3">Border Colors</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg border border-warm-brown/10"></div>
                    <div>
                      <div className="text-sm font-medium">Subtle Border</div>
                      <div className="text-xs text-muted-grey">warm-brown/10</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg border border-warm-brown/20"></div>
                    <div>
                      <div className="text-sm font-medium">Standard Border</div>
                      <div className="text-xs text-muted-grey">warm-brown/20</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-lg border border-warm-brown/30"></div>
                    <div>
                      <div className="text-sm font-medium">Emphasized Border</div>
                      <div className="text-xs text-muted-grey">warm-brown/30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Typography Section */}
      {activeSection === 'typography' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Typography</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Font Family</h3>
              <p className="text-soft-black">Primary: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Type Scale</h3>
              <div className="space-y-4">
                <div className="text-4xl font-light text-warm-brown">Heading 1 - 36px Light</div>
                <div className="text-3xl font-light text-warm-brown">Heading 2 - 30px Light</div>
                <div className="text-2xl font-medium text-warm-brown">Heading 3 - 24px Medium</div>
                <div className="text-xl font-medium text-warm-brown">Heading 4 - 20px Medium</div>
                <div className="text-lg font-medium text-warm-brown">Heading 5 - 18px Medium</div>
                <div className="text-base text-soft-black">Body Large - 16px Regular</div>
                <div className="text-sm text-soft-black">Body Small - 14px Regular</div>
                <div className="text-xs text-muted-grey">Caption - 12px Regular</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Spacing Section */}
      {activeSection === 'spacing' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Spacing & Layout</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Spacing Scale</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div className={`bg-warm-brown h-4`} style={{ width: `${size * 4}px` }}></div>
                    <span className="text-sm text-soft-black">{size} = {size * 4}px</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Border Radius</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-brown rounded-sm border border-warm-brown/20"></div>
                  <span className="text-sm text-soft-black">Small - 2px</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-brown rounded border border-warm-brown/20"></div>
                  <span className="text-sm text-soft-black">Medium - 6px</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-brown rounded-lg border border-warm-brown/20"></div>
                  <span className="text-sm text-soft-black">Large - 8px</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-brown rounded-xl border border-warm-brown/20"></div>
                  <span className="text-sm text-soft-black">Extra Large - 12px</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-brown rounded-full border border-warm-brown/20"></div>
                  <span className="text-sm text-soft-black">Full - 9999px</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Components Section */}
      {activeSection === 'components' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Component Library</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Buttons</h3>
              <div className="space-y-3">
                <button className="bg-warm-brown text-cream px-4 py-2 rounded-lg hover:bg-hover-brown transition-colors duration-200">
                  Primary Button
                </button>
                <button className="border border-warm-brown/30 text-warm-brown px-4 py-2 rounded-lg hover:bg-warm-brown hover:text-cream transition-colors duration-200">
                  Secondary Button
                </button>
                <button className="text-warm-brown px-4 py-2 rounded-lg hover:bg-warm-brown/10 transition-colors duration-200">
                  Text Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Cards</h3>
              <div className="bg-light-brown rounded-lg p-4 border border-warm-brown/20">
                <h4 className="font-medium text-warm-brown mb-2">Card Title</h4>
                <p className="text-sm text-soft-black">Card content goes here with proper spacing and typography.</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">Navigation</h3>
              <div className="bg-cream/70 border border-warm-brown/20 rounded-lg p-4">
                <div className="flex gap-4">
                  <a href="#" className="text-warm-brown hover:text-hover-brown transition-colors duration-200">Home</a>
                  <a href="#" className="text-warm-brown hover:text-hover-brown transition-colors duration-200">About</a>
                  <a href="#" className="text-warm-brown hover:text-hover-brown transition-colors duration-200">Thoughts</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Paint Splatters Section */}
      {activeSection === 'splatters' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Paint Splatter Collection</h2>
          <p className="text-muted-grey mb-8">
            These colorful paint splatter patterns are used throughout the application to add visual interest and personality to hover states and interactive elements.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paintSplatters.map((splatter, index) => (
              <div key={index} className="space-y-4">
                <div className="relative group">
                  {/* Splatter Shape */}
                  <div className="relative w-full h-32 bg-light-brown rounded-lg border border-warm-brown/20 overflow-hidden">
                    <div 
                      className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 rounded-lg"
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
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-warm-brown text-sm mb-2">{splatter.name}</h3>
                  <div className="flex gap-2 mb-2">
                    {splatter.colors.map((color, colorIndex) => (
                      <div 
                        key={colorIndex}
                        className="w-6 h-6 rounded-full border border-warm-brown/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <code className="text-xs text-muted-grey bg-light-brown px-2 py-1 rounded">
                    {splatter.className}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Examples */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-warm-brown mb-6">Usage Examples</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-warm-brown">Hover Card Effect</h4>
                <div className="relative group cursor-pointer">
                  <div className="bg-light-brown rounded-lg p-6 border border-warm-brown/20 transition-all duration-300 group-hover:scale-105">
                    <h5 className="font-medium text-warm-brown mb-2">Sample Card</h5>
                    <p className="text-sm text-soft-black">Hover to see the splatter effect</p>
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 rounded-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300 -z-10"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      transform: 'scale(1.1)'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-warm-brown">Background Pattern</h4>
                <div className="relative h-32 bg-light-brown rounded-lg border border-warm-brown/20 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 opacity-60"
                    style={{
                      clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)'
                    }}
                  />
                  <div className="relative z-10 p-4 text-cream">
                    <p className="text-sm">Content overlaid on splatter background</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Design Patterns Section */}
      {activeSection === 'patterns' && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-warm-brown mb-6">Design Patterns</h2>
          
          <div className="space-y-8">
            {/* Layout Patterns */}
            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Layout Patterns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-warm-brown">Card Grid</h4>
                  <p className="text-sm text-muted-grey">Responsive grid layout with consistent spacing</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-light-brown rounded border border-warm-brown/20"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-warm-brown">Stacked Layout</h4>
                  <p className="text-sm text-muted-grey">Vertical stacking with proper spacing</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-light-brown rounded border border-warm-brown/20"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Patterns */}
            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Interaction Patterns</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-warm-brown mb-2">Hover States</h4>
                  <p className="text-sm text-muted-grey mb-3">Subtle transitions with color changes and scale effects</p>
                  <div className="flex gap-3">
                    <div className="px-4 py-2 bg-light-brown rounded hover:bg-warm-brown hover:text-cream transition-colors duration-200 cursor-pointer">
                      Hover me
                    </div>
                    <div className="px-4 py-2 bg-light-brown rounded hover:scale-105 transition-transform duration-200 cursor-pointer">
                      Scale effect
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-warm-brown mb-2">Loading States</h4>
                  <p className="text-sm text-muted-grey mb-3">Subtle animations for loading content</p>
                  <div className="flex gap-3">
                    <div className="w-16 h-4 bg-light-brown rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-light-brown rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-light-brown rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Patterns */}
            <div>
              <h3 className="text-lg font-medium text-warm-brown mb-4">Content Patterns</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-warm-brown mb-2">Information Hierarchy</h4>
                  <p className="text-sm text-muted-grey mb-3">Clear visual hierarchy using typography and spacing</p>
                  <div className="bg-light-brown rounded-lg p-6 border border-warm-brown/20">
                    <h5 className="text-lg font-medium text-warm-brown mb-2">Primary Heading</h5>
                    <p className="text-sm text-muted-grey mb-4">Supporting description text</p>
                    <div className="text-xs text-soft-black">Additional details in smaller text</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
