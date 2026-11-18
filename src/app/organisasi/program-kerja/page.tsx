"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { FolderKanban, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

export default function PublicProjectsDirectoryPage() {
  const { store } = useMockStore();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const publishedProjects = store.projects.filter(
    (p) => p.publication_status === "published"
  );

  const filteredProjects = publishedProjects.filter((p) => {
    if (statusFilter === "all") return true;
    return p.operational_status === statusFilter;
  });

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Direktori Kegiatan
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Program Kerja Terpublikasi
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Inisiatif aksi nyata kepengurusan HIPMI PT Universitas Telkom dalam mengakselerasi potensi wirausaha mahasiswa dan kemitraan kampus.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-wine-950/10 pb-4">
          {[
            { id: "all", label: "Semua Proker" },
            { id: "ongoing", label: "Sedang Berjalan (Ongoing)" },
            { id: "planned", label: "Direncanakan (Planned)" },
            { id: "completed", label: "Selesai (Completed)" },
            { id: "archived", label: "Arsip (Archived)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                statusFilter === tab.id
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const comp = store.compartments.find((c) => c.id === proj.compartment_id);

            return (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                        proj.operational_status === "ongoing"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : proj.operational_status === "completed"
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-surface-ivory text-neutral-dark border"
                      }`}
                    >
                      {proj.operational_status}
                    </span>

                    {comp && (
                      <span className="text-[10px] font-mono text-neutral-light">
                        {comp.code}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-lg text-wine-950">
                      {proj.name}
                    </h2>
                    <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                      {proj.purpose}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-wine-950/10 text-xs text-neutral-dark">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                      <span>
                        Main Event:{" "}
                        {proj.hide_main_event_date_public ? (
                          <span className="font-semibold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-300 text-[10px]">
                            Coming Soon
                          </span>
                        ) : (
                          <strong>{proj.main_event_date}</strong>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-light">
                    {comp?.name || "Kompartemen"}
                  </span>
                  <Link
                    href={`/organisasi/program-kerja/${proj.id}`}
                    className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                  >
                    <span>Detail Proker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
