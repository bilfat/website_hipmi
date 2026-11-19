"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Ticket,
  FolderKanban,
  Users,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { getProjectVisual, BIDANG_ICONS } from "../project-data";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const proj = store.projects.find((p) => p.id === id) || store.projects[0];
  const comp = store.compartments.find((c) => c.id === proj?.compartment_id);
  const field = store.fields.find((f) => f.id === proj?.field_id);
  const linkedEvent = store.events.find((e) => e.project_id === proj?.id);
  const visual = getProjectVisual(proj?.id || "");
  const fieldIcon = field ? BIDANG_ICONS[field.id] : null;

  if (!proj) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Program Kerja Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Program kerja yang Anda cari tidak tersedia dalam direktori.</p>
          <Link
            href="/organisasi/program-kerja"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Direktori Proker</span>
          </Link>
        </div>
      </PublicShell>
    );
  }

  const statusConfig: Record<string, { label: string; badgeClass: string; dot: boolean }> = {
    ongoing: {
      label: "Sedang Berjalan",
      badgeClass: "bg-emerald-600 text-white border-emerald-400/40",
      dot: true,
    },
    planned: {
      label: "Direncanakan",
      badgeClass: "bg-amber-600 text-white border-amber-400/40",
      dot: false,
    },
    completed: {
      label: "Selesai Dilaksanakan",
      badgeClass: "bg-blue-600 text-white border-blue-400/40",
      dot: false,
    },
    archived: {
      label: "Arsip",
      badgeClass: "bg-neutral-600 text-white border-neutral-400/40",
      dot: false,
    },
    draft: {
      label: "Draft",
      badgeClass: "bg-neutral-500 text-white border-neutral-400/40",
      dot: false,
    },
    cancelled: {
      label: "Dibatalkan",
      badgeClass: "bg-rose-700 text-white border-rose-500",
      dot: false,
    },
  };
  const activeStatus = statusConfig[proj.operational_status] || {
    label: proj.operational_status,
    badgeClass: "bg-neutral-600 text-white",
    dot: false,
  };

  return (
    <PublicShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/organisasi/program-kerja"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Direktori Program Kerja</span>
          </Link>
        </div>

        {/* HERO BANNER PROFILE */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl">
          {/* Cover Photo */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden">
            <Image
              src={visual.image}
              alt={proj.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/40 to-transparent" />

            {/* Overlays on Banner */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${activeStatus.badgeClass}`}
              >
                {activeStatus.dot && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
                {activeStatus.label}
              </span>

              {field && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-200 border border-gold-400/30 text-xs font-mono font-bold">
                  {fieldIcon && (
                    <span className="relative w-4 h-4 shrink-0">
                      <Image src={fieldIcon} alt="" fill className="object-contain" />
                    </span>
                  )}
                  <span>{field.name}</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-mono text-gold-300 font-semibold">
                {visual.tag}
              </span>
              {comp && (
                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-mono">
                  {comp.name} ({comp.code})
                </span>
              )}
            </div>
          </div>

          {/* Header Info */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300 inline-block">
                  ARTHAKARSA 2026/2027
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950">
                  {proj.name}
                </h1>
              </div>

              {linkedEvent && (
                <Link
                  href={`/aktivitas/agenda/${linkedEvent.id}/tiket`}
                  className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-brand-burgundy/20 transition-all flex items-center gap-2 shrink-0 self-start lg:self-auto"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Pesan Tiket Terkait</span>
                </Link>
              )}
            </div>

            <p className="text-sm text-neutral-dark leading-relaxed">
              {proj.purpose}
            </p>

            {/* Execution Progress Bar */}
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-dark font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-burgundy" />
                  Tahap Saat Ini: <strong className="text-wine-950">{visual.progressStage}</strong>
                </span>
                <span className="font-mono font-bold text-brand-burgundy text-sm">{visual.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-wine-950/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-burgundy to-gold-500 transition-all duration-1000"
                  style={{ width: `${visual.progress}%` }}
                />
              </div>
            </div>

            {/* Key Schedule and Venue Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                <span className="text-neutral-light block uppercase font-mono text-[10px]">Tanggal Utama:</span>
                {proj.hide_main_event_date_public ? (
                  <span className="font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded inline-block text-xs font-mono">
                    Jadwal Segera Diumumkan
                  </span>
                ) : (
                  <strong className="text-wine-950 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-burgundy shrink-0" />
                    <span>{proj.main_event_date}</span>
                  </strong>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                <span className="text-neutral-light block uppercase font-mono text-[10px]">Lokasi Pelaksanaan:</span>
                <strong className="text-wine-950 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                <span className="text-neutral-light block uppercase font-mono text-[10px]">Rentang Periode:</span>
                <strong className="text-wine-950 text-sm font-mono flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-light shrink-0" />
                  <span>{proj.start_date} s/d {proj.target_date}</span>
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* DETAILED DESCRIPTION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-3 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-wine-950">
            Deskripsi Lengkap Program
          </h2>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans">
            {proj.description || proj.purpose}
          </p>
        </div>

        {/* PROGRESS NOTES HISTORY */}
        {Boolean(proj.progress_notes && proj.progress_notes.length > 0) && (
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-wine-950">
              Catatan Progres &amp; Tahapan Pelaksanaan
            </h2>

            <div className="space-y-4">
              {proj.progress_notes?.map((pn) => (
                <div
                  key={pn.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-wine-950">
                      {pn.stage}
                    </span>
                    <span className="text-xs text-neutral-light font-mono">
                      {new Date(pn.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                    <div className="p-3.5 rounded-xl bg-surface-ivory border border-wine-950/10">
                      <strong className="text-emerald-700 block mb-1">Capaian:</strong>
                      <p className="text-neutral-dark">{pn.achievements}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface-ivory border border-wine-950/10">
                      <strong className="text-amber-700 block mb-1">Kendala:</strong>
                      <p className="text-neutral-dark">{pn.obstacles}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface-ivory border border-wine-950/10">
                      <strong className="text-brand-burgundy block mb-1">Rencana Lanjutan:</strong>
                      <p className="text-neutral-dark">{pn.plans}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </PublicShell>
  );
}
