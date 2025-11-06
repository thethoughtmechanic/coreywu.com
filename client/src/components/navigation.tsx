import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

// Placeholder for CopyEmail component, assuming it's defined elsewhere and handles email copying
const CopyEmail = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("corey.david.wu@gmail.com");
      setEmailCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={handleEmailClick}
      className={cn(
        "transition-all duration-200 pb-1 cursor-pointer relative overflow-hidden px-3 py-1.5 rounded-lg border",
        "text-soft-black hover:text-warm-brown border-warm-brown/30 hover:border-warm-brown/50 hover:bg-warm-brown/10" // Assuming default non-dark mode
      )}
      data-testid="button-email-me"
    >
      <span className={cn(
        "flex items-center gap-2 transition-all duration-300 ease-in-out",
        emailCopied 
          ? "transform -translate-y-full opacity-0" 
          : "transform translate-y-0 opacity-100"
      )}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-10 5L2 7"/>
        </svg>
        Email Me
      </span>
      <span className={cn(
        "absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out text-green-600 font-medium",
        emailCopied 
          ? "transform translate-y-0 opacity-100" 
          : "transform translate-y-full opacity-0"
      )}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="m9 14 2 2 4-4"/>
        </svg>
        Copied!
      </span>
    </button>
  );
};

interface NavigationProps {
  isDarkMode?: boolean;
}

