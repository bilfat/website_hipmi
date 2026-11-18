import React from "react";

interface DecorativeLinesProps {
  variant?: "contour" | "ribbon" | "orbit" | "frame";
  className?: string;
}

export function DecorativeLines({
  variant = "contour",
  className = "",
}: DecorativeLinesProps) {
  if (variant === "contour") {
    return (
      <div
        className={`pointer-events-none absolute overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-60"
        >
          <path
            d="M 50 400 C 180 280 320 340 550 150"
            stroke="#E8B577"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
          <path
            d="M 20 400 C 160 260 300 320 570 120"
            stroke="#E8B577"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <path
            d="M -10 400 C 140 240 280 300 590 90"
            stroke="#AF7D66"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
          <path
            d="M -40 400 C 120 220 260 280 610 60"
            stroke="#AF7D66"
            strokeWidth="0.75"
            strokeOpacity="0.15"
          />
        </svg>
      </div>
    );
  }

  if (variant === "ribbon") {
    return (
      <div
        className={`pointer-events-none absolute overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-70"
        >
          <path
            d="M 0 100 Q 300 20 600 100 T 1200 100"
            stroke="url(#ribbon-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M 0 120 Q 300 40 600 120 T 1200 120"
            stroke="#E8B577"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <defs>
            <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5A1722" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#AF7D66" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E8B577" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div
        className={`pointer-events-none absolute overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-60"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#E8B577"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            strokeOpacity="0.35"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="190"
            ry="110"
            transform="rotate(-25 200 200)"
            stroke="#AF7D66"
            strokeWidth="0.9"
            strokeOpacity="0.25"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-2 rounded-2xl border border-brand-antique-gold/20 ${className}`}
      aria-hidden="true"
    />
  );
}
