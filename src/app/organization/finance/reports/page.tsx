"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { ChevronLeft, Printer, Download } from "lucide-react";

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

  const handleExportCsv = () => {
    const headers = ["Tanggal", "Tipe", "Kategori", "Uraian", "Akun Kas", "Bukti", "Nominal (Rp)"];
    const rows = transactions.map((t) =>
      [
        `"${t.date}"`,
        `"${t.type}"`,
        `"${t.category}"`,
        `"${t.description.replace(/"/g, '""')}"`,
        `"${t.source_account}"`,
        `"${t.proof_file_name || "-"}"`,
        t.type === "expense" ? -t.amount : t.amount,
      ].join(",")
    );
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan-keuangan-${activeCab.name.toLowerCase().replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/finance"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Keuangan Sentral</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Laporan Fiskal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Laporan Keuangan &amp; Arus Kas
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Laporan pertanggungjawaban arus kas resmi Bendahara Umum Kabinet {activeCab.name} ({activeCab.period}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Excel (CSV)</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Sheet */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E9E1DC] shadow-sm space-y-6 max-w-4xl mx-auto">
        <div className="border-b-2 border-wine-950 pb-5 text-center space-y-1">
          <h2 className="text-base font-bold uppercase tracking-wider text-wine-950">
            HIPMI PERGURUAN TINGGI UNIVERSITAS TELKOM
          </h2>
          <h3 className="font-serif text-lg font-bold text-brand-burgundy">
            BENDAHARA UMUM — {activeCab.name.toUpperCase()} ({activeCab.period})
          </h3>
          <p className="text-[11px] font-mono text-neutral-dark">
            Laporan Realisasi Arus Kas &amp; Transaksi Tercatat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-mono uppercase text-neutral-light block">
              Total Pemasukan
            </span>
            <strong className="font-mono text-lg text-emerald-700 block mt-1">
              + Rp {totalIncome.toLocaleString("id-ID")}
            </strong>
          </div>
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-mono uppercase text-neutral-light block">
              Total Pengeluaran
            </span>
            <strong className="font-mono text-lg text-rose-700 block mt-1">
              - Rp {totalExpense.toLocaleString("id-ID")}
            </strong>
          </div>
          <div className="p-4 rounded-2xl bg-brand-burgundy/5 border border-brand-burgundy/20">
            <span className="text-[10px] font-mono uppercase text-brand-burgundy block">
              Saldo Bersih (Surplus/Defisit)
            </span>
            <strong className="font-mono text-lg text-wine-950 block mt-1">
              Rp {surplusDeficit.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF8F6] text-neutral-dark border-y border-[#E9E1DC]">
              <tr>
                <th className="py-3 px-3 font-semibold">Tanggal</th>
                <th className="py-3 px-3 font-semibold">Uraian &amp; Kategori</th>
                <th className="py-3 px-3 font-semibold">Bukti</th>
                <th className="py-3 px-3 font-semibold text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1DC]/60">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-2.5 px-3 font-mono text-neutral-dark whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="py-2.5 px-3">
                    <strong className="text-wine-950 block">{t.description}</strong>
                    <span className="text-[10px] text-neutral-light">{t.category}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-emerald-700">
                    {t.proof_file_name || "Terverifikasi"}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-mono font-bold whitespace-nowrap ${
                      t.type === "income" ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
