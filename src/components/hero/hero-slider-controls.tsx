"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderControlsProps {
  totalSlides: number;
  activeSlide: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const HeroSliderControls: React.FC<HeroSliderControlsProps> = ({
  totalSlides,
  activeSlide,
  onPrev,
  onNext,
  onSelect,
}) => {
  // Section 10 & 11 Rule:
  // "Jika hanya satu slide, jangan menampilkan kontrol yang tidak memiliki fungsi."
  if (totalSlides <= 1) {
    return null;
  }

  return (
    <div
      className="relative z-50 flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto select-none"
      aria-label="Kontrol Navigasi Slide Hero"
    >
      {/* Tombol Sebelumnya di sudut kiri bawah */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Sebelumnya"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-md border border-[#E8B4B8]/40 text-brand-burgundy shadow-sm hover:bg-brand-burgundy hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Indikator titik di bagian tengah bawah */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === activeSlide;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              aria-label={`Buka Slide ${idx + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                isActive
                  ? "w-8 bg-brand-burgundy shadow-sm"
                  : "w-2.5 bg-[#E8B4B8]/70 hover:bg-brand-burgundy/45"
              }`}
            />
          );
        })}
      </div>

      {/* Tombol Berikutnya di sudut kanan bawah */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Berikutnya"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-md border border-[#E8B4B8]/40 text-brand-burgundy shadow-sm hover:bg-brand-burgundy hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
