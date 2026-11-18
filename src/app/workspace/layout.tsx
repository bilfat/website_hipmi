"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell currentArea="workspace">
      {children}
    </DashboardShell>
  );
}
