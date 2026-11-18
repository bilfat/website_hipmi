"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  FolderKanban
} from "lucide-react";

export default function LPJManagementPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const lpjs = (store.lpjs || []).filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const proj = store.projects.find((p) => p.id === l.project_id);
      const matchProj = proj?.name.toLowerCase().includes(q);
      if (!matchTitle && !matchProj) return false;
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
                href="/organization/documents"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Repository
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DOC-04
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Laporan Pertanggungjawaban (LPJ) Management
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Standarisasi 7 bab LPJ kegiatan, evaluasi hasil program kerja, dan pengesahan tim reviewer organisasi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-wine-700 bg-white border border-wine-200 px-3 py-1.5 rounded-xl shadow-2xs">
              {lpjs.length} LPJ Terdata
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul LPJ atau program kerja..."
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
            <option value="all">Semua Status LPJ</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted (Menunggu Review)</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved (Disahkan)</option>
            <option value="revision_needed">Perlu Revisi</option>
          </select>
        </div>

        {/* LPJ Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Judul LPJ & Program Kerja</th>
                  <th className="py-3.5 px-4">Status Pengesahan</th>
                  <th className="py-3.5 px-4">Kelengkapan 7 Bab</th>
                  <th className="py-3.5 px-4">Terakhir Disimpan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {lpjs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-wine-500">
                      Tidak ada LPJ yang sesuai kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  lpjs.map((lpj) => {
                    const project = store.projects.find((p) => p.id === lpj.project_id);
                    return (
                      <tr key={lpj.id} className="hover:bg-surface-base">
                        <td className="py-3.5 px-4 max-w-xs">
                          <Link
                            href={`/organization/lpj/${lpj.id}`}
                            className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline line-clamp-1"
                          >
                            {lpj.title}
                          </Link>
                          <p className="text-[11px] text-wine-500 mt-0.5">
                            Proker: {project?.name || "Kegiatan Organisasi"}
                          </p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              lpj.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : lpj.status === "revision_needed"
                                ? "bg-rose-100 text-rose-800"
                                : lpj.status === "submitted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {lpj.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-emerald-700 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 7/7 Bab Terisi
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-wine-600">
                          {new Date(lpj.updated_at).toLocaleDateString("id-ID")}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/organization/lpj/${lpj.id}`}
                            className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                          >
                            Buka 7 Bab (DOC-05) <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
