"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export function OrganizationShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell currentArea="organization">
      {children}
    </DashboardShell>
  );
}
