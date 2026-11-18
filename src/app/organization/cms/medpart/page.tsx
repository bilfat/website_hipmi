"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Share2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Settings,
  Globe
} from "lucide-react";

export default function MedpartManagementPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const submissions = (store.medpart_submissions || []).filter((m) => {
    if (typeFilter !== "all" && m.package_type !== typeFilter) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchOrg = m.organization.toLowerCase().includes(q);
      const matchEvent = m.event_name.toLowerCase().includes(q);
      const matchCode = m.tracking_code.toLowerCase().includes(q);
      if (!matchOrg && !matchEvent && !matchCode) return false;
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
                href="/organization/cms"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> CMS Dashboard
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-08
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Media Partner Management Desk
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengelolaan pengajuan kerja sama media partner eksternal, verifikasi bukti bayar paket, dan jadwal tayang publikasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/organization/cms/medpart/packages"
              className="px-3.5 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-brand-burgundy" /> Konfigurasi Paket & QRIS (CMS-10)
            </Link>

            <Link
              href="/organization/cms/medpart/publication"
              className="px-3.5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" /> Meja Tayang / Publikasi (CMS-11)
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari kode tracking (MP-...), nama event, atau institusi pemohon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Tipe Paket</option>
              <option value="Gratis">Paket Gratis (Cross-Promotion)</option>
              <option value="Berbayar">Paket Berbayar</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="payment_verified">Payment Verified</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Kode & Nama Acara</th>
                  <th className="py-3.5 px-4">Lembaga Pemohon</th>
                  <th className="py-3.5 px-4">Paket Terpilih</th>
                  <th className="py-3.5 px-4">Status Pengajuan</th>
                  <th className="py-3.5 px-4">Permintaan Tayang</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {submissions.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-brand-burgundy">{m.tracking_code}</span>
                      <p className="font-bold text-wine-950 font-display text-sm line-clamp-1">{m.event_name}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-wine-900">{m.organization}</span>
                      <p className="text-[11px] text-wine-500">{m.applicant_name}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                        {m.package_name} ({m.package_type})
                      </span>
                      {m.amount > 0 && (
                        <p className="font-mono text-[11px] text-wine-600 font-semibold mt-0.5">
                          Rp {m.amount.toLocaleString("id-ID")}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : m.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-wine-600">
                      {m.requested_publish_date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/cms/medpart/${m.id}`}
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Verifikasi (CMS-09) <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
