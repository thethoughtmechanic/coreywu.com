
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  number: number;
  setNumber: (num: number) => void;
}

export const Counter = ({ number, setNumber }: CounterProps) => {
  const increment = () => setNumber(number + 1);
  const decrement = () => setNumber(number - 1);

  return (
    <div className="flex items-center gap-4 p-6 bg-light-brown/30 rounded-xl border border-warm-brown/20">
      <button
        onClick={decrement}
        className="w-12 h-12 rounded-full bg-warm-brown text-cream hover:bg-hover-brown transition-colors duration-200 flex items-center justify-center font-semibold text-xl"
        aria-label="Decrement"
      >
        −
      </button>
      
      <motion.div
        key={number}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="text-3xl font-bold text-warm-brown min-w-[80px] text-center"
      >
        {number}
      </motion.div>
      
      <button
        onClick={increment}
        className="w-12 h-12 rounded-full bg-warm-brown text-cream hover:bg-hover-brown transition-colors duration-200 flex items-center justify-center font-semibold text-xl"
        aria-label="Increment"
      >
        +
      </button>
    </div>
  );
};
