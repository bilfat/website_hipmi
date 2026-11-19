"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-3 sm:mt-4 lg:mt-3 pt-2.5 sm:pt-3.5 border-t border-[#E8B577]/35 pointer-events-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">

        {/* Left Side: Motto / Tagline with gold dot and link */}
        <div className="space-y-0.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B577] shrink-0" />
            <p className="font-ui text-[11px] sm:text-xs text-wine-950 font-medium leading-snug text-pretty">
              Menjunjung etika, mengutamakan inovasi, dan berani melampaui batas.
            </p>
          </div>
          <Link
            href="/tentang-kami"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-brand-burgundy hover:text-brand-darkWine pl-3.5 transition-colors group"
          >
            <span>Pelajari selengkapnya</span>
            <ArrowRight className="w-3 h-3 text-[#E8B577] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side: 4 Executive Metrics Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center justify-start lg:justify-end gap-3 sm:gap-5 sm:divide-x sm:divide-[#E8B577]/35 w-full lg:w-auto">
          
          {/* 1. Tahun Berdiri */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pr-0 sm:pr-4">
            <span className="font-serif font-black text-base sm:text-lg text-wine-950 leading-none">
              2020
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-neutral-dark uppercase font-semibold mt-0.5">
              TAHUN BERDIRI
            </span>
          </div>

          {/* 2. 4 Bidang */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4 pr-0 sm:pr-4">
            <span className="font-serif font-black text-base sm:text-lg text-wine-950 leading-none">
              4
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-neutral-dark uppercase font-semibold mt-0.5">
              BIDANG KERJA
            </span>
          </div>

          {/* 3. 8 Kompartemen */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4 pr-0 sm:pr-4">
            <span className="font-serif font-black text-base sm:text-lg text-wine-950 leading-none">
              8
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-neutral-dark uppercase font-semibold mt-0.5">
              KOMPARTEMEN
            </span>
          </div>

          {/* 4. Kader Pengusaha */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4">
            <div className="flex items-center gap-0.5 text-wine-950 leading-none">
              <span className="font-serif font-black text-base sm:text-lg">
                100
              </span>
              <span className="text-gold-600 font-bold text-xs sm:text-sm">+</span>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-neutral-dark uppercase font-semibold mt-0.5">
              KADER AKTIF
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
