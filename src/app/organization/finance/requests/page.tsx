"use client";

import { useState } from "react";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  CreateFundRequestModal,
  RecordTransactionModal,
  FundRequestDetailModal,
} from "@/components/organization/finance-modals";
import { FundRequest } from "@/types/domain";
import { Search, Plus, CheckCircle2, Banknote } from "lucide-react";

const FUND_STATUS_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  submitted: { label: "Menunggu Review", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Diperiksa Bendum", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Disetujui (Siap Cair)", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  partially_disbursed: { label: "Cair Sebagian", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  fully_disbursed: { label: "Sudah Ditransfer", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  settled: { label: "Settled (Diterima)", tone: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  rejected: { label: "Ditolak", tone: "bg-red-50 text-red-700 border-red-200" },
};

export default function FundRequestsListPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FundRequest | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const requests = (store.fund_requests || []).filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !r.purpose.toLowerCase().includes(q) &&
        !r.submitter_name.toLowerCase().includes(q) &&
        !r.unit_name.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const canRecordTransaction =
    permissions.isBendum ||
    permissions.managedProjectIds.length > 0 ||
    permissions.canCreateFundRequest;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Kebendaharaan &amp; Pencairan Dana
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Pengajuan Dana (RAB) &amp; Pencairan
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Kelola permohonan RAB dari bidang, kompartemen, dan proker. Pencairan oleh Bendum dilengkapi bukti transfer dan dikonfirmasi kembali oleh unit penerima.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {permissions.canCreateFundRequest && (
            <button
              type="button"
              onClick={() => setReqModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajukan Dana (RAB)</span>
            </button>
          )}
          {canRecordTransaction && (
            <button
              type="button"
              onClick={() => setTxModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Banknote className="w-3.5 h-3.5 text-emerald-700" />
              <span>Catat Transaksi</span>
            </button>
          )}
        </div>
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

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari keperluan pengajuan, unit, atau nama pengaju..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status</option>
          <option value="submitted">Menunggu Review</option>
          <option value="approved">Disetujui (Siap Cair)</option>
          <option value="fully_disbursed">Sudah Ditransfer</option>
          <option value="settled">Settled</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.length > 0 ? (
          requests.map((req) => {
            const st = FUND_STATUS_MAP[req.status] || FUND_STATUS_MAP.submitted;
            return (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-brand-burgundy">
                      Rp {req.requested_amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">
                    {req.purpose}
                  </strong>
                  <span className="text-xs text-neutral-dark">
                    {req.unit_name} • Pengaju: {req.submitter_name}
                  </span>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950 shrink-0 self-start sm:self-center">
                  {permissions.isBendum ? "Review / Cairkan" : "Rincian"}
                </span>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Belum ada pengajuan dana yang cocok dengan filter ini.
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateFundRequestModal
        isOpen={reqModalOpen}
        onClose={() => setReqModalOpen(false)}
        store={store}
        currentUser={currentUser}
        defaultUnitName={permissions.roleScopeSubtitle}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <RecordTransactionModal
        isOpen={txModalOpen}
        onClose={() => setTxModalOpen(false)}
        store={store}
        currentUser={currentUser}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <FundRequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        store={store}
        currentUser={currentUser}
        isBendum={permissions.isBendum}
        canConfirmReceipt={
          !!selectedRequest &&
          (selectedRequest.submitter_user_id === currentUser.id || permissions.isKakom)
        }
        onUpdated={(msg) => setFeedback(msg)}
      />
    </div>
  );
}
