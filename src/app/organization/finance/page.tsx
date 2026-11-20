"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  CreateFundRequestModal,
  RecordTransactionModal,
  FundRequestDetailModal,
} from "@/components/organization/finance-modals";
import { FundRequest } from "@/types/domain";
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  Layers,
  ClipboardList,
  Receipt,
  Banknote,
  Paperclip,
} from "lucide-react";

type FinanceTab = "units" | "requests" | "ledger";

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

export default function FinanceMultiUnitPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [activeTab, setActiveTab] = useState<FinanceTab>("requests");
  const [filterField, setFilterField] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FundRequest | null>(null);

  const transactions = store.finance_transactions || [];
  const fundRequests = store.fund_requests || [];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const pendingFunds = fundRequests.filter(
    (f) => f.status === "submitted" || f.status === "in_review"
  );

  const ticketAndMedpartRevenue =
    store.reservations
      .filter((r) => r.payment_status === "approved" || r.payment_status === "paid")
      .reduce((acc, r) => acc + (r.amount || 0), 0) +
    (store.medpart_submissions || [])
      .filter((m) => m.package_type === "Berbayar" && m.status !== "rejected")
      .reduce((acc, m) => acc + (m.amount || 0), 0);

  const filteredRequests = fundRequests.filter((f) => {
    const proj = f.project_id ? store.projects.find((p) => p.id === f.project_id) : null;
    if (filterField && proj?.field_id !== filterField) return false;
    if (filterStatus && f.status !== filterStatus) return false;
    return true;
  });

  const fieldAbsorption = store.fields.map((field) => {
    const fProjs = store.projects.filter((p) => p.field_id === field.id);
    const fProjIds = fProjs.map((p) => p.id);
    const fRequests = fundRequests.filter((r) => r.project_id && fProjIds.includes(r.project_id));
    const totalRequested = fRequests.reduce((acc, r) => acc + r.requested_amount, 0);
    const totalDisbursed = fRequests
      .filter((r) => ["fully_disbursed", "settled", "partially_disbursed"].includes(r.status))
      .reduce((acc, r) => acc + (r.approved_amount || r.requested_amount), 0);
    return {
      field,
      prokerCount: fProjs.length,
      requestCount: fRequests.length,
      totalRequested,
      totalDisbursed,
    };
  });

  // Bendum & Project Managers / Staff Finance can record transactions (per front_end.md line 5123!)
  const canRecordTransaction =
    permissions.isBendum ||
    permissions.managedProjectIds.length > 0 ||
    permissions.canCreateFundRequest;

  const tabs: { id: FinanceTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "units", label: "Serapan per Bidang", icon: Layers },
    { id: "requests", label: `Pengajuan RAB (${fundRequests.length})`, icon: ClipboardList },
    { id: "ledger", label: `Buku Kas (${transactions.length})`, icon: Receipt },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Kebendaharaan, Bukti Transaksi &amp; Transparansi Kas
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Keuangan &amp; Kas Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Pantau saldo kas kabinet, serapan per bidang, pengajuan RAB &amp; pencairan dengan bukti transfer, serta buku kas dengan bukti transaksi wajib.
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

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Saldo Kas Kabinet", val: `Rp ${(netBalance / 1_000_000).toFixed(1)} Jt`, sub: "Saldo bersih saat ini", icon: Wallet, tone: "bg-emerald-500/12 text-emerald-700" },
          { label: "Total Dana Terserap", val: `Rp ${(totalExpense / 1_000_000).toFixed(1)} Jt`, sub: "Pengeluaran unit & proker", icon: TrendingUp, tone: "bg-brand-burgundy/10 text-brand-burgundy" },
          { label: "RAB Menunggu Review", val: pendingFunds.length, sub: "Antrean Bendahara Umum", icon: Clock, tone: "bg-amber-500/12 text-amber-700" },
          { label: "Tiket & Medpart", val: `Rp ${(ticketAndMedpartRevenue / 1_000_000).toFixed(1)} Jt`, sub: "Pendapatan terverifikasi", icon: Receipt, tone: "bg-[#E8B577]/25 text-[#8A5A2B]" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 pb-2">
                <span className="text-[11px] font-semibold text-neutral-dark">{k.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${k.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <strong className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-wine-950 leading-none block truncate">
                  {k.val}
                </strong>
                <span className="text-[11px] text-neutral-light mt-1 block">{k.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Sliding Tabs */}
      <div className="p-1.5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm inline-flex flex-wrap gap-1 w-full sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                active ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="finance-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SERAPAN PER BIDANG */}
      {activeTab === "units" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fieldAbsorption.map(
            ({ field, prokerCount, requestCount, totalRequested, totalDisbursed }) => (
              <div
                key={field.id}
                className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                    {field.code}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-dark">
                    {prokerCount} Proker • {requestCount} RAB
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-wine-950">{field.name}</h3>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E9E1DC] text-xs">
                  <div className="p-3 rounded-2xl bg-[#FCF8F6]">
                    <span className="text-[10px] text-neutral-light block">Total Diajukan</span>
                    <strong className="font-mono text-wine-950">
                      Rp {totalRequested.toLocaleString("id-ID")}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FCF8F6]">
                    <span className="text-[10px] text-neutral-light block">Sudah Cair</span>
                    <strong className="font-mono text-emerald-700">
                      Rp {totalDisbursed.toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* TAB 2: PENGAJUAN RAB & PENCAIRAN */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-wine-950"
            >
              <option value="">Semua Bidang</option>
              {store.fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-wine-950"
            >
              <option value="">Semua Status</option>
              <option value="submitted">Menunggu Review</option>
              <option value="approved">Disetujui (Siap Cair)</option>
              <option value="fully_disbursed">Sudah Ditransfer</option>
              <option value="settled">Settled</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredRequests.map((req) => {
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
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BUKU KAS & TRANSAKSI (With Proof Attachment Pill!) */}
      {activeTab === "ledger" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-light">{tx.date}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E9E1DC] text-neutral-dark">
                    {tx.category}
                  </span>
                  {tx.proof_file_name && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                      <Paperclip className="w-3 h-3" />
                      {tx.proof_file_name}
                    </span>
                  )}
                </div>
                <strong className="text-sm text-wine-950 block truncate">{tx.description}</strong>
              </div>
              <strong
                className={`font-mono text-sm shrink-0 ${
                  tx.type === "income" ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}Rp {tx.amount.toLocaleString("id-ID")}
              </strong>
            </div>
          ))}
        </div>
      )}

      {/* Centralized Modals */}
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
