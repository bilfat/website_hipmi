"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ADM-01 Cabinet Center is rendered without desktop sidebar as required by PRD,
  // but the mobile slide-over drawer remains fully operational on touch screens!
  const isCabinetCenter =
    pathname === "/admin" ||
    pathname === "/admin/kabinet" ||
    pathname === "/admin/cabinets";

  return (
    <DashboardShell currentArea="admin" hideDesktopSidebar={isCabinetCenter}>
      {children}
    </DashboardShell>
  );
}
