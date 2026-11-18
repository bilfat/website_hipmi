"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Building2, Users, FolderKanban } from "lucide-react";

export default function FieldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const field = store.fields.find((f) => f.id === id) || store.fields[0];
  const compartments = store.compartments.filter((c) => c.field_id === field.id);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb */}
        <Link
          href="/organisasi/bidang"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Bidang</span>
        </Link>

        {/* Header Profile */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-base shrink-0">
                {field.code}
              </span>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
                  {field.name}
                </h1>
                <p className="text-xs text-neutral-light mt-1">
                  Kepala Bidang: <strong className="text-wine-950">{field.leader_name}</strong>
                </p>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-mono text-xs font-bold">
              {compartments.length} Kompartemen Terkoordinasi
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed pt-2 border-t border-wine-950/10">
            {field.description}
          </p>
        </div>

        {/* Compartments & Projects underneath */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Unit Pelaksana
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Kompartemen &amp; Program Kerja Terkait
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {compartments.map((comp) => {
              const projects = store.projects.filter((p) => p.compartment_id === comp.id);

              return (
                <div
                  key={comp.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="px-2.5 py-1 rounded-xl bg-gold-50 text-brand-burgundy font-mono text-xs font-bold border border-gold-300">
                        {comp.code}
                      </span>
                      <Link
                        href={`/organisasi/kompartemen/${comp.id}`}
                        className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1"
                      >
                        <span>Buka Kompartemen</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-lg text-wine-950">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-neutral-dark mt-1 leading-relaxed">
                        {comp.description}
                      </p>
                      <p className="text-[11px] text-neutral-light mt-2">
                        Kakom: <strong className="text-wine-950">{comp.leader_name}</strong>
                      </p>
                    </div>

                    {/* Proker List */}
                    <div className="pt-3 border-t border-wine-950/10 space-y-2">
                      <p className="text-[11px] font-semibold text-neutral-dark uppercase font-mono">
                        Program Kerja ({projects.length}):
                      </p>
                      {projects.length === 0 ? (
                        <p className="text-xs text-neutral-light italic">Belum ada program kerja yang dirilis.</p>
                      ) : (
                        <div className="space-y-2">
                          {projects.map((proj) => (
                            <Link
                              key={proj.id}
                              href={`/organisasi/program-kerja/${proj.id}`}
                              className="p-3 rounded-2xl bg-surface-ivory hover:bg-gold-50/70 border border-wine-950/10 hover:border-gold-400 transition-all flex items-center justify-between text-xs group"
                            >
                              <div>
                                <strong className="text-wine-950 group-hover:text-brand-burgundy">
                                  {proj.name}
                                </strong>
                                <p className="text-[10px] text-neutral-light mt-0.5 line-clamp-1">{proj.purpose}</p>
                              </div>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                                  proj.operational_status === "ongoing"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-surface-ivory text-neutral-dark border"
                                }`}
                              >
                                {proj.operational_status}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
