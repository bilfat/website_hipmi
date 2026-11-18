"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  FolderKanban,
  CheckSquare,
  Square
} from "lucide-react";

export default function ProjectClosurePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const projectTasks = store.tasks.filter((t) => t.project_id === project?.id);
  const projectLPJ = store.lpjs.find((l) => l.project_id === project?.id);

  const allTasksDone = projectTasks.length > 0 && projectTasks.every((t) => t.status === "Done");
  const isLPJSubmitted = projectLPJ ? projectLPJ.status === "approved" || projectLPJ.status === "submitted" : false;
  const isCompleted = project.operational_status === "completed";

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCloseProject = () => {
    mutateStore((draft) => {
      const p = draft.projects.find((item) => item.id === project.id);
      if (p) {
        p.operational_status = "completed";

        addActivityHistory(
          currentUser.name,
          "menutup program kerja secara resmi",
          p.name,
          "Penutupan Proker"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "CLOSE_PROJECT",
          "Project",
          p.id,
          project.operational_status,
          "completed"
        );
      }
    });

    setFeedback(`Program kerja ${project.name} resmi ditutup (Completed)!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview {project.name}</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: WRK-10
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Checklist Penutupan
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Penutupan Proker & LPJ: {project.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Validasi checklist administrasi, pertanggungjawaban anggaran, dan pengesahan demisioner kepanitiaan.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Status Banner */}
      <div
        className={`p-6 rounded-3xl border shadow-lg flex items-center justify-between gap-4 ${
          isCompleted
            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
            : "bg-surface-card border-wine-950/10 text-wine-950"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isCompleted ? "bg-emerald-200 text-emerald-800" : "bg-brand-burgundy/10 text-brand-burgundy"
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase block">
              Status Operasional Proker
            </span>
            <strong className="font-serif text-xl block capitalize">
              {project.operational_status}
            </strong>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={handleCloseProject}
            className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Archive className="w-4 h-4" />
            <span>Tutup Program Kerja Resmi</span>
          </button>
        )}
      </div>

      {/* 4 Checklist Requirements */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Checklist Syarat Sah Penutupan Program Kerja
        </h2>

        <div className="space-y-4 text-xs">
          {/* Item 1: Task Board */}
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3.5">
            {allTasksDone ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <strong className="text-wine-950 font-serif text-sm block">
                1. Seluruh Task Board Selesai (Done)
              </strong>
              <p className="text-neutral-dark">
                {allTasksDone
                  ? "Seluruh item pekerjaan tim telah berhasil diselesaikan."
                  : `Masih terdapat tugas yang belum selesai pada task board (${projectTasks.filter((t) => t.status !== "Done").length} tersisa).`}
              </p>
            </div>
          </div>

          {/* Item 2: LPJ Dokumen */}
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3.5">
            {isLPJSubmitted ? (
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <strong className="text-wine-950 font-serif text-sm block">
                2. Laporan Pertanggungjawaban (LPJ 7 Bab)
              </strong>
              <p className="text-neutral-dark">
                {isLPJSubmitted
                  ? `Dokumen LPJ telah diserahkan (Status: ${projectLPJ?.status}).`
                  : "Dokumen LPJ formal 7 bab belum diserahkan ke Sekum."}
              </p>
            </div>
          </div>

          {/* Item 3: Anggaran Kas */}
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3.5">
            <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-wine-950 font-serif text-sm block">
                3. Rekonsiliasi Realisasi Anggaran Kas
              </strong>
              <p className="text-neutral-dark">
                Bukti transaksi dan realisasi dana kas telah dilaporkan ke Bendahara Umum.
              </p>
            </div>
          </div>

          {/* Item 4: Evaluasi Kepanitiaan */}
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3.5">
            <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-wine-950 font-serif text-sm block">
                4. Rapat Evaluasi & Pembubaran Panitia
              </strong>
              <p className="text-neutral-dark">
                Notulensi rapat evaluasi akhir telah diarsipkan pada catatan pleno ruang kerja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
