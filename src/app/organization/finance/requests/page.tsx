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
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";

export default function FundRequestsListPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const requests = (store.fund_requests || []).filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchPurpose = r.purpose.toLowerCase().includes(q);
      const matchSubmitter = r.submitter_name.toLowerCase().includes(q);
      const matchUnit = r.unit_name.toLowerCase().includes(q);
      if (!matchPurpose && !matchSubmitter && !matchUnit) return false;
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
                FIN-04
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Daftar Pengajuan Dana
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Proposal anggaran kegiatan dan permohonan dana proker dari bidang, kompartemen, atau panitia pelaksana.
            </p>
          </div>

          <Link
            href="/organization/finance/requests/form?mode=create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Dana (FIN-05)</span>
          </Link>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari perihal pengajuan, unit, atau nama pengaju..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Status</option>
            <option value="submitted">Submitted (Menunggu Review)</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved (Disetujui)</option>
            <option value="partially_disbursed">Partially Disbursed</option>
            <option value="fully_disbursed">Fully Disbursed (Tuntas)</option>
            <option value="rejected">Rejected (Ditolak)</option>
          </select>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Tujuan / Keperluan</th>
                  <th className="py-3.5 px-4">Unit / Pengaju</th>
                  <th className="py-3.5 px-4">Status Anggaran</th>
                  <th className="py-3.5 px-4 text-right">Nominal Diajukan</th>
                  <th className="py-3.5 px-4 text-right">Disetujui</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada pengajuan dana yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  requests.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          href={`/organization/finance/requests/${r.id}`}
                          className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline line-clamp-1"
                        >
                          {r.purpose}
                        </Link>
                        <p className="text-[11px] text-wine-500 font-mono mt-0.5">
                          {r.items.length} item rincian anggaran RAB
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-wine-900">{r.unit_name}</span>
                        <p className="text-[11px] text-wine-500">{r.submitter_name}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            r.status === "fully_disbursed" || r.status === "approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : r.status === "partially_disbursed"
                              ? "bg-blue-100 text-blue-800"
                              : r.status === "rejected"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {r.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-wine-900">
                        Rp {r.requested_amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                        {r.approved_amount
                          ? `Rp ${r.approved_amount.toLocaleString("id-ID")}`
                          : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/finance/requests/${r.id}`}
                          className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Review <ChevronRight className="w-3 h-3" />
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
