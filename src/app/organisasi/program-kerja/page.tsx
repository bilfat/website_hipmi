"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  Clock,
  CheckCircle2,
  Building2,
  FolderKanban,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { getProjectVisual, BIDANG_ICONS } from "./project-data";

export default function PublicProjectsDirectoryPage() {
  const { store } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fieldFilter, setFieldFilter] = useState<string>("all");

  // Read URL query params on mount for direct deep linking from Bidang or Kompartemen pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const b = params.get("bidang");
      if (b) setFieldFilter(b);
      const s = params.get("status");
      if (s) setStatusFilter(s);
    }
  }, []);

  // Get all published projects (or ongoing projects)
  const publishedProjects = useMemo(() => {
    return store.projects.filter(
      (p) => p.publication_status === "published" || p.operational_status === "ongoing"
    );
  }, [store.projects]);

  // Filter projects by search, status, and bidang
  const filteredProjects = useMemo(() => {
    return publishedProjects.filter((proj) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = proj.name.toLowerCase().includes(query);
        const matchPurpose = proj.purpose.toLowerCase().includes(query);
        const matchLocation = proj.location.toLowerCase().includes(query);
        if (!matchName && !matchPurpose && !matchLocation) return false;
      }

      // Status filter
      if (statusFilter !== "all" && proj.operational_status !== statusFilter) {
        return false;
      }

      // Field filter
      if (fieldFilter !== "all" && proj.field_id !== fieldFilter) {
        return false;
      }

      return true;
    });
  }, [publishedProjects, searchQuery, statusFilter, fieldFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = publishedProjects.length;
    const ongoing = publishedProjects.filter((p) => p.operational_status === "ongoing").length;
    const planned = publishedProjects.filter((p) => p.operational_status === "planned").length;
    const completed = publishedProjects.filter((p) => p.operational_status === "completed").length;
    return { total, ongoing, planned, completed };
  }, [publishedProjects]);

  // Flagship Project
  const flagshipProject = useMemo(() => {
    return store.projects.find((p) => p.id === "proj-business-expo") || publishedProjects[0];
  }, [store.projects, publishedProjects]);

  const flagshipVisual = flagshipProject ? getProjectVisual(flagshipProject.id) : null;
  const flagshipComp = flagshipProject ? store.compartments.find((c) => c.id === flagshipProject.compartment_id) : null;

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setFieldFilter("all");
  };

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            <span>DIREKTORI PROGRAM KERJA • KABINET ARTHAKARSA</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Inisiatif Nyata & Program Kerja Unggulan
              </h1>
              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Eksplorasi seluruh agenda strategis, pelatihan kepemimpinan, pameran wirausaha mahasiswa,
                serta kemitraan ekosistem bisnis yang diinisiasi oleh 4 Bidang Utama HIPMI Perguruan Tinggi Telkom University.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-surface-card/80 backdrop-blur-md p-2 rounded-2xl border border-wine-950/10 shadow-sm shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-gold-50/80 border border-gold-200 text-center">
                <span className="block text-xs font-mono font-bold text-brand-burgundy">{stats.total}</span>
                <span className="text-[10px] text-neutral-dark font-sans">Total Proker</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="block text-xs font-mono font-bold text-emerald-800">{stats.ongoing}</span>
                <span className="text-[10px] text-emerald-700 font-sans">Berjalan</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <span className="block text-xs font-mono font-bold text-amber-800">{stats.planned}</span>
                <span className="text-[10px] text-amber-700 font-sans">Terencana</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <span className="block text-xs font-mono font-bold text-blue-800">{stats.completed}</span>
                <span className="text-[10px] text-blue-700 font-sans">Selesai</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. FEATURED FLAGSHIP SPOTLIGHT ==================== */}
        {flagshipProject && flagshipVisual && !searchQuery && fieldFilter === "all" && statusFilter === "all" && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-darkWine via-brand-burgundy to-wine-950 text-white shadow-2xl border border-gold-400/30">
            {/* Background Texture & Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-burgundy/40 rounded-full blur-2xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-8 lg:p-10">
              
              {/* Left Column: Image Banner */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] border border-gold-300/30 shadow-xl">
                <Image
                  src={flagshipVisual.image}
                  alt={flagshipProject.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/90 via-wine-950/30 to-transparent" />
                
                {/* Badges Over Image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-mono font-bold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Sedang Berjalan (Ongoing)
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gold-200 font-mono">
                  <span className="px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm border border-gold-400/30">
                    B-01 • Kaderisasi
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm border border-gold-400/30">
                    40+ Tenant Bisnis
                  </span>
                </div>
              </div>

              {/* Right Column: Content Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider">
                    ★ Program Kerja Unggulan (Flagship)
                  </span>
                  <span className="text-xs text-white/70 font-mono">
                    Periode 2026/2027
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {flagshipProject.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl font-sans">
                    {flagshipProject.purpose} {flagshipProject.description}
                  </p>
                </div>

                {/* Progress Tracker */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold-200 font-medium flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
                      Status Eksekusi: <strong className="text-white">{flagshipVisual.progressStage}</strong>
                    </span>
                    <span className="font-mono font-bold text-gold-300">{flagshipVisual.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-400 to-amber-300 transition-all duration-1000"
                      style={{ width: `${flagshipVisual.progress}%` }}
                    />
                  </div>
                </div>

                {/* Event Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/60 block uppercase font-mono">Puncak Acara:</span>
                      <strong>15 Desember 2026</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/60 block uppercase font-mono">Lokasi Pelaksanaan:</span>
                      <strong className="truncate block max-w-[220px]">{flagshipProject.location}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/organisasi/program-kerja/${flagshipProject.id}`}
                    className="px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-wine-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-gold-400/20 transition-all flex items-center gap-2"
                  >
                    <span>Eksplorasi Detail Flagship</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/aktivitas/agenda"
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>Cek Tiket & Rundown</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                  </Link>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ==================== 3. SEARCH & DUAL FILTER CONTROL ==================== */}
        <section className="space-y-4 pt-2">
          
          {/* Top Bar: Search Input & Active Counts */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari program kerja berdasarkan nama, kata kunci, atau lokasi..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-surface-card border border-wine-950/15 text-xs sm:text-sm text-wine-950 placeholder:text-neutral-light focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/10 shadow-sm transition-all"
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

            {/* Result count & reset */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-neutral-dark">
              <span>
                Menampilkan <strong className="text-wine-950 font-mono">{filteredProjects.length}</strong> program kerja
              </span>
              {(searchQuery || statusFilter !== "all" || fieldFilter !== "all") && (
                <button
                  onClick={resetFilters}
                  className="text-brand-burgundy hover:text-brand-darkWine font-semibold underline underline-offset-4 text-xs transition-colors"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Filter Row 1: Filter by Bidang */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-dark flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-brand-burgundy" />
              Filter Bidang Organisasi:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFieldFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  fieldFilter === "all"
                    ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                    : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                }`}
              >
                Semua Bidang
              </button>

              {store.fields.map((field) => {
                const isSelected = fieldFilter === field.id;
                const icon = BIDANG_ICONS[field.id];

                return (
                  <button
                    key={field.id}
                    onClick={() => setFieldFilter(field.id)}
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
                    <span>{field.code}: {field.name.replace(/Bidang \d+:\s*/, "")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Row 2: Filter by Status */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-dark flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-gold-600" />
              Filter Status Operasional:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "Semua Status" },
                { id: "ongoing", label: "Sedang Berjalan (Ongoing)" },
                { id: "planned", label: "Direncanakan (Planned)" },
                { id: "completed", label: "Selesai (Completed)" },
                { id: "archived", label: "Arsip (Archived)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    statusFilter === tab.id
                      ? "bg-wine-950 text-gold-200 font-semibold shadow-sm"
                      : "bg-surface-card/60 hover:bg-gold-50/60 text-neutral-dark border border-wine-950/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* ==================== 4. EDITORIAL PROJECTS GRID ==================== */}
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <FolderKanban className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada program kerja yang cocok
              </h3>
              <p className="text-xs text-neutral-dark leading-relaxed">
                Kami tidak menemukan program kerja dengan kata kunci atau kombinasi filter tersebut. Coba ubah pencarian Anda.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold hover:bg-brand-darkWine transition-colors shadow-sm"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProjects.map((proj) => {
              const comp = store.compartments.find((c) => c.id === proj.compartment_id);
              const field = store.fields.find((f) => f.id === proj.field_id);
              const visual = getProjectVisual(proj.id);
              const fieldIcon = field ? BIDANG_ICONS[field.id] : null;

              // Status badge config
              const statusConfig: Record<string, { label: string; badgeClass: string; dot: boolean }> = {
                ongoing: {
                  label: "Sedang Berjalan",
                  badgeClass: "bg-emerald-600 text-white border-emerald-400/40 shadow-sm",
                  dot: true,
                },
                planned: {
                  label: "Direncanakan",
                  badgeClass: "bg-amber-600 text-white border-amber-400/40 shadow-sm",
                  dot: false,
                },
                completed: {
                  label: "Selesai",
                  badgeClass: "bg-blue-600 text-white border-blue-400/40 shadow-sm",
                  dot: false,
                },
                archived: {
                  label: "Arsip",
                  badgeClass: "bg-neutral-600 text-white border-neutral-400/40",
                  dot: false,
                },
                draft: {
                  label: "Draft",
                  badgeClass: "bg-neutral-500 text-white border-neutral-400/40",
                  dot: false,
                },
                cancelled: {
                  label: "Dibatalkan",
                  badgeClass: "bg-rose-700 text-white border-rose-500",
                  dot: false,
                },
              };
              const activeStatus = statusConfig[proj.operational_status] || {
                label: proj.operational_status,
                badgeClass: "bg-neutral-600 text-white",
                dot: false,
              };

              return (
                <div
                  key={proj.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* CARD COVER IMAGE CONTAINER (16:9 Aspect Ratio) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={visual.image}
                      alt={proj.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2 inset-x-2 sm:top-3 sm:inset-x-3 flex items-center justify-between gap-1 pointer-events-none">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${activeStatus.badgeClass}`}
                      >
                        {activeStatus.dot && (
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                        <span className="truncate max-w-[70px] sm:max-w-none">{activeStatus.label}</span>
                      </span>

                      {/* Field / Compartment Badge */}
                      {field && (
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-200 border border-gold-400/30 text-[8px] sm:text-[10px] font-mono font-bold">
                          {fieldIcon && (
                            <span className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0">
                              <Image src={fieldIcon} alt="" fill className="object-contain" />
                            </span>
                          )}
                          <span>{field.code}</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom Image Overlay Tag */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] text-white/90">
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-md bg-wine-950/80 backdrop-blur-sm border border-white/20 font-mono text-[8px] sm:text-[10px] text-gold-300 font-semibold truncate max-w-[95px] sm:max-w-none">
                        {visual.tag}
                      </span>
                      {comp && (
                        <span className="text-[8px] sm:text-[10px] font-mono text-white/80 bg-black/40 px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-sm">
                          {comp.code}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-2 sm:space-y-3">
                      {/* Title */}
                      <Link href={`/organisasi/program-kerja/${proj.id}`} className="block">
                        <h2 className="font-serif font-bold text-xs sm:text-lg text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-1 leading-snug">
                          {proj.name}
                        </h2>
                      </Link>

                      {/* Purpose */}
                      <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed">
                        {proj.purpose}
                      </p>

                      {/* Progress Milestone Bar */}
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1 sm:space-y-1.5">
                        <div className="flex items-center justify-between text-[9px] sm:text-[11px]">
                          <span className="text-neutral-dark truncate font-medium">
                            {visual.progressStage}
                          </span>
                          <span className="font-mono font-bold text-brand-burgundy shrink-0 ml-1 sm:ml-2">
                            {visual.progress}%
                          </span>
                        </div>
                        <div className="w-full h-1 sm:h-1.5 rounded-full bg-wine-950/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              proj.operational_status === "completed"
                                ? "bg-blue-600"
                                : proj.operational_status === "planned"
                                ? "bg-amber-500"
                                : "bg-gradient-to-r from-brand-burgundy to-gold-500"
                            }`}
                            style={{ width: `${visual.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Key Meta (Schedule & Venue) */}
                      <div className="space-y-1 pt-0.5 sm:pt-1 text-[10px] sm:text-xs text-neutral-dark font-sans">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-burgundy shrink-0" />
                          <span className="truncate">
                            {proj.hide_main_event_date_public ? (
                              <span className="font-semibold text-gold-700 bg-gold-50 px-1.5 sm:px-2 py-0.5 rounded border border-gold-300 text-[9px] sm:text-[10px]">
                                Segera Diumumkan
                              </span>
                            ) : (
                              <strong>{proj.main_event_date}</strong>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-600 shrink-0" />
                          <span className="truncate text-neutral-dark">{proj.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-2.5 sm:pt-4 mt-1 sm:mt-2 border-t border-wine-950/10 flex items-center justify-between">
                      <span className="hidden sm:inline-block text-[11px] text-neutral-light font-medium truncate max-w-[140px]">
                        {comp?.name || "Kompartemen"}
                      </span>

                      <Link
                        href={`/organisasi/program-kerja/${proj.id}`}
                        className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-[10px] sm:text-xs font-semibold shadow transition-all group-hover:shadow-md w-full sm:w-auto"
                      >
                        <span>Detail Proker</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

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
