"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  FolderKanban,
  Users,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BIDANG_ICONS, getProjectVisual } from "../../program-kerja/project-data";

export default function CompartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const comp = store.compartments.find((c) => c.id === id) || store.compartments[0];
  const parentField = store.fields.find((f) => f.id === comp?.field_id);
  const projects = store.projects.filter((p) => p.compartment_id === comp?.id);
  const fieldIcon = parentField ? BIDANG_ICONS[parentField.id] : null;

  if (!comp) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Kompartemen Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Kompartemen yang Anda cari tidak tersedia dalam direktori.</p>
          <Link
            href="/organisasi/kompartemen"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Kompartemen</span>
          </Link>
        </div>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/organisasi/kompartemen"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Kompartemen</span>
          </Link>
        </div>

        {/* HEADER PROFILE BANNER */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-50 to-white border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-xl shrink-0 shadow-md">
                {comp.code}
              </span>

              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-gold-50 text-brand-burgundy border border-gold-300">
                  KOMPARTEMEN PELAKSANA
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950">
                  {comp.name}
                </h1>
              </div>
            </div>

            {/* Parent Field Pill */}
            {parentField && (
              <Link
                href={`/organisasi/bidang/${parentField.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-ivory hover:bg-gold-50 border border-wine-950/15 text-xs font-medium text-wine-950 transition-all shadow-2xs group shrink-0"
              >
                {fieldIcon && (
                  <span className="relative w-4 h-4 shrink-0">
                    <Image src={fieldIcon} alt="" fill className="object-contain" />
                  </span>
                )}
                <span>Di Bawah Induk: <strong>{parentField.code} ({parentField.name.replace(/Bidang \d+:\s*/, "")})</strong></span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans pt-2 border-t border-wine-950/10">
            {comp.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Kepala Kompartemen (Kakom):
              </span>
              <strong className="text-wine-950 text-sm font-serif block">
                {comp.leader_name}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Induk Koordinasi:
              </span>
              <strong className="text-brand-burgundy text-sm block truncate">
                {parentField?.name || "Bidang Induk"}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Amanah Program:
              </span>
              <strong className="text-emerald-800 text-sm block">
                {projects.length} Program Kerja Aktif
              </strong>
            </div>
          </div>
        </div>

        {/* ==================== PROJECTS UNDER COMPARTMENT ==================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
                Aksi Nyata
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-2">
                Program Kerja Kompartemen ({projects.length})
              </h2>
            </div>

            <Link
              href="/organisasi/program-kerja"
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5"
            >
              <span>Buka Direktori Lengkap Program Kerja</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-surface-card border border-wine-950/10 text-neutral-dark text-xs space-y-2">
              <FolderKanban className="w-8 h-8 text-neutral-light mx-auto opacity-70" />
              <p className="font-medium">Belum ada program kerja yang ditugaskan ke kompartemen ini.</p>
              <p className="text-[11px] text-neutral-light">Kompartemen ini saat ini memfokuskan kinerjanya pada tata kelola internal dan operasional pendukung.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => {
                const visual = getProjectVisual(proj.id);

                return (
                  <div
                    key={proj.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image Cover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={visual.image}
                        alt={proj.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {proj.operational_status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-gold-300">
                        {visual.tag}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-1">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-neutral-dark line-clamp-2 mt-1">
                          {proj.purpose}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-neutral-light">
                          <span>{visual.progressStage}</span>
                          <span className="font-mono font-bold text-brand-burgundy">{visual.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-wine-950/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-burgundy to-gold-500"
                            style={{ width: `${visual.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-neutral-dark pt-2 border-t border-wine-950/10">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                          <span className="truncate">{proj.main_event_date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span className="truncate">{proj.location}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-wine-950/10 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-light font-mono">
                          {comp.code}
                        </span>
                        <Link
                          href={`/organisasi/program-kerja/${proj.id}`}
                          className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1"
                        >
                          <span>Detail</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </PublicShell>
  );
}
