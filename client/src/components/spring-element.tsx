
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
  springConfig = { stiffness: 300, damping: 20, mass: 0.1 }
}) => {
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  
  const scaleSpring = useSpring(scale, springConfig);
  const rotateSpring = useSpring(rotate, springConfig);

  const handleMouseEnter = () => {
    scale.set(1.1);
    rotate.set(5);
  };

  const handleMouseLeave = () => {
    scale.set(1);
    rotate.set(0);
  };

  const handleMouseDown = () => {
    scale.set(0.95);
  };

  const handleMouseUp = () => {
    scale.set(1.1);
  };

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      style={{
        scale: scaleSpring,
        rotate: rotateSpring,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};
