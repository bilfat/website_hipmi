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
        className="relative flex items-end justify-center -space-x-8 xs:-space-x-12 sm:-space-x-24 md:-space-x-36 lg:-space-x-44 xl:-space-x-48 w-full max-w-[1000px]"
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
        <div className="relative z-20 w-[170px] xs:w-[220px] sm:w-[340px] md:w-[440px] lg:w-[510px] xl:w-[550px] aspect-square flex-shrink-0">
          <div
            className="w-full h-full transition-transform duration-500"
            style={{
              filter: "drop-shadow(0 20px 32px rgba(61, 15, 22, 0.38))",
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
        <div className="relative z-10 w-[160px] xs:w-[205px] sm:w-[320px] md:w-[415px] lg:w-[485px] xl:w-[520px] aspect-square flex-shrink-0 scale-x-[-1]">
          <div
            className="w-full h-full transition-transform duration-500"
            style={{
              filter: "drop-shadow(0 18px 28px rgba(61, 15, 22, 0.32))",
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
