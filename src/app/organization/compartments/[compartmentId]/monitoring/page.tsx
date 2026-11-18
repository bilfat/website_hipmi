"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Building,
  ArrowLeft,
  Users,
  FolderKanban,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

export default function CompartmentMonitoringPage({
  params,
}: {
  params: Promise<{ compartmentId: string }>;
}) {
  const { compartmentId } = use(params);
  const { store } = useMockStore();

  const comp = store.compartments.find((c) => c.id === compartmentId) || store.compartments[0];
  const field = store.fields.find((f) => f.id === comp?.field_id);
  const compProjects = store.projects.filter((p) => p.compartment_id === comp?.id);

  if (!comp) {
    return (
      <OrganizationShell>
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            Kompartemen Tidak Ditemukan
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
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/organization/fields/${field?.id || "field-internal"}/monitoring`}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Monitoring {field?.name || "Bidang"}</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
                Screen ID: ORG-04
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
                Monitoring Kompartemen
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-wine-950">
              Monitoring {comp.name}
            </h1>
            <p className="text-xs text-neutral-dark">
              Bidang Induk: <strong className="text-wine-950">{field?.name}</strong> • Pengawasan Operasional Unit
            </p>
          </div>

          <Link
            href={`/workspace/${comp.id}`}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Buka Workspace Kompartemen</span>
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Total Program Kerja
            </span>
            <strong className="text-wine-950 font-serif text-2xl block">
              {compProjects.length} Proker
            </strong>
            <span className="text-[11px] text-neutral-dark">Dikelola oleh kompartemen ini</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Bidang Koordinasi
            </span>
            <strong className="text-brand-burgundy font-serif text-lg block truncate">
              {field?.name || "Bidang"}
            </strong>
            <span className="text-[11px] text-neutral-dark">Struktur Pelaporan</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Status Operasional
            </span>
            <strong className="text-emerald-700 font-serif text-2xl block">
              Aktif
            </strong>
            <span className="text-[11px] text-neutral-dark">Periode Arthakarsa</span>
          </div>
        </div>

        {/* Prokers Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-brand-burgundy" />
            <span>Program Kerja Kompartemen ({compProjects.length})</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {compProjects.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                      {p.operational_status}
                    </span>
                    <strong className="text-wine-950 font-serif text-base">
                      {p.name}
                    </strong>
                  </div>
                  <p className="text-neutral-dark">{p.description}</p>
                  <span className="text-[11px] font-mono text-neutral-light block">
                    Venue: {p.location} • Target: {p.target_date || "2026"}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/workspace/${p.id}`}
                    className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Masuk Workspace Proker</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
