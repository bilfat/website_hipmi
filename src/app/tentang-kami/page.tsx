"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { useMockStore } from "@/lib/mock/store";
import { 
  Building2, 
  Award, 
  Target, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Briefcase
} from "lucide-react";

export default function AboutPage() {
  const { store } = useMockStore();
  const activeCabinet = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  return (
    <PublicShell>
      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-surface-card border-b border-wine-950/10">
        <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-30" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Profil Organisasi
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950">
              Tentang HIPMI PT Universitas Telkom
            </h1>
            <p className="text-sm sm:text-base text-neutral-dark leading-relaxed">
              Wadah resmi mahasiswa wirausaha di lingkungan Universitas Telkom yang bernaung di bawah Himpunan Pengusaha Muda Indonesia (HIPMI).
            </p>
          </div>
        </div>
      </section>

      {/* 1. Sejarah & Latar Belakang */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
                  Jejak Langkah
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                  Sejarah &amp; Perjalanan Berdiri
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
                HIPMI Perguruan Tinggi (PT) Universitas Telkom didirikan atas semangat membangkitkan ekosistem wirausaha mahasiswa yang tidak hanya berorientasi pada pencarian kerja, melainkan berani menjadi pencipta lapangan kerja baru bagi bangsa.
              </p>
              <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
                Sebagai entitas otonom di bawah koordinasi Badan Pengurus Cabang (BPC) HIPMI Kabupaten Bandung serta bermitra erat dengan Direktorat Kemahasiswaan (Ditmawa) Universitas Telkom, HIPMI PT Telkom menjadi jembatan penting antara dunia akademisi, praktisi industri, dan jaringan investor nasional.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 space-y-1">
                  <p className="font-serif text-2xl font-bold text-brand-burgundy">2020</p>
                  <p className="text-xs text-neutral-dark font-medium">Inisiasi Komunitas Perintis</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 space-y-1">
                  <p className="font-serif text-2xl font-bold text-brand-burgundy">BPC</p>
                  <p className="text-xs text-neutral-dark font-medium">Afiliasi Resmi Kabupaten Bandung</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-surface-card p-6 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-wine-950/10">
                  <div className="w-16 h-16 relative rounded-2xl bg-surface-ivory p-2 border border-gold-400/40 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/assets_logo/logo_hipmi.png"
                      alt="Logo HIPMI"
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950">Lambang HIPMI</h3>
                    <p className="text-xs text-neutral-dark">Pohon beringin dan keris melambangkan kekokohan tekad wirausaha muda nusantara.</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-neutral-dark">
                  <div className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3">
                    <Award className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-wine-950 block">Integritas Bisnis</strong>
                      <span>Menanamkan etika berwirausaha yang adil, jujur, dan bertanggung jawab sosial.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3">
                    <Users className="w-4 h-4 text-brand-burgundy mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-wine-950 block">Jejaring Nasional</strong>
                      <span>Akses jejaring ke ribuan pengusaha muda alumni HIPMI di 34 provinsi se-Indonesia.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filosofi Kabinet ARTHAKARSA */}
      {/* Bagian filosofi dihapus total sesuai permintaan user */}

      {/* 3. Dewan Pembina & Mitra Strategis */}
      {/* Bagian dewan pembina & mitra dihapus total sesuai permintaan user */}
    </PublicShell>
  );
}
