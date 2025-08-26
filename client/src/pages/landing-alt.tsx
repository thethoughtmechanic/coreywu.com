
import { Link } from "wouter";
import { useState, useRef } from "react";
import { ChevronDown, ExternalLink, Lightbulb, Beaker, User } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionConfig } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import CopyEmail from "@/components/copy-email";
import { TypingText } from "@/components/typing-text";
import { SpringElement } from "@/components/spring-element";
import headshotImage from "@assets/0X5A2925_2_pp_1756229624864.jpg";

// Animation constants for seeds collection
const SCALE = 1.2;
const DISTANCE = 120;
const NUDGE = 16;
const SPRING_CONFIG = () => ({
  mass: 0.1,
  stiffness: 300,
  damping: 20,
});

// Seeds data representing different sections of the website
const SEEDS = [
  {
    id: "about",
    name: "About",
    route: "/about",
    icon: User,
    description: "My journey, values, and what drives me",
    color: "from-amber-400 to-orange-500",
    cta: "Get to know me"
  },
  {
    id: "thoughts", 
    name: "Thoughts",
    route: "/thoughts",
    icon: Lightbulb,
    description: "Ideas on design, technology, and the future",
    color: "from-blue-400 to-purple-500",
    cta: "Explore my mind"
  },
  {
    id: "experiments",
    name: "Experiments", 
    route: "/experiments",
    icon: Beaker,
    description: "Projects building toward a better tomorrow",
    color: "from-green-400 to-teal-500",
    cta: "See what I'm building"
  }
];

interface SeedCardProps {
  seed: typeof SEEDS[0];
  width: number;
  height: number;
  isExpanded?: boolean;
  mouseLeft?: any;
}

