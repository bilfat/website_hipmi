"use client";

import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Building, ArrowRight, FolderKanban } from "lucide-react";

export default function CompartmentsListPage() {
  const { store } = useMockStore();

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Unit Spesialis
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Delapan Kompartemen Kerja ARTHAKARSA
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Unit pelaksana operasional yang bertanggung jawab langsung mengeksekusi program kerja, pembinaan kader, kemitraan, dan tata kelola sistem.
          </p>
        </div>

        {/* Compartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {store.compartments.map((comp) => {
            const parentField = store.fields.find((f) => f.id === comp.field_id);
            const projects = store.projects.filter((p) => p.compartment_id === comp.id);

            return (
              <div
                key={comp.id}
                className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-xs">
                      {comp.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-neutral-light px-2 py-0.5 rounded bg-surface-ivory border">
                      {parentField?.code || "BIDANG"}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-base text-wine-950">
                      {comp.name}
                    </h2>
                    <p className="text-[11px] text-neutral-light font-medium mt-1">
                      Kakom: <strong className="text-wine-950">{comp.leader_name}</strong>
                    </p>
                    <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-wine-950/10 text-xs text-neutral-dark flex items-center justify-between">
                    <span className="text-[11px] text-neutral-light">Program Kerja:</span>
                    <strong className="text-brand-burgundy">{projects.length} Proker</strong>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-end">
                  <Link
                    href={`/organisasi/kompartemen/${comp.id}`}
                    className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1 group"
                  >
                    <span>Buka Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PublicShell>
  );
}
