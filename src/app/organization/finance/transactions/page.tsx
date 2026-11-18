"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  DollarSign,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Edit2
} from "lucide-react";

export default function FinanceTransactionsPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const transactions = (store.finance_transactions || []).filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchCat = t.category.toLowerCase().includes(q);
      const matchAcc = t.source_account.toLowerCase().includes(q);
      if (!matchDesc && !matchCat && !matchAcc) return false;
    }
    return true;
  });

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
                FIN-02
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Buku Kas & Transaksi
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Jurnal mutasi kas masuk, pengeluaran realisasi pos kegiatan, dan transfer antar akun bank organisasi.
            </p>
          </div>

          <Link
            href="/organization/finance/transactions/form?mode=create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Transaksi (FIN-03)</span>
          </Link>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari uraian transaksi, kategori, atau akun sumber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Tipe</option>
              <option value="income">Pemasukan (Income)</option>
              <option value="expense">Pengeluaran (Expense)</option>
              <option value="transfer">Transfer Antar Akun</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Kategori</option>
              <option value="Kas Operasional">Kas Operasional</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Tiket Event">Tiket Event</option>
              <option value="Media Partner">Media Partner</option>
              <option value="Termin Proker">Termin Proker</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Tanggal & Uraian</th>
                  <th className="py-3.5 px-4">Tipe & Kategori</th>
                  <th className="py-3.5 px-4">Akun Sumber / Tujuan</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Nominal</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada transaksi yang cocok.
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-mono text-[11px] text-wine-500">{t.date}</span>
                        <p className="font-bold text-wine-950 font-display text-sm">{t.description}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.type === "income"
                              ? "bg-emerald-100 text-emerald-800"
                              : t.type === "expense"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {t.type === "income" ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : t.type === "expense" ? (
                            <TrendingDown className="w-3 h-3" />
                          ) : (
                            <ArrowRightLeft className="w-3 h-3" />
                          )}
                          {t.type}
                        </span>
                        <p className="text-[11px] text-wine-600 mt-0.5">{t.category}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="font-medium text-wine-900">{t.source_account}</span>
                        {t.destination_account && (
                          <span className="text-wine-500"> → {t.destination_account}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.status === "posted"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                        <span
                          className={
                            t.type === "income"
                              ? "text-emerald-700"
                              : t.type === "expense"
                              ? "text-rose-700"
                              : "text-blue-700"
                          }
                        >
                          {t.type === "income" ? "+" : t.type === "expense" ? "-" : ""} Rp{" "}
                          {t.amount.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/finance/transactions/form?mode=edit&recordId=${t.id}`}
                          className="px-2.5 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
