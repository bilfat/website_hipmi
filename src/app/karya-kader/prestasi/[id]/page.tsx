"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  Users,
  Trophy,
  Crown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getAchievementVisual } from "../../karya-kader-data";

export default function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const ach = store.achievements.find((a) => a.id === id) || store.achievements[0];
  const visual = getAchievementVisual(ach?.id || "");

  if (!ach) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Piagam Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Data prestasi yang Anda cari tidak tersedia dalam direktori.</p>
          <Link
            href="/karya-kader/prestasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Galeri Prestasi</span>
          </Link>
        </div>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/karya-kader/prestasi"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Galeri Prestasi &amp; Penghargaan</span>
          </Link>
        </div>

        {/* Award Plaque Detail Frame */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border-2 border-gold-300 shadow-xl relative">
          <div className="h-2 w-full bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500" />

          {/* Photo Banner (16:9 Documentation) */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden">
            <Image
              src={visual.image}
              alt={ach.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                🏆 {ach.level} • {ach.year}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-mono">
              <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-gold-400/40 text-gold-300 font-bold">
                {visual.laurelBadge}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20">
                {visual.certificateNumber}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300 inline-block">
                Kategori: {ach.category}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950 leading-tight">
                {ach.title}
              </h1>

              <p className="text-xs text-neutral-light font-mono">
                Penyelenggara: <strong className="text-wine-950">{visual.organizer}</strong>
              </p>
            </div>

            <p className="text-sm text-neutral-dark leading-relaxed font-sans pt-3 border-t border-wine-950/10">
              {ach.description}
            </p>

            {/* Kader Mahasiswa Pengukir Prestasi */}
            <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-3">
              <span className="text-xs text-neutral-light font-mono uppercase tracking-wider block">
                Kader Mahasiswa Pengukir Prestasi:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {ach.cadre_names?.map((name, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-white border border-gold-300 text-wine-950 text-xs font-semibold flex items-center gap-2 shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-burgundy text-gold-200 text-[10px] font-bold flex items-center justify-center">
                      {name.charAt(0)}
                    </div>
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Verifikasi Portofolio */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-50/50 to-surface-ivory border border-gold-200/80 flex items-center gap-3.5 text-xs text-neutral-dark">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="text-wine-950 block">Terverifikasi Resmi HIPMI CENTRAL</strong>
                <span className="text-[11px] text-neutral-dark">
                  Portofolio ini telah diaudit dan disinkronisasikan dalam pangkalan data organisasi keanggotaan BPH ARTHAKARSA.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </PublicShell>
  );
}
