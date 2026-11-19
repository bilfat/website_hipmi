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
      className="relative z-40 w-full max-w-[680px] mx-auto px-2 -mt-8 xs:-mt-10 sm:-mt-16 md:-mt-20 lg:-mt-24 pointer-events-auto"
      initial={isReducedMotion ? undefined : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.0,
        delay: isReducedMotion ? 0 : 0.41,
        ease: editorialEase,
      }}
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-6 justify-items-center">
        {/* Card 1 - Ketua Umum (Figur Kiri) */}
        <div
          className="w-full max-w-[160px] xs:max-w-[190px] sm:max-w-[310px] rounded-2xl p-2.5 sm:p-4 bg-white/90 sm:bg-[#FCF8F6]/85 backdrop-blur-md border border-[#E8B4B8]/40 shadow-[0_8px_24px_rgba(61,15,22,0.08)] hover:shadow-[0_12px_32px_rgba(61,15,22,0.12)] transition-all duration-300 relative group overflow-hidden"
        >
          {/* Champagne Gold Accent Line at Top */}
          <div className="absolute top-0 left-2 right-2 sm:left-4 sm:right-4 h-[2px] bg-gradient-to-r from-transparent via-[#E8B577] to-transparent opacity-90" />

          <div className="flex flex-col items-center text-center">
            <span className="font-ui text-[11px] font-semibold tracking-wider sm:tracking-widest text-brand-burgundy uppercase mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B577] inline-block shrink-0" />
              <span className="truncate">{ketum.role}</span>
            </span>
            <h3 className="font-display text-xs sm:text-lg font-bold text-neutral-black tracking-tight group-hover:text-brand-burgundy transition-colors duration-200 truncate w-full">
              {ketum.name}
            </h3>
            {ketum.bio && (
              <p className="font-ui text-[11px] text-neutral-muted mt-0.5 line-clamp-1">
                {ketum.bio}
              </p>
            )}
          </div>
        </div>

        {/* Card 2 - Wakil Ketua Umum (Figur Kanan) */}
        <div
          className="w-full max-w-[160px] xs:max-w-[190px] sm:max-w-[310px] rounded-2xl p-2.5 sm:p-4 bg-white/90 sm:bg-[#FCF8F6]/85 backdrop-blur-md border border-[#E8B4B8]/40 shadow-[0_8px_24px_rgba(61,15,22,0.08)] hover:shadow-[0_12px_32px_rgba(61,15,22,0.12)] transition-all duration-300 relative group overflow-hidden"
        >
          {/* Champagne Gold Accent Line at Top */}
          <div className="absolute top-0 left-2 right-2 sm:left-4 sm:right-4 h-[2px] bg-gradient-to-r from-transparent via-[#E8B577] to-transparent opacity-90" />

          <div className="flex flex-col items-center text-center">
            <span className="font-ui text-[11px] font-semibold tracking-wider sm:tracking-widest text-brand-burgundy uppercase mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B577] inline-block shrink-0" />
              <span className="truncate">{waketum.role}</span>
            </span>
            <h3 className="font-display text-xs sm:text-lg font-bold text-neutral-black tracking-tight group-hover:text-brand-burgundy transition-colors duration-200 truncate w-full">
              {waketum.name}
            </h3>
            {waketum.bio && (
              <p className="font-ui text-[11px] text-neutral-muted mt-0.5 line-clamp-1">
                {waketum.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
