import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
            <div className="hidden md:flex space-x-8">
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
                  onClick={() => window.trackNavigationClick && window.trackNavigationClick(item.path.substring(1), 'navigation')}
                >
                  {item.label}
                </Link>
              ))}
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
      {isMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 backdrop-blur-sm z-[60] md:hidden",
            isDarkMode ? "bg-black/40" : "bg-warm-brown/20"
          )}
          onClick={closeMenu}
          data-testid="overlay-mobile-menu"
        />
      )}

      {/* Mobile navigation menu */}
      <div className={cn(
        "fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 backdrop-blur-md border-l transform transition-transform duration-300 ease-in-out z-[60] md:hidden shadow-2xl",
        isDarkMode 
          ? "bg-gray-900/98 border-gray-700/30" 
          : "bg-cream/98 border-warm-brown/30",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-6 space-y-6">
          <div className={cn(
            "text-lg font-medium mb-4",
            isDarkMode ? "text-white" : "text-warm-brown"
          )}>
            Navigation
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMenu}
              className={cn(
                "text-lg transition-colors duration-200 py-3 px-4 rounded-lg border-l-4 border-transparent",
                isDarkMode 
                  ? cn(
                      "text-gray-300 hover:text-white hover:bg-gray-800",
                      location === item.path && "border-l-white text-white bg-gray-800 font-medium"
                    )
                  : cn(
                      "text-soft-black hover:text-warm-brown hover:bg-light-brown",
                      location === item.path && "border-l-warm-brown text-warm-brown bg-light-brown font-medium"
                    )
              )}
              data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}