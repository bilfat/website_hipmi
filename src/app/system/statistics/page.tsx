"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Ticket,
  DollarSign,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Printer
} from "lucide-react";

export default function SystemStatisticsPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const verifiedCadres = store.users.filter((u) => u.cadre_status === "verified");
  const ongoingProjects = store.projects.filter((p) => p.operational_status === "ongoing");

  const totalFundApproved = store.fund_requests
    .filter((r) => r.status === "approved" || r.status === "fully_disbursed")
    .reduce((sum, r) => sum + (r.approved_amount || r.requested_amount), 0);

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                SYS-01
              </span>
              <span className="text-xs font-medium text-wine-500">Monitoring & Eksekutif</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Executive Statistics Dashboard
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Agregasi performa organisasi Kabinet {activeCab.name}, ketercapaian proker, serapan anggaran, dan data demografi kader.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/system/reports/annual-2026"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Buka Laporan Terinci (SYS-02)</span>
            </Link>
          </div>
        </div>

        {/* High Level KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Kader Terverifikasi</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-wine-950">
              {verifiedCadres.length} Orang
            </p>
            <p className="text-[11px] text-wine-500">Dari {store.users.length} total akun terdaftar</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Program Kerja Berjalan</span>
            <p className="text-2xl sm:text-3xl font-bold font-display text-brand-burgundy">
              {ongoingProjects.length} Proker
            </p>
            <p className="text-[11px] text-wine-500">Dari {store.projects.length} target kabinet</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Realisasi Anggaran</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
              Rp {totalFundApproved.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-emerald-600">Diserap oleh kepanitiaan</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Unit Usaha Kader</span>
            <p className="text-2xl sm:text-3xl font-bold font-display text-amber-700">
              {store.businesses.length} Bisnis
            </p>
            <p className="text-[11px] text-wine-500">Terdaftar di direktori HIPMI</p>
          </div>
        </div>

        {/* Performance by Field & Compartment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-wine-950">
              Distribusi Program Kerja per Bidang
            </h3>
            <div className="space-y-3">
              {store.fields.map((field) => {
                const fieldProjects = store.projects.filter((p) => p.field_id === field.id);
                return (
                  <div key={field.id} className="p-3.5 rounded-xl bg-surface-base border border-wine-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-wine-900">{field.name}</span>
                      <span className="font-mono text-xs text-brand-burgundy font-semibold">
                        {fieldProjects.length} Proker
                      </span>
                    </div>
                    <p className="text-[11px] text-wine-500">
                      Ketua Bidang: {field.lead_name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-wine-950">
              Keterlibatan & Aktivitas Organisasi
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-surface-base border border-wine-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-wine-900">Surat Keluar & Ditmawa</span>
                  <p className="text-[11px] text-wine-500">Disposisi resmi Sekum</p>
                </div>
                <span className="font-mono text-sm font-bold text-wine-950">{store.correspondence.length} Surat</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-base border border-wine-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-wine-900">E-Tiket Terbit</span>
                  <p className="text-[11px] text-wine-500">Peserta agenda aktif</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-700">{store.tickets.length} Tiket</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-base border border-wine-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-wine-900">Laporan Pertanggungjawaban</span>
                  <p className="text-[11px] text-wine-500">7 Bab tuntas dikurasi</p>
                </div>
                <span className="font-mono text-sm font-bold text-brand-burgundy">{store.lpjs.length} LPJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
