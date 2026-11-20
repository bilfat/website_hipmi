"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function PresensiRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/aktivitas?tab=kehadiran");
  }, [router]);

  return <BrandLoader message="Membuka riwayat kehadiran & e-sertifikat..." />;
}
