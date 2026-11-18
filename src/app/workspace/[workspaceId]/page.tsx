"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  FolderKanban,
  Building,
  Layers,
  ArrowRight,
  Plus,
  Users,
  Calendar,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
  Info
} from "lucide-react";

export default function WorkspaceOverviewPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  // Determine context: Field, Compartment, or Project
  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const project = store.projects.find((p) => p.id === workspaceId);

  const contextType: "field" | "compartment" | "project" = field
    ? "field"
    : compartment
    ? "compartment"
    : "project";

  const currentUnit = field || compartment || project || store.compartments[0];

  // If this is a project workspace, provide full project metrics or link to WRK-05
  const compProjects = compartment
    ? store.projects.filter((p) => p.compartment_id === compartment.id)
    : [];
  const fieldComps = field
    ? store.compartments.filter((c) => c.field_id === field.id)
    : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
                Screen ID: WRK-01
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
                Workspace {contextType.toUpperCase()}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
              {currentUnit.name}
            </h1>
            <p className="text-xs text-neutral-dark">
              Ruang kerja operasional aktif • Sesuai batas kewenangan dan penugasan Anda
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/workspace/${workspaceId}/information`}
              className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Informasi Ruang Kerja (WRK-02)</span>
            </Link>

            {contextType === "compartment" && (
              <Link
                href={`/workspace/${workspaceId}/projects/form?mode=create`}
                className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Proker Baru (WRK-04)</span>
              </Link>
            )}

            {contextType === "project" && (
              <Link
                href={`/workspace/projects/${workspaceId}`}
                className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Buka Detail Proker (WRK-05)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-wine-950/10 text-xs font-semibold">
          <Link
            href={`/workspace/${workspaceId}`}
            className="px-3.5 py-1.5 rounded-xl bg-brand-burgundy text-white shadow-sm"
          >
            Overview
          </Link>
          <Link
            href={`/workspace/${workspaceId}/projects`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Program Kerja (WRK-03)
          </Link>
          <Link
            href={`/workspace/${workspaceId}/pleno`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Catatan Rapat Pleno (WRK-09)
          </Link>
        </div>
      </div>

      {/* Dynamic Content based on Context */}
      {contextType === "field" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <h2 className="font-serif text-lg font-bold text-wine-950">
              Kompartemen di Bawah Koordinasi {field?.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldComps.map((comp) => {
                const compProkers = store.projects.filter((p) => p.compartment_id === comp.id);
                return (
                  <div
                    key={comp.id}
                    className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <strong className="text-wine-950 font-serif text-base block">
                        {comp.name}
                      </strong>
                      <span className="text-[11px] text-neutral-dark">
                        {compProkers.length} Program Kerja Terdaftar
                      </span>
                    </div>

                    <Link
                      href={`/workspace/${comp.id}`}
                      className="px-3.5 py-1.5 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors"
                    >
                      Buka Workspace
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {contextType === "compartment" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-brand-burgundy" />
                <span>Program Kerja Kompartemen ({compProjects.length})</span>
              </h2>
              <Link
                href={`/workspace/${workspaceId}/projects`}
                className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua Proker (WRK-03)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {compProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                        {p.operational_status}
                      </span>
                      <strong className="text-wine-950 font-serif text-base">
                        {p.name}
                      </strong>
                    </div>
                    <p className="text-neutral-dark line-clamp-1">{p.description}</p>
                    <span className="text-[11px] font-mono text-neutral-light block">
                      Target: {p.target_date || "2026"} • Venue: {p.location}
                    </span>
                  </div>

                  <Link
                    href={`/workspace/projects/${p.id}`}
                    className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-all shrink-0 self-start sm:self-center"
                  >
                    Buka Workspace Proker (WRK-05)
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {contextType === "project" && project && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-wine-950">
              Workspace Program Kerja: {project.name}
            </h2>
            <Link
              href={`/workspace/projects/${project.id}`}
              className="px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Masuk Dashboard Proker Lengkap (WRK-05)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
