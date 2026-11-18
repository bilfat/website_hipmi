"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  FileText,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Hash,
  Share2
} from "lucide-react";

export default function CorrespondenceDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const letters = store.correspondence || [];

  const pendingReview = letters.filter(
    (l) => l.status === "submitted" || l.status === "in_review"
  );
  const needRevision = letters.filter((l) => l.status === "revision_needed");
  const approvedOrIssued = letters.filter(
    (l) => l.status === "approved" || l.status === "issued"
  );
  const ditmawaLetters = letters.filter((l) => l.routing === "Untuk Ditmawa");

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                COR-01
              </span>
              <span className="text-xs font-medium text-wine-500">Sekretariat Jenderal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Central Correspondence Dashboard
            </h1>
            <p className="text-sm text-wine-600 mt-1">
              Pengelolaan persuratan resmi, disposisi Sekum, penomoran otomatis, dan tracking Ditmawa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organization/correspondence/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Surat Baru (COR-03)</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-wine-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-wine-500 mb-2">
              <span>Menunggu Review</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-wine-950">
              {pendingReview.length}
            </p>
            <p className="text-[11px] text-wine-500 mt-1">Surat butuh verifikasi Sekum</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-wine-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-wine-500 mb-2">
              <span>Perlu Revisi</span>
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-rose-600">
              {needRevision.length}
            </p>
            <p className="text-[11px] text-wine-500 mt-1">Catatan perbaikan dikembalikan</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-wine-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-wine-500 mb-2">
              <span>Selesai & Bernomor</span>
              <FileCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-emerald-700">
              {approvedOrIssued.length}
            </p>
            <p className="text-[11px] text-wine-500 mt-1">Nomor resmi telah diterbitkan</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-wine-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-wine-500 mb-2">
              <span>Alur Ditmawa</span>
              <Building className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-brand-burgundy">
              {ditmawaLetters.length}
            </p>
            <p className="text-[11px] text-wine-500 mt-1">Tracking pengantar kampus</p>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/organization/correspondence/requests"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Daftar Pengajuan (COR-02)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Lihat seluruh surat masuk dan status pemrosesan internal.</p>
          </Link>

          <Link
            href="/organization/correspondence/numbering"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Penomoran Surat (COR-05)</span>
              <Hash className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Generator nomor surat otomatis & registrasi arsip resmi.</p>
          </Link>

          <Link
            href="/organization/correspondence/ditmawa"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Monitoring Ditmawa (COR-06)</span>
              <Share2 className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Pelacakan disposisi pengesahan institusi Telkom University.</p>
          </Link>

          <Link
            href="/organization/correspondence/archive"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Arsip Surat (COR-07)</span>
              <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Database surat selesai, riwayat penomoran, & arsip dokumen.</p>
          </Link>
        </div>

        {/* Priority Letters Queue */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-wine-950">
              Antrean Pengajuan Surat Terbaru
            </h3>
            <Link
              href="/organization/correspondence/requests"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              Lihat Semua ({letters.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-wine-50">
            {letters.slice(0, 5).map((l) => (
              <div
                key={l.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        l.status === "issued"
                          ? "bg-emerald-100 text-emerald-800"
                          : l.status === "revision_needed"
                          ? "bg-rose-100 text-rose-800"
                          : l.status === "approved"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {l.status}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-wine-50 text-wine-800 border border-wine-100">
                      {l.routing}
                    </span>
                    <span className="text-xs text-wine-400">•</span>
                    <span className="text-xs text-wine-500 font-mono">{l.unit_name}</span>
                  </div>

                  <h4 className="text-sm font-bold text-wine-900 font-display">
                    <Link
                      href={`/organization/correspondence/${l.id}`}
                      className="hover:text-brand-burgundy hover:underline"
                    >
                      {l.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-wine-500 mt-0.5">
                    Pengaju: {l.submitter_name} • Tujuan: {l.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {l.generated_letter_number && (
                    <span className="text-xs font-mono font-semibold px-2 py-1 bg-surface-base border border-wine-100 rounded text-brand-burgundy">
                      {l.generated_letter_number}
                    </span>
                  )}
                  <Link
                    href={`/organization/correspondence/${l.id}`}
                    className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold transition-all inline-flex items-center gap-1"
                  >
                    Buka Detail <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
