"use client";

import { useMockStore } from "@/lib/mock/store";
import ModuleConfigurationPage from "../cabinets/[cabinetId]/modules/page";

export default function DirectModulesPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <ModuleConfigurationPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
