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
  Download,
  FolderKanban,
  Archive,
  BookOpen
} from "lucide-react";

export default function DocumentCenterPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const documents = (store.documents || []).filter((doc) => {
    if (categoryFilter !== "all" && doc.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchCat = doc.category.toLowerCase().includes(q);
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DOC-01
              </span>
              <span className="text-xs font-medium text-wine-500">Repository & Arsip Digital</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Document Center
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Repositori sentral berkas legalitas, proposal kegiatan, modul materi, dan arsip dokumen HIPMI PT Telkom.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organization/lpj"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 font-medium text-xs shadow-2xs transition-all"
            >
              <BookOpen className="w-4 h-4 text-brand-burgundy" />
              <span>Kelola LPJ (DOC-04)</span>
            </Link>

            <Link
              href="/organization/documents/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Dokumen (DOC-02)</span>
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul dokumen, kategori, atau perihal..."
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
              <option value="Proposal">Proposal</option>
              <option value="Surat">Surat</option>
              <option value="LPJ">LPJ</option>
              <option value="Dokumentasi">Dokumentasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>

            <Link
              href="/organization/documents/archive"
              className="text-xs font-semibold text-brand-burgundy hover:underline px-3 py-2 whitespace-nowrap"
            >
              Buku Arsip (DOC-06) →
            </Link>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Judul Dokumen</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Versi</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Terakhir Diperbarui</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada dokumen yang sesuai dengan pencarian.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          href={`/organization/documents/${doc.id}`}
                          className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline line-clamp-1"
                        >
                          {doc.title}
                        </Link>
                        <a
                          href={doc.file_or_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-brand-burgundy hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <ExternalLink className="w-3 h-3" /> Buka URL Dokumen
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-wine-700">
                        v{doc.version}.0
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            doc.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-wine-600">
                        {new Date(doc.updated_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/documents/${doc.id}`}
                          className="px-3 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Detail (DOC-03)
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
