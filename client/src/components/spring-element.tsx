'use client';

import React from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface SpringElementProps {
  children: React.ReactNode;
  className?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export const SpringElement: React.FC<SpringElementProps> = ({ 
  children, 
  className = "",
  springConfig = { stiffness: 400, damping: 25, mass: 0.5 }
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const rotateSpring = useSpring(rotate, springConfig);

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    scale.set(1);
    rotate.set(0);
  };

  const handleDragEnd = () => {
    // Spring back to anchor point
    x.set(0);
    y.set(0);
    scale.set(1.05); // Slightly larger when back at anchor
    rotate.set(0);
  };

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
        scale: scaleSpring,
        rotate: rotateSpring,
      }}
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={() => {
        scale.set(1.1);
        rotate.set(Math.random() * 10 - 5); // Random slight rotation while dragging
      }}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.1,
        rotate: 3,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
};