import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
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
      <nav className="w-full bg-cream/70 border-b border-warm-brown/20 sticky top-0 z-50 backdrop-blur-sm h-16 md:h-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Home button */}
            <Link
              href="/"
              className="text-lg md:text-xl font-semibold text-warm-brown hover:text-hover-brown transition-colors duration-200"
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
                    "text-soft-black hover:text-warm-brown transition-colors duration-200 pb-1",
                    location === item.path && "border-b-2 border-warm-brown text-warm-brown"
                  )}
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-warm-brown hover:text-hover-brown transition-colors duration-200"
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          data-testid="overlay-mobile-menu"
        />
      )}

      {/* Mobile navigation menu */}
      <div className={cn(
        "fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-gray-900 backdrop-blur-md border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-40 md:hidden shadow-2xl",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-6 space-y-6">
          <div className="text-lg font-medium text-white mb-4">
            Navigation
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMenu}
              className={cn(
                "text-lg text-white hover:text-white hover:bg-warm-brown/20 transition-all duration-200 py-3 px-4 rounded-lg border-l-4 border-transparent hover:border-l-warm-brown/50",
                location === item.path && "border-l-warm-brown text-white bg-warm-brown/30 font-medium"
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