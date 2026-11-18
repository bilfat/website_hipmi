"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { DisbursementStatus } from "@/types/domain";
import {
  DollarSign,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Send,
  Building,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function FinanceDisbursementsPage() {
  const { store, updateStore, currentUser } = useMockStore();

  const approvedRequests = store.fund_requests.filter(
    (r) =>
      r.status === "approved" ||
      r.status === "partially_disbursed" ||
      r.status === "fully_disbursed"
  );

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleTransferTranche = (requestId: string, trancheIndex: number) => {
    const request = store.fund_requests.find((r) => r.id === requestId);
    if (!request) return;

    const updatedTranches = [...request.tranches];
    const tranche = updatedTranches[trancheIndex];
    tranche.disbursement_status = "transferred";
    tranche.transferred_at = new Date().toISOString();

    const allTransferred = updatedTranches.every(
      (t) => t.disbursement_status === "transferred" || t.disbursement_status === "confirmed"
    );

    const updatedRequests = store.fund_requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            tranches: updatedTranches,
            status: allTransferred ? ("partially_disbursed" as const) : r.status,
            updated_at: new Date().toISOString(),
          }
        : r
    );

    // Also automatically post expense transaction in general ledger
    const newTx = {
      id: `tx-disb-${Date.now()}`,
      cabinet_id: request.cabinet_id,
      date: new Date().toISOString().split("T")[0],
      type: "expense" as const,
      category: "Termin Proker",
      amount: tranche.amount,
      description: `Pencairan Termin #${tranche.tranche_number} - ${request.purpose}`,
      source_account: "Bank Mandiri HIPMI (131-00-998822-1)",
      status: "posted" as const,
      reference_id: `DISB-${requestId.slice(-4)}-T${tranche.tranche_number}`,
    };

    updateStore({
      fund_requests: updatedRequests,
      finance_transactions: [newTx, ...store.finance_transactions],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "finance",
          title: `Dana Dicairkan Bendum: Rp ${tranche.amount.toLocaleString("id-ID")}`,
          message: `Pencairan termin #${tranche.tranche_number} untuk "${request.purpose}" telah ditransfer. Mohon unit terkait konfirmasi penerimaan.`,
          source_route: `/organization/finance/disbursements`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setActionNotice(
      `Pencairan Termin #${tranche.tranche_number} sebesar Rp ${tranche.amount.toLocaleString("id-ID")} berhasil dibukukan!`
    );
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleConfirmReceipt = (requestId: string, trancheIndex: number) => {
    const request = store.fund_requests.find((r) => r.id === requestId);
    if (!request) return;

    const updatedTranches = [...request.tranches];
    const tranche = updatedTranches[trancheIndex];
    tranche.disbursement_status = "confirmed";
    tranche.confirmed_at = new Date().toISOString();

    const allConfirmed = updatedTranches.every((t) => t.disbursement_status === "confirmed");

    const updatedRequests = store.fund_requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            tranches: updatedTranches,
            status: allConfirmed ? ("fully_disbursed" as const) : ("partially_disbursed" as const),
            updated_at: new Date().toISOString(),
          }
        : r
    );

    updateStore({ fund_requests: updatedRequests });
    setActionNotice(
      `Penerimaan dana termin #${tranche.tranche_number} telah dikonfirmasi oleh panitia pelaksana!`
    );
    setTimeout(() => setActionNotice(null), 4000);
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
                FIN-07
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Pencairan & Penerimaan Dana (Disbursements)
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Tata kelola pencairan bertahap per termin, pencatatan bukti transfer, dan konfirmasi tanda terima oleh unit pelaksana.
            </p>
          </div>

          <Link
            href="/organization/finance/transactions"
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            Lihat Kas Keluar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Requests & Tranches List */}
        <div className="space-y-4">
          {approvedRequests.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 text-wine-500 text-xs">
              Belum ada pengajuan dana yang disetujui untuk dicairkan.
            </div>
          ) : (
            approvedRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-wine-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          req.status === "fully_disbursed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {req.status.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs font-medium text-wine-600">{req.unit_name}</span>
                    </div>
                    <h3 className="font-bold text-wine-950 font-display text-base">
                      {req.purpose}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-wine-500">Total Anggaran Disetujui:</span>
                    <p className="font-mono font-bold text-base text-brand-burgundy">
                      Rp {(req.approved_amount || req.requested_amount).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Tranches Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {req.tranches.map((tranche, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-wine-100 bg-surface-base space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-wine-900">
                          Termin #{tranche.tranche_number}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            tranche.disbursement_status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : tranche.disbursement_status === "transferred"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tranche.disbursement_status}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-wine-500">Nominal Termin:</span>
                        <span className="font-mono font-bold text-sm text-wine-900">
                          Rp {tranche.amount.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="text-[11px] text-wine-500 space-y-0.5 pt-1 border-t border-wine-100">
                        <p>
                          Transfer: {tranche.transferred_at ? new Date(tranche.transferred_at).toLocaleDateString("id-ID") : "Belum"}
                        </p>
                        <p>
                          Diterima: {tranche.confirmed_at ? new Date(tranche.confirmed_at).toLocaleDateString("id-ID") : "Belum Konfirmasi"}
                        </p>
                      </div>

                      {/* Action buttons per tranche */}
                      <div className="pt-2 flex items-center justify-end gap-2">
                        {tranche.disbursement_status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleTransferTranche(req.id, idx)}
                            className="w-full py-1.5 rounded-lg bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                            Transfer Termin (Bendum)
                          </button>
                        )}

                        {tranche.disbursement_status === "transferred" && (
                          <button
                            type="button"
                            onClick={() => handleConfirmReceipt(req.id, idx)}
                            className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Konfirmasi Dana Diterima (Unit)
                          </button>
                        )}

                        {tranche.disbursement_status === "confirmed" && (
                          <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1 py-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Tuntas & Dikonfirmasi
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </OrganizationShell>
  );
}
