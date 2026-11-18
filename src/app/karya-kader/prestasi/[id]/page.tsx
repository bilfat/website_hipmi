"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Award, Calendar, Users, Trophy, ExternalLink } from "lucide-react";

export default function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const ach = store.achievements.find((a) => a.id === id) || store.achievements[0];

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Breadcrumb */}
        <Link
          href="/karya-kader/prestasi"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Galeri Prestasi</span>
        </Link>

        {/* Achievement Header Profile */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-mono text-xs font-bold uppercase">
                Tingkat {ach.level}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-ivory border border-wine-950/10 text-xs font-mono font-semibold text-neutral-dark">
                Tahun {ach.year}
              </span>
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-2">
                • {ach.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950 leading-tight">
              {ach.title}
            </h1>
          </div>

          <p className="text-sm text-neutral-dark leading-relaxed pt-4 border-t border-wine-950/10">
            {ach.description}
          </p>

          {/* Kader names badge (Single or Multi-kader) */}
          <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
            <span className="text-xs text-neutral-light font-medium block">
              Kader Mahasiswa Pengukir Prestasi:
            </span>
            <div className="flex flex-wrap gap-2">
              {ach.cadre_names.map((name, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-gold-50 border border-gold-300 text-wine-950 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Documentation Proof Box */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-4">
          <h2 className="font-serif font-bold text-xl text-wine-950">
            Dokumentasi &amp; Validasi Prestasi
          </h2>
          <p className="text-xs text-neutral-dark leading-relaxed">
            Data kejuaraan ini telah diverifikasi oleh Kompartemen Riset &amp; Pengelolaan Organisasi serta tersinkronisasi dalam pangkalan data portofolio anggota resmi HIPMI PT Universitas Telkom.
          </p>
          <div className="pt-2">
            <span className="text-xs text-neutral-light font-mono">
              Lampiran Piagam: <code className="text-brand-burgundy font-bold">{ach.documentation_url}</code>
            </span>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
