"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  DollarSign,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Building,
  User,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";

export default function FundRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = use(params);
  const router = useRouter();
  const { store, updateStore, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const request = store.fund_requests.find((r) => r.id === requestId);

  const [approvedAmount, setApprovedAmount] = useState<number>(
    request?.approved_amount || request?.requested_amount || 0
  );
  const [reviewerNotes, setReviewerNotes] = useState(request?.reviewer_notes || "");
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  if (!request) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Pengajuan Dana Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{requestId}" tidak terdaftar dalam catatan bendahara.</p>
          <Link
            href="/organization/finance/requests"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleApprove = () => {
    if (approvedAmount <= 0) {
      alert("Nominal yang disetujui harus lebih besar dari 0.");
      return;
    }

    const updatedRequests = store.fund_requests.map((r) =>
      r.id === request.id
        ? {
            ...r,
            status: "approved" as const,
            approved_amount: approvedAmount,
            reviewer_notes: reviewerNotes,
            updated_at: new Date().toISOString(),
          }
        : r
    );

    updateStore({
      fund_requests: updatedRequests,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "finance",
          title: `Pengajuan Dana Disetujui: Rp ${approvedAmount.toLocaleString("id-ID")}`,
          message: `Pengajuan "${request.purpose}" telah disetujui Bendum sebesar Rp ${approvedAmount.toLocaleString("id-ID")}.`,
          source_route: `/organization/finance/requests/${request.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setFeedbackNotice("Pengajuan dana berhasil disetujui! Anda dapat mengelola pencairan termin pada modul FIN-07.");
  };

  const handleReject = () => {
    if (!reviewerNotes) {
      alert("Catatan alasan penolakan wajib disertakan.");
      return;
    }

    const updatedRequests = store.fund_requests.map((r) =>
      r.id === request.id
        ? {
            ...r,
            status: "rejected" as const,
            reviewer_notes: reviewerNotes,
            updated_at: new Date().toISOString(),
          }
        : r
    );

    updateStore({
      fund_requests: updatedRequests,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "finance",
          title: `Pengajuan Dana Ditolak: ${request.purpose}`,
          message: `Catatan Bendum: "${reviewerNotes}"`,
          source_route: `/organization/finance/requests/${request.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setFeedbackNotice("Pengajuan dana telah ditolak dan catatan dikirimkan ke pengaju.");
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/finance/requests"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Pengajuan Dana
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              FIN-06
            </span>
          </div>

          <Link
            href={`/organization/finance/requests/form?mode=edit&recordId=${request.id}`}
            className="px-3 py-1.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
          >
            Edit Form
          </Link>
        </div>

        {feedbackNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackNotice}</span>
          </div>
        )}

        {/* Card Details */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wine-100 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  request.status === "approved" || request.status === "fully_disbursed"
                    ? "bg-emerald-100 text-emerald-800"
                    : request.status === "rejected"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {request.status.replace(/_/g, " ")}
              </span>

              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                {request.unit_name}
              </span>
            </div>

            <div className="text-xs text-wine-500 font-mono">
              Diajukan: {new Date(request.created_at).toLocaleDateString("id-ID")}
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-wine-950">
              {request.purpose}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengaju: <span className="font-semibold text-wine-900">{request.submitter_name}</span>
            </p>
          </div>

          {/* Amount Overview Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-surface-base border border-wine-100">
            <div>
              <span className="text-xs text-wine-500 font-medium">Nominal Anggaran Diajukan:</span>
              <p className="text-2xl font-bold font-mono text-wine-900 mt-1">
                Rp {request.requested_amount.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <span className="text-xs text-wine-500 font-medium">Nominal Disetujui Bendum:</span>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                {request.approved_amount
                  ? `Rp ${request.approved_amount.toLocaleString("id-ID")}`
                  : "(Menunggu Persetujuan)"}
              </p>
            </div>
          </div>

          {/* Proposal Link */}
          <div className="text-xs">
            <span className="text-wine-500">Berkas Proposal / RAB:</span>
            <p className="mt-1">
              <a
                href={request.proposal_url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" /> Buka Lembar RAB Online (Spreadsheet)
              </a>
            </p>
          </div>

          {/* Itemized Budget Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-wine-950">
              Rincian Pos Kebutuhan Biaya (RAB)
            </h3>
            <div className="bg-white rounded-xl border border-wine-100 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                  <tr>
                    <th className="py-2.5 px-4">No</th>
                    <th className="py-2.5 px-4">Uraian Kebutuhan</th>
                    <th className="py-2.5 px-4 text-right">Alokasi Biaya</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wine-50 text-wine-800">
                  {request.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-base">
                      <td className="py-2.5 px-4 text-wine-400 font-mono">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-medium text-wine-900">{item.description}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-wine-900">
                        Rp {item.amount.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-wine-50/30 font-bold border-t border-wine-200">
                    <td colSpan={2} className="py-3 px-4 text-wine-900">Total Keseluruhan</td>
                    <td className="py-3 px-4 text-right font-mono text-brand-burgundy text-sm">
                      Rp {request.requested_amount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bendum Review & Approval Action Desk */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Desk Persetujuan Bendahara Umum
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-wine-900 uppercase">
                  Nominal Disetujui (Rupiah) *
                </label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(Number(e.target.value))}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-wine-200 bg-white font-mono font-bold text-wine-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-wine-900 uppercase">
                  Catatan / Rekomendasi Bendum
                </label>
                <input
                  type="text"
                  placeholder="Catatan penyesuaian pos atau persetujuan..."
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-wine-200 bg-white text-wine-900"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all"
              >
                Tolak Pengajuan
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Setujui Anggaran Ini
              </button>

              {request.status === "approved" && (
                <Link
                  href="/organization/finance/disbursements"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <DollarSign className="w-4 h-4" /> Kelola Pencairan Termin (FIN-07)
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
