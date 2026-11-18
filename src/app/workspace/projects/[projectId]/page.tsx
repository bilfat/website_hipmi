"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  FolderKanban,
  ArrowLeft,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Archive,
  Layers
} from "lucide-react";

export default function ProjectWorkspaceOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const compartment = store.compartments.find((c) => c.id === project?.compartment_id);

  // Scoped project data
  const projectTasks = store.tasks.filter((t) => t.project_id === project?.id);
  const projectRoster = store.roster.filter((r) => r.project_id === project?.id);
  const projectFunds = store.fund_requests.filter((f) => f.project_id === project?.id);
  const projectLetters = store.correspondence.filter((c) => c.project_id === project?.id);

  const doneTasks = projectTasks.filter((t) => t.status === "Done");
  const inProgressTasks = projectTasks.filter((t) => t.status === "In Progress");
  const blockedTasks = projectTasks.filter((t) => t.status === "Blocked");
  const todoTasks = projectTasks.filter((t) => t.status === "To Do");

  if (!project) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-wine-950">
          Program Kerja Tidak Ditemukan
        </h1>
        <Link
          href="/organization/dashboard"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          Kembali ke Dashboard Organisasi
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/${project.compartment_id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Workspace {compartment?.name || "Kompartemen"}</span>
      </Link>

      {/* Header Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
                Screen ID: WRK-05
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
                Workspace Proker
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                {project.operational_status}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
              {project.name}
            </h1>
            <p className="text-xs text-neutral-dark">
              Kompartemen: <strong className="text-wine-950">{compartment?.name}</strong> • Venue: {project.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/workspace/${project.compartment_id}/projects/form?mode=edit&recordId=${project.id}`}
              className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors"
            >
              Edit Proker
            </Link>

            <Link
              href={`/workspace/projects/${project.id}/closure`}
              className="px-4 py-2 rounded-full bg-surface-ivory border border-wine-950/15 text-xs font-semibold text-brand-burgundy hover:bg-wine-950/5 transition-colors flex items-center gap-1.5"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Penutupan & LPJ (WRK-10)</span>
            </Link>
          </div>
        </div>

        {/* Proker Navigation Submenu Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-wine-950/10 text-xs font-semibold">
          <Link
            href={`/workspace/projects/${project.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-brand-burgundy text-white shadow-sm"
          >
            Overview (WRK-05)
          </Link>
          <Link
            href={`/workspace/projects/${project.id}/team`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Tim Pelaksana ({projectRoster.length})
          </Link>
          <Link
            href={`/workspace/projects/${project.id}/managers`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Manajer Proker (WRK-07)
          </Link>
          <Link
            href={`/workspace/projects/${project.id}/progress`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Task Board & Progres ({projectTasks.length})
          </Link>
          <Link
            href={`/workspace/projects/${project.id}/closure`}
            className="px-3.5 py-1.5 rounded-xl text-neutral-dark hover:text-wine-950 bg-surface-ivory"
          >
            Checklist LPJ (WRK-10)
          </Link>
        </div>
      </div>

      {/* 4 Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <Link
          href={`/workspace/projects/${project.id}/progress`}
          className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 transition-all space-y-1 block"
        >
          <span className="text-neutral-light block uppercase font-mono text-[10px]">
            Tugas Selesai
          </span>
          <strong className="text-emerald-700 font-serif text-2xl block">
            {doneTasks.length} / {projectTasks.length}
          </strong>
          <span className="text-[11px] text-neutral-dark">Item task board done</span>
        </Link>

        <Link
          href={`/workspace/projects/${project.id}/team`}
          className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 transition-all space-y-1 block"
        >
          <span className="text-neutral-light block uppercase font-mono text-[10px]">
            Roster Tim
          </span>
          <strong className="text-wine-950 font-serif text-2xl block">
            {projectRoster.length} Anggota
          </strong>
          <span className="text-[11px] text-neutral-dark">SK tim pelaksana</span>
        </Link>

        <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
          <span className="text-neutral-light block uppercase font-mono text-[10px]">
            Pengajuan Kas
          </span>
          <strong className="text-brand-burgundy font-serif text-2xl block">
            {projectFunds.length} Berkas
          </strong>
          <span className="text-[11px] text-neutral-dark">Terkait pencairan anggaran</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
          <span className="text-neutral-light block uppercase font-mono text-[10px]">
            Surat Keluar
          </span>
          <strong className="text-gold-700 font-serif text-2xl block">
            {projectLetters.length} Berkas
          </strong>
          <span className="text-[11px] text-neutral-dark">Disposisi Sekum</span>
        </div>
      </div>

      {/* Two Columns: Task Board Snapshot & Team Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): Task Board 4-Column Snapshot */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-burgundy" />
                <span>Task Board Snapshot</span>
              </h2>
              <Link
                href={`/workspace/projects/${project.id}/progress`}
                className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
              >
                <span>Buka Task Board Penuh (WRK-08)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[10px] text-blue-800 font-mono font-bold block uppercase">
                  To Do
                </span>
                <strong className="font-serif text-xl text-blue-900">{todoTasks.length}</strong>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] text-amber-800 font-mono font-bold block uppercase">
                  In Progress
                </span>
                <strong className="font-serif text-xl text-amber-900">{inProgressTasks.length}</strong>
              </div>
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <span className="text-[10px] text-red-800 font-mono font-bold block uppercase">
                  Blocked
                </span>
                <strong className="font-serif text-xl text-red-900">{blockedTasks.length}</strong>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-mono font-bold block uppercase">
                  Done
                </span>
                <strong className="font-serif text-xl text-emerald-900">{doneTasks.length}</strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {projectTasks.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                >
                  <strong className="text-wine-950">{t.title}</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-wine-950/10 text-neutral-dark">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (5 cols): Roster Snapshot */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                <Users className="w-4 h-4 text-gold-600" />
                <span>Tim Pelaksana</span>
              </h2>
              <Link
                href={`/workspace/projects/${project.id}/team`}
                className="text-xs font-semibold text-brand-burgundy hover:underline"
              >
                Kelola Roster (WRK-06)
              </Link>
            </div>

            <div className="space-y-2">
              {projectRoster.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-wine-950 block">{r.name}</strong>
                    <span className="text-[11px] text-brand-burgundy font-serif">
                      {r.role_title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-wine-950/10">
                    {r.access_level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
