"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Building2,
  ArrowRight,
  FolderKanban,
  Sparkles,
  Users,
  Search,
  X,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { BIDANG_ICONS } from "../program-kerja/project-data";

export default function CompartmentsListPage() {
  const { store } = useMockStore();
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter compartments
  const filteredCompartments = useMemo(() => {
    return store.compartments.filter((comp) => {
      // Field filter
      if (selectedFieldFilter !== "all" && comp.field_id !== selectedFieldFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = comp.name.toLowerCase().includes(query);
        const matchLeader = comp.leader_name.toLowerCase().includes(query);
        const matchDesc = comp.description.toLowerCase().includes(query);
        if (!matchName && !matchLeader && !matchDesc) return false;
      }

      return true;
    });
  }, [store.compartments, selectedFieldFilter, searchQuery]);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            <span>UNIT PELAKSANA SPESIALIS • KABINET ARTHAKARSA</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Delapan Kompartemen Kerja ARTHAKARSA
              </h1>
              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Garda terdepan unit operasional teknis kepengurusan yang mengemban tugas spesifik pada pembinaan kader,
                inkubasi bisnis mahasiswa, penggalangan kerjasama mitra, publikasi media, dan riset teknologi.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 bg-surface-card/80 backdrop-blur-md p-2.5 rounded-2xl border border-wine-950/10 shadow-sm shrink-0">
              <div className="px-3.5 py-1.5 rounded-xl bg-gold-50/80 border border-gold-200 text-center">
                <span className="block text-sm font-mono font-bold text-brand-burgundy">8</span>
                <span className="text-[10px] text-neutral-dark font-sans">Kompartemen</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-surface-ivory border border-wine-950/10 text-center">
                <span className="block text-sm font-mono font-bold text-wine-950">4</span>
                <span className="text-[10px] text-neutral-dark font-sans">Induk Bidang</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. FILTER INDUK BIDANG & PENCARIAN ==================== */}
        <section className="space-y-4 pt-2">
          
          {/* Search bar & count */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama kompartemen atau nama kepala..."
                className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-surface-card border border-wine-950/15 text-xs sm:text-sm text-wine-950 placeholder:text-neutral-light focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/10 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-light/20 text-neutral-dark"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-neutral-dark flex items-center gap-2">
              <span>
                Menampilkan <strong className="text-wine-950 font-mono">{filteredCompartments.length}</strong> dari 8 Kompartemen
              </span>
              {(selectedFieldFilter !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedFieldFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-burgundy hover:text-brand-darkWine font-semibold underline text-xs ml-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Filter Tab Induk Bidang */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-dark flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-brand-burgundy" />
              Filter Berdasarkan Induk Bidang:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFieldFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFieldFilter === "all"
                    ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                    : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                }`}
              >
                Semua Kompartemen (8)
              </button>

              {store.fields.map((field) => {
                const isSelected = selectedFieldFilter === field.id;
                const icon = BIDANG_ICONS[field.id];
                const count = store.compartments.filter((c) => c.field_id === field.id).length;

                return (
                  <button
                    key={field.id}
                    onClick={() => setSelectedFieldFilter(field.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                      isSelected
                        ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                        : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                    }`}
                  >
                    {icon && (
                      <span className="relative w-3.5 h-3.5 shrink-0">
                        <Image src={icon} alt="" fill className="object-contain" />
                      </span>
                    )}
                    <span>{field.code}: {field.name.replace(/Bidang \d+:\s*/, "")} ({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </section>

        {/* ==================== 3. KOMPARTEMEN CARDS GRID ==================== */}
        {filteredCompartments.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <Building2 className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada kompartemen yang sesuai
              </h3>
              <p className="text-xs text-neutral-dark">
                Silakan ubah kata kunci atau pilih tab filter bidang lainnya.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedFieldFilter("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredCompartments.map((comp) => {
              const parentField = store.fields.find((f) => f.id === comp.field_id);
              const projects = store.projects.filter((p) => p.compartment_id === comp.id);
              const fieldIcon = parentField ? BIDANG_ICONS[parentField.id] : null;

              // Color accents based on parent field
              const fieldStyleMap: Record<string, { badge: string; text: string; border: string }> = {
                "field-demo-01": { badge: "bg-brand-burgundy/10", text: "text-brand-burgundy", border: "border-brand-burgundy/30" },
                "field-demo-02": { badge: "bg-amber-500/10", text: "text-amber-800", border: "border-amber-500/30" },
                "field-demo-03": { badge: "bg-blue-500/10", text: "text-blue-800", border: "border-blue-500/30" },
                "field-demo-04": { badge: "bg-rose-500/10", text: "text-rose-900", border: "border-rose-500/30" },
              };
              const style = (parentField && fieldStyleMap[parentField.id]) || {
                badge: "bg-gold-50",
                text: "text-brand-burgundy",
                border: "border-gold-300",
              };

              return (
                <div
                  key={comp.id}
                  className="group rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300 p-3.5 sm:p-6 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  <div className="space-y-3 sm:space-y-4">
                    
                    {/* Header Bar: Code + Parent Field Chip */}
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                      <span className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-50 to-white border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-[10px] sm:text-xs shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                        {comp.code}
                      </span>

                      {parentField && (
                        <Link
                          href={`/organisasi/bidang/${parentField.id}`}
                          className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-bold border transition-colors hover:opacity-80 truncate max-w-[85px] sm:max-w-none ${style.badge} ${style.text} ${style.border}`}
                          title={`Buka Induk: ${parentField.name}`}
                        >
                          {fieldIcon && (
                            <span className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0">
                              <Image src={fieldIcon} alt="" fill className="object-contain" />
                            </span>
                          )}
                          <span>Induk: {parentField.code}</span>
                        </Link>
                      )}
                    </div>

                    {/* Title & Leader */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <Link href={`/organisasi/kompartemen/${comp.id}`} className="block">
                        <h2 className="font-serif font-bold text-xs sm:text-lg text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-1 leading-snug">
                          {comp.name}
                        </h2>
                      </Link>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-100 text-brand-burgundy font-serif font-bold text-[8px] sm:text-[10px] flex items-center justify-center shrink-0">
                          {comp.leader_name.charAt(0)}
                        </div>
                        <span className="text-neutral-dark truncate">
                          Kakom: <strong className="text-wine-950">{comp.leader_name}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {comp.description}
                    </p>

                    {/* Pratinjau Program Kerja Nyata */}
                    <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-light">
                        <span className="flex items-center gap-1">
                          <FolderKanban className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-burgundy" />
                          <span>Amanah:</span>
                        </span>
                        <strong className="text-wine-950 font-bold">{projects.length} Proker</strong>
                      </div>

                      {projects.length > 0 ? (
                        <div className="space-y-1 sm:space-y-1.5">
                          {projects.slice(0, 2).map((p) => (
                            <Link
                              key={p.id}
                              href={`/organisasi/program-kerja/${p.id}`}
                              className="group/item flex items-center justify-between text-xs p-1 sm:p-1.5 rounded-lg hover:bg-gold-50/80 transition-colors"
                            >
                              <span className="truncate text-wine-950 group-hover/item:text-brand-burgundy font-medium text-[9px] sm:text-[11px]">
                                • {p.name}
                              </span>
                              <span className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ml-1 uppercase ${
                                p.operational_status === "ongoing"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : p.operational_status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-surface-card text-neutral-dark border"
                              }`}>
                                {p.operational_status}
                              </span>
                            </Link>
                          ))}
                          {projects.length > 2 && (
                            <span className="text-[9px] sm:text-[10px] text-neutral-light block text-right pt-0.5">
                              +{projects.length - 2} lainnya
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[9px] sm:text-[11px] text-neutral-light italic block">
                          Tata kelola internal
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Footer Actions */}
                  <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-4 border-t border-wine-950/10 flex items-center justify-between">
                    <span className="text-[9px] sm:text-[11px] text-neutral-light font-mono">
                      {comp.code}
                    </span>

                    <Link
                      href={`/organisasi/kompartemen/${comp.id}`}
                      className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine group/btn"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </PublicShell>
  );
}
