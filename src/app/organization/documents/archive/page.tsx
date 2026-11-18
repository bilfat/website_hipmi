"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Archive,
  Search,
  ChevronLeft,
  ExternalLink,
  Download,
  Calendar,
  Building,
  FileText
} from "lucide-react";

export default function DocumentArchivesPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [cabinetFilter, setCabinetFilter] = useState("all");

  const archivedDocs = store.documents.filter((d) => {
    if (cabinetFilter !== "all" && d.cabinet_id !== cabinetFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchCat = d.category.toLowerCase().includes(q);
      if (!matchTitle && !matchCat) return false;
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
                <ChevronLeft className="w-3.5 h-3.5" /> Repository Dokumen
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DOC-06
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Buku Arsip Dokumen Permanen
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Penyimpanan historis berkas organisasi, LPJ selesai, dan dokumen kabinet terdahulu (Read-Only).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-wine-700 bg-white border border-wine-200 px-3 py-1.5 rounded-xl shadow-2xs">
              {archivedDocs.length} Berkas Diarsipkan
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul berkas arsip atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={cabinetFilter}
            onChange={(e) => setCabinetFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Periode Kabinet</option>
            {store.cabinets.map((cab) => (
              <option key={cab.id} value={cab.id}>
                {cab.name} ({cab.period})
              </option>
            ))}
          </select>
        </div>

        {/* Archive Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Dokumen Arsip</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Versi Final</th>
                  <th className="py-3.5 px-4">Tahun Pengesahan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {archivedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4 max-w-xs font-bold text-wine-950 font-display">
                      {doc.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-wine-700">
                      v{doc.version}.0
                    </td>
                    <td className="py-3.5 px-4 font-mono text-wine-500">
                      {new Date(doc.updated_at).getFullYear()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={doc.file_or_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-brand-burgundy" /> Unduh / Buka
                      </a>
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
