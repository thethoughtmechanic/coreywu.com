import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { X, Home, Compass, Target } from 'lucide-react';
import { mainNav, methodologies } from '@/lib/post-truth-navigation';

interface GlobalMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalMenu({ isOpen, onClose }: GlobalMenuProps) {
  const [location] = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case 'home':
        return <Home size={20} />;
      case 'explore':
        return <Compass size={20} />;
      case 'act':
        return <Target size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-gray-800 z-50 overflow-y-auto animate-slideInRight"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wide">
              Navigation
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors rounded hover:bg-gray-900"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                Main Sections
              </h3>
              <div className="space-y-2">
                {mainNav.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.id} href={item.path}>
                      <a
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                            : 'text-gray-300 hover:bg-gray-900 hover:text-white border border-transparent'
                        }`}
                      >
                        {getIcon(item.id)}
                        <span className="text-base font-medium">{item.title}</span>
                        {isActive && (
                          <span className="ml-auto text-xs text-cyan-400">
                            CURRENT
                          </span>
                        )}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="border-t border-gray-800" />

            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                Methodologies
              </h3>
              <div className="space-y-2">
                {methodologies.map((method) => {
                  const isActive = location.startsWith(method.path);
                  return (
                    <Link key={method.id} href={method.path}>
                      <a
                        onClick={onClose}
                        className={`block px-4 py-3 rounded-lg transition-all group ${
                          isActive
                            ? 'border border-gray-700'
                            : 'border border-transparent hover:border-gray-800'
                        }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, rgba(${method.colorRgb}, 0.15) 0%, rgba(${method.colorRgb}, 0.05) 100%)`
                            : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: method.color,
                              boxShadow: isActive
                                ? `0 0 10px ${method.color}`
                                : 'none',
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-semibold ${
                                isActive ? '' : 'group-hover:text-white'
                              }`}
                              style={{
                                color: isActive ? method.color : '#D1D5DB',
                              }}
                            >
                              {method.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {method.description?.split(':')[0]}
                            </div>
                          </div>
                          {isActive && (
                            <span className="text-xs uppercase tracking-wider" style={{ color: method.color }}>
                              •
                            </span>
                          )}
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="border-t border-gray-800" />

            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                Resources
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors text-sm"
                  disabled
                >
                  About This Research
                  <span className="ml-2 text-xs text-gray-600">(Coming Soon)</span>
                </button>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors text-sm"
                  disabled
                >
                  Download Report
                  <span className="ml-2 text-xs text-gray-600">(Coming Soon)</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 300ms ease-out;
        }
      `}}></style>
    </>
  );
}
