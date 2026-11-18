"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Building,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  FolderKanban,
  CheckCircle2,
  Archive,
  Sparkles,
  Users
} from "lucide-react";

export default function CabinetCenterPage() {
  const { store } = useMockStore();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Cabinet Center
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Pusat administrasi periode kepengurusan HIPMI PT Universitas Telkom. Pilih kabinet kerja untuk mengelola struktur, peran, dan modul organisasi.
          </p>
        </div>

        <Link
          href="/admin/cabinets/form?mode=create"
          className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kabinet Baru</span>
        </Link>
      </div>

      {/* Cabinets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {store.cabinets.map((cab) => {
          const isActive = cab.status === "active";
          const fieldsCount = store.fields.filter((f) => f.cabinet_id === cab.id).length;
          const compCount = store.compartments.filter((c) => c.cabinet_id === cab.id).length;
          const prokerCount = store.projects.filter((p) => p.cabinet_id === cab.id).length;

          return (
            <div
              key={cab.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                isActive
                  ? "bg-surface-card border-brand-burgundy/50 shadow-xl ring-2 ring-brand-burgundy/20"
                  : "bg-surface-card/70 border-wine-950/10 shadow-md opacity-80"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-darkWine text-gold-300 font-serif text-2xl font-bold flex items-center justify-center border border-gold-400/30 shadow-md">
                      {cab.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-wine-950">
                        Kabinet {cab.name}
                      </h2>
                      <span className="text-xs font-mono text-neutral-light">
                        Periode: {cab.period_start} — {cab.period_end}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${
                      isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {isActive ? "Kabinet Aktif" : "Arsip"}
                  </span>
                </div>

                <p className="text-xs text-neutral-dark leading-relaxed">
                  {cab.vision || "Mewujudkan HIPMI PT Telkom University sebagai episentrum lahirnya wirausahawan muda yang berdaya saing nasional dan global."}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-wine-950/10 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-ivory">
                    <span className="text-[10px] text-neutral-light uppercase font-mono block">
                      Bidang
                    </span>
                    <strong className="text-wine-950 font-serif text-base">{fieldsCount}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-ivory">
                    <span className="text-[10px] text-neutral-light uppercase font-mono block">
                      Kompartemen
                    </span>
                    <strong className="text-wine-950 font-serif text-base">{compCount}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-ivory">
                    <span className="text-[10px] text-neutral-light uppercase font-mono block">
                      Proker
                    </span>
                    <strong className="text-wine-950 font-serif text-base">{prokerCount}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-wine-950/10 flex items-center justify-between gap-3">
                <Link
                  href={`/admin/cabinets/${cab.id}/archive`}
                  className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1.5"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Arsip & Detail</span>
                </Link>

                <Link
                  href={`/admin/cabinets/${cab.id}`}
                  className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Buka Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
