"use client";

import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowRight,
  Users,
  Building2,
  FolderKanban,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { getFieldMeta } from "./bidang-data";

export default function FieldsListPage() {
  const { store } = useMockStore();

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            <span>STRUKTUR ORGANISASI • KABINET ARTHAKARSA</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Empat Bidang Utama ARTHAKARSA
              </h1>
              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Empat pilar strategis kepengurusan HIPMI PT Universitas Telkom periode 2026/2027.
                Setiap bidang menaungi kompartemen pelaksana operasional untuk merealisasikan visi kemandirian wirausaha muda.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 bg-surface-card/80 backdrop-blur-md p-2.5 rounded-2xl border border-wine-950/10 shadow-sm shrink-0">
              <div className="px-3.5 py-1.5 rounded-xl bg-gold-50/80 border border-gold-200 text-center">
                <span className="block text-sm font-mono font-bold text-brand-burgundy">4</span>
                <span className="text-[10px] text-neutral-dark font-sans">Bidang Utama</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-surface-ivory border border-wine-950/10 text-center">
                <span className="block text-sm font-mono font-bold text-wine-950">8</span>
                <span className="text-[10px] text-neutral-dark font-sans">Kompartemen</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="block text-sm font-mono font-bold text-emerald-800">
                  {store.projects.length}
                </span>
                <span className="text-[10px] text-emerald-700 font-sans">Program Kerja</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. EMPAT BIDANG BENTO / GRID ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {store.fields.map((field) => {
            const compartments = store.compartments.filter((c) => c.field_id === field.id);
            const projects = store.projects.filter((p) => p.field_id === field.id);
            const meta = getFieldMeta(field.id);

            return (
              <div
                key={field.id}
                className="group relative rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Thematic Top Border Glow */}
                <div
                  className="h-1.5 w-full transition-all duration-500"
                  style={{ backgroundColor: meta.themeColor.accent }}
                />

                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Top Header with 3D Mascot Icon & Code */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* 3D Mascot Image Container */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-2.5 rounded-3xl bg-gradient-to-br from-gold-50 via-white to-gold-100/50 border border-gold-300 shadow-md group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 shrink-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={meta.icon3D}
                            alt={field.name}
                            fill
                            className="object-contain drop-shadow-md group-hover:rotate-1 transition-transform"
                            sizes="96px"
                            priority
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide border ${meta.themeColor.bgBadge} ${meta.themeColor.textBadge} ${meta.themeColor.border}`}>
                          {field.code}
                        </span>
                        <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine-950 group-hover:text-brand-burgundy transition-colors">
                          {field.name}
                        </h2>
                      </div>
                    </div>

                    {/* Proker Counter Pill */}
                    <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-ivory text-neutral-dark text-xs font-mono font-medium border border-wine-950/10 shrink-0">
                      <FolderKanban className="w-3.5 h-3.5 text-brand-burgundy" />
                      <span>{projects.length} Proker</span>
                    </span>
                  </div>

                  {/* Mandat Tagline */}
                  <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-light block">
                      Mandat Strategis Pilar:
                    </span>
                    <p className="text-xs sm:text-sm font-serif font-bold text-wine-950 mt-0.5">
                      &ldquo;{meta.mandat}&rdquo;
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans">
                    {field.description}
                  </p>

                  {/* Pimpinan (Kabid) Profil Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-surface-ivory to-gold-50/40 border border-wine-950/10 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-brand-burgundy text-gold-200 flex items-center justify-center font-serif font-bold text-base shrink-0 shadow-sm">
                      {field.leader_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-wine-950 text-xs sm:text-sm truncate block font-serif">
                          {field.leader_name}
                        </strong>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy font-bold shrink-0">
                          Kabid
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-light truncate block">
                        {meta.leaderInfo.faculty}
                      </span>
                    </div>
                  </div>

                  {/* Fokus Strategis */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-dark tracking-wider block">
                      Fokus Utama Bidang:
                    </span>
                    <ul className="space-y-1.5">
                      {meta.focusAreas.map((focus, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-dark">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kompartemen Binaan (Interactive Chips) */}
                  <div className="space-y-2 pt-2 border-t border-wine-950/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-neutral-dark tracking-wider">
                        Kompartemen Binaan ({compartments.length}):
                      </span>
                      <span className="text-[10px] text-neutral-light">Klik untuk buka</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {compartments.map((comp) => (
                        <Link
                          key={comp.id}
                          href={`/organisasi/kompartemen/${comp.id}`}
                          className="group/chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-ivory hover:bg-gold-50 text-wine-950 border border-wine-950/10 hover:border-gold-300 text-xs font-medium transition-all shadow-2xs"
                        >
                          <span className="font-mono text-[10px] font-bold text-brand-burgundy bg-gold-100 px-1.5 py-0.5 rounded">
                            {comp.code}
                          </span>
                          <span className="group-hover/chip:text-brand-burgundy transition-colors">{comp.name}</span>
                          <ChevronRight className="w-3 h-3 text-neutral-light group-hover/chip:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

                {/* ==================== DUAL ACTION FOOTER ==================== */}
                <div className="p-6 bg-surface-ivory/60 border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Link
                    href={`/organisasi/program-kerja?bidang=${field.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gold-50 text-wine-950 border border-wine-950/15 text-xs font-semibold shadow-2xs hover:border-gold-400 transition-all text-center"
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Lihat Proker Bidang Ini ({projects.length})</span>
                  </Link>

                  <Link
                    href={`/organisasi/bidang/${field.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow hover:shadow-md transition-all text-center"
                  >
                    <span>Detail Profil Bidang</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </PublicShell>
  );
}
