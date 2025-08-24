import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

interface NavigationProps {
  isDarkMode?: boolean;
}

export function Navigation({ isDarkMode = false }: NavigationProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "About Me", path: "/about" },
    { label: "Thoughts", path: "/thoughts" },
    { label: "Experiments", path: "/experiments" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={cn(
        "w-full border-b sticky top-0 z-50 backdrop-blur-sm h-16 md:h-20",
        isDarkMode 
          ? "bg-gray-900/95 border-gray-700/30" 
          : "bg-cream/95 border-warm-brown/20"
      )}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Home button */}
            <Link
              href="/"
              className={cn(
                "text-lg md:text-xl font-semibold transition-colors duration-200",
                isDarkMode 
                  ? "text-white hover:text-gray-300" 
                  : "text-warm-brown hover:text-hover-brown"
              )}
              data-testid="link-home"
              onClick={closeMenu}
            >
              Corey Wu
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "transition-colors duration-200 pb-1",
                      isDarkMode 
                        ? cn(
                            "text-gray-300 hover:text-white",
                            location === item.path && "border-b-2 border-white text-white"
                          )
                        : cn(
                            "text-soft-black hover:text-warm-brown",
                            location === item.path && "border-b-2 border-warm-brown text-warm-brown"
                          )
                    )}
                    data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                    onClick={() => (window as any).trackNavigationClick && (window as any).trackNavigationClick(item.path.substring(1), 'navigation')}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile hamburger menu button */}
            <button
              onClick={toggleMenu}
              className={cn(
                "md:hidden p-2 transition-colors duration-200",
                isDarkMode 
                  ? "text-white hover:text-gray-300" 
                  : "text-warm-brown hover:text-hover-brown"
              )}
              data-testid="button-mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      <div className={cn(
        "fixed inset-0 z-[50] md:hidden transition-all duration-300 ease-out",
        isMenuOpen 
          ? "opacity-100 backdrop-blur-sm pointer-events-auto" 
          : "opacity-0 pointer-events-none",
        isDarkMode ? "bg-black/50" : "bg-warm-brown/30"
      )}
        onClick={closeMenu}
        data-testid="overlay-mobile-menu"
      />

      {/* Mobile navigation menu */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-[280px] z-[60] md:hidden transform transition-transform duration-300 ease-out shadow-xl",
        isDarkMode 
          ? "bg-gray-900/98 backdrop-blur-md border-r border-gray-700/30" 
          : "bg-cream/98 backdrop-blur-md border-r border-warm-brown/20",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-6 border-b",
          isDarkMode ? "border-gray-700/30" : "border-warm-brown/20"
        )}>
          <span className={cn(
            "text-xl font-bold",
            isDarkMode ? "text-white" : "text-warm-brown"
          )}>
            Corey Wu
          </span>
          <button
            onClick={closeMenu}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-800" 
                : "text-warm-brown hover:text-hover-brown hover:bg-light-brown"
            )}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col py-6">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMenu}
              className={cn(
                "group flex items-center px-8 py-5 text-lg font-semibold transition-all duration-300 ease-out border-l-4 border-transparent relative overflow-hidden",
                isDarkMode 
                  ? cn(
                      "text-gray-300 hover:text-white",
                      location === item.path 
                        ? "border-l-white text-white bg-gradient-to-r from-gray-800/50 to-gray-800/20" 
                        : "hover:bg-gray-800/30"
                    )
                  : cn(
                      "text-soft-black hover:text-warm-brown",
                      location === item.path 
                        ? "border-l-warm-brown text-warm-brown bg-gradient-to-r from-light-brown/40 to-light-brown/10" 
                        : "hover:bg-light-brown/30"
                    )
              )}
              data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {/* Active background highlight */}
              {location === item.path && (
                <div className={cn(
                  "absolute inset-0 opacity-100 transition-all duration-300",
                  isDarkMode 
                    ? "bg-gradient-to-r from-white/5 via-white/3 to-transparent" 
                    : "bg-gradient-to-r from-warm-brown/8 via-warm-brown/4 to-transparent"
                )} />
              )}
              
              {/* Hover background */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300",
                isDarkMode 
                  ? "bg-gradient-to-r from-gray-700/20 to-transparent" 
                  : "bg-gradient-to-r from-warm-brown/10 to-transparent"
              )} />
              
              <div className="relative flex items-center justify-between w-full">
                <span className="relative flex items-center">
                  {item.label}
                  
                  {/* Active dot indicator */}
                  {location === item.path && (
                    <div className={cn(
                      "ml-3 w-2 h-2 rounded-full animate-pulse",
                      isDarkMode ? "bg-white" : "bg-warm-brown"
                    )} />
                  )}
                </span>
                
                {/* Active arrow indicator */}
                {location === item.path && (
                  <div className={cn(
                    "w-1 h-4 rounded-full transition-all duration-300",
                    isDarkMode ? "bg-white" : "bg-warm-brown"
                  )} />
                )}
              </div>
              
              {/* Bottom highlight line for active state */}
              {location === item.path && (
                <div className={cn(
                  "absolute bottom-0 left-8 right-8 h-0.5 rounded-full transition-all duration-300",
                  isDarkMode ? "bg-gradient-to-r from-white to-transparent" : "bg-gradient-to-r from-warm-brown to-transparent"
                )} />
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className={cn(
          "absolute bottom-6 left-6 right-6 text-xs opacity-60",
          isDarkMode ? "text-gray-400" : "text-soft-black"
        )}>
          Corey Wu © 2025
        </div>
      </div>
    </>
  );
}