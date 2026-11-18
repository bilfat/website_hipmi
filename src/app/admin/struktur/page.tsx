"use client";

import { useMockStore } from "@/lib/mock/store";
import CabinetStructurePage from "../cabinets/[cabinetId]/structure/page";

export default function DirectStructurePage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <CabinetStructurePage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