const SeedCard = ({ seed, width, height, isExpanded = false, mouseLeft }: SeedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = seed.icon;

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
      className="relative rounded-2xl border-2 border-white/20 overflow-hidden cursor-pointer group"
      style={{
        width,
        height,
        ...(isExpanded && { x: xSpring, scale: scaleSpring }),
      }}
    >
      <div className={`w-full h-full bg-gradient-to-br ${seed.color} flex flex-col items-center justify-center text-white p-4`}>
        <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-200" />
        {isExpanded && (
          <div className="text-center">
            <div className="font-semibold text-sm mb-1">{seed.name}</div>
            <div className="text-xs opacity-90 leading-tight">{seed.description}</div>
          </div>
        )}
        {!isExpanded && (
          <div className="font-semibold text-sm">{seed.name}</div>
        )}
      </div>
      <div className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

interface CollapsedSeedsProps {
  seeds: typeof SEEDS;
  setIsExpanded: (expanded: boolean) => void;
}

const CollapsedSeeds = ({ seeds, setIsExpanded }: CollapsedSeedsProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = [
    {
      hover: { rotate: -15, x: -20, y: -12, zIndex: 2 },
      rest: { rotate: -8, zIndex: 2 },
    },
    {
      hover: { rotate: 15, x: 16, y: -8, zIndex: 3 },
      rest: { rotate: 8, zIndex: 3 },
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-6">
      <button
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        aria-label="Explore my digital garden"
      >
        {/* Main seed */}
        <motion.div
          initial={false}
          animate={isHovered ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
          layoutId="main-seed"
          className="relative z-10"
        >
          <SeedCard
            seed={seeds[0]}
            width={100}
            height={100}
          />
        </motion.div>

        {/* Background seeds */}
        {seeds.slice(1).map((seed, index) => (
          <motion.div
            key={seed.id}
            layoutId={`seed-${index}`}
            className="absolute top-0 left-0"
            variants={cardVariants[index]}
            animate={isHovered ? "hover" : "rest"}
          >
            <SeedCard
              seed={seed}
              width={100}
              height={100}
            />
          </motion.div>
        ))}
      </button>

      {/* Collection info */}
      <div className="text-center">
        <motion.div
          layoutId="collection-title"
          className="font-medium text-warm-brown text-lg mb-2"
        >
          Seeds of Ideas
        </motion.div>
        <motion.div
          layoutId="collection-subtitle"
          className="text-sm text-muted-grey max-w-xs"
        >
          Click to explore the different corners of my digital garden
        </motion.div>
      </div>
    </div>
  );
};

interface ExpandedSeedsProps {
  seeds: typeof SEEDS;
  setIsExpanded: (expanded: boolean) => void;
}

const ExpandedSeeds = ({ seeds, setIsExpanded }: ExpandedSeedsProps) => {
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
    <div className="flex flex-col items-center space-y-8">
      {/* Collection info at top */}
      <div className="text-center">
        <motion.div
          layoutId="collection-title"
          className="font-medium text-warm-brown text-lg mb-2"
        >
          Seeds of Ideas
        </motion.div>
        <motion.div
          layoutId="collection-subtitle"
          className="text-sm text-muted-grey max-w-md"
        >
          Each seed represents a different aspect of my work and thinking. Click any to explore!
        </motion.div>
      </div>

      {/* Horizontal seed row */}
      <motion.div
        ref={containerRef}
        className="flex items-center justify-center gap-4"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        style={{ willChange: "transform" }}
      >
        <motion.div layoutId="main-seed">
          <Link href={seeds[0].route}>
            <SeedCard
              seed={seeds[0]}
              width={120}
              height={120}
              mouseLeft={mouseLeft}
              isExpanded={true}
            />
          </Link>
        </motion.div>

        {seeds.slice(1).map((seed, index) => (
          <motion.div key={seed.id} layoutId={`seed-${index}`}>
            <Link href={seed.route}>
              <SeedCard
                seed={seed}
                width={120}
                height={120}
                mouseLeft={mouseLeft}
                isExpanded={true}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="px-6 py-3 bg-warm-brown text-cream rounded-xl font-medium hover:bg-hover-brown transition-colors duration-200 flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(false)}
        >
          Plant More Seeds
          <ExternalLink className="w-4 h-4" />
        </motion.button>
        
        <CopyEmail className="text-warm-brown hover:text-hover-brown transition-colors duration-200">
          <motion.button 
            className="px-6 py-3 border border-warm-brown text-warm-brown rounded-xl font-medium hover:bg-warm-brown hover:text-cream transition-all duration-200"
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </CopyEmail>
      </motion.div>
    </div>
  );
};

const SeedsCollection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-cream/40 to-light-brown/30 rounded-2xl p-8 min-h-[300px] flex items-center justify-center border border-warm-brown/10">
      <MotionConfig transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            <div key="collapsed">
              <CollapsedSeeds seeds={SEEDS} setIsExpanded={setIsExpanded} />
            </div>
          ) : (
            <div key="expanded">
              <ExpandedSeeds seeds={SEEDS} setIsExpanded={setIsExpanded} />
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default function LandingAlt() {

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center py-6 md:py-8">
      <div className="text-center w-full">
        {/* Draggable Headshot - positioned above the welcome text */}
        <div className="mb-16 flex justify-center">
          <SpringElement>
            <div 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl transition-all duration-300"
            >
              <img 
                src={headshotImage}
                alt="Corey Wu - Draggable headshot"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 40%', transform: 'scale(1.2)' }}
                draggable={false}
                data-testid="img-headshot"
                onError={(e) => {
                  // Fallback to the SVG avatar if the image fails to load
                  e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%">
                          <stop offset="0%" style="stop-color:#F5E6D3;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#E8D5C0;stop-opacity:1" />
                        </radialGradient>
                        <radialGradient id="hairGradient" cx="50%" cy="30%" r="70%">
                          <stop offset="0%" style="stop-color:#3D2914;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#2C1810;stop-opacity:1" />
                        </radialGradient>
                      </defs>
                      <!-- Hair -->
                      <ellipse cx="64" cy="45" rx="40" ry="35" fill="url(#hairGradient)"/>
                      <!-- Face -->
                      <ellipse cx="64" cy="70" rx="32" ry="38" fill="url(#faceGradient)"/>
                      <!-- Glasses -->
                      <circle cx="54" cy="65" r="8" fill="none" stroke="#4A4A4A" stroke-width="2"/>
                      <circle cx="74" cy="65" r="8" fill="none" stroke="#4A4A4A" stroke-width="2"/>
                      <line x1="62" y1="65" x2="66" y2="65" stroke="#4A4A4A" stroke-width="2"/>
                      <!-- Eyes -->
                      <circle cx="54" cy="65" r="3" fill="#2C1810"/>
                      <circle cx="74" cy="65" r="3" fill="#2C1810"/>
                      <circle cx="55" cy="64" r="1" fill="#FFFFFF"/>
                      <circle cx="75" cy="64" r="1" fill="#FFFFFF"/>
                      <!-- Smile -->
                      <path d="M 52 80 Q 64 88 76 80" stroke="#D4AF37" stroke-width="2" fill="none"/>
                      <!-- Sweater -->
                      <ellipse cx="64" cy="115" rx="45" ry="20" fill="#F0E68C"/>
                    </svg>
                  `)}`;
                }}
              />
            </div>
          </SpringElement>
        </div>

        {/* Welcome Title - Mobile Optimized */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-warm-brown leading-tight px-2 whitespace-nowrap" data-testid="text-home-title">
            <TypingText 
              text="Welcome to my digital garden."
              duration={80}
              delay={500}
              cursor={false}
              className="inline whitespace-nowrap"
            />
          </h1>
        </div>

        <p className="text-sm md:text-base text-soft-black/60 mb-12 md:mb-16 leading-relaxed max-w-2xl mx-auto">
          As a designer of systems and experiences, I'm exploring how we can build toward futures that are more meaningful, intentional, and human. Let's tend to these ideas and see what they grow into.
        </p>

        {/* Seeds Collection - Interactive navigation */}
        <div className="mb-16 md:mb-20">
          <SeedsCollection />
        </div>

        {/* Fun interaction hint */}
        <p className="text-xs text-warm-brown/60 mb-16 italic">
          ✨ Try dragging my head around for some fun!
        </p>

        {/* Contact Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
          <p className="text-sm text-muted-grey">
            Interested in collaborating or just want to chat? Reach out at{' '}
            <CopyEmail className="text-warm-brown hover:text-hover-brown transition-colors duration-200 no-underline" email="coreydavidwu@gmail.com">
              coreydavidwu@gmail.com
            </CopyEmail>
          </p>
        </footer>
      </div>
    </div>
  );
}
