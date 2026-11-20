"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function EditProfileRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal/profil?edit=true");
  }, [router]);

  return <BrandLoader message="Membuka formulir ubah profil..." />;
}
