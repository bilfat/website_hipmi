"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Building,
  Layers,
  Users,
  Shield,
  Settings,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  FolderKanban,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";

export default function CabinetDashboardPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];
  const fields = store.fields.filter((f) => f.cabinet_id === cab.id);
  const compartments = store.compartments.filter((c) => c.cabinet_id === cab.id);
  const projects = store.projects.filter((p) => p.cabinet_id === cab.id);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href="/admin/cabinets"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Cabinet Center (Pilih Kabinet Lain)</span>
      </Link>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
              Dashboard Kabinet {cab.name}
            </h1>
            <p className="text-xs text-neutral-dark font-mono">
              Periode Bakti: {cab.period_start} — {cab.period_end} • Status:{" "}
              <strong className="text-emerald-700 capitalize">{cab.status}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/cabinets/form?mode=edit&recordId=${cab.id}`}
              className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors"
            >
              Edit Visi & Filosofi
            </Link>

            <Link
              href={`/admin/cabinets/${cab.id}/archive`}
              className="px-4 py-2 rounded-full bg-surface-ivory border border-wine-950/15 text-xs font-semibold text-brand-burgundy hover:bg-wine-950/5 transition-colors"
            >
              Arsip Kabinet
            </Link>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-wine-950/10 text-xs">
          <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10">
            <span className="text-neutral-light block text-[10px] uppercase font-mono">
              Bidang Utama
            </span>
            <strong className="text-xl font-bold font-serif text-wine-950">
              {fields.length} Bidang
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10">
            <span className="text-neutral-light block text-[10px] uppercase font-mono">
              Kompartemen
            </span>
            <strong className="text-xl font-bold font-serif text-wine-950">
              {compartments.length} Unit
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10">
            <span className="text-neutral-light block text-[10px] uppercase font-mono">
              Program Kerja
            </span>
            <strong className="text-xl font-bold font-serif text-wine-950">
              {projects.length} Proker
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10">
            <span className="text-neutral-light block text-[10px] uppercase font-mono">
              Database Kader
            </span>
            <strong className="text-xl font-bold font-serif text-wine-950">
              {store.users.length} Akun
            </strong>
          </div>
        </div>
      </div>

      {/* Administration Modules Grid (6 Modules) */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-wine-950/80 font-mono">
          Modul Pengelolaan Kabinet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Struktur Organisasi */}
          <Link
            href={`/admin/cabinets/${cab.id}/structure`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Struktur Organisasi
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Kelola bagan hierarki, 4 bidang utama, 8 kompartemen, dan pemetaan penempatan pengurus.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Buka Struktur Organisasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Master Jabatan & Penugasan */}
          <Link
            href={`/admin/cabinets/${cab.id}/positions`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-400/20 text-wine-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-brand-burgundy" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Jabatan & Penugasan
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Atur titel jabatan, SK pengangkatan, assignment kakom, manajer proker, dan staf pelaksana.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Kelola Master Jabatan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Manajemen Pengguna */}
          <Link
            href={`/admin/cabinets/${cab.id}/users`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Pengguna & Database Kader
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Pusat data 28 akun demo, status verifikasi kader, identitas mahasiswa, dan status akun.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Kelola Pengguna & Akun</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 4: Matriks Role & Permission */}
          <Link
            href={`/admin/cabinets/${cab.id}/permissions`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-400/20 text-wine-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-brand-burgundy" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Role & Permission
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Konfigurasi matriks Role × Permission × Scope sesuai ketetapan RBAC HIPMI CENTRAL.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Konfigurasi Hak Akses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 5: Konfigurasi Modul */}
          <Link
            href={`/admin/cabinets/${cab.id}/modules`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Konfigurasi Modul
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Pengaturan modul aktif (Persuratan, Keuangan, Ticketing, Presensi, Medpart, Aspirasi).
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Kelola Status Modul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 6: Log Audit Administratif */}
          <Link
            href={`/admin/cabinets/${cab.id}/audit`}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 hover:shadow-xl transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-400/20 text-wine-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-brand-burgundy" />
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              Audit Log Administratif
            </h3>
            <p className="text-xs text-neutral-dark leading-relaxed">
              Rekam jejak mutasi data, approval pembayaran, penerbitan surat, dan perubahan hak akses.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy group-hover:translate-x-1 transition-transform">
              <span>Buka Rekam Jejak Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
