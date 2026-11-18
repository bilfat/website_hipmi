"use client";

import { useMockStore } from "@/lib/mock/store";
import CabinetDashboardPage from "../cabinets/[cabinetId]/page";

export default function DirectDashboardPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <CabinetDashboardPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
