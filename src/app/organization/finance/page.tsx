"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Plus,
  ArrowRight,
  ChevronRight,
  PieChart,
  FileSpreadsheet,
  Wallet,
  Building
} from "lucide-react";

export default function FinanceOverviewPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const transactions = store.finance_transactions || [];
  const fundRequests = store.fund_requests || [];

  // Calculate aggregates
  const totalIncome = transactions
    .filter((t) => t.type === "income" && t.status === "posted")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "posted")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const pendingRequests = fundRequests.filter(
    (r) => r.status === "submitted" || r.status === "in_review"
  );
  const pendingAmount = pendingRequests.reduce((sum, r) => sum + r.requested_amount, 0);

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-01
              </span>
              <span className="text-xs font-medium text-wine-500">Bendahara Umum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Financial Overview HIPMI CENTRAL
            </h1>
            <p className="text-sm text-wine-600 mt-1">
              Sentralisasi tata kelola arus kas, persetujuan anggaran proker, mutasi rekening, dan laporan fiskal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/organization/finance/requests/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Dana (FIN-05)</span>
            </Link>
            <Link
              href="/organization/finance/transactions/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 font-medium text-sm shadow-2xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Transaksi (FIN-03)</span>
            </Link>
          </div>
        </div>

        {/* Aggregated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Total Kas Tersedia</span>
              <Wallet className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-wine-950">
              Rp {netBalance.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">Saldo bersih rekening kas pusat</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Total Pemasukan</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-emerald-700">
              Rp {totalIncome.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-emerald-600">Tiket, medpart, sponsor & iuran</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Total Pengeluaran</span>
              <TrendingDown className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-rose-700">
              Rp {totalExpense.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-rose-600">Realisasi termin pencairan & operasional</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Pengajuan Tertunda</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-amber-800">
              Rp {pendingAmount.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-amber-700">{pendingRequests.length} pengajuan menunggu Bendum</p>
          </div>
        </div>

        {/* Feature Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/organization/finance/transactions"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Jurnal Transaksi (FIN-02)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Buku kas umum, mutasi keluar/masuk, dan filter pos anggaran.</p>
          </Link>

          <Link
            href="/organization/finance/requests"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Pengajuan Dana (FIN-04)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Review proposal dana proker, rincian RAB, & persetujuan Bendum.</p>
          </Link>

          <Link
            href="/organization/finance/disbursements"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Pencairan Dana (FIN-07)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Pencairan bertahap per termin & konfirmasi penerimaan unit.</p>
          </Link>

          <Link
            href="/organization/finance/revenue"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Revenue Monitoring (FIN-09)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Rekapitulasi penjualan tiket agenda & kemitraan media partner.</p>
          </Link>
        </div>

        {/* Pending Requests & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fund Requests Box */}
          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-wine-950">
                Pengajuan Dana Menunggu Bendum
              </h3>
              <Link
                href="/organization/finance/requests"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-wine-50">
              {pendingRequests.length === 0 ? (
                <div className="py-6 text-center text-xs text-wine-500">
                  Tidak ada pengajuan dana yang tertunda.
                </div>
              ) : (
                pendingRequests.slice(0, 4).map((r) => (
                  <div key={r.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-wine-900 font-display">
                        <Link href={`/organization/finance/requests/${r.id}`} className="hover:underline hover:text-brand-burgundy">
                          {r.purpose}
                        </Link>
                      </h4>
                      <p className="text-xs text-wine-500 mt-0.5">
                        {r.unit_name} • Pengaju: {r.submitter_name}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold font-mono text-sm text-brand-burgundy">
                        Rp {r.requested_amount.toLocaleString("id-ID")}
                      </span>
                      <p className="text-[10px] text-amber-700 font-semibold uppercase">{r.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Transactions Box */}
          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-wine-950">
                Transaksi Kas Terbaru
              </h3>
              <Link
                href="/organization/finance/transactions"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                Buku Kas <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-wine-50">
              {transactions.slice(0, 4).map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-wine-900">
                      {t.description}
                    </h4>
                    <p className="text-[11px] text-wine-500 mt-0.5">
                      {t.category} • Rek: {t.source_account}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-bold font-mono text-xs ${
                        t.type === "income" ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                    </span>
                    <p className="text-[10px] text-wine-400 font-mono">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
