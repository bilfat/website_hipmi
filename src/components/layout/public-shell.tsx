import React from "react";
import { PublicNavbar } from "./public-navbar";
import { PublicFooter } from "./public-footer";

interface PublicShellProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-ivory text-neutral-black relative selection:bg-brand-burgundy selection:text-white">
      <PublicNavbar />
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
