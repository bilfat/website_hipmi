"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  FileText,
  ChevronLeft,
  Printer,
  Download,
  Calendar,
  Building,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Scale
} from "lucide-react";

export default function CentralFinanceReportPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  const transactions = store.finance_transactions || [];

  const totalIncome = transactions
    .filter((t) => t.type === "income" && t.status === "posted")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "posted")
    .reduce((sum, t) => sum + t.amount, 0);

  const surplusDeficit = totalIncome - totalExpense;

  const handlePrint = () => {
    window.print();
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/finance"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Keuangan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-10
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Laporan Keuangan & Arus Kas Fiskal
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Laporan pertanggungjawaban fiskal resmi Bendahara Umum Kabinet {activeCab.name}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 font-medium text-xs shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4 text-brand-burgundy" />
              <span>Cetak Laporan Fiskal</span>
            </button>
          </div>
        </div>

        {/* Printable Report Paper */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-wine-100 shadow-sm space-y-8 max-w-4xl mx-auto">
          {/* Header Organization */}
          <div className="border-b-2 border-wine-950 pb-6 text-center space-y-1">
            <h2 className="text-lg font-bold uppercase tracking-wider text-wine-950">
              HIPMI PERGURUAN TINGGI UNIVERSITAS TELKOM
            </h2>
            <h3 className="text-base font-semibold text-brand-burgundy font-display">
              BENDAHARA UMUM — KABINET {activeCab.name.toUpperCase()} ({activeCab.period})
            </h3>
            <p className="text-xs text-wine-600 font-mono">
              Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung • HIPMI CENTRAL
            </p>
          </div>

          {/* Report Meta */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs">
            <div>
              <p className="text-wine-500">Jenis Dokumen:</p>
              <p className="font-bold text-wine-900 text-sm">Laporan Realisasi Anggaran & Kas Sentral</p>
            </div>
            <div className="sm:text-right">
              <p className="text-wine-500">Tanggal Rekonsiliasi:</p>
              <p className="font-mono font-semibold text-wine-900">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          {/* Statement of Financial Position */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-wine-950 border-b border-wine-200 pb-2 flex items-center justify-between">
              <span>I. Rekapitulasi Arus Kas (Cash Flow Summary)</span>
              <Scale className="w-4 h-4 text-brand-burgundy" />
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-wine-50">
                <span className="text-wine-700">A. Penerimaan Kas Masuk (Total Income)</span>
                <span className="font-mono font-bold text-emerald-700">
                  Rp {totalIncome.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-wine-50">
                <span className="text-wine-700">B. Realisasi Belanja & Pengeluaran (Total Expense)</span>
                <span className="font-mono font-bold text-rose-700">
                  Rp {totalExpense.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-wine-200 bg-surface-base px-4 rounded-xl font-bold">
                <span className="text-wine-950">Surplus / (Defisit) Kas Bersih:</span>
                <span
                  className={`font-mono text-base ${
                    surplusDeficit >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {surplusDeficit >= 0 ? "+" : ""} Rp {surplusDeficit.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Transactions Ledger Snapshot */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-wine-950 border-b border-wine-200 pb-2">
              II. Jurnal Rekonsiliasi Transaksi Buku Kas Terakhir
            </h4>

            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50 text-wine-800 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-2 px-3">Tanggal</th>
                  <th className="py-2 px-3">Kategori</th>
                  <th className="py-2 px-3">Uraian Transaksi</th>
                  <th className="py-2 px-3 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {transactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2 px-3 font-mono text-wine-500">{tx.date}</td>
                    <td className="py-2 px-3 font-medium">{tx.category}</td>
                    <td className="py-2 px-3 text-wine-900">{tx.description}</td>
                    <td
                      className={`py-2 px-3 text-right font-mono font-bold ${
                        tx.type === "income" ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"} Rp {tx.amount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formal Signature Footnotes */}
          <div className="pt-8 border-t border-wine-200 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="text-wine-500">Mengetahui,</p>
              <p className="font-semibold text-wine-900 mt-0.5">Ketua Umum HIPMI PT Telkom</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-wine-950">Ahmad Fauzan Pratama</p>
              <p className="text-[11px] text-wine-500 font-mono">NIM 1201220001</p>
            </div>
            <div>
              <p className="text-wine-500">Dibuat oleh,</p>
              <p className="font-semibold text-wine-900 mt-0.5">Bendahara Umum</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-wine-950">Rania Az-Zahra</p>
              <p className="text-[11px] text-wine-500 font-mono">NIM 1401220045</p>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
