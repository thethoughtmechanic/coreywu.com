
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionConfig } from "framer-motion";
import CopyEmail from "@/components/copy-email";

// Animation constants
const SCALE = 1.5;
const DISTANCE = 100;
const NUDGE = 24;
const SPRING_CONFIG = () => ({
  mass: 0.1,
  stiffness: 300,
  damping: 20,
});

// Mock data for demonstration
const CARD_COLORS = [
  { bg: "bg-pink-300", name: "Pink Card" },
  { bg: "bg-blue-300", name: "Blue Card" },
  { bg: "bg-yellow-300", name: "Yellow Card" },
  { bg: "bg-green-300", name: "Green Card" },
  { bg: "bg-purple-300", name: "Purple Card" }
];

interface CollectionCardProps {
  color: string;
  width: number;
  height: number;
  isExpanded?: boolean;
  mouseLeft?: any;
  name: string;
}

const CollectionCard = ({ color, width, height, isExpanded = false, mouseLeft, name }: CollectionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(() => {
    if (!isExpanded || !mouseLeft) return -Infinity;
    
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };
    return (mouseLeft?.get() ?? 0) - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);

  const calculateOffset = (currentDistance: number, currentScale: number) => {
    if (currentDistance === -Infinity) {
      return 0;
    }

    if (currentDistance < -DISTANCE || currentDistance > DISTANCE) {
      return Math.sign(currentDistance) * -1 * NUDGE;
    }

    return (-currentDistance / DISTANCE) * NUDGE * currentScale;
  };

  const x = useTransform(() => {
    const currentDistance = distance.get();
    const currentScale = scale.get();
    return calculateOffset(currentDistance, currentScale);
  });

  const springConfig = SPRING_CONFIG();
  const scaleSpring = useSpring(scale, springConfig);
  const xSpring = useSpring(x, springConfig);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl border-2 border-white/20 overflow-hidden cursor-pointer"
      style={{
        width,
        height,
        ...(isExpanded && { x: xSpring, scale: scaleSpring }),
      }}
    >
      <div className={`w-full h-full ${color} flex items-center justify-center`}>
        <div className="text-white font-semibold text-sm text-center px-2">
          {name}
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

interface CollapsedStateProps {
  cards: typeof CARD_COLORS;
  setIsExpanded: (expanded: boolean) => void;
}

const CollapsedState = ({ cards, setIsExpanded }: CollapsedStateProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = [
    {
      hover: { rotate: -24, x: -32, y: -20, zIndex: 3 },
      rest: { rotate: -12, zIndex: 3 },
    },
    {
      hover: { rotate: 24, x: 28, y: -16, zIndex: 4 },
      rest: { rotate: 12, zIndex: 4 },
    },
    {
      hover: { rotate: 24, x: 24, y: -48, zIndex: 1 },
      rest: { rotate: 24, zIndex: 1 },
    },
    {
      hover: { y: -44, rotate: -16, x: -24, zIndex: 2 },
      rest: { y: 0, rotate: -24, x: 0, zIndex: 2 },
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <button
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        aria-label="Expand Preview"
      >
        {/* Main collection avatar */}
        <motion.div
          initial={false}
          animate={isHovered ? { y: -4 } : { y: 0 }}
          layoutId="collection-avatar"
          className="relative z-10"
        >
          <CollectionCard
            color={cards[0].bg}
            width={120}
            height={120}
            name="Collection"
          />
        </motion.div>

        {/* Stacked cards behind */}
        {cards.slice(1).map((card, index) => (
          <motion.div
            key={card.name}
            layoutId={`card-${index}`}
            className="absolute top-0 left-0"
            variants={cardVariants[index]}
            animate={isHovered ? "hover" : "rest"}
          >
            <CollectionCard
              color={card.bg}
              width={120}
              height={120}
              name=""
            />
          </motion.div>
        ))}
      </button>

      {/* Collection info */}
      <div className="text-center">
        <motion.div
          layoutId="collection-name"
          className="font-semibold text-warm-brown whitespace-nowrap text-lg"
        >
          Card Collection
        </motion.div>
        <motion.div
          layoutId="collection-count"
          className="text-sm text-muted-grey whitespace-nowrap"
        >
          {cards.length} items
        </motion.div>
      </div>
    </div>
  );
};

interface ExpandedStateProps {
  cards: typeof CARD_COLORS;
  setIsExpanded: (expanded: boolean) => void;
}

const ExpandedState = ({ cards, setIsExpanded }: ExpandedStateProps) => {
  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseLeft.set(touch.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      {/* Collection info at top */}
      <div className="text-center">
        <motion.div
          layoutId="collection-name"
          className="font-semibold text-warm-brown whitespace-nowrap text-lg"
        >
          Card Collection
        </motion.div>
        <motion.div
          layoutId="collection-count"
          className="text-sm text-muted-grey whitespace-nowrap"
        >
          {cards.length} items
        </motion.div>
      </div>

      {/* Horizontal card stack */}
      <motion.div
        ref={containerRef}
        className="flex items-center justify-center gap-3"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <motion.div layoutId="collection-avatar">
          <CollectionCard
            color={cards[0].bg}
            width={100}
            height={100}
            mouseLeft={mouseLeft}
            isExpanded={true}
            name={cards[0].name}
          />
        </motion.div>

        {cards.slice(1).map((card, index) => (
          <motion.div key={card.name} layoutId={`card-${index}`}>
            <CollectionCard
              color={card.bg}
              width={100}
              height={100}
              mouseLeft={mouseLeft}
              isExpanded={true}
              name={card.name}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View All button */}
      <motion.button
        className="px-6 py-3 bg-warm-brown text-cream rounded-xl font-medium hover:bg-hover-brown transition-colors duration-200 flex items-center gap-2"
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
        onClick={() => setIsExpanded(false)}
        aria-label="View All"
      >
        View All
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

const CardCollectionComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
      <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            <div key="collapsed">
              <CollapsedState cards={CARD_COLORS} setIsExpanded={setIsExpanded} />
            </div>
          ) : (
            <div key="expanded">
              <ExpandedState cards={CARD_COLORS} setIsExpanded={setIsExpanded} />
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default function Components() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6">
          Component Playground
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto mb-8">
          Experimental UI components for future design exploration. Interactive prototypes 
          to test new patterns and interactions.
        </p>
      </header>

      {/* Component Sections */}
      <div className="space-y-16">
        {/* Card Collection Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-warm-brown mb-4">
              Card Collection Preview
            </h2>
            <p className="text-muted-grey mb-6">
              Interactive card stack that expands on hover and shows proximity-based scaling 
              when clicked. Based on shared layout animations with spring physics.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs px-3 py-1 bg-warm-brown/20 text-warm-brown rounded-full">
                Framer Motion
              </span>
              <span className="text-xs px-3 py-1 bg-warm-brown/20 text-warm-brown rounded-full">
                Shared Layout
              </span>
              <span className="text-xs px-3 py-1 bg-warm-brown/20 text-warm-brown rounded-full">
                Spring Physics
              </span>
              <span className="text-xs px-3 py-1 bg-warm-brown/20 text-warm-brown rounded-full">
                Proximity Detection
              </span>
            </div>
          </div>
          
          <CardCollectionComponent />
          
          <div className="mt-6 p-4 bg-light-brown/50 rounded-xl">
            <h3 className="font-medium text-warm-brown mb-2">Interaction Guide:</h3>
            <ul className="text-sm text-muted-grey space-y-1">
              <li>• <strong>Hover</strong> the collapsed stack to see cards peek out</li>
              <li>• <strong>Click</strong> to expand into horizontal layout</li>
              <li>• <strong>Hover</strong> individual cards in expanded view for proximity scaling</li>
              <li>• <strong>Click "View All"</strong> to collapse back to stack</li>
            </ul>
          </div>
        </section>

        {/* Future components placeholder */}
        <section>
          <div className="border-2 border-dashed border-warm-brown/30 rounded-xl p-12 text-center">
            <h3 className="text-xl font-medium text-warm-brown mb-4">
              More Components Coming Soon
            </h3>
            <p className="text-muted-grey">
              This playground will grow with new experimental components as we design and build them.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Want to suggest a component idea? Reach out at{' '}
          <CopyEmail className="text-sm" />
        </p>
      </footer>
    </div>
  );
}
