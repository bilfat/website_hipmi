"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Building2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ExternalLink
} from "lucide-react";

export default function CompaniesDirectoryPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const companies = (store.companies || []).filter((c) => {
    if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchInd = c.industry.toLowerCase().includes(q);
      if (!matchName && !matchInd) return false;
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
                DIR-06
              </span>
              <span className="text-xs font-medium text-wine-500">Kemitraan & Eksternal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Database Perusahaan & Mitra Strategis
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Sentralisasi direktori korporasi sponsor, MoU institusi, dan vendor mitra HIPMI PT Telkom. Seluruh pengurus dapat membaca; kelola data oleh tim Partnership.
            </p>
          </div>

          <Link
            href="/organization/directory/partnership-history"
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            Lihat Riwayat Kerja Sama (DIR-08) →
          </Link>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama perusahaan atau bidang industri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Kategori Mitra</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Mitra Strategis">Mitra Strategis</option>
            <option value="Media Partner">Media Partner</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Perusahaan & Industri</th>
                  <th className="py-3.5 px-4">Kategori Kemitraan</th>
                  <th className="py-3.5 px-4">Kontak Resmi</th>
                  <th className="py-3.5 px-4">Status Hubungan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/organization/directory/companies/${c.id}`}
                        className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline"
                      >
                        {c.name}
                      </Link>
                      <p className="text-[11px] text-wine-500">{c.industry}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                        {c.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-wine-700">
                      {c.official_contact}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          c.relation_status === "Aktif"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.relation_status === "Penjajakan"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {c.relation_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/directory/companies/${c.id}`}
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Profil (DIR-07) <ChevronRight className="w-3 h-3" />
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
