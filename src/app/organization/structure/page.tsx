"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { formatRoleLabel } from "@/lib/personal/labels";
import {
  Building,
  Users,
  ChevronRight,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

const BPH_ORDER = ["ketum", "waketum", "sekjen", "sekum", "bendum"] as const;

export default function OrganizationStructureOverviewPage() {
  const { store } = useMockStore();

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const fields = store.fields.filter((f) => f.cabinet_id === activeCab.id);
  const compartments = store.compartments.filter((c) => c.cabinet_id === activeCab.id);
  const projects = store.projects.filter((p) => p.cabinet_id === activeCab.id);

  // Dynamically pull BPH from store.users
  const bphMembers = BPH_ORDER.map((roleKey) => {
    const user = store.users.find((u) => u.base_role === roleKey);
    return {
      roleKey,
      roleLabel: formatRoleLabel(roleKey),
      user,
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Hierarki &amp; Monitoring Unit • {activeCab.period}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Struktur Organisasi {activeCab.name}
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Pantau susunan Badan Pengurus Harian (BPH), Bidang Koordinasi, Kompartemen, serta akses cepat ke Workspace masing-masing unit.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 self-start sm:self-auto shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-burgundy" />
          <span>
            {fields.length} Bidang • {compartments.length} Kompartemen • {projects.length} Proker
          </span>
        </span>
      </div>

      {/* BPH Grid (Dynamic from store.users: Ketum, Waketum, Sekjen, Sekum, Bendum) */}
      <section className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <div className="pb-3 border-b border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-lg font-bold text-wine-950">
              Badan Pengurus Harian (BPH)
            </h2>
            <p className="text-xs text-neutral-dark">
              Pimpinan Kabinet (Ketum, Waketum, Sekjen) serta Pejabat Administrasi &amp; Keuangan (Sekum, Bendum).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          {bphMembers.map(({ roleKey, roleLabel, user }) => {
            const isTopman = ["ketum", "waketum", "sekjen"].includes(roleKey);
            return (
              <div
                key={roleKey}
                className={`p-4 rounded-2xl border space-y-2 ${
                  roleKey === "ketum"
                    ? "bg-gradient-to-br from-[#3D0F16] to-[#5A1722] text-white border-[#E8B577]/40 shadow-md"
                    : "bg-[#FCF8F6] border-[#E9E1DC] text-wine-950"
                }`}
              >
                <span
                  className={`text-[10px] font-mono font-bold uppercase block ${
                    roleKey === "ketum"
                      ? "text-[#F5D6A8]"
                      : isTopman
                      ? "text-brand-burgundy"
                      : roleKey === "sekum"
                      ? "text-[#AF7D66]"
                      : "text-emerald-700"
                  }`}
                >
                  {roleLabel}
                </span>
                <strong
                  className={`font-serif text-sm block leading-snug ${
                    roleKey === "ketum" ? "text-white" : "text-wine-950"
                  }`}
                >
                  {user?.name || "Belum Ditentukan"}
                </strong>
                <span
                  className={`text-[11px] font-mono block truncate ${
                    roleKey === "ketum" ? "text-white/75" : "text-neutral-dark"
                  }`}
                >
                  {user?.nim || "-"} {user?.study_program ? `• ${user.study_program}` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fields & Compartments Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-wine-950 flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-burgundy" />
            <span>Bidang Koordinasi &amp; Kompartemen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((f) => {
            const fieldLeader = store.users.find((u) => u.id === f.leader_user_id);
            const fieldComps = compartments.filter((c) => c.field_id === f.id);
            const fieldProkers = projects.filter((p) => p.field_id === f.id);

            return (
              <div
                key={f.id}
                className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-burgundy">
                        Bidang Koordinasi
                      </span>
                      <h3 className="font-serif text-lg font-bold text-wine-950 leading-snug">
                        {f.name}
                      </h3>
                      <p className="text-xs text-neutral-dark">
                        Kepala Bidang:{" "}
                        <strong className="text-wine-950">
                          {fieldLeader?.name || "Belum Ditentukan"}
                        </strong>
                      </p>
                    </div>
                    <Link
                      href={`/workspace/${f.id}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-[11px] font-semibold text-wine-950 hover:text-brand-burgundy inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Compartments under this field */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-light block">
                      Kompartemen ({fieldComps.length}) • Total Proker ({fieldProkers.length})
                    </span>
                    {fieldComps.map((comp) => {
                      const compLeader = store.users.find((u) => u.id === comp.leader_user_id);
                      const compProkers = projects.filter((p) => p.compartment_id === comp.id);
                      return (
                        <Link
                          key={comp.id}
                          href={`/workspace/${comp.id}`}
                          className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all flex items-center justify-between gap-3 text-xs group"
                        >
                          <div className="min-w-0 space-y-0.5">
                            <strong className="text-wine-950 group-hover:text-brand-burgundy transition-colors block truncate">
                              {comp.name}
                            </strong>
                            <span className="text-[11px] text-neutral-dark inline-flex items-center gap-1.5">
                              <Users className="w-3 h-3 text-[#AF7D66]" />
                              <span>Kakom: {compLeader?.name || "-"}</span>
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-white border border-[#E9E1DC] text-[10px] font-mono font-bold text-brand-burgundy inline-flex items-center gap-1 shrink-0">
                            <FolderKanban className="w-3 h-3" />
                            <span>{compProkers.length} Proker</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
