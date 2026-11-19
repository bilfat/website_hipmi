"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Layers,
  FolderKanban,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Mail,
  Wallet,
  CalendarCheck,
  QrCode,
  Users,
  Globe,
  Award,
  Plus,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function OrganizationDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [categoryFilter, setCategoryFilter] = useState<"all" | "admin" | "event" | "governance">("all");

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const activeProjects = store.projects.filter(
    (p) => p.cabinet_id === activeCab.id && p.operational_status === "ongoing"
  );
  const pendingLetters = store.correspondence.filter((c) => c.status === "submitted" || c.status === "in_review");
  const pendingFunds = store.fund_requests.filter((f) => f.status === "submitted" || f.status === "in_review");
  const upcomingEvents = store.events.filter((e) => new Date(e.schedule_start) >= new Date());
  const checkedInTickets = store.tickets.filter((t) => t.is_checked_in);
  const verifiedCadres = store.users.filter((u) => u.cadre_status === "verified");

  // Calculate current general balance
  const cashBalance = store.finance_transactions.reduce((acc, t) => {
    if (t.type === "income") return acc + t.amount;
    if (t.type === "expense") return acc - t.amount;
    return acc;
  }, 0);

  const totalPendingAction = pendingLetters.length + pendingFunds.length;

  // Dynamic references (resolving P1 & P2 critique observations)
  const primaryProkerHref = activeProjects.length > 0 
    ? `/workspace/${activeProjects[0].id}` 
    : "/organization/reports";

  const primaryEventId = upcomingEvents[0]?.id || "evt-business-expo";

  // Category Tabs Definition for Mobile & Responsive Quick Triage
  const filterTabs = [
    { id: "all", label: "Semua", count: 8 },
    { id: "admin", label: "Administrasi & Kas", count: 2 },
    { id: "event", label: "Event & Presensi", count: 2 },
    { id: "governance", label: "Tata Kelola & Eksternal", count: 4 },
  ] as const;

  return (
    <OrganizationShell>
      <div className="space-y-6 sm:space-y-8 pb-16">
        {/* Top Hero Banner (Mobile Adaptive Typography & Button Stack) */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-darkWine via-brand-burgundy to-brand-darkWine text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-gold-200 border border-gold-400/30">
                  Tata Kelola Organisasi
                </span>
                <span className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full font-mono font-semibold uppercase bg-white/10 text-white/90">
                  Kabinet {activeCab.name} Aktif
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Dasbor Operasional Organisasi
              </h1>

              <p className="text-xs sm:text-sm text-gold-100/90 max-w-2xl leading-relaxed">
                Pusat komando dan navigasi tata kelola BPC HIPMI PT Telkom University Periode 2026/2027.
              </p>
            </div>

            {/* Mobile Thumbs-First Hero CTAs */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
              <Link
                href="/organization/structure"
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-xs font-semibold text-white transition-all flex items-center justify-center text-center active:scale-[0.98]"
              >
                Struktur Pengurus
              </Link>

              <Link
                href="/organization/action-center"
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-wine-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md text-center active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-wine-950 shrink-0" />
                <span>Pusat Tindakan &amp; Persetujuan</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Actionable Executive Triage Tray (Full-width Touch Target on Mobile) */}
        {totalPendingAction > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/95 border border-amber-300/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0 border border-amber-400/40">
                <AlertCircle className="w-5 h-5 text-amber-900" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-wine-950 leading-snug">
                  Tindakan Diperlukan: {totalPendingAction} Pengajuan Membutuhkan Review
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-dark leading-normal">
                  {pendingLetters.length} persuratan Sekum &amp; {pendingFunds.length} pengajuan kas RAB Bendum.
                </p>
              </div>
            </div>
            <Link
              href="/organization/action-center"
              className="min-h-[44px] px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 shrink-0 w-full sm:w-auto transition-all active:scale-[0.98]"
            >
              <span>Buka Approval Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* 4 Top KPI Highlights (Responsive 2x2 on Mobile, 4x1 on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Highlight 1: Proker Berjalan (Dynamic Link) */}
          <Link
            href={primaryProkerHref}
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md active:bg-wine-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 sm:pb-3">
              <span className="text-neutral-dark text-[11px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                Proker Berjalan
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <FolderKanban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {activeProjects.length}
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-dark mt-1 block truncate">
                Dari {store.projects.length} total program
              </span>
            </div>
          </Link>

          {/* Highlight 2: Surat Butuh Review */}
          <Link
            href="/organization/correspondence"
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md active:bg-wine-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 sm:pb-3">
              <span className="text-neutral-dark text-[11px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                Surat Review
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gold-500/15 text-gold-800 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {pendingLetters.length}
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-dark mt-1 block truncate">
                Antrean verifikasi Sekum
              </span>
            </div>
          </Link>

          {/* Highlight 3: Pengajuan Kas Proker */}
          <Link
            href="/organization/finance"
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md active:bg-wine-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 sm:pb-3">
              <span className="text-neutral-dark text-[11px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                Pengajuan RAB
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {pendingFunds.length}
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-dark mt-1 block truncate">
                Persetujuan Bendum
              </span>
            </div>
          </Link>

          {/* Highlight 4: Agenda Terjadwal */}
          <Link
            href="/organization/calendar"
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md active:bg-wine-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 sm:pb-3">
              <span className="text-neutral-dark text-[11px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                Agenda Mendatang
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gold-500/15 text-gold-800 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {upcomingEvents.length}
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-dark mt-1 block truncate">
                Kegiatan kalender aktif
              </span>
            </div>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* PUSAT DASHBOARD MODUL & TATA KELOLA OPERASIONAL (OPERATIONAL COMMAND HUB)  */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-wine-950/10 pb-3">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-wine-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-burgundy" />
                <span>Pusat Modul &amp; Dasbor Operasional</span>
              </h2>
              <p className="text-xs text-neutral-dark mt-0.5">
                Pilih modul kerja untuk mengelola administrasi, keuangan, kepanitiaan, dan arsip kabinet.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-wine-50 text-wine-900 border border-wine-200 self-start sm:self-center">
              8 Kelompok Modul Utama
            </span>
          </div>

          {/* Mobile & Tablet Quick Filter Bar (Solves 1800px+ mobile scroll fatigue) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
            {filterTabs.map((tab) => {
              const isSelected = categoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-brand-burgundy text-white shadow-sm font-bold"
                      : "bg-surface-card hover:bg-wine-50 text-wine-950 border border-wine-950/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-wine-950/5 text-neutral-dark"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 8 Module Cards Grid with Responsive Filtering & Min-44px Touch Targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Modul Persuratan */}
            {(categoryFilter === "all" || categoryFilter === "admin") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-wine-50 text-brand-burgundy border border-wine-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-wine-100/70 text-wine-900">
                      Biro Administrasi
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Persuratan Sentral
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Surat tugas, permohonan SK, review checklist 4-item Sekum, penomoran otomatis &amp; tracking Ditmawa.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Antrean Review:</span>
                    <span className="font-bold text-brand-burgundy">{pendingLetters.length} Surat</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/correspondence"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Dasbor
                    </Link>
                    {permissions.canCreateLetter ? (
                      <Link
                        href="/organization/correspondence/form?mode=create"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" /> Buat Surat
                      </Link>
                    ) : (
                      <Link
                        href="/organization/correspondence"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Daftar Surat
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Modul Keuangan & Kas */}
            {(categoryFilter === "all" || categoryFilter === "admin") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-800 border border-gold-300/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold-100/70 text-gold-900">
                      Kebendaharaan
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Keuangan &amp; Kas
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Buku kas umum, review RAB Bendum, pencairan termin bertahap, dan monitoring pendapatan tiket &amp; medpart.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Saldo Kas Aktif:</span>
                    <span className="font-bold text-wine-950 font-mono">Rp {cashBalance.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/finance"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Buka Keuangan
                    </Link>
                    {permissions.canCreateFundRequest || permissions.canManageFinance ? (
                      <Link
                        href="/organization/finance/requests/form"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" /> Ajukan RAB
                      </Link>
                    ) : (
                      <Link
                        href="/organization/finance"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Buku Kas
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Modul Manajemen Event */}
            {(categoryFilter === "all" || categoryFilter === "event") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-wine-50 text-brand-burgundy border border-wine-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-wine-100/70 text-wine-900">
                      Operasional Acara
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Manajemen Acara
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Pusat kendali program kerja, manajemen kuota tiket, meja verifikasi pembayaran panitia, dan kirim ulang tiket.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Tiket Terbit:</span>
                    <span className="font-bold text-wine-950 font-mono">{store.tickets.length} Lembar</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/events"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Daftar Agenda
                    </Link>
                    {permissions.canManageEvents ? (
                      <Link
                        href="/calendar/events/form"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" /> Buat Agenda
                      </Link>
                    ) : (
                      <Link
                        href="/organization/events"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Lihat Agenda
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Modul Presensi & Scanner (Dynamic Event ID P2 Fix) */}
            {(categoryFilter === "all" || categoryFilter === "event") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-800 border border-gold-300/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold-100/70 text-gold-900">
                      Meja Kehadiran
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Presensi &amp; Pemindai QR
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Meja presensi tiket, pemindai QR kamera langsung, masukan kode manual, dan rekaman kehadiran seketika.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Kehadiran Terdata:</span>
                    <span className="font-bold text-wine-950 font-mono">{checkedInTickets.length} Hadir</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href={`/organization/events/${primaryEventId}/check-in`}
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Meja Presensi
                    </Link>
                    {permissions.canManageEvents || permissions.canScanAttendance ? (
                      <Link
                        href={`/organization/events/${primaryEventId}/scanner`}
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <QrCode className="w-3.5 h-3.5 shrink-0" /> Pindai QR
                      </Link>
                    ) : (
                      <Link
                        href={`/organization/events/${primaryEventId}/check-in`}
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Rekam Presensi
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Modul Dokumen & LPJ */}
            {(categoryFilter === "all" || categoryFilter === "governance") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-wine-50 text-brand-burgundy border border-wine-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-wine-100/70 text-wine-900">
                      Arsip &amp; LPJ
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Dokumen &amp; LPJ
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Bank arsip dokumen resmi kabinet, versioning metadata, dan review LPJ 7-bagian terintegrasi data riil.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Total Arsip:</span>
                    <span className="font-bold text-wine-950 font-mono">{store.documents.length} Dokumen</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/documents"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Dokumen
                    </Link>
                    <Link
                      href="/organization/lpj"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                    >
                      Antrean LPJ
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Direktori Kader & Mitra */}
            {(categoryFilter === "all" || categoryFilter === "governance") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-800 border border-gold-300/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold-100/70 text-gold-900">
                      PSDM &amp; Kemitraan
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Direktori &amp; Mitra
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Database kader lengkap, verifikasi penautan mahasiswa PSDM, katalog bisnis kader, dan CRM korporat.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Kader Terverifikasi:</span>
                    <span className="font-bold text-wine-950 font-mono">{verifiedCadres.length} Orang</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/directory/cadres"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Data Kader
                    </Link>
                    {permissions.canVerifyCadres ? (
                      <Link
                        href="/organization/directory/cadres/verification"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <Award className="w-3.5 h-3.5 shrink-0" /> Verifikasi PSDM
                      </Link>
                    ) : (
                      <Link
                        href="/organization/directory/cadres"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Mitra Bisnis
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 7. CMS Portal & Media Partner */}
            {(categoryFilter === "all" || categoryFilter === "governance") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-wine-50 text-brand-burgundy border border-wine-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-wine-100/70 text-wine-900">
                      Publikasi &amp; Media
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      CMS &amp; Mitra Media
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Editor visual beranda, publikasi warta berita, verifikasi paket mitra media &amp; seleksi aspirasi kotak suara.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Konten Web:</span>
                    <span className="font-bold text-wine-950 font-mono">{store.articles.length} Berita</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/cms"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Buka CMS
                    </Link>
                    {permissions.canReviewMedpart || permissions.canCreateContent || permissions.canPublishContent ? (
                      <Link
                        href="/organization/cms/medpart"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        Verifikasi Mitra Media
                      </Link>
                    ) : (
                      <Link
                        href="/organization/cms"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-wine-100 active:bg-wine-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Lihat Berita
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 8. Kalender & Agenda Terpadu */}
            {(categoryFilter === "all" || categoryFilter === "governance") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-800 border border-gold-300/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold-100/70 text-gold-900">
                      Agenda Terpadu
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      Kalender Organisasi
                    </h3>
                    <p className="text-xs text-neutral-dark mt-1 line-clamp-2 leading-relaxed">
                      Jadwal sidang pleno, rapat koordinasi kabinet, main event proker dengan deteksi tabrakan waktu.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-wine-950/10 mt-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-dark">
                    <span>Jadwal Terdaftar:</span>
                    <span className="font-bold text-wine-950 font-mono">{store.events.length} Kegiatan</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/organization/calendar"
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                      Lihat Kalender
                    </Link>
                    {permissions.canManageEvents || permissions.canAccessOrganization ? (
                      <Link
                        href="/calendar/events/form"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 active:bg-brand-darkWine text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" /> Buat Agenda
                      </Link>
                    ) : (
                      <Link
                        href="/organization/calendar"
                        className="min-h-[44px] px-2.5 py-2 rounded-xl bg-surface-ivory hover:bg-gold-100 active:bg-gold-200 text-xs font-semibold text-wine-950 text-center transition-all flex items-center justify-center active:scale-[0.98]"
                      >
                        Jadwal Pleno
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Two-Column Section: Proker Prioritas & Monitoring Bidang (Reflowing for Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column (7 cols): Active Projects & Compartments */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-md sm:shadow-lg space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-wine-950/10">
                <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-brand-burgundy" />
                  <span>Program Kerja Prioritas Kabinet</span>
                </h2>
                <Link
                  href="/organization/reports"
                  className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
                >
                  <span>Laporan Lengkap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-wine-950/10">
                {activeProjects.slice(0, 4).map((p) => {
                  const comp = store.compartments.find((c) => c.id === p.compartment_id);
                  return (
                    <div
                      key={p.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase text-brand-burgundy">
                          {comp?.name || "Kompartemen"}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-wine-950 block group-hover:text-brand-burgundy transition-colors leading-snug">
                          {p.name}
                        </h3>
                        <p className="text-xs text-neutral-dark line-clamp-2 sm:line-clamp-1 leading-normal">
                          {p.description}
                        </p>
                      </div>

                      <Link
                        href={`/workspace/${p.id}`}
                        className="min-h-[44px] sm:min-h-[36px] px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 active:bg-wine-950/10 transition-all flex items-center justify-center shrink-0 w-full sm:w-auto active:scale-[0.98]"
                      >
                        Buka Ruang Kerja
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): 4 Bidang Monitoring & Fast Links */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-md sm:shadow-lg space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-wine-950/10">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gold-600" />
                  <span>Pemantauan 4 Bidang Utama</span>
                </h2>
                <Link
                  href="/organization/structure"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="divide-y divide-wine-950/10">
                {store.fields.map((f) => {
                  const compCount = store.compartments.filter((c) => c.field_id === f.id).length;
                  return (
                    <Link
                      key={f.id}
                      href={`/organization/fields/${f.id}/monitoring`}
                      className="min-h-[48px] py-2.5 first:pt-1 last:pb-1 flex items-center justify-between transition-all group hover:bg-wine-950/[0.03] active:bg-wine-950/10 px-2.5 rounded-xl -mx-1"
                    >
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <strong className="text-xs text-wine-950 group-hover:text-brand-burgundy transition-colors block truncate">
                          {f.name}
                        </strong>
                        <span className="text-[11px] text-neutral-dark block">
                          Membawahi {compCount} Kompartemen
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-brand-burgundy transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
