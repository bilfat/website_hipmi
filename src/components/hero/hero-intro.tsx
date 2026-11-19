"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroIntroProps {
  badge?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  isReducedMotion?: boolean;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  badge = "HIPMI PT TELKOM UNIVERSITY",
  title,
  description,
  ctaText,
  ctaHref,
  isReducedMotion = false,
}) => {
  // Cubic bezier easing per Section 9: cubic-bezier(0.22, 0.8, 0.3, 1)
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  return (
    <div className="relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm sm:max-w-md lg:max-w-[320px]">
      {/* Intro Content */}
      <motion.div
        className="w-full flex flex-col items-center lg:items-start"
        initial={isReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: isReducedMotion ? 0 : 0.25,
          ease: editorialEase,
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/20 text-brand-burgundy text-[10px] sm:text-[11px] font-medium tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl sm:text-2xl lg:text-2xl xl:text-[26px] font-extrabold text-neutral-black leading-[1.2] tracking-tight mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="font-ui text-xs sm:text-xs lg:text-[13px] text-neutral-muted leading-relaxed mb-4 font-normal line-clamp-3 lg:line-clamp-none">
          {description}
        </p>
      </motion.div>

      {/* Main CTA Button */}
      <motion.div
        initial={isReducedMotion ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: isReducedMotion ? 0 : 0.45,
          ease: editorialEase,
        }}
      >
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-brand-burgundy hover:bg-wine-950 text-white font-ui text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};
