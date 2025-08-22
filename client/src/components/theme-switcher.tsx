
import React, { useState } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/theme-context';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'compact' | 'expanded' | 'floating';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '', 
  variant = 'compact' 
}) => {
  const { currentTheme, availableThemes, switchTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    switchTheme(themeId);
    setIsOpen(false);
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center"
            aria-label="Switch theme"
          >
            <Palette size={20} />
          </button>
          
          {isOpen && (
            <div className="absolute bottom-full mb-3 right-0 bg-background border border-border rounded-xl shadow-xl p-3 min-w-[200px]">
              <h3 className="text-sm font-medium text-foreground mb-2">Choose Theme</h3>
              <div className="space-y-2">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    disabled={isTransitioning}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-sm">{theme.name}</div>
                      <div className="text-xs text-muted-foreground">{theme.description}</div>
                    </div>
                    {currentTheme.id === theme.id && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'expanded') {
    return (
      <div className={`bg-background border border-border rounded-xl p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-lg font-medium">Design System</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              disabled={isTransitioning}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                currentTheme.id === theme.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{theme.name}</h3>
                {currentTheme.id === theme.id && (
                  <Check size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
              
              {/* Color preview */}
              <div className="flex gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
      >
        <Palette size={16} />
        <span className="text-sm">{currentTheme.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-background border border-border rounded-lg shadow-lg p-2 min-w-[160px] z-10">
          {availableThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              disabled={isTransitioning}
              className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors flex items-center justify-between"
            >
              <span className="text-sm">{theme.name}</span>
              {currentTheme.id === theme.id && (
                <Check size={14} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
