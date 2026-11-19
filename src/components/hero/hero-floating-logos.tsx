"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FLOATING_LOGOS, FloatingLogoConfig } from "./hero-config";

interface HeroFloatingLogosProps {
  isReducedMotion?: boolean;
}

export const HeroFloatingLogos: React.FC<HeroFloatingLogosProps> = ({
  isReducedMotion = false,
}) => {
  // Cubic bezier easing per Section 9: cubic-bezier(0.22, 0.8, 0.3, 1)
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-15"
      aria-hidden="true"
    >
      {FLOATING_LOGOS.map((logo: FloatingLogoConfig) => {
        const isBlurred = logo.isBlurred;

        return (
          <motion.div
            key={logo.id}
            className={`absolute ${
              isBlurred ? "hidden md:block " + (logo.blurClass || "blur-md") : ""
            }`}
            style={{
              left: logo.left,
              top: logo.top,
              width: logo.size,
              height: logo.size,
              opacity: logo.opacity,
            }}
            // Section 9 Entrance Animation: Appear and slide from right (Duration: 900ms, Delay: 0ms)
            initial={
              isReducedMotion
                ? { opacity: logo.opacity, x: 0 }
                : { opacity: 0, x: 50 }
            }
            animate={{
              opacity: logo.opacity,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0,
              ease: editorialEase,
            }}
          >
            {/* Section 8 Idle Floating Motion: Organic bobbing & subtle rotation (3.2s - 5.0s, easeInOut) */}
            <motion.div
              className="relative w-full h-full filter drop-shadow-[0_8px_20px_rgba(217,149,63,0.22)]"
              animate={
                isReducedMotion
                  ? { y: 0, rotate: logo.rotation }
                  : {
                      y: [-7, 9, -7],
                      rotate: [
                        logo.rotation - 2.5,
                        logo.rotation + 3,
                        logo.rotation - 2.5,
                      ],
                    }
              }
              transition={
                isReducedMotion
                  ? { duration: 0.3 }
                  : {
                      y: {
                        duration: logo.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: Math.abs(logo.delay),
                      },
                      rotate: {
                        duration: logo.duration * 1.25,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: Math.abs(logo.delay),
                      },
                    }
              }
            >
              <Image
                src={logo.src || "/assets/assets_logo/logo_ARTHAKARSA.PNG"}
                alt="Logo Melayang Hero"
                fill
                sizes="(max-width: 768px) 48px, 160px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
