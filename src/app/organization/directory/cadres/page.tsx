"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Building,
  GraduationCap
} from "lucide-react";

export default function CadreDirectoryPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = store.users.filter((u) => {
    if (statusFilter !== "all" && u.cadre_status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = (u.full_name || u.name || "").toLowerCase().includes(q);
      const matchNim = (u.nim || "").toLowerCase().includes(q);
      const matchMajor = (u.study_program || "").toLowerCase().includes(q);
      if (!matchName && !matchNim && !matchMajor) return false;
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
                DIR-01
              </span>
              <span className="text-xs font-medium text-wine-500">Direktori & PSDM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Database Kader HIPMI Telkom
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pangkalan data keanggotaan kader, verifikasi kelulusan diklat, nomor e-KTA resmi, dan rekam jejak struktural.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organization/directory/cadres/verification"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verifikasi Kader (DIR-03)</span>
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama kader, NIM Telkom, atau program studi..."
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
            <option value="all">Semua Status Kader</option>
            <option value="verified">Kader Terverifikasi</option>
            <option value="candidate">Calon Anggota (Candidate)</option>
            <option value="pending_verification">Menunggu Verifikasi</option>
          </select>
        </div>

        {/* Cadres Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Lengkap & NIM</th>
                  <th className="py-3.5 px-4">Program Studi & Angkatan</th>
                  <th className="py-3.5 px-4">Status Kader</th>
                  <th className="py-3.5 px-4">Nomor Anggota (e-KTA)</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-base">
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/organization/directory/cadres/${u.id}`}
                        className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline"
                      >
                        {u.full_name}
                      </Link>
                      <p className="font-mono text-[11px] text-brand-burgundy font-semibold">
                        NIM {u.nim}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-wine-900">{u.study_program || "-"}</span>
                      <p className="text-[11px] text-wine-500">Angkatan 20{u.nim ? u.nim.slice(4, 6) : "24"}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.cadre_status === "verified"
                            ? "bg-emerald-100 text-emerald-800"
                            : u.cadre_status === "candidate"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {u.cadre_status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-wine-700 text-[11px]">
                      {u.member_id || "Belum Diterbitkan"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/organization/directory/cadres/${u.id}`}
                        className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Profil (DIR-02) <ChevronRight className="w-3 h-3" />
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
