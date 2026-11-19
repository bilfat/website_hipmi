"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PublicNavbar } from "./public-navbar";
import { PublicFooter } from "./public-footer";

interface PublicShellProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
}

export function PublicShell({ children, transparentHeader }: PublicShellProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const shouldBeSeamless = transparentHeader !== undefined ? transparentHeader : isHomePage;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-black relative selection:bg-brand-burgundy selection:text-white">
      <PublicNavbar isSeamlessAtTop={shouldBeSeamless} />
      <main className={`flex-1 pb-16 ${shouldBeSeamless ? "pt-0" : "pt-24 sm:pt-28"}`}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
