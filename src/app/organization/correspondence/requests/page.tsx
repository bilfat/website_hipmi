"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  FileText,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

export default function CorrespondenceRequestsPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routingFilter, setRoutingFilter] = useState("all");

  const letters = (store.correspondence || []).filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (routingFilter !== "all" && l.routing !== routingFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchSubmitter = l.submitter_name.toLowerCase().includes(q);
      const matchUnit = l.unit_name.toLowerCase().includes(q);
      const matchNum = l.generated_letter_number?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubmitter && !matchUnit && !matchNum) return false;
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
                href="/organization/correspondence"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Persuratan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                COR-02
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Daftar Pengajuan Surat
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Seluruh surat resmi yang diajukan oleh bidang, kompartemen, atau kepanitiaan proker.
            </p>
          </div>

          <Link
            href="/organization/correspondence/form?mode=create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Surat (COR-03)</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul surat, pengaju, unit, atau nomor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Status</option>
              <option value="submitted">Submitted</option>
              <option value="in_review">In Review</option>
              <option value="revision_needed">Revision Needed</option>
              <option value="approved">Approved</option>
              <option value="issued">Issued</option>
            </select>

            <select
              value={routingFilter}
              onChange={(e) => setRoutingFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Jenis Routing</option>
              <option value="Surat Umum">Surat Umum</option>
              <option value="Untuk Ditmawa">Untuk Ditmawa</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Judul Surat & Deskripsi</th>
                  <th className="py-3.5 px-4">Pengaju / Unit</th>
                  <th className="py-3.5 px-4">Jenis Routing</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Nomor Resmi</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {letters.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada pengajuan surat yang sesuai kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  letters.map((l) => (
                    <tr key={l.id} className="hover:bg-surface-base transition-colors">
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          href={`/organization/correspondence/${l.id}`}
                          className="font-bold text-wine-950 hover:text-brand-burgundy hover:underline line-clamp-1 text-sm font-display"
                        >
                          {l.title}
                        </Link>
                        <p className="text-[11px] text-wine-500 line-clamp-1 mt-0.5">
                          Tujuan: {l.purpose}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-wine-900">{l.submitter_name}</span>
                        <p className="text-[11px] text-wine-500">{l.unit_name}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                          {l.routing}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            l.status === "issued"
                              ? "bg-emerald-100 text-emerald-800"
                              : l.status === "revision_needed"
                              ? "bg-rose-100 text-rose-800"
                              : l.status === "approved"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-brand-burgundy font-semibold">
                        {l.generated_letter_number || "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/correspondence/${l.id}`}
                          className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                        >
                          Detail <ChevronRight className="w-3.5 h-3.5" />
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
