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
    <div className="relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm sm:max-w-md lg:max-w-[340px]">
      {/* Intro Content: Opacity 0 -> 1 and subtle slide up (Delay: 250ms, Duration: 1000ms) */}
      <motion.div
        className="w-full flex flex-col items-center lg:items-start"
        initial={isReducedMotion ? undefined : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.0,
          delay: isReducedMotion ? 0 : 0.25,
          ease: editorialEase,
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/20 text-brand-burgundy text-[11px] font-medium tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>{badge}</span>
        </div>

        {/* Title: ARTHAKARSA Serif Display */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-neutral-black leading-[1.25] tracking-tight mb-3">
          {title}
        </h2>

        {/* Description: Poppins */}
        <p className="font-ui text-xs sm:text-sm text-neutral-muted leading-relaxed mb-6 font-normal">
          {description}
        </p>
      </motion.div>

      {/* Main CTA Button: Opacity 0 -> 1 and subtle slide up (Delay: 570ms, Duration: 1000ms) */}
      <motion.div
        initial={isReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.0,
          delay: isReducedMotion ? 0 : 0.57,
          ease: editorialEase,
        }}
      >
        <Link
          href={ctaHref}
          className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-brand-burgundy text-white font-ui font-semibold text-xs sm:text-sm shadow-[0_6px_20px_rgba(90,23,34,0.28)] hover:bg-wine-950 hover:shadow-[0_10px_28px_rgba(61,15,22,0.36)] hover:translate-y-[-1px] transition-all duration-300"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};
