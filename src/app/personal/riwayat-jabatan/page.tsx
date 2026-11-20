"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function RiwayatJabatanRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/keanggotaan?tab=jabatan");
  }, [router]);

  return <BrandLoader message="Membuka riwayat jabatan..." />;
}
