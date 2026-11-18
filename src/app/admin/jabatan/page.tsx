"use client";

import { useMockStore } from "@/lib/mock/store";
import PositionsManagementPage from "../cabinets/[cabinetId]/positions/page";

export default function DirectPositionsPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <PositionsManagementPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
