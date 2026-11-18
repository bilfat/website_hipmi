"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Briefcase,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye
} from "lucide-react";

export default function CadreBusinessesDirectoryPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [pubFilter, setPubFilter] = useState("all");

  const businesses = (store.businesses || []).filter((b) => {
    if (reviewFilter !== "all" && b.review_status !== reviewFilter) return false;
    if (pubFilter !== "all" && b.publication_status !== pubFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchOwner = b.owner_name.toLowerCase().includes(q);
      const matchCat = b.category.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchCat) return false;
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
                DIR-04
              </span>
              <span className="text-xs font-medium text-wine-500">Direktori Bisnis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Database Usaha & Bisnis Kader
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Etalase dan direktori unit usaha yang dimiliki oleh anggota HIPMI Telkom, verifikasi legalitas, dan status kurasi katalog publik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/karya-kader/bisnis"
              target="_blank"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              Lihat Katalog Publik (PUB-18) <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama usaha, pemilik kader, atau kategori bidang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Status Review</option>
              <option value="approved">Approved</option>
              <option value="in_review">In Review</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={pubFilter}
              onChange={(e) => setPubFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Status Publikasi</option>
              <option value="published">Published (Tayang Publik)</option>
              <option value="draft">Draft (Belum Tayang)</option>
            </select>
          </div>
        </div>

        {/* Businesses Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Usaha / Brand</th>
                  <th className="py-3.5 px-4">Kader Pemilik</th>
                  <th className="py-3.5 px-4">Kategori Industri</th>
                  <th className="py-3.5 px-4">Status Kurasi</th>
                  <th className="py-3.5 px-4">Katalog Publik</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4 max-w-xs">
                      <Link
                        href={`/organization/directory/businesses/${b.id}`}
                        className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline line-clamp-1"
                      >
                        {b.name}
                      </Link>
                      <p className="text-[11px] text-wine-500 line-clamp-1 mt-0.5">{b.description}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-wine-900">{b.owner_name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.review_status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.review_status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {b.review_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          b.publication_status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {b.publication_status === "published" ? "🌐 Tayang Publik" : "🔒 Tertutup"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/directory/businesses/${b.id}`}
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Verifikasi (DIR-05) <ChevronRight className="w-3 h-3" />
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
