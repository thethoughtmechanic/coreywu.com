
'use client';

import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface SpringPathConfig {
  coilCount?: number;
  amplitudeMin?: number;
  amplitudeMax?: number;
  curveRatioMin?: number;
  curveRatioMax?: number;
  bezierOffset?: number;
}

interface SpringConfig {
  stiffness?: number;
  damping?: number;
}

interface SpringElementProps {
  children: React.ReactElement;
  className?: string;
  springPathConfig?: SpringPathConfig;
  springConfig?: SpringConfig;
  dragElastic?: number;
  springClassName?: string;
}

export const SpringElement: React.FC<SpringElementProps> = ({
  children,
  className = '',
  springPathConfig = {
    coilCount: 8,
    amplitudeMin: 8,
    amplitudeMax: 20,
    curveRatioMin: 0.5,
    curveRatioMax: 1,
    bezierOffset: 8
  },
  springConfig = { stiffness: 200, damping: 16 },
  dragElastic = 0.4,
  springClassName = ''
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Generate spring path based on current position
  const springPath = useTransform([xSpring, ySpring], ([currentX, currentY]) => {
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    
    if (distance < 1) return '';

    const {
      coilCount = 8,
      amplitudeMin = 8,
      amplitudeMax = 20,
      curveRatioMin = 0.5,
      curveRatioMax = 1,
      bezierOffset = 8
    } = springPathConfig;

    // Calculate amplitude based on distance
    const normalizedDistance = Math.min(distance / 200, 1);
    const amplitude = amplitudeMin + (amplitudeMax - amplitudeMin) * normalizedDistance;

    // Calculate perpendicular direction for coil
    const angle = Math.atan2(currentY, currentX);
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    let path = `M 0 0`;

    // Create spring coils
    for (let i = 0; i <= coilCount; i++) {
      const t = i / coilCount;
      const x = currentX * t;
      const y = currentY * t;
      
      // Add coil displacement
      const coilPhase = (i % 2 === 0 ? 1 : -1);
      const coilAmplitude = amplitude * Math.sin(Math.PI * t) * coilPhase;
      
      const coilX = x + perpX * coilAmplitude;
      const coilY = y + perpY * coilAmplitude;

      if (i === 0) {
        path += ` L ${coilX} ${coilY}`;
      } else {
        // Use curve for smooth coils
        const prevT = (i - 1) / coilCount;
        const prevX = currentX * prevT;
        const prevY = currentY * prevT;
        const prevCoilAmplitude = amplitude * Math.sin(Math.PI * prevT) * (((i - 1) % 2 === 0 ? 1 : -1));
        const prevCoilX = prevX + perpX * prevCoilAmplitude;
        const prevCoilY = prevY + perpY * prevCoilAmplitude;

        const controlRatio = curveRatioMin + (curveRatioMax - curveRatioMin) * Math.random();
        const controlX = (prevCoilX + coilX) / 2 + perpX * bezierOffset * controlRatio;
        const controlY = (prevCoilY + coilY) / 2 + perpY * bezierOffset * controlRatio;

        path += ` Q ${controlX} ${controlY} ${coilX} ${coilY}`;
      }
    }

    return path;
  });

  const handleDragEnd = () => {
    // Spring back to anchor point (0, 0)
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Spring line */}
      <svg
        className={`absolute inset-0 pointer-events-none overflow-visible ${springClassName}`}
        style={{ zIndex: -1 }}
      >
        <motion.path
          d={springPath}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-warm-brown/40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Draggable element */}
      <motion.div
        drag
        dragElastic={dragElastic}
        dragMomentum={false}
        style={{
          x: xSpring,
          y: ySpring,
        }}
        onDragEnd={handleDragEnd}
        className="cursor-grab active:cursor-grabbing relative z-10"
        whileDrag={{ scale: 1.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
