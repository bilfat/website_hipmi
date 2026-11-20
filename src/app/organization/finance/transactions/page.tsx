"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { RecordTransactionModal } from "@/components/organization/finance-modals";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { FinanceTransaction } from "@/types/domain";
import {
  Search,
  Plus,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  CheckCircle2,
  Paperclip,
  FileImage,
} from "lucide-react";

export default function FinanceTransactionsPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<FinanceTransaction | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const canRecordTransaction =
    permissions.isBendum ||
    permissions.managedProjectIds.length > 0 ||
    permissions.canCreateFundRequest;

  const transactions = (store.finance_transactions || []).filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchCat = t.category.toLowerCase().includes(q);
      const matchAcc = t.source_account.toLowerCase().includes(q);
      if (!matchDesc && !matchCat && !matchAcc) return false;
    }
    return true;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/finance"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Keuangan</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Buku Kas &amp; Jurnal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Buku Kas &amp; Transaksi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Jurnal mutasi pemasukan dan pengeluaran organisasi maupun proker. Setiap transaksi wajib disertai bukti struk/mutasi yang dapat diperiksa kapan saja.
          </p>
        </div>

        {canRecordTransaction && (
          <button
            type="button"
            onClick={() => setTxModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Transaksi</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Quick Summary KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Total Pemasukan
          </span>
          <strong className="font-mono text-lg sm:text-xl font-bold text-emerald-700 mt-1 block">
            + Rp {totalIncome.toLocaleString("id-ID")}
          </strong>
        </div>
        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Total Pengeluaran
          </span>
          <strong className="font-mono text-lg sm:text-xl font-bold text-rose-700 mt-1 block">
            - Rp {totalExpense.toLocaleString("id-ID")}
          </strong>
        </div>
        <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Jumlah Entri Jurnal
          </span>
          <strong className="font-mono text-lg sm:text-xl font-bold text-wine-950 mt-1 block">
            {transactions.length} Transaksi
          </strong>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari uraian transaksi, kategori, atau akun kas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Jenis</option>
          <option value="income">Pemasukan (+)</option>
          <option value="expense">Pengeluaran (-)</option>
          <option value="transfer">Transfer Antar Akun</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((t) => {
            const isIncome = t.type === "income";
            const isExpense = t.type === "expense";
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTx(t)}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isExpense
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-sky-50 text-sky-700 border border-sky-200"
                    }`}
                  >
                    {isIncome ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : isExpense ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <ArrowRightLeft className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono text-neutral-light">{t.date}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950">
                        {t.category}
                      </span>
                      {t.proof_file_name && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Paperclip className="w-3 h-3" />
                          <span className="truncate max-w-[160px]">{t.proof_file_name}</span>
                        </span>
                      )}
                    </div>
                    <strong className="font-serif text-base text-wine-950 block">
                      {t.description}
                    </strong>
                    <span className="text-[11px] font-mono text-neutral-dark block">
                      {t.source_account}
                      {t.destination_account ? ` → ${t.destination_account}` : ""}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span
                    className={`font-mono font-bold text-base block ${
                      isIncome
                        ? "text-emerald-700"
                        : isExpense
                        ? "text-rose-700"
                        : "text-sky-700"
                    }`}
                  >
                    {isIncome ? "+" : isExpense ? "-" : ""} Rp {t.amount.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-neutral-light">
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Tidak ada transaksi yang cocok dengan filter ini.
          </div>
        )}
      </div>

      {/* Record Transaction Modal (Mandatory Proof Upload) */}
      <RecordTransactionModal
        isOpen={txModalOpen}
        onClose={() => setTxModalOpen(false)}
        store={store}
        currentUser={currentUser}
        onSuccess={(msg) => setFeedback(msg)}
      />

      {/* Transaction & Proof Detail Modal */}
      <EditorialModal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        badge={selectedTx?.type === "income" ? "Pemasukan Kas" : "Pengeluaran Kas"}
        title={selectedTx?.description || "Detail Transaksi"}
        subtitle={`${selectedTx?.category || "-"} • ${selectedTx?.date || "-"}`}
        maxWidth="md"
        footer={
          <button
            type="button"
            onClick={() => setSelectedTx(null)}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Tutup
          </button>
        }
      >
        {selectedTx && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Nominal
                </span>
                <strong
                  className={`font-mono text-base ${
                    selectedTx.type === "income" ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {selectedTx.type === "income" ? "+" : "-"} Rp{" "}
                  {selectedTx.amount.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Akun Kas
                </span>
                <strong className="text-wine-950">{selectedTx.source_account}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
              <strong className="text-wine-950 flex items-center gap-1.5">
                <FileImage className="w-4 h-4 text-brand-burgundy" />
                <span>Lampiran Bukti Transaksi</span>
              </strong>
              {selectedTx.proof_file_name ? (
                <div className="space-y-2.5">
                  <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium inline-flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{selectedTx.proof_file_name}</span>
                  </div>
                  {selectedTx.proof_preview_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedTx.proof_preview_url}
                      alt={selectedTx.proof_file_name}
                      className="w-full max-h-64 object-contain rounded-xl border border-[#E9E1DC] bg-white"
                    />
                  )}
                </div>
              ) : (
                <p className="text-neutral-dark">
                  Transaksi awal sistem (belum ada lampiran unggahan baru).
                </p>
              )}
            </div>
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
