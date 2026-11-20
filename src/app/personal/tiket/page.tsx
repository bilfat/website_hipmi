"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function TiketRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/aktivitas?tab=tiket");
  }, [router]);

  return <BrandLoader message="Membuka daftar tiket saya..." />;
}
