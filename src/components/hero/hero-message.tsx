"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroMessageProps {
  lines: string[];
  isReducedMotion?: boolean;
}

export const HeroMessage: React.FC<HeroMessageProps> = ({
  lines,
  isReducedMotion = false,
}) => {
  // Cubic bezier easing per Section 9: cubic-bezier(0.22, 0.8, 0.3, 1)
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  return (
    <motion.div
      className="relative z-30 flex flex-col items-center lg:items-end text-center lg:text-right max-w-sm sm:max-w-md lg:max-w-[320px]"
      initial={isReducedMotion ? undefined : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: isReducedMotion ? 0 : 0.33,
        ease: editorialEase,
      }}
    >
      {/* Short Accent Line Above Title */}
      <div className="w-12 h-1 bg-gradient-to-r from-gold-400 to-brand-burgundy rounded-full mb-2.5 hidden lg:block" />

      {/* Editorial Title */}
      <h3 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl font-extrabold text-brand-burgundy tracking-tight leading-snug uppercase">
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </h3>

      {/* Supporting subtle label */}
      <div className="mt-2.5 flex items-center gap-2 text-gold-800 text-[11px] sm:text-xs font-ui font-medium tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block" />
        <span>KABINET ARTHAKARSA</span>
      </div>
    </motion.div>
  );
};
