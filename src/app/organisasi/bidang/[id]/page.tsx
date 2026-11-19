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
  Users,
  FolderKanban,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { getFieldMeta } from "../bidang-data";
import { getProjectVisual } from "../../program-kerja/project-data";

export default function FieldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const field = store.fields.find((f) => f.id === id) || store.fields[0];
  const compartments = store.compartments.filter((c) => c.field_id === field?.id);
  const projects = store.projects.filter((p) => p.field_id === field?.id);
  const meta = getFieldMeta(field?.id || "");

  if (!field) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Bidang Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Bidang yang Anda cari tidak tersedia dalam direktori.</p>
          <Link
            href="/organisasi/bidang"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Bidang</span>
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
            href="/organisasi/bidang"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Empat Bidang</span>
          </Link>
        </div>

        {/* HEADER PROFILE BANNER */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl relative">
          <div
            className="h-2 w-full"
            style={{ backgroundColor: meta.themeColor.accent }}
          />

          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                {/* 3D Icon */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-3 rounded-3xl bg-gradient-to-br from-gold-50 via-white to-gold-100 border border-gold-300 shadow-md shrink-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={meta.icon3D}
                      alt={field.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border ${meta.themeColor.bgBadge} ${meta.themeColor.textBadge} ${meta.themeColor.border}`}>
                    {field.code} • KABINET ARTHAKARSA
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950">
                    {field.name}
                  </h1>
                </div>
              </div>

              {/* Action: Langsung Lihat Proker */}
              <Link
                href={`/organisasi/program-kerja?bidang=${field.id}`}
                className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow flex items-center gap-2 shrink-0"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Lihat Proker Bidang ({projects.length})</span>
              </Link>
            </div>

            {/* Mandat Tagline Box */}
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-light block">
                Mandat Strategis Pilar:
              </span>
              <p className="text-sm sm:text-base font-serif font-bold text-wine-950 mt-1">
                &ldquo;{meta.mandat}&rdquo;
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans">
              {field.description}
            </p>

            {/* Kabid Profile & Fokus Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Leader Card */}
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-burgundy text-gold-200 flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-sm">
                  {field.leader_name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-burgundy font-bold block">
                    Kepala Bidang (Kabid):
                  </span>
                  <strong className="text-wine-950 text-sm font-serif block">
                    {field.leader_name}
                  </strong>
                  <span className="text-xs text-neutral-light block mt-0.5">
                    {meta.leaderInfo.faculty}
                  </span>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-around text-center">
                <div>
                  <span className="text-lg font-serif font-bold text-wine-950 block">
                    {compartments.length}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-light uppercase">
                    Kompartemen Kerja
                  </span>
                </div>
                <div className="h-8 w-px bg-wine-950/10" />
                <div>
                  <span className="text-lg font-serif font-bold text-brand-burgundy block">
                    {projects.length}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-light uppercase">
                    Program Kerja Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Fokus Strategis */}
            <div className="space-y-2 pt-2 border-t border-wine-950/10">
              <span className="text-xs font-mono font-bold uppercase text-neutral-dark tracking-wider block">
                Fokus Utama Pelaksanaan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {meta.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-ivory/70 border border-wine-950/10 flex items-start gap-2 text-xs text-neutral-dark"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==================== 2. KOMPARTEMEN KERJA BINAAN ==================== */}
        <section className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Unit Pelaksana
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-2">
              Dua Kompartemen Pelaksana ({compartments.length})
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark mt-1">
              Unit spesialis di bawah naungan {field.name} yang bertugas mengeksekusi aksi nyata di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {compartments.map((comp) => {
              const compProjects = store.projects.filter((p) => p.compartment_id === comp.id);

              return (
                <div
                  key={comp.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-gold-50 text-brand-burgundy font-mono text-xs font-bold border border-gold-300">
                        {comp.code}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-light">
                        {compProjects.length} Proker Terkelola
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-lg text-wine-950">
                        {comp.name}
                      </h3>
                      <p className="text-[11px] text-neutral-light mt-1">
                        Kepala Kompartemen: <strong className="text-wine-950">{comp.leader_name}</strong>
                      </p>
                      <p className="text-xs text-neutral-dark mt-2 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>

                    {/* Proker chips inside compartment */}
                    {compProjects.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-wine-950/10">
                        <span className="text-[10px] font-mono uppercase text-neutral-light block">
                          Agenda Program:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {compProjects.map((p) => (
                            <Link
                              key={p.id}
                              href={`/organisasi/program-kerja/${p.id}`}
                              className="px-2.5 py-1 rounded-lg bg-surface-ivory text-neutral-black hover:text-brand-burgundy border border-wine-950/10 text-[11px] font-medium transition-colors"
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-wine-950/10 flex items-center justify-end">
                    <Link
                      href={`/organisasi/kompartemen/${comp.id}`}
                      className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1 group"
                    >
                      <span>Buka Profil Kompartemen</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== 3. PROGRAM KERJA DI BAWAH BIDANG INI ==================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
                Aksi Nyata
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-2">
                Program Kerja Bidang ({projects.length})
              </h2>
            </div>

            <Link
              href={`/organisasi/program-kerja?bidang=${field.id}`}
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5"
            >
              <span>Lihat di Direktori Lengkap Program Kerja</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const comp = store.compartments.find((c) => c.id === proj.compartment_id);
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
                      <h4 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-1">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-neutral-dark line-clamp-2 mt-1">
                        {proj.purpose}
                      </p>
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
                        {comp?.code}
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
        </section>

      </div>
    </PublicShell>
  );
}
