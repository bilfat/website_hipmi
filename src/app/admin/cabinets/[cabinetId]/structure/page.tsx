"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Layers,
  ArrowLeft,
  Building,
  Briefcase,
  Users,
  ChevronRight,
  ExternalLink,
  Plus,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function CabinetStructurePage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];
  const fields = store.fields.filter((f) => f.cabinet_id === cab.id);
  const compartments = store.compartments.filter((c) => c.cabinet_id === cab.id);

  const [activeTab, setActiveTab] = useState<"structure" | "positions" | "placement">("structure");

  // Roster assignments
  const allRosters = store.roster;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dashboard Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ADM-05
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Struktur Organisasi
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Struktur & Penempatan Kabinet {cab.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Bagan hierarki kelembagaan, master jabatan struktural, dan penempatan pengurus.
          </p>
        </div>
      </div>

      {/* 3-Tab Segmented Switcher */}
      <div className="flex items-center gap-2 border-b border-wine-950/10 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("structure")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "structure"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bagan Struktur & Unit ({fields.length} Bidang, {compartments.length} Kompartemen)</span>
        </button>

        <button
          onClick={() => setActiveTab("positions")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "positions"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Master Jabatan</span>
        </button>

        <button
          onClick={() => setActiveTab("placement")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "placement"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Penempatan Pengurus ({allRosters.length})</span>
        </button>
      </div>

      {/* Tab 1: Struktur & Unit */}
      {activeTab === "structure" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => {
              const fieldComps = compartments.filter((c) => c.field_id === field.id);

              return (
                <div
                  key={field.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4"
                >
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-wine-950/10">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-burgundy block">
                        Bidang Struktural
                      </span>
                      <h3 className="font-serif text-lg font-bold text-wine-950">
                        {field.name}
                      </h3>
                    </div>

                    <Link
                      href={`/admin/cabinets/${cab.id}/units/${field.id}`}
                      className="text-xs text-brand-burgundy font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Rincian Unit</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="text-xs text-neutral-dark">
                    {field.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-neutral-light uppercase block font-semibold">
                      Kompartemen di Bawah Bidang Ini:
                    </span>
                    <div className="space-y-1.5">
                      {fieldComps.map((comp) => (
                        <div
                          key={comp.id}
                          className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                        >
                          <strong className="text-wine-950 font-serif">{comp.name}</strong>
                          <Link
                            href={`/admin/cabinets/${cab.id}/units/${comp.id}`}
                            className="text-[11px] text-brand-burgundy hover:underline"
                          >
                            Kelola →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Master Jabatan */}
      {activeTab === "positions" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-wine-950/10">
            <h2 className="font-serif text-lg font-bold text-wine-950">
              Daftar Titel & Hirarki Jabatan
            </h2>
            <Link
              href={`/admin/cabinets/${cab.id}/positions`}
              className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
            >
              <span>Buka Modul Jabatan Penuh (ADM-07) →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {[
              { title: "Ketua Umum", level: "Top Leadership", scope: "Cabang" },
              { title: "Sekretaris Umum", level: "Top Leadership", scope: "Administrasi" },
              { title: "Bendahara Umum", level: "Top Leadership", scope: "Keuangan" },
              { title: "Ketua Bidang", level: "Middle Leadership", scope: "Bidang" },
              { title: "Ketua Kompartemen", level: "Operational Leadership", scope: "Kompartemen" },
              { title: "Manajer Proker", level: "Project Leadership", scope: "Proker" },
              { title: "Staff Ahli Bidang", level: "Support", scope: "Bidang" },
              { title: "Staff Kompartemen", level: "Operational", scope: "Kompartemen" },
              { title: "Anggota Tim Proker", level: "Execution", scope: "Proker" }
            ].map((j, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1"
              >
                <strong className="text-wine-950 block font-serif text-sm">{j.title}</strong>
                <div className="flex items-center justify-between text-[10px] text-neutral-light font-mono">
                  <span>Level: {j.level}</span>
                  <span>Scope: {j.scope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Penempatan Pengurus */}
      {activeTab === "placement" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-wine-950/10">
            <h2 className="font-serif text-lg font-bold text-wine-950">
              Daftar Penugasan Pengurus & Roster
            </h2>
            <span className="text-xs text-neutral-light font-mono">
              Total {allRosters.length} Penempatan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-3">Nama Anggota</th>
                  <th className="py-2.5 px-3">NIM</th>
                  <th className="py-2.5 px-3">Jabatan Penugasan</th>
                  <th className="py-2.5 px-3">Tingkat Akses</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-950/5">
                {allRosters.map((r) => (
                  <tr key={r.id} className="hover:bg-wine-950/5">
                    <td className="py-2.5 px-3 font-semibold text-wine-950">
                      {r.name}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-neutral-dark">
                      {r.nim || "-"}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-serif font-medium text-brand-burgundy">
                        {r.role_title}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-[10px] bg-surface-ivory px-2 py-0.5 rounded border border-wine-950/10">
                        {r.access_level}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
