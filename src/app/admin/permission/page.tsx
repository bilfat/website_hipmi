"use client";

import { useMockStore } from "@/lib/mock/store";
import RolePermissionMatrixPage from "../cabinets/[cabinetId]/permissions/page";

export default function DirectPermissionsPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <RolePermissionMatrixPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
