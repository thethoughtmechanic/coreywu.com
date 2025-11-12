import { useEffect } from 'react';

export default function AIGovernanceExplorer() {
  useEffect(() => {
    // Track mouse position to detect when it leaves the top area
    const handleMouseMove = (e: MouseEvent) => {
      // Dispatch to window so navigation can detect it
      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true
      }));
    };

    // Listen on document with capture phase to catch events
    document.addEventListener('mousemove', handleMouseMove, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove, true);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen">
      {/* Transparent overlay at top to capture mouse events for nav auto-hide */}
      <div 
        className="fixed top-0 left-0 right-0 z-[99] pointer-events-auto"
        style={{ height: '60px' }}
        onMouseMove={(e) => {
          // Ensure mouse events are dispatched when over the overlay
          window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true
          }));
        }}
        onMouseLeave={() => {
          // When mouse leaves the top area, dispatch a low Y position to hide nav
          window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 0,
            clientY: 1000, // Well below threshold
            bubbles: true
          }));
        }}
      />
      {/* Iframe to embed your HTML file - takes up full viewport */}
      <iframe 
        src="/ai-governance-explorer.html"
        className="w-full h-full border-0"
        title="AI Governance Futures Explorer"
      />
    </div>
  );
}

