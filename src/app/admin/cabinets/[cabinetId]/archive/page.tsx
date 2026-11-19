"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Archive,
  ArrowLeft,
  Building,
  CheckCircle2,
  Calendar,
  FileText,
  Award,
  FolderKanban,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from "lucide-react";

export default function CabinetArchivePage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];
  const projects = store.projects.filter((p) => p.cabinet_id === cab.id);
  const lpjs = store.lpjs.filter((l) => projects.some((p) => p.id === l.project_id));

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggleArchiveStatus = () => {
    mutateStore((draft) => {
      const c = draft.cabinets.find((item) => item.id === cab.id);
      if (c) {
        const nextStatus = c.status === "active" ? "archived" : "active";
        c.status = nextStatus;

        addActivityHistory(
          currentUser.name,
          nextStatus === "archived" ? "mengarsipkan periode kabinet" : "mengaktifkan kembali kabinet",
          c.name,
          "Administrasi Kabinet"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "TOGGLE_CABINET_ARCHIVE",
          "Cabinet",
          c.id,
          cab.status,
          nextStatus
        );
      }
    });

    setFeedback(`Status kabinet ${cab.name} berhasil diperbarui!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dasbor Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: ADM-04
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Detail & Arsip
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Arsip Historis Kabinet {cab.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Rekapitulasi pencapaian, dokumentasi LPJ penutupan, dan status siklus kepengurusan.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Overview & Status Toggle Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-wine-950/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-darkWine text-gold-300 font-serif text-2xl font-bold flex items-center justify-center border border-gold-400/40">
              {cab.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-wine-950">
                Kabinet {cab.name}
              </h2>
              <span className="text-xs font-mono text-neutral-light">
                Masa Bakti: {cab.period_start} — {cab.period_end}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleArchiveStatus}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all flex items-center gap-2 ${
              cab.status === "active"
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>
              {cab.status === "active" ? "Arsipkan Periode Kabinet Ini" : "Aktifkan Kembali Kabinet"}
            </span>
          </button>
        </div>

        {/* Milestone Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Total Program Kerja
            </span>
            <strong className="text-wine-950 font-serif text-2xl block">{projects.length}</strong>
            <span className="text-[11px] text-neutral-dark">Terdaftar dalam master proker</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Dokumen LPJ Resmi
            </span>
            <strong className="text-emerald-700 font-serif text-2xl block">{lpjs.length}</strong>
            <span className="text-[11px] text-neutral-dark">Disahkan oleh Sekum & Pembina</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Kader Resmi
            </span>
            <strong className="text-brand-burgundy font-serif text-2xl block">
              {store.users.filter((u) => u.cadre_status === "verified").length}
            </strong>
            <span className="text-[11px] text-neutral-dark">Telah dilantik & memegang e-KTA</span>
          </div>
        </div>

        {/* Visi & Misi Snapshot */}
        <div className="pt-2 border-t border-wine-950/10 space-y-3">
          <strong className="text-xs text-wine-950 block font-semibold">
            Visi Resmi Kabinet:
          </strong>
          <p className="text-xs text-neutral-dark leading-relaxed">
            {cab.vision || "Mewujudkan HIPMI PT Telkom University sebagai pusat akselerasi pengusaha muda."}
          </p>

          <strong className="text-xs text-wine-950 block font-semibold pt-2">
            Misi Kepengurusan:
          </strong>
          <ul className="space-y-1.5 text-xs text-neutral-dark list-disc pl-5">
            {cab.mission?.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
