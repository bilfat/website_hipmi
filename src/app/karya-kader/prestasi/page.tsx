"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Award, ArrowRight, Calendar, Users, Trophy } from "lucide-react";

export default function CadreAchievementsPage() {
  const { store } = useMockStore();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const publishedAchievements = store.achievements.filter((a) => a.status === "published");

  const filteredAchievements = publishedAchievements.filter((ach) => {
    if (selectedLevel === "all") return true;
    return ach.level === selectedLevel;
  });

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Galeri Kejuaraan
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Prestasi &amp; Penghargaan Kader
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Apresiasi atas torehan medali, juara kompetisi rencana bisnis, dan penghargaan inovasi yang diraih oleh mahasiswa kader HIPMI PT Universitas Telkom.
          </p>
        </div>

        {/* Filter Levels */}
        <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
          {[
            { id: "all", label: "Semua Tingkat" },
            { id: "Internasional", label: "Internasional" },
            { id: "Nasional", label: "Nasional" },
            { id: "Regional", label: "Regional / Provinsi" },
            { id: "Universitas", label: "Tingkat Kampus" }
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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-mono font-bold">
                    {item.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-light">
                    {item.year}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono font-semibold text-brand-burgundy">
                    {item.category}
                  </span>
                  <h2 className="font-serif font-bold text-lg text-wine-950 mt-1 line-clamp-2">
                    <Link href={`/karya-kader/prestasi/${item.id}`} className="hover:text-brand-burgundy transition-colors">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-wine-950/10 text-xs text-neutral-dark">
                  <span className="text-[11px] text-neutral-light font-medium block">Kader Terlibat:</span>
                  <p className="font-semibold text-wine-950 mt-0.5 truncate">
                    {item.cadre_names.join(", ")}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-wine-950/10 flex items-center justify-end">
                <Link
                  href={`/karya-kader/prestasi/${item.id}`}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                >
                  <span>Detail Prestasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
