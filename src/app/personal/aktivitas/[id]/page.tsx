"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  FolderKanban,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  ShieldCheck,
  Building,
  FileText,
  AlertTriangle
} from "lucide-react";

export default function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store, currentUser } = useMockStore();

  const project = store.projects.find((p) => p.id === id) || store.projects[0];
  const compartment = store.compartments.find((c) => c.id === project?.compartment_id);
  const myRoster = store.roster.find(
    (r) => r.project_id === project?.id && r.user_id === currentUser.id
  );

  const projectTasks = store.tasks.filter((t) => t.project_id === project?.id);

  if (!project) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-wine-950">
          Program Kerja Tidak Ditemukan
        </h1>
        <Link
          href="/personal/aktivitas"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          Kembali ke Aktivitas Saya
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Navigation Breadcrumb */}
      <Link
        href="/personal/aktivitas"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar Aktivitas Saya</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: PER-08
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Detail Keterlibatan
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          {project.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Kompartemen: <strong className="text-wine-950">{compartment?.name || "Kompartemen"}</strong>
        </p>
      </div>

      {/* Role & Status Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Peran Anda di Tim
            </span>
            <strong className="text-brand-burgundy font-serif text-base block">
              {myRoster?.role_title || "Anggota Tim"}
            </strong>
            <span className="text-[11px] text-neutral-dark">
              Akses: {myRoster?.access_level || "Member"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Status Proker
            </span>
            <strong className="text-wine-950 font-serif text-base block capitalize">
              {project.operational_status}
            </strong>
            <span className="text-[11px] text-neutral-dark">
              Publikasi: {project.publication_status}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Tanggal Bergabung
            </span>
            <strong className="text-wine-950 font-mono text-sm block">
              {myRoster?.joined_at ? new Date(myRoster.joined_at).toLocaleDateString("id-ID") : "2026-09-01"}
            </strong>
            <span className="text-[11px] text-neutral-dark">
              Masa Bakti Kabinet
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-wine-950/10 space-y-2">
          <strong className="text-xs text-wine-950 block font-semibold">
            Deskripsi Program Kerja:
          </strong>
          <p className="text-xs text-neutral-dark leading-relaxed">
            {project.description || "Inisiatif strategis HIPMI PT Universitas Telkom dalam mengakselerasi potensi kewirausahaan dan kapabilitas bisnis para kader mahasiswa."}
          </p>
        </div>
      </div>

      {/* Task Assignment Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gold-600" />
          <span>Agenda & Tugas Pada Program Kerja Ini</span>
        </h2>

        {projectTasks.length > 0 ? (
          <div className="space-y-3">
            {projectTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        t.status === "Done"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {t.status}
                    </span>
                    <strong className="text-wine-950 font-medium">{t.title}</strong>
                  </div>
                  <p className="text-[11px] text-neutral-dark">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-light">
            Belum ada tugas spesifik yang tercatat pada task board program kerja ini.
          </p>
        )}
      </div>
    </div>
  );
}
