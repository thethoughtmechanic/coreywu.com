import { useState } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/post-truth/Breadcrumb';
import BackButton from '@/components/post-truth/BackButton';
import GlobalMenu from '@/components/post-truth/GlobalMenu';

const signals = [
  { id: 1, title: 'Signal 01', description: 'Placeholder content for weak signal 01' },
  { id: 2, title: 'Signal 02', description: 'Placeholder content for weak signal 02' },
  { id: 3, title: 'Signal 03', description: 'Placeholder content for weak signal 03' },
  { id: 4, title: 'Signal 04', description: 'Placeholder content for weak signal 04' },
  { id: 5, title: 'Signal 05', description: 'Placeholder content for weak signal 05' },
  { id: 6, title: 'Signal 06', description: 'Placeholder content for weak signal 06' },
  { id: 7, title: 'Signal 07', description: 'Placeholder content for weak signal 07' },
  { id: 8, title: 'Signal 08', description: 'Placeholder content for weak signal 08' },
  { id: 9, title: 'Signal 09', description: 'Placeholder content for weak signal 09' },
  { id: 10, title: 'Signal 10', description: 'Placeholder content for weak signal 10' },
  { id: 11, title: 'Signal 11', description: 'Placeholder content for weak signal 11' },
  { id: 12, title: 'Signal 12', description: 'Placeholder content for weak signal 12' },
];

export default function PostTruthManoa() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? signals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === signals.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX - x) / 100;
    
    if (Math.abs(walk) > 0.5) {
      if (walk > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-y-auto">
      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Scanning Line Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(34, 211, 238, 0.3) 50%, transparent 100%)',
          height: '2px',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.4)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-gray-800/50 bg-[#0A0A0A]/80 backdrop-blur-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <Breadcrumb />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded hover:bg-gray-900"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <GlobalMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Back Button - Always Visible */}
      <div className="fixed top-[73px] left-8 z-30">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="pt-[73px] min-h-screen px-8 max-w-[1400px] mx-auto flex flex-col justify-center py-8 relative z-10">
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Weak Signals</h1>
          <p className="text-gray-400 text-lg">12 signals from the margins: youth adaptation patterns showing us where reality is headed</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500 rounded-full transition-all"
            aria-label="Previous signal"
          >
            <ChevronLeft size={24} className="text-cyan-400" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500 rounded-full transition-all"
            aria-label="Next signal"
          >
            <ChevronRight size={24} className="text-cyan-400" />
          </button>

          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {signals.map((signal) => (
                <div
                  key={signal.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div
                    className="mx-auto bg-white border-2 border-cyan-500 p-8 shadow-lg"
                    style={{
                      width: '800px',
                      height: '450px',
                      boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                    }}
                  >
                    <div className="text-xs font-mono text-black/40 mb-4">
                      WS-{signal.id.toString().padStart(2, '0')}
                    </div>

                    <div className="relative h-full">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                      <div className="flex flex-col justify-center items-center h-full text-center">
                        <h2 className="text-3xl font-bold text-cyan-500 mb-6">
                          {signal.title}
                        </h2>
                        <p className="text-lg text-black/80 leading-relaxed">
                          {signal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {signals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-cyan-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to signal ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4 text-gray-400 font-mono text-sm">
            {currentIndex + 1} / {signals.length}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gridScroll {
          0% {
            transform: perspective(500px) rotateX(65deg) translateY(0) scale(1.8);
          }
          100% {
            transform: perspective(500px) rotateX(65deg) translateY(50px) scale(1.8);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}}></style>
    </div>
  );
}

