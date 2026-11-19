"use client";

import React from "react";
import Image from "next/image";
import { FLOATING_LOGOS, FloatingLogoConfig } from "./hero-config";

interface HeroFloatingLogosProps {
  isReducedMotion?: boolean;
}

export const HeroFloatingLogos: React.FC<HeroFloatingLogosProps> = ({
  isReducedMotion = false,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-15"
      aria-hidden="true"
    >
      {FLOATING_LOGOS.map((logo: FloatingLogoConfig) => {
        // Calculate rotation bounds for smooth, organic swaying
        const rotStart = `${logo.rotation - 2.5}deg`;
        const rotMid = `${logo.rotation + 3}deg`;

        return (
          <div
            key={logo.id}
            className={`absolute pointer-events-none ${logo.className || ""}`}
            style={{
              opacity: logo.opacity,
            }}
          >
            {/* 
              Ultra-smooth GPU Compositor Bobbing & Swaying:
              Operates 100% on compositor thread (0% CPU, 120 FPS capable, zero lag/stutter).
            */}
            <div
              className="relative w-full h-full hero-floating-gpu"
              style={{
                animation: isReducedMotion
                  ? "none"
                  : `heroFloatGentle ${logo.duration}s ease-in-out infinite`,
                animationDelay: `${logo.delay}s`,
                // @ts-expect-error CSS variable custom properties
                "--rot-start": rotStart,
                "--rot-mid": rotMid,
              }}
            >
              <div className="relative w-full h-full drop-shadow-[0_4px_10px_rgba(217,149,63,0.18)]">
                <Image
                  src={logo.src || "/assets/assets_logo/logo_ARTHAKARSA.PNG"}
                  alt="Logo Melayang Hero"
                  fill
                  sizes="(max-width: 768px) 36px, 160px"
                  className="object-contain"
                  priority={logo.id === "fl-1" || logo.id === "fl-2"}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
