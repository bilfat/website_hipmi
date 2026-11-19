"use client";

import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Layers,
  ArrowLeft,
  Building,
  Users,
  ChevronRight,
  ShieldCheck,
  Award,
  FolderKanban
} from "lucide-react";

export default function OrganizationStructureOverviewPage() {
  const { store } = useMockStore();

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const fields = store.fields.filter((f) => f.cabinet_id === activeCab.id);
  const compartments = store.compartments.filter((c) => c.cabinet_id === activeCab.id);

  return (
    <OrganizationShell>
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/organization/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dasbor Organisasi</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ORG-02
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Hierarki & Tata Kelola
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Struktur Organisasi Kabinet {activeCab.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Struktur kepemimpinan, 4 bidang koordinasi, dan 8 kompartemen operasional organisasi.
          </p>
        </div>

        {/* Top Leadership Hierarchy Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950 text-center pb-2">
            Badan Pengurus Harian (BPH)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-5 rounded-2xl bg-surface-ivory border border-gold-400/30 space-y-1.5 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase text-brand-burgundy block">
                Ketua Umum
              </span>
              <strong className="font-serif text-base text-wine-950 block">
                Muhammad Bintang Al-Fath
              </strong>
              <span className="text-[11px] text-neutral-dark block font-mono">
                1301213001 • Informatika
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase text-gold-700 block">
                Sekretaris Umum
              </span>
              <strong className="font-serif text-base text-wine-950 block">
                Siti Rahmawati
              </strong>
              <span className="text-[11px] text-neutral-dark block font-mono">
                1301213002 • Sistem Informasi
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 block">
                Bendahara Umum
              </span>
              <strong className="font-serif text-base text-wine-950 block">
                Andi Wijaya
              </strong>
              <span className="text-[11px] text-neutral-dark block font-mono">
                1201210045 • Manajemen Bisnis
              </span>
            </div>
          </div>
        </div>

        {/* 4 Fields and Sub-compartments Grid */}
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-wine-950">
            4 Bidang Koordinasi & 8 Kompartemen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((f) => {
              const fieldComps = compartments.filter((c) => c.field_id === f.id);

              return (
                <div
                  key={f.id}
                  className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-wine-950/10">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-brand-burgundy block">
                          Bidang
                        </span>
                        <h3 className="font-serif text-xl font-bold text-wine-950">
                          {f.name}
                        </h3>
                      </div>

                      <Link
                        href={`/organization/fields/${f.id}/monitoring`}
                        className="px-3 py-1.5 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1 shrink-0"
                      >
                        <span>Monitoring (ORG-03)</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <p className="text-xs text-neutral-dark leading-relaxed">
                      {f.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono text-neutral-light uppercase block font-semibold">
                        Kompartemen di Bawah Bidang:
                      </span>
                      <div className="space-y-2">
                        {fieldComps.map((comp) => {
                          const compProkers = store.projects.filter(
                            (p) => p.compartment_id === comp.id
                          );
                          return (
                            <div
                              key={comp.id}
                              className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                            >
                              <div className="space-y-0.5">
                                <strong className="text-wine-950 font-serif block">
                                  {comp.name}
                                </strong>
                                <span className="text-[10px] text-neutral-light">
                                  {compProkers.length} Program Kerja
                                </span>
                              </div>

                              <Link
                                href={`/organization/compartments/${comp.id}/monitoring`}
                                className="text-[11px] font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
                              >
                                <span>Rincian (ORG-04)</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
