"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Building, FolderKanban, Users } from "lucide-react";

export default function CompartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const comp = store.compartments.find((c) => c.id === id) || store.compartments[0];
  const parentField = store.fields.find((f) => f.id === comp.field_id);
  const projects = store.projects.filter((p) => p.compartment_id === comp.id);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb */}
        <Link
          href="/organisasi/kompartemen"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Kompartemen</span>
        </Link>

        {/* Header Profile */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-base shrink-0">
                {comp.code}
              </span>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
                  {comp.name}
                </h1>
                <p className="text-xs text-neutral-light mt-1">
                  Kepala Kompartemen: <strong className="text-wine-950">{comp.leader_name}</strong>
                </p>
              </div>
            </div>

            {parentField && (
              <Link
                href={`/organisasi/bidang/${parentField.id}`}
                className="px-3.5 py-1.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Di Bawah: {parentField.code}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed pt-2 border-t border-wine-950/10">
            {comp.description}
          </p>
        </div>

        {/* Projects Underneath */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Amanah Program
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Program Kerja Kompartemen ({projects.length})
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-surface-card border border-wine-950/10 text-neutral-light text-xs">
              Belum ada program kerja yang ditugaskan ke kompartemen ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                          proj.operational_status === "ongoing"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-surface-ivory text-neutral-dark border"
                        }`}
                      >
                        {proj.operational_status}
                      </span>
                      <span className="text-[10px] text-neutral-light font-mono">
                        {proj.start_date}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-wine-950">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-neutral-dark line-clamp-3 leading-relaxed">
                      {proj.purpose}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-between">
                    <Link
                      href={`/organisasi/program-kerja/${proj.id}`}
                      className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1"
                    >
                      <span>Detail Program Kerja</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}
