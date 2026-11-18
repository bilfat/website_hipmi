"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { FinanceTransaction } from "@/types/domain";
import {
  DollarSign,
  ChevronLeft,
  Save,
  CheckCircle2,
  Calendar,
  Wallet,
  Tag
} from "lucide-react";

function FinanceTransactionFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const existing = recordId ? store.finance_transactions.find((t) => t.id === recordId) : null;

  const [formData, setFormData] = useState({
    date: existing?.date || new Date().toISOString().split("T")[0],
    type: existing?.type || "expense",
    category: existing?.category || "Kas Operasional",
    amount: existing?.amount || 500000,
    description: existing?.description || "",
    source_account: existing?.source_account || "Bank Mandiri HIPMI (131-00-998822-1)",
    destination_account: existing?.destination_account || "",
    status: (existing?.status as "draft" | "posted") || "posted",
    reference_id: existing?.reference_id || `REF-${Date.now().toString().slice(-6)}`,
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existing) {
      const updated = store.finance_transactions.map((t) =>
        t.id === existing.id
          ? {
              ...t,
              ...formData,
              amount: Number(formData.amount),
            }
          : t
      );
      updateStore({ finance_transactions: updated });
    } else {
      const newTx: FinanceTransaction = {
        id: `tx-${Date.now()}`,
        cabinet_id: activeCab.id,
        date: formData.date,
        type: formData.type as "income" | "expense" | "transfer",
        category: formData.category,
        amount: Number(formData.amount),
        description: formData.description,
        source_account: formData.source_account,
        destination_account: formData.destination_account || undefined,
        status: formData.status as "draft" | "posted",
        reference_id: formData.reference_id,
      };

      updateStore({
        finance_transactions: [newTx, ...store.finance_transactions],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            category: "finance",
            title: `Transaksi Dicatat: Rp ${newTx.amount.toLocaleString("id-ID")}`,
            message: `${newTx.description} (${newTx.category}) telah dibukukan oleh Bendum.`,
            source_route: `/organization/finance/transactions`,
            read: false,
            created_at: new Date().toISOString()
          },
          ...store.notifications
        ]
      });
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/organization/finance/transactions");
    }, 1000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/finance/transactions"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Buku Kas
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-03
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Catatan Transaksi" : "Input Transaksi Kas"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pencatatan langsung jurnal kas masuk, pengeluaran, atau mutasi antar bank organisasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-semibold text-wine-600 hover:text-wine-900 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Batal
          </button>
        </div>

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Transaksi berhasil disimpan! Mengalihkan ke buku kas...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Tanggal Transaksi *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Jenis Transaksi *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" | "transfer" })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="expense">Pengeluaran (Expense)</option>
                <option value="income">Pemasukan (Income)</option>
                <option value="transfer">Transfer Antar Akun</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Nominal (Rupiah) *
              </label>
              <input
                type="number"
                required
                min={1000}
                step={1000}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Pos / Kategori Anggaran *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="Kas Operasional">Kas Operasional</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Tiket Event">Tiket Event</option>
                <option value="Media Partner">Media Partner</option>
                <option value="Termin Proker">Termin Proker</option>
                <option value="Konsumsi & Logistik">Konsumsi & Logistik</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Uraian / Keterangan Transaksi *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembelian banner & konsumsi pleno I Arthakarsa"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Akun Kas Sumber *
              </label>
              <input
                type="text"
                required
                value={formData.source_account}
                onChange={(e) => setFormData({ ...formData, source_account: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Status Pembukuan
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "posted" })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="posted">Posted (Tercatat di Saldo)</option>
                <option value="draft">Draft (Belum Mempengaruhi Saldo)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-wine-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}

export default function FinanceTransactionFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir transaksi...</div>}>
      <FinanceTransactionFormContent />
    </Suspense>
  );
}
