"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  currentArea: "personal" | "organization" | "admin" | "workspace";
  hideDesktopSidebar?: boolean;
}

export function DashboardShell({ children, currentArea, hideDesktopSidebar = false }: DashboardShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-wine-950 flex flex-col md:flex-row antialiased selection:bg-brand-burgundy selection:text-white">
      {/* Desktop Sidebar: Sticky 100vh height */}
      {!hideDesktopSidebar && (
        <div className="hidden md:flex shrink-0 sticky top-0 h-screen">
          <DashboardSidebar currentArea={currentArea} />
        </div>
      )}

      {/* Mobile Slide-over Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer container */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 bg-brand-darkWine">
            <DashboardSidebar
              currentArea={currentArea}
              onCloseMobile={() => setMobileSidebarOpen(false)}
              isMobileDrawer
            />
          </div>
        </div>
      )}

      {/* Main Content Area: Takes remaining width & scrolls */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar
          currentArea={currentArea}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
