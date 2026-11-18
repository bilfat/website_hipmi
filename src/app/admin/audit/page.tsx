"use client";

import { useMockStore } from "@/lib/mock/store";
import AdminAuditLogPage from "../cabinets/[cabinetId]/audit/page";

export default function DirectAuditPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <AdminAuditLogPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
