"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number; // percentage from 0 to 100
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotate: number;
  isRibbon: boolean;
}

export function FallingConfetti({ triggerBurst = 0 }: { triggerBurst?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    "#E8B577", // Champagne Gold
    "#D4AF37", // Metallic Gold
    "#FDF8ED", // Ivory Pearl
    "#5A1722", // Brand Burgundy
    "#C89D66", // Deep Gold
    "#3D0F16", // Dark Wine
    "#F43F5E", // Rose Gold
  ];

  // Generate initial ambient falling confetti
  useEffect(() => {
    const ambientPieces: ConfettiPiece[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      rotate: Math.random() * 360,
      isRibbon: Math.random() > 0.6,
    }));
    setPieces(ambientPieces);
  }, []);

  // Extra burst when user clicks "Rayakan Prestasi 🎉"
  const [burstPieces, setBurstPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (triggerBurst > 0) {
      const extra: ConfettiPiece[] = Array.from({ length: 35 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 95 + 2.5,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: Math.random() * 3 + 3,
        rotate: Math.random() * 720,
        isRibbon: Math.random() > 0.5,
      }));
      setBurstPieces(extra);

      const timer = setTimeout(() => {
        setBurstPieces([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [triggerBurst]);

  const allPieces = [...pieces, ...burstPieces];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {allPieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: -30,
            x: `${p.x}vw`,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0.8, 0],
            y: ["0vh", "75vh"],
            x: [`${p.x}vw`, `${p.x + (Math.sin(p.id) * 6)}vw`],
            rotate: [p.rotate, p.rotate + 360 + (p.id % 2 === 0 ? 180 : -180)],
            scaleX: [1, 0.3, 1, 0.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: p.isRibbon ? `${p.size * 1.8}px` : `${p.size}px`,
            height: p.isRibbon ? `${p.size * 0.5}px` : `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.isRibbon ? "2px" : "3px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
      ))}
    </div>
  );
}
