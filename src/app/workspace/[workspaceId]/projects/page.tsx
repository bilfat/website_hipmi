"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  FolderKanban,
  ArrowLeft,
  Plus,
  ChevronRight,
  Calendar,
  MapPin,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function WorkspaceProjectsListPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { store } = useMockStore();

  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const unit = field || compartment || store.compartments[0];

  const projects = store.projects.filter(
    (p) => p.compartment_id === workspaceId || p.field_id === workspaceId
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/${workspaceId}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview {unit.name}</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: WRK-03
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Daftar Proker
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Program Kerja {unit.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Seluruh inisiatif dan agenda kerja yang dikelola dalam naungan ruang kerja ini.
          </p>
        </div>

        <Link
          href={`/workspace/${workspaceId}/projects/form?mode=create`}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Program Kerja Baru (WRK-04)</span>
        </Link>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-md hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                      {p.operational_status}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        p.publication_status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {p.publication_status}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-wine-950">
                    {p.name}
                  </h3>

                  <p className="text-xs text-neutral-dark line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-light font-mono pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                      <span>Target: {p.target_date || "2026"}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span>Venue: {p.location}</span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/workspace/projects/${p.id}`}
                    className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Masuk Workspace Proker</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
            <FolderKanban className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              Belum ada program kerja yang dibuat dalam ruang kerja ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
