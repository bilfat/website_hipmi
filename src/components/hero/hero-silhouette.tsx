"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroSilhouetteProps {
  className?: string;
  isReducedMotion?: boolean;
}

export const HeroSilhouette: React.FC<HeroSilhouetteProps> = ({
  className = "",
  isReducedMotion = false,
}) => {
  // Cubic bezier easing per Section 9: cubic-bezier(0.22, 0.8, 0.3, 1)
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  return (
    <div
      className={`relative flex items-end justify-center pointer-events-none select-none ${className}`}
      aria-label="Siluet Dua Pimpinan Kabinet ARTHAKARSA"
    >
      {/* Dual Figure Container: Side-by-side with subtle overlap and depth */}
      <motion.div
        className="relative flex items-end justify-center -space-x-8 xs:-space-x-12 sm:-space-x-20 md:-space-x-28 lg:-space-x-32 xl:-space-x-36 w-full max-w-[850px]"
        initial={isReducedMotion ? undefined : { x: 70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: 0,
          ease: editorialEase,
        }}
      >
        {/* Figure 1 (Left - Ketua Umum)
            Primary Burgundy #5A1722 with Dark Wine #3D0F16 gradient fill via CSS masking */}
        <div className="relative z-20 w-[170px] xs:w-[210px] sm:w-[280px] md:w-[330px] lg:w-[340px] xl:w-[390px] 2xl:w-[440px] aspect-square flex-shrink-0">
          <div
            className="w-full h-full transition-transform duration-500"
            style={{
              filter: "drop-shadow(0 16px 28px rgba(61, 15, 22, 0.32))",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                maskImage: "url(/assets/siluet.png)",
                WebkitMaskImage: "url(/assets/siluet.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "bottom center",
                WebkitMaskPosition: "bottom center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                background: "linear-gradient(180deg, #6B1B28 0%, #5A1722 45%, #3D0F16 100%)",
              }}
              role="img"
              aria-label="Siluet Ketua Umum Kabinet ARTHAKARSA"
            />
          </div>
        </div>

        {/* Figure 2 (Right - Wakil Ketua Umum)
            Subtle horizontal mirror & scale offset for natural depth, Dark Wine #3D0F16 dominance */}
        <div className="relative z-10 w-[160px] xs:w-[195px] sm:w-[260px] md:w-[310px] lg:w-[320px] xl:w-[370px] 2xl:w-[415px] aspect-square flex-shrink-0 scale-x-[-1]">
          <div
            className="w-full h-full transition-transform duration-500"
            style={{
              filter: "drop-shadow(0 14px 24px rgba(61, 15, 22, 0.28))",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                maskImage: "url(/assets/siluet.png)",
                WebkitMaskImage: "url(/assets/siluet.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "bottom center",
                WebkitMaskPosition: "bottom center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                background: "linear-gradient(180deg, #52151E 0%, #3D0F16 55%, #24080D 100%)",
              }}
              role="img"
              aria-label="Siluet Wakil Ketua Umum Kabinet ARTHAKARSA"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
