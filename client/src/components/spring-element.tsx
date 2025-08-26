'use client';
 
import * as React from 'react';
import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';
 
const generateSpringPath = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  springConfig: {
    coilCount?: number;
    amplitudeMin?: number;
    amplitudeMax?: number;
    curveRatioMin?: number;
    curveRatioMax?: number;
    bezierOffset?: number;
  } = {},
) => {
  const {
    coilCount = 8,
    amplitudeMin = 8,
    amplitudeMax = 20,
    curveRatioMin = 0.5,
    curveRatioMax = 1,
    bezierOffset = 8,
  } = springConfig;
 
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 2) return `M${x1},${y1}`;
  const d = dist / coilCount;
  const h = Math.max(0.8, 1 - (dist - 40) / 200);
  const amplitude = Math.max(
    amplitudeMin,
    Math.min(amplitudeMax, amplitudeMax * h),
  );
  const curveRatio =
    dist <= 40
      ? curveRatioMax
      : dist <= 120
        ? curveRatioMax - ((dist - 40) / 80) * (curveRatioMax - curveRatioMin)
        : curveRatioMin;
  const ux = dx / dist,
    uy = dy / dist;
  const perpX = -uy,
    perpY = ux;
 
  let path = [];
  for (let i = 0; i < coilCount; i++) {
    const sx = x1 + ux * (i * d);
    const sy = y1 + uy * (i * d);
    const ex = x1 + ux * ((i + 1) * d);
    const ey = y1 + uy * ((i + 1) * d);
 
    const mx = x1 + ux * ((i + 0.5) * d) + perpX * amplitude;
    const my = y1 + uy * ((i + 0.5) * d) + perpY * amplitude;
 
    const c1x = sx + d * curveRatio * ux;
    const c1y = sy + d * curveRatio * uy;
    const c2x = mx + ux * bezierOffset;
    const c2y = my + uy * bezierOffset;
    const c3x = mx - ux * bezierOffset;
    const c3y = my - uy * bezierOffset;
    const c4x = ex - d * curveRatio * ux;
    const c4y = ey - d * curveRatio * uy;
 
    if (i === 0) path.push(`M${sx},${sy}`);
    else path.push(`L${sx},${sy}`);
    path.push(`C${c1x},${c1y} ${c2x},${c2y} ${mx},${my}`);
    path.push(`C${c3x},${c3y} ${c4x},${c4y} ${ex},${ey}`);
  }
  return path.join(' ');
};
 
function useMotionValueValue(mv: any) {
  return React.useSyncExternalStore(
    (callback) => {
      const unsub = mv.on('change', callback);
      return unsub;
    },
    () => mv.get(),
    () => mv.get(),
  );
}
 
type SpringAvatarProps = {
  children: React.ReactElement;
  className?: string;
  springClassName?: string;
  dragElastic?: number;
  springConfig?: { stiffness?: number; damping?: number };
  springPathConfig?: {
    coilCount?: number;
    amplitudeMin?: number;
    amplitudeMax?: number;
    curveRatioMin?: number;
    curveRatioMax?: number;
    bezierOffset?: number;
  };
} & Omit<HTMLMotionProps<'div'>, 'ref'> & {
  ref?: React.Ref<HTMLDivElement>;
};
 
function SpringElement({
  ref,
  children,
  className,
  springClassName,
  dragElastic = 0.2,
  springConfig = { stiffness: 200, damping: 16 },
  springPathConfig = {},
  ...props
}: SpringAvatarProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
 
  const springX = useSpring(x, {
    stiffness: springConfig.stiffness,
    damping: springConfig.damping,
  });
  const springY = useSpring(y, {
    stiffness: springConfig.stiffness,
    damping: springConfig.damping,
  });
 
  const sx = useMotionValueValue(springX);
  const sy = useMotionValueValue(springY);
 
  const childRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => childRef.current as HTMLDivElement);
  const [center, setCenter] = React.useState({ x: 0, y: 0 });
  const [anchorPosition, setAnchorPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
 
  React.useLayoutEffect(() => {
    function update() {
      if (childRef.current) {
        const rect = childRef.current.getBoundingClientRect();
        const centerPos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        setCenter(centerPos);
        
        // Only set anchor position once (when not dragging) to maintain the "string" anchor point
        if (!isDragging) {
          setAnchorPosition(centerPos);
        }
      }
    }
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isDragging]);
 
  React.useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [isDragging]);
 
  const path = generateSpringPath(
    anchorPosition.x,
    anchorPosition.y,
    center.x + sx,
    center.y + sy,
    springPathConfig,
  );

  // Debug: ensure we have valid positions
  const hasValidPositions = anchorPosition.x > 0 && anchorPosition.y > 0;
 
  return (
    <>
      {hasValidPositions && (
        <svg
          width="100vw"
          height="100vh"
          className="fixed inset-0 w-screen h-screen pointer-events-none z-30"
          style={{ position: 'fixed', top: 0, left: 0 }}
        >
          {/* Debug circle at anchor position */}
          <circle
            cx={anchorPosition.x}
            cy={anchorPosition.y}
            r="4"
            fill="#FF0000"
            opacity="0.7"
          />
          
          {/* Debug circle at current position */}
          <circle
            cx={center.x + sx}
            cy={center.y + sy}
            r="4"
            fill="#00FF00"
            opacity="0.7"
          />
          
          {/* Spring path */}
          <path
            d={path}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'fill-none',
              springClassName,
            )}
            style={{ 
              stroke: '#8B4513', 
              strokeWidth: '3px',
              opacity: isDragging ? 1 : 0.5 
            }}
          />
        </svg>
      )}
      <motion.div
        ref={childRef}
        className={cn(
          'z-40 relative',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          className,
        )}
        style={{
          x: springX,
          y: springY,
        }}
        drag
        dragElastic={dragElastic}
        dragMomentum={false}
        whileDrag={{ scale: 1.05 }}
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDrag={(_, info) => {
          x.set(info.offset.x);
          y.set(info.offset.y);
        }}
        onDragEnd={() => {
          x.set(0);
          y.set(0);
          setIsDragging(false);
        }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
}
 
export { SpringElement };