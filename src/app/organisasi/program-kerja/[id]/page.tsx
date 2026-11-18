"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket, FolderKanban, Users, CheckCircle2 } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const proj = store.projects.find((p) => p.id === id) || store.projects[0];
  const comp = store.compartments.find((c) => c.id === proj.compartment_id);
  const linkedEvent = store.events.find((e) => e.project_id === proj.id);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb */}
        <Link
          href="/organisasi/program-kerja"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Direktori Program Kerja</span>
        </Link>

        {/* Header Profile */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                    proj.operational_status === "ongoing"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-surface-ivory text-neutral-dark border"
                  }`}
                >
                  {proj.operational_status}
                </span>

                {comp && (
                  <span className="text-xs text-neutral-dark font-medium">
                    Kompartemen: <strong>{comp.name}</strong>
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                {proj.name}
              </h1>
            </div>

            {linkedEvent && (
              <Link
                href={`/aktivitas/agenda/${linkedEvent.id}/tiket`}
                className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-colors flex items-center gap-2 shrink-0"
              >
                <Ticket className="w-4 h-4" />
                <span>Pesan Tiket Terkait</span>
              </Link>
            )}
          </div>

          <p className="text-sm text-neutral-dark leading-relaxed pt-4 border-t border-wine-950/10">
            {proj.purpose}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-wine-950/10 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Tanggal Utama (Main Event):</span>
              {proj.hide_main_event_date_public ? (
                <span className="font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded inline-block text-xs font-mono">
                  Coming Soon (Jadwal Segera Diumumkan)
                </span>
              ) : (
                <strong className="text-wine-950 text-sm">{proj.main_event_date}</strong>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Lokasi Pelaksanaan:</span>
              <strong className="text-wine-950 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                <span>{proj.location}</span>
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Rentang Periode:</span>
              <strong className="text-wine-950 text-sm font-mono">
                {proj.start_date} s/d {proj.target_date}
              </strong>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-4">
          <h2 className="font-serif font-bold text-xl text-wine-950">
            Deskripsi Lengkap Program
          </h2>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            {proj.description}
          </p>
        </div>

        {/* Progress Notes History */}
        {Boolean(proj.progress_notes && proj.progress_notes.length > 0) && (
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-xl text-wine-950">
              Catatan Progres &amp; Tahapan Pelaksanaan
            </h2>

            <div className="space-y-4">
              {proj.progress_notes?.map((pn) => (
                <div
                  key={pn.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 space-y-3"
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
                    <div className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10">
                      <strong className="text-emerald-700 block mb-1">Capaian:</strong>
                      <p className="text-neutral-dark">{pn.achievements}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10">
                      <strong className="text-amber-700 block mb-1">Kendala:</strong>
                      <p className="text-neutral-dark">{pn.obstacles}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10">
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
