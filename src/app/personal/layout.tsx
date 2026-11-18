"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function PersonalAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell currentArea="personal">
      {children}
    </DashboardShell>
  );
}
