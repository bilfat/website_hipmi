"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Award,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function AchievementsManagementPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const achievements = (store.achievements || []).filter((ach) => {
    if (levelFilter !== "all" && ach.level !== levelFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = ach.title.toLowerCase().includes(q);
      const matchCadre = ach.cadre_names.some((n) => n.toLowerCase().includes(q));
      if (!matchTitle && !matchCadre) return false;
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
                CMS-06
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Manajemen Prestasi & Rekor Kader
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pencatatan penghargaan kompetisi bisnis, inovasi teknologi, dan prestasi kejuaraan anggota HIPMI PT Telkom.
            </p>
          </div>

          <Link
            href="/organization/cms/achievements/form?mode=create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Prestasi Baru (CMS-07)</span>
          </Link>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul penghargaan atau nama kader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Tingkat Kompetisi</option>
            <option value="Internasional">Internasional</option>
            <option value="Nasional">Nasional</option>
            <option value="Regional">Regional</option>
            <option value="Universitas">Universitas</option>
          </select>
        </div>

        {/* Achievements Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Kejuaraan / Prestasi</th>
                  <th className="py-3.5 px-4">Kader Peraih</th>
                  <th className="py-3.5 px-4">Tingkat & Tahun</th>
                  <th className="py-3.5 px-4">Status Publikasi</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {achievements.map((ach) => (
                  <tr key={ach.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-bold text-wine-950 font-display text-sm line-clamp-1">
                        {ach.title}
                      </span>
                      <p className="text-[11px] text-wine-500 line-clamp-1 mt-0.5">{ach.description}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-wine-900">{ach.cadre_names.join(", ")}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                        {ach.level}
                      </span>
                      <span className="ml-1.5 font-mono text-wine-600">{ach.year}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ach.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ach.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/cms/achievements/form?mode=review&recordId=${ach.id}`}
                        className="px-2.5 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> Review / Edit
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
