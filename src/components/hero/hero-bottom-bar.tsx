"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBottomBarProps {
  isReducedMotion?: boolean;
}

export const HeroBottomBar: React.FC<HeroBottomBarProps> = ({
  isReducedMotion = false,
}) => {
  return (
    <motion.div
      initial={isReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.8, 0.3, 1] }}
      className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mt-6 lg:mt-8 pt-4 sm:pt-5 border-t border-[#E8B577]/40 pointer-events-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">

        {/* Left Side: Motto / Tagline with gold dot and link */}
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8B577] shrink-0" />
            <p className="font-ui text-xs sm:text-sm text-wine-950 font-medium leading-relaxed">
              Menjunjung etika, mengutamakan inovasi, dan berani melampaui batas.
            </p>
          </div>
          <Link
            href="/tentang-kami"
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine pl-4 transition-colors group"
          >
            <span>Pelajari selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8B577] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side: 4 Executive Metrics Columns (Matching reference layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center justify-start lg:justify-end gap-4 sm:gap-6 sm:divide-x sm:divide-[#E8B577]/35 w-full lg:w-auto">
          
          {/* 1. Tahun Berdiri */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pr-0 sm:pr-6">
            <span className="font-serif font-extrabold text-lg sm:text-xl text-wine-950 leading-none">
              2020
            </span>
            <span className="font-mono text-[11px] tracking-wider text-neutral-dark uppercase font-semibold mt-1">
              TAHUN BERDIRI
            </span>
          </div>

          {/* 2. 4 Bidang */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-6 pr-0 sm:pr-6">
            <span className="font-serif font-extrabold text-lg sm:text-xl text-wine-950 leading-none">
              4
            </span>
            <span className="font-mono text-[11px] tracking-wider text-neutral-dark uppercase font-semibold mt-1">
              BIDANG KERJA
            </span>
          </div>

          {/* 3. UKM Entrepreneur */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-6 pr-0 sm:pr-6">
            <span className="font-serif font-extrabold text-lg sm:text-xl text-wine-950 leading-none">
              Top 1
            </span>
            <span className="font-mono text-[11px] tracking-wider text-neutral-dark uppercase font-semibold mt-1">
              UKM ENTREPRENEUR
            </span>
          </div>

          {/* 4. Jejaring Bisnis Tanpa Batas (with ∞ icon as in reference image) */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-6">
            <div className="flex items-center justify-center sm:justify-start lg:justify-end h-[20px] text-wine-950">
              <InfinityIcon className="w-6 h-6 text-wine-950 stroke-[2.5]" />
            </div>
            <span className="font-mono text-[11px] tracking-wider text-neutral-dark uppercase font-semibold mt-1">
              JEJARING TANPA BATAS
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
