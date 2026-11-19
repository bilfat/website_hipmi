"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar,
  MapPin,
  Ticket,
  ArrowRight,
  Sparkles,
  Search,
  X,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { getEventVisual } from "../aktivitas-data";

export default function PublicEventsPage() {
  const { store } = useMockStore();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const publicEvents = useMemo(() => {
    return store.events.filter((e) => e.visibility === "public");
  }, [store.events]);

  const filteredEvents = useMemo(() => {
    return publicEvents.filter((evt) => {
      // Category filter
      if (filterCategory !== "all" && evt.category !== filterCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = evt.title.toLowerCase().includes(query);
        const matchDesc = evt.description.toLowerCase().includes(query);
        const matchLoc = evt.location.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }

      return true;
    });
  }, [publicEvents, filterCategory, searchQuery]);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
                <span>AGENDA &amp; TIKET RESMI • ARTHAKARSA</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Kalender Agenda &amp; E-Tiket Acara
              </h1>
              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Ikuti pameran bisnis akbar, workshop kepemimpinan digital, company visit, dan seminar wirausaha mahasiswa yang diselenggarakan oleh HIPMI PT Universitas Telkom.
              </p>
            </div>

            {/* Cek Tiket Button */}
            <Link
              href="/aktivitas/agenda/cek-tiket"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-card hover:bg-gold-50 text-wine-950 border border-gold-400 text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all shrink-0 self-start md:self-auto"
            >
              <Ticket className="w-4 h-4 text-brand-burgundy" />
              <span>Cek Status E-Tiket Saya</span>
            </Link>
          </div>
        </section>

        {/* ==================== 2. FILTER & SEARCH CONTROL ==================== */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama acara, topik, atau lokasi..."
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

            {/* Counter */}
            <div className="text-xs text-neutral-dark flex items-center justify-between sm:justify-end gap-2">
              <span>
                Menampilkan <strong className="text-wine-950 font-mono">{filteredEvents.length}</strong> kegiatan
              </span>
              {(filterCategory !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setFilterCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-burgundy hover:text-brand-darkWine font-semibold underline text-xs ml-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
            {[
              { id: "all", label: "Semua Kategori" },
              { id: "berbayar", label: "Event Berbayar (QRIS Instant)" },
              { id: "gratis", label: "Event Gratis Mahasiswa" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  filterCategory === tab.id
                    ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                    : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* ==================== 3. COMPACT EVENT CARDS GRID ==================== */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <Calendar className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada agenda yang cocok
              </h3>
              <p className="text-xs text-neutral-dark">
                Silakan ubah kata kunci pencarian atau ganti filter kategori acara.
              </p>
            </div>
            <button
              onClick={() => {
                setFilterCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {filteredEvents.map((evt) => {
              const visual = getEventVisual(evt.id);
              const isFree = evt.category === "gratis";
              const dateObj = evt.schedule_start ? new Date(evt.schedule_start) : null;
              const dayStr = dateObj ? dateObj.getDate() : "28";
              const monthStr = dateObj
                ? dateObj.toLocaleDateString("id-ID", { month: "short" }).toUpperCase()
                : "NOV";
              const yearStr = dateObj ? dateObj.getFullYear() : "2026";
              const timeStr = dateObj
                ? dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
                : "09.00";

              return (
                <div
                  key={evt.id}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-gold-400/40 hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
                >
                  {/* 1. Small Top Image Header */}
                  <div className="relative h-24 sm:h-36 w-full overflow-hidden bg-wine-950/20 shrink-0">
                    <Image
                      src={visual.image}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                    {/* Floating Date Badge (Top-Left) */}
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/95 backdrop-blur-md shadow-xs border border-gold-400/50 flex items-center gap-1">
                      <span className="font-serif font-black text-[10px] sm:text-xs md:text-sm text-brand-burgundy leading-none">
                        {dayStr} {monthStr}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] text-neutral-dark/80 hidden sm:inline">
                        {yearStr}
                      </span>
                    </div>

                    {/* Floating Category Badge (Top-Right) */}
                    <span
                      className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 rounded sm:rounded-md text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border ${
                        isFree
                          ? "bg-emerald-900/85 text-emerald-200 border-emerald-400/40"
                          : "bg-wine-950/85 text-gold-200 border-gold-400/50"
                      }`}
                    >
                      {isFree ? "GRATIS" : "TERBUKA"}
                    </span>

                    {/* Floating Tag (Bottom-Left) */}
                    <span className="absolute bottom-1 left-1.5 sm:bottom-1.5 sm:left-2 px-1.5 py-0.5 rounded bg-black/65 backdrop-blur-xs text-[8px] sm:text-[10px] font-medium text-white/90 truncate max-w-[90%]">
                      {visual.tag}
                    </span>
                  </div>

                  {/* 2. Perforated Ticket Notches Divider */}
                  <div className="relative border-b border-dashed border-wine-950/20 bg-surface-ivory/40">
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-[#FAF5F2] border-r border-gold-400/40" />
                    <div className="absolute -right-1.5 -top-1.5 w-3 h-3 rounded-full bg-[#FAF5F2] border-l border-gold-400/40" />
                  </div>

                  {/* 3. Ticket Body: Title & Meta Info (2 Full Lines for Title & Location) */}
                  <div className="p-2 sm:p-3.5 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <Link href={`/aktivitas/agenda/${evt.id}`} className="block">
                        <h2 className="font-serif font-bold text-[11px] sm:text-sm md:text-base text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug line-clamp-2 min-h-[2.2rem] sm:min-h-0">
                          {evt.title}
                        </h2>
                      </Link>
                    </div>

                    <div className="space-y-1 pt-1 text-[9px] sm:text-xs font-ui text-neutral-dark">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-600 shrink-0" />
                        <span className="truncate">{timeStr} WIB</span>
                      </div>
                      <div className="flex items-start gap-1 sm:gap-1.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-burgundy shrink-0 mt-0.5" />
                        <span className="line-clamp-1 sm:line-clamp-2 leading-tight">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Ticket Footer: Stacked on Mobile so Price & Button are 100% visible */}
                  <div className="p-2 sm:p-2.5 sm:px-4 bg-surface-warm-white border-t border-wine-950/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                    <div className="flex items-center justify-between sm:block min-w-0">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-burgundy leading-tight truncate block">
                        {visual.priceDisplay}
                      </span>
                    </div>

                    {evt.category === "berbayar" ? (
                      <Link
                        href={`/aktivitas/agenda/${evt.id}/tiket`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-1 rounded-xl sm:rounded-full bg-brand-burgundy hover:bg-wine-950 text-white text-[10px] sm:text-xs font-semibold shadow-xs transition-all shrink-0"
                      >
                        <Ticket className="w-3 h-3" />
                        <span>Pesan Tiket</span>
                      </Link>
                    ) : (
                      <Link
                        href={`/aktivitas/agenda/${evt.id}/daftar`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-1 rounded-xl sm:rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] sm:text-xs font-semibold shadow-xs transition-all shrink-0"
                      >
                        <span>Daftar Gratis</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
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
