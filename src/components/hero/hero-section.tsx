"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSilhouette } from "./hero-silhouette";
import { HeroFloatingLogos } from "./hero-floating-logos";
import { HeroIdentityCards } from "./hero-identity-cards";
import { HeroIntro } from "./hero-intro";
import { HeroMessage } from "./hero-message";
import { HeroSliderControls } from "./hero-slider-controls";
import { HeroBottomBar } from "./hero-bottom-bar";
import { HERO_SLIDES, HeroSlideData } from "./hero-config";
import { DecorativeLines } from "@/components/ui/decorative-lines";

export const HeroSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion media query per Section 13
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const slide: HeroSlideData = HERO_SLIDES[currentSlideIndex] || HERO_SLIDES[0];
  const editorialEase = [0.22, 0.8, 0.3, 1] as const;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) =>
      prev === HERO_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelect = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <section
      className="relative w-full min-h-[640px] sm:min-h-[700px] lg:h-[100dvh] lg:min-h-[620px] lg:max-h-[860px] xl:max-h-[900px] bg-gradient-to-b from-[#FFFFFF] via-[#FCF8F6] to-[#F8EFF1] overflow-hidden flex flex-col justify-between pt-12 sm:pt-14 lg:pt-14 pb-0 select-none"
      aria-label="Hero ARTHAKARSA Editorial"
    >
      {/* LAYER 1: Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Central warm glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[720px] sm:w-[980px] h-[450px] bg-gradient-to-b from-brand-burgundy/10 via-[#E8B577]/12 to-transparent rounded-full blur-3xl" />
        {/* Left mauve accent */}
        <div className="absolute top-1/3 -left-36 w-[450px] h-[450px] bg-[#A07A8E]/10 rounded-full blur-3xl" />
        {/* Right pale blush accent */}
        <div className="absolute top-1/4 -right-36 w-[480px] h-[480px] bg-brand-burgundy/8 rounded-full blur-3xl" />
      </div>

      {/* LAYER 2: Organic Thin Contour Lines */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <DecorativeLines
          variant="contour"
          className="inset-0 w-full h-full opacity-45"
        />
        <DecorativeLines
          variant="ribbon"
          className="bottom-14 w-full h-48 opacity-35"
        />
      </div>

      {/* LAYER 3: Giant Backdrop Typography "ARTHAKARSA"
          Positioned higher up and enlarged boldly across upper background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden -translate-y-20 sm:-translate-y-28 lg:-translate-y-32 xl:-translate-y-36"
        aria-hidden="true"
      >
        <motion.div
          key={`backdrop-${slide.id}`}
          className="w-full text-center px-2 sm:px-4"
          initial={isReducedMotion ? undefined : { x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0,
            ease: editorialEase,
          }}
        >
          <span
            className="block font-ui font-black text-[15vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[160px] xl:text-[195px] 2xl:text-[230px] leading-none tracking-[0.05em] sm:tracking-[0.08em] md:tracking-[0.10em] uppercase select-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(90, 23, 34, 0.32) 0%, rgba(221, 165, 173, 0.20) 65%, rgba(90, 23, 34, 0.05) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {slide.backdropWord}
          </span>
        </motion.div>
      </div>

      {/* LAYER 4: Floating Official ARTHAKARSA Logos */}
      <HeroFloatingLogos isReducedMotion={isReducedMotion} />

      {/* LAYER 5: 3-Column Content Frame (Silhouettes Anchored Flush to Bottom Bar) */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={isReducedMotion ? undefined : { opacity: 0.9 }}
            animate={{ opacity: 1 }}
            exit={isReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.97, ease: editorialEase }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end w-full"
          >
            {/* Left Column: HIPMI Introduction (Unmoved horizontal position, self-centered vertically) */}
            <div className="lg:col-span-3 order-2 lg:order-1 flex justify-center lg:justify-start lg:self-center pb-4 lg:pb-8">
              <HeroIntro
                badge={slide.introBadge}
                title={slide.introTitle}
                description={slide.introDescription}
                ctaText={slide.ctaText}
                ctaHref={slide.ctaHref}
                isReducedMotion={isReducedMotion}
              />
            </div>

            {/* Center Column: Dual Silhouette & Minimalist Identity Cards (Anchored to Bottom Bar) */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-end relative self-end">
              <HeroSilhouette isReducedMotion={isReducedMotion} />
              <HeroIdentityCards
                leaders={slide.leaders}
                isReducedMotion={isReducedMotion}
              />
            </div>

            {/* Right Column: Organization Editorial Message (Unmoved horizontal position, self-centered vertically) */}
            <div className="lg:col-span-3 order-3 flex justify-center lg:justify-end lg:self-center pb-4 lg:pb-8">
              <HeroMessage
                lines={slide.messageLines}
                isReducedMotion={isReducedMotion}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LAYER 5.5: Executive Metrics Bottom Bar (Pinned to Very Bottom Edge of Laptop Screen) */}
      <HeroBottomBar isReducedMotion={isReducedMotion} />

      {/* LAYER 6: Bottom Multi-Layer Organic Wave SVG (Subtle behind bottom bar) */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0 overflow-hidden leading-none opacity-40"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16"
        >
          {/* Layer 3: Dusty Rose transition wave */}
          <path
            d="M0,70 C320,130 520,30 840,90 C1160,150 1340,60 1440,75 L1440,180 L0,180 Z"
            fill="#F2E5E8"
            fillOpacity="0.75"
          />
          {/* Layer 4: Champagne Gold accent wave line */}
          <path
            d="M0,85 C280,145 560,50 880,105 C1200,160 1360,70 1440,90"
            stroke="#E8B577"
            strokeWidth="2"
            strokeOpacity="0.85"
            fill="none"
          />
          {/* Layer 2: Dark Wine deep foundation wave */}
          <path
            d="M0,105 C360,165 600,75 920,125 C1240,175 1380,95 1440,110 L1440,180 L0,180 Z"
            fill="#3D0F16"
            fillOpacity="0.14"
          />
          {/* Layer 1: Primary Burgundy organic crest */}
          <path
            d="M0,135 C300,175 580,115 900,150 C1220,185 1380,135 1440,145 L1440,180 L0,180 Z"
            fill="#5A1722"
            fillOpacity="0.10"
          />
        </svg>
      </div>

      {/* LAYER 7: Slider Controls (Previous / Next / Dots)
          Only displayed if multiple slides exist */}
      {HERO_SLIDES.length > 1 && (
        <div className="relative z-50 w-full pb-2">
          <HeroSliderControls
            totalSlides={HERO_SLIDES.length}
            activeSlide={currentSlideIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
          />
        </div>
      )}
    </section>
  );
};
