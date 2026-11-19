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
      className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mt-auto pt-3 pb-3 sm:pb-4 border-t border-[#E8B577]/40 pointer-events-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-6">

        {/* Left Side: Motto / Tagline with gold dot and link (Enlarged) */}
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8B577] shrink-0" />
            <p className="font-ui text-xs sm:text-sm lg:text-sm xl:text-base text-wine-950 font-medium leading-snug text-pretty">
              Menjunjung etika, mengutamakan inovasi, dan berani melampaui batas.
            </p>
          </div>
          <Link
            href="/tentang-kami"
            className="inline-flex items-center gap-1.5 text-xs sm:text-xs lg:text-sm font-semibold text-brand-burgundy hover:text-brand-darkWine pl-4 transition-colors group"
          >
            <span>Pelajari selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8B577] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side: 4 Executive Metrics Columns (Enlarged numbers & bold labels) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center justify-start lg:justify-end gap-3 sm:gap-6 sm:divide-x sm:divide-[#E8B577]/35 w-full lg:w-auto">
          
          {/* 1. Tahun Berdiri */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pr-0 sm:pr-4 lg:pr-5">
            <span className="font-serif font-black text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-wine-950 leading-none">
              2020
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs tracking-wider text-neutral-dark uppercase font-bold mt-1">
              TAHUN BERDIRI
            </span>
          </div>

          {/* 2. 4 Bidang */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4 lg:pl-5 pr-0 sm:pr-4 lg:pr-5">
            <span className="font-serif font-black text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-wine-950 leading-none">
              4
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs tracking-wider text-neutral-dark uppercase font-bold mt-1">
              BIDANG KERJA
            </span>
          </div>

          {/* 3. 8 Kompartemen */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4 lg:pl-5 pr-0 sm:pr-4 lg:pl-5">
            <span className="font-serif font-black text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-wine-950 leading-none">
              8
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs tracking-wider text-neutral-dark uppercase font-bold mt-1">
              KOMPARTEMEN
            </span>
          </div>

          {/* 4. Kader Pengusaha */}
          <div className="flex flex-col items-center sm:items-start lg:items-end text-center sm:text-left lg:text-right pl-0 sm:pl-4 lg:pl-5">
            <div className="flex items-center gap-0.5 text-wine-950 leading-none">
              <span className="font-serif font-black text-xl sm:text-2xl lg:text-2xl xl:text-3xl">
                100
              </span>
              <span className="text-gold-600 font-bold text-sm sm:text-base lg:text-lg">+</span>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs tracking-wider text-neutral-dark uppercase font-bold mt-1">
              KADER AKTIF
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
