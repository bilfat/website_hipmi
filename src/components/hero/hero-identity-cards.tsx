"use client";

import React from "react";
import { motion } from "framer-motion";
import { LeadershipProfile } from "./hero-config";

interface HeroIdentityCardsProps {
  leaders: [LeadershipProfile, LeadershipProfile];
  isReducedMotion?: boolean;
}

export const HeroIdentityCards: React.FC<HeroIdentityCardsProps> = ({
  leaders,
  isReducedMotion = false,
}) => {
  const [ketum, waketum] = leaders;

  // Cubic bezier easing per Section 9: cubic-bezier(0.22, 0.8, 0.3, 1)
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  return (
    <motion.div
      className="relative z-40 w-full max-w-[420px] mx-auto px-2 -mt-8 sm:-mt-10 lg:-mt-12 pointer-events-auto"
      initial={isReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: isReducedMotion ? 0 : 0.38,
        ease: editorialEase,
      }}
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3 justify-items-center">
        {/* Card 1 - Ketua Umum (Minimalist & Compact) */}
        <div
          className="w-full max-w-[130px] xs:max-w-[145px] sm:max-w-[175px] lg:max-w-[190px] rounded-xl sm:rounded-2xl py-1.5 px-2 sm:py-2 sm:px-2.5 bg-white/95 sm:bg-[#FCF8F6]/95 backdrop-blur-md border border-[#E8B4B8]/40 shadow-[0_4px_14px_rgba(61,15,22,0.08)] hover:shadow-[0_8px_20px_rgba(61,15,22,0.12)] transition-all duration-300 relative group overflow-hidden"
        >
          {/* Subtle Champagne Gold Top Line */}
          <div className="absolute top-0 left-2 right-2 sm:left-3 sm:right-3 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8B577] to-transparent opacity-90" />

          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-brand-burgundy uppercase mb-0.5 flex items-center gap-1 truncate">
              <span className="w-1 h-1 rounded-full bg-[#E8B577] inline-block shrink-0" />
              <span className="truncate">{ketum.role}</span>
            </span>
            <h3 className="font-display text-[11px] sm:text-xs md:text-[13px] font-bold text-neutral-black tracking-tight group-hover:text-brand-burgundy transition-colors duration-200 truncate w-full">
              {ketum.name}
            </h3>
            {ketum.bio && (
              <p className="font-ui text-[8px] sm:text-[9px] text-neutral-dark mt-0.5 truncate w-full font-medium">
                {ketum.bio}
              </p>
            )}
          </div>
        </div>

        {/* Card 2 - Wakil Ketua Umum (Minimalist & Compact) */}
        <div
          className="w-full max-w-[130px] xs:max-w-[145px] sm:max-w-[175px] lg:max-w-[190px] rounded-xl sm:rounded-2xl py-1.5 px-2 sm:py-2 sm:px-2.5 bg-white/95 sm:bg-[#FCF8F6]/95 backdrop-blur-md border border-[#E8B4B8]/40 shadow-[0_4px_14px_rgba(61,15,22,0.08)] hover:shadow-[0_8px_20px_rgba(61,15,22,0.12)] transition-all duration-300 relative group overflow-hidden"
        >
          {/* Subtle Champagne Gold Top Line */}
          <div className="absolute top-0 left-2 right-2 sm:left-3 sm:right-3 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8B577] to-transparent opacity-90" />

          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-brand-burgundy uppercase mb-0.5 flex items-center gap-1 truncate">
              <span className="w-1 h-1 rounded-full bg-[#E8B577] inline-block shrink-0" />
              <span className="truncate">{waketum.role}</span>
            </span>
            <h3 className="font-display text-[11px] sm:text-xs md:text-[13px] font-bold text-neutral-black tracking-tight group-hover:text-brand-burgundy transition-colors duration-200 truncate w-full">
              {waketum.name}
            </h3>
            {waketum.bio && (
              <p className="font-ui text-[8px] sm:text-[9px] text-neutral-dark mt-0.5 truncate w-full font-medium">
                {waketum.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
