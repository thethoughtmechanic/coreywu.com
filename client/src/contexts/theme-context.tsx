
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DesignTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    // Add more color tokens as needed
  };
  typography: {
    fontFamily: string;
    headingWeight: string;
    bodyWeight: string;
    // Add more typography tokens
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
  components: {
    button: {
      variant: 'filled' | 'outlined' | 'ghost';
      size: 'small' | 'medium' | 'large';
    };
    card: {
      shadow: string;
      border: string;
    };
    // Add more component styles
  };
}

interface ThemeContextType {
  currentTheme: DesignTheme;
  availableThemes: DesignTheme[];
  switchTheme: (themeId: string) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState('warm-minimal');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define your design themes
  const availableThemes: DesignTheme[] = [
    {
      id: 'warm-minimal',
      name: 'Warm Minimal',
      description: 'Your current warm, earthy design',
      colors: {
        primary: 'hsl(28, 30%, 55%)',
        secondary: 'hsl(35, 20%, 94%)',
        accent: 'hsl(142, 71%, 45%)',
        background: 'hsl(35, 80%, 99%)',
        foreground: 'hsl(25, 25%, 22%)',
        muted: 'hsl(220, 13%, 64%)',
      },
      typography: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        headingWeight: '300',
        bodyWeight: '400',
      },
      spacing: {
        unit: 4,
        scale: [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32],
      },
      borderRadius: {
        small: '0.375rem',
        medium: '0.5rem',
        large: '0.75rem',
      },
      animations: {
        duration: '200ms',
        easing: 'ease-out',
      },
      components: {
        button: {
          variant: 'filled',
          size: 'medium',
        },
        card: {
          shadow: '0 2px 8px rgba(139, 115, 85, 0.08)',
          border: '1px solid hsl(28, 30%, 55%, 0.2)',
        },
      },
    },
    {
      id: 'cyberpunk-neon',
      name: 'Cyberpunk Neon',
      description: 'High-contrast dark theme with neon accents',
      colors: {
        primary: 'hsl(280, 100%, 70%)',
        secondary: 'hsl(195, 100%, 50%)',
        accent: 'hsl(45, 100%, 60%)',
        background: 'hsl(240, 15%, 8%)',
        foreground: 'hsl(0, 0%, 95%)',
        muted: 'hsl(240, 5%, 40%)',
      },
      typography: {
        fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
        headingWeight: '700',
        bodyWeight: '400',
      },
      spacing: {
        unit: 8,
        scale: [1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64],
      },
      borderRadius: {
        small: '0',
        medium: '0.25rem',
        large: '0.5rem',
      },
      animations: {
        duration: '300ms',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      components: {
        button: {
          variant: 'outlined',
          size: 'large',
        },
        card: {
          shadow: '0 0 20px rgba(168, 85, 247, 0.3)',
          border: '1px solid hsl(280, 100%, 70%, 0.5)',
        },
      },
    },
    {
      id: 'soft-pastel',
      name: 'Soft Pastel',
      description: 'Gentle, dreamy pastel colors',
      colors: {
        primary: 'hsl(340, 50%, 80%)',
        secondary: 'hsl(200, 50%, 90%)',
        accent: 'hsl(60, 50%, 85%)',
        background: 'hsl(320, 20%, 98%)',
        foreground: 'hsl(240, 20%, 25%)',
        muted: 'hsl(240, 10%, 60%)',
      },
      typography: {
        fontFamily: 'Poppins, system-ui, sans-serif',
        headingWeight: '600',
        bodyWeight: '400',
      },
      spacing: {
        unit: 6,
        scale: [1, 2, 3, 6, 9, 12, 18, 24, 30, 36, 48],
      },
      borderRadius: {
        small: '1rem',
        medium: '1.5rem',
        large: '2rem',
      },
      animations: {
        duration: '400ms',
        easing: 'ease-in-out',
      },
      components: {
        button: {
          variant: 'ghost',
          size: 'medium',
        },
        card: {
          shadow: '0 8px 32px rgba(340, 50%, 80%, 0.15)',
          border: 'none',
        },
      },
    },
  ];

  const currentTheme = availableThemes.find(theme => theme.id === currentThemeId) || availableThemes[0];

  const switchTheme = async (themeId: string) => {
    setIsTransitioning(true);
    
    // Apply the new theme to CSS custom properties
    const newTheme = availableThemes.find(theme => theme.id === themeId);
    if (newTheme) {
      applyThemeToCSS(newTheme);
      setCurrentThemeId(themeId);
      
      // Store preference
      localStorage.setItem('selectedTheme', themeId);
    }
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const applyThemeToCSS = (theme: DesignTheme) => {
    const root = document.documentElement;
    
    // Apply color tokens
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply typography
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--heading-weight', theme.typography.headingWeight);
    root.style.setProperty('--body-weight', theme.typography.bodyWeight);
    
    // Apply spacing
    root.style.setProperty('--spacing-unit', `${theme.spacing.unit}px`);
    
    // Apply border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Apply animations
    root.style.setProperty('--animation-duration', theme.animations.duration);
    root.style.setProperty('--animation-easing', theme.animations.easing);
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && availableThemes.find(t => t.id === savedTheme)) {
      switchTheme(savedTheme);
    } else {
      applyThemeToCSS(currentTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      availableThemes,
      switchTheme,
      isTransitioning,
    }}>
      <div className={`theme-${currentTheme.id} ${isTransitioning ? 'theme-transitioning' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
