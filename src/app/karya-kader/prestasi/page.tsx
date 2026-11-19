"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Award,
  ArrowRight,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  Search,
  X,
  Medal,
  Crown,
  PartyPopper,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FallingConfetti } from "@/components/karya-kader/falling-confetti";
import { getAchievementVisual } from "../karya-kader-data";

export default function CadreAchievementsPage() {
  const { store } = useMockStore();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [burstCount, setBurstCount] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof store.achievements[0] | null>(null);

  const publishedAchievements = useMemo(() => {
    return store.achievements.filter((a) => a.status === "published" || !a.status);
  }, [store.achievements]);

  const filteredAchievements = useMemo(() => {
    return publishedAchievements.filter((ach) => {
      // Level filter
      if (selectedLevel !== "all" && ach.level !== selectedLevel) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = ach.title.toLowerCase().includes(query);
        const matchDesc = ach.description.toLowerCase().includes(query);
        const matchCadres = ach.cadre_names?.some((name) => name.toLowerCase().includes(query));
        const matchCat = ach.category.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCadres && !matchCat) return false;
      }

      return true;
    });
  }, [publishedAchievements, selectedLevel, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = publishedAchievements.length;
    const international = publishedAchievements.filter((a) => a.level === "Internasional").length;
    const national = publishedAchievements.filter((a) => a.level === "Nasional").length;
    const regional = publishedAchievements.filter((a) => a.level === "Regional" || a.level === "Universitas").length;
    return { total, international, national, regional };
  }, [publishedAchievements]);

  return (
    <PublicShell>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER WITH FALLING CONFETTI ==================== */}
        <section className="relative pt-6 sm:pt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-gold-50/70 via-surface-card to-gold-100/40 border border-gold-300/80 p-6 sm:p-10 shadow-lg">
          {/* Falling Confetti Animation Layer */}
          <FallingConfetti triggerBurst={burstCount} />

          <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-2xs backdrop-blur-md">
                <Crown className="w-4 h-4 text-gold-600 animate-bounce" />
                <span>HALL OF FAME • PRESTASI KADER ARTHAKARSA</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Galeri Prestasi &amp; Penghargaan Kader
              </h1>

              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Apresiasi tertinggi atas dedikasi, kemenangan kompetisi rencana bisnis, medali inovasi teknologi, serta kejuaraan wirausaha muda tingkat nasional dan internasional yang diraih mahasiswa HIPMI PT Telkom University.
              </p>
            </div>

            {/* Interactive Celebration CTA & Metrics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => setBurstCount((prev) => prev + 1)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-600 hover:to-amber-500 text-wine-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Rayakan Prestasi 🎉</span>
              </button>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-wine-950/10 shadow-2xs">
                <div className="px-3 py-1 text-center">
                  <span className="block text-sm font-mono font-bold text-brand-burgundy">{stats.total}</span>
                  <span className="text-[10px] text-neutral-dark">Total Juara</span>
                </div>
                <div className="h-6 w-px bg-wine-950/10" />
                <div className="px-3 py-1 text-center">
                  <span className="block text-sm font-mono font-bold text-gold-700">{stats.international}</span>
                  <span className="text-[10px] text-neutral-dark">Internasional</span>
                </div>
                <div className="h-6 w-px bg-wine-950/10" />
                <div className="px-3 py-1 text-center">
                  <span className="block text-sm font-mono font-bold text-emerald-800">{stats.national}</span>
                  <span className="text-[10px] text-neutral-dark">Nasional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. FILTER & SEARCH CONTROL ==================== */}
        <section className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama juara, kompetisi, atau inovasi..."
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
                Menampilkan <strong className="text-wine-950 font-mono">{filteredAchievements.length}</strong> piagam penghargaan
              </span>
              {(selectedLevel !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedLevel("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-burgundy hover:text-brand-darkWine font-semibold underline text-xs ml-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Filter Levels Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
            {[
              { id: "all", label: "Semua Tingkat" },
              { id: "Internasional", label: "🌍 Internasional (Gold)" },
              { id: "Nasional", label: "🇮🇩 Nasional" },
              { id: "Regional", label: "📍 Regional / Jabar" },
              { id: "Universitas", label: "🎓 Tingkat Kampus" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedLevel === tab.id
                    ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                    : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* ==================== 3. AWARD PLAQUE CARDS GRID ==================== */}
        {filteredAchievements.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <Trophy className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada data prestasi yang cocok
              </h3>
              <p className="text-xs text-neutral-dark">
                Silakan coba ubah kata kunci pencarian atau ganti filter tingkat kejuaraan.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedLevel("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredAchievements.map((item) => {
              const visual = getAchievementVisual(item.id);

              // Level styling
              const levelStyleMap: Record<string, { badge: string; text: string; border: string }> = {
                Internasional: { badge: "bg-purple-100", text: "text-purple-900", border: "border-purple-300" },
                Nasional: { badge: "bg-amber-100", text: "text-amber-900", border: "border-amber-300" },
                Regional: { badge: "bg-blue-100", text: "text-blue-900", border: "border-blue-300" },
                Universitas: { badge: "bg-emerald-100", text: "text-emerald-900", border: "border-emerald-300" },
              };
              const levelStyle = levelStyleMap[item.level] || {
                badge: "bg-gold-50",
                text: "text-brand-burgundy",
                border: "border-gold-300",
              };

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-surface-card via-white to-gold-50/20 border-2 border-gold-300/80 shadow-md hover:shadow-2xl hover:border-gold-400 transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1"
                >
                  {/* Top Golden Sheen Trim */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500" />

                  {/* AWARD COVER PHOTO (16:9 Documentation) */}
                  <div
                    onClick={() => setSelectedAchievement(item)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Buka Piagam ${item.title}`}
                  >
                    <Image
                      src={visual.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/20 to-transparent" />

                    {/* Top Level Badge & Year */}
                    <div className="absolute top-2 inset-x-2 sm:top-3 sm:inset-x-3 flex items-center justify-between gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wide backdrop-blur-md border ${levelStyle.badge} ${levelStyle.text} ${levelStyle.border}`}>
                        <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                        <span>{item.level}</span>
                      </span>

                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gold-300 text-[8px] sm:text-[10px] font-mono font-bold border border-gold-400/30">
                        {item.year}
                      </span>
                    </div>

                    {/* Bottom Laurel Plaque Banner */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs text-white/95">
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-black/60 backdrop-blur-sm border border-gold-400/40 text-gold-300 font-mono text-[8px] sm:text-[10px] font-bold truncate max-w-[95px] sm:max-w-none">
                        {visual.laurelBadge}
                      </span>
                      <span className="hidden sm:inline-block text-[10px] font-mono text-white/80 truncate max-w-[140px]">
                        {visual.organizer}
                      </span>
                    </div>
                  </div>

                  {/* PLAQUE CARD BODY */}
                  <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 sm:space-y-2.5">
                      <span className="text-[8px] sm:text-[10px] uppercase font-mono font-bold text-brand-burgundy tracking-wider block truncate">
                        Kategori: {item.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedAchievement(item)}
                        className="block text-left w-full group/title cursor-pointer"
                      >
                        <h2 className="font-serif font-bold text-xs sm:text-lg text-wine-950 group-hover/title:text-brand-burgundy transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h2>
                      </button>

                      <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-1 sm:line-clamp-2 leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {/* Recipient Cadres Box */}
                      <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-0.5 sm:space-y-1">
                        <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-light">
                          <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-burgundy" />
                          <span>Pemenang:</span>
                        </div>
                        <p className="font-serif font-bold text-[10px] sm:text-xs text-wine-950 truncate">
                          {item.cadre_names?.join(", ") || "Kader HIPMI Telkom"}
                        </p>
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-2 sm:pt-4 border-t border-wine-950/10 flex items-center justify-between">
                      <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-light truncate max-w-[120px]">
                        {visual.certificateNumber}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedAchievement(item)}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine group/btn w-full sm:w-auto justify-end cursor-pointer"
                      >
                        <span>Lihat Piagam</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ==================== 4. INTERACTIVE AWARD PLAQUE MODAL ==================== */}
        <AnimatePresence>
          {selectedAchievement && (() => {
            const visual = getAchievementVisual(selectedAchievement.id);
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedAchievement(null)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-md"
                />

                {/* Modal Plaque Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDF8F3] border-2 border-gold-400 shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
                >
                  {/* Top Golden Sheen Trim */}
                  <div className="h-2 w-full bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 shrink-0" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                    aria-label="Tutup piagam"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="overflow-y-auto">
                    {/* Modal Cover Photo Banner */}
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-neutral-900 overflow-hidden">
                      <Image
                        src={visual.image}
                        alt={selectedAchievement.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                          🏆 {selectedAchievement.level} • {selectedAchievement.year}
                        </span>
                      </div>

                      {/* Bottom Banner Tags */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 font-mono">
                        <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-gold-400/40 text-gold-300 font-bold text-[11px]">
                          {visual.laurelBadge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-white/90 text-[10px]">
                          {visual.certificateNumber}
                        </span>
                      </div>
                    </div>

                    {/* Plaque Content Body */}
                    <div className="p-5 sm:p-8 space-y-6">
                      <div className="space-y-3">
                        <span className="text-[11px] uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300 inline-block shadow-2xs">
                          Kategori: {selectedAchievement.category}
                        </span>

                        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-wine-950 leading-tight">
                          {selectedAchievement.title}
                        </h2>

                        <p className="text-xs text-neutral-light font-mono">
                          Penyelenggara: <strong className="text-wine-950">{visual.organizer}</strong>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans pt-3 border-t border-wine-950/10">
                        {selectedAchievement.description}
                      </p>

                      {/* Kader Pengukir Prestasi */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-3">
                        <span className="text-[11px] text-neutral-light font-mono uppercase tracking-wider block">
                          Kader Mahasiswa Pengukir Prestasi:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedAchievement.cadre_names?.map((name, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-xl bg-white border border-gold-300 text-wine-950 text-xs font-semibold flex items-center gap-2 shadow-2xs"
                            >
                              <div className="w-5 h-5 rounded-full bg-brand-burgundy text-gold-200 text-[10px] font-bold flex items-center justify-center">
                                {name.charAt(0)}
                              </div>
                              <span>{name}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Official Verification Seal */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-50/80 to-surface-ivory border border-gold-300/80 flex items-center gap-3.5 text-xs text-neutral-dark">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <strong className="text-wine-950 block">Terverifikasi Resmi HIPMI CENTRAL</strong>
                          <span className="text-[11px] text-neutral-dark">
                            Portofolio kejuaraan ini telah diaudit dan disinkronkan dalam pangkalan data organisasi keanggotaan BPH ARTHAKARSA.
                          </span>
                        </div>
                      </div>

                      {/* Plaque Modal Footer Actions */}
                      <div className="pt-4 border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setBurstCount((prev) => prev + 1);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-600 hover:to-amber-500 text-wine-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <PartyPopper className="w-3.5 h-3.5" />
                          <span>Rayakan Prestasi 🎉</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedAchievement(null)}
                          className="px-5 py-2.5 rounded-full bg-surface-card hover:bg-gold-50 text-wine-950 border border-wine-950/15 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Tutup Piagam
                        </button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

      </div>
    </PublicShell>
  );
}
