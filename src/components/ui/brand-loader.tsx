import React from "react";

interface BrandLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLoader({
  message = "Menyiapkan pengalaman HIPMI CENTRAL...",
  size = "md",
}: BrandLoaderProps) {
  const isSm = size === "sm";

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative flex items-center justify-center">
        {/* Outer subtle glowing orbit */}
        <div
          className={`animate-spin-slow rounded-full border border-brand-antique-gold/40 border-t-brand-burgundy ${
            isSm ? "h-14 w-14" : "h-24 w-24"
          }`}
          style={{ animationDuration: "3.5s" }}
        />
        {/* Inner reverse ring */}
        <div
          className={`absolute rounded-full border border-dashed border-accent-soft-gold/30 ${
            isSm ? "h-10 w-10" : "h-18 w-18"
          }`}
        />
        {/* Center Logo/Emblem */}
        <div className="absolute flex items-center justify-center">
          <img
            src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
            alt="ARTHAKARSA"
            className={`object-contain transition-transform duration-500 ${
              isSm ? "h-7 w-7" : "h-12 w-12"
            }`}
          />
        </div>
      </div>
      {message && (
        <p className="mt-4 font-ui text-sm text-neutral-muted tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
