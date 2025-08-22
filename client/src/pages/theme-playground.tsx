
import React from 'react';
import { ThemeSwitcher } from '../components/theme-switcher';
import { useTheme } from '../contexts/theme-context';

export default function ThemePlayground() {
  const { currentTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-foreground mb-4">Theme Playground</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experiment with different design systems and see how they transform the entire experience.
        </p>
      </header>

      {/* Theme Switcher */}
      <div className="mb-12">
        <ThemeSwitcher variant="expanded" />
      </div>

      {/* Live Preview */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-medium text-foreground mb-6">Live Preview</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Typography Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">Typography</h3>
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">Heading 1</h1>
                <h2 className="text-xl font-semibold">Heading 2</h2>
                <p className="text-base">Body text with regular weight</p>
                <p className="text-sm text-muted-foreground">Muted text for less emphasis</p>
              </div>
            </div>

            {/* Colors Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">Colors</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="w-full h-8 bg-primary rounded"></div>
                  <span className="text-xs">Primary</span>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-8 bg-secondary rounded"></div>
                  <span className="text-xs">Secondary</span>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-8 bg-accent rounded"></div>
                  <span className="text-xs">Accent</span>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-8 bg-muted rounded"></div>
                  <span className="text-xs">Muted</span>
                </div>
              </div>
            </div>

            {/* Components Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">Components</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                  Primary Button
                </button>
                <button className="w-full border border-border text-foreground px-4 py-2 rounded-md hover:bg-muted transition-colors">
                  Secondary Button
                </button>
                <input 
                  type="text" 
                  placeholder="Input field"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Current Theme Info */}
        <section>
          <h2 className="text-2xl font-medium text-foreground mb-6">Current Theme Details</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-card-foreground mb-4">{currentTheme.name}</h3>
            <p className="text-muted-foreground mb-4">{currentTheme.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Typography</h4>
                <p className="text-sm text-muted-foreground">Font: {currentTheme.typography.fontFamily}</p>
                <p className="text-sm text-muted-foreground">Heading Weight: {currentTheme.typography.headingWeight}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Spacing</h4>
                <p className="text-sm text-muted-foreground">Base Unit: {currentTheme.spacing.unit}px</p>
                <p className="text-sm text-muted-foreground">Animation: {currentTheme.animations.duration}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Theme Switcher */}
      <ThemeSwitcher variant="floating" />
    </div>
  );
}
