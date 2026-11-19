"use client";

import { PublicShell } from "@/components/layout/public-shell";
import { CabinetHeaderHero } from "@/components/organization/cabinet-header-hero";
import { CabinetPresidiumSpotlight } from "@/components/organization/cabinet-presidium-spotlight";
import { CabinetLogoMindmap } from "@/components/organization/cabinet-logo-mindmap";
import { CabinetOrgChart } from "@/components/organization/cabinet-org-chart";
import { CabinetMembersDirectory } from "@/components/organization/cabinet-members-directory";
import { useMockStore } from "@/lib/mock/store";

export default function CabinetsListPage() {
  const { store } = useMockStore();

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
        {/* 1. LOGO & NAMA KABINET DI TENGAH (Hero Identity & Visi-Misi) */}
        <CabinetHeaderHero cabinet={activeCab} />

        {/* 2. KETUA UMUM DAN WAKIL KETUA UMUM (Presidium Spotlight) */}
        <CabinetPresidiumSpotlight />

        {/* 3. FILOSOFI LOGO (Mindmap Anatomi & Filosofi Pecahan Lambang ARTHAKARSA) */}
        <CabinetLogoMindmap />

        {/* 4. STRUKTURAL KABINET (Bagan Hirarki Interaktif & Animasi Alur Komando) */}
        <CabinetOrgChart />

        {/* 5. JAJARAN PENGURUS DAN ANGGOTA KABINET (Direktori Roster & Pencarian Fungsionaris) */}
        <CabinetMembersDirectory />
      </div>
    </PublicShell>
  );
}