export function Navigation({ isDarkMode = false }: NavigationProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "About Me", path: "/about" },
    { label: "Thoughts", path: "/thoughts" },
    { label: "Experiments", path: "/experiments" },
    { label: "Post-Truth", path: "/post-truth", isNew: true },
  ];

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("corey.david.wu@gmail.com");
      setEmailCopied(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Helper function to determine if a link is active
  const isActive = (path: string) => location === path;

  return (
    <>
      <nav className={cn(
        "w-full border-b sticky top-0 z-[100] backdrop-blur-sm h-16 md:h-20",
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
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
              <Link
                href="/about"
                className={cn(
                  "transition-colors duration-200 pb-1",
                  isDarkMode
                    ? cn(
                        "text-gray-300 hover:text-white",
                        isActive("/about") && "border-b-2 border-white text-white"
                      )
                    : cn(
                        "text-soft-black hover:text-warm-brown",
                        isActive("/about") && "border-b-2 border-warm-brown text-warm-brown"
                      )
                )}
                data-testid="link-about-me"
                onClick={() => window.trackNavigationClick && window.trackNavigationClick('about', 'navigation')}
              >
                About Me
              </Link>
              <Link
                href="/thoughts"
                className={cn(
                  "transition-colors duration-200 pb-1",
                  isDarkMode
                    ? cn(
                        "text-gray-300 hover:text-white",
                        isActive("/thoughts") && "border-b-2 border-white text-white"
                      )
                    : cn(
                        "text-soft-black hover:text-warm-brown",
                        isActive("/thoughts") && "border-b-2 border-warm-brown text-warm-brown"
                      )
                )}
                data-testid="link-thoughts"
                onClick={() => window.trackNavigationClick && window.trackNavigationClick('thoughts', 'navigation')}
              >
                Thoughts
              </Link>
              <div className="ml-2"> {/* Added margin to the left for spacing */}
                <Link
                  href="/experiments"
                  className={cn(
                    "transition-colors duration-200 pb-1",
                    isDarkMode
                      ? cn(
                          "text-gray-300 hover:text-white",
                          isActive("/experiments") && "border-b-2 border-white text-white"
                        )
                      : cn(
                          "text-soft-black hover:text-warm-brown",
                          isActive("/experiments") && "border-b-2 border-warm-brown text-warm-brown"
                        )
                  )}
                  data-testid="link-experiments"
                  onClick={() => window.trackNavigationClick && window.trackNavigationClick('experiments', 'navigation')}
                >
                  Experiments
                </Link>
              </div>
              <div className="relative inline-flex items-center gap-2">
                <Link
                  href="/post-truth"
                  className={cn(
                    "transition-all duration-300 pb-1 relative group/posttruth",
                    isDarkMode
                      ? cn(
                          "text-gray-300 hover:text-cyan-400",
                          isActive("/post-truth") && "border-b-2 border-white text-white"
                        )
                      : cn(
                          "text-soft-black hover:text-purple-600",
                          isActive("/post-truth") && "border-b-2 border-warm-brown text-warm-brown"
                      )
                  )}
                  style={{
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                  }}
                  data-testid="link-post-truth"
                  onClick={() => window.trackNavigationClick && window.trackNavigationClick('post-truth', 'navigation')}
                >
                  <span className="group-hover/posttruth:tracking-wider transition-all duration-300" style={{
                    fontFamily: 'var(--font-mono, "Courier New", monospace)',
                  }}>
                    Post-Truth
                  </span>
                </Link>
                <span className={cn(
                  "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300",
                  "border",
                  isDarkMode
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                )}
                style={{
                  fontFamily: 'var(--font-mono, "Courier New", monospace)',
                  letterSpacing: '0.1em',
                }}>
                  NEW
                </span>
              </div>
              <CopyEmail />
            </nav>

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
        "fixed inset-0 z-[105] md:hidden transition-all duration-300 ease-out",
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
        "fixed top-0 left-0 h-full w-[280px] z-[110] md:hidden transform transition-transform duration-300 ease-out shadow-xl",
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
                "group flex items-center justify-between px-8 py-5 text-lg font-medium transition-all duration-200 border-l-4 border-transparent relative",
                isDarkMode 
                  ? cn(
                      "text-gray-300 hover:text-white hover:bg-gray-800/50",
                      location === item.path && "border-l-white text-white bg-gray-800/30"
                    )
                  : cn(
                      "text-soft-black hover:text-warm-brown hover:bg-light-brown/50",
                      location === item.path && "border-l-warm-brown text-warm-brown bg-light-brown/30"
                    )
              )}
              data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              <span className="relative">
                {item.label}
                {location === item.path && (
                  <div className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 rounded-full",
                    isDarkMode ? "bg-white" : "bg-warm-brown"
                  )} />
                )}
              </span>
              {item.isNew && (
                <span className={cn(
                  "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                  isDarkMode
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-cyan-400/50"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400/50"
                )}
                style={{
                  fontFamily: 'var(--font-mono, "Courier New", monospace)',
                  letterSpacing: '0.1em',
                }}>
                  NEW
                </span>
              )}
            </Link>
          ))}

          {/* Mobile Email Me Button */}
          <button
            onClick={handleEmailClick}
            className={cn(
              "group flex items-center px-8 py-5 text-lg font-medium transition-all duration-200 border-l-4 border-transparent relative overflow-hidden",
              isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                : "text-soft-black hover:text-warm-brown hover:bg-light-brown/50"
            )}
            data-testid="button-mobile-email-me"
            style={{
              animationDelay: isMenuOpen ? `${navItems.length * 50}ms` : '0ms'
            }}
          >
            <span className="relative">
              <span className={cn(
                "flex items-center gap-3 transition-all duration-300 ease-in-out",
                emailCopied 
                  ? "transform -translate-y-full opacity-0" 
                  : "transform translate-y-0 opacity-100"
              )}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-10 5L2 7"/>
                </svg>
                Email Me
              </span>
              <span className={cn(
                "absolute inset-0 flex items-center gap-3 transition-all duration-300 ease-in-out font-semibold",
                isDarkMode ? "text-green-400" : "text-green-600",
                emailCopied 
                  ? "transform translate-y-0 opacity-100" 
                  : "transform translate-y-full opacity-0"
              )}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <path d="m9 14 2 2 4-4"/>
                </svg>
                Copied!
              </span>
            </span>
          </button>
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