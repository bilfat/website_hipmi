"use client";

import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { FolderKanban, ArrowRight, Users, Building2 } from "lucide-react";

export default function FieldsListPage() {
  const { store } = useMockStore();

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Struktur Organisasi
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Empat Bidang Utama ARTHAKARSA
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Pilar pembagian fungsi strategis kepengurusan HIPMI PT Universitas Telkom periode 2026/2027.
          </p>
        </div>

        {/* Fields List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {store.fields.map((field) => {
            const compartments = store.compartments.filter((c) => c.field_id === field.id);

            return (
              <div
                key={field.id}
                className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center font-mono font-bold text-brand-burgundy text-sm">
                      {field.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-ivory text-neutral-dark text-xs font-medium border border-wine-950/10">
                      {compartments.length} Kompartemen
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-xl text-wine-950">
                      {field.name}
                    </h2>
                    <p className="text-xs text-neutral-dark mt-2 leading-relaxed">
                      {field.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center gap-3 text-xs">
                    <Users className="w-4 h-4 text-brand-burgundy shrink-0" />
                    <div>
                      <span className="text-neutral-light block text-[11px]">Kepala Bidang:</span>
                      <strong className="text-wine-950">{field.leader_name}</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-neutral-dark font-mono uppercase">
                      Kompartemen Kerja:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {compartments.map((comp) => (
                        <span
                          key={comp.id}
                          className="px-2.5 py-1 rounded-lg bg-surface-ivory text-neutral-black border border-wine-950/10 text-xs font-medium"
                        >
                          {comp.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-wine-950/10 flex items-center justify-end">
                  <Link
                    href={`/organisasi/bidang/${field.id}`}
                    className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                  >
                    <span>Detail Profil Bidang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
