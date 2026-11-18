"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { FundRequest } from "@/types/domain";
import {
  DollarSign,
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  Send,
  Link2,
  CheckCircle2,
  Info
} from "lucide-react";

function FundRequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore, currentUser } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const existing = recordId ? store.fund_requests.find((r) => r.id === recordId) : null;

  const [formData, setFormData] = useState({
    purpose: existing?.purpose || "",
    unit_name: existing?.unit_name || "Kepanitiaan HIPMI Business Expo 2026",
    project_id: existing?.project_id || (store.projects[0]?.id || ""),
    proposal_url: existing?.proposal_url || "https://docs.google.com/spreadsheets/d/rab-anggaran-demo",
  });

  const [items, setItems] = useState<{ description: string; amount: number }[]>(
    existing?.items || [
      { description: "Sewa Sound System & Lighting Panggung Utama", amount: 1500000 },
      { description: "Konsumsi Pembicara & Tamu Undangan (25 Pax)", amount: 750000 },
    ]
  );

  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const addItemRow = () => {
    setItems([...items, { description: "", amount: 100000 }]);
  };

  const removeItemRow = (idx: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: "description" | "amount", value: any) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
  };

  const handleSubmit = (actionStatus: "draft" | "submitted") => {
    if (!formData.purpose) {
      alert("Mohon isi tujuan pengajuan dana.");
      return;
    }

    if (existing) {
      const updated = store.fund_requests.map((r) =>
        r.id === existing.id
          ? {
              ...r,
              ...formData,
              requested_amount: totalAmount,
              items,
              status: actionStatus,
              updated_at: new Date().toISOString(),
            }
          : r
      );
      updateStore({ fund_requests: updated });
    } else {
      const newRequest: FundRequest = {
        id: `fund-${Date.now()}`,
        cabinet_id: activeCab.id,
        submitter_user_id: currentUser?.id || "usr-demo-01",
        submitter_name: currentUser?.full_name || "Pengaju Anggaran Demo",
        unit_name: formData.unit_name,
        project_id: formData.project_id || undefined,
        purpose: formData.purpose,
        requested_amount: totalAmount,
        items,
        proposal_url: formData.proposal_url,
        status: actionStatus,
        tranches: [
          {
            tranche_number: 1,
            amount: Math.round(totalAmount * 0.7),
            disbursement_status: "pending",
          },
          {
            tranche_number: 2,
            amount: Math.round(totalAmount * 0.3),
            disbursement_status: "pending",
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      updateStore({
        fund_requests: [newRequest, ...store.fund_requests],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            category: "finance",
            title: `Pengajuan Dana Masuk: Rp ${totalAmount.toLocaleString("id-ID")}`,
            message: `${newRequest.submitter_name} (${formData.unit_name}) telah mengajukan anggaran untuk direview Bendum.`,
            source_route: `/organization/finance/requests/${newRequest.id}`,
            read: false,
            created_at: new Date().toISOString()
          },
          ...store.notifications
        ]
      });
    }

    setStatusNotice(
      actionStatus === "submitted"
        ? "Pengajuan dana berhasil disubmit langsung ke Bendahara Umum! Mengalihkan..."
        : "Draft pengajuan dana berhasil disimpan!"
    );

    setTimeout(() => {
      router.push("/organization/finance/requests");
    }, 1200);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/finance/requests"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Pengajuan Dana
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-05
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Pengajuan Dana" : "Form Pengajuan Anggaran & RAB"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengajuan pencairan anggaran kegiatan dengan rincian pos RAB langsung ke Bendahara Umum.
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

        {/* Direct submit to Bendum notice */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Kewenangan Direct Submit Bendum</p>
            <p className="text-amber-800 text-xs mt-0.5">
              Sesuai aturan PRD v1.1, staf berizin dapat mengajukan proposal anggaran langsung ke Bendahara Umum tanpa persetujuan bertingkat tambahan dari Ketua Kompartemen.
            </p>
          </div>
        </div>

        {statusNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusNotice}</span>
          </div>
        )}

        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Tujuan / Nama Kegiatan Pengajuan Dana *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pengadaan Logistik & Panggung HIPMI Business Expo 2026"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Unit Pengaju *
              </label>
              <input
                type="text"
                required
                value={formData.unit_name}
                onChange={(e) => setFormData({ ...formData, unit_name: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Tautkan ke Program Kerja
              </label>
              <select
                value={formData.project_id}
                onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="">(Pengajuan Operasional Umum - Tanpa Proker)</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              URL Tautan Proposal / Dokumen RAB (Spreadsheet / Drive) *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={formData.proposal_url}
                onChange={(e) => setFormData({ ...formData, proposal_url: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-sm text-wine-900"
              />
            </div>
          </div>

          {/* Itemized Budget Breakdown Table */}
          <div className="p-4 rounded-xl bg-surface-base border border-wine-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-wine-950">
                Rincian Item Anggaran Kebutuhan (RAB)
              </h3>
              <button
                type="button"
                onClick={addItemRow}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Baris Item
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Uraian kebutuhan / item biaya..."
                    value={item.description}
                    onChange={(e) => updateItem(idx, "description", e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-900"
                  />
                  <div className="w-36 relative">
                    <span className="text-[10px] text-wine-400 absolute left-2.5 top-2.5">Rp</span>
                    <input
                      type="number"
                      required
                      min={0}
                      step={1000}
                      value={item.amount}
                      onChange={(e) => updateItem(idx, "amount", Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-wine-200 bg-white text-xs font-mono font-bold text-wine-900 text-right"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    disabled={items.length <= 1}
                    className="p-2 rounded-lg text-wine-400 hover:text-rose-600 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total calculation row */}
            <div className="pt-3 border-t border-wine-200 flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="text-wine-800">Total Anggaran Diajukan:</span>
              <span className="font-mono text-base text-brand-burgundy">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-wine-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="px-4 py-2.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("submitted")}
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              Submit Langsung ke Bendum
            </button>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}

export default function FundRequestFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir pengajuan dana...</div>}>
      <FundRequestFormContent />
    </Suspense>
  );
}
