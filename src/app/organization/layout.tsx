"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function OrganizationAreaLayout({
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
