"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function BisnisRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/keanggotaan?tab=bisnis");
  }, [router]);

  return <BrandLoader message="Membuka katalog bisnis saya..." />;
}
