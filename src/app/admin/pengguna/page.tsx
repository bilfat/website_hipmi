"use client";

import { useMockStore } from "@/lib/mock/store";
import UserManagementPage from "../cabinets/[cabinetId]/users/page";

export default function DirectUsersPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return <UserManagementPage params={Promise.resolve({ cabinetId: activeCab.id })} />;
}
