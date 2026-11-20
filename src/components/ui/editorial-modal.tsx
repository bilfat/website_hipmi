"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface EditorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const WIDTH_CLASSES: Record<NonNullable<EditorialModalProps["maxWidth"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  "2xl": "max-w-4xl",
};

export function EditorialModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  maxWidth = "lg",
  children,
  footer,
}: EditorialModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editorial-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-wine-950/55 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className={`relative z-10 w-full ${WIDTH_CLASSES[maxWidth]} max-h-[90dvh] flex flex-col rounded-3xl bg-[#FFFDFB] border border-[#E8B577]/40 shadow-[0_24px_64px_rgba(61,15,22,0.22)] overflow-hidden`}
          >
            {/* Accent Top Hairline */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-darkWine via-[#E8B577] to-brand-burgundy shrink-0" />

            {/* Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E9E1DC] bg-[#FCF8F6]/80 flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1 min-w-0">
                {badge && (
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                    {badge}
                  </span>
                )}
                <h2
                  id="editorial-modal-title"
                  className="font-serif text-lg sm:text-xl font-bold text-wine-950 leading-snug"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs text-neutral-dark leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white border border-[#E9E1DC] text-neutral-dark hover:text-brand-burgundy hover:border-brand-burgundy/30 flex items-center justify-center shrink-0 transition-colors active:scale-95"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-5 sm:px-7 py-5 overflow-y-auto flex-1 min-h-0">
              {children}
            </div>

            {/* Optional Footer */}
            {footer && (
              <div className="px-5 sm:px-7 py-4 border-t border-[#E9E1DC] bg-[#FCF8F6]/80 flex flex-wrap items-center justify-end gap-2.5 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
