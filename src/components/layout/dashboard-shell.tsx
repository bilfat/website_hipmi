"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

const DashboardShellContext = createContext(false);

interface DashboardShellProps {
  children: React.ReactNode;
  currentArea: "personal" | "organization" | "admin" | "workspace";
  hideDesktopSidebar?: boolean;
}

export function DashboardShell({
  children,
  currentArea,
  hideDesktopSidebar = false,
}: DashboardShellProps) {
  const isAlreadyInsideShell = useContext(DashboardShellContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Prevent double sidebar/topbar when pages still wrap <OrganizationShell> inside shared layout.tsx
  if (isAlreadyInsideShell) {
    return <>{children}</>;
  }

  return (
    <DashboardShellContext.Provider value={true}>
      <div className="min-h-dvh md:h-dvh md:overflow-hidden bg-[#FCF8F6] text-wine-950 flex flex-col md:flex-row antialiased selection:bg-brand-burgundy/20 selection:text-brand-darkWine relative">
        {/* Subtle Aurora Editorial Ambient Background (consistent with public site & personal area) */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-75"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 86% 12%, rgba(232, 181, 119, 0.16), transparent 34%), radial-gradient(circle at 18% 88%, rgba(175, 125, 102, 0.11), transparent 38%), #FCF8F6",
          }}
        />

        {/* Desktop Sidebar: Locked full-height sticky container (never scrolls with right content) */}
        {!hideDesktopSidebar && (
          <div className="hidden md:flex shrink-0 h-dvh sticky top-0 z-30">
            <DashboardSidebar currentArea={currentArea} />
          </div>
        )}

        {/* Mobile Slide-over Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-wine-950/60 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
                aria-hidden="true"
              />
              {/* Drawer container */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="relative w-72 max-w-[85vw] h-full shadow-2xl flex flex-col z-10 bg-brand-darkWine"
              >
                <DashboardSidebar
                  currentArea={currentArea}
                  onCloseMobile={() => setMobileSidebarOpen(false)}
                  isMobileDrawer
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area: Independent vertical scroll container */}
        <div className="relative z-10 flex-1 flex flex-col min-w-0 md:h-dvh md:overflow-y-auto scroll-smooth">
          <DashboardTopbar
            currentArea={currentArea}
            onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </DashboardShellContext.Provider>
  );
}
