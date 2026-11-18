"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Users,
  ArrowLeft,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { CadreStatus, AccountStatus } from "@/types/domain";

export default function UserManagementPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [cadreFilter, setCadreFilter] = useState("all");

  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredUsers = store.users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.nim && u.nim.includes(search)) ||
      u.demo_id.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || u.base_role === roleFilter;
    const matchesCadre = cadreFilter === "all" || u.cadre_status === cadreFilter;

    return matchesSearch && matchesRole && matchesCadre;
  });

  const handleToggleCadreStatus = (userId: string) => {
    mutateStore((draft) => {
      const u = draft.users.find((item) => item.id === userId);
      if (u) {
        const next: CadreStatus = u.cadre_status === "verified" ? "candidate" : "verified";
        u.cadre_status = next;

        addActivityHistory(
          currentUser.name,
          next === "verified" ? "memverifikasi keanggotaan kader" : "mengubah status kader ke calon",
          `${u.name} (${u.demo_id})`,
          "Database Kader"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "UPDATE_CADRE_STATUS",
          "User",
          u.id,
          u.cadre_status,
          next
        );
      }
    });

    setFeedback("Status kader berhasil diperbarui!");
  };

  const handleToggleAccountSuspension = (userId: string) => {
    mutateStore((draft) => {
      const u = draft.users.find((item) => item.id === userId);
      if (u) {
        const next: AccountStatus = u.account_status === "active" ? "suspended" : "active";
        u.account_status = next;

        addActivityHistory(
          currentUser.name,
          next === "suspended" ? "menonaktifkan (suspend) akun pengguna" : "mengaktifkan kembali akun",
          `${u.name} (${u.demo_id})`,
          "Manajemen Pengguna"
        );
      }
    });

    setFeedback("Status akun pengguna berhasil diperbarui!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dashboard Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ADM-08
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Database Kader & Pengguna
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Manajemen Akun Pengguna ({store.users.length} Akun)
          </h1>
          <p className="text-xs text-neutral-dark">
            Pangkalan data 28 akun demo, pengelolaan status verifikasi kader, dan hak akses kelembagaan.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NIM, email, demo ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-xs text-wine-950"
          />
          <Search className="w-4 h-4 text-neutral-light absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-light">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none text-wine-950"
            >
              <option value="all">Semua Role</option>
              <option value="system_admin">System Admin</option>
              <option value="ketum">Ketum</option>
              <option value="sekum">Sekum</option>
              <option value="bendum">Bendum</option>
              <option value="kakom">Kakom</option>
              <option value="staff">Staff</option>
              <option value="member">Member</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-light">Kader:</span>
            <select
              value={cadreFilter}
              onChange={(e) => setCadreFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none text-wine-950"
            >
              <option value="all">Semua Status</option>
              <option value="verified">Verified</option>
              <option value="candidate">Candidate</option>
              <option value="not_verified">Not Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Preset Demo</th>
                <th className="py-2.5 px-3">Nama & NIM</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Base Role</th>
                <th className="py-2.5 px-3">Status Kader</th>
                <th className="py-2.5 px-3">Status Akun</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wine-950/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-wine-950/5">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand-burgundy">
                    {u.demo_id}
                  </td>
                  <td className="py-2.5 px-3">
                    <strong className="text-wine-950 block">{u.name}</strong>
                    <span className="text-[10px] font-mono text-neutral-light">
                      NIM: {u.nim || "-"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-dark">
                    {u.email}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] uppercase font-semibold text-neutral-dark">
                    {u.base_role}
                  </td>
                  <td className="py-2.5 px-3">
                    <button
                      onClick={() => handleToggleCadreStatus(u.id)}
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        u.cadre_status === "verified"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : u.cadre_status === "candidate"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                      }`}
                      title="Klik untuk toggle status kader"
                    >
                      {u.cadre_status}
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        u.account_status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : u.account_status === "verification_pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.account_status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cabinets/${cab.id}/users/${u.id}`}
                        className="px-3 py-1 rounded-full border border-wine-950/20 text-wine-950 hover:bg-wine-950/5 text-[11px] font-semibold"
                      >
                        Detail (ADM-09)
                      </Link>

                      <button
                        onClick={() => handleToggleAccountSuspension(u.id)}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                          u.account_status === "active"
                            ? "text-red-700 hover:bg-red-50"
                            : "text-emerald-700 hover:bg-emerald-50"
                        }`}
                        title="Toggle Suspend / Aktif"
                      >
                        {u.account_status === "active" ? "Suspend" : "Aktifkan"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
