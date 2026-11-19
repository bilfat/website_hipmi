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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredEvents.map((evt) => {
              const visual = getEventVisual(evt.id);
              const eventDate = new Date(evt.schedule_start);
              const dayStr = eventDate.getDate();
              const monthStr = eventDate.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
              const timeStr = eventDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

              return (
                <div
                  key={evt.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* COMPACT COVER IMAGE (16:9 Aspect Ratio) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={visual.image}
                      alt={evt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/20 to-transparent" />

                    {/* Floating Date Badge (Calendar Card Style) */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 px-1.5 sm:p-1.5 sm:px-2.5 text-center shadow-md border border-gold-300">
                      <span className="block font-mono font-black text-xs sm:text-sm leading-none text-brand-burgundy">
                        {dayStr}
                      </span>
                      <span className="block font-mono text-[7px] sm:text-[9px] font-bold text-neutral-dark uppercase leading-none mt-0.5">
                        {monthStr}
                      </span>
                    </div>

                    {/* Top Right Price/Category Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span
                        className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-bold tracking-wide backdrop-blur-md border ${
                          evt.category === "berbayar"
                            ? "bg-amber-600/90 text-white border-amber-300/40"
                            : "bg-emerald-600/90 text-white border-emerald-300/40"
                        }`}
                      >
                        {visual.priceDisplay}
                      </span>
                    </div>

                    {/* Bottom Tag Badge */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-[8px] sm:text-[10px] text-white/90">
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/20 font-mono text-gold-300 truncate max-w-[95px] sm:max-w-none">
                        {visual.tag}
                      </span>
                      <span className="hidden sm:inline font-mono text-white/80">
                        {timeStr} WIB
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY (Clean & Compact) */}
                  <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Link href={`/aktivitas/agenda/${evt.id}`} className="block">
                        <h2 className="font-serif font-bold text-xs sm:text-base text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-1 leading-snug">
                          {evt.title}
                        </h2>
                      </Link>

                      <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed font-sans">
                        {evt.description}
                      </p>

                      {/* Location & Schedule Info */}
                      <div className="space-y-1 pt-1 sm:pt-1.5 border-t border-wine-950/10 text-[10px] sm:text-xs text-neutral-dark">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-600 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className="pt-2 sm:pt-3.5 mt-1 sm:mt-2 border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2">
                      <Link
                        href={`/aktivitas/agenda/${evt.id}`}
                        className="text-[10px] sm:text-xs font-semibold text-neutral-dark hover:text-brand-burgundy transition-colors text-center sm:text-left py-0.5"
                      >
                        Detail
                      </Link>

                      {evt.category === "berbayar" ? (
                        <Link
                          href={`/aktivitas/agenda/${evt.id}/tiket`}
                          className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-[10px] sm:text-xs font-semibold shadow-sm transition-all group-hover:shadow"
                        >
                          <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Pesan Tiket</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/aktivitas/agenda/${evt.id}/daftar`}
                          className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] sm:text-xs font-semibold shadow-sm transition-all group-hover:shadow"
                        >
                          <span>Daftar Gratis</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                      )}
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
