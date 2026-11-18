"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Inbox,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Lock
} from "lucide-react";

export default function FeedbackInboxPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const feedbacks = (store.feedback || []).filter((f) => {
    if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchCode = f.receipt_code.toLowerCase().includes(q);
      const matchMsg = f.message.toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchMsg) return false;
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
                CMS-12
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Kotak Suara Management (Inbox Aspirasi Privat)
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengelolaan aspirasi, kritik, dan saran tertutup mahasiswa Telkom University. Data dilindungi hak privasi pengirim.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <Lock className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Kanal Privat Terproteksi</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari perihal, kode tanda terima (KS-...), atau isi pesan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Kategori</option>
              <option value="Aspirasi">Aspirasi</option>
              <option value="Kritik">Kritik</option>
              <option value="Saran">Saran</option>
              <option value="Pertanyaan">Pertanyaan</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Status</option>
              <option value="Baru">Baru Masuk</option>
              <option value="Dalam Tindak Lanjut">Dalam Tindak Lanjut</option>
              <option value="Selesai">Selesai / Terjawab</option>
            </select>
          </div>
        </div>

        {/* Feedbacks Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Kode & Perihal Masukan</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Disposisi Unit</th>
                  <th className="py-3.5 px-4">Status Triage</th>
                  <th className="py-3.5 px-4">Tanggal Masuk</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {feedbacks.map((f) => (
                  <tr key={f.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-mono font-bold text-brand-burgundy">{f.receipt_code}</span>
                      <p className="font-bold text-wine-950 font-display text-sm line-clamp-1">{f.title}</p>
                      <p className="text-[11px] text-wine-500 line-clamp-1 mt-0.5">{f.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                        {f.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-wine-900">
                      {f.routed_to_unit || "Belum Ditentukan"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          f.status === "Selesai"
                            ? "bg-emerald-100 text-emerald-800"
                            : f.status === "Dalam Tindak Lanjut"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-wine-600">
                      {new Date(f.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/cms/feedback/${f.id}`}
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Tindak Lanjut (CMS-13) <ChevronRight className="w-3 h-3" />
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
