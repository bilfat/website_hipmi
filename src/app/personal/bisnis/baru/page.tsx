"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function BisnisBaruRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/keanggotaan?tab=bisnis&new=true");
  }, [router]);

  return <BrandLoader message="Membuka formulir pendaftaran usaha..." />;
}
