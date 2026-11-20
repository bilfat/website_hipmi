"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  CreateFundRequestModal,
  RecordTransactionModal,
  FundRequestDetailModal,
} from "@/components/organization/finance-modals";
import { FundRequest } from "@/types/domain";
import {
  ChevronLeft,
  Plus,
  Banknote,
  CheckCircle2,
  Paperclip,
} from "lucide-react";

export default function UnitFinancePage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<FundRequest | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const field = store.fields.find((f) => f.id === unitId);
  const compartment = store.compartments.find((c) => c.id === unitId);
  const project = store.projects.find((p) => p.id === unitId);
  const unitName = project
    ? project.name
    : compartment
    ? compartment.name
    : field
    ? field.name
    : "Unit Organisasi";

  const unitTransactions = (store.finance_transactions || []).filter(
    (t) =>
      t.project_id === unitId ||
      t.unit_id === unitId ||
      t.description.toLowerCase().includes(unitName.toLowerCase()) ||
      t.category.toLowerCase().includes(unitName.toLowerCase())
  );

  const unitFundRequests = (store.fund_requests || []).filter(
    (r) =>
      r.project_id === unitId ||
      r.unit_name.toLowerCase().includes(unitName.toLowerCase())
  );

  const totalDisbursed = unitFundRequests
    .filter((r) =>
      ["approved", "partially_disbursed", "fully_disbursed", "settled"].includes(r.status)
    )
    .reduce((sum, r) => sum + (r.approved_amount || r.requested_amount), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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
              • Buku Kas Unit
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Keuangan Unit: {unitName}
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Ringkasan alokasi dana, pengajuan RAB, dan mutasi kas beserta bukti transaksi untuk lingkup {unitName}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {permissions.canCreateFundRequest && (
            <button
              type="button"
              onClick={() => setFundModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajukan Dana (RAB)</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setTxModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Banknote className="w-3.5 h-3.5 text-emerald-700" />
            <span>Catat Transaksi</span>
          </button>
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

      {/* Aggregate KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Total Anggaran Disetujui
          </span>
          <strong className="font-mono text-lg sm:text-xl font-bold text-emerald-700 mt-1 block">
            Rp {totalDisbursed.toLocaleString("id-ID")}
          </strong>
          <span className="text-[11px] text-neutral-dark">
            {unitFundRequests.length} pengajuan RAB
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Transaksi Kas Terkait
          </span>
          <strong className="font-mono text-lg sm:text-xl font-bold text-wine-950 mt-1 block">
            {unitTransactions.length} Transaksi
          </strong>
          <span className="text-[11px] text-neutral-dark">Mutasi kas dengan bukti</span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-neutral-light block">
            Sinkronisasi Bendum
          </span>
          <strong className="font-serif text-lg sm:text-xl font-bold text-brand-burgundy mt-1 block">
            Aktif Terpantau
          </strong>
          <span className="text-[11px] text-neutral-dark">Terhubung ke Kas Sentral</span>
        </div>
      </div>

      {/* RAB Requests */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Pengajuan RAB {unitName} ({unitFundRequests.length})
        </h2>
        {unitFundRequests.length > 0 ? (
          <div className="space-y-2.5">
            {unitFundRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedFund(req)}
                className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950">
                      {req.status}
                    </span>
                    <span className="font-mono font-bold text-brand-burgundy">
                      Rp {req.requested_amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <strong className="font-serif text-sm text-wine-950 block">
                    {req.purpose}
                  </strong>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold self-start sm:self-center">
                  Rincian
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
            Belum ada pengajuan RAB untuk unit ini.
          </p>
        )}
      </div>

      {/* Transactions */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Jurnal Mutasi Kas Khusus {unitName}
        </h2>

        {unitTransactions.length > 0 ? (
          <div className="space-y-2.5">
            {unitTransactions.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-neutral-light">{t.date}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950">
                      {t.category}
                    </span>
                    {t.proof_file_name && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Paperclip className="w-3 h-3" />
                        <span>{t.proof_file_name}</span>
                      </span>
                    )}
                  </div>
                  <strong className="text-wine-950 block">{t.description}</strong>
                </div>
                <span
                  className={`font-mono font-bold text-sm shrink-0 ${
                    t.type === "income" ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
            Belum ada transaksi kas spesifik yang dicatat untuk unit ini.
          </p>
        )}
      </div>

      {/* Modals */}
      <CreateFundRequestModal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        store={store}
        currentUser={currentUser}
        defaultUnitName={unitName}
        lockedProjectId={project?.id}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <RecordTransactionModal
        isOpen={txModalOpen}
        onClose={() => setTxModalOpen(false)}
        store={store}
        currentUser={currentUser}
        lockedProjectId={project?.id}
        sourceAccountLabel={`Kas Unit: ${unitName}`}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <FundRequestDetailModal
        request={selectedFund}
        onClose={() => setSelectedFund(null)}
        store={store}
        currentUser={currentUser}
        isBendum={permissions.isBendum}
        canConfirmReceipt={
          !!selectedFund &&
          (selectedFund.submitter_user_id === currentUser.id || permissions.isKakom)
        }
        onUpdated={(msg) => setFeedback(msg)}
      />
    </div>
  );
}
