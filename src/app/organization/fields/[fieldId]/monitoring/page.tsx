"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Layers,
  ArrowLeft,
  Building,
  FolderKanban,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function FieldMonitoringPage({
  params,
}: {
  params: Promise<{ fieldId: string }>;
}) {
  const { fieldId } = use(params);
  const { store } = useMockStore();

  const field = store.fields.find((f) => f.id === fieldId) || store.fields[0];
  const fieldComps = store.compartments.filter((c) => c.field_id === field?.id);
  const fieldProjects = store.projects.filter((p) => p.field_id === field?.id);
  const fieldLetters = store.correspondence.filter((c) =>
    fieldProjects.some((p) => p.id === c.project_id)
  );

  if (!field) {
    return (
      <OrganizationShell>
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            Bidang Tidak Ditemukan
          </h1>
          <Link
            href="/organization/structure"
            className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Kembali ke Struktur
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  return (
    <OrganizationShell>
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/organization/structure"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Struktur Organisasi</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ORG-03
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Monitoring Bidang
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Monitoring {field.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Pengawasan kinerja operasional, kompartemen bawahan, dan program kerja tingkat bidang.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Kompartemen Bawahan
            </span>
            <strong className="text-wine-950 font-serif text-2xl block">
              {fieldComps.length} Unit
            </strong>
            <span className="text-[11px] text-neutral-dark">Di bawah koordinasi bidang</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Program Kerja
            </span>
            <strong className="text-brand-burgundy font-serif text-2xl block">
              {fieldProjects.length} Proker
            </strong>
            <span className="text-[11px] text-neutral-dark">Inisiatif strategis bidang</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Surat Terkait
            </span>
            <strong className="text-emerald-700 font-serif text-2xl block">
              {fieldLetters.length} Berkas
            </strong>
            <span className="text-[11px] text-neutral-dark">Pengajuan surat unit</span>
          </div>
        </div>

        {/* Compartments List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Daftar Kompartemen di Bawah {field.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fieldComps.map((comp) => {
              const compProjects = store.projects.filter((p) => p.compartment_id === comp.id);
              return (
                <div
                  key={comp.id}
                  className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <strong className="text-wine-950 font-serif text-base block">
                      {comp.name}
                    </strong>
                    <span className="text-[11px] text-neutral-dark block">
                      {compProjects.length} Program Kerja
                    </span>
                  </div>

                  <Link
                    href={`/organization/compartments/${comp.id}/monitoring`}
                    className="px-3.5 py-1.5 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1"
                  >
                    <span>Monitoring (ORG-04)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prokers Under This Field */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Seluruh Program Kerja Bidang ({fieldProjects.length})
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {fieldProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                      {p.operational_status}
                    </span>
                    <strong className="text-wine-950 font-serif text-sm block">
                      {p.name}
                    </strong>
                  </div>
                  <p className="text-neutral-dark line-clamp-1">{p.description}</p>
                </div>

                <Link
                  href={`/workspace/${p.id}`}
                  className="px-4 py-1.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-colors shrink-0 self-start sm:self-center"
                >
                  Buka Workspace
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
